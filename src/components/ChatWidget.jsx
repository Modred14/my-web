// src/components/ChatWidget.jsx
"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUp,
  Briefcase,
  Code,
  Mail,
  MessageCircle,
  RotateCcw,
  Rocket,
  Trophy,
  User,
  X,
} from "lucide-react";

const MAX_LEN = 400;
const GENERIC_ERROR = "Something went wrong on my side. Please try again.";

// Shown on the empty state.
const STARTERS = [
  { icon: User, label: "Who is Modred?", q: "Who is Modred?" },
  {
    icon: Rocket,
    label: "What has Modred built?",
    q: "What has Modred built so far?",
  },
  { icon: Code, label: "Modred's tech stack", q: "What is Modred's tech stack?" },
  {
    icon: Briefcase,
    label: "Open to work?",
    q: "Is Modred open to work right now?",
  },
  {
    icon: Trophy,
    label: "Hackathon win",
    q: "What did Modred win at Techfest 5.0?",
  },
  { icon: Mail, label: "Get in touch", q: "How can I contact Modred?" },
];

// Extra ideas that rotate in above the input once a chat is under way.
const FOLLOW_UPS = [
  "Tell me about Nepogames",
  "What is EscrowGo?",
  "Where did Modred study?",
  "Does Modred have payments experience?",
  "Has Modred built AI features?",
  "What is Modred working on now?",
  "Tell me about Nexopra",
  "What is TapPay?",
  "What is Modred's work experience?",
  "How can I hire Modred?",
];

const ALL_QUESTIONS = [...STARTERS.map((s) => s.q), ...FOLLOW_UPS];

