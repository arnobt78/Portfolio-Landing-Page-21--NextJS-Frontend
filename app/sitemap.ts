import { MetadataRoute } from "next";

/**
 * Dynamic sitemap.xml for SEO. Search engines use this to discover and prioritize pages.
 * Update baseUrl when deploying to your own domain; consider using NEXT_PUBLIC_SITE_URL.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portfolio-ui-21.vercel.app"; // Replace with actual domain

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
