"use client";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Github,
  ArrowLeft,
  ExternalLink,
  Layers,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  Mail,
  Linkedin,
} from "lucide-react";
import { projects } from "@/lib/project";
import Header from "@/app/header";
import RevealChill from "@/app/revealchill";
import Reveal from "@/app/reavel";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const socials = [
    { link: "https://github.com/Modred14", icon: Github, name: "GitHub" },
    { link: "mailto:favourdomirin@gmail.com", icon: Mail, name: "Email" },
    { link: "https://ng.linkedin.com/in/omirin-favour", icon: Linkedin, name: "Linkedin" },
  ];

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = projects[currentIndex - 1] ?? null;
  const nextProject = projects[currentIndex + 1] ?? null;

  return (
    <div className="min-h-screen bg-[#01050f] text-gray-200 -hidden">

      {/* ── Atmosphere — reduced blur radii, removed center orb (unnoticeable visually) ── */}
      <div className="fixed top-[-20vh] left-[-10vw] w-[600px] h-[600px] bg-blue-700/5 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[400px] h-[400px] bg-cyan-600/4 rounded-full blur-[70px] pointer-events-none z-0" />

      {/* Single dot grid — removed duplicate vignette overlay layer */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.05] z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Header — removed 3 duplicate fixed layers; backdrop-blur-2xl → sm ── */}
      <div className="w-full bg-[#01050f]/70 backdrop-blur-sm fixed z-[100]">
        <Header />
      </div>

      <div className="relative z-10 pt-4">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 mt-10 pb-24">

          {/* ── Hero image ── */}
          <Reveal>
            <div className="relative w-full h-[55vh] rounded-t-4xl min-h-[380px] overflow-hidden">
              <Image
                src={`https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url`}
                alt={project.name}
                fill
                className="object-cover object-top scale-[1.02]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#01050f] via-[#01050f]/60 to-[#01050f]/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#01050f]/40 to-transparent" />

              {/* back button */}
              <div className="absolute top-6 left-6 sm:left-10">
                <Link
                  href="/projects"
                  className="inline-flex border-blue-300/50 items-center gap-2 text-xs font-semibold text-gray-400
                    bg-[#01050f]/70 backdrop-blur-[4px] border px-3 py-2 rounded-lg
                    hover:text-blue-400 hover:border-blue-400/30 transition-colors duration-200 group"
                >
                  <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                  Back
                </Link>
              </div>

              {/* live badge */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-6 right-6 sm:right-10 flex items-center gap-1.5
                  text-[10px] font-bold tracking-wider uppercase
                  bg-[#01050f]/80 backdrop-blur-[4px] border border-blue-300/50
                  text-green-400 px-3 py-2 rounded-lg
                  hover:border-green-400/40 transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live
              </a>

              {/* hero text */}
              <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 pb-10 max-w-5xl mx-auto">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-6 bg-blue-400/60" />
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400/70">
                    Featured Project
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.02] tracking-tight">
                  {project.name}
                </h1>
                {project.tagline && (
                  <p className="text-blue-300/70 text-base font-medium mt-2 italic">{project.tagline}</p>
                )}
              </div>
            </div>
          </Reveal>

          {/* ── CTA row ── */}
          <Reveal>
            <div className="flex flex-wrap items-center pt-3 justify-between gap-4 pb-10 border-b border-white/[0.07]">
              <div className="flex flex-wrap gap-3">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:px-5 sm:py-2.5 px-3 py-1.5 w-fit rounded-xl
                    bg-blue-500/15 border border-blue-400/25 text-blue-300
                    hover:bg-blue-500/25 hover:border-blue-400/50 hover:text-blue-200
                    text-sm font-bold transition-colors duration-300 group"
                >
                  <ExternalLink size={14} />
                  Live Demo
                  <ArrowUpRight size={12} className="group-hover:block hidden opacity-0 group-hover:opacity-100 -translate-y-0.5 translate-x-0.5
                    group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:px-5 sm:py-2.5 px-3 py-1.5 w-fit rounded-xl
                    bg-white/5 border border-white/10 text-gray-300
                    hover:bg-white/10 hover:border-white/20 hover:text-white
                    text-sm font-bold transition-colors duration-300"
                >
                  <Github size={14} />
                  View Source
                </a>
              </div>
              <span className="text-xs text-gray-600 tabular-nums">
                {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>
          </Reveal>

          {/* ── Main grid ── */}
          <Reveal>
            <div className="mt-10 grid md:grid-cols-3 gap-10 lg:gap-16">

              {/* Left — overview + highlights */}
              <div className="md:col-span-2 flex flex-col gap-12">
                {/* Overview */}
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/15 border border-blue-400/25 flex items-center justify-center">
                      <Zap size={12} className="text-blue-400" />
                    </div>
                    <h2 className="text-[13px] font-bold text-white tracking-wide uppercase">Overview</h2>
                  </div>
                  <div className="flex flex-col gap-4 pl-1 border-l border-blue-400/10">
                    {project.description.map((para, i) => (
                      <p key={i} className="text-gray-400 text-sm leading-[1.8] pl-4">{para}</p>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/15 border border-blue-400/25 flex items-center justify-center">
                      <CheckCircle2 size={12} className="text-blue-400" />
                    </div>
                    <h2 className="text-[13px] font-bold text-white tracking-wide uppercase">Key Features</h2>
                  </div>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {project.highlights.map((item, i) => (
                      <RevealChill key={i} delay={i * 50}>
                        <li className="flex gap-3 items-start text-sm text-gray-300 leading-relaxed
                          bg-white/[0.02] border border-white/[0.06] rounded-xl p-4
                          hover:border-blue-400/20 hover:bg-blue-500/[0.03]
                          transition-colors duration-300">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400/70 flex-shrink-0" />
                          {item}
                        </li>
                      </RevealChill>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right — sticky sidebar */}
              <div className="flex flex-col gap-5">
                <div className="sticky top-28 flex flex-col gap-5">
                  {/* Tech stack card */}
                  <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5
                    hover:border-blue-400/20 transition-colors duration-300">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-lg bg-blue-500/15 border border-blue-400/25 flex items-center justify-center">
                        <Layers size={12} className="text-blue-400" />
                      </div>
                      <h2 className="text-[11px] font-bold text-white uppercase tracking-[0.12em]">Tech Stack</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((s, i) => (
                        <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-md
                          text-teal-300/80 bg-teal-400/8 border border-teal-400/15
                          hover:border-teal-400/30 transition-colors duration-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick links card */}
                  <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5
                    hover:border-blue-400/20 transition-colors duration-300">
                    <h2 className="text-[11px] font-bold text-white uppercase tracking-[0.12em] mb-4">Links</h2>
                    <div className="flex flex-col gap-2">
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between text-sm text-gray-400
                          hover:text-blue-400 transition-colors duration-200 group py-1">
                        <span className="flex items-center gap-2">
                          <ExternalLink size={13} />
                          Live Demo
                        </span>
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </a>
                      <div className="h-px bg-white/[0.05]" />
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-between text-sm text-gray-400
                          hover:text-blue-400 transition-colors duration-200 group py-1">
                        <span className="flex items-center gap-2">
                          <Github size={13} />
                          GitHub Repo
                        </span>
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Prev / Next nav ── */}
          <Reveal>
            {(prevProject || nextProject) && (
              <div className="mt-20 pt-10 border-t border-white/[0.07]">
                <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-gray-600 mb-6">More Projects</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {prevProject ? (
                    <Link href={`/projects/${prevProject.slug}`}
                      className="group flex items-center gap-4 p-5 rounded-2xl
                        bg-white/[0.02] border border-white/[0.07]
                        hover:border-blue-400/25 hover:bg-blue-500/[0.04]
                        transition-colors duration-300">
                      <ArrowLeft size={16} className="text-gray-600 group-hover:text-blue-400 group-hover:-translate-x-0.5
                        transition-[color,transform] duration-200 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">Previous</p>
                        <p className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors duration-200 truncate">
                          {prevProject.name}
                        </p>
                      </div>
                    </Link>
                  ) : <div />}

                  {nextProject ? (
                    <Link href={`/projects/${nextProject.slug}`}
                      className="group flex items-center justify-end gap-4 p-5 rounded-2xl
                        bg-white/[0.02] border border-white/[0.07]
                        hover:border-blue-400/25 hover:bg-blue-500/[0.04]
                        transition-colors duration-300 text-right">
                      <div className="min-w-0">
                        <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-1">Next</p>
                        <p className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors duration-200 truncate">
                          {nextProject.name}
                        </p>
                      </div>
                      <ArrowUpRight size={16} className="text-gray-600 group-hover:text-blue-400
                        group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                        transition-[color,transform] duration-200 flex-shrink-0" />
                    </Link>
                  ) : <div />}
                </div>
              </div>
            )}
          </Reveal>

          {/* ── Footer ── */}
          <footer className="mt-16 -mb-30 border-t border-white/10">
            <Reveal>
              <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                  <div className="flex items-center gap-3">
                    <Image src="/logo.png" alt="Modred" width={32} height={32} className="w-8 h-8 object-contain" />
                    <div>
                      <p className="font-bold text-sm text-white tracking-widest uppercase">Modred.dev</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">Favour Omirin · Software Engineer</p>
                    </div>
                  </div>
                  <nav className="flex flex-wrap gap-x-8 gap-y-2">
                    {[
                      { label: "Experience", href: "experience" },
                      { label: "Projects", href: "projects" },
                      { label: "Education", href: "/#education" },
                      { label: "Testimonials", href: "/#reviews" },
                    ].map((item) => (
                      <Link key={item.label} href={`/${item.href}`}
                        className="text-xs text-gray-400 hover:text-white transition-colors duration-200 tracking-wide">
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="h-px bg-white/5 mb-8" />
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-gray-600 order-2 md:order-1">
                    © {new Date().getFullYear()} Favour Omirin. All rights reserved.
                  </p>
                  <div className="flex items-center gap-2 order-1 md:order-2">
                    {socials.map((social) => {
                      const Icon = social.icon;
                      return (
                        <Link key={social.name} href={social.link} target="_blank" rel="noopener noreferrer" title={social.name}
                          className="w-8 h-8 flex items-center justify-center rounded-md
                            border border-white/10 text-gray-500
                            hover:border-white/25 hover:text-white hover:bg-white/5
                            transition-colors duration-200">
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
      </div>
    </div>
  );
}