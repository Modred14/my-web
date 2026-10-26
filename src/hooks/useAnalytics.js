// src/hooks/useAnalytics.js
"use client";

// Client side of the analytics. Used by <AnalyticsTracker /> in the root layout.
//
// What it sends to POST /api/track
//   visit        once when a new session starts (first page of a session)
//   page_view    on every later page the visitor opens in that session
//   session_end  when the tab is hidden or closed, with the session's duration
//                in seconds (first activity -> last activity). It can be sent
//                several times per session; the dashboard uses the largest.
//
// A "session" is one visitor's stay on the site. It ends after 10 minutes
// without any activity. The session lives in localStorage so it survives page
// reloads and is shared by all tabs.
//
// All state is module-level and start-up is idempotent, so React Strict Mode's
// double effect run (and route changes) can never create duplicate visits.

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SESSION_KEY = "analytics-session";
const LOCATION_KEY = "analytics-location";
const LOCATION_FAIL_KEY = "analytics-location-fail";

const IDLE_MS = 10 * 60 * 1000; // inactivity that ends a session
const MAX_DURATION_S = 4 * 60 * 60; // never report longer than 4 hours
const ACTIVITY_THROTTLE_MS = 1000;
const SAVE_THROTTLE_MS = 10_000;
const LOCATION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const LOCATION_RETRY_MS = 10 * 60 * 1000; // after a failed lookup
const LOCATION_TIMEOUT_MS = 2500;

const EXCLUDED_PATHS = ["/analytics"]; // the owner's dashboard is not a visit
const ACTIVITY_EVENTS = ["click", "keydown", "scroll", "mousemove", "touchstart"];

let tracker = null;

// ─── Small helpers ─────────────────────────────────────────────────────────
function getItem(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null; // storage blocked (private mode, strict settings)
  }
}

function setItem(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore: tracking still works for this page load
  }
}

