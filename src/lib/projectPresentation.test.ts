import { describe, expect, it } from "vitest";
import {
  PROJECT_CATEGORIES,
  getProjectActions,
  getProjectBadges,
  getProjectStateLabel,
  matchesProject,
} from "@/lib/projectPresentation";
import type { Project } from "@/types/portfolio";

const baseProject: Project = {
  id: "sample",
  title: "Sample Platform",
  slug: "sample-platform",
  summary: "A dealer operations platform",
  role: "Sole Full-Stack Developer",
  stack: ["React", "Supabase"],
  tags: ["Dealer Operations"],
  category: "Business Systems",
  project_state: "live-product",
  year: 2026,
  client_work: true,
};

describe("project presentation", () => {
  it("uses the approved hiring-focused category order", () => {
    expect(PROJECT_CATEGORIES).toEqual([
      "All",
      "Business Systems",
      "Commerce",
      "SaaS",
      "AI",
      "Mobile",
      "Automation",
    ]);
  });

  it("maps project states to readable labels", () => {
    expect(getProjectStateLabel("live-product")).toBe("Live Product");
    expect(getProjectStateLabel("archived-build")).toBe("Archived Build");
  });

  it("does not repeat Client Work when it is already the project state", () => {
    expect(
      getProjectBadges({
        ...baseProject,
        project_state: "client-work",
      }),
    ).toEqual(["Client Work"]);

    expect(getProjectBadges(baseProject)).toEqual(["Live Product", "Client Work"]);
  });

  it("uses product-specific action labels", () => {
    expect(
      getProjectActions({ ...baseProject, live_url: "https://example.com" }),
    ).toEqual([{ kind: "live", label: "Visit Live Product", url: "https://example.com" }]);
  });

  it("does not show a live action for an archived build", () => {
    expect(
      getProjectActions({
        ...baseProject,
        project_state: "archived-build",
        live_url: "https://example.com",
      }),
    ).toEqual([]);
  });

  it("adds a public source action when a repository URL exists", () => {
    expect(
      getProjectActions({
        ...baseProject,
        repo_url: "https://github.com/example/project",
      }),
    ).toContainEqual({
      kind: "source",
      label: "View Source",
      url: "https://github.com/example/project",
    });
  });

  it("matches category and free-text evidence", () => {
    expect(matchesProject(baseProject, "supabase", "Business Systems")).toBe(true);
    expect(matchesProject(baseProject, "dealer", "All")).toBe(true);
    expect(matchesProject(baseProject, "dealer", "AI")).toBe(false);
  });
});
