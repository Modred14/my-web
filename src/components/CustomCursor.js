// src/components/CustomCursor.js
"use client";

import { useEffect, useRef, useState } from "react";

// Elements that count as "clickable" — shows the arrow + ring.
// (We can't detect this via computed `cursor` style because we force
// `cursor: none` globally to hide the native pointer — see globals.css.)
const CLICKABLE_SELECTOR =
  'a, button, [role="button"], input:not([type="hidden"]), textarea, select, label, summary, [tabindex]:not([tabindex="-1"]), [data-cursor="pointer"], .cursor-pointer';

// Plain text-bearing elements — shows the text caret.
// Checked only when the element isn't inside something clickable.
const TEXT_SELECTOR =
  "p, h1, h2, h3, h4, h5, h6, span, li, blockquote, td, th, dt, dd, figcaption, strong, em, b, i, small, code, pre";

function getCursorState(el) {
  if (!el?.closest) return "default";
  if (el.closest(CLICKABLE_SELECTOR)) return "pointer";

  const textEl = el.closest(TEXT_SELECTOR);
  if (textEl && textEl.textContent && textEl.textContent.trim().length > 0) {
    return "text";
  }

  return "default";
}

// Matches the site's foreground color (see globals.css --foreground),
// so the cursor always reads clearly against the black background.
const CURSOR_COLOR = "#ffffff";

// Shared geometry: the arrow is a closed 4-point "kite" traced from the
// reference icon (thick, fully-rounded stroke via round linejoin).
// Coordinates live in a 100-unit space; SCALE converts to on-screen px.
// The tip (point A) is what we anchor to the actual mouse position, so
// switching between default/hover never makes the cursor visibly jump.
const SCALE = 0.22;
const ARROW_POINTS = "30,22 78,42 52,54 44,74"; // A B V C
const ARROW_TIP = { x: 30, y: 22 }; // point A

// Hover graphic: same arrow, translated inside a larger canvas that also
// holds the two concentric ring arcs traced from the second reference image.
const HOVER_OFFSET = { x: 26, y: 24 };
const HOVER_ARROW_POINTS = ARROW_POINTS.split(" ")
  .map((pair) => {
    const [x, y] = pair.split(",").map(Number);
    return `${x + HOVER_OFFSET.x},${y + HOVER_OFFSET.y}`;
  })
  .join(" ");
const HOVER_TIP = {
  x: ARROW_TIP.x + HOVER_OFFSET.x,
  y: ARROW_TIP.y + HOVER_OFFSET.y,
};
const RING_CENTER = { x: HOVER_TIP.x - 14, y: HOVER_TIP.y - 10 };

