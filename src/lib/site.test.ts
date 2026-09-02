import { describe, expect, it } from "vitest";
import {
  CONTACT_EMAIL,
  SITE_URL,
  buildCanonicalUrl,
  buildContactMailtoUrl,
  buildPageTitle,
} from "@/lib/site";

describe("site identity", () => {
  it("uses the confirmed production identity", () => {
    expect(SITE_URL).toBe("https://portfolio-inky-eight-48.vercel.app");
    expect(CONTACT_EMAIL).toBe("elaidelossantos05@gmail.com");
  });

  it("builds canonical URLs and recruiter-readable titles", () => {
    expect(buildCanonicalUrl("/projects/rewardme")).toBe(
      "https://portfolio-inky-eight-48.vercel.app/projects/rewardme",
    );
    expect(buildPageTitle("Projects")).toBe("Projects | Elijah De Los Santos");
    expect(buildPageTitle()).toBe("Elijah De Los Santos | Full-Stack Developer");
  });

  it("builds an encoded email draft", () => {
    const url = buildContactMailtoUrl({
      name: "Hiring Manager",
      email: "manager@example.com",
      subject: "Full-stack role",
      message: "Let's schedule an interview.",
    });

    expect(url).toContain("mailto:elaidelossantos05%40gmail.com");
    expect(decodeURIComponent(url)).toContain("Full-stack role");
    expect(decodeURIComponent(url)).toContain("manager@example.com");
  });
});
