# Hiring-Readiness Portfolio Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Elijah's portfolio application-ready by aligning its layout, professional history, contact flow, metadata, credibility, and repository quality with the confirmed production identity.

**Architecture:** Centralize public identity and URL behavior in a small `site` module, keep professional history in the existing data service, and move case-study parsing into a tested library boundary. Existing React pages will consume those sources while preserving the current dark editorial design and project presentation system.

**Tech Stack:** React 19, TypeScript, React Router, React Helmet Async, TanStack Query, Tailwind CSS, Framer Motion, Vitest, Testing Library, Vite, and Playwright browser QA.

---

## File Map

- Create `src/lib/site.ts` and `src/lib/site.test.ts` for production identity, metadata, and email-draft behavior.
- Create `src/lib/caseStudy.ts` and `src/lib/caseStudy.test.ts` for deterministic case-study sections and heading identifiers.
- Modify public pages/components for confirmed contact details, professional history, accurate claims, responsive gutters, and contextual metadata.
- Modify `src/App.tsx` for route-level code splitting and replace `README.md` with current repository documentation.

### Task 1: Centralize production identity and contact behavior

**Files:**
- Create: `src/lib/site.test.ts`
- Create: `src/lib/site.ts`

- [ ] **Step 1: Write the failing identity tests**

```ts
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
    expect(decodeURIComponent(url)).toContain("manager@example.com");
  });
});
```

- [ ] **Step 2: Run `npm test -- src/lib/site.test.ts` and verify it fails because `@/lib/site` is absent.**

- [ ] **Step 3: Implement the minimal identity module.**

```ts
export const SITE_URL = "https://portfolio-inky-eight-48.vercel.app";
export const CONTACT_EMAIL = "elaidelossantos05@gmail.com";
export const GITHUB_URL = "https://github.com/ElaiElaiElai1113";
export const LINKEDIN_URL = "https://linkedin.com/in/elijahndelosantos";

export type ContactDraft = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function buildCanonicalUrl(pathname = "/") {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export function buildPageTitle(title?: string) {
  return title
    ? `${title} | Elijah De Los Santos`
    : "Elijah De Los Santos | Full-Stack Developer";
}

export function buildContactMailtoUrl(draft: ContactDraft) {
  const subject = `Portfolio inquiry: ${draft.subject.trim()}`;
  const body = [
    `Name: ${draft.name.trim()}`,
    `Email: ${draft.email.trim()}`,
    "",
    draft.message.trim(),
  ].join("\n");
  return `mailto:${encodeURIComponent(CONTACT_EMAIL)}?${new URLSearchParams({ subject, body })}`;
}
```

- [ ] **Step 4: Run `npm test -- src/lib/site.test.ts`; expect 3 passing tests.**

- [ ] **Step 5: Commit with `git commit -m "feat: centralize portfolio identity"`.**

### Task 2: Correct SEO, sitemap, and public contact destinations

**Files:**
- Modify: `src/components/SEO.tsx`
- Modify: `src/components/Sitemap.tsx`
- Modify: `public/robots.txt`
- Modify: `src/pages/ContactPage.tsx`
- Modify: `src/pages/ProjectDetailPage.tsx`
- Modify: `src/components/AnimatedContactForm.tsx`
- Modify: `src/components/UniqueFooter.tsx`
- Modify: `src/components/UniqueNavigation.tsx`
- Modify: `src/pages/AutomationPage.tsx`
- Modify: `src/pages/CertificationsPage.tsx`
- Modify: `src/lib/site.test.ts`

- [ ] **Step 1: Add failing rendered-metadata and source-integrity tests.**

```tsx
it("renders contextual canonical and social metadata", () => {
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={["/projects/rewardme"]}>
        <SEO title="RewardMe" description="RewardMe case study" />
      </MemoryRouter>
    </HelmetProvider>,
  );
  expect(document.title).toBe("RewardMe | Elijah De Los Santos");
  expect(document.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
    "https://portfolio-inky-eight-48.vercel.app/projects/rewardme",
  );
});

it("contains no stale public destinations", () => {
  const files = [
    "src/pages/ContactPage.tsx",
    "src/components/UniqueFooter.tsx",
    "src/components/UniqueNavigation.tsx",
    "src/pages/AutomationPage.tsx",
    "src/pages/CertificationsPage.tsx",
  ];
  const source = files.map((file) => readFileSync(resolve(file), "utf8")).join("\n");
  expect(source).not.toMatch(/yourprofile|yourusername|contact@elijahndelosantos\.com/);
});
```

