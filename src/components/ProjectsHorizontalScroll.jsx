// src/components/ProjectsHorizontalScroll.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Rocket, Share, Github, ArrowUpRight, MoveRight } from "lucide-react";

export default function ProjectsHorizontalScroll({
  projects = [],
  header = null,
  footer = null,
}) {
  const bleedRef = useRef(null);
  const pinRef = useRef(null);
  const stageRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const bleed = bleedRef.current;
    const pin = pinRef.current;
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!bleed || !pin || !stage || !viewport || !track) return;

    const reduceMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Coarse pointers (phones/tablets) drive the pan with momentum scrolling,
    // which already carries its own easing — a second layer of lerp on top of
    // it reads as lag, so we track the finger more tightly there.
    const coarseMQ = window.matchMedia("(pointer: coarse)");

    let travel = 0; // px the track must pan across
    let target = 0; // where the track should be
    let current = 0; // where it is right now (eased)
    let raf = null;
    let inView = false;
    let lastIndex = -1;

    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    function publishIndex(i) {
      if (i !== lastIndex) {
        lastIndex = i;
        setActiveIndex(i);
      }
    }

    function apply() {
      track.style.transform = `translate3d(${-current}px, 0, 0)`;
    }

    function computeTarget() {
      const scrollable = pin.offsetHeight - stage.offsetHeight;
      if (scrollable <= 0) {
        target = 0;
        publishIndex(0);
        return;
      }
      const p = clamp(-pin.getBoundingClientRect().top / scrollable, 0, 1);
      target = p * travel;
      publishIndex(Math.round(p * (projects.length - 1)));
    }

    function tick() {
      const diff = target - current;
      if (Math.abs(diff) < 0.15) {
        current = target;
        apply();
        raf = null;
        return;
      }
      current += diff * (coarseMQ.matches ? 0.3 : 0.14);
      apply();
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (raf === null) raf = requestAnimationFrame(tick);
    }

    function measure() {
      // Exact viewport width (excludes the scrollbar). Using raw 100vw here is
      // what makes full-bleed sections overflow by the scrollbar width and give
      // the whole page a horizontal wobble.
      const vw = `${document.documentElement.clientWidth}px`;
      // Guard the write, otherwise the ResizeObserver below re-triggers itself.
      if (bleed.style.getPropertyValue("--bleed-w") !== vw) {
        bleed.style.setProperty("--bleed-w", vw);
      }

      // Flexbox scrollWidth drops the track's trailing padding in some engines,
      // so measure the real content edge off the last card instead.
      const last = track.lastElementChild;
      const padRight = parseFloat(getComputedStyle(track).paddingRight) || 0;
      const contentWidth = last
        ? last.offsetLeft + last.offsetWidth + padRight
        : track.scrollWidth;

      // Pan is bounded by the carousel row, not the stage: with header/footer
      // slots the row is narrower than the stage is tall, and measuring the
      // stage would overshoot and leave dead scroll at the end.
      travel = Math.max(0, contentWidth - viewport.clientWidth);
      // Scroll distance == pan distance, so the section is exactly as tall as
      // it needs to be — no arbitrary N*100vh that over- or undershoots.
      pin.style.setProperty("--pin-h", `${stage.offsetHeight + travel}px`);

      computeTarget();
      current = target;
      apply();
    }

    function onScroll() {
      if (!inView) return;
      computeTarget();
      if (reduceMQ.matches) {
        current = target;
        apply();
        return;
      }
      start();
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) onScroll();
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(pin);

    // Card widths are vw-based and images settle after load -> re-measure.
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    window.addEventListener("scroll", onScroll, { passive: true });
    // On mobile, `resize` also fires when the URL bar shows/hides. Height is
    // driven by svh (stable) and the width guard above makes that a no-op.
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);

    measure();

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, [projects.length]);

  if (!projects.length) return null;

  return (
    <div
      ref={bleedRef}
      style={{
      "--bleed-w": "90dvw",
        marginLeft: "calc(50% - var(--bleed-w) / 2)",
        width: "var(--bleed-w)",
      }}
      className="relative"
    >
      <div
        ref={pinRef}
        style={{ "--pin-h": `${projects.length * 90}svh` }}
        className="relative h-[var(--pin-h)]"
      >
        <div
          ref={stageRef}
          className="sticky top-0 h-[100svh] w-full overflow-hidden
          flex flex-col justify-center bg-transparent"
        >
        
          {/* <div className="hidden md:block absolute top-[-15%] left-[10%] w-[420px] h-[420px] bg-blue-700/8 rounded-full blur-[100px] pointer-events-none" />
          <div className="hidden md:block absolute bottom-[-15%] right-[10%] w-[360px] h-[360px] bg-cyan-500/6 rounded-full blur-[90px] pointer-events-none" /> */}

        
          {header && (
            <div className="relative z-30 shrink-0 w-full max-w-5xl mx-auto px-5 sm:px-10 pt-20 md:pt-16">
              {header}
            </div>
          )}

         
          <div
            ref={viewportRef}
            className={`relative w-full min-h-0 flex-1 flex items-center overflow-hidden ${
              footer ? "pb-12" : ""
            }`}
          >
            <div className="absolute inset-y-0 left-0 w-[5vw] md:w-[6vw] z-10 bg-gradient-to-r from-[#01050f] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-[5vw] md:w-[6vw] z-10 bg-gradient-to-l from-[#01050f] to-transparent pointer-events-none" />
            <div
              className={`absolute right-5 md:right-10 z-20 flex items-center gap-2 text-[11px] font-semibold tracking-widest text-blue-400/70 tabular-nums ${
                header ? "top-2" : "top-20 md:top-24"
              }`}
            >
              <span className="text-white">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="opacity-40">/</span>
              <span>{String(projects.length).padStart(2, "0")}</span>
            </div>

            <div
              className={`absolute left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5 md:gap-3 ${
                footer ? "bottom-2 md:bottom-3" : "bottom-6 md:bottom-9"
              }`}
            >
              <span className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-600">
                Scroll
                <MoveRight size={12} className="text-blue-400/50" />
              </span>
              <span className="flex items-center gap-1.5">
                {projects.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                      i === activeIndex
                        ? "w-6 bg-blue-400"
                        : "w-1.5 bg-white/15"
                    }`}
                  />
                ))}
              </span>
            </div>

            <div
            //   ref={trackRef}
              className="flex items-stretch max-h-full gap-5 px-[7vw] sm:gap-8 md:gap-10 md:px-[8vw]
              will-change-transform"
            >
              {projects.map((project, index) => (
                <div
                  key={project.slug}
                  className="group relative mt-4 flex-none
                  w-[86vw] sm:w-[68vw] lg:w-[620px]
                  rounded-2xl border border-white/8 bg-[#070d1a] overflow-hidden
                  flex flex-col shadow-[0_4px_40px_rgba(0,0,0,0.4)]
                  hover:border-blue-400/30 transition-[border-color,box-shadow] duration-500
                  hover:shadow-[0_20px_80px_rgba(96,165,250,0.1)]"
                >
                  <div className="relative w-full h-[26svh] sm:h-[250px] md:h-[40%] md:min-h-[210px] lg:h-[44%] shrink-0 overflow-hidden">
                    <Image
                      src={`https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url`}
                      alt={project.name}
                      fill
                      sizes="(max-width: 640px) 86vw, (max-width: 1024px) 68vw, 620px"
                      className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070d1a]/80 via-[#070d1a]/10 to-transparent" />
                    <span className="absolute top-3 left-3 text-[70px] sm:text-[100px] font-black leading-none select-none pointer-events-none text-blue-500/10">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 flex items-center gap-1.5
                      text-[10px] font-bold tracking-wider uppercase
                      bg-[#01050f]/80 backdrop-blur-[4px] border border-white/10
                      text-green-400 px-2.5 py-1.5 rounded-lg
                      hover:border-green-400/40 transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Live
                    </a>
                  </div>

                  <div className="flex-1 min-h-0 flex flex-col gap-2.5 p-4 sm:gap-3 sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold text-blue-400/50 tracking-[0.15em] uppercase tabular-nums">
                        {String(index + 1).padStart(2, "0")} /
                      </span>
                      <div className="h-px w-8 bg-blue-400/20" />
                      <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-600">
                        Web App
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-[1.75rem] font-black text-white leading-tight tracking-tight group-hover:text-blue-50 transition-colors duration-300">
                        {project.name}
                      </h3>
                      {project.tagline && (
                        <p className="text-blue-400/60 text-[13px] sm:text-sm font-medium mt-1 italic line-clamp-1">
                          {project.tagline}
                        </p>
                      )}
                    </div>

                    <p className="text-gray-400 text-[13px] sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {project.about}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 4).map((s, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md
                          text-teal-300/80 bg-teal-400/8 border border-teal-400/15
                          group-hover:border-teal-400/25 transition-colors duration-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="h-px bg-gradient-to-r from-blue-400/15 via-blue-400/5 to-transparent mt-0.5" />

                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap mt-auto pt-0.5">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="group/btn inline-flex items-center gap-2 px-3 py-1.5 w-fit rounded-xl
                        bg-blue-500/15 border border-blue-400/25 text-blue-300
                        hover:bg-blue-500/25 hover:border-blue-400/50 hover:text-blue-200
                        text-xs font-bold tracking-wide transition-colors duration-300"
                      >
                        <Rocket size={12} />
                        Details
                        <ArrowUpRight
                          size={11}
                          className="opacity-0 hidden -translate-y-0.5 translate-x-0.5
                          group-hover/btn:opacity-100 group-hover/btn:block group-hover/btn:translate-y-0 group-hover/btn:translate-x-0
                          transition-all duration-500"
                        />
                      </Link>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 w-fit rounded-xl
                        bg-white/4 border border-white/10 text-gray-300
                        hover:bg-white/8 hover:border-white/20 hover:text-white
                        text-xs font-bold tracking-wide transition-colors duration-300"
                      >
                        <Share size={12} />
                        Demo
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 w-fit rounded-xl
                        bg-white/4 border border-white/10 text-gray-400
                        hover:bg-white/8 hover:border-white/20 hover:text-gray-200
                        text-xs font-bold tracking-wide transition-colors duration-300"
                      >
                        <Github size={12} />
                        Source
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {footer && (
            <div className="relative z-30 shrink-0 w-full max-w-5xl mx-auto px-5 sm:px-10 pb-5 md:pb-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
