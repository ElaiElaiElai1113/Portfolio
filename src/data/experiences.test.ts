import { describe, expect, it } from "vitest";
import experiences from "@/data/experiences.json";

describe("professional experience", () => {
  it("leads with independent client development from March 2026", () => {
    expect(experiences[0]).toMatchObject({
      company: "Independent Client Work",
      role: "Full-Stack Developer",
      start_date: "2026-03-01",
      end_date: null,
      current: true,
      sort_order: 0,
    });
  });

  it("states majority sole-developer ownership and names delivered products", () => {
    expect(experiences[0].bullets.join(" ")).toContain(
      "sole full-stack developer",
    );
    expect(experiences[0].bullets.join(" ")).toContain("EasyDrive");
  });

  it("includes the resume-backed DICT software development internship", () => {
    const internship = experiences.find(
      (experience) =>
        experience.company ===
        "Department of Information and Communications Technology - Region 11",
    );

    expect(internship).toMatchObject({
      role: "Software Development Intern",
      date_label: "2025 · 3 months",
      sort_order: 1,
    });
    expect(internship?.bullets.join(" ")).toContain("Django Locator Slip");
    expect(internship?.bullets.join(" ")).toContain("Flutter/Supabase");
  });

  it("includes the 2025 Ateneo SAMAHAN project-management role", () => {
    const samahan = experiences.find(
      (experience) => experience.company === "Ateneo SAMAHAN",
    );

    expect(samahan).toMatchObject({
      role: "Project Manager",
      date_label: "2025",
      sort_order: 2,
    });
    expect(samahan?.bullets.join(" ")).toContain("stakeholder");
  });
});
