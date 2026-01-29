import certificationsData from "@/data/certifications.json";
import { Certification } from "@/types/portfolio";

// Simulate async behavior for React Query compatibility
async function getData<T>(data: T): Promise<T> {
  return Promise.resolve(data);
}

export async function getCertifications(): Promise<Certification[]> {
  return getData(certificationsData.sort((a, b) => a.sort_order - b.sort_order));
}
