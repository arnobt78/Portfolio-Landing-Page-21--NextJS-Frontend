import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navigation from "@/components/home/navigation";
import Footer from "@/components/footer/Footer";
import React from "react";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const siteConfig = {
  title: "John Doe - Fullstack Developer",
  description:
    "I am John, a fullstack developer specialized in creating performant web applications with TypeScript, Next.js and NestJS. Let's build something amazing together.",
  author: "John Doe",
  url: "https://portfolio-ui-21.vercel.app", // Replace with your domain
  ogImage: "/og-image.png",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | John Doe`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  keywords: [
    // --- English Keywords ---
    // Roles & Titles
    "Full-Stack Developer",
    "Software Engineer",
    "Web Developer",
    "Backend Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Expert",
    "Freelance Developer",
    "Software Architect",
    "DevOps Engineer",
    "UI/UX Engineer",
    "Creative Developer",

    // Technologies - Core
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "NestJS",
    "Express",
    "HTML5",
    "CSS3",

    // Technologies - Styles & UI
    "Tailwind CSS",
    "Framer Motion",
    "Three.js",
    "React Three Fiber",
    "Shadcn UI",
    "Radix UI",
    "GSAP",

    // Technologies - Backend & Data
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "TypeORM",
    "GraphQL",
    "REST API",
    "Docker",
    "Kubernetes",
    "AWS",
    "Vercel",

    // Concepts & Skills
    "Web Development",
    "App Development",
    "SaaS Development",
    "API Design",
    "Database Architecture",
    "Performance Optimization",
    "SEO Optimization",
    "Responsive Design",
    "Accessible Web Design",
    "Clean Code",
    "Agile Methodology",
    "CI/CD",
    "Git",
    "Testing",
    "Cybersecurity",

    // Locations & Attributes
    "Freelance",
    "Remote",
    "Available for hire",
    "Open Source Contributor",
    "Portfolio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "fr_FR",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: "John Doe Portfolio",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "John Doe - Fullstack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@JohnDoe", // Placeholder, update if known
    site: "@JohnDoe",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/og-image.png",
    shortcut: "/og-image.png",
    apple: "/og-image.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code", // Replace with your Google verification code
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "fr-FR": "/fr",
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <title></title>
      </head>
      <body
        className={`${outfit.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
