"use client";
import { projects } from "@/lib/project";
import { journey } from "@/lib/experience";

// ─── Personal constants ───────────────────────────────────────────────────
const FULL_NAME = "Favour Omirin";
const EMAIL = "favourdomirin@gmail.com";
const LOCATION = "Osun State, Nigeria";
const LINKEDIN = "https://ng.linkedin.com/in/omirin-favour";
const LINKEDIN_LABEL = "linkedin.com/in/omirin-favour";
const PORTFOLIO = "modred.dev";
const GITHUB = "github.com/Modred14";

const SUMMARY =
  "Full-Stack Software Engineer with 2+ years of experience designing and shipping production-grade web applications. Specialised in building scalable systems end-to-end — from responsive, accessible frontends with React and Next.js to robust backend APIs with Node.js and PostgreSQL. Proven track record of delivering real-world products, winning competitive hackathons, and collaborating effectively within cross-functional teams. Adept at turning complex requirements into clean, maintainable code that works in production, not just in theory.";

const SKILLS = {
  frontend: [
    "React",
    "Next.js",
    "Vue.js",
    "JavaScript (ES2022+)",
    "TypeScript",
    "HTML5",
    "CSS3",
    "Tailwind CSS",
  ],
  backend: ["Node.js", "Express.js", "REST APIs"],
  databases: ["PostgreSQL (Neon)", "MongoDB", "Firebase Realtime DB"],
  tools: [
    "Git",
    "GitHub",
    "Postman",
    "VS Code",
    "Figma",
    "Lucide React",
    "Resend",
    "Cloudinary",
  ],
  deployment: ["Vercel", "Netlify", "Railway", "Firebase Hosting"],
};

const EDUCATION = [
  {
    institution: "Obafemi Awolowo University",
    degree: "BSc. Software Engineering (In Progress)",
    duration: "Oct 2024 – Present",
    detail:
      "Coursework in data structures, algorithms, databases, and system design.",
  },
  {
    institution: "AltSchool Africa",
    degree: "Diploma in Frontend Engineering",
    duration: "Sep 2023 – Aug 2024",
    detail: "Graduated with a perfect 4.0/4.0 CGPA.",
  },
];

// ─── PDF generation ───────────────────────────────────────────────────────
function buildCVHTML() {
  // 3 bullets per role keeps experience tight
  const expItems = journey
    .filter((j) => !j.position.toLowerCase().includes("ambassador"))
    .map(
      (j) => `
    <div class="entry">
      <div class="entry-header">
        <div>
          <div class="entry-title">${j.workplace}</div>
          <div class="entry-sub">${j.position}</div>
        </div>
        <div class="entry-date">${j.duration}</div>
      </div>
      <ul class="bullet-list">
        ${j.impact
          .slice(0, 3)
          .map((i) => `<li>${i}</li>`)
          .join("")}
      </ul>
    </div>`,
    )
    .join("");

  // 2 projects, 3 highlights each
  const projItems = projects
    .slice(0, 3)
    .map(
      (p) => `
    <div class="entry">
      <div class="entry-header">
        <div>
          <div class="entry-title">${p.name} <span class="tag">${p.tagline}</span></div>
          <div class="entry-sub tech-line">${p.stack.join(" · ")}</div>
        </div>
        <div class="entry-date links-col">
          <a href="${p.link}">${p.link.replace(/^https?:\/\//, "")}</a>
          <a href="${p.github}">${p.github.replace(/^https?:\/\//, "")}</a>
        </div>
      </div>
      <p class="proj-about">${p.about}</p>
      <ul class="bullet-list">
        ${p.highlights
          .slice(0, 3)
          .map((h) => `<li>${h}</li>`)
          .join("")}
      </ul>
    </div>`,
    )
    .join("");

  const eduItems = EDUCATION.map(
    (e) => `
    <div class="entry">
      <div class="entry-header">
        <div>
          <div class="entry-title">${e.institution}</div>
          <div class="entry-sub">${e.degree}</div>
        </div>
        <div class="entry-date">${e.duration}</div>
      </div>
      <p class="proj-about">${e.detail}</p>
    </div>`,
  ).join("");

  const skillRows = [
    { label: "Frontend", items: SKILLS.frontend },
    { label: "Backend", items: SKILLS.backend },
    { label: "Databases", items: SKILLS.databases },
    { label: "Tools & APIs", items: SKILLS.tools },
    { label: "Deployment", items: SKILLS.deployment },
  ]
    .map(
      (r) => `
    <tr>
      <td class="skill-cat">${r.label}</td>
      <td>${r.items.join(", ")}</td>
    </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${FULL_NAME} — CV</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0d1117;
    --muted: #4a5568;
    --rule: #d0d7de;
    --accent: #0d47a1;
    --page: 210mm;
  }

  html, body {
    width: var(--page);
    background: #fff;
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    font-size: 9.5pt;
    line-height: 1.55;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: var(--page);
    min-height: 297mm;
    padding: 14mm 16mm 12mm;
  }

  /* ── Header ── */
  .cv-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 8pt;
    border-bottom: 2px solid var(--accent);
    margin-bottom: 12pt;
    gap: 12pt;
  }
  .cv-name {
    font-family: 'EB Garamond', serif;
    font-size: 26pt;
    font-weight: 600;
    color: var(--ink);
    letter-spacing: -0.3pt;
    line-height: 1;
  }
  .cv-role {
    font-size: 9pt;
    color: var(--accent);
    font-weight: 500;
    margin-top: 3pt;
    letter-spacing: 0.4pt;
    text-transform: uppercase;
  }
  .cv-contact {
    text-align: right;
    font-size: 8.5pt;
    color: var(--muted);
    line-height: 1.7;
  }
  .cv-contact a { color: var(--accent); text-decoration: none; }

  /* ── Section ── */
  .section { margin-bottom: 11pt; }
  .section-title {
    font-family: 'EB Garamond', serif;
    font-size: 10pt;
    font-weight: 600;
    letter-spacing: 1.2pt;
    text-transform: uppercase;
    color: var(--accent);
    border-bottom: 0.75pt solid var(--rule);
    padding-bottom: 2.5pt;
    margin-bottom: 7pt;
  }

  /* ── Summary ── */
  .summary { color: var(--ink); line-height: 1.6; }

  /* ── Entry ── */
  .entry { margin-bottom: 9pt; }
  .entry:last-child { margin-bottom: 0; }

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8pt;
    margin-bottom: 3pt;
  }
  .entry-title {
    font-weight: 600;
    font-size: 9.5pt;
    color: var(--ink);
  }
  .entry-title .tag {
    font-style: italic;
    font-weight: 400;
    color: var(--muted);
    font-size: 8.5pt;
    margin-left: 5pt;
  }
  .entry-sub {
    font-size: 8.5pt;
    color: var(--accent);
    font-weight: 500;
    margin-top: 1pt;
  }
  .tech-line {
    color: var(--muted);
    font-weight: 400;
    font-style: italic;
  }
  .entry-date {
    font-size: 8pt;
    color: var(--muted);
    white-space: nowrap;
    text-align: right;
    flex-shrink: 0;
  }
  .links-col {
    display: flex;
    flex-direction: column;
    gap: 2pt;
    align-items: flex-end;
  }
  .links-col a {
    color: var(--accent);
    text-decoration: none;
    font-size: 7.8pt;
  }

  /* ── Bullets ── */
  .bullet-list {
    padding-left: 10pt;
    margin-top: 3pt;
  }
  .bullet-list li {
    margin-bottom: 2pt;
    color: #2d3748;
  }

  .proj-about {
    font-style: italic;
    color: var(--muted);
    font-size: 8.5pt;
    margin-bottom: 3pt;
  }

  /* ── Skills table ── */
  .skills-table { width: 100%; border-collapse: collapse; }
  .skills-table tr { vertical-align: top; }
  .skills-table td { padding: 2.5pt 0; font-size: 9pt; }
  .skill-cat {
    font-weight: 600;
    color: var(--ink);
    width: 76pt;
    padding-right: 8pt;
    white-space: nowrap;
  }

  /* ── Print ── */
  @media print {
  @page {
       
    size: A4;
  }
    html, body { width: var(--page); }
    .page { padding: 14mm 16mm 12mm; }
    a { color: var(--accent) !important; text-decoration: none !important; }
    .section { page-break-inside: avoid; }
    .entry { page-break-inside: avoid; }
  }
</style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="cv-header">
    <div>
      <div class="cv-name">${FULL_NAME}</div>
      <div class="cv-role">Full-Stack Developer • Software Engineering Student</div>
    </div>
    <div class="cv-contact">
      <a href="mailto:${EMAIL}">${EMAIL}</a><br/>
      ${LOCATION}<br/>
      <a href="${LINKEDIN}">${LINKEDIN_LABEL}</a><br/>
      <a href="https://${PORTFOLIO}">${PORTFOLIO}</a> &nbsp;·&nbsp; <a href="https://${GITHUB}">${GITHUB}</a>
    </div>
  </div>

  <!-- Summary -->
  <div class="section">
    <div class="section-title">Professional Summary</div>
    <p class="summary">${SUMMARY}</p>
  </div>

  <!-- Skills -->
  <div class="section">
    <div class="section-title">Technical Skills</div>
    <table class="skills-table">
      ${skillRows}
    </table>
  </div>

  <!-- Experience -->
  <div class="section">
    <div class="section-title">Experience</div>
    ${expItems}
  </div>

  <!-- Projects -->
  <div class="section">
    <div class="section-title">Featured Projects</div>
    ${projItems}
  </div>

  <!-- Education -->
  <div class="section">
    <div class="section-title">Education</div>
    ${eduItems}
  </div>

</div>
</body>
</html>`;
}

export default function DownloadCVButton({
  className = "",
  onClick,
  children,
}) {
  const handleDownload = () => {
    onClick?.();

    const html = buildCVHTML();
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const printWindow = window.open(url, "_blank");
    if (!printWindow) {
      // Fallback: direct download of HTML (user can print-to-PDF)
      const a = document.createElement("a");
      a.href = url;
      a.download = "Favour-Omirin-CV.html";
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    printWindow.addEventListener("load", () => {
      // Small delay so fonts load
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        // Clean up blob URL after print dialog closes
        printWindow.addEventListener("afterprint", () => {
          URL.revokeObjectURL(url);
        });
      }, 800);
    });
  };

  return (
    <button
      onClick={handleDownload}
      className={className}
      aria-label="Download CV as PDF"
    >
      {children ?? "Download CV"}
    </button>
  );
}
