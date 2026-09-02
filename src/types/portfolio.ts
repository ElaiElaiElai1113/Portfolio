export const projectCategories = [
  "Business Systems",
  "Commerce",
  "SaaS",
  "AI",
  "Mobile",
  "Automation",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectState =
  | "live-product"
  | "demo"
  | "source-available"
  | "client-work"
  | "archived-build";

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  role?: string;
  problem?: string;
  solution?: string;
  stack: string[];
  tags: string[];
  category: ProjectCategory;
  project_state: ProjectState;
  year: number;
  client_work?: boolean;
  status?: "draft" | "published" | "hidden";
  featured?: boolean;
  featured_order?: number;
  repo_url?: string;
  live_url?: string;
  demo_video_url?: string;
  cover_image_url?: string;
  case_study_meta?: { label: string; value: string }[];
  case_study_takeaways?: string[];
  case_study_why?: string;
  case_study_contributions?: string[];
  case_study_md?: string;
  media?: ProjectMedia[];
}

export interface ProjectMedia {
  id: string;
  type: "image" | "video";
  url: string;
  caption?: string;
  sort_order: number;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  date_label?: string;
  duration_label?: string;
  current?: boolean;
  description?: string;
  bullets: string[];
  skills: string[];
  sort_order: number;
}

export interface Certification {
  id: string;
  title: string;
  name?: string;
  issuer: string;
  issue_date: string;
  expiration_date?: string;
  credential_url?: string;
  credential_id?: string;
  badge_image_url?: string;
  sort_order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
  proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  sort_order: number;
}
