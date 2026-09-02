import { describe, expect, it } from "vitest";
import certifications from "@/data/certifications.json";

describe("certification content", () => {
  it("shows completed learning milestones rather than stale enrollment states", () => {
    expect(certifications).toHaveLength(3);
    expect(certifications.map((certification) => certification.issuer)).not.toContain(
      "Currently Enrolled",
    );
  });

  it("does not claim public credential metadata that has not been supplied", () => {
    for (const certification of certifications) {
      expect(certification).not.toHaveProperty("credential_url");
      expect(certification).not.toHaveProperty("credential_id");
    }
  });
});
