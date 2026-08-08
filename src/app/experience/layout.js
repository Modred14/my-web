export const metadata = {
  title: "Experience | Favour Omirin",
  description:
    "Work experience and professional journey of Favour Omirin (Modred) — full-stack software engineer building modern web applications with React, Next.js, and Node.js.",
  alternates: {
    canonical: "https://modred.dev/experience",
  },
  openGraph: {
    title: "Experience | Favour Omirin",
    description:
      "Work experience and professional journey of Favour Omirin (Modred), full-stack software engineer.",
    url: "https://modred.dev/experience",
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
    title: "Experience | Favour Omirin",
    description: "Work experience and professional journey of Favour Omirin.",
    images: ["/logow.png"],
  },
};

export default function ExperienceLayout({ children }) {
  return children;
}