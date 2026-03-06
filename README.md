# Portfolio Landing Page 21 - Next.js, TypeScript, TailwindCSS Frontend Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38bdf8)](https://tailwindcss.com/)

- **Live Demo:** [https://portfolio-ui-21.vercel.app/](https://portfolio-ui-21.vercel.app/)

This repository is a **full-featured portfolio and landing page** built with the Next.js App Router, TypeScript, and Tailwind CSS. It serves as both a production-ready demo and an **educational reference** for building modern React applications—featuring SEO metadata, dark/light theme, contact form integration (Formspree), blog and project showcases, and a rich set of reusable UI components. Use it to learn patterns, copy components into your own projects, or deploy it as your own portfolio.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack & Keywords](#tech-stack--keywords)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Routes & Pages](#routes--pages)
- [Components & Reusability](#components--reusability)
- [API & Backend](#api--backend)
- [Features & Functionalities](#features--functionalities)
- [How to Reuse Components](#how-to-reuse-components)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Conclusion](#conclusion)
- [License](#license)

---

## Project Overview

Portfolio UI 21 is a **frontend-only** application. It has no custom backend; data is driven by local JSON/TypeScript files in `lib/`, and the contact form submits to [Formspree](https://formspree.io/). The app uses the **Next.js 16 App Router** with React 19, TypeScript, Tailwind CSS, Radix UI primitives, Framer Motion, and optional 3D (Three.js) for advanced visuals. The codebase is structured for clarity and reuse: pages in `app/`, shared UI in `components/`, and data/utilities in `lib/` and `hooks/`.

---

## Tech Stack & Keywords

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 16 (App Router), React 19 |
| **Language** | TypeScript 5.9 |
| **Styling** | Tailwind CSS 3.4, CSS variables (theming) |
| **UI Primitives** | Radix UI, Base UI, Shadcn-style components |
| **Animation** | Framer Motion, Motion |
| **Forms** | React Hook Form, Zod, Formspree (contact) |
| **Data & State** | TanStack React Query, local data in `lib/` |
| **3D (optional)** | Three.js, React Three Fiber, Drei |
| **Icons** | Lucide React, React Icons |
| **Fonts** | Next.js Google Fonts (Outfit) |

**Keywords:** portfolio, landing page, Next.js, React, TypeScript, Tailwind CSS, fullstack developer, SEO, dark mode, Formspree, App Router, Radix UI, Framer Motion, blog, projects showcase, contact form, Vercel.

---

## Getting Started

### Prerequisites

- **Node.js** 18.x or later (recommended: 20.x LTS)
- **npm** or **pnpm** or **yarn**

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio-ui-21

# Install dependencies
npm install
```

### Run Locally

```bash
# Development server (with hot reload)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create an optimized production build
npm run build

# Start the production server
npm start
```

### Lint & Type Check

```bash
# Run ESLint on app, components, lib, hooks
npm run lint

# TypeScript check without emitting files
npm run type-check
```

---

## Environment Variables

This project uses **very few** environment variables. The app works out of the box for the demo; you only need to configure them when customizing for your own domain or contact endpoint.

### Optional: `.env.local`

Create a file named `.env.local` in the project root (it is git-ignored). No `.env` file is required for the default demo.

| Variable | Required | Description | Default / Note |
|----------|----------|-------------|----------------|
| `NEXT_PUBLIC_SITE_URL` | No | Canonical base URL for sitemap, robots, and Open Graph. | Falls back to `https://portfolio-ui-21.vercel.app` if unset. |
| `VERCEL_ENV` | No (set by Vercel) | `production` \| `preview` \| `development`. Used in `app/robots.ts` to block indexing on non-production. | Automatically set by Vercel on deploy. |

### Example `.env.local`

```env
# Optional: set when deploying to your own domain
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
```

### Contact Form (Formspree)

The contact form posts to **Formspree** at a hardcoded endpoint in the codebase:

- **Files:** `components/contact/ContactForm.tsx`, `components/contact/ContactClient.tsx`
- **Endpoint:** `https://formspree.io/f/myzbqrro` (demo form ID)

To use your own Formspree form:

1. Create a form at [formspree.io](https://formspree.io/) and get your form ID.
2. Replace the URL in those two files, or introduce an env variable (e.g. `NEXT_PUBLIC_FORMSPREE_ENDPOINT`) and use it in the `fetch` call.

There are **no other backend or API keys** required for the core demo.

---

## Project Structure

```
portfolio-ui-21/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout, metadata, fonts, providers
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles and CSS variables
│   ├── providers.tsx      # React Query, Theme, Tooltip, Toaster
│   ├── not-found.tsx      # 404 page
│   ├── robots.ts          # Dynamic robots.txt
│   ├── sitemap.ts         # Dynamic sitemap.xml
│   ├── blog/
│   │   ├── page.tsx       # Blog listing
│   │   └── [id]/page.tsx  # Single blog post (dynamic)
│   ├── contact/page.tsx   # Contact page
│   ├── projects/page.tsx  # Projects showcase
│   ├── services/page.tsx  # Services/offerings
│   └── admin-portfolio/
│       └── page.tsx       # Admin/dashboard demo
├── components/
│   ├── home/              # Home-specific (Hero, About, Services, Testimonials, navigation)
│   ├── ui/                # Reusable UI (buttons, cards, dialogs, inputs, etc.)
│   ├── contact/           # Contact form and contact page client
│   ├── footer/            # Site footer
│   ├── faq/               # FAQ section and data
│   ├── projects/          # Project cards, modal, stats, tech badges
│   ├── skills/            # Skills section and skill cards
│   ├── myskills/          # MyStack, MySkills
│   ├── CTA/               # Call-to-action blocks
│   ├── ScrollEffects/     # Scroll-triggered animations
│   ├── themeproviders/    # Theme provider and toggle
│   ├── mvpblocks/         # Bento grid, card flip, testimonials marquee, etc.
│   ├── notfound/          # 404 client component
│   └── terminal/          # Terminal-style UI (optional)
├── lib/
│   ├── metaData.ts        # Page-level metadata (Contact, Projects, Services)
│   ├── constants.ts       # Personal info, skills, big skills, contact config
│   ├── utils.ts           # cn() and other helpers
│   ├── navigationRoutes.ts # Nav items (links and icons)
│   ├── blogData.ts        # Blog posts (mock data)
│   ├── projectsData.ts    # Projects list and details
│   ├── servicesData.ts    # Services and process steps
│   ├── skillsdata.ts      # Skills for skills section
│   ├── projet.ts          # Project type definition
│   └── icons.ts           # Icon mappings
├── hooks/
│   ├── use-mobile.tsx     # Mobile breakpoint hook
│   ├── use-mobile.ts      # Alternate mobile hook
│   ├── use-toast.ts       # Toast notifications
│   └── useTerminal.ts     # Terminal state (if used)
├── public/                # Static assets (fonts, favicon, manifest, etc.)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Routes & Pages

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Home: Hero, About, Services preview, MyStack, Experience, FAQ, Testimonials |
| `/blog` | Static | Blog listing from `lib/blogData.ts` |
| `/blog/[id]` | Dynamic | Single blog post; metadata and JSON-LD for SEO |
| `/projects` | Static | Projects grid and filters from `lib/projectsData.ts` |
| `/services` | Static | Services cards and process steps from `lib/servicesData.ts` |
| `/contact` | Static | Contact form (Formspree) and contact info |
| `/admin-portfolio` | Static | Demo admin/dashboard UI (no real backend) |
| `/robots.txt` | Dynamic | Generated by `app/robots.ts` (env-aware) |
| `/sitemap.xml` | Dynamic | Generated by `app/sitemap.ts` |

All pages use the root `layout.tsx` (Navigation + main + Footer). Metadata is set in `app/layout.tsx` (site-wide) and in `lib/metaData.ts` or per-page `export const metadata` for SEO.

---

## Components & Reusability

### Layout & Global

- **`app/layout.tsx`** – Root layout: Outfit font, `metadataBase`, global metadata (title, description, authors, Open Graph, Twitter, robots, icons). Renders `Providers`, `Navigation`, `main`, `Footer`.
- **`app/providers.tsx`** – Wraps app with `QueryClientProvider`, `ThemeProvider`, `TooltipProvider`, and toast components (`Toaster`, `Sonner`).

### Home Page Sections

- **`HeroSection`** – Hero with TypeAnimation, CTA buttons, social links, decorative icons (Framer Motion).
- **`AboutMe`** – Short intro/about block.
- **`ServicesSection`** – Preview of services (icons and copy).
- **`MyStack`** / **`MySkills`** – Tech stack and skills display.
- **`MyExperience`** – Experience timeline or list.
- **`FaqSection`** – Accordion FAQ (data from `lib` or `components/faq`).
- **`TestimonialsSection`** – Testimonial cards with avatars and quotes.

### Reusable UI (`components/ui/`)

The `ui` folder contains Shadcn/Radix-style building blocks: `button`, `card`, `input`, `textarea`, `dialog`, `dropdown-menu`, `tabs`, `accordion`, `avatar`, `badge`, `carousel`, `chart`, `sheet`, `tooltip`, and many more. They are built to be composed in any page or block.

### Contact

- **`ContactForm`** – Full form (name, email, subject, message) with validation and Formspree `fetch`.
- **`ContactClient`** – Client wrapper for the contact page that uses the form and any extra contact info.

### Projects

- **`ProjectCard`** – Single project card (image, title, tech badges, links).
- **`ProjectModal`** – Modal with full project details and gallery.
- **`ProjectsClient`** – Client component for filtering and grid of projects.
- **`TechBadge`** – Small tech/stack badge with icon.
- **`ProjectStats`** – Stats row for the projects section.

### Data Flow

- **Blog:** `lib/blogData.ts` exports `mockPosts` (and types); `app/blog/page.tsx` and `app/blog/[id]/page.tsx` consume it.
- **Projects:** `lib/projectsData.ts` and `lib/projet.ts` (types); filtered and displayed by `ProjectsClient` and related components.
- **Services:** `lib/servicesData.ts` for services list and process steps; used on home and `/services`.
- **Skills:** `lib/skillsdata.ts` and `lib/constants.ts` for skills and big skills.
- **Navigation:** `lib/navigationRoutes.ts` for nav items (href, label, icon).

---

## API & Backend

This project **does not include a custom backend**. All data is in the repository (TypeScript/JSON in `lib/`).

### External API: Formspree

The only external “API” used is **Formspree** for the contact form:

- **Method:** `POST`
- **URL:** `https://formspree.io/f/myzbqrro` (hardcoded; replace with your form ID or use an env variable).
- **Headers:** `Content-Type: application/json`
- **Body:** `{ name, email, subject, message, _replyto, _subject }`

Example of how it’s used in the codebase:

```ts
const response = await fetch("https://formspree.io/f/myzbqrro", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
    _replyto: formData.email,
    _subject: `New Inquiry from ${formData.name}: ${formData.subject}`,
  }),
});
```

No other API keys or backend services are required for the demo.

---

## Features & Functionalities

- **SEO:** Central metadata in `layout.tsx`, per-page metadata in `metaData.ts` and page files; dynamic `robots.txt` and `sitemap.xml`; JSON-LD on blog post page.
- **Theming:** Dark/light mode via `next-themes` and CSS variables; theme toggle in UI.
- **Contact:** Form with client-side validation and Formspree submission; success/error toasts.
- **Blog:** List and dynamic post pages; mock data in `lib/blogData.ts`; metadata and Open Graph per post.
- **Projects:** Filterable grid, modal detail view, tech badges, and optional stats.
- **Services:** Dedicated services page with cards and process steps.
- **Responsive design:** Tailwind breakpoints and mobile-friendly navigation.
- **Animations:** Framer Motion on hero, scroll effects, and various UI blocks.
- **Accessibility:** Radix-based components with sensible ARIA and keyboard support.

---

## How to Reuse Components

### Using a Single UI Component

1. Copy the component file from `components/ui/<name>.tsx` (and any direct dependencies it imports from `@/components/ui/` or `@/lib/utils`).
2. Ensure your project has the same dependencies (e.g. `class-variance-authority`, `clsx`, `tailwind-merge`, Radix packages used by that component).
3. Use the `cn()` helper from `lib/utils.ts` if the component relies on it:

```ts
import { cn } from "@/lib/utils";
```

### Using a Full Section (e.g. Hero or FAQ)

1. Copy the section component (e.g. `components/home/HeroSection.tsx`) and its data (if it’s in a separate file, copy that too).
2. Adjust imports: point `@/` to your app’s `components` and `lib` (or move the needed utils/data into your repo).
3. Replace content (copy, images, links) with your own; keep the same props interface if you want minimal edits.

### Using the Contact Form with Your Own Formspree

1. Copy `ContactForm.tsx` (and `ContactClient.tsx` if you use that wrapper).
2. Create a form at [formspree.io](https://formspree.io/) and get your form ID.
3. Replace the fetch URL:

```ts
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ ... }),
});
```

Or use an env variable, e.g. `process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT`.

### Using Metadata and SEO

- **Site-wide:** Copy the `metadata` and `viewport` exports from `app/layout.tsx` and adapt `siteConfig` (title, description, url, authors).
- **Per-page:** Use the pattern from `lib/metaData.ts` and the blog/projects/contact pages: `export const metadata: Metadata = { ... }` with title, description, keywords, authors, openGraph, etc.

---

## Configuration

- **Next.js:** `next.config.ts` – React strict mode, image formats and device sizes, TypeScript build.
- **Tailwind:** `tailwind.config.ts` – `darkMode: "class"`, content paths, theme extend (colors from CSS variables, font family, container).
- **TypeScript:** `tsconfig.json` – path alias `@/*` to `./*`, strict mode, Next.js-compatible options.
- **Fonts:** Outfit from `next/font/google` in `app/layout.tsx`; CSS variable `--font-outfit` used in Tailwind.

---

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start development server (default port 3000) |
| `npm run build` | Production build (suppresses Node type-stripping warning) |
| `npm start` | Run production server after `build` |
| `npm run lint` | ESLint on `app`, `components`, `lib`, `hooks` |
| `npm run type-check` | `tsc --noEmit` |

---

## Conclusion

This project is a **learning-friendly** portfolio and landing template. You get a full Next.js App Router setup, TypeScript, Tailwind, theming, SEO, and a contact form wired to Formspree. There is no custom backend; you can extend it with your own API routes or external services. Use the structure and components as reference, copy what you need into your own apps, and customize content and styling to match your brand.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

## Happy Coding! 🎉

This is an **open-source project** - feel free to use, enhance, and extend this project further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊
