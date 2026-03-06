import { IconType } from "react-icons";

/** Filter categories for projects page; "all" means no filter */
export const projectCategories = ["all", "web", "backend", "mobile"] as const;
export type ProjectCategory = typeof projectCategories[number];

/** Tech stack item with name and react-icons IconType for project cards */
export interface Tech {
  name: string;
  icon: IconType; // Uses IconType directly
}

/** Full project model: used by projectsData and ProjectCard/ProjectModal */
export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  repoGit?: string; // Renamed for clarity and consistency
  liveUrl?: string;
  docsUrl?: string; // Link to project documentation/specs
  tech: Tech[];
  imageUrl?: string;
  
  // New enriched fields for advanced UI
  status?: 'live' | 'in-progress' | 'archived';
  featured?: boolean; // Featured projects get larger cards
  completionDate?: string;
  clientType?: 'personal' | 'professional' | 'open-source';
  
  // Case Study Data
  role?: string; // e.g., "Full Stack Developer"
  timeline?: string; // e.g., "3 months"
  team?: string; // e.g., "Solo Project" or "Team of 3"
  
  metrics?: {
    githubStars?: number;
    contributors?: number;
    downloads?: number;
    views?: number;
  };
  
  gallery?: string[]; // Array of images for modal gallery
  
  detailedDescription?: {
    overview?: string;
    features?: string[];
    challenges?: string;
    process?: { title: string; description: string }[]; // Development process steps
    keyTakeaways?: string[]; // What was learned
  };
  
  testimonials?: {
    name: string;
    role: string;
    content: string;
    avatar?: string;
  }[];
}
