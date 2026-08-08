export const metadata = {
  title: "Projects | Favour Omirin",
  description:
    "Selected projects built by Favour Omirin (Modred) — full-stack applications built with React, Next.js, TypeScript, and Node.js.",
  alternates: {
    canonical: "https://modred.dev/projects",
  },
  openGraph: {
    title: "Projects | Favour Omirin",
    description:
      "Selected projects built by Favour Omirin (Modred), full-stack software engineer.",
    url: "https://modred.dev/projects",
    siteName: "Modred Portfolio",
    images: [
      {
        url: "/logow.png",
        width: 512,
        height: 512,
        alt: "Favour Omirin Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Favour Omirin",
    description: "Projects built by Favour Omirin.",
    images: ["/logow.png"],
  },
};

export default function ProjectsLayout({ children }) {
  return children;
}