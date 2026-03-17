import pool from "@/lib/db";
import { UAParser } from "ua-parser-js";

export async function POST(req) {
  try {
    const body = await req.json();
console.log("Analytics POST received:", body);
    const userAgent = req.headers.get("user-agent");
    const parser = new UAParser(userAgent);

    const browser = parser.getBrowser().name || "Unknown";
    const os = parser.getOS().name || "Unknown";
    const device = parser.getDevice().type || "desktop";

    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";
const duration = body.metadata?.duration ?? 0;

await pool.query(
  `INSERT INTO analytics_events
   (session_id, ip_address, browser, os, device, referrer, page, event_type, duration, location)
   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
  [
    body.sessionId,
    ip,
    browser,
    os,
    device,
    body.referrer,
    body.page,
    body.eventType,
    duration,
    body.location || null
  ]
);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed" }), { status: 500 });
  }
}