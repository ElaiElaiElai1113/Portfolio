import { supabase } from "@/lib/supabaseClient";
import { Database } from "@/types/database.types";

type MessageInsert = Database["public"]["Tables"]["messages"]["Insert"];

export async function sendMessage(message: MessageInsert) {
  const { data, error } = await supabase
    .from("messages")
    .insert(message)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Alias for public-facing usage
export const createMessage = sendMessage;

// Admin functions
export async function adminListMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function adminGetMessage(id: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function adminMarkAsRead(id: string) {
  const { data, error } = await supabase
    .from("messages")
    .update({ status: "read" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function adminUpdateMessageStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from("messages")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function adminDeleteMessage(id: string) {
  const { error } = await supabase.from("messages").delete().eq("id", id);

  if (error) throw error;
  return true;
}
