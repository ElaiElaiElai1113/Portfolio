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
});
