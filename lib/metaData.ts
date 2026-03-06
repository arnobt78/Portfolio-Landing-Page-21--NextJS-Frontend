import { Metadata } from "next";

/** Project maintainer / SEO author info; used in page-level metadata */
const siteAuthor = {
  name: "Arnob Mahmud",
  url: "https://www.arnobmahmud.com",
  email: "contact@arnobmahmud.com",
};

/** Contact page SEO: title, description, keywords, authors. Import and assign to page metadata. */
export const Metacontact: Metadata = {
  title: "Contact - John Doe | Software Engineer",
  description:
    "John is a software engineer with a passion for building web applications and mobile applications.",
  keywords: [
    "contact",
    "John Doe",
    "Software Engineer",
    "Web Developer",
    "Mobile Developer",
    "Full-Stack Developer",
    "Software Engineer",
    "Web Developer",
    "Mobile Developer",
    "Backend",
  ],
  authors: [
    { name: "John Doe", url: "https://portfolio-ui-21.vercel.app" },
    { name: siteAuthor.name, url: siteAuthor.url },
  ],
};

/** Projects page SEO metadata; used by app/projects/page.tsx */
export const MetaProjects: Metadata = {
  title: "Projects - John Doe | Software Engineer",
  description:
    "Explore a selection of projects by John Doe, demonstrating expertise in web development, backend systems, and robust software solutions. Specialized in Java/Spring Boot, React/Next.js, Cloud, Automation, and Cybersecurity.",
  keywords: [
    "John Doe",
    "projets",
    "Web development",
    "Backend development",
    "Java",
    "React",
    "Next.js",
    "Spring Boot",
    "Cloud",
    "Automation",
    "Cybersecurity",
    "portfolio",
    "Software engineering",
    "DevSecOps",
  ],
  authors: [
    { name: "John Doe", url: "https://portfolio-ui-21.vercel.app" },
    { name: siteAuthor.name, url: siteAuthor.url },
  ],
};

/** Services page SEO metadata; used by app/services/page.tsx */
export const MetaServices: Metadata = {
  title: "Services - John Doe | Backend Development & System Architecture",
  description:
    "Explore my services in developing robust backend systems, custom APIs, mobile/desktop applications, and complete digital solutions.",
  keywords: [
    "services",
    "Development backend",
    "System architecture",
    "Custom API",
    "NestJS",
    "microservices",
    "Mobile applications",
    "Desktop applications",
    "performance web",
    "John Doe",
  ],
  authors: [
    { name: "John Doe", url: "https://portfolio-ui-21.vercel.app" },
    { name: siteAuthor.name, url: siteAuthor.url },
  ],
};
