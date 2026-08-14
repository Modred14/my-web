"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Rocket, TerminalSquare } from "lucide-react";
import Header from "@/app/header";

const BOOT_LINES = [
  "$ locate --path=$REQUEST",
  "resolving route...",
  "checking sitemap.json...",
];

export default function NotFound() {
  const pathname = usePathname();
  const [visibleLines, setVisibleLines] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [glitch, setGlitch] = useState(false);

  // Boot sequence: reveal console lines one at a time, then the result.
  useEffect(() => {
    if (visibleLines < BOOT_LINES.length) {
      const t = setTimeout(() => setVisibleLines((n) => n + 1), 260);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShowResult(true), 320);
    return () => clearTimeout(t);
  }, [visibleLines]);

  // Occasional subtle glitch flicker on the 404 mark, not continuous.
  useEffect(() => {
    if (!showResult) return;
    const interval = setInterval(
      () => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 180);
      },
      3200 + Math.random() * 2000,
    );
    return () => clearInterval(interval);
  }, [showResult]);

  return (
    <div className="min-h-screen bg-[#000000] text-gray-200 overflow-hidden relative">
      <div className="w-full bg-[#000000]/70 backdrop-blur-sm fixed top-0 z-[100]">
        <Header />
      </div>

      {/* Ambient atmosphere — same as landing/project pages */}
      <div className="fixed top-[-20vh] left-[-10vw] w-[600px] h-[600px] bg-neutral-700/5 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[400px] h-[400px] bg-neutral-500/4 rounded-full blur-[70px] pointer-events-none z-0" />
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.05] z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.7) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Faint scanlines — signature texture for this page only */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-5 sm:px-10 pt-24 pb-16">
        <div className="w-full max-w-2xl">
          {/* Console frame */}
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden shadow-[0_4px_60px_rgba(0,0,0,0.5)]">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <span className="ml-3 flex items-center gap-1.5 text-[11px] font-mono text-gray-600">
                <TerminalSquare size={12} />
                modred.dev — router
              </span>
            </div>

            {/* Body */}
            <div className="px-6 sm:px-9 py-9 sm:py-12 font-mono">
              {/* Boot lines */}
              <div className="flex flex-col gap-1.5 mb-6 min-h-[90px]">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <p
                    key={i}
                    className="text-[13px] text-gray-500 animate-[fadeIn_0.3s_ease-out]"
                  >
                    <span className="text-neutral-400/60">{">"}</span>{" "}
                    {line.replace("$REQUEST", pathname || "/unknown")}
                  </p>
                ))}
              </div>

              {/* 404 mark */}
              <div
                className={`relative select-none transition-opacity duration-500 ${
                  showResult ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-[11px] tracking-[0.25em] uppercase text-neutral-400/70 mb-2">
                  route_error: <span className="text-gray-500">not_found</span>
                </p>
                <h1
                  className={`font-orbitron text-[4.5rem] sm:text-[6rem] font-black leading-none tracking-tight bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent ${
                    glitch ? "opacity-80" : ""
                  }`}
                  style={
                    glitch
                      ? {
                          textShadow:
                            "2px 0 rgba(96,165,250,0.5), -2px 0 rgba(255,255,255,0.3)",
                        }
                      : undefined
                  }
                >
                  404
                </h1>

                <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent my-5" />

                <p className="text-sm text-gray-400 leading-relaxed font-sans max-w-md">
                  This path doesn't resolve to anything I've built. It may
                  have moved, been renamed or never existed.
                </p>
                <p className="text-[12px] text-gray-600 mt-2 break-all">
                  {pathname || "/unknown"}
                  <span className="inline-block w-[7px] h-[13px] bg-neutral-400/70 ml-1 align-middle animate-[blink_1s_steps(1)_infinite]" />
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-8 font-sans">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                      bg-neutral-500/20 border border-neutral-400/40 text-neutral-100
                      text-[13px] font-bold tracking-wide
                      hover:bg-blue-500/30 hover:border-blue-300/70 hover:text-white
                      hover:-translate-y-[1px]
                      transition-[transform,background-color,border-color,color] duration-200"
                  >
                    <ArrowLeft size={13} />
                    Back to base
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                      border border-white/10 bg-white/[0.03] text-gray-300
                      text-[13px] font-semibold tracking-wide
                      hover:bg-white/[0.06] hover:border-white/20 hover:text-white
                      hover:-translate-y-[1px]
                      transition-[transform,background-color,border-color,color] duration-200"
                  >
                    <Rocket size={13} />
                    View projects
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] text-gray-700 font-mono mt-6 tracking-wide">
            error code 404 · connection to modred.dev intact
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}