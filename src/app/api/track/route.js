// src/app/api/track/route.js
//
// Receives analytics events from src/hooks/useAnalytics.js and stores them in
// the `analytics_events` table:
//
//   session_id, ip_address, browser, os, device, referrer, page,
//   event_type, duration, location (json/jsonb), created_at
//
// This endpoint is public (any visitor's browser calls it), so everything in
// the body is treated as untrusted: it is validated, size-limited, rate-limited
// and bots are ignored.

import pool from "@/lib/db";
import { UAParser } from "ua-parser-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EVENT_TYPES = new Set(["visit", "page_view", "session_end"]);
const SESSION_ID_RE = /^[A-Za-z0-9-]{8,64}$/;
const MAX_BODY_CHARS = 4096;
const MAX_DURATION_SECONDS = 24 * 60 * 60;

// Per-IP limit so nobody can flood the database. In-memory, so it is per
// server instance, which is plenty for a personal site.
const WINDOW_MS = 60_000;
const MAX_EVENTS_PER_WINDOW = 120;
const hits = new Map();

function allowed(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_EVENTS_PER_WINDOW) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);

  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(key);
    }
  }
  return true;
}

// Crawlers, link-preview fetchers, uptime monitors and scripts are not visitors.
// (Deliberately specific: a bare /bot/ would also match phone brands like "Cubot".)
const BOT_RE =
  /\b(googlebot|bingbot|yandex(bot)?|baiduspider|duckduckbot|slurp|applebot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|slackbot|semrushbot|ahrefsbot|mj12bot|dotbot|petalbot|bytespider|gptbot|claudebot|ccbot|headlesschrome|lighthouse|pagespeed|prerender|uptimerobot|pingdom|crawler|spider|scraper)\b|^(curl|wget|python-requests|node-fetch|axios|go-http-client|okhttp)\b/i;

function clientIp(req) {
  // x-forwarded-for is "client, proxy1, proxy2": only the first entry is the visitor.
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first.slice(0, 64);
  }
  return (req.headers.get("x-real-ip") || "unknown").slice(0, 64);
}

function text(value, max) {
  if (typeof value !== "string") return undefined;
  const v = value.replace(/\u0000/g, "").trim();
  return v ? v.slice(0, max) : undefined;
}

let regionNames = null;
function countryNameFromCode(code) {
  try {
    regionNames ??= new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(code) || code;
  } catch {
    return code;
  }
}

// Keep only the few location fields the dashboard uses (country, region, city)
// rather than storing whatever blob the client sent. If the browser could not
// look its location up (ad blocker, rate limit), fall back to the country the
// hosting platform reports in request headers.
function buildLocation(raw, req) {
  const loc = {};

  if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    loc.country_name = text(raw.country_name, 80);
    loc.country_code = text(raw.country_code ?? raw.country, 8);
    loc.region = text(raw.region, 80);
    loc.city = text(raw.city, 80);
  }

  if (!loc.country_name) {
    const code = (
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      ""
    ).toUpperCase();
    if (/^[A-Z]{2}$/.test(code) && code !== "XX" && code !== "T1") {
      loc.country_code = code;
      loc.country_name = countryNameFromCode(code);
    }
  }

  for (const key of Object.keys(loc)) if (loc[key] === undefined) delete loc[key];
  return Object.keys(loc).length ? loc : null;
}

function reply(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(req) {
  try {
    const userAgent = req.headers.get("user-agent") || "";
    if (!userAgent || BOT_RE.test(userAgent)) {
      return reply({ success: true, ignored: true });
    }

    const ip = clientIp(req);
    if (!allowed(ip)) return reply({ error: "Too many requests" }, 429);

    const raw = await req.text();
    if (raw.length > MAX_BODY_CHARS) return reply({ error: "Payload too large" }, 413);

    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return reply({ error: "Invalid JSON" }, 400);
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return reply({ error: "Invalid payload" }, 400);
    }

    const sessionId = typeof body.sessionId === "string" ? body.sessionId : "";
    if (!SESSION_ID_RE.test(sessionId)) {
      return reply({ error: "Invalid sessionId" }, 400);
    }
    if (!EVENT_TYPES.has(body.eventType)) {
      return reply({ error: "Invalid eventType" }, 400);
    }

    const page = text(body.page, 300);
    if (!page || !page.startsWith("/")) {
      return reply({ error: "Invalid page" }, 400);
    }

    const referrer = text(body.referrer, 500) || "direct";

    // `duration` is only meaningful for session_end, and must be a whole number
    // of seconds because the column is an integer.
    let duration = 0;
    if (body.eventType === "session_end") {
      const d = Number(body.metadata?.duration);
      if (Number.isFinite(d)) {
        duration = Math.min(MAX_DURATION_SECONDS, Math.max(0, Math.round(d)));
      }
    }

    // Device, browser and OS are read from the request itself, never trusted
    // from the body.
    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name || "Unknown";
    const os = parser.getOS().name || "Unknown";
    const device = parser.getDevice().type || "desktop";

    const location = buildLocation(body.location, req);

    await pool.query(
      `INSERT INTO analytics_events
         (session_id, ip_address, browser, os, device, referrer, page, event_type, duration, location)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        sessionId,
        ip,
        browser,
        os,
        device,
        referrer,
        page,
        body.eventType,
        duration,
        location ? JSON.stringify(location) : null,
      ],
    );

    return reply({ success: true });
  } catch (err) {
    console.error("[track] failed:", err);
    return reply({ error: "Failed" }, 500);
  }
}
