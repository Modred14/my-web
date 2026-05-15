"use client";
import Link from "next/link";
import Header from "../header";
import { journey } from "@/lib/experience";
import { Briefcase, CalendarDays, ArrowLeft, Github, Mail, Linkedin } from "lucide-react";
import Image from "next/image";
import Reveal from "../reavel";
import RevealChill from "../revealchill";

export default function ExperiencePage() {
     const socials = [
    {
      link: "https://github.com/Modred14",
      icon: Github,
      name: "GitHub",
    },
    {
      link: "mailto:favourdomirin@gmail.com",
      icon: Mail,
      name: "Email",
    },
    {
      link: "https://ng.linkedin.com/in/omirin-favour",
      icon: Linkedin,
      name: "Linkedin",
    },
  ];
  return (
    <div className="min-h-screen bg-[#01050f] text-gray-200 overflow-hidden">

      {/* ── Atmosphere ── */}
      <div className="fixed top-[-20vh] left-[-10vw] w-[700px] h-[700px] bg-blue-700/6 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[500px] h-[500px] bg-cyan-600/4 rounded-full blur-[120px] pointer-events-none z-0" />
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.06] z-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, #01050f 100%)",
        }}
      />

      {/* ── Header ── */}
      <div className="w-full bg-[#01050f]/50 backdrop-blur-2xl fixed z-[100]">
        <div className="fixed top-[-20vh] left-[-10vw] w-[600px] h-[600px] bg-blue-600/2 rounded-full blur-[120px] pointer-events-none z-0" />
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.18] z-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.6) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #030712 100%)",
          }}
        />
        <Header />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-10 pt-32 pb-24">

        {/* ── Page hero ── */}
        <Reveal>
          <div className="flex flex-col gap-4 mb-12">
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-blue-400/60" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400/70">
                Career
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] tracking-tight">
              Tech{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  Journey
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-400/60 to-transparent rounded-full" />
              </span>
            </h1>
            <p className="text-gray-500 text-base max-w-lg leading-relaxed mt-1">
              Every role, every team, every lesson — the full picture of where I've been and what I've built along the way.
            </p>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs font-semibold text-gray-600 border border-white/8 bg-white/3 px-3 py-1 rounded-full">
                {journey.length} positions
              </span>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500
                  border border-white/10 bg-white/[0.03] px-4 py-2 rounded-lg
                  hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-500/5
                  transition-all duration-200 group"
              >
                <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                Back to Portfolio
              </Link>
            </div>
          </div>
        </Reveal>

        {/* ── Timeline ── */}
        <div className="relative flex flex-col gap-0">
          {/* vertical line */}
          <div className="absolute hidden sm:block left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-400/40 via-blue-400/20 to-transparent pointer-events-none" />

          {journey.map((item, index) => (
            <RevealChill key={index} delay={index * 80}>
              <div className="relative flex gap-6 mb-12 last:pb-0">

                {/* timeline dot */}
                <div className="hidden sm:block relative shrink-0 mt-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#01050f] border-2 border-blue-400/50 flex items-center justify-center z-10 relative">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                  </div>
                </div>

                {/* card */}
                <div className="flex-1 bg-white/[0.03] border border-white/8 rounded-2xl p-6 overflow-hidden relative
                  hover:border-blue-400/25 hover:bg-white/[0.05] transition-all duration-500 group">

                  {/* left accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-400 to-blue-600/30 rounded-l-2xl
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* header */}
                  <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <Briefcase size={13} className="text-blue-400/60" />
                        <p className="font-bold text-[17px] text-white leading-snug">
                          {item.workplace}
                        </p>
                      </div>
                      <p className="text-blue-400 text-sm font-medium mt-0.5 ml-5">
                        {item.position}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 whitespace-nowrap">
                      <CalendarDays size={11} />
                      {item.duration}
                    </span>
                  </div>

                  {/* divider */}
                  <div className="h-px bg-gradient-to-r from-blue-400/10 via-white/5 to-transparent mb-4" />

                  {/* impact bullets */}
                  <ul className="flex flex-col gap-2.5">
                    {item.impact.map((impact, i) => (
                      <li key={i} className="flex gap-3 text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-blue-400/60 flex-shrink-0" />
                        {impact}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealChill>
          ))}
        </div>

        {/* ── Footer strip ── */}
      
          <footer className="mt-16 -mb-30 border-t border-white/10 ">
            <Reveal>
              <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Top row: Brand + Nav */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
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
    </div>
  );
}