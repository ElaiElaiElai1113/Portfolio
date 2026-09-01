import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import projectsData from "@/data/projects.json";
import { getFeaturedProjects, getPublishedProjects } from "@/services/projects";
import { projectCategories, type Project } from "@/types/portfolio";

const projects = projectsData as Project[];
const states = [
  "live-product",
  "demo",
  "source-available",
  "client-work",
  "archived-build",
];

describe("project content", () => {
  it("contains the eleven approved projects with unique IDs and slugs", () => {
    expect(projects).toHaveLength(11);
    expect(new Set(projects.map((project) => project.id)).size).toBe(11);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(11);
  });

  it("contains complete hiring-focused metadata", () => {
    for (const project of projects) {
      expect(projectCategories).toContain(project.category);
      expect(states).toContain(project.project_state);
      expect(project.year).toBeGreaterThanOrEqual(2020);
      expect(project.role?.length).toBeGreaterThan(5);
      expect(project.problem?.length).toBeGreaterThan(30);
      expect(project.solution?.length).toBeGreaterThan(30);
      expect(project.case_study_md?.length).toBeGreaterThan(300);
    }
  });

  it("uses HTTPS for every public action", () => {
    for (const project of projects) {
      for (const url of [project.live_url, project.repo_url].filter(Boolean)) {
        expect(new URL(url!).protocol).toBe("https:");
      }
    }
  });

  it("references local media files that exist", () => {
    for (const project of projects) {
      const urls = [project.cover_image_url, ...(project.media ?? []).map((item) => item.url)];
      for (const url of urls.filter(Boolean)) {
        expect(url).toMatch(/^\/assets\//);
        expect(existsSync(path.join(process.cwd(), "public", url!.slice(1)))).toBe(true);
      }
    }
  });

  it("returns the approved homepage selection in order", async () => {
    const featured = await getFeaturedProjects();
    expect(featured.map((project) => project.slug)).toEqual([
      "easydrive-ecosystem",
      "rewardme",
      "synergize-business-group",
      "innerfire-co",
      "medellin-rewards",
      "pokebuddy",
    ]);
  });

  it("keeps every old and new project in the published archive", async () => {
    expect(await getPublishedProjects()).toHaveLength(11);
  });
});
