// src/app/api/chat/route.js
//
// Powers the "Ask about Modred" chat widget.
//
// Environment variables
//   GROQ_API_KEY    (required)  your Groq API key
//   GROQ_MODEL      (optional)  defaults to llama-3.3-70b-versatile
//   GROQ_BASE_URL   (optional)  defaults to https://api.groq.com/openai/v1
//
// Use a non-reasoning model here. Reasoning models spend part of max_tokens on
// hidden thinking, which can cut replies short.

import { NextResponse } from "next/server";
import {
  CONTACT_EMAIL,
  OFF_TOPIC_REPLY,
  OFF_TOPIC_TOKEN,
  SCOPE_REMINDER,
  getSystemPrompt,
} from "@/lib/chatProfile";

export const runtime = "nodejs";
export const maxDuration = 30;

// ─── Limits ────────────────────────────────────────────────────────────────
const MAX_BODY_CHARS = 20_000;
const MAX_MESSAGES = 10; // turns of history sent to the model
const MAX_USER_CHARS = 500;
const MAX_ASSISTANT_CHARS = 1_200;
const MAX_REPLY_CHARS = 1_500;
const MAX_OUTPUT_TOKENS = 450;
const UPSTREAM_TIMEOUT_MS = 20_000;

// Per-IP rate limit. In-memory, so it is per server instance (best effort on
// serverless), but it stops casual abuse of your Groq quota.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const HOUR_MS = 3_600_000;
const MAX_PER_HOUR = 40;
const hits = new Map();

function rateLimit(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < HOUR_MS);
  const inWindow = recent.filter((t) => now - t < WINDOW_MS);

  if (inWindow.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((WINDOW_MS - (now - inWindow[0])) / 1000)),
    };
  }
  if (recent.length >= MAX_PER_HOUR) {
    hits.set(ip, recent);
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((HOUR_MS - (now - recent[0])) / 1000)),
    };
  }

  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < HOUR_MS)) hits.delete(key);
    }
  }
  return { ok: true };
}

function clientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// ─── Guards ────────────────────────────────────────────────────────────────
// Obvious prompt-injection attempts are answered without calling the model.
const INJECTION_RE =
  /\b(ignore|disregard|forget|override|bypass)\b[^.\n]{0,40}\b(instructions?|prompts?|rules?|guidelines?|restrictions?)\b|\b(reveal|show|print|repeat|output|leak|display)\b[^.\n]{0,30}\b(system\s+prompt|your\s+(prompt|instructions?|rules)|initial\s+prompt)\b|\bsystem\s+prompt\b|\bdeveloper\s+mode\b|\bjailbreak\b|\[\[\s*off_topic\s*\]\]/i;

// The scope token must only ever come from the model, never from visitors.
const TOKEN_RE = /\[\[\s*off_topic\s*\]\]/gi;

// If the reply ever contains these, it is leaking the instructions.
const LEAK_MARKERS = ["HARD RULES", "Site reminder", "YOUR ONE JOB"];

function sanitizeMessages(raw) {
  if (!Array.isArray(raw)) return null;

  const cleaned = [];
  for (const m of raw.slice(-MAX_MESSAGES)) {
    if (!m || typeof m.content !== "string") continue;
    const role =
      m.role === "assistant" ? "assistant" : m.role === "user" ? "user" : null;
    if (!role) continue;

    const content = m.content
      .replaceAll("\u0000", "")
      .trim()
      .slice(0, role === "user" ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS);
    if (content) cleaned.push({ role, content });
  }

  while (cleaned.length && cleaned[0].role !== "user") cleaned.shift();
  if (!cleaned.length || cleaned[cleaned.length - 1].role !== "user") return null;
  return cleaned;
}

function finalizeReply(raw) {
  const text = String(raw ?? "").trim();
  if (!text) return null;

  if (text.includes(OFF_TOPIC_TOKEN) || /\[\[\s*off_topic/i.test(text)) {
    return { reply: OFF_TOPIC_REPLY, offTopic: true };
  }
  if (LEAK_MARKERS.some((marker) => text.includes(marker))) {
    return { reply: OFF_TOPIC_REPLY, offTopic: true };
  }
  return { reply: text.slice(0, MAX_REPLY_CHARS), offTopic: false };
}

function reply(body, status = 200, extraHeaders = {}) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extraHeaders },
  });
}

// ─── Handler ───────────────────────────────────────────────────────────────
export async function POST(req) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("Chat: GROQ_API_KEY is not set.");
    return reply(
      { error: `The assistant isn't available right now. You can email Modred at ${CONTACT_EMAIL}.` },
      503,
    );
  }

  let body;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_CHARS) {
      return reply({ error: "That message is too long." }, 413);
    }
    body = JSON.parse(text);
  } catch {
    return reply({ error: "Invalid request." }, 400);
  }

  const history = sanitizeMessages(body?.messages);
  if (!history) {
    return reply({ error: "Please send a message." }, 400);
  }

  const limit = rateLimit(clientIp(req));
  if (!limit.ok) {
    return reply(
      { error: "You're sending messages a bit fast. Please wait a moment and try again." },
      429,
      { "Retry-After": String(limit.retryAfter) },
    );
  }

  const latest = history[history.length - 1].content;
  if (INJECTION_RE.test(latest)) {
    return reply({ reply: OFF_TOPIC_REPLY, offTopic: true });
  }

  // The latest message can't contain the token here (the guard above blocks
  // it), but older turns are stripped so forged history can't smuggle it in.
  const messages = [
    { role: "system", content: getSystemPrompt() },
    ...history.slice(0, -1).map((m) => ({
      role: m.role,
      content: m.content.replace(TOKEN_RE, "").trim() || "(empty)",
    })),
    { role: "user", content: `${latest}\n\n${SCOPE_REMINDER}` },
  ];

  const baseUrl = (process.env.GROQ_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/+$/, "");
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.2,
        top_p: 0.9,
        max_tokens: MAX_OUTPUT_TOKENS,
        stream: false,
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      console.error("Chat upstream error:", upstream.status, detail.slice(0, 300));
      if (upstream.status === 429) {
        return reply(
          { error: "The assistant is getting a lot of questions right now. Please try again in a moment." },
          429,
        );
      }
      return reply(
        { error: `The assistant is unavailable right now. You can email Modred at ${CONTACT_EMAIL}.` },
        502,
      );
    }

    const data = await upstream.json();
    const result = finalizeReply(data?.choices?.[0]?.message?.content);
    if (!result) {
      return reply(
        { error: "I couldn't come up with an answer. Please try rephrasing your question." },
        502,
      );
    }
    return reply(result);
  } catch (err) {
    const timedOut = err?.name === "AbortError";
    console.error("Chat error:", timedOut ? "upstream timeout" : err);
    return reply(
      {
        error: timedOut
          ? "That took too long. Please try again."
          : `The assistant is unavailable right now. You can email Modred at ${CONTACT_EMAIL}.`,
      },
      timedOut ? 504 : 502,
    );
  } finally {
    clearTimeout(timer);
  }
}
