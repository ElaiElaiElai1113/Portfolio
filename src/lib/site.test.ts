import { existsSync, readFileSync, statSync } from "node:fs";
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
      /100% data accuracy|120\+|1,200\+|2-4x|2\+ days manual|hours\/week saved|Zero stockouts|More Production Workflows/,
    );
  });

  it("keeps primary page content inside responsive mobile gutters", () => {
    const files = [
      "src/pages/UniqueAboutPage.tsx",
      "src/pages/AutomationPage.tsx",
      "src/pages/ExperiencePage.tsx",
      "src/pages/CertificationsPage.tsx",
      "src/pages/ContactPage.tsx",
      "src/pages/ProjectDetailPage.tsx",
    ];

    for (const file of files) {
      const source = readFileSync(resolve(file), "utf8");
      expect(source, file).toMatch(/max-w-(?:4xl|5xl|6xl)[^\n]+px-6/);
    }
  });

  it("ships valid discovery and identity assets", () => {
    expect(existsSync(resolve("public/favicon.svg"))).toBe(true);
    expect(existsSync(resolve("public/sitemap.xml"))).toBe(true);

    const seoSource = readFileSync(resolve("src/components/SEO.tsx"), "utf8");
    expect(seoSource).not.toContain("/og-image.png");

    const html = readFileSync(resolve("index.html"), "utf8");
    expect(html).toContain('href="/favicon.svg"');
    expect(html).not.toContain("/vite.svg");

    const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf8");
    expect(sitemap).toContain(`${SITE_URL}/projects/rewardme`);
    expect(sitemap).not.toContain("issuepilot");
  });

  it("marks the not-found route as non-indexable", () => {
    const source = readFileSync(resolve("src/pages/NotFoundPage.tsx"), "utf8");
    expect(source).toContain("<SEO");
    expect(source).toContain("noIndex");
  });

  it("uses semantic case-study section headings", () => {
    const source = readFileSync(resolve("src/pages/ProjectDetailPage.tsx"), "utf8");
    expect(source).toContain('<section id={section.id}');
    expect(source).toContain("<h2");
    expect(source).not.toContain('<summary id={section.id}');
  });

  it("marks missing project routes as non-indexable", () => {
    const source = readFileSync(resolve("src/pages/ProjectDetailPage.tsx"), "utf8");
    expect(source).toContain('title="Project Not Found"');
    expect(source).toContain("noIndex");
  });

  it("labels icon-only profile links", () => {
    const source = readFileSync(resolve("src/pages/UniqueAboutPage.tsx"), "utf8");
    expect(source).toContain('aria-label="View Elijah\'s GitHub profile"');
    expect(source).toContain('aria-label="View Elijah\'s LinkedIn profile"');
  });

  it("keeps the home page focused on work and primary next steps", () => {
    const source = readFileSync(resolve("src/pages/UniqueHomePage.tsx"), "utf8");
    expect(source).not.toContain("<AutomationShowcase");
  });

  it("publishes resume actions in both active homepage CTA areas", () => {
    const hero = readFileSync(resolve("src/components/UniqueHero.tsx"), "utf8");
    const home = readFileSync(resolve("src/pages/UniqueHomePage.tsx"), "utf8");
    const resumePath = resolve("public/elijah-de-los-santos-resume.pdf");

    expect(hero).toContain("<ResumeActions");
    expect(home).toContain("<ResumeActions");
    expect(existsSync(resumePath)).toBe(true);
    expect(statSync(resumePath).size).toBeGreaterThan(50_000);
  });

  it("uses level-two headings for projects in the archive", () => {
    const source = readFileSync(
      resolve("src/components/EnhancedProjectCard.tsx"),
      "utf8",
    );
    expect(source).toContain("<h2");
    expect(source).not.toContain("<CardTitle");
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
