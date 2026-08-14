"use client";
import { Github, Mail, Linkedin, ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./reavel";

const socials = [
  { link: "https://github.com/Modred14", icon: Github, name: "GitHub" },
  { link: "mailto:favourdomirin@gmail.com", icon: Mail, name: "Email" },
  {
    link: "https://ng.linkedin.com/in/omirin-favour",
    icon: Linkedin,
    name: "Linkedin",
  },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  return (
    <footer>
      <Reveal>
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-5">
          <div className="h-px bg-white/5 my-6" />
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">
              © {new Date().getFullYear()} Favour Omirin. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg
                border border-white/10 bg-white/[0.02] text-gray-500
                hover:border-blue-400/40 hover:text-blue-400 hover:bg-white/[0.05]
                hover:-translate-y-0.5
                text-[11px] font-semibold tracking-wide uppercase
                transition-[transform,background-color,border-color,color] duration-200"
            >
              Back to top
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}