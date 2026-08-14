"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollProgressBar() {
  const barRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let raf = null;

    function setWidth(pct) {
      bar.style.width = `${pct}%`;
    }

    function update() {
      raf = null;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      // Nothing to scroll (short page) -> bar is meaningless, keep it empty.
      if (scrollable <= 0) {
        setWidth(0);
        return;
      }
      const pct = (doc.scrollTop / scrollable) * 100;
      setWidth(Math.max(0, Math.min(100, pct)));
    }

    function onScroll() {
      if (raf === null) raf = requestAnimationFrame(update);
    }

    // Route just changed -- start this page's bar from 0, not wherever
    // scroll happened to land (Next keeps scroll position on soft nav
    // in some cases, and we don't want a stale fill to flash).
    setWidth(0);
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[200] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-neutral-400 to-gray-400 transition-[width] duration-75 ease-out"
        style={{ width: "0%" }}
      />
    </div>
  );
}