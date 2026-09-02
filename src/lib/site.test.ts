import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { SEO } from "@/components/SEO";
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

  it("renders contextual canonical and social metadata", async () => {
    render(
      createElement(
        MemoryRouter,
        { initialEntries: ["/projects/rewardme"] },
        createElement(SEO, {
          title: "RewardMe",
          description: "RewardMe case study",
        }),
      ),
    );

    await waitFor(() => {
      expect(document.title).toBe("RewardMe | Elijah De Los Santos");
    });
    expect(
      document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    ).toBe("https://portfolio-inky-eight-48.vercel.app/projects/rewardme");
    expect(
      document.querySelector('meta[property="og:url"]')?.getAttribute("content"),
    ).toBe("https://portfolio-inky-eight-48.vercel.app/projects/rewardme");
  });

  it("contains no stale public destinations", () => {
    const files = [
      "src/pages/ContactPage.tsx",
      "src/components/UniqueFooter.tsx",
      "src/components/UniqueNavigation.tsx",
      "src/pages/AutomationPage.tsx",
      "src/pages/CertificationsPage.tsx",
      "src/components/AutomationShowcase.tsx",
    ];
    const source = files
      .map((file) => readFileSync(resolve(file), "utf8"))
      .join("\n");

    expect(source).not.toMatch(
      /yourprofile|yourusername|contact@elijahndelosantos\.com/,
    );
    expect(source).not.toMatch(
      /100% data accuracy|120\+|1,200\+|2-4x|2\+ days manual/,
    );
  });

  it("loads route pages on demand", () => {
    const source = readFileSync(resolve("src/App.tsx"), "utf8");

    expect(source).toContain('lazy(() => import("@/pages/UniqueHomePage"))');
    expect(source).toContain('lazy(() => import("@/pages/ProjectsPage"))');
    expect(source).toContain('lazy(() => import("@/pages/ProjectDetailPage"))');
    expect(source).toContain("<Suspense fallback={<PageFallback />}>");
  });

  it("keeps route-managed metadata out of the static HTML shell", () => {
    const source = readFileSync(resolve("index.html"), "utf8");

    expect(source).not.toContain("https://portfolio.vercel.app");
    expect(source).not.toContain('rel="canonical"');
    expect(source).not.toContain('property="og:url"');
  });

  it("mounts a single global notification region", () => {
    const source = ["src/main.tsx", "src/App.tsx", "src/layouts/UniquePublicLayout.tsx"]
      .map((file) => readFileSync(resolve(file), "utf8"))
      .join("\n");

    expect(source.match(/<Toaster/g) ?? []).toHaveLength(1);
  });
});
