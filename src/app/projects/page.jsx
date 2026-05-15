"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "../header";
import { projects } from "@/lib/project";
import {
  Rocket,
  Share,
  Github,
  ArrowUpRight,
  Mail,
  Layers,
  Linkedin,
  ArrowLeft,
} from "lucide-react";
import RevealRight from "../revealfright";
import Reveal from "../reavel";
import RevealLeft from "../revealfrleft";

export default function ProjectsPage() {
  const socials = [
    { link: "https://github.com/Modred14", icon: Github, name: "GitHub" },
    { link: "mailto:favourdomirin@gmail.com", icon: Mail, name: "Email" },
    {
      link: "https://ng.linkedin.com/in/omirin-favour",
      icon: Linkedin,
      name: "Linkedin",
    },
  ];

  return (
    <div className="min-h-screen  bg-[#01050f] text-gray-200 overflow-hidden">
      {/* ── Atmosphere — removed center orb (invisible at /3 opacity), reduced blur radii ── */}
      <div className="fixed top-[-15vh] left-[-5vw] w-[600px] h-[600px] bg-blue-700/5 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[400px] h-[400px] bg-cyan-600/4 rounded-full blur-[70px] pointer-events-none z-0" />

      {/* Single dot grid — removed duplicate vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.05] z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(148,163,184,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Header — removed 4 duplicate fixed layers; backdrop-blur-2xl → sm ── */}
      <div className="w-full bg-[#01050f]/70 backdrop-blur-sm fixed z-100">
        <Header />
      </div>

      <div className="relative z-10">
        {/* ── Page hero ── */}
        <div className="max-w-5xl mx-auto px-5 sm:px-10 mt-28 pb-16">
          <div className="flex flex-col gap-4 mb-3">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-blue-400/60" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400/70">
                  Portfolio
                </span>
              </div>
            </Reveal>
            <Reveal>
              <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] tracking-tight">
                Featured{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                    Projects
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-400/60 to-transparent rounded-full" />
                </span>
              </h1>
            </Reveal>
            <Reveal>
              <p className="text-gray-500 text-base max-w-lg leading-relaxed mt-1">
                A selection of things I've shipped — from productivity tools to
                consumer apps. Each one built to solve a real problem.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <div className="flex items-center gap-2 mt-6">
              <span className="text-xs font-semibold text-gray-600 border border-white/8 bg-white/3 px-3 py-1 rounded-full">
                {projects.length} projects
              </span>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500
                  border border-white/10 bg-white/[0.03] px-4 py-2 rounded-lg
                  hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-500/5
                  transition-colors duration-200 group"
              >
                <ArrowLeft
                  size={13}
                  className="group-hover:-translate-x-0.5 transition-transform duration-200"
                />
                Back to Portfolio
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ── Projects list ── */}
        <div className="max-w-5xl mx-auto px-5 sm:px-10 pb-24 flex flex-col gap-0">
          {projects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
         <footer className="max-w-5xl mx-auto -mb-7 ">
            <Reveal>
              <div className="max-w-5xl mx-auto px-6 pb-12">
                {/* Top row: Brand + Nav */}
                <div className="flex flex-col md:flex-row pt-12 md:items-center border-t border-white/10  justify-between gap-8 mb-10">
                  {/* Brand */}
                  <div className="flex items-center gap-3">
                    <Image
                      src="/logo.png"
                      alt="Modred"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                    <div>
                      <p className="font-bold text-sm text-white tracking-widest uppercase">
                        Modred.dev
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Favour Omirin · Software Engineer
                      </p>
                    </div>
                  </div>

                  {/* Nav */}
                  <nav className="flex flex-wrap gap-x-8 gap-y-2">
                    {[
                      { label: "Experience", href: "experience" },
                      { label: "Projects", href: "projects" },
                      { label: "Education", href: "/#education" },
                      { label: "Testimonials", href: "/#reviews" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="text-xs text-gray-400 hover:text-white transition-colors duration-200 tracking-wide"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/5 mb-8" />

                {/* Bottom row: Copyright + Socials */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-gray-600 order-2 md:order-1">
                    © {new Date().getFullYear()} Favour Omirin. All rights
                    reserved.
                  </p>

                  {/* Socials */}
                  <div className="flex items-center gap-2 order-1 md:order-2">
                    {socials.map((social) => {
                      const Icon = social.icon;
                      return (
                        <Link
                          key={social.name}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={social.name}
                          className="w-8 h-8 flex items-center justify-center rounded-md
                border border-white/10 text-gray-500
                hover:border-white/25 hover:text-white hover:bg-white/5
                transition-all duration-200"
                        >
                          <Icon size={14} />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Reveal>
          </footer>
    </div>
  );
}

function ProjectRow({ project, index }) {
  const isEven = index % 2 === 0;
  const Wrapper = isEven ? RevealLeft : RevealRight;

  return (
    <Wrapper>
      <div
        className={`group relative flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
        gap-0 md:gap-16 items-center py-16 md:py-24
        border-b border-white/[0.06] last:border-b-0`}
      >
        {/* ghost number */}
        <span
          className={`absolute top-8 ${isEven ? "-left-4 md:-left-8" : "-right-4 md:-right-8"}
          text-[120px] md:text-[160px] font-black leading-none select-none pointer-events-none
          text-blue-500/[0.07] group-hover:text-blue-400/[0.12] transition-colors duration-700`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* ── Image column ── */}
        <div className="w-full md:w-[52%] shrink-0">
          {/* FIX: transition-all → specific properties */}
          <div
            className="relative overflow-hidden rounded-2xl border border-white/8
            group-hover:border-blue-400/30 transition-[border-color,box-shadow] duration-500
            shadow-[0_4px_40px_rgba(0,0,0,0.4)]
            group-hover:shadow-[0_20px_80px_rgba(96,165,250,0.1)]"
          >
            <Image
              src={`https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url`}
              alt={project.name}
              width={900}
              height={520}
              className="w-full h-65 sm:h-[380px] object-cover object-top
                transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#01050f]/70 via-[#01050f]/10 to-transparent" />
            {/* FIX: backdrop-blur pinned to tiny value */}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 flex items-center gap-1.5
                text-[10px] font-bold tracking-wider uppercase
                bg-[#01050f]/80 backdrop-blur-[4px] border border-white/10
                text-green-400 px-2.5 py-1.5 rounded-lg
                hover:border-green-400/40 transition-colors duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live
            </a>
          </div>
        </div>

        {/* ── Content column ── */}
        <div className="flex-1 flex flex-col justify-center gap-5 pt-8 md:pt-0">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-blue-400/50 tracking-[0.15em] uppercase tabular-nums">
              {String(index + 1).padStart(2, "0")} /
            </span>
            <div className="h-px flex-1 max-w-[40px] bg-blue-400/20" />
            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-600">
              Web App
            </span>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight group-hover:text-blue-50 transition-colors duration-300">
              {project.name}
            </h2>
            {project.tagline && (
              <p className="text-blue-400/70 text-sm font-medium mt-1 italic">
                {project.tagline}
              </p>
            )}
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            {project.about}
          </p>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <Layers size={11} className="text-gray-600" />
              <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-600">
                Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s, i) => (
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
          </div>

          <div className="h-px bg-gradient-to-r from-blue-400/15 via-blue-400/5 to-transparent" />

          {/* FIX: transition-all → transition-colors on all CTAs */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={`/projects/${project.slug}`}
              className="group/btn inline-flex items-center gap-2 sm:px-5 sm:py-2.5 px-3 py-1.5 w-fit rounded-xl
                bg-blue-500/15 border border-blue-400/25 text-blue-300
                hover:bg-blue-500/25 hover:border-blue-400/50 hover:text-blue-200
                text-xs font-bold tracking-wide transition-colors duration-300"
            >
              <Rocket size={12} />
              Details
            </Link>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:px-5 sm:py-2.5 px-3 py-1.5 w-fit rounded-xl
                bg-white/4 border border-white/10 text-gray-300
                hover:bg-white/8 hover:border-white/20 hover:text-white
                text-xs font-bold tracking-wide transition-colors duration-300"
            >
              <Share size={12} />
              Live Demo
            </a>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 sm:px-5 sm:py-2.5 px-3 py-1.5 w-fit rounded-xl
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
    </Wrapper>
  );
}
