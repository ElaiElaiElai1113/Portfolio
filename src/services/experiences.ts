import experiencesData from "@/data/experiences.json";
import { Experience } from "@/types/portfolio";

// Simulate async behavior for React Query compatibility
async function getData<T>(data: T): Promise<T> {
  return Promise.resolve(data);
}

export async function getExperiences(): Promise<Experience[]> {
  return getData(experiencesData.sort((a, b) => a.sort_order - b.sort_order));
}
