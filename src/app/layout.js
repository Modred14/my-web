import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://modred.dev"),

  title: "Favour Omirin | Software Engineer",
  description:
    "Portfolio of Favour Omirin (Modred), a full-stack software engineer building modern, scalable web applications with React, TypeScript, and Node.js.",

  openGraph: {
    title: "Favour Omirin | Software Engineer",
    description:
      "Portfolio of Favour Omirin (Modred), a full-stack software engineer building modern, scalable web applications.",
    url: "https://modred.dev/",
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
    title: "Favour Omirin | Software Engineer",
    description: "Full-stack software engineer building modern web apps.",
    images: ["/logow.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",

              name: "Favour Omirin",
              alternateName: "Modred",

              url: "https://modred.dev",

              jobTitle: "Software Engineer",

              image: "https://modred.dev/Favour-Omirin.JPG",

              description:
                "Software engineer specializing in building modern web applications with React, Next.js, and Node.js.",

              email: "mailto:favourdomirin@gmail.com",

              sameAs: [
                "https://github.com/Modred14",
                "https://www.instagram.com/_m.o.d.r.e.d",
                "https://x.com/modred_dev",
                "https://www.tiktok.com/@_modred",
                "https://ng.linkedin.com/in/omirin-favour",
                "https://web.facebook.com/favour.omirin7",
                "https://www.snapchat.com/add/real_modred",
                "https://about.me/favouromirin",
                "https://leetcode.com/Modred14",
              ],

              knowsAbout: [
                "Software Engineering",
                "Frontend Development",
                "Backend Development",
                "React",
                "Next.js",
                "JavaScript",
                "TypeScript",
                "Node.js",
                "Web Development",
                "UI/UX",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "AltSchool Africa",
              },

              nationality: {
                "@type": "Country",
                name: "Nigeria",
              },
            }),
          }}
        />

        {children}
      </body>
    </html>
  );
}
