"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { X, Menu, Download } from "lucide-react";
import DownloadCVButton from "@/lib/CvGenrator";

const navLinks = [
  // { label: "About", href: "/#about" },
  { label: "Experience", href: "/#journey" },
  { label: "Projects", href: "/#projects" },
  { label: "Education", href: "/#education" },
];

export default function Header() {
  const [currentTime, setCurrentTime] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Clock
  useEffect(() => {
    const tick = () => {
      setCurrentTime(
        new Intl.DateTimeFormat(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking — scroll-position based for accuracy
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("/#", "")).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          } else {
            // If this section is leaving, only clear it if it's currently active
            setActiveSection((prev) => (prev === entry.target.id ? "" : prev));
          }
        });
      },
      {
        threshold: 0.3, // section must be 30% visible to activate
        rootMargin: "0px 0px -20% 0px", // ignore bottom 20% of viewport
      },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const close = () => setSidebarOpen(false);

  return (
    <>
      <header
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#01050f]/90 backdrop-blur-md  border-white/6 shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-10 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-sm scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/logo.png"
                alt="Modred Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain relative"
              />
            </div>
            <span className="font-bold text-sm tracking-widest uppercase text-white/90 group-hover:text-white transition-colors duration-200">
              Modred.dev
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.replace("/#", "");
              const isActive = activeSection === id;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors duration-200 ${
                    isActive
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-[2px] rounded-full bg-blue-400" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Clock — hidden on small screens */}
            <span className=" font-mono text-xs text-gray-500 tabular-nums">
              {currentTime}
            </span>

            {/* Download CV — desktop */}
            <DownloadCVButton
              href="/Favour-Omirin-CV.pdf"
              download
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg
                text-xs font-bold tracking-wide text-blue-300
                border border-blue-400/25 bg-blue-500/10
                hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-200
                transition-colors duration-200"
            >
              <Download size={11} />
              Resume
            </DownloadCVButton>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
              className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg
                border border-white/10 text-gray-400 hover:text-white hover:border-white/25
                transition-colors duration-200"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile sidebar overlay ── */}
      {/* Backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-[200] h-svh bg-black/60  transition-opacity duration-300 md:hidden ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[201] h-svh w-[280px] bg-[#070d1a] border-l border-white/[0.08]
          flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
            <span className="font-bold text-xs tracking-widest uppercase text-white/80">
              Modred.dev
            </span>
          </div>
          <button
            onClick={close}
            aria-label="Close menu"
            className="w-7 h-7 flex items-center justify-center rounded-md
              border border-white/10 text-gray-500 hover:text-white hover:border-white/25
              transition-colors duration-200"
          >
            <X size={14} />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex flex-col gap-1 px-4 pt-6 flex-1">
          {navLinks.map((link, i) => {
            const id = link.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={close}
                style={{ transitionDelay: sidebarOpen ? `${i * 40}ms` : "0ms" }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
                  transition-colors duration-200 ${
                    isActive
                      ? "text-blue-400 bg-blue-500/10 border border-blue-400/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-blue-400" : "bg-white/10"}`}
                />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Drawer footer */}
        <div className="px-4 py-6 border-t border-white/[0.06] flex flex-col gap-3">
          <DownloadCVButton
            href="/Favour-Omirin-CV.pdf"
            download
            onClick={close}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl
              text-sm font-bold text-white
              bg-blue-600 hover:bg-blue-500
              transition-colors duration-200 shadow-[0_0_20px_rgba(59,130,246,0.25)]"
          >
            <Download size={14} />
            Download Resume
          </DownloadCVButton>
          <p className="text-center font-mono text-xs text-gray-600 tabular-nums">
            {currentTime}
          </p>
        </div>
      </aside>
    </>
  );
}
