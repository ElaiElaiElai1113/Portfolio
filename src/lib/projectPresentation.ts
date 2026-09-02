import type { Project, ProjectCategory, ProjectState } from "@/types/portfolio";

export const PROJECT_CATEGORIES = [
  "All",
  "Business Systems",
  "Commerce",
  "SaaS",
  "AI",
  "Mobile",
  "Automation",
] as const;

export type ProjectCategoryFilter = "All" | ProjectCategory;

const stateLabels: Record<ProjectState, string> = {
  "live-product": "Live Product",
  demo: "Demo",
  "source-available": "Source Available",
  "client-work": "Client Work",
  "archived-build": "Archived Build",
};

export type ProjectAction = {
  kind: "live" | "source";
  label: string;
  url: string;
};

export function getProjectStateLabel(state: ProjectState) {
  return stateLabels[state];
}

export function getProjectBadges(project: Project) {
  const badges = [getProjectStateLabel(project.project_state)];
  if (project.client_work && project.project_state !== "client-work") {
    badges.push("Client Work");
  }
  return badges;
}

export function getProjectActions(project: Project): ProjectAction[] {
  const actions: ProjectAction[] = [];
  if (project.live_url && project.project_state !== "archived-build") {
    actions.push({
      kind: "live",
      label: project.project_state === "demo" ? "View Demo" : "Visit Live Product",
      url: project.live_url,
    });
  }
  if (project.repo_url) {
    actions.push({ kind: "source", label: "View Source", url: project.repo_url });
  }
  return actions;
}

export function matchesProject(
  project: Project,
  query: string,
  category: ProjectCategoryFilter,
) {
  if (category !== "All" && project.category !== category) return false;
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return [
    project.title,
    project.summary,
    project.category,
    ...project.stack,
    ...project.tags,
  ].some((value) => value.toLowerCase().includes(normalized));
}
