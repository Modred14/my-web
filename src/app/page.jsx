"use client";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Code,
  Github,
  Share,
  Linkedin,
  NotepadText,
  School,
  Mail,
  TerminalSquare,
  Rocket,
  CalendarDays,
  ArrowUpRight,
  Download,
} from "lucide-react";
import DownloadCVButton from "@/lib/CvGenrator";
import HashScrollHandler from "@/components/Hash";
import Reveal from "./reavel";
import Image from "next/image";
import GradientDivider from "@/components/GradientDivider";
import RevealLeft from "./revealfrleft";
import RevealRight from "./revealfright";
import RevealChill from "./revealchill";
import Header from "./header";
import Link from "next/link";
import { projects } from "@/lib/project";
import { journey } from "@/lib/experience";

export default function Home() {
  const codeFirstYear = 2023;
  const currentYear = new Date().getFullYear();
  const experienceYear = currentYear - codeFirstYear - 1;
  const userPic = "/Favour-Omirin.jpg";

  // FIX: getName() called hooks inside a nested function — invalid React, causes
  // crashes/stale closures on iOS. Moved state + effect to component top level.
  const names = ["Favour Omirin", "Modred", "Favour"];
  const [nameIndex, setNameIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setNameIndex((prev) => (prev + 1) % names.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
  }, []);
  const languages = [
    {
      name: "JavaScript",
      img: "https://cdn.simpleicons.org/javascript/F7DF1E",
    },
    {
      name: "TypeScript",
      img: "https://cdn.simpleicons.org/typescript/3178C6",
    },
    {
      name: "Python",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "React",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    { name: "Next.js", img: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
    {
      name: "HTML5",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "Tailwind CSS",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Node.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    { name: "Express.js", img: "https://cdn.simpleicons.org/express/FFFFFF" },
    {
      name: "PostgreSQL",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MongoDB",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    { name: "Git", img: "https://cdn.simpleicons.org/git/F05032" },
  ];

  const socials = [
    { link: "https://github.com/Modred14", icon: Github, name: "GitHub" },
    { link: "mailto:favourdomirin@gmail.com", icon: Mail, name: "Email" },
    {
      link: "https://ng.linkedin.com/in/omirin-favour",
      icon: Linkedin,
      name: "Linkedin",
    },
  ];

  const compliments = [
    {
      img: "/user.jpg",
      name: "Emmanuel",
      work: "CEO, 2ThirtyIX Integrated Services Ltd",
      message:
        "\"He's a fast learner and strong problem solver, thriving in a high-velocity team. I'd gladly work with him again and recommend him to any employer seeking quick, effective contributors.\"",
    },
    {
      img: "/avater-client.png",
      name: "Faiq",
      work: "CFO, Nepo Games",
      message:
        '"Working with him was smooth and professional from start to finish. He understood my requirements quickly, communicated clearly, and delivered exactly what was promised on time."',
    },
    {
      img: "/avat.jpg",
      name: "John",
      work: "Backend Engineer, 2ThirtyIX Integrated Services",
      message:
        '"During our time working together, he consistently delivered clean, reliable frontend solutions and collaborated well with backend workflows. He asks the right questions and executes fast."',
    },
  ];

  const educations = [
    {
      img: "/oaul.png",
      name: "Obafemi Awolowo University",
      course: "BSc. Software Engineering (In Progress)",
      duration: "Oct 2024 – Present",
      about:
        "Studying core software engineering principles including data structures, algorithms, databases, and system design.",
      skills: [
        "Python",
        "Version Control",
        "API",
        "Software Development",
        "Web Technologies",
        "Algorithms",
        "Data Structures",
      ],
      link: "https://oauife.edu.ng/",
    },
    {
      img: "/altschool.png",
      name: "AltSchool Africa",
      course: "Frontend Engineering",
      duration: "Sep 2023 – Aug 2024",
      about:
        "Graduated from AltSchool Africa with a perfect 4.0/4.0 CGPA, reflecting strong technical discipline, consistency, and a commitment to high-quality software engineering.",
      skills: [
        "TypeScript",
        "Version Control",
        "JavaScript",
        "React",
        "HTML5",
        "Vue.js",
        "Next.js",
        "CSS3",
      ],
      link: "https://altschoolafrica.com/",
    },
  ];

  return (
    <div>
      <HashScrollHandler />
      <div className="flex  justify-center bg-[#01050f] text-gray-200 text-base relative">
        <div className="w-full bg-[#01050f]/70 backdrop-blur-sm fixed z-100">
          <Header />
        </div>

        <div className="fixed top-[-20vh] left-[-10vw] w-[600px] h-[600px] bg-blue-700/5 rounded-full blur-[80px] pointer-events-none z-0" />
        <div className="fixed bottom-[-10vh] right-[-10vw] w-[400px] h-[400px] bg-cyan-500/4 rounded-full blur-[70px] pointer-events-none z-0" />
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.05] z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(148,163,184,0.7) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div
          className="mt-20 scroll-mt-24 max-w-5xl mx-auto px-5 sm:px-10 
         z-10"
        >
          <Reveal>
            <div className="grid place-items-center">
              <div className="flex flex-col lg:gap-10 lg:flex-row lg:items-center w-full">
                {/* ── Avatar column ── */}
                <div className="grid lg:block place-items-center shrink-0">
                  <div className="relative w-fit">
                    <div className="relative w-40 lg:w-56">
                      <div className="absolute inset-0 rounded-full bg-blue-500/25 blur-2xl scale-102" />
                      <div className="absolute inset-0 rounded-full ring-2 ring-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.5)]" />
                      <Image
                        src={userPic}
                        alt="Favour Omirin"
                        width={226}
                        height={226}
                        priority
                        className="relative rounded-full brightness-90 contrast-110"
                      />
                    </div>
                    <span
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap
                      flex items-center gap-1.5 bg-[#0f0f0f] border border-white/10
                      text-[10px] font-semibold text-green-400 px-2.5 py-1 rounded-full shadow-lg"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Open to work
                    </span>
                  </div>

                  {/* Socials — desktop */}
                  <div className="hidden lg:flex gap-3 pt-8 -mb-5 justify-center">
                    {socials.map((social) => {
                      const Icon = social.icon;
                      return (
                        <Link
                          key={social.name}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 flex items-center justify-center rounded-lg
                            border border-white/10 text-gray-500
                            hover:border-blue-400/40 hover:text-blue-400
                            transition-colors duration-200"
                        >
                          <Icon size={15} />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* ── Content column ── */}
                <div className="w-full flex flex-col items-center lg:items-start gap-4 text-center lg:text-left pt-6 lg:pt-0">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-400/80 border border-blue-400/20 px-3 py-1 rounded-full bg-blue-500/5">
                    Software Engineer · Full-Stack Developer
                  </span>

                  {/* FIX: was calling getName() which illegally used hooks inside a function */}
                  <h1 className="text-[2rem] lg:text-5xl font-extrabold text-white leading-tight">
                    I'm {names[nameIndex]}
                  </h1>

                  {/* Socials — mobile */}
                  <div className="flex lg:hidden gap-3 py-1">
                    {socials.map((social) => {
                      const Icon = social.icon;
                      return (
                        <Link
                          key={social.name}
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 flex items-center justify-center rounded-lg
                            border border-white/10 text-gray-500
                            hover:border-blue-400/40 hover:text-blue-400
                            transition-colors duration-200"
                        >
                          <Icon size={15} />
                        </Link>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-3 max-w-xl">
                    <p className="text-base lg:text-lg font-medium text-white/90 leading-relaxed">
                      {experienceYear}+ years building full-stack web apps and
                      backend systems.
                    </p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      I work primarily with{" "}
                      <span className="text-gray-300 font-medium">
                        Next.js, JavaScript and PostgreSQL (Neon)
                      </span>{" "}
                      — turning ideas into real products, from full-stack
                      platforms to automation tools. I engineer systems that
                      work in the real world, not just in theory.
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-1">
                      {[
                        "MERN Stack",
                        "Version Control",
                        "System Design",
                        "Automation",
                        "Production Apps",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-medium text-gray-400 bg-white/5 border border-white/8 px-3 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                   <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-1">
  <Link
    href="#projects"
    className="
      inline-flex items-center gap-2
      px-5 py-2.5 rounded-lg
      bg-blue-500/20
      border border-blue-400/40
      text-blue-100
      text-[13px] font-bold font-mono tracking-wide
      hover:bg-blue-500/30
      hover:border-blue-300/70
      hover:text-white
      shadow-[0_0_20px_rgba(59,130,246,0.12)]
      transition-all duration-200
      hover:-translate-y-[1px]
    "
  >
    My Projects
  </Link>

  <DownloadCVButton
    href="/Favour-Omirin-CV.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="
      inline-flex items-center gap-2
      px-5 py-2.5 rounded-lg
      border border-white/10
      bg-white/[0.03]
      text-gray-300
      text-[13px] font-semibold font-mono tracking-wide
      hover:bg-white/[0.06]
      hover:border-white/20
      hover:text-white
      transition-all duration-200
      hover:-translate-y-[1px]
    "
  >
    <Download size={12} />
    Resume
  </DownloadCVButton>
</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Experience ── */}
          <Reveal>
            <section className="scroll-mt-8" id="journey">
              <div className="pt-14">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-4 items-center">
                    <p className="border border-blue-400 text-blue-400 p-2 rounded-xl bg-blue-500/20">
                      <Briefcase />
                    </p>
                    <p className="text-[28px] font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                      Professional Experience
                    </p>
                  </div>
                  <Link
                    href="/experience"
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl
                      text-xs font-bold tracking-wide text-blue-400/80 border border-blue-400/20
                      bg-blue-500/5 hover:bg-blue-500/15 hover:border-blue-400/40 hover:text-blue-300
                      transition-colors duration-300 group"
                  >
                    Full journey
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
                <GradientDivider />
              </div>

              <div className="pt-8 flex flex-col gap-5">
                <div className="relative flex flex-col gap-0">
                  <div className="absolute hidden sm:block left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-400/40 via-blue-400/20 to-transparent pointer-events-none" />
                  {journey.slice(0, 2).map((item, index) => (
                    <RevealChill key={index} delay={index * 80}>
                      <div className="relative flex gap-6 mb-12">
                        <div className="hidden sm:block relative shrink-0 mt-1.5">
                          <div className="w-6 h-6 rounded-full bg-[#01050f] border-2 border-blue-400/50 flex items-center justify-center z-10 relative">
                            <div className="w-2 h-2 rounded-full bg-blue-400" />
                          </div>
                        </div>
                        {/* FIX: transition-all → transition-colors */}
                        <div
                          className="flex-1 bg-white/[0.03] border border-white/8 rounded-2xl p-6 overflow-hidden relative
                          hover:border-blue-400/25 hover:bg-white/[0.05] transition-colors duration-300 group"
                        >
                          <div
                            className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-400 to-blue-600/30 rounded-l-2xl
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                          <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-0.5">
                                <Briefcase
                                  size={13}
                                  className="text-blue-400/60"
                                />
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
                          <div className="h-px bg-gradient-to-r from-blue-400/10 via-white/5 to-transparent mb-4" />
                          <ul className="flex flex-col gap-2.5">
                            {item.impact.map((impact, i) => (
                              <li
                                key={i}
                                className="flex gap-3 text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
                              >
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
              </div>

              <div className="pt-8 -mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-600">
                  Showing {Math.min(2, journey.length)} of {journey.length}{" "}
                  positions
                </p>
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                    text-sm font-bold text-white border border-white/10 bg-white/5
                    hover:bg-white/10 hover:border-white/20 transition-colors duration-300 group"
                >
                  View full journey
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </section>
          </Reveal>

          {/* ── Projects ── */}
          <Reveal>
            <section className="scroll-mt-8" id="projects">
              <div className="pt-14">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-4 items-center">
                    <p className="border border-blue-400 text-blue-400 p-2 rounded-xl bg-blue-500/20">
                      <Code />
                    </p>
                    <p className="text-[28px] font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                      Featured Projects
                    </p>
                  </div>
                  <Link
                    href="/projects"
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl
                      text-xs font-bold tracking-wide text-blue-400/80 border border-blue-400/20
                      bg-blue-500/5 hover:bg-blue-500/15 hover:border-blue-400/40 hover:text-blue-300
                      transition-colors duration-300 group"
                  >
                    View all projects
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
                <GradientDivider />
              </div>

              <div className="pt-10 flex flex-col gap-0">
                {projects.slice(0, 2).map((project, index) => {
                  const Wrapper = index % 2 === 0 ? RevealLeft : RevealRight;
                  const isEven = index % 2 === 0;
                  return (
                    <Wrapper key={project.slug}>
                      <div
                        className={`group relative flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-0 md:gap-14 pb-8 md:pb-10
                        border-b border-white/[0.06] last:border-b-0 items-center`}
                      >
                        <span
                          className={`absolute -top-10 ${isEven ? "-left-2" : "-right-2"} text-[110px] z-99 md:text-[140px] font-black leading-none select-none
                          pointer-events-none text-blue-500/10 group-hover:text-blue-400/11 transition-colors duration-700`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <div className="w-full md:w-[54%] shrink-0">
                          {/* FIX: transition-all → specific properties */}
                          <div
                            className="relative overflow-hidden rounded-2xl border border-white/8
                            group-hover:border-blue-400/30 transition-[border-color,box-shadow] duration-500
                            shadow-[0_4px_40px_rgba(0,0,0,0.4)] group-hover:shadow-[0_20px_80px_rgba(96,165,250,0.1)]"
                          >
                            <Image
                              src={`https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url`}
                              alt={project.name}
                              width={900}
                              height={520}
                              className="w-full h-65 sm:h-[340px] object-cover object-top
                                transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#01050f]/70 via-[#01050f]/10 to-transparent" />
                            {/* FIX: backdrop-blur-sm only (was unspecified, inherited heavy blur) */}
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
                        </div>

                        <div className="flex-1 flex flex-col justify-center gap-5 pt-8 md:pt-0">
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
                            <h3 className="text-3xl md:text-[2rem] font-black text-white leading-tight tracking-tight group-hover:text-blue-50 transition-colors duration-300">
                              {project.name}
                            </h3>
                            {project.tagline && (
                              <p className="text-blue-400/60 text-sm font-medium mt-1 italic">
                                {project.tagline}
                              </p>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm leading-relaxed">
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
                          <div className="h-px bg-gradient-to-r from-blue-400/15 via-blue-400/5 to-transparent" />
                          <div className="flex items-center gap-3 flex-wrap">
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
                    </Wrapper>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-600">
                  Showing {Math.min(2, projects.length)} of {projects.length}{" "}
                  projects
                </p>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                    text-sm font-bold text-white border border-white/10 bg-white/5
                    hover:bg-white/10 hover:border-white/20 transition-colors duration-300 group"
                >
                  View all projects
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </section>
          </Reveal>

          {/* ── Technologies ── */}
          <Reveal>
            <section className="scroll-mt-8" id="technologies">
              <div className="pt-14">
                <div className="flex gap-4 mb-4 items-center">
                  <p className="border border-blue-400 text-blue-400 p-2 rounded-xl bg-blue-500/20">
                    <TerminalSquare />
                  </p>
                  <p className="text-[28px] font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                    Technologies
                  </p>
                </div>
                <GradientDivider />
              </div>
              <div className="pt-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {languages.map((language, i) => (
                  <RevealChill key={i} delay={i * 50}>
                    {/* FIX: transition-all → specific properties; hover:-translate-y-1 kept but isolated */}
                    <div
                      className="group flex flex-col items-center gap-3 p-4 rounded-2xl
                      bg-white/[0.03] border border-white/8
                      hover:bg-blue-500/10 hover:border-blue-400/30 hover:-translate-y-1
                      transition-[transform,background-color,border-color] duration-300 cursor-default"
                    >
                      <img
                        src={language.img}
                        className="w-8 h-8 object-contain"
                        alt={language.name}
                      />
                      <span className="text-[11px] text-center text-gray-400 group-hover:text-gray-200 transition-colors duration-300 leading-tight">
                        {language.name}
                      </span>
                    </div>
                  </RevealChill>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ── Education ── */}
          <Reveal>
            <section className="scroll-mt-8" id="education">
              <div className="pt-14">
                <div className="flex items-center gap-4 mb-4">
                  <p className="border border-blue-400 text-blue-400 p-2 rounded-xl bg-blue-500/20">
                    <School />
                  </p>
                  <p className="text-[28px] font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                    Education
                  </p>
                </div>
                <GradientDivider />
              </div>
              <div className="pt-12 grid md:grid-cols-2 gap-6 items-stretch">
                {educations.map((education, index) => (
                  <RevealChill key={index} delay={index * 50}>
                    {/* FIX: transition-all → specific properties */}
                    <div
                      className="group relative h-full flex flex-col rounded-2xl overflow-hidden
                      bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/20
                      border border-blue-400/15 hover:border-blue-400/40
                      transition-[transform,border-color,box-shadow] duration-500
                      hover:shadow-[0_0_40px_rgba(96,165,250,0.08)] hover:-translate-y-1"
                    >
                      <div
                        className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      />
                      <div className="relative p-6 flex flex-col h-full gap-4">
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 p-[3px] rounded-xl bg-gradient-to-br from-blue-400/30 to-blue-600/10 border border-blue-400/20">
                            <Image
                              src={education.img}
                              width={48}
                              height={48}
                              className="w-11 h-11 rounded-[10px] object-cover"
                              alt={education.name}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-semibold text-white leading-snug truncate">
                              {education.name}
                            </p>
                            <p className="text-blue-400 text-sm font-medium mt-0.5 leading-snug">
                              {education.course}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
                              <p className="text-gray-500 text-xs">
                                {education.duration}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-400/10 to-transparent" />
                        <p className="text-gray-400 text-sm leading-relaxed flex-1">
                          {education.about}
                        </p>
                        <div className="flex items-end justify-between gap-3 pt-1">
                          <div className="flex flex-wrap gap-1.5">
                            {education.skills.map((skill, i) => (
                              <span
                                key={i}
                                className="text-[11px] font-medium px-2 py-0.5 rounded-md
                                text-teal-300 bg-teal-400/10 border border-teal-400/20
                                group-hover:border-teal-400/35 transition-colors duration-300"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                          <Link
                            href={education.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 p-1.5 rounded-lg border border-blue-400/20 text-blue-400/60
                              hover:text-blue-400 hover:border-blue-400/50 hover:bg-blue-400/10
                              transition-colors duration-300"
                            aria-label="View credential"
                          >
                            <Share size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </RevealChill>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ── Testimonials ── */}
          <Reveal>
            <section className="scroll-mt-8" id="reviews">
              <div className="pt-14">
                <div className="flex items-center gap-4 mb-4">
                  <p className="border border-blue-400 text-blue-400 p-2 rounded-xl bg-blue-500/20">
                    <NotepadText />
                  </p>
                  <p className="text-[28px] font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                    Testimonials
                  </p>
                </div>
                <GradientDivider />
              </div>
              <div className="pt-12 grid md:grid-cols-2 gap-6 items-stretch">
                {compliments.map((compliment, index) => (
                  <RevealChill key={index} delay={index * 50}>
                    {/* FIX: transition-all → specific properties */}
                    <div
                      className="group relative h-full flex flex-col rounded-2xl overflow-hidden
                      bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/20
                      border border-blue-400/15 hover:border-blue-400/40
                      transition-[transform,border-color,box-shadow] duration-500
                      hover:shadow-[0_0_40px_rgba(96,165,250,0.08)] hover:-translate-y-1"
                    >
                      <div
                        className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      />
                      <div className="relative p-6 flex flex-col h-full gap-5">
                        <div className="text-blue-400/20 group-hover:text-blue-400/35 transition-colors duration-500">
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="currentColor"
                          >
                            <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5c0-1.38 1.12-2.5 2.5-2.5V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5c0-1.38 1.12-2.5 2.5-2.5V8z" />
                          </svg>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed flex-1 italic">
                          {compliment.message}
                        </p>
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-400/10 to-transparent" />
                        <div className="flex items-center gap-3">
                          <div className="p-[2px] rounded-full bg-gradient-to-br from-blue-400/40 to-blue-600/10 border border-blue-400/20 shrink-0">
                            <Image
                              src={compliment.img}
                              width={40}
                              height={40}
                              className="w-9 h-9 rounded-full object-cover"
                              alt={compliment.name}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white leading-snug">
                              {compliment.name}
                            </p>
                            <p className="text-blue-400/70 text-xs mt-0.5">
                              {compliment.work}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RevealChill>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ── CTA ── */}
          <div className="pt-14">
            <Reveal>
              <section className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a0a]">
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* FIX: blur-3xl → blur-2xl (less GPU pressure) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative px-8 py-14 flex flex-col items-center text-center gap-5">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-blue-400/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    Available for work
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white leading-snug max-w-md">
                    Got a project in mind?{" "}
                    <span className="text-blue-400">Let's build it.</span>
                  </h2>
                  <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                    I'm open to freelance work, full-time roles, and interesting
                    collaborations.
                  </p>
                  {/* FIX: transition-all → specific properties */}
                  <Link
                    href="mailto:favourdomirin@gmail.com"
                    className="mt-1 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg
                      bg-blue-800 text-white text-sm font-semibold
                      hover:bg-blue-700 hover:-translate-y-0.5
                      transition-[transform,background-color] duration-200
                      shadow-[0_0_24px_rgba(59,130,246,0.3)]"
                  >
                    <Mail size={14} />
                    Send me an email
                  </Link>
                </div>
              </section>
            </Reveal>
          </div>

          {/* ── Footer ── */}
          <footer className="mt-16 -mb-5 border-t border-white/10">
            <Reveal>
              <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
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
                  <nav className="flex flex-wrap gap-x-8 gap-y-2">
                    {[
                      { label: "Experience", href: "experience" },
                      { label: "Projects", href: "projects" },
                      { label: "Education", href: "#education" },
                      { label: "Testimonials", href: "#reviews" },
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
                <div className="h-px bg-white/5 mb-8" />
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-gray-600 order-2 md:order-1">
                    © {new Date().getFullYear()} Favour Omirin. All rights
                    reserved.
                  </p>
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
                            transition-colors duration-200"
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
    </div>
  );
}
