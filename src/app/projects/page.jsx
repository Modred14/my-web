// /src/app/projects/page.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "../header";
import { projects } from "@/lib/project";
import { Github, Mail, Linkedin, ArrowLeft } from "lucide-react";
import Reveal from "../reavel";
import ProjectsHorizontalScroll from "@/components/ProjectsHorizontalScroll";

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
   
    <div className="min-h-screen bg-[#000000] text-gray-200">
     <div className="w-full bg-[#000000]/70 backdrop-blur-sm top-0 fixed z-100">
        <Header />
      </div>   {/* ── Atmosphere — removed center orb (invisible at /3 opacity), reduced blur radii ── */}
      <div className="fixed top-[-15vh] left-[-5vw] w-[600px] h-[600px] bg-neutral-700/5 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10vh] right-[-10vw] w-[400px] h-[400px] bg-neutral-600/4 rounded-full blur-[70px] pointer-events-none z-0" />

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
    

      <div className="relative z-10">
        {/* ── Page hero ── */}
        <div className="max-w-5xl mx-auto px-5 sm:px-10 pt-28 ">
          <div className="flex flex-col gap-4 mb-3">
            <Reveal>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-neutral-400/60" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400/70">
                  Portfolio
                </span>
              </div>
            </Reveal>
            <Reveal>
              <h1 className="text-5xl sm:text-6xl font-black text-white leading-[1.05] tracking-tight">
                Featured{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-neutral-400 via-neutral-300 to-neutral-500 bg-clip-text text-transparent">
                    Projects
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-neutral-400/60 to-transparent rounded-full" />
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

       
        <div className="pb-16">
          <ProjectsHorizontalScroll projects={projects} />
        </div>
      </div>

      {/* ── Footer ── */}
         <footer className="max-w-5xl mx-auto  ">
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
                <div className="flex flex-col -mb-6 md:flex-row items-center justify-between gap-4">
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