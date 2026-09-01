import projectsData from "@/data/projects.json";
import { Project, ProjectMedia } from "@/types/portfolio";

// Simulate async behavior for React Query compatibility
async function getData<T>(data: T): Promise<T> {
  return Promise.resolve(data);
}

export async function getPublishedProjects(): Promise<Project[]> {
  const data = (projectsData as Project[])
    .filter((project) => project.status === "published" || project.status === undefined)
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (a.featured_order ?? 999) - (b.featured_order ?? 999);
    });
  return getData(data);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const data = (projectsData as Project[])
    .filter(
      (project) =>
        (project.status === "published" || project.status === undefined) && project.featured,
    )
    .sort((a, b) => (a.featured_order ?? 999) - (b.featured_order ?? 999));
  return getData(data);
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const project = (projectsData as Project[]).find((p) => p.slug === slug && (p.status === "published" || p.status === undefined));
  if (!project) {
    throw new Error(`Project not found: ${slug}`);
  }
  return getData(project);
}

export async function getProjectMedia(projectId: string): Promise<ProjectMedia[]> {
  const project = (projectsData as Project[]).find((p) => p.id === projectId);
  if (!project) {
    throw new Error(`Project not found: ${projectId}`);
  }
  return getData(project.media || []);
}