function parseJson(raw) {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  // crypto.randomUUID only exists in secure contexts (https / localhost).
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}-${Math.random().toString(36).slice(2, 12)}`;
}

function isExcluded(pathname) {
  return EXCLUDED_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

// ─── Session ───────────────────────────────────────────────────────────────
function readStoredSession() {
  const s = parseJson(getItem(SESSION_KEY));
  if (!s || typeof s.id !== "string") return null;
  // Older versions stored { id, start } where `start` was the last activity.
  const lastActive = Number(s.lastActive ?? s.start);
  const startedAt = Number(s.startedAt ?? s.start);
  if (!Number.isFinite(lastActive) || !Number.isFinite(startedAt)) return null;
  return { id: s.id, startedAt, lastActive };
}

function loadSession(now) {
  const stored = readStoredSession();
  if (stored && now - stored.lastActive <= IDLE_MS) {
    return { session: stored, isNew: false };
  }
  return { session: { id: newId(), startedAt: now, lastActive: now }, isNew: true };
}

function persist(t, force) {
  const now = Date.now();
  if (!force && now - t.lastSave < SAVE_THROTTLE_MS) return;
  t.lastSave = now;

  // Another tab may have started a newer session. Adopt it rather than
  // overwriting it with ours.
  const stored = readStoredSession();
  if (stored && stored.id !== t.session.id && stored.lastActive > t.session.lastActive) {
    t.session = stored;
    return;
  }
  setItem(SESSION_KEY, JSON.stringify(t.session));
}

// ─── Location ──────────────────────────────────────────────────────────────
// Looked up once and cached. Failures (ad blocker, rate limit, offline) are NOT
// cached as if they were a location. The server falls back to the country its
// host reports when this returns null.
async function loadLocation() {
  const now = Date.now();
  const cached = parseJson(getItem(LOCATION_KEY));
  const cachedOk = cached && typeof cached.country_name === "string" && cached.country_name;
  if (cachedOk && (!cached.cachedAt || now - cached.cachedAt < LOCATION_TTL_MS)) {
    return cached;
  }

  const failedAt = Number(getItem(LOCATION_FAIL_KEY));
  if (failedAt && now - failedAt < LOCATION_RETRY_MS) return cachedOk ? cached : null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), LOCATION_TIMEOUT_MS);
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const d = await res.json();
    // ipapi answers rate limits with 200-ish JSON like { error: true, reason }.
    if (!d || d.error || typeof d.country_name !== "string" || !d.country_name) {
      throw new Error("no location in response");
    }
    const loc = {
      country_name: d.country_name,
      country_code: d.country_code || d.country || undefined,
      region: d.region || undefined,
      city: d.city || undefined,
      cachedAt: now,
    };
    setItem(LOCATION_KEY, JSON.stringify(loc));
    return loc;
  } catch {
    setItem(LOCATION_FAIL_KEY, String(now));
    return cachedOk ? cached : null;
  } finally {
    clearTimeout(timer);
  }
}

// ─── Sending ───────────────────────────────────────────────────────────────
function buildPayload(t, eventType, page, metadata) {
  return {
    sessionId: t.session.id,
    page,
    referrer: document.referrer || "direct",
    eventType,
    location: t.location,
    metadata,
  };
}

function sendNow(payload) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
}

// sendBeacon is the one call browsers reliably complete while a page is closing.
function sendBeaconOrNow(payload) {
  const body = JSON.stringify(payload);
  try {
    if (
      typeof navigator.sendBeacon === "function" &&
      navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }))
    ) {
      return;
    }
  } catch {
    // fall through
  }
  sendNow(payload);
}

function enqueue(t, task) {
  t.chain = t.chain.then(task).catch(() => {});
}

function sessionSeconds(session) {
  const s = Math.round((session.lastActive - session.startedAt) / 1000);
  return Math.min(MAX_DURATION_S, Math.max(0, s));
}

function sendSessionEnd(t) {
  sendBeaconOrNow(
    buildPayload(t, "session_end", t.path, { duration: sessionSeconds(t.session) }),
  );
}

// ─── Tracker ───────────────────────────────────────────────────────────────
function startTracker(pathname) {
  const now = Date.now();
  const { session, isNew } = loadSession(now);

  const t = {
    session,
    path: pathname,
    lastPath: pathname,
    location: null,
    lastSave: 0,
    lastActivityAt: 0,
    lastEndAt: 0,
    chain: Promise.resolve(),
  };

  persist(t, true);

  // First event of this page load: a new session -> "visit", otherwise
  // "page_view" (so landing on the site inside a running session is counted).
  t.chain = loadLocation()
    .then((loc) => {
      t.location = loc;
    })
    .catch(() => {})
    .then(() => {
      sendNow(buildPayload(t, isNew ? "visit" : "page_view", pathname, {}));
    });

  const onActivity = () => {
    const at = Date.now();
    if (at - t.lastActivityAt < ACTIVITY_THROTTLE_MS) return;
    t.lastActivityAt = at;

    if (at - t.session.lastActive > IDLE_MS) {
      // The visitor came back to a tab left open for over 10 minutes: close the
      // old session and start a new one.
      sendSessionEnd(t);
      t.session = { id: newId(), startedAt: at, lastActive: at };
      persist(t, true);
      const page = t.path;
      enqueue(t, () => sendNow(buildPayload(t, "visit", page, {})));
      return;
    }
    t.session.lastActive = at;
    persist(t, false);
  };

  const onHide = () => {
    const at = Date.now();
    if (at - t.lastEndAt < 1000) return; // visibilitychange + pagehide fire together
    t.lastEndAt = at;
    // The visitor was here until the page was hidden, unless the tab had
    // already been idle for longer than a session allows.
    if (at - t.session.lastActive <= IDLE_MS) t.session.lastActive = at;
    persist(t, true);
    sendSessionEnd(t);
  };

  ACTIVITY_EVENTS.forEach((e) =>
    window.addEventListener(e, onActivity, { passive: true }),
  );
  window.addEventListener("pagehide", onHide);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") onHide();
    else onActivity();
  });

  return t;
}

function trackRoute(pathname) {
  if (typeof window === "undefined" || !pathname || isExcluded(pathname)) return;

  if (!tracker) {
    tracker = startTracker(pathname);
    return;
  }

  const t = tracker;
  t.path = pathname;
  if (pathname === t.lastPath) return; // same page (e.g. Strict Mode re-run)
  t.lastPath = pathname;
  enqueue(t, () => sendNow(buildPayload(t, "page_view", pathname, {})));
}

export default function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackRoute(pathname);
  }, [pathname]);
}
