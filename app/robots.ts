import { MetadataRoute } from "next";

// Base URL for sitemap reference; override via NEXT_PUBLIC_SITE_URL when deploying to your domain
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-ui-21.vercel.app";

/**
 * Dynamic robots.txt: blocks all crawlers on non-production (e.g. Vercel previews);
 * in production, allows search engines but disallows AI crawlers and sensitive paths (admin, api, contact, etc.).
 */
export default function robots(): MetadataRoute.Robots {
  // Rule 1: non-production (e.g. Vercel preview) — disallow all indexing
  // (ex: les déploiements de test sur Vercel)
  // On bloque TOUT pour éviter que Google n'indexe des versions de test.
  if (process.env.VERCEL_ENV !== "production") {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  // Règle 2 : Pour l'environnement de PRODUCTION
  return {
    rules: [
      // Règle spécifique pour bloquer les robots des IA les plus courants
      {
        userAgent: ["GPTBot", "Google-Extended", "CCBot"],
        disallow: "/",
      },
      // Règle générale pour les autres robots (Google, Bing, etc.)
      {
        userAgent: "*",
        // On interdit l'accès aux dossiers et pages non pertinents pour le SEO
        disallow: [
          "/admin-portfolio/", // Votre panel d'administration
          "/admin",
          "/api/", // Toutes vos routes d'API
          "/contact", // La page de contact n'a pas besoin d'être dans les résultats de recherche
          "/private/", // Une règle générique pour tout futur dossier privé
          "/cv/", // Empêche l'indexation directe du dossier contenant le CV
        ],
      },
    ],
    // On indique aux robots autorisés où trouver le plan de votre site
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
