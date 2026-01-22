import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/database.types";

type SkillInsert = Database["public"]["Tables"]["skills"]["Insert"];
type SkillUpdate = Database["public"]["Tables"]["skills"]["Update"];

export async function getSkills() {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getSkillsByCategory(category: string) {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("category", category)
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
}

// Admin functions
export async function adminListSkills() {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
}

export async function adminGetSkill(id: string) {
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function adminUpsertSkill(skill: SkillInsert | SkillUpdate) {
  const { data, error } = await supabase
    .from("skills")
    .upsert(skill)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function adminDeleteSkill(id: string) {
  const { error } = await supabase.from("skills").delete().eq("id", id);

  if (error) throw error;
  return true;
}
