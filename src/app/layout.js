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
    description:
      "Full-stack software engineer building modern web apps.",
    images: ["/logow.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
