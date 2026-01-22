import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/database.types";

type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];
type ProjectUpdate = Database["public"]["Tables"]["projects"]["Update"];

export async function getPublishedProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .order("featured_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getFeaturedProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("status", "published")
    .eq("featured", true)
    .order("featured_order", { ascending: true, nullsFirst: false });

  if (error) throw error;
  return data;
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) throw error;
  return data;
}

export async function getProjectMedia(projectId: string) {
  const { data, error } = await supabase
    .from("project_media")
    .select("*")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
}

// Admin functions
export async function adminListProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function adminGetProject(id: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function adminUpsertProject(
  project: ProjectInsert | ProjectUpdate,
) {
  const { data, error } = await supabase
    .from("projects")
    .upsert(project)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function adminDeleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) throw error;
  return true;
}

export async function adminUpsertMedia(mediaItem: {
  id?: string;
  project_id: string;
  type: string;
  url: string;
  caption?: string;
  sort_order: number;
}) {
  const { data, error } = await supabase
    .from("project_media")
    .upsert(mediaItem)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function adminDeleteMedia(id: string) {
  const { error } = await supabase.from("project_media").delete().eq("id", id);

  if (error) throw error;
  return true;
}