- [ ] **Step 2: Run `npm test -- src/lib/site.test.ts`; verify failures show the old canonical/title and stale destinations.**

- [ ] **Step 3: Consume `SITE_URL`, `buildCanonicalUrl`, and `buildPageTitle` in `SEO.tsx` and `Sitemap.tsx`; update `robots.txt` to the confirmed sitemap URL. Add the SEO component to the loaded project-detail view with a contextual `<project title> Case Study` title, the project summary as description, the cover image, and article type.**

- [ ] **Step 4: Replace Netlify submission with a transparent email-draft handoff.**

```ts
const onSubmit = (data: FormValues) => {
  window.location.href = buildContactMailtoUrl(data);
};
```

Remove the fake success state and Netlify attributes. Explain that the button opens a ready-to-send email, label it `Open Email Draft`, and keep a direct Gmail link below it.

- [ ] **Step 5: Use `CONTACT_EMAIL`, `GITHUB_URL`, and `LINKEDIN_URL` across all listed contact surfaces; remove the unverified X/Twitter item.**

- [ ] **Step 6: Run `npm test -- src/lib/site.test.ts`; expect every identity test to pass.**

- [ ] **Step 7: Commit with `git commit -m "fix: align portfolio metadata and contact paths"`.**

### Task 3: Lead with independent client experience

**Files:**
- Create: `src/data/experiences.test.ts`
- Modify: `src/data/experiences.json`
- Modify: `src/pages/ExperiencePage.tsx`
- Modify: `src/pages/UniqueAboutPage.tsx`
- Modify: `src/pages/UniqueHomePage.tsx`
- Modify: `src/components/UniqueHero.tsx`

- [ ] **Step 1: Write failing timeline tests.**

```ts
import experiences from "@/data/experiences.json";

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
  expect(experiences[0].bullets.join(" ")).toContain("sole full-stack developer");
  expect(experiences[0].bullets.join(" ")).toContain("EasyDrive");
});
```

- [ ] **Step 2: Run `npm test -- src/data/experiences.test.ts`; verify RED because the client entry is absent.**

- [ ] **Step 3: Add a current `Independent Client Work / Full-Stack Developer` entry starting `2026-03-01`, using only the approved project responsibilities and no invented outcomes.**

- [ ] **Step 4: Add a graduation callout to Experience: `BS Information Systems · Graduated June 2026` and `Completed the degree while working, then continued delivering client products.` Label older roles `Earlier Experience`.**

- [ ] **Step 5: Replace `currently pursuing` and student-first language on About, Home, and Hero with graduate/client-delivery language. Change the Home experience detail to `Client delivery since March 2026`.**

- [ ] **Step 6: Run `npm test -- src/data/experiences.test.ts`; expect both tests to pass.**

- [ ] **Step 7: Commit with `git commit -m "feat: foreground independent client experience"`.**

### Task 4: Center the Projects archive

**Files:**
- Modify: `src/pages/ProjectsPage.tsx`

- [ ] **Step 1: At 2048×1069 and 390×844, use Playwright to record that the Projects H1 begins at `x = 0`.**

- [ ] **Step 2: Change the root wrapper to `<div className="container mx-auto px-6 space-y-12">`, keeping header, controls, grid, empty state, and CTA in the same frame.**

- [ ] **Step 3: Recheck both viewports; expect nonzero gutters, three columns on wide desktop, one column on mobile, and no horizontal overflow.**

- [ ] **Step 4: Commit with `git commit -m "style: center the projects archive"`.**

### Task 5: Stabilize case-study heading identifiers

**Files:**
- Create: `src/lib/caseStudy.test.ts`
- Create: `src/lib/caseStudy.ts`
- Modify: `src/pages/ProjectDetailPage.tsx`

- [ ] **Step 1: Write the failing parser regression test.**

