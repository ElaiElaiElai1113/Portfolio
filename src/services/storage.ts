import { supabase } from "@/lib/supabaseClient";

export async function uploadImage(
  file: File,
  bucket: string = "portfolio-media",
  path?: string,
) {
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path ? `${path}/${fileName}` : fileName;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;
  return data;
}

export async function uploadProjectImage(file: File, projectId?: string) {
  const path = projectId ? `projects/${projectId}` : "projects";
  const data = await uploadImage(file, "portfolio-media", path);
  return data;
}

export async function deleteImage(
  path: string,
  bucket: string = "portfolio-media",
) {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) throw error;
  return true;
}

export function getImageUrl(path: string, bucket: string = "portfolio-media") {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
}
