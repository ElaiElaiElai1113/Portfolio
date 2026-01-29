import skillsData from "@/data/skills.json";
import { Skill } from "@/types/portfolio";

// Simulate async behavior for React Query compatibility
async function getData<T>(data: T): Promise<T> {
  return Promise.resolve(data);
}

export async function getSkills(): Promise<Skill[]> {
  return getData((skillsData as Skill[]).sort((a, b) => a.sort_order - b.sort_order));
}

export async function getSkillsByCategory(category: string): Promise<Skill[]> {
  const data = (skillsData as Skill[]).filter((s) => s.category === category);
  return getData(data.sort((a, b) => a.sort_order - b.sort_order));
}
