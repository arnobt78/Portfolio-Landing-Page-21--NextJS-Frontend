import type { MetadataRoute } from "next";

/**
 * PWA manifest (icons, theme, display). Served by Next.js at /manifest.webmanifest.
 * Uses /favicon.ico so no 403 or missing /lg.ico.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "John Doe's Portfolio",
    short_name: "John Doe",
    description:
      "John Doe's portfolio — fullstack developer. TypeScript, Next.js, NestJS. Demo by Arnob Mahmud.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
        purpose: "any",
      },
    ],
  };
}