```ts
it("ignores the document H1 and makes repeated headings unique", () => {
  const parsed = parseCaseStudy(
    "# Product\n\n## Overview\nFirst\n\n## Outcome\nOne\n\n## Outcome\nTwo",
  );
  expect(parsed.sections.map((section) => section.id)).toEqual([
    "overview",
    "outcome",
    "outcome-2",
  ]);
});
```

- [ ] **Step 2: Run `npm test -- src/lib/caseStudy.test.ts`; verify RED because `parseCaseStudy` is absent.**

- [ ] **Step 3: Implement `parseCaseStudy(markdown)` in `src/lib/caseStudy.ts`; skip the document H1, generate H2/H3 IDs through one counter, and return `{ sections, toc }`.**

- [ ] **Step 4: Replace page-local parsing with the library output and use `section.id` for section keys and anchors.**

- [ ] **Step 5: Run `npm test -- src/lib/caseStudy.test.ts src/components/ProjectVisual.test.tsx`; expect all tests to pass.**

- [ ] **Step 6: Commit with `git commit -m "fix: stabilize case study heading identifiers"`.**

### Task 6: Ground automation content in demonstrable capability

**Files:**
- Modify: `src/components/AutomationShowcase.tsx`
- Modify: `src/pages/AutomationPage.tsx`
- Modify: `src/pages/UniqueAboutPage.tsx`
- Modify: `src/lib/site.test.ts`

- [ ] **Step 1: Extend the source-integrity test with `expect(source).not.toMatch(/100% data accuracy|120\+|1,200\+|2-4x|2\+ days manual/);` and include both automation files.**

- [ ] **Step 2: Run `npm test -- src/lib/site.test.ts`; verify RED on existing claims.**

- [ ] **Step 3: Replace aggregate-number cards with four capability cards: Event-driven, Validated, Observable, and Integrated. Rename examples `Representative Workflow Patterns` and describe workflow focus/integrations instead of claimed time savings.**

- [ ] **Step 4: Label the interactive page sequence `Illustrative workflow demo`; replace perfect-accuracy and fixed-duration copy with validation, traceability, retry, and human-review goals. Remove the About-page ten-hours claim.**

- [ ] **Step 5: Run `npm test -- src/lib/site.test.ts`; expect the credibility guard to pass.**

- [ ] **Step 6: Commit with `git commit -m "content: ground automation claims in demonstrated work"`.**

### Task 7: Split routes and refresh repository documentation

**Files:**
- Modify: `src/App.tsx`
- Replace: `README.md`

- [ ] **Step 1: Run `npm run build`; record the current single entry bundle near 847 KB minified.**

- [ ] **Step 2: Convert page imports to `lazy(() => import(...))` and wrap routed content in an accessible `Suspense` status fallback.**

- [ ] **Step 3: Replace README content with the confirmed live URL, actual hiring-focused features, JSON-backed data model, real clone URL, test/build commands, Vercel deployment, and author profiles. Remove database-message and generic-author claims.**

- [ ] **Step 4: Run `npm run build`; expect multiple route chunks, a materially smaller entry chunk, and exit 0.**

- [ ] **Step 5: Commit with `git commit -m "perf: split routes and refresh portfolio docs"`.**

### Task 8: Full verification and Playwright review

**Files:**
- Modify only if verification exposes a defect covered by this plan.

- [ ] **Step 1: Run `npm test`, `npm run lint`, `npm run build`, `npm audit --omit=dev`, and `git diff --check`. Expect passing tests, zero lint errors, a successful build, zero vulnerabilities, and a clean diff check.**

- [ ] **Step 2: At 2048×1069, check `/`, `/projects`, `/projects/easydrive-ecosystem`, `/experience`, `/about`, `/automation`, and `/contact`. Expect correct H1s, Projects gutters, contextual canonical values, no broken images, no overflow, and no console errors.**

- [ ] **Step 3: At 390×844, check Home, Projects, EasyDrive detail, Experience, and Contact. Expect working menu, visible gutters, single-column cards, readable forms, and no overflow.**

- [ ] **Step 4: Verify incomplete contact fields show validation and inspect the generated `mailto:` through the tested helper without activating an external email client or sending a message.**

- [ ] **Step 5: Run `git status --short --branch` and `git log --oneline -10`; expect a clean feature branch containing the focused commits.**
