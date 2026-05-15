"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { UAParser } from "ua-parser-js";

export default function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      let session;
      let device = "desktop";
      let browser = "Unknown";
      let location = {};

      // ── 1. Parse device + browser ──
      const parser = new UAParser(navigator.userAgent);
      browser = parser.getBrowser().name || "Unknown";
      device = parser.getDevice().type || "desktop";

      // ── 2. Fetch location BEFORE doing anything else ──
      try {
        const res = await fetch("https://ipapi.co/json");
        location = await res.json();
      } catch {}

      // ── 3. Session logic ──
      try {
        const sessionRaw = localStorage.getItem("analytics-session");
        session = sessionRaw ? JSON.parse(sessionRaw) : null;
      } catch {
        session = null;
      }

      const now = Date.now();
      if (!session || !session.id || now - session.start > 10 * 60 * 1000) {
        session = { id: crypto.randomUUID(), start: now };
        localStorage.setItem("analytics-session", JSON.stringify(session));
        await trackEvent("visit");
        await trackEvent("page_view");
      }

      // ── 4. Session duration on unload ──
      const startTime = Date.now();
      const handleUnload = () => {
        const duration = Math.floor((Date.now() - startTime) / 1000);
        navigator.sendBeacon(
          "/api/track",
          JSON.stringify({
            sessionId: session.id,
            page: pathname,
            referrer: document.referrer || "direct",
            eventType: "session_end",
            timestamp: new Date().toISOString(),
            device,
            browser,
            location,
            metadata: { duration },
          }),
        );
      };

      window.addEventListener("beforeunload", handleUnload);
      return () => window.removeEventListener("beforeunload", handleUnload);

      // ── Helpers ──
      async function trackEvent(eventType, extra = {}) {
        await safeFetch("/api/track", {
          sessionId: session.id,
          page: pathname,
          referrer: document.referrer || "direct",
          eventType,
          location,
          metadata: extra,
          device,
          browser,
        });
      }

      function safeFetch(url, body) {
        return fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }).catch(console.warn);
      }
    })();
  }, [pathname]);
}