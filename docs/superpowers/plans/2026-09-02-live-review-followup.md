# Live Portfolio Review Follow-up Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the remaining live-review issues so every route starts at the top, Certifications is discoverable, Experience matches the resume, certification copy is honest, and About emphasizes demonstrated technologies.

**Architecture:** Add one router-aware layout utility for scroll restoration, extend the existing shared navigation and experience data structures, and make targeted content-only changes to Certifications and About. Preserve the existing visual system and validate each behavior with focused Vitest/Testing Library coverage before implementation.

**Tech Stack:** React 19, React Router 7, TypeScript, Vitest, Testing Library, Tailwind CSS, Vite

---

## File Map

- Create `src/components/ScrollToTop.tsx`: resets both scroll axes when the pathname changes.
- Create `src/components/ScrollToTop.test.tsx`: route-transition regression coverage.
- Modify `src/layouts/UniquePublicLayout.tsx`: mounts the scroll utility once for all public routes.
- Modify `src/components/UniqueNavigation.tsx`: exposes Certifications and its `r` shortcut.
- Modify `src/components/KeyboardShortcutsModal.tsx`: synchronizes displayed shortcut help.
- Modify `src/components/accessibility.test.tsx`: navigation and keyboard regression coverage.
- Modify `src/types/portfolio.ts`: supports honest date and duration display labels.
- Modify `src/data/experiences.json`: adds DICT and SAMAHAN resume entries.
- Modify `src/data/experiences.test.ts`: validates resume/site parity.
- Modify `src/pages/ExperiencePage.tsx`: renders explicit labels and moves the earlier-experience divider.
- Modify `src/pages/CertificationsPage.tsx`: removes repeated placeholders and adds one page-level disclosure.
- Modify `src/data/certifications.test.ts`: guards against unsupported credential metadata.
- Create `src/pages/hiringContent.test.tsx`: verifies certification and About-page hiring content.
- Modify `src/pages/UniqueAboutPage.tsx`: aligns descriptions and skill groups with demonstrated work.

### Task 1: Route Scroll Reset

- [ ] **Step 1: Write the failing route-transition test**

Create `src/components/ScrollToTop.test.tsx` with a memory router, a location probe, and a navigation button. Stub `window.scrollTo`, navigate from `/about` to `/projects`, and assert `scrollTo(0, 0)` is called for the pathname change.

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { ScrollToTop } from "@/components/ScrollToTop";

function RouteHarness() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <ScrollToTop />
      <span>{location.pathname}</span>
      <button onClick={() => navigate("/projects")}>Projects</button>
    </>
  );
}

