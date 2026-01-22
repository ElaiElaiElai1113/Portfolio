import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/database.types";

type CertificationInsert =
  Database["public"]["Tables"]["certifications"]["Insert"];
type CertificationUpdate =
  Database["public"]["Tables"]["certifications"]["Update"];

export async function getCertifications() {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
}

// Admin functions
export async function adminListCertifications() {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;
  return data;
}

export async function adminGetCertification(id: string) {
  const { data, error } = await supabase
    .from("certifications")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function adminUpsertCertification(
  certification: CertificationInsert | CertificationUpdate,
) {
  const { data, error } = await supabase
    .from("certifications")
    .upsert(certification)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function adminDeleteCertification(id: string) {
  const { error } = await supabase.from("certifications").delete().eq("id", id);

  if (error) throw error;
  return true;
}
