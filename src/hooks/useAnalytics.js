"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { UAParser } from "ua-parser-js";

export default function useAnalytics() {
  const pathname = usePathname();
  const sessionRef = useRef(null);
  const locationRef = useRef(null);
  const metaRef = useRef({ device: "desktop", browser: "Unknown" });
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Store cleanup functions so React can actually call them
    let handleUnload = null;
    const activityEvents = ["click", "keydown", "scroll", "mousemove"];

    (async () => {
      // 1. Parse device + browser once
      const parser = new UAParser(navigator.userAgent);
      metaRef.current = {
        browser: parser.getBrowser().name || "Unknown",
        device: parser.getDevice().type || "desktop",
      };

      // 2. Fetch location once, cache in localStorage
      try {
        const cached = localStorage.getItem("analytics-location");
        if (cached) {
          locationRef.current = JSON.parse(cached);
        } else {
          const res = await fetch("https://ipapi.co/json");
          locationRef.current = await res.json();
          localStorage.setItem(
            "analytics-location",
            JSON.stringify(locationRef.current),
          );
        }
      } catch {}

      // 3. Session logic
      let session = null;
      try {
        const raw = localStorage.getItem("analytics-session");
        session = raw ? JSON.parse(raw) : null;
      } catch {}

      const now = Date.now();
      const isNewSession =
        !session || !session.id || now - session.start > 10 * 60 * 1000;

      if (isNewSession) {
        session = { id: crypto.randomUUID(), start: now };
        localStorage.setItem("analytics-session", JSON.stringify(session));
        await trackEvent("visit", session, pathname);
      }

      sessionRef.current = session;

      // 4. Reset session timer on activity
      const resetSessionTimer = () => {
        if (!sessionRef.current) return;
        const updated = { ...sessionRef.current, start: Date.now() };
        sessionRef.current = updated;
        localStorage.setItem("analytics-session", JSON.stringify(updated));
      };

      activityEvents.forEach((e) =>
        window.addEventListener(e, resetSessionTimer, { passive: true }),
      );

      // 5. Session duration on unload
      const sessionStart = Date.now();
      handleUnload = () => {
        if (!sessionRef.current) return;
        const duration = Math.floor((Date.now() - sessionStart) / 1000);
        navigator.sendBeacon(
          "/api/track",
          JSON.stringify({
            sessionId: sessionRef.current.id,
            page: pathname,
            referrer: document.referrer || "direct",
            eventType: "session_end",
            timestamp: new Date().toISOString(),
            ...metaRef.current,
            location: locationRef.current,
            metadata: { duration },
          }),
        );
        // Clean up activity listeners when session ends
        activityEvents.forEach((e) =>
          window.removeEventListener(e, resetSessionTimer),
        );
      };

      window.addEventListener("beforeunload", handleUnload);
    })();

    // ✅ React can actually run this cleanup now
    return () => {
      if (handleUnload) {
        window.removeEventListener("beforeunload", handleUnload);
      }
    };
  }, []);

  // Track page_view on every route change
  useEffect(() => {
    if (!sessionRef.current) return;
    trackEvent("page_view", sessionRef.current, pathname);
  }, [pathname]);

  async function trackEvent(eventType, session, page, extra = {}) {
    try {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: session.id,
          page,
          referrer: document.referrer || "direct",
          eventType,
          location: locationRef.current,
          metadata: extra,
          ...metaRef.current,
        }),
      });
    } catch (err) {
      console.warn(err);
    }
  }
}
