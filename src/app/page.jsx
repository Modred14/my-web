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
} from "lucide-react";
import Reveal from "./reavel";
import PageLoader from "@/components/PageLoader";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import Image from "next/image";
import GradientDivider from "@/components/GradientDivider";
import RevealLeft from "./revealfrleft";
import RevealRight from "./revealfright";
import RevealChill from "./revealchill";
import Header from "./header";
import Link from "next/link";
import { projects } from "@/lib/project";

export default function Home() {
  const codeFirstYear = 2023;
  const currentYear = new Date().getFullYear();
  const experienceYear = currentYear - codeFirstYear;
  const userPic = "/Favour-Omirin.jpg";
  const journey = [
    {
      workplace: "Techfest 5.0 Hackathon",
      position: "First Place Winner (Contributor)",
      duration: "May 2026",
      impact: [
        "Won first place at Techfest 5.0 (Cred, Code & Culture) as part of a 5-member team for building Tappay",
        "Built TapPay, a payment app integrating PayAza API for wallet funding and transactions",
        "Implemented NFC tap-to-pay, QR scanning, and phone number-based transfers",
        "My team and I designed and shipped mobile and web versions of the product in 32 hours",
        "Delivered a working MVP enabling fast and flexible digital payments for real-world use cases",
      ],
    },
    {
      workplace: "Cowrywise",
      position: "Campus Ambassador (Obafemi Awolowo University)",
      duration: "January 2026 – Present",
      impact: [
        "Increased Cowrywise adoption among students by onboarding new users and improving campus engagement",
        "Planned and executed financial literacy campaigns and outreach programs for undergraduates",
        "Represented Cowrywise at campus events, strengthening brand visibility and student trust",
        "Built and managed partnerships with student organizations to expand campus reach and engagement",
        "Collected and analyzed user feedback to inform product improvements and engagement strategy",
      ],
    },
    {
      workplace: "2Thirty Integrated Services Ltd",
      position: "Frontend Engineer (Internship)",
      duration: "January 2024 – June 2024",
      impact: [
        "Built and maintained scalable web applications using React, JavaScript, and Tailwind CSS",
        "Integrated frontend components with backend APIs to deliver seamless full-stack functionality",
        "Designed responsive, user-focused interfaces optimized for desktop and mobile",
        "Built reusable UI components and patterns to improve maintainability and development speed",
        "Converted UI/UX designs into pixel-accurate pages while ensuring cross-browser compatibility and modern web standards",
      ],
    },

    // {
    //   workplace: "",
    //   position: "",
    //   duration: "",
    //   impact: [],
    // },
  ];

  const languages = [
    // Core Languages
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

    // Frontend
    {
      name: "React",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      img: "https://cdn.simpleicons.org/nextdotjs/FFFFFF",
    },
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

    // Backend
    {
      name: "Node.js",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express.js",
      img: "https://cdn.simpleicons.org/express/FFFFFF",
    },
    {
      name: "PostgreSQL",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MongoDB",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },

    // Tools (keep minimal)
    {
      name: "Git",
      img: "https://cdn.simpleicons.org/git/F05032",
    },
  ];

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
  const compliments = [
    {
      img: "/user.jpg",
      name: "Emmanuel",
      work: "CEO, 2ThirtyIX Integrated Services Ltd",
      message:
        '"He’s a fast learner and strong problem solver, thriving in a high-velocity team. I’d gladly work with him again and recommend him to any employer seeking quick, effective contributors."',
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
    // {
    //   img: "",
    //   name: "",
    //   course: "",
    //   duration: "",
    //   about:
    //     "",
    //          skills: [

    //   ],
    //   link: "",
    // },
  ];
  const getName = () => {
    const names = ["Favour Omirin", "Modred", "Favour"];
    const [index, setIndex] = useState(0);
    useState(() => {
      const interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % names.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);
    return <span id="isname">{names[index]}</span>;
  };

  return (
    <PageLoader>
      <AnalyticsTracker />

      <div className="flex justify-center bg-[#01050f] text-gray-200 text-base relative overflow-hidden">
        {" "}
        <div className="w-full bg-[#01050f]/50 backdrop-blur-2xl fixed z-100">
          <div className="fixed top-[-20vh] left-[-10vw] w-[600px] h-[600px] bg-blue-600/2 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="fixed bottom-[-10vh] right-[-10vw] w-[500px] h-[500px] bg-cyan-500/1 rounded-full blur-[100px] pointer-events-none z-0" />
          <div
            className="fixed inset-0 pointer-events-none opacity-[0.18] z-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(148,163,184,0.6) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #030712 100%)",
            }}
          />
          <Header />
        </div>
        <div className="mt-20 max-w-5xl mx-auto px-5 sm:px-10">
          <Reveal>
            <div className="grid place-items-center">
              <div className="flex flex-col lg:gap-10 lg:flex-row lg:items-center w-full">
                {/* ── Avatar column ── */}
                <div className="grid lg:block place-items-center shrink-0">
                  <div className="relative w-fit">
                    {/* Glow ring behind avatar */}
                    <div className="relative w-40 lg:w-56">
                      {/* Glow layer (outside halo) */}
                      <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-2xl scale-102" />

                      {/* Border glow ring */}
                      <div className="absolute inset-0 rounded-full ring-2 ring-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.6)]" />

                      {/* Image (dimmed slightly) */}
                      <Image
                        src={userPic}
                        alt="Favour Omirin"
                        width={226}
                        height={226}
                        className="relative rounded-full brightness-90 contrast-110"
                      />
                    </div>
                    {/* Status badge */}
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
                  transition-all duration-200"
                        >
                          <Icon size={15} />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* ── Content column ── */}
                <div className="w-full flex flex-col items-center lg:items-start gap-4 text-center lg:text-left pt-6 lg:pt-0">
                  {/* Role pill */}
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-400/80 border border-blue-400/20 px-3 py-1 rounded-full bg-blue-500/5">
                    Software Engineer · Full-Stack Developer
                  </span>

                  {/* Name */}
                  <h1 className="text-[2rem] lg:text-5xl font-extrabold text-white leading-tight">
                    I'm {getName()}
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
                  transition-all duration-200"
                        >
                          <Icon size={15} />
                        </Link>
                      );
                    })}
                  </div>

                  {/* ── Bio block ── */}
                  <div className="flex flex-col gap-3 max-w-xl">
                    {/* Lead sentence — highlighted */}
                    <p className="text-base lg:text-lg font-medium text-white/90 leading-relaxed">
                      {experienceYear}+ years building full-stack web apps and
                      backend systems.
                    </p>

                    {/* Detail — muted */}
                    <p className="text-sm text-gray-500 leading-relaxed">
                      I work primarily with the{" "}
                      <span className="text-gray-300 font-medium">
                        Next.js, JavaScript and PostgreSQL (Neon)
                      </span>{" "}
                      — turning ideas into real products, from full-stack
                      platforms to automation tools. I engineer systems that
                      work in the real world, not just in theory.
                    </p>

                    {/* Tags row */}
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
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <section id="journey">
              <div className="pt-14">
                <div className="flex gap-4 mb-4 items-center">
                  <p className="border border-blue-400 text-blue-400 p-2 rounded-xl bg-blue-500/20">
                    <Briefcase />
                  </p>
                  <p className="text-[28px] font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                    Professional Experience
                  </p>
                </div>
                <GradientDivider />
              </div>

              <div className="pt-8 flex flex-col gap-5">
                {journey.map((journeys, index) => (
                  <Reveal>
                    <div
                      key={index}
                      className="relative bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden"
                    >
                      {/* left accent bar */}
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-400 rounded-l-2xl" />

                      {/* header */}
                      <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                        <div>
                          <p className="font-semibold text-[17px] text-white">
                            {journeys.workplace}
                          </p>
                          <p className="text-blue-400 text-sm font-medium mt-0.5">
                            {journeys.position}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 whitespace-nowrap">
                          <CalendarDays size={12} />
                          {journeys.duration}
                        </span>
                      </div>

                      {/* divider */}
                      <div className="h-px bg-white/10 mb-4" />

                      {/* impact bullets */}
                      <ul className="flex flex-col gap-2">
                        {journeys.impact.map((impact, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-sm text-gray-300 leading-relaxed"
                          >
                            <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                            {impact}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          </Reveal>
          <Reveal>
            <section id="projects">
              {/* ── Section header ── */}
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

                  {/* View all — desktop */}
                  <Link
                    href="/projects"
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl
                      text-xs font-bold tracking-wide text-blue-400/80 border border-blue-400/20
                      bg-blue-500/5 hover:bg-blue-500/15 hover:border-blue-400/40 hover:text-blue-300
                      transition-all duration-300 group"
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

              {/* ── Project rows — capped at 2 ── */}
              <div className="pt-10 flex flex-col gap-0">
                {projects.slice(0, 2).map((project, index) => {
                  const Wrapper = index % 2 === 0 ? RevealLeft : RevealRight;
                  const isEven = index % 2 === 0;
                  return (
                    <Wrapper key={project.slug}>
                      <div
                        className={`group relative flex flex-col ${
                          isEven ? "md:flex-row" : "md:flex-row-reverse"
                        } gap-0 md:gap-14 pb-8 md:pb-10
                        border-b border-white/[0.06] last:border-b-0 items-center`}
                      >
                        {/* Ghost number */}
                        <span
                          className={`absolute -top-10 ${
                            isEven ? "-left-2" : "-right-2"
                          } text-[110px] z-99 md:text-[140px] font-black leading-none select-none
                          pointer-events-none text-blue-500/[0.1]
                          group-hover:text-blue-400/[0.11] transition-colors duration-700`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* ── Image ── */}
                        <div className="w-full md:w-[54%] shrink-0">
                          <div
                            className="relative overflow-hidden rounded-2xl border border-white/8
                              group-hover:border-blue-400/30 transition-all duration-700
                              shadow-[0_4px_40px_rgba(0,0,0,0.4)]
                              group-hover:shadow-[0_20px_80px_rgba(96,165,250,0.1)]"
                          >
                            <Image
                              src={`https://api.microlink.io/?url=${encodeURIComponent(
                                project.link,
                              )}&screenshot=true&meta=false&embed=screenshot.url`}
                              alt={project.name}
                              width={900}
                              height={520}
                              className="w-full h-65 sm:h-[340px] object-cover object-top
                                transition-transform duration-[1.2s] ease-out
                                group-hover:scale-[1.04]"
                            />
                            {/* gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#01050f]/70 via-[#01050f]/10 to-transparent" />

                            {/* live badge */}
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute top-3 right-3 flex items-center gap-1.5
                                text-[10px] font-bold tracking-wider uppercase
                                bg-[#01050f]/80 backdrop-blur-sm border border-white/10
                                text-green-400 px-2.5 py-1.5 rounded-lg
                                hover:border-green-400/40 transition-colors duration-200"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                              Live
                            </a>
                          </div>
                        </div>

                        {/* ── Content ── */}
                        <div className="flex-1 flex flex-col justify-center gap-5 pt-8 md:pt-0">
                          {/* index + category line */}
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-bold text-blue-400/50 tracking-[0.15em] uppercase tabular-nums">
                              {String(index + 1).padStart(2, "0")} /
                            </span>
                            <div className="h-px w-8 bg-blue-400/20" />
                            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-gray-600">
                              Web App
                            </span>
                          </div>

                          {/* title + tagline */}
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

                          {/* about */}
                          <p className="text-gray-400 text-sm leading-relaxed ">
                            {project.about}
                          </p>

                          {/* stack */}
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

                          {/* divider */}
                          <div className="h-px bg-gradient-to-r from-blue-400/15 via-blue-400/5 to-transparent" />

                          {/* CTAs */}
                          <div className="flex items-center gap-3 flex-wrap">
                            <Link
                              href={`/projects/${project.slug}`}
                              className="group/btn inline-flex items-center gap-2 px-3 py-1.5 w-fit rounded-xl
                                bg-blue-500/15 border border-blue-400/25 text-blue-300
                                hover:bg-blue-500/25 hover:border-blue-400/50 hover:text-blue-200
                                text-xs font-bold tracking-wide transition-all duration-300
                                hover:shadow-[0_0_20px_rgba(96,165,250,0.12)]"
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
                                text-xs font-bold tracking-wide transition-all duration-300"
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
                                text-xs font-bold tracking-wide transition-all duration-300"
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

              {/* ── View all — mobile + bottom CTA ── */}
              <div className=" flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-gray-600">
                  Showing {Math.min(2, projects.length)} of {projects.length}{" "}
                  projects
                </p>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                    text-sm font-bold text-white border border-white/10 bg-white/5
                    hover:bg-white/10 hover:border-white/20
                    transition-all duration-300 group"
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
          <Reveal>
            <section id="technologies">
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
                    {" "}
                    <div
                      key={i}
                      className="group flex flex-col items-center gap-3 p-4 rounded-2xl
                     bg-white/[0.03] border border-white/8
                     hover:bg-blue-500/10 hover:border-blue-400/30
                     hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(96,165,250,0.08)]
                     transition-all duration-300 cursor-default"
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
          <Reveal>
            <section id="education">
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
                    <div
                      key={index}
                      className="group relative h-full flex flex-col rounded-2xl overflow-hidden
                     bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/20
                     border border-blue-400/15 hover:border-blue-400/40
                     transition-all duration-500 hover:shadow-[0_0_40px_rgba(96,165,250,0.08)]
                     hover:-translate-y-1"
                    >
                      {/* Top accent bar */}
                      <div
                        className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      {/* Subtle background glow */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      />

                      <div className="relative p-6 flex flex-col h-full gap-4">
                        {/* Header */}
                        <div className="flex items-start gap-4">
                          <div
                            className="shrink-0 p-[3px] rounded-xl bg-gradient-to-br from-blue-400/30 to-blue-600/10 
                              border border-blue-400/20"
                          >
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

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-400/10 to-transparent" />

                        {/* About */}
                        <p className="text-gray-400 text-sm leading-relaxed flex-1">
                          {education.about}
                        </p>

                        {/* Footer: skills + link */}
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
                           transition-all duration-300"
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
          <Reveal>
            <section id="reviews">
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
                    <div
                      key={index}
                      className="group relative h-full flex flex-col rounded-2xl overflow-hidden
                     bg-gradient-to-br from-blue-950/40 via-slate-900/60 to-blue-950/20
                     border border-blue-400/15 hover:border-blue-400/40
                     transition-all duration-500 hover:shadow-[0_0_40px_rgba(96,165,250,0.08)]
                     hover:-translate-y-1"
                    >
                      {/* Top accent bar */}
                      <div
                        className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-400/60 to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      {/* Inner glow */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      />

                      <div className="relative p-6 flex flex-col h-full gap-5">
                        {/* Quote icon */}
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

                        {/* Message */}
                        <p className="text-gray-300 text-sm leading-relaxed flex-1 italic">
                          {compliment.message}
                        </p>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-blue-400/10 to-transparent" />

                        {/* Author */}
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
          <div className="pt-14">
            <Reveal>
              <section className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a0a]">
                {/* Subtle grid texture */}
                <div
                  className="absolute inset-0 opacity-[0.03] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {/* Single centered glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative px-8 py-14 flex flex-col items-center text-center gap-5">
                  {/* Eyebrow label */}
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-blue-400/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    Available for work
                  </span>

                  {/* Heading */}
                  <h2 className="text-2xl lg:text-3xl font-bold text-white leading-snug max-w-md">
                    Got a project in mind?{" "}
                    <span className="text-blue-400">Let's build it.</span>
                  </h2>

                  {/* Subtext */}
                  <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                    I'm open to freelance work, full-time roles, and interesting
                    collaborations.
                  </p>

                  {/* CTA Button */}
                  <Link
                    href="mailto:favourdomirin@gmail.com"
                    className="mt-1 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg
            bg-blue-800 text-white text-sm font-semibold
            hover:bg-blue-700 hover:-translate-y-0.5
            transition-all duration-200 shadow-[0_0_24px_rgba(59,130,246,0.3)]"
                  >
                    <Mail size={14} />
                    Send me an email
                  </Link>
                </div>
              </section>
            </Reveal>
          </div>

          <footer className="mt-16 -mb-5 border-t border-white/10 ">
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
                      { label: "Experience", href: "#journey" },
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
    </PageLoader>
  );
}
