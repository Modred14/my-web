"use client";
import { useEffect, useRef, useState } from "react";

export default function RevealChillBounce({
  children,
  className = "",
  once = true,
  rootMargin = "0px 0px -5% 0px",
  delay = 0,
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setShown(true), delay);
          if (once) obs.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.15, rootMargin }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once, rootMargin, delay]);

  return (
    <div
      ref={ref}
      className={[
        className,
        shown ? "reveal-float" : "opacity-0 translate-y-2",
      ].join(" ")}
    >
      {children}
    </div>
  );
}