# Commercial Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing portfolio into a hiring-focused full-stack portfolio led by five new commercial case studies, while preserving and verifying every existing project.

**Architecture:** Keep the current React/Vite application and data-driven project model. Add typed project categories and states, centralize presentation rules for labels and actions, store verified screenshots locally, and update the homepage, archive, cards, and detail page around commercial evidence. Pure presentation helpers and content contracts will be covered by Vitest; Playwright-driven browser inspection will provide desktop and mobile visual QA.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, TanStack Query, React Router, Framer Motion, Vitest, Testing Library, Playwright through the in-app Browser.

---

## File Structure

**Create:**

- `vitest.config.ts` — test runner configuration and `@/` alias.
- `eslint.config.js` — ESLint 9 flat configuration for TypeScript and React.
- `src/test/setup.ts` — Testing Library cleanup and DOM matchers.
- `src/lib/projectPresentation.ts` — category, state-label, filtering, and CTA rules.
- `src/lib/projectPresentation.test.ts` — unit tests for presentation rules.
- `src/data/projects.test.ts` — project-content contract and local-media validation.
- `src/components/ProjectVisual.tsx` — shared screenshot rendering with an accessible fallback.
- `src/components/ProjectVisual.test.tsx` — image/fallback component tests.
- `public/assets/projects/*` — local cover and gallery screenshots captured from verified deployments.

**Modify:**

- `package.json` and `package-lock.json` — add test scripts and test dependencies.
- `src/types/portfolio.ts` — add category, state, year, and client-work fields.
- `src/data/projects.json` — add five commercial case studies and refresh six existing entries.
- `src/components/UniqueHero.tsx` — strengthen full-stack positioning and commercial credibility.
- `src/components/UniqueProjectCard.tsx` — add state/category cues, reliable actions, and editorial featured sizing.
- `src/components/EnhancedProjectCard.tsx` — use shared types, screenshots, labels, and CTA rules.
- `src/pages/UniqueHomePage.tsx` — update selected-work narrative and portfolio counts.
- `src/pages/ProjectsPage.tsx` — replace noisy technology pills with business categories.
- `src/pages/ProjectDetailPage.tsx` — add hiring-focused metadata, shared actions, screenshot fallbacks, and gallery polish.
- `src/index.css` — add only focused card, metadata, and responsive refinements discovered during visual QA.

## Canonical Project Set

The final archive contains eleven entries. Homepage featured slugs are exactly:

```ts
[
  "easydrive-ecosystem",
  "rewardme",
  "synergize-business-group",
  "innerfire-co",
  "medellin-rewards",
  "pokebuddy",
]
```

New entry facts:

| Slug | Category | State | Year | Live URL | Public source |
| --- | --- | --- | --- | --- | --- |
| `easydrive-ecosystem` | Business Systems | Live Product | 2026 | `https://easydrivecanada.com/` | none |
| `rewardme` | Commerce | Live Product | 2026 | `https://rewardme-prod.vercel.app/` | none |
| `synergize-business-group` | SaaS | Client Work | 2026 | `https://synergize-business-group.vercel.app/` | none unless public sharing is verified |
| `innerfire-co` | Commerce | Live Product | 2026 | `https://innerfireco.com.au/` | none |
| `medellin-rewards` | Commerce | Live Product | 2026 | `https://www.medellinrewards.com/` | none unless public sharing is verified |

Existing entry states:

| Slug | Category | State | Year |
| --- | --- | --- | --- |
| `issuepilot` | SaaS | Archived Build | 2025 |
| `sebtravels` | Commerce | Live Product | 2025 |
| `pokebuddy` | AI | Source Available | 2025 |
| `ai-tweet-generator` | AI | Source Available | 2025 |
| `dailymacros` | Commerce | Live Product | 2025 |
| `godavao-rideshare` | Mobile | Source Available | 2025 |

### Task 1: Isolate Work and Synchronize Safe Source Repositories

**Files:**

- No portfolio source files changed in this task.
- Preserve all sibling-repository user changes.

- [ ] **Step 1: Create an isolated implementation worktree**

Use `superpowers:using-git-worktrees` from the portfolio repository. Create branch `codex/commercial-portfolio` from the current `main` commit and place it in the skill-selected worktree directory.

Expected: the worktree starts at commit `d92e1bd` or its direct successor and `git status --short` is empty.

- [ ] **Step 2: Confirm sibling repository cleanliness before network updates**

Run:

```powershell
git -C 'C:\Users\Admin\Desktop\Projects\Portfolio\easydrivefinance' status --porcelain
git -C 'C:\Users\Admin\Desktop\Projects\Portfolio\SynergizeBusinessGroup' status --porcelain
git -C 'C:\Users\Admin\Desktop\Projects\Portfolio\coffee-loyalty' status --porcelain
git -C 'C:\Users\Admin\Desktop\Projects\Portfolio\easydrivecanadav2-master' status --porcelain
```

Expected: the first three are clean. EasyDrive Canada reports existing modifications and untracked files and is not pulled.

- [ ] **Step 3: Fetch and fast-forward only clean repositories**

Run for each clean repository:

```powershell
git -C 'C:\Users\Admin\Desktop\Projects\Portfolio\easydrivefinance' fetch --prune origin
git -C 'C:\Users\Admin\Desktop\Projects\Portfolio\easydrivefinance' pull --ff-only
git -C 'C:\Users\Admin\Desktop\Projects\Portfolio\SynergizeBusinessGroup' fetch --prune origin
git -C 'C:\Users\Admin\Desktop\Projects\Portfolio\SynergizeBusinessGroup' pull --ff-only
git -C 'C:\Users\Admin\Desktop\Projects\Portfolio\coffee-loyalty' fetch --prune origin
git -C 'C:\Users\Admin\Desktop\Projects\Portfolio\coffee-loyalty' pull --ff-only
```

Expected: each repository either reports `Already up to date.` or fast-forwards without conflicts. Do not pull any repository that becomes dirty.

- [ ] **Step 4: Record the portfolio baseline**

Run from the isolated portfolio worktree:

```powershell
npm run build
npm run lint
```

Expected: record the actual output. The build should succeed; lint may expose the missing ESLint 9 configuration that Task 2 repairs.

### Task 2: Add the Test and Lint Foundation

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.ts`
- Create: `eslint.config.js`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Install the test dependencies and add scripts**

Run:

```powershell
npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom
```

Add these scripts to `package.json`:

```json
{
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 2: Configure Vitest and Testing Library**

Create `vitest.config.ts`:

```ts
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
  },
});
```

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());
```

- [ ] **Step 3: Add an ESLint 9 flat configuration**

Create `eslint.config.js`:

```js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "coverage"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
);
```

- [ ] **Step 4: Commit the test foundation**

```powershell
git add package.json package-lock.json vitest.config.ts eslint.config.js src/test/setup.ts
git commit -m "test: add portfolio quality gates"
```

### Task 3: Add Typed Project Presentation Rules

**Files:**

- Modify: `src/types/portfolio.ts`
- Create: `src/lib/projectPresentation.ts`
- Create: `src/lib/projectPresentation.test.ts`

- [ ] **Step 1: Expand the failing tests**

Create `src/lib/projectPresentation.test.ts` with tests covering the final behavior:

```ts
import { describe, expect, it } from "vitest";
import {
  PROJECT_CATEGORIES,
  getProjectActions,
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
```

- [ ] **Step 2: Run the tests and confirm RED**

Run:

```powershell
npm test -- src/lib/projectPresentation.test.ts
```

Expected: FAIL because the types and helper exports are missing.

- [ ] **Step 3: Add the project types**

At the top of `src/types/portfolio.ts`, add:

```ts
export const projectCategories = [
  "Business Systems",
  "Commerce",
  "SaaS",
  "AI",
  "Mobile",
  "Automation",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectState =
  | "live-product"
  | "demo"
  | "source-available"
  | "client-work"
  | "archived-build";
```

Add these required fields to `Project` and allow the existing hidden state:

```ts
category: ProjectCategory;
project_state: ProjectState;
year: number;
client_work?: boolean;
status?: "draft" | "published" | "hidden";
```

- [ ] **Step 4: Implement the minimal presentation helper**

Create `src/lib/projectPresentation.ts`:

```ts
import type { Project, ProjectCategory, ProjectState } from "@/types/portfolio";

export const PROJECT_CATEGORIES = [
  "All",
  "Business Systems",
  "Commerce",
  "SaaS",
  "AI",
  "Mobile",
  "Automation",
] as const;

export type ProjectCategoryFilter = "All" | ProjectCategory;

const stateLabels: Record<ProjectState, string> = {
  "live-product": "Live Product",
  demo: "Demo",
  "source-available": "Source Available",
  "client-work": "Client Work",
  "archived-build": "Archived Build",
};

export type ProjectAction = {
  kind: "live" | "source";
  label: string;
  url: string;
};

export function getProjectStateLabel(state: ProjectState) {
  return stateLabels[state];
}

export function getProjectActions(project: Project): ProjectAction[] {
  const actions: ProjectAction[] = [];
  if (project.live_url && project.project_state !== "archived-build") {
    actions.push({
      kind: "live",
      label: project.project_state === "demo" ? "View Demo" : "Visit Live Product",
      url: project.live_url,
    });
  }
  if (project.repo_url) {
    actions.push({ kind: "source", label: "View Source", url: project.repo_url });
  }
  return actions;
}

export function matchesProject(
  project: Project,
  query: string,
  category: ProjectCategoryFilter,
) {
  if (category !== "All" && project.category !== category) return false;
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  return [
    project.title,
    project.summary,
    project.category,
    ...project.stack,
    ...project.tags,
  ].some((value) => value.toLowerCase().includes(normalized));
}
```

- [ ] **Step 5: Run tests and confirm GREEN**

```powershell
npm test -- src/lib/projectPresentation.test.ts
```

Expected: all six tests pass.

- [ ] **Step 6: Commit the typed rules**

```powershell
git add src/types/portfolio.ts src/lib/projectPresentation.ts src/lib/projectPresentation.test.ts
git commit -m "feat: add project presentation rules"
```

### Task 4: Capture and Store Verified Project Media

**Files:**

- Create: `public/assets/projects/easydrive-canada-cover.png`
- Create: `public/assets/projects/easydrive-finance-funnel.png`
- Create: `public/assets/projects/rewardme-cover.png`
- Create: `public/assets/projects/rewardme-business.png`
- Create: `public/assets/projects/synergize-cover.png`
- Create: `public/assets/projects/innerfire-cover.png`
- Create: `public/assets/projects/innerfire-story.png`
- Create: `public/assets/projects/medellin-rewards-cover.png`

- [ ] **Step 1: Capture consistent desktop screenshots with the in-app Browser**

Use the browser's Playwright-capable inspection surface. Set a `1440 × 900` viewport, navigate to each exact URL, wait for `networkidle`, then wait another 1–3 seconds for client-rendered content. Capture viewport covers and full-page secondary views from:

```text
https://easydrivecanada.com/
https://easydrivefinance.ca/
https://rewardme-prod.vercel.app/
https://rewardme-prod.vercel.app/business
https://synergize-business-group.vercel.app/
https://innerfireco.com.au/
https://innerfireco.com.au/pages/our-story
https://www.medellinrewards.com/
```

Write the screenshot bytes directly to the listed `public/assets/projects/` paths. Do not capture private authenticated pages or expose customer data.

- [ ] **Step 2: Inspect every screenshot**

Open each saved image and verify:

- Content is fully loaded.
- No cookie dialog, loading screen, browser chrome, or personal data is visible.
- Cover images communicate the product within a 16:10 crop.
- Full-page gallery images remain readable when opened.

- [ ] **Step 3: Commit the media**

```powershell
git add public/assets/projects
git commit -m "assets: add verified commercial project screenshots"
```

### Task 5: Add the Project Content Contract and Eleven-Project Dataset

**Files:**

- Create: `src/data/projects.test.ts`
- Modify: `src/data/projects.json`
- Modify: `src/services/projects.ts`

- [ ] **Step 1: Write the failing data-contract tests**

Create `src/data/projects.test.ts`:

```ts
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import projectsData from "@/data/projects.json";
import { getFeaturedProjects, getPublishedProjects } from "@/services/projects";
import { projectCategories, type Project } from "@/types/portfolio";

const projects = projectsData as Project[];
const states = [
  "live-product",
  "demo",
  "source-available",
  "client-work",
  "archived-build",
];

describe("project content", () => {
  it("contains the eleven approved projects with unique IDs and slugs", () => {
    expect(projects).toHaveLength(11);
    expect(new Set(projects.map((project) => project.id)).size).toBe(11);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(11);
  });

  it("contains complete hiring-focused metadata", () => {
    for (const project of projects) {
      expect(projectCategories).toContain(project.category);
      expect(states).toContain(project.project_state);
      expect(project.year).toBeGreaterThanOrEqual(2020);
      expect(project.role?.length).toBeGreaterThan(5);
      expect(project.problem?.length).toBeGreaterThan(30);
      expect(project.solution?.length).toBeGreaterThan(30);
      expect(project.case_study_md?.length).toBeGreaterThan(300);
    }
  });

  it("uses HTTPS for every public action", () => {
    for (const project of projects) {
      for (const url of [project.live_url, project.repo_url].filter(Boolean)) {
        expect(new URL(url!).protocol).toBe("https:");
      }
    }
  });

  it("references local media files that exist", () => {
    for (const project of projects) {
      const urls = [project.cover_image_url, ...(project.media ?? []).map((item) => item.url)];
      for (const url of urls.filter(Boolean)) {
        expect(url).toMatch(/^\/assets\//);
        expect(existsSync(path.join(process.cwd(), "public", url!.slice(1)))).toBe(true);
      }
    }
  });

  it("returns the approved homepage selection in order", async () => {
    const featured = await getFeaturedProjects();
    expect(featured.map((project) => project.slug)).toEqual([
      "easydrive-ecosystem",
      "rewardme",
      "synergize-business-group",
      "innerfire-co",
      "medellin-rewards",
      "pokebuddy",
    ]);
  });

  it("keeps every old and new project in the published archive", async () => {
    expect(await getPublishedProjects()).toHaveLength(11);
  });
});
```

- [ ] **Step 2: Run the contract tests and confirm RED**

```powershell
npm test -- src/data/projects.test.ts
```

Expected: FAIL because the dataset has six entries, missing metadata, hidden IssuePilot, and missing new assets in its content references.

- [ ] **Step 3: Replace `src/data/projects.json` with the canonical eleven entries**

Use the approved project set and media paths in this plan. New summaries must be exactly:

```text
EasyDrive Ecosystem — A connected automotive platform spanning vehicle discovery, financing acquisition, lead delivery, customer purchase flows, and dealer operations across two production products.

RewardMe — A two-sided local rewards platform where members earn through verified purchases and participating businesses publish clear offers, manage customer activity, and choose a commercial participation model.

Synergize Business Group — An invite-only B2B credit network that helps businesses turn idle capacity into purchasing power through a role-secured member marketplace and auditable credit ledger.

Innerfire Co. — A premium Shopify commerce experience combining product discovery, subscription merchandising, research-backed education, sourcing transparency, and a distinctive cacao brand story.

Medellin Rewards — A bilingual member, business, and admin rewards platform with QR transactions, Supabase-backed reward operations, PWA delivery, and native mobile wrappers.
```

All five use `"role": "Sole Full-Stack Developer"` and `"client_work": true`. Their case studies must follow the approved design sections: Overview, Business Problem, Solution, Key Workflows, Architecture and Integrations, Reliability and Security, Challenges and Trade-offs, and Outcome. RewardMe and Innerfire Co. must describe only deployed behavior and must not name an unverified backend or framework.

Use these media mappings:

```json
{
  "easydrive-ecosystem": [
    "/assets/projects/easydrive-canada-cover.png",
    "/assets/projects/easydrive-finance-funnel.png"
  ],
  "rewardme": [
    "/assets/projects/rewardme-cover.png",
    "/assets/projects/rewardme-business.png"
  ],
  "synergize-business-group": [
    "/assets/projects/synergize-cover.png"
  ],
  "innerfire-co": [
    "/assets/projects/innerfire-cover.png",
    "/assets/projects/innerfire-story.png"
  ],
  "medellin-rewards": [
    "/assets/projects/medellin-rewards-cover.png"
  ]
}
```

Refresh existing entries without removing them:

- Publish IssuePilot as `archived-build`, omit live/source actions, and retain its local case study.
- Keep SEBTravels live and keep its verified Vercel and GitHub actions.
- Add `https://github.com/ElaiElaiElai1113/pokebuddy` to Pokebuddy.
- Add `https://github.com/ElaiElaiElai1113/AITweetGenerator` to AI Tweet Generator.
- Keep DailyMacros live and add `https://github.com/ElaiElaiElai1113/dailymacros` only after verifying public access.
- Add `https://github.com/ElaiElaiElai1113/GoDavao` to GoDavao only after verifying public access.
- Set `featured` to `true` only for the six approved homepage slugs and number them 1 through 6.

- [ ] **Step 4: Make service sorting non-mutating**

In `src/services/projects.ts`, clone filtered arrays before sorting:

```ts
const data = (projectsData as Project[])
  .filter((project) => project.status === "published" || project.status === undefined)
  .sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (a.featured_order ?? 999) - (b.featured_order ?? 999);
  });
```

Use the same pattern in `getFeaturedProjects`.

- [ ] **Step 5: Run content and presentation tests and confirm GREEN**

```powershell
npm test -- src/data/projects.test.ts src/lib/projectPresentation.test.ts
```

Expected: all tests pass.

- [ ] **Step 6: Commit the content model**

```powershell
git add src/data/projects.json src/data/projects.test.ts src/services/projects.ts
git commit -m "feat: add commercial portfolio case studies"
```

### Task 6: Build Reliable Project Visuals and Actions

**Files:**

- Create: `src/components/ProjectVisual.tsx`
- Create: `src/components/ProjectVisual.test.tsx`
- Modify: `src/components/EnhancedProjectCard.tsx`
- Modify: `src/components/UniqueProjectCard.tsx`

- [ ] **Step 1: Write the failing visual-fallback tests**

Create `src/components/ProjectVisual.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProjectVisual } from "@/components/ProjectVisual";

describe("ProjectVisual", () => {
  it("renders a descriptive project image", () => {
    render(<ProjectVisual src="/assets/example.png" alt="EasyDrive dashboard" />);
    expect(screen.getByRole("img", { name: "EasyDrive dashboard" })).toHaveAttribute(
      "src",
      "/assets/example.png",
    );
  });

  it("renders an accessible fallback after an image error", () => {
    render(<ProjectVisual src="/assets/missing.png" alt="RewardMe homepage" />);
    fireEvent.error(screen.getByRole("img", { name: "RewardMe homepage" }));
    expect(
      screen.getByRole("img", { name: "RewardMe homepage preview unavailable" }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and confirm RED**

```powershell
npm test -- src/components/ProjectVisual.test.tsx
```

Expected: FAIL because `ProjectVisual` does not exist.

- [ ] **Step 3: Implement `ProjectVisual`**

Create `src/components/ProjectVisual.tsx`:

```tsx
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

type ProjectVisualProps = {
  src?: string;
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
};

export function ProjectVisual({
  src,
  alt,
  className,
  loading = "lazy",
}: ProjectVisualProps) {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={`${alt} preview unavailable`}
        className={cn(
          "flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.16),transparent_42%),linear-gradient(135deg,hsl(var(--card)),hsl(var(--background)))] text-muted-foreground",
          className,
        )}
      >
        <ImageOff className="h-8 w-8" aria-hidden="true" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
```

- [ ] **Step 4: Run the visual tests and confirm GREEN**

```powershell
npm test -- src/components/ProjectVisual.test.tsx
```

Expected: both tests pass.

- [ ] **Step 5: Refactor both card components**

In both card files:

- Import `Project` from `@/types/portfolio`; remove duplicate local interfaces.
- Use `ProjectVisual` for cover media.
- Use `getProjectStateLabel(project.project_state)` for the state badge.
- Use `getProjectActions(project)` for live/source buttons.
- Display `project.category` and `project.year` as a compact metadata row.
- Use action labels from the helper instead of hard-coded `Live Demo` and `GitHub` text.
- Keep a visible `View Case Study` internal link even when there is no external action.

For `UniqueProjectGrid`, use an editorial grid:

```tsx
<div className="grid gap-6 lg:grid-cols-12">
  {projects.map((project, index) => (
    <div
      key={project.id}
      className={index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-4"}
    >
      <UniqueProjectCard project={project} index={index} />
    </div>
  ))}
</div>
```

- [ ] **Step 6: Run tests and build**

```powershell
npm test
npm run build
```

Expected: all tests pass and the build exits 0.

- [ ] **Step 7: Commit the reliable card system**

```powershell
git add src/components/ProjectVisual.tsx src/components/ProjectVisual.test.tsx src/components/EnhancedProjectCard.tsx src/components/UniqueProjectCard.tsx
git commit -m "feat: improve project cards and media reliability"
```

### Task 7: Reposition the Homepage and Project Archive

**Files:**

- Modify: `src/components/UniqueHero.tsx`
- Modify: `src/pages/UniqueHomePage.tsx`
- Modify: `src/pages/ProjectsPage.tsx`

- [ ] **Step 1: Update the hero copy**

Change the hero body to:

```tsx
<p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-light">
  I build <span className="font-medium text-foreground">full-stack products</span>{" "}
  that connect customer experience, business operations, and reliable data—from the first workflow to production.
</p>
```

Use these role chips:

```ts
[
  "Sole Full-Stack Developer",
  "React & TypeScript",
  "Supabase & SQL",
  "Product Delivery",
]
```

Change the primary CTA to `Explore Case Studies`.

- [ ] **Step 2: Update homepage selected-work framing**

Use:

```tsx
<p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
  Shipped Systems
</p>
<h2 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-semibold">
  Commercial products, built end to end
</h2>
<p className="mt-4 max-w-2xl text-muted-foreground">
  Customer-facing experiences and operational platforms spanning automotive,
  commerce, rewards, and business networks.
</p>
```

Update SEO description to target full-stack product engineering. Change the quick-link project count from `6+` to `11`.

- [ ] **Step 3: Replace archive technology pills with category filters**

In `ProjectsPage.tsx`:

```ts
const [activeCategory, setActiveCategory] = useState<ProjectCategoryFilter>("All");
const filteredProjects = projects?.filter((project) =>
  matchesProject(project, searchTerm, activeCategory),
);
```

Render `PROJECT_CATEGORIES` as an accessible `aria-label="Filter projects by category"` control. The active category uses the primary treatment. Search remains independent and the clear action resets both search and category.

Use this archive intro:

```text
Production products, client platforms, and technical builds across full-stack web, mobile, AI, and automation. Every entry is labeled by its real delivery state.
```

- [ ] **Step 4: Run automated checks**

```powershell
npm test
npm run lint
npm run build
```

Expected: all commands exit 0, with no new warnings from the changed files.

- [ ] **Step 5: Commit the hiring-focused navigation and copy**

```powershell
git add src/components/UniqueHero.tsx src/pages/UniqueHomePage.tsx src/pages/ProjectsPage.tsx
git commit -m "feat: reposition portfolio for full-stack roles"
```

### Task 8: Upgrade the Project Detail Experience

**Files:**

- Modify: `src/pages/ProjectDetailPage.tsx`

- [ ] **Step 1: Use shared state and action rules**

Import and use:

```ts
import { ProjectVisual } from "@/components/ProjectVisual";
import { getProjectActions, getProjectStateLabel } from "@/lib/projectPresentation";
```

Replace the published-status badge with `getProjectStateLabel(project.project_state)`. Add compact metadata for category, year, and `Client Work` when `client_work` is true.

Render external actions from `getProjectActions(project)` and preserve `Watch Demo` when `demo_video_url` exists. The internal Back to Projects and previous/next navigation remain unchanged.

- [ ] **Step 2: Strengthen the detail hero and media**

Use `ProjectVisual` for the cover and gallery. The cover uses `object-top`, a 16:9 frame, and descriptive text `${project.title} product preview`. Gallery images use the media caption as alt text, falling back to `${project.title} project screenshot`.

Add a small eyebrow above the title:

```tsx
<p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
  {project.category} · {project.year}
</p>
```

Keep the existing Overview, Case Study, and Media Gallery tabs, but make the tab row horizontally scrollable on narrow screens.

- [ ] **Step 3: Improve case-study scanability**

Keep the current Markdown section splitting and TOC behavior. Change the meta grid to emphasize Role, Product State, Delivery, and Stack. Ensure `Sole Full-Stack Developer` is visible without opening a collapsed section.

- [ ] **Step 4: Run automated checks**

```powershell
npm test
npm run lint
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 5: Commit the detail-page upgrade**

```powershell
git add src/pages/ProjectDetailPage.tsx
git commit -m "feat: strengthen project case study presentation"
```

### Task 9: Playwright Visual QA and Iterative Polish

**Files:**

- Modify as evidence requires: `src/index.css`, `src/components/UniqueHero.tsx`, `src/components/UniqueProjectCard.tsx`, `src/components/EnhancedProjectCard.tsx`, `src/pages/UniqueHomePage.tsx`, `src/pages/ProjectsPage.tsx`, `src/pages/ProjectDetailPage.tsx`
- Create: `artifacts/portfolio-home-desktop.png`
- Create: `artifacts/portfolio-projects-desktop.png`
- Create: `artifacts/portfolio-easydrive-detail.png`
- Create: `artifacts/portfolio-home-mobile.png`
- Create: `artifacts/portfolio-projects-mobile.png`

- [ ] **Step 1: Start the production-like local preview**

Run:

```powershell
npm run build
npm run preview -- --host 0.0.0.0
```

If npm argument forwarding fails on Windows, run the Vite binary directly:

```powershell
.\node_modules\.bin\vite.cmd preview --host 0.0.0.0
```

- [ ] **Step 2: Inspect desktop pages with Playwright**

At `1440 × 900`, inspect and capture:

```text
/
/projects
/projects/easydrive-ecosystem
/projects/rewardme
/projects/synergize-business-group
/projects/innerfire-co
/projects/medellin-rewards
/projects/pokebuddy
```

For each page, inspect a DOM snapshot and screenshot. Check hierarchy, content density, card balance, image crops, action labels, state badges, focus visibility, and the absence of horizontal overflow.

- [ ] **Step 3: Inspect mobile pages with Playwright**

At `390 × 844`, inspect `/`, `/projects`, and `/projects/easydrive-ecosystem`. Confirm:

- Hero text does not collide with hidden side metadata.
- Category filters scroll or wrap cleanly.
- Cards use one column with consistent padding.
- External actions remain tappable and do not overflow.
- Tabs are reachable without clipping.
- Full-page screenshots contain no broken images.

- [ ] **Step 4: Make evidence-driven visual refinements**

Use `apply_patch` for focused edits. Allowed refinements include spacing, max widths, line lengths, grid spans, image object positions, badge contrast, focus rings, and mobile overflow. Do not introduce a new aesthetic or unrelated redesign.

After every edit, reload the affected page and take a fresh screenshot before judging the result.

- [ ] **Step 5: Verify every internal route and external action**

Use Playwright DOM inspection to collect all project detail links and verify each internal route renders its matching `h1`. Open every displayed external live/source action and confirm the destination loads without a browser error page. If an external target fails, remove the action or change the project's state; do not leave a dead link.

- [ ] **Step 6: Commit the visual polish and QA artifacts**

```powershell
git add src artifacts
git commit -m "style: polish commercial portfolio presentation"
```

### Task 10: Final Verification and Branch Completion

**Files:**

- Review all changed files.

- [ ] **Step 1: Run the full automated suite**

```powershell
npm test
npm run lint
npm run build
```

Expected: all tests pass, ESLint exits 0, TypeScript and Vite production build exit 0.

- [ ] **Step 2: Check repository hygiene**

```powershell
git diff --check main...HEAD
git status --short
git log --oneline --decorate -12
```

Expected: no whitespace errors, no unintended files, and a clean working tree.

- [ ] **Step 3: Review requirements line by line**

Confirm:

- Five new commercial case studies exist.
- EasyDrive is one ecosystem entry with two live surfaces.
- RewardMe and Innerfire Co. have screenshots and no unsupported source claims.
- All six prior entries remain available and have accurate state/action labels.
- Homepage shows the exact six approved projects.
- Project archive shows all eleven and uses business categories.
- No displayed external action is broken.
- Desktop and mobile screenshots show a visually coherent, hiring-focused portfolio.

- [ ] **Step 4: Complete the branch workflow**

Invoke `superpowers:finishing-a-development-branch`, present the verified integration options, and follow the user's selected merge/PR path.
