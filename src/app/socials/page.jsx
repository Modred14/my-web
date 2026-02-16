"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Globe,
  Facebook,
  X,
  Music2,
  User,
  ArrowUpRight,
  Copy,
  Check,
  Ghost,
} from "lucide-react";

function k(n) {
  if (typeof n !== "number") return "—";
  if (n < 1000) return String(n);
  const units = ["K", "M", "B"];
  let v = n;
  let i = -1;
  while (v >= 1000 && i < units.length - 1) {
    v /= 1000;
    i++;
  }
  const dec = v >= 10 || i === 0 ? 1 : 2;
  return `${v.toFixed(dec).replace(/\.0$/, "")}${units[i]}`;
}

export default function Page() {
  const socials = useMemo(
    () => [
      {
        id: "github",
        name: "GitHub",
        handle: "@Modred14",
        link: "https://github.com/Modred14",
        showCount: true,
      },
      {
        id: "portfolio",
        name: "Portfolio",
        handle: "modred.dev",
        link: "https://modred.dev",
        showCount: false,
      },
      {
        id: "linkedin",
        name: "LinkedIn",
        handle: "Favour Omirin",
        link: "https://ng.linkedin.com/in/omirin-favour",
        showCount: true,
      },
      {
        id: "instagram",
        name: "Instagram",
        handle: "@_m.o.d.r.e.d",
        link: "https://www.instagram.com/_m.o.d.r.e.d",
        showCount: true,
      },
      {
        id: "x",
        name: "X",
        handle: "@modred_dev",
        link: "https://x.com/modred_dev",
        showCount: true,
      },
      {
        id: "tiktok",
        name: "TikTok",
        handle: "@_modred",
        link: "https://www.tiktok.com/@_modred",
        showCount: true,
      },
      {
        id: "facebook",
        name: "Facebook",
        handle: "favour.omirin7",
        link: "https://web.facebook.com/favour.omirin7/",
        showCount: true,
      },
      {
        id: "aboutme",
        name: "About.me",
        handle: "favouromirin",
        link: "https://about.me/favouromirin",
        showCount: false,
      },
      {
        id: "email",
        name: "Email",
        handle: "favourdomirin@gmail.com",
        link: "mailto:favourdomirin@gmail.com",
        showCount: false,
      },
      {
        id: "snapchat",
        name: "Snapchat",
        handle: "real_modred",
        link: "https://www.snapchat.com/add/real_modred",
        showCount: true,
      },
    ],
    [],
  );

  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const manualCounts = useMemo(
    () => ({
      instagram: 150,
      tiktok: 2000,
      linkedin: 1300,
      facebook: 3500,
      snapchat: 1800,
      x: 99,
      portfolio: null,
      email: null,
      aboutme: null,
    }),
    [],
  );

  const mergedCounts = useMemo(() => {
    return { ...manualCounts, ...counts };
  }, [manualCounts, counts]);

  function formatFollowers(id) {
    if (id === "x") return "<100";
    const n = mergedCounts[id];
    if (typeof n !== "number") return "N/A";
    return `${k(n)}+`;
  }
  const totalFollowers = useMemo(() => {
    // platforms you want to EXCLUDE from the total
    const exclude = new Set(["portfolio", "email", "aboutme"]);

    return Object.entries(mergedCounts).reduce((sum, [key, value]) => {
      if (exclude.has(key)) return sum;
      if (typeof value !== "number") return sum;
      return sum + value;
    }, 0);
  }, [mergedCounts]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch("/api/socials", { cache: "no-store" });
        const data = await res.json();
        if (!cancelled) setCounts(data || {});
      } catch {
        // ignore
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    const t = setInterval(load, 10 * 60 * 1000); // every 10 mins
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  const icons = {
    github: <Github className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    tiktok: <Music2 className="h-5 w-5" />,
    aboutme: <User className="h-5 w-5" />,
    x: <X className="h-5 w-5" />,
    email: <Mail className="h-5 w-5" />,
    portfolio: <Globe className="h-5 w-5" />,
    facebook: <Facebook className="h-5 w-5" />,
    snapchat: <Ghost className="h-5 w-5" />,
  };

  async function copyLink() {
    try {
      await navigator.clipboard.writeText("https://modred.dev/socials");
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // ignore
    }
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 relative overflow-hidden">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-[620px] w-[620px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.10),transparent_55%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-2xl px-5 py-14">
        {/* header card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
          <div className="p-7 sm:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-300">Social Hub</p>
                <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Modred — find me anywhere
                </h1>
                <p className="mt-2 text-gray-300 text-sm sm:text-base">
                  All links in one place. Live counts where platforms allow it.
                </p>
              </div>

              <button
                onClick={copyLink}
                className="shrink-0 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition px-4 py-3 flex items-center gap-2"
                aria-label="Copy page link"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="text-sm">
                  {copied ? "Copied" : "Copy link"}
                </span>
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs text-gray-400">
                  Total followers across platform
                </p>

                <p className="text-xl font-extrabold">
                  {loading ? "…" : `${k(totalFollowers)}+`}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs text-gray-400">Total Platforms</p>

                <p className="text-xl font-extrabold">{socials.length}</p>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

          {/* links */}
          <div className="p-5 sm:p-7">
            <div className="grid gap-3">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.link}
                  target={s.id === "email" ? undefined : "_blank"}
                  rel={s.id === "email" ? undefined : "noopener noreferrer"}
                  className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-11 w-11 rounded-2xl border border-white/10 bg-black/30 grid place-items-center">
                      {icons[s.id]}
                    </div>

                    <div className="min-w-0">
                      <p className="font-bold leading-tight">{s.name}</p>
                      <p className="text-sm text-gray-300 truncate">
                        {s.handle || s.link}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-gray-400">Followers</p>

                      <p className="text-sm font-semibold flex justify-center">
                        {s.id === "github"
                          ? loading
                            ? "…"
                            : `${k(mergedCounts.github)}+`
                          : formatFollowers(s.id)}
                      </p>
                    </div>

                    <ArrowUpRight className="h-5 w-5 opacity-70 group-hover:opacity-100 transition" />
                  </div>
                </a>
              ))}
            </div>

            <p className="mt-5 text-xs text-gray-400 leading-relaxed">
              Follower counts are not updated in real time and may vary from
              current values.
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Modred
        </p>
      </div>
    </div>
  );
}
