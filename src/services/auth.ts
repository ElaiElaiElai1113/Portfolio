import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/database.types";

type Admin = Database["public"]["Tables"]["admins"]["Row"];

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

export async function isAdmin(): Promise<boolean> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return false;

  const { data: adminData, error: adminError } = await supabase
    .from("admins")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (adminError) return false;
  return !!adminData;
}

export async function checkAdmin(): Promise<Admin | null> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;

  const { data: adminData, error: adminError } = await supabase
    .from("admins")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (adminError) return null;
  return adminData;
}

export function onAuthStateChange(
  callback: (event: string, session: any) => void,
) {
  return supabase.auth.onAuthStateChange(callback);
}