describe("ScrollToTop", () => {
  it("resets both scroll axes after a pathname change", () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    render(<MemoryRouter initialEntries={["/about"]}><RouteHarness /></MemoryRouter>);
    scrollTo.mockClear();
    fireEvent.click(screen.getByRole("button", { name: "Projects" }));
    expect(screen.getByText("/projects")).toBeInTheDocument();
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- src/components/ScrollToTop.test.tsx`

Expected: FAIL because `@/components/ScrollToTop` does not exist.

- [ ] **Step 3: Implement and mount the utility**

Create `ScrollToTop.tsx` with `useLocation` and an effect keyed only to `pathname`, then render `<ScrollToTop />` inside `UniquePublicLayout` before the navigation.

```tsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}
```

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- src/components/ScrollToTop.test.tsx`

Expected: 1 test passes.

- [ ] **Step 5: Commit the scroll fix**

Run: `git add src/components/ScrollToTop.tsx src/components/ScrollToTop.test.tsx src/layouts/UniquePublicLayout.tsx && git commit -m "fix: reset scroll on route changes"`

### Task 2: Certifications Navigation and Shortcut Parity

- [ ] **Step 1: Add failing navigation tests**

Extend `src/components/accessibility.test.tsx` to open the mobile menu and expect two `Certifications` links with `/certifications`, press `r`, and confirm a location probe reports `/certifications`. Open shortcut help and require `Certifications`, `r`, and the actual theme key `b`.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- src/components/accessibility.test.tsx`

Expected: FAIL because Certifications is absent from primary navigation and no `r` handler exists.

- [ ] **Step 3: Implement the shared navigation entry and synchronized help**

Add `{ name: "Certifications", href: "/certifications", key: "r" }` before Contact, add the corresponding `useKeyboardShortcuts` handler, and update `KeyboardShortcutsModal` to list Home, About, Projects, Automation, Experience, Certifications, Contact, Search, and Toggle Theme using the keys implemented by the application (`h`, `a`, `p`, `u`, `e`, `r`, `c`, `/`, `b`).

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- src/components/accessibility.test.tsx`

Expected: all accessibility tests pass.

- [ ] **Step 5: Commit the navigation change**

Run: `git add src/components/UniqueNavigation.tsx src/components/KeyboardShortcutsModal.tsx src/components/accessibility.test.tsx && git commit -m "feat: expose certifications in primary navigation"`

### Task 3: Resume-Aligned Experience

- [ ] **Step 1: Add failing data assertions**

Extend `src/data/experiences.test.ts` to require a DICT Region 11 Software Development Intern entry with `date_label: "2025 · 3 months"`, Django, Flutter, and Supabase evidence, plus an Ateneo SAMAHAN Project Manager entry with `date_label: "2025"`. Require sort orders 1 and 2.

- [ ] **Step 2: Run the experience test and verify RED**

Run: `npm test -- src/data/experiences.test.ts`

Expected: FAIL because the two entries are missing.

- [ ] **Step 3: Add explicit display-label support and resume-backed entries**

Add optional `date_label` and `duration_label` to `Experience`. Add DICT and SAMAHAN to `experiences.json`, move CSSEC and Metropolitan to sort orders 3 and 4, render `date_label` instead of computed dates when supplied, render `duration_label` when supplied, and place the `Earlier experience` divider at index 2.

- [ ] **Step 4: Run the experience test and verify GREEN**

Run: `npm test -- src/data/experiences.test.ts`

Expected: all experience tests pass.

- [ ] **Step 5: Commit the experience update**

Run: `git add src/types/portfolio.ts src/data/experiences.json src/data/experiences.test.ts src/pages/ExperiencePage.tsx && git commit -m "feat: align experience with resume"`

### Task 4: Certification and About Hiring Content

- [ ] **Step 1: Add failing content tests**

Extend `src/data/certifications.test.ts` to prove no certification claims a `credential_url` or `credential_id`. Create `src/pages/hiringContent.test.tsx` and render `CertificationsPage` with a QueryClient and `UniqueAboutPage` with a MemoryRouter. Assert the repeated card text is absent, the page-level public-verification note appears once, About contains Next.js, Supabase/PostgreSQL, Shopify, Flutter, and Playwright, and the generic sentence `React, Node.js, and whatever tools fit the job` is absent.

- [ ] **Step 2: Run focused content tests and verify RED**

Run: `npm test -- src/data/certifications.test.ts src/pages/hiringContent.test.tsx`

Expected: FAIL because the old certification placeholder and generic About copy remain.

- [ ] **Step 3: Implement the scoped content changes**

Remove the per-card fallback paragraph. Change the closing certification copy to one concise disclosure: `Public credential links are not displayed here yet. Supporting documentation can be discussed during the hiring process.` Keep the LinkedIn CTA.

Rewrite the Full-Stack Applications card around Next.js, React, TypeScript, Supabase/PostgreSQL, Shopify, and Flutter delivery. Rename and populate skill groups as:

- Frontend & Mobile: React, Next.js, TypeScript, Tailwind CSS, Flutter, Dart, PWA, Capacitor.
- Backend & Data: Supabase, PostgreSQL, Django, REST APIs, Authentication, Row-Level Security, SQL, API Integrations.
- Platforms & Delivery: Shopify, Vercel, GitHub, Playwright, Figma, Postman, n8n, AI/LLM Integrations.
- Product & Process: Agile/Scrum, Requirements Discovery, Data Modeling, Testing, Technical Documentation, Stakeholder Communication, Workflow Automation, Lean Six Sigma.

- [ ] **Step 4: Run focused content tests and verify GREEN**

Run: `npm test -- src/data/certifications.test.ts src/pages/hiringContent.test.tsx`

Expected: all focused content tests pass.

- [ ] **Step 5: Commit the content update**

Run: `git add src/data/certifications.test.ts src/pages/hiringContent.test.tsx src/pages/CertificationsPage.tsx src/pages/UniqueAboutPage.tsx && git commit -m "feat: strengthen hiring content"`

### Task 5: Full Verification, Browser QA, and Delivery

- [ ] **Step 1: Run complete automated verification**

Run: `npm test`

Expected: all tests pass with zero failures.

Run: `npm run lint`

Expected: exit code 0 with no ESLint errors.

Run: `npm run build`

Expected: TypeScript and Vite production build exit code 0.

Run: `git diff --check`

Expected: no whitespace errors.

- [ ] **Step 2: Review implementation diff and repository status**

Run: `git diff HEAD~4 -- src docs/superpowers/plans/2026-09-02-live-review-followup.md && git status --short --branch`

Expected: only planned source, test, and plan changes are tracked; existing `output/` and `tmp/` artifacts remain untracked and untouched.

- [ ] **Step 3: Run browser QA**

Launch the production build locally and inspect Home, About, Projects, Automation, Experience, Certifications, Contact, and representative project routes at desktop and mobile widths. Verify internal navigation resets to `scrollY === 0`, Certifications appears in desktop/mobile navigation, new experience entries render without invented months, certification disclosure appears once, About skill groups wrap cleanly, no broken images appear, and document width never exceeds viewport width.

- [ ] **Step 4: Commit any test-only QA adjustment if required**

If browser QA requires no source correction, no additional commit is needed. If a correction is required, first add a failing regression test, implement the minimal fix, rerun Task 5 Step 1, and commit only that correction.

- [ ] **Step 5: Push main**

Run: `git push origin main`

Expected: `origin/main` advances through all new commits with no force push.