function pickSuggestions(messages) {
  const asked = new Set(
    messages
      .filter((m) => m.role === "user")
      .map((m) => m.content.trim().toLowerCase()),
  );
  const pool = ALL_QUESTIONS.filter((q) => !asked.has(q.toLowerCase()));
  if (!pool.length) return [];
  const start = (asked.size * 3) % pool.length;
  return Array.from({ length: Math.min(4, pool.length) }, (_, i) => {
    return pool[(start + i) % pool.length];
  });
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// ─── Tiny, safe text renderer (no HTML injection) ──────────────────────────
// Supports "- " bullets, "1. " lists, **bold**, and clickable links / emails.
const INLINE_RE =
  /\*\*([^*\n]+)\*\*|(https?:\/\/[^\s<]+)|([A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+)/g;
const TRAILING_PUNCT = /[.,;:!?)\]'"]+$/;

const LINK_CLASS =
  "text-blue-300 underline underline-offset-2 decoration-blue-300/40 hover:decoration-blue-300 break-words transition-colors";

function renderInline(text, touchesEnd) {
  const nodes = [];
  let last = 0;

  for (const m of text.matchAll(INLINE_RE)) {
    const start = m.index;
    const full = m[0];
    if (start > last) nodes.push(text.slice(last, start));

    if (m[1] !== undefined) {
      nodes.push(
        <strong key={start} className="font-semibold text-white">
          {m[1]}
        </strong>,
      );
    } else {
      let value = full;
      let trailing = "";
      const t = value.match(TRAILING_PUNCT);
      if (t) {
        trailing = t[0];
        value = value.slice(0, -trailing.length);
      }
      // While a reply is still being typed, a half-written URL at the very end
      // stays plain text so nobody can click a broken link.
      if (touchesEnd && start + full.length === text.length) {
        nodes.push(full);
      } else {
        nodes.push(
          <a
            key={start}
            href={m[2] ? value : `mailto:${value}`}
            target={m[2] ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            {value}
          </a>,
        );
        if (trailing) nodes.push(trailing);
      }
    }
    last = start + full.length;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

// Hide an unfinished **bold** marker while typing so it doesn't flash.
function hideOpenBold(text) {
  const count = text.split("**").length - 1;
  if (count % 2 === 0) return text;
  return text.slice(0, text.lastIndexOf("**"));
}

function RichText({ text, typing = false }) {
  const source = typing ? hideOpenBold(text) : text;

  const blocks = [];
  let current = null;
  const push = (type, item) => {
    if (current && current.type === type) {
      current.items.push(item);
    } else {
      current = { type, items: [item] };
      blocks.push(current);
    }
  };

  for (const raw of source.replace(/\r/g, "").split("\n")) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      current = null;
      continue;
    }
    const bullet = line.match(/^\s*[-•*]\s+(.*)$/);
    const numbered = line.match(/^\s*\d+[.)]\s+(.*)$/);
    if (bullet) push("ul", bullet[1]);
    else if (numbered) push("ol", numbered[1]);
    else push("p", line);
  }

  return (
    <div className="space-y-2 text-[13px] leading-relaxed text-gray-300 break-words sm:text-sm">
      {blocks.map((block, bi) => {
        const lastBlock = typing && bi === blocks.length - 1;
        const inline = (item, ii) =>
          renderInline(item, lastBlock && ii === block.items.length - 1);

        if (block.type === "ul") {
          return (
            <ul key={bi} className="space-y-1.5">
              {block.items.map((item, ii) => (
                <li key={ii} className="flex gap-2.5">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-neutral-500" />
                  <span>{inline(item, ii)}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol
              key={bi}
              className="list-decimal space-y-1.5 pl-5 marker:text-gray-500"
            >
              {block.items.map((item, ii) => (
                <li key={ii}>{inline(item, ii)}</li>
              ))}
            </ol>
          );
        }
        return (
          <p key={bi}>
            {block.items.map((item, ii) => (
              <Fragment key={ii}>
                {ii > 0 && <br />}
                {inline(item, ii)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

// Types a fresh reply out, ChatGPT-style, and keeps the chat scrolled down.
function TypedText({ text, scrollRef }) {
  const [count, setCount] = useState(() =>
    prefersReducedMotion() ? text.length : 0,
  );
  const done = count >= text.length;

  useEffect(() => {
    if (done) return;
    const step = Math.max(2, Math.ceil(text.length / 150));
    const id = setInterval(() => {
      setCount((c) => Math.min(text.length, c + step));
    }, 18);
    return () => clearInterval(id);
  }, [text, done]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollHeight - el.scrollTop - el.clientHeight < 140) {
      el.scrollTop = el.scrollHeight;
    }
  }, [count, scrollRef]);

  return <RichText text={text.slice(0, count)} typing={!done} />;
}

function Avatar({ className = "" }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] ${className}`}
    >
      <Image
        src="/logo.png"
        alt=""
        width={28}
        height={28}
        className="h-[62%] w-[62%] object-contain"
      />
    </span>
  );
}

// ─── Widget ────────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);
  const textareaRef = useRef(null);
  const launcherRef = useRef(null);
  const abortRef = useRef(null);
  const idRef = useRef(0);

  // A small "Ask me about Modred" hint, once per visit.
  useEffect(() => {
    const show = setTimeout(() => {
      try {
        if (sessionStorage.getItem("chat-nudge-seen")) return;
        sessionStorage.setItem("chat-nudge-seen", "1");
      } catch {
        // storage blocked: just show it
      }
      setNudge(true);
    }, 3500);
    const hide = setTimeout(() => setNudge(false), 12000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  // Escape closes the chat.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Full-screen on phones: stop the page behind from scrolling.
  useEffect(() => {
    if (!open) return;
    if (!window.matchMedia("(max-width: 639px)").matches) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Focus the input on desktop (on phones that would pop the keyboard open
  // before the visitor has even seen the suggestions).
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      if (window.matchMedia("(min-width: 640px)").matches) {
        textareaRef.current?.focus();
      }
    }, 250);
    return () => clearTimeout(t);
  }, [open]);

  // Grow the textarea with its content.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [input, open]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, loading, error]);

  useEffect(() => () => abortRef.current?.abort(), []);

  function openChat() {
    setOpen(true);
    setHasOpened(true);
    setNudge(false);
  }

  function closeChat() {
    setOpen(false);
    launcherRef.current?.focus();
  }

  async function requestReply(history) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 30000);

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
        signal: controller.signal,
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        // non-JSON response
      }

      if (!res.ok || !data?.reply) {
        setError(data?.error || GENERIC_ERROR);
        return;
      }

      idRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: idRef.current,
          role: "assistant",
          content: data.reply,
          fresh: true,
        },
      ]);
    } catch {
      // An abort we caused (new chat / unmount) is not an error to show.
      if (controller.signal.aborted && !timedOut) return;
      setError(
        timedOut
          ? "That took too long. Please try again."
          : "Couldn't reach the assistant. Check your connection and try again.",
      );
    } finally {
      clearTimeout(timer);
      if (abortRef.current === controller) setLoading(false);
    }
  }

  function send(text) {
    const content = (text ?? input).trim().slice(0, MAX_LEN);
    if (!content || loading) return;

    idRef.current += 1;
    const history = [
      ...messages,
      { id: idRef.current, role: "user", content },
    ];
    setMessages(history);
    setInput("");
    requestReply(history);

    // On desktop, keep the cursor in the box so the visitor can keep typing
    // (clicking a suggestion would otherwise drop focus). Not on phones: that
    // would pop the keyboard open over the answer.
    if (window.matchMedia("(min-width: 640px) and (pointer: fine)").matches) {
      textareaRef.current?.focus();
    }
  }

  function retry() {
    if (loading || !messages.length) return;
    requestReply(messages);
  }

  function resetChat() {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setError(null);
    setLoading(false);
    setInput("");
    textareaRef.current?.focus();
  }

  function onSubmit(e) {
    e.preventDefault();
    send();
  }

  function onKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  }

  const empty = messages.length === 0;
  const suggestions = !empty && !loading ? pickSuggestions(messages) : [];
  const canSend = input.trim().length > 0 && !loading;

  return (
    <>
      {/* ── Floating button ── */}
      <div
        className={`fixed bottom-5 right-5 z-[150] flex items-center gap-3 ${
          open ? "max-sm:invisible" : ""
        }`}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none max-w-[60vw] rounded-xl border border-white/10 bg-[#0f0f0f]/95 px-3 py-2 text-xs font-medium text-gray-300 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
            nudge && !open
              ? "translate-x-0 opacity-100"
              : "translate-x-2 opacity-0"
          }`}
        >
          Ask me about Modred
        </div>

        <button
          ref={launcherRef}
          type="button"
          onClick={() => (open ? closeChat() : openChat())}
          aria-label={open ? "Close chat" : "Chat with Modred's assistant"}
          aria-expanded={open}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-neutral-900 text-white shadow-[0_8px_30px_rgba(0,0,0,0.55)] outline-none transition-[transform,border-color,background-color] duration-300 hover:-translate-y-0.5 hover:border-blue-400/50 hover:bg-neutral-800 focus-visible:ring-2 focus-visible:ring-white/50 motion-reduce:transition-none"
        >
          {!hasOpened && (
            <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-white/10 motion-reduce:hidden" />
          )}
          <MessageCircle
            size={22}
            className={`absolute transition-[transform,opacity] duration-300 motion-reduce:transition-none ${
              open ? "scale-50 -rotate-90 opacity-0" : "scale-100 opacity-100"
            }`}
          />
          <X
            size={22}
            className={`absolute transition-[transform,opacity] duration-300 motion-reduce:transition-none ${
              open ? "scale-100 opacity-100" : "scale-50 rotate-90 opacity-0"
            }`}
          />
        </button>
      </div>

      {/* ── Chat panel ── */}
      <section
        role="dialog"
        aria-label="Chat with Modred's assistant"
        inert={!open}
        className={`fixed z-[250] flex origin-bottom-right flex-col overflow-hidden border border-white/10 bg-[#0c0c0c]/95 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl transition-[opacity,transform,visibility] duration-300 ease-out motion-reduce:transition-none max-sm:inset-0 max-sm:h-dvh max-sm:w-full sm:bottom-24 sm:right-5 sm:h-[min(640px,calc(100dvh-8rem))] sm:w-[400px] sm:rounded-2xl lg:w-[420px] ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-white/[0.08] bg-white/[0.02] px-4 py-3">
          <div className="relative">
            <Avatar className="h-9 w-9" />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0c0c0c]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold leading-tight text-white">
              Ask about Modred
            </p>
            <p className="truncate text-[11px] text-gray-500">
              AI assistant · about Modred only
            </p>
          </div>
          {!empty && (
            <button
              type="button"
              onClick={resetChat}
              aria-label="Start a new chat"
              title="New chat"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 outline-none transition-colors duration-200 hover:border-white/25 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
            >
              <RotateCcw size={14} />
            </button>
          )}
          <button
            type="button"
            onClick={closeChat}
            aria-label="Close chat"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 outline-none transition-colors duration-200 hover:border-white/25 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <X size={15} />
          </button>
        </div>

        {/* Conversation */}
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4"
          aria-live="polite"
        >
          {empty ? (
            <div className="flex flex-col items-center px-1 pb-2 pt-4 text-center sm:pt-6">
              <div className="relative">
                <div className="absolute inset-0 scale-150 rounded-full bg-neutral-500/20 blur-2xl" />
                <Avatar className="relative h-14 w-14" />
              </div>
              <h2 className="mt-4 font-orbitron text-lg font-extrabold leading-snug text-white">
                Hi, I&apos;m Modred&apos;s assistant
              </h2>
              <p className="mt-2 max-w-[290px] text-xs leading-relaxed text-gray-500">
                Ask me anything about Modred&apos;s work, projects, skills and
                experience.
              </p>

              <div className="mt-6 grid w-full grid-cols-2 gap-2">
                {STARTERS.map(({ icon: Icon, label, q }) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left text-xs font-medium leading-snug text-gray-300 outline-none transition-colors duration-200 hover:border-blue-400/30 hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    <Icon size={14} className="mt-px shrink-0 text-neutral-400" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md border border-white/10 bg-white/[0.08] px-3.5 py-2 text-[13px] leading-relaxed text-gray-100 sm:text-sm">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="flex items-start gap-2.5">
                    <Avatar className="mt-0.5 h-7 w-7" />
                    <div className="min-w-0 flex-1 pt-1">
                      {m.fresh ? (
                        <TypedText text={m.content} scrollRef={scrollRef} />
                      ) : (
                        <RichText text={m.content} />
                      )}
                    </div>
                  </div>
                ),
              )}

              {loading && (
                <div className="flex items-start gap-2.5">
                  <Avatar className="mt-0.5 h-7 w-7" />
                  <div
                    className="flex items-center gap-1 pt-3"
                    role="status"
                    aria-label="Modred's assistant is typing"
                  >
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {error && !loading && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-400/20 bg-red-500/[0.06] px-3.5 py-3 text-[13px] leading-relaxed text-red-200/90 sm:text-sm"
                >
                  <p>{error}</p>
                  <button
                    type="button"
                    onClick={retry}
                    className="mt-2 inline-flex items-center gap-1.5 rounded-lg border border-red-300/25 px-2.5 py-1 text-xs font-semibold text-red-100 outline-none transition-colors duration-200 hover:bg-red-400/10 focus-visible:ring-2 focus-visible:ring-red-300/40"
                  >
                    <RotateCcw size={12} />
                    Try again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={onSubmit}
          className="px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2"
        >
          {suggestions.length > 0 && (
            <div className="-mx-1 mb-2 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {suggestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-gray-400 outline-none transition-colors duration-200 hover:border-blue-400/30 hover:bg-white/[0.06] hover:text-white focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.04] py-2 pl-3.5 pr-2 transition-colors duration-200 focus-within:border-blue-400/40 focus-within:bg-white/[0.06]">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={1}
              maxLength={MAX_LEN}
              placeholder="Ask about Modred..."
              aria-label="Your question about Modred"
              className="max-h-[120px] min-h-[24px] flex-1 resize-none self-center bg-transparent py-0.5 text-base leading-6 text-white outline-none placeholder:text-gray-600 sm:text-sm"
            />
            <button
              type="submit"
              disabled={!canSend}
              aria-label="Send message"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black outline-none transition-[opacity,background-color,transform] duration-200 hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-white/60 disabled:bg-white/10 disabled:text-white/30 disabled:hover:bg-white/10"
            >
              <ArrowUp size={16} strokeWidth={2.5} />
            </button>
          </div>

          <p className="mt-2 text-center text-[10px] leading-snug text-gray-600">
            AI can make mistakes. For anything important, email Modred
            directly.
          </p>
        </form>
      </section>
    </>
  );
}