/**
 * Custom animated cursor with three states, all smoothly cross-fading:
 * - default: outlined arrow pointer
 * - pointer: arrow + double ring, over links/buttons/form fields
 * - text: vertical caret, over plain text content
 * Automatically disables itself on touch / coarse-pointer devices.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const raf = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  const [cursorState, setCursorState] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [enabled, setEnabled] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handleMediaChange = (e) => setEnabled(e.matches);
    mq.addEventListener?.("change", handleMediaChange);

    return () => mq.removeEventListener?.("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;
      setIsVisible(true);
      setCursorState(getCursorState(e.target));
    };

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);
    const handleLeaveWindow = () => setIsVisible(false);
    // On re-entry we also need to resync cursorState immediately —
    // otherwise it stays stuck at whatever it was when the mouse left,
    // and the very next mousemove flips it instantly with no transition
    // to play against (looks like a hard snap instead of a fade).
    const handleEnterWindow = (e) => {
      setIsVisible(true);
      const target =
        e.target ??
        (typeof document.elementFromPoint === "function"
          ? document.elementFromPoint(e.clientX, e.clientY)
          : null);
      setCursorState(getCursorState(target));
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.documentElement.addEventListener("mouseleave", handleLeaveWindow);
    document.documentElement.addEventListener("mouseenter", handleEnterWindow);

    const animate = () => {
      // Smoothed follow (lerp) for a fluid trailing motion.
      pos.current.x += (targetPos.current.x - pos.current.x) * 0.25;
      pos.current.y += (targetPos.current.y - pos.current.y) * 0.25;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleLeaveWindow,
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleEnterWindow,
      );
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  const isPointer = cursorState === "pointer";
  const isText = cursorState === "text";
  const EASE = "cubic-bezier(.4,0,.2,1)";

  // On-screen sizes/offsets, derived from SCALE so the tip always lands at (0,0).
  const arrowSize = 100 * SCALE;
  const arrowOffsetX = ARROW_TIP.x * SCALE;
  const arrowOffsetY = ARROW_TIP.y * SCALE;

  const hoverSize = 140 * SCALE;
  const hoverOffsetX = HOVER_TIP.x * SCALE;
  const hoverOffsetY = HOVER_TIP.y * SCALE;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity 200ms ${EASE}`,
        color: CURSOR_COLOR,
      }}
      aria-hidden="true"
    >
      <div className="relative">
        {/* Default arrow */}
        <svg
          width={arrowSize}
          height={arrowSize}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          style={{
            left: -arrowOffsetX,
            top: -arrowOffsetY,
            transformOrigin: `${arrowOffsetX}px ${arrowOffsetY}px`,
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
            opacity: isPointer || isText ? 0 : 1,
            transform: `scale(${isPressed ? 0.85 : 1}) translateZ(0)`,
            transition: `transform 180ms ${EASE}, opacity 200ms ${EASE}`,
            // Own compositor layer so this keeps animating smoothly even
            // when other on-page hover transitions (borders, shadows,
            // backgrounds) are busy on the main thread.
            willChange: "transform, opacity",
          }}
        >
          <polygon
            points={ARROW_POINTS}
            fill="none"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinejoin="round"
          />
        </svg>

        {/* Hover: ring + dot, with a soft glow so it stays visible on any button color */}
        <svg
          width={hoverSize}
          height={hoverSize}
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
          style={{
            left: -hoverOffsetX,
            top: -hoverOffsetY,
            transformOrigin: `${hoverOffsetX}px ${hoverOffsetY}px`,
            filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.35))",
            opacity: isPointer ? 1 : 0,
            transform: `scale(${isPointer ? (isPressed ? 0.82 : 1) : 0.6}) translateZ(0)`,
            transition: `transform 320ms ${EASE}, opacity 240ms ${EASE}`,
            willChange: "transform, opacity",
          }}
        >
          {/* faint halo behind the ring — keeps it readable over light/white buttons */}
          <circle
            cx={RING_CENTER.x}
            cy={RING_CENTER.y}
            r={isPressed ? "26" : "30"}
            fill="currentColor"
            opacity="0.08"
            style={{ transition: `r 260ms ${EASE}` }}
          />
          {/* outer ring */}
          <circle
            cx={RING_CENTER.x}
            cy={RING_CENTER.y}
            r={isPressed ? "26" : "30"}
            stroke="currentColor"
            strokeWidth="5"
            style={{ transition: `r 260ms ${EASE}` }}
          />
          {/* inner dot */}
          <circle
            cx={RING_CENTER.x}
            cy={RING_CENTER.y}
            r={isPressed ? "5" : "3.5"}
            fill="currentColor"
            style={{ transition: `r 260ms ${EASE}` }}
          />
        </svg>

        {/* Text caret — fades/grows in over plain text content */}
        <svg
          width="10"
          height="24"
          viewBox="0 0 10 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -left-[3px] -top-[10px]"
          style={{
            filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))",
            opacity: isText ? 1 : 0,
            transform: `scale(${isText ? (isPressed ? 0.85 : 1) : 0.5}) translateZ(0)`,
            transformOrigin: "center",
            transition: `opacity 180ms ${EASE}, transform 200ms ${EASE}`,
            willChange: "transform, opacity",
          }}
        >
          <line
            x1="5"
            y1="2"
            x2="5"
            y2="22"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}