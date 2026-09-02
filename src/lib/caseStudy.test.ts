import { describe, expect, it } from "vitest";
import { parseCaseStudy } from "@/lib/caseStudy";

describe("case-study parsing", () => {
  it("ignores the document H1 and makes repeated headings unique", () => {
    const parsed = parseCaseStudy(
      "# Product\n\n## Overview\nFirst\n\n## Outcome\nOne\n\n## Outcome\nTwo",
    );

    expect(parsed.sections.map((section) => section.id)).toEqual([
      "overview",
      "outcome",
      "outcome-2",
    ]);
    expect(parsed.sections.map((section) => section.title)).toEqual([
      "Overview",
      "Outcome",
      "Outcome",
    ]);
  });

  it("uses the same unique identifiers for nested contents entries", () => {
    const parsed = parseCaseStudy(
      "## Architecture\n### API\nDetails\n### API\nMore details",
    );

    expect(parsed.toc).toEqual([
      { id: "architecture", text: "Architecture", level: 2 },
      { id: "api", text: "API", level: 3 },
      { id: "api-2", text: "API", level: 3 },
    ]);
  });
});
