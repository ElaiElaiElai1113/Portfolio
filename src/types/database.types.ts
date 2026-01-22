export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          slug: string;
          summary: string;
          role: string | null;
          problem: string | null;
          solution: string | null;
          stack: string[];
          tags: string[];
          status: "draft" | "published";
          featured: boolean;
          featured_order: number;
          repo_url: string | null;
          live_url: string | null;
          demo_video_url: string | null;
          cover_image_url: string | null;
          case_study_md: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          summary: string;
          role?: string | null;
          problem?: string | null;
          solution?: string | null;
          stack?: string[];
          tags?: string[];
          status?: "draft" | "published";
          featured?: boolean;
          featured_order?: number;
          repo_url?: string | null;
          live_url?: string | null;
          demo_video_url?: string | null;
          cover_image_url?: string | null;
          case_study_md?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          summary?: string;
          role?: string | null;
          problem?: string | null;
          solution?: string | null;
          stack?: string[];
          tags?: string[];
          status?: "draft" | "published";
          featured?: boolean;
          featured_order?: number;
          repo_url?: string | null;
          live_url?: string | null;
          demo_video_url?: string | null;
          cover_image_url?: string | null;
          case_study_md?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      project_media: {
        Row: {
          id: string;
          project_id: string;
          type: "image" | "video";
          url: string;
          caption: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_id: string;
          type: "image" | "video";
          url: string;
          caption?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          type?: "image" | "video";
          url?: string;
          caption?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      experiences: {
        Row: {
          id: string;
          company: string;
          role: string;
          location: string | null;
          start_date: string;
          end_date: string | null;
          bullets: string[];
          skills: string[];
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company: string;
          role: string;
          location?: string | null;
          start_date: string;
          end_date?: string | null;
          bullets?: string[];
          skills?: string[];
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company?: string;
          role?: string;
          location?: string | null;
          start_date?: string;
          end_date?: string | null;
          bullets?: string[];
          skills?: string[];
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      certifications: {
        Row: {
          id: string;
          name: string;
          issuer: string;
          issue_date: string;
          credential_url: string | null;
          badge_image_url: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          issuer: string;
          issue_date: string;
          credential_url?: string | null;
          badge_image_url?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          issuer?: string;
          issue_date?: string;
          credential_url?: string | null;
          badge_image_url?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          level: "beginner" | "intermediate" | "advanced" | "expert";
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          level: "beginner" | "intermediate" | "advanced" | "expert";
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          level?: "beginner" | "intermediate" | "advanced" | "expert";
          sort_order?: number;
          created_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string | null;
          message: string;
          status: "unread" | "read" | "replied";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject?: string | null;
          message: string;
          status?: "unread" | "read" | "replied";
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string | null;
          message?: string;
          status?: "unread" | "read" | "replied";
          created_at?: string;
        };
      };
      admins: {
        Row: {
          user_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          created_at?: string;
        };
      };
    };
  };
}

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
export type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

export type ProjectMedia = Database["public"]["Tables"]["project_media"]["Row"];
export type ProjectMediaInsert =
  Database["public"]["Tables"]["project_media"]["Insert"];

export type Experience = Database["public"]["Tables"]["experiences"]["Row"];
export type ExperienceInsert =
  Database["public"]["Tables"]["experiences"]["Insert"];
export type ExperienceUpdate =
  Database["public"]["Tables"]["experiences"]["Update"];

export type Certification =
  Database["public"]["Tables"]["certifications"]["Row"];
export type CertificationInsert =
  Database["public"]["Tables"]["certifications"]["Insert"];
export type CertificationUpdate =
  Database["public"]["Tables"]["certifications"]["Update"];

export type Skill = Database["public"]["Tables"]["skills"]["Row"];
export type SkillInsert = Database["public"]["Tables"]["skills"]["Insert"];
export type SkillUpdate = Database["public"]["Tables"]["skills"]["Update"];

export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type MessageInsert = Database["public"]["Tables"]["messages"]["Insert"];
export type MessageUpdate = Database["public"]["Tables"]["messages"]["Update"];
