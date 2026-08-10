// src/components/ProjectsHorizontalScroll.jsx
"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Rocket, Share, Github, ArrowUpRight } from "lucide-react";

export default function ProjectsHorizontalScroll({ projects }) {
  const pinWrapRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const pinWrap = pinWrapRef.current;
    const track = trackRef.current;
    if (!pinWrap || !track) return;

    let ticking = false;

    function update() {
      ticking = false;
      const rect = pinWrap.getBoundingClientRect();
      const wrapHeight = pinWrap.offsetHeight;
      const viewportH = window.innerHeight;
      const scrollable = wrapHeight - viewportH;

      if (scrollable <= 0) return;

      const scrolled = -rect.top;
      let progress = scrolled / scrollable;
      progress = Math.max(0, Math.min(1, progress));

      const maxTranslate = track.scrollWidth - window.innerWidth;
      const x = -progress * Math.max(maxTranslate, 0);
      track.style.transform = `translateX(${x}px)`;

      const idx = Math.min(
        projects.length - 1,
        Math.floor(progress * projects.length)
      );
      setActiveIndex(idx);
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [projects.length]);

  return (
    // Full-bleed breakout: this section lives inside a max-w-5xl centered
    // container, so we escape it to get true edge-to-edge horizontal scroll.
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      <div
        ref={pinWrapRef}
        style={{ height: `${projects.length * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-[#01050f]">
          {/* ambient glow, scoped to this stage only */}
          <div className="absolute top-[-15%] left-[10%] w-[420px] h-[420px] bg-blue-700/8 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-15%] right-[10%] w-[360px] h-[360px] bg-cyan-500/6 rounded-full blur-[90px] pointer-events-none" />

          {/* progress indicator */}
          <div className="absolute top-6 sm:top-10 right-5 sm:right-10 z-20 flex items-center gap-2 text-[11px] font-semibold tracking-widest text-blue-400/70 tabular-nums">
            <span className="text-white">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="opacity-40">/</span>
            <span>{String(projects.length).padStart(2, "0")}</span>
          </div>

          <div className="absolute bottom-6 sm:bottom-9 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
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
          </div>

          <div
            ref={trackRef}
            className="flex items-center will-change-transform px-[6vw] sm:px-[8vw] gap-6 sm:gap-10"
          >
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className="group relative flex-none w-[85vw] sm:w-[68vw] lg:w-[620px]
                  rounded-2xl border border-white/8 bg-[#070d1a] overflow-hidden
                  flex flex-col shadow-[0_4px_40px_rgba(0,0,0,0.4)]
                  hover:border-blue-400/30 transition-[border-color,box-shadow] duration-500
                  hover:shadow-[0_20px_80px_rgba(96,165,250,0.1)]"
              >
                <div className="relative w-full h-[190px] sm:h-[250px] md:h-[290px] shrink-0 overflow-hidden">
                  <Image
                    src={`https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url&force=true`}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 68vw, 620px"
                    className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070d1a]/80 via-[#070d1a]/10 to-transparent" />
                  <span className="absolute top-3 left-3 text-[80px] sm:text-[100px] font-black leading-none select-none pointer-events-none text-blue-500/10">
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

                <div className="flex-1 flex flex-col gap-3 p-5 sm:p-7">
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
                    <h3 className="text-2xl sm:text-[1.75rem] font-black text-white leading-tight tracking-tight group-hover:text-blue-50 transition-colors duration-300">
                      {project.name}
                    </h3>
                    {project.tagline && (
                      <p className="text-blue-400/60 text-sm font-medium mt-1 italic">
                        {project.tagline}
                      </p>
                    )}
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
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

                  <div className="h-px bg-gradient-to-r from-blue-400/15 via-blue-400/5 to-transparent mt-1" />

                  <div className="flex items-center gap-3 flex-wrap mt-auto pt-1">
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
      </div>
    </div>
  );
}