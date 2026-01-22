import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/database.types";

type ExperienceInsert = Database["public"]["Tables"]["experiences"]["Insert"];
type ExperienceUpdate = Database["public"]["Tables"]["experiences"]["Update"];

export async function getExperiences() {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
}

// Admin functions
export async function adminListExperiences() {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
}

export async function adminGetExperience(id: string) {
  const { data, error } = await supabase
    .from("experiences")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function adminUpsertExperience(
  experience: ExperienceInsert | ExperienceUpdate,
) {
  const { data, error } = await supabase
    .from("experiences")
    .upsert(experience)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function adminDeleteExperience(id: string) {
  const { error } = await supabase.from("experiences").delete().eq("id", id);

  if (error) throw error;
  return true;
}
