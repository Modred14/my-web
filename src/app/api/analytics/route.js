// src/app/api/analytics/route.js
//
// Read side of the analytics: powers the /analytics dashboard.
//
// Auth
//   The dashboard passcode is checked HERE, on the server. Set ANALYTICS_PASSWORD
//   (server-only). For backwards compatibility it falls back to
//   NEXT_PUBLIC_PASSWORD, but that value is embedded in the public JavaScript
//   bundle, so please switch to ANALYTICS_PASSWORD and delete the old one.
//
// Time zone
//   "Days" are calendar days in ANALYTICS_TIMEZONE (default Africa/Lagos),
//   returned as plain 'YYYY-MM-DD' strings so they can't shift by a day in
//   the browser.
//
// What is counted
//   Everything is counted per SESSION, using the session's first event
//   (normally the "visit" event) for its day, device, browser, referrer and
//   country. A session is therefore never counted twice, even if it spans
//   several pages, page loads or midnight.

import crypto from "node:crypto";
import pool from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_TIMEZONE = "Africa/Lagos";
const FALLBACK_OWN_HOSTS = ["modred.dev"];

function timeZone() {
  const tz = process.env.ANALYTICS_TIMEZONE || DEFAULT_TIMEZONE;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return tz;
  } catch {
    return "UTC";
  }
}

// ─── Auth ──────────────────────────────────────────────────────────────────
function expectedPassword() {
  return process.env.ANALYTICS_PASSWORD || process.env.NEXT_PUBLIC_PASSWORD || "";
}

function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function providedPassword(req) {
  const header = req.headers.get("x-analytics-key");
  if (!header) return "";
  try {
    return decodeURIComponent(header);
  } catch {
    return header;
  }
}

function clientIp(req) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim().slice(0, 64);
  return (req.headers.get("x-real-ip") || "unknown").slice(0, 64);
}

// Slow down passcode guessing: 10 wrong attempts per IP per 15 minutes.
const FAIL_WINDOW_MS = 15 * 60_000;
const MAX_FAILURES = 10;
const failures = new Map();

function recentFailures(ip) {
  const now = Date.now();
  const list = (failures.get(ip) || []).filter((t) => now - t < FAIL_WINDOW_MS);
  failures.set(ip, list);
  return list;
}

function reply(body, status = 200, headers = {}) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

// ─── SQL ───────────────────────────────────────────────────────────────────
// $1 = time zone name. Written with String.raw so the regex backslashes
// reach Postgres untouched.
const SESSIONS_CTE = String.raw`
WITH agg AS (
  SELECT session_id,
         MIN(created_at) AS started,
         MAX(duration) FILTER (WHERE event_type = 'session_end') AS duration
  FROM analytics_events
  WHERE session_id IS NOT NULL
  GROUP BY session_id
),
first_ev AS (
  SELECT DISTINCT ON (session_id)
         session_id, device, browser, referrer, location
  FROM analytics_events
  WHERE session_id IS NOT NULL
  ORDER BY session_id, (event_type = 'visit') DESC, created_at ASC
),
sessions AS (
  SELECT a.session_id,
         to_char((a.started::timestamptz AT TIME ZONE $1), 'YYYY-MM-DD') AS day,
         a.duration,
         COALESCE(NULLIF(f.device, ''), 'Unknown')  AS device,
         COALESCE(NULLIF(f.browser, ''), 'Unknown') AS browser,
         COALESCE(NULLIF(f.location->>'country_name', ''), 'Unknown') AS country,
         lower(regexp_replace(
           substring(
             regexp_replace(btrim(COALESCE(f.referrer, '')), '^[A-Za-z][A-Za-z0-9+.-]*://', '')
             from '^[^/?#]*'),
           '^www\.|:[0-9]+$', '', 'g')) AS ref_host
  FROM agg a
  JOIN first_ev f USING (session_id)
)`;

export async function GET(req) {
  const expected = expectedPassword();
  if (!expected) {
    console.error("[analytics] ANALYTICS_PASSWORD is not set; refusing to serve data.");
    return reply({ error: "Analytics is not configured on the server." }, 503);
  }

  const ip = clientIp(req);
  if (recentFailures(ip).length >= MAX_FAILURES) {
    return reply({ error: "Too many attempts. Try again later." }, 429, {
      "Retry-After": String(Math.ceil(FAIL_WINDOW_MS / 1000)),
    });
  }

  if (!safeEqual(providedPassword(req), expected)) {
    recentFailures(ip).push(Date.now());
    return reply({ error: "Invalid passcode" }, 401);
  }
  failures.delete(ip);

  try {
    const tz = timeZone();

    // Visits that came from the site itself (not a real referrer) count as direct.
    const requestHost = (req.headers.get("host") || "")
      .toLowerCase()
      .replace(/:\d+$/, "")
      .replace(/^www\./, "");
    const ownHosts = [...new Set([requestHost, ...FALLBACK_OWN_HOSTS].filter(Boolean))];

    const [visits, devices, browsers, referrers, countries, durations] =
      await Promise.all([
        pool.query(
          `${SESSIONS_CTE}
           SELECT day, COUNT(*)::int AS visits
           FROM sessions GROUP BY day ORDER BY day`,
          [tz],
        ),
        pool.query(
          `${SESSIONS_CTE}
           SELECT device, COUNT(*)::int AS count
           FROM sessions GROUP BY device ORDER BY count DESC, device`,
          [tz],
        ),
        pool.query(
          `${SESSIONS_CTE}
           SELECT browser, COUNT(*)::int AS count
           FROM sessions GROUP BY browser ORDER BY count DESC, browser`,
          [tz],
        ),
        pool.query(
          `${SESSIONS_CTE}
           SELECT day,
                  CASE WHEN ref_host = '' OR ref_host = 'direct' OR ref_host = ANY($2::text[])
                       THEN 'direct' ELSE ref_host END AS referrer,
                  COUNT(*)::int AS count
           FROM sessions GROUP BY 1, 2 ORDER BY day`,
          [tz, ownHosts],
        ),
        pool.query(
          `${SESSIONS_CTE}
           SELECT day, country, COUNT(*)::int AS count
           FROM sessions GROUP BY day, country ORDER BY day`,
          [tz],
        ),
        pool.query(
          `${SESSIONS_CTE}
           SELECT day,
                  ROUND(AVG(duration))::int AS seconds,
                  COUNT(*)::int AS sessions
           FROM sessions WHERE duration IS NOT NULL
           GROUP BY day ORDER BY day`,
          [tz],
        ),
      ]);

    return reply({
      timeZone: tz,
      visitsPerDay: visits.rows,
      devices: devices.rows,
      browsers: browsers.rows,
      referrers: referrers.rows,
      countries: countries.rows,
      averageSessionDuration: durations.rows,
    });
  } catch (err) {
    console.error("[analytics] query failed:", err);
    return reply({ error: "Failed to fetch analytics" }, 500);
  }
}
