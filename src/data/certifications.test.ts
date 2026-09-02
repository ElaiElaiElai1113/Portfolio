import { describe, expect, it } from "vitest";
import certifications from "@/data/certifications.json";

describe("certification content", () => {
  it("shows completed learning milestones rather than stale enrollment states", () => {
    expect(certifications).toHaveLength(3);
    expect(certifications.map((certification) => certification.issuer)).not.toContain(
      "Currently Enrolled",
    );
  });
});
