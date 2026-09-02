# Resume Preview and Download Actions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish Elijah's verified resume and expose clear preview and direct-download actions in both active homepage CTA areas.

**Architecture:** A focused `ResumeActions` component will own semantic links, analytics, icons, responsive grouping, and accessible labels. The active hero and closing homepage CTA will consume that component, while Vite will publish the verified PDF from `public/` under a descriptive filename.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React, Vitest, Testing Library

---

## File Structure

- Create `src/components/ResumeActions.tsx`: reusable preview/download action group.
- Create `src/components/ResumeActions.test.tsx`: behavioral coverage for URLs, attributes, and analytics.
- Delete `src/components/ResumeDownloadButton.tsx`: remove the ambiguous window-driven control.
- Modify `src/components/UniqueHero.tsx`: add the action group to the active homepage hero.
- Modify `src/pages/UniqueHomePage.tsx`: add the action group to the closing CTA.
- Modify `src/pages/HomePage.tsx`: update the unused legacy page import so the TypeScript project remains internally consistent.
- Modify `src/lib/site.test.ts`: assert both active homepage placements and the public PDF asset.
- Create `public/elijah-de-los-santos-resume.pdf`: Vite-served copy of the verified resume.

### Task 1: Build the Accessible Resume Action Group

**Files:**
- Create: `src/components/ResumeActions.test.tsx`
- Create: `src/components/ResumeActions.tsx`
- Delete: `src/components/ResumeDownloadButton.tsx`
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Write the failing component tests**

Create `src/components/ResumeActions.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResumeActions } from "@/components/ResumeActions";

describe("ResumeActions", () => {
  it("offers explicit preview and direct-download links", () => {
    render(<ResumeActions />);

    const preview = screen.getByRole("link", {
      name: "View resume PDF in a new tab",
    });
    const download = screen.getByRole("link", {
      name: "Download resume PDF",
    });

    expect(preview).toHaveAttribute(
      "href",
      "/elijah-de-los-santos-resume.pdf",
    );
    expect(preview).toHaveAttribute("target", "_blank");
    expect(preview).toHaveAttribute("rel", "noreferrer");
    expect(download).toHaveAttribute(
      "href",
      "/elijah-de-los-santos-resume.pdf",
    );
    expect(download).toHaveAttribute(
      "download",
      "Elijah-De-Los-Santos-Resume.pdf",
    );
  });

  it("tracks preview and download separately when analytics is available", () => {
    const gtag = vi.fn();
    Object.defineProperty(window, "gtag", {
      configurable: true,
      value: gtag,
    });

    render(<ResumeActions />);
    fireEvent.click(
      screen.getByRole("link", { name: "View resume PDF in a new tab" }),
    );
    fireEvent.click(
      screen.getByRole("link", { name: "Download resume PDF" }),
    );

    expect(gtag).toHaveBeenNthCalledWith(1, "event", "resume_view", {
      event_category: "engagement",
      event_label: "resume",
    });
    expect(gtag).toHaveBeenNthCalledWith(2, "event", "resume_download", {
      event_category: "engagement",
      event_label: "resume",
    });

    Reflect.deleteProperty(window, "gtag");
  });
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```powershell
npm.cmd test -- src/components/ResumeActions.test.tsx
```

Expected: FAIL because `@/components/ResumeActions` does not exist.

- [ ] **Step 3: Implement the action group**

Create `src/components/ResumeActions.tsx`:

```tsx
import { motion, useReducedMotion } from "framer-motion";
import { Download, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResumeActionsProps {
  resumeUrl?: string;
  downloadName?: string;
  size?: "default" | "sm" | "lg";
  wrapperClassName?: string;
  viewClassName?: string;
  downloadClassName?: string;
}

type AnalyticsWindow = Window & {
  gtag?: (
    command: "event",
    eventName: string,
    parameters: Record<string, string>,
  ) => void;
};

function trackResumeAction(eventName: "resume_view" | "resume_download") {
  (window as AnalyticsWindow).gtag?.("event", eventName, {
    event_category: "engagement",
    event_label: "resume",
  });
}

export function ResumeActions({
  resumeUrl = "/elijah-de-los-santos-resume.pdf",
  downloadName = "Elijah-De-Los-Santos-Resume.pdf",
  size = "default",
  wrapperClassName,
  viewClassName,
  downloadClassName,
}: ResumeActionsProps) {
  const reduceMotion = useReducedMotion();
  const hover = reduceMotion ? undefined : { y: -2 };
  const tap = reduceMotion ? undefined : { scale: 0.98 };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", wrapperClassName)}>
      <motion.div whileHover={hover} whileTap={tap}>
        <Button asChild variant="outline" size={size} className={viewClassName}>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="View resume PDF in a new tab"
            onClick={() => trackResumeAction("resume_view")}
          >
            <FileText aria-hidden="true" />
            View Resume
            <ExternalLink aria-hidden="true" />
          </a>
        </Button>
      </motion.div>

      <motion.div whileHover={hover} whileTap={tap}>
        <Button asChild variant="ghost" size={size} className={downloadClassName}>
          <a
            href={resumeUrl}
            download={downloadName}
            aria-label="Download resume PDF"
            onClick={() => trackResumeAction("resume_download")}
          >
            <Download aria-hidden="true" />
            Download PDF
          </a>
        </Button>
      </motion.div>
    </div>
  );
}
```

Delete `src/components/ResumeDownloadButton.tsx`. In `src/pages/HomePage.tsx`, replace the old import with:

```tsx
import { ResumeActions } from "@/components/ResumeActions";
```

Replace both legacy `<ResumeDownloadButton ... />` calls with:

```tsx
<ResumeActions
  size="lg"
  viewClassName="rounded-full px-8"
  downloadClassName="rounded-full px-5"
/>
```

- [ ] **Step 4: Run the focused test and verify it passes**

Run:

```powershell
npm.cmd test -- src/components/ResumeActions.test.tsx
```

Expected: PASS with 2 tests.

- [ ] **Step 5: Commit the component**

```powershell
git add -- src/components/ResumeActions.tsx src/components/ResumeActions.test.tsx src/components/ResumeDownloadButton.tsx src/pages/HomePage.tsx
git commit -m "feat: add accessible resume actions"
```

### Task 2: Publish the Resume and Integrate the Active Homepage

**Files:**
- Modify: `src/lib/site.test.ts`
- Modify: `src/components/UniqueHero.tsx`
- Modify: `src/pages/UniqueHomePage.tsx`
- Create: `public/elijah-de-los-santos-resume.pdf`

- [ ] **Step 1: Add failing placement and asset assertions**

Update the existing Node filesystem import in `src/lib/site.test.ts` to include `statSync`:

```ts
import { existsSync, readFileSync, statSync } from "node:fs";
```

Add this test to the existing site-quality suite:

```ts
it("publishes resume actions in both active homepage CTA areas", () => {
  const hero = readFileSync(resolve("src/components/UniqueHero.tsx"), "utf8");
  const home = readFileSync(resolve("src/pages/UniqueHomePage.tsx"), "utf8");
  const resumePath = resolve("public/elijah-de-los-santos-resume.pdf");

  expect(hero).toContain("<ResumeActions");
  expect(home).toContain("<ResumeActions");
  expect(existsSync(resumePath)).toBe(true);
  expect(statSync(resumePath).size).toBeGreaterThan(50_000);
});
```

- [ ] **Step 2: Run the site test and verify it fails**

Run:

```powershell
npm.cmd test -- src/lib/site.test.ts
```

Expected: FAIL because neither active page contains `ResumeActions` and the public PDF is absent.

- [ ] **Step 3: Publish the verified PDF**

Run:

```powershell
Copy-Item -LiteralPath "output/pdf/Elijah_De_Los_Santos_Resume.pdf" -Destination "public/elijah-de-los-santos-resume.pdf"
```

Verify both files have the same SHA-256 hash:

```powershell
Get-FileHash -Algorithm SHA256 "output/pdf/Elijah_De_Los_Santos_Resume.pdf", "public/elijah-de-los-santos-resume.pdf"
```

Expected: both rows print the same hash.

- [ ] **Step 4: Add the action group to the active hero**

In `src/components/UniqueHero.tsx`, add:

```tsx
import { ResumeActions } from "@/components/ResumeActions";
```

Keep the existing project and contact buttons, then add this inside the hero CTA container:

```tsx
<ResumeActions
  size="lg"
  wrapperClassName="w-full sm:w-auto"
  viewClassName="rounded-full px-6"
  downloadClassName="rounded-full px-4"
/>
```

Change the CTA container to `flex flex-wrap gap-4 pt-4` so the grouped actions wrap naturally without forcing full-width controls on small screens.

- [ ] **Step 5: Add the action group to the closing CTA**

In `src/pages/UniqueHomePage.tsx`, add:

```tsx
import { ResumeActions } from "@/components/ResumeActions";
```

After the existing contact and project buttons, add:

```tsx
<ResumeActions
  size="lg"
  wrapperClassName="justify-center"
  viewClassName="rounded-full px-6"
  downloadClassName="rounded-full px-4"
/>
```

- [ ] **Step 6: Run the focused tests and verify they pass**

Run:

```powershell
npm.cmd test -- src/components/ResumeActions.test.tsx src/lib/site.test.ts
```

Expected: PASS for both test files.

- [ ] **Step 7: Commit the integration**

```powershell
git add -- public/elijah-de-los-santos-resume.pdf src/components/UniqueHero.tsx src/pages/UniqueHomePage.tsx src/lib/site.test.ts
git commit -m "feat: publish resume across portfolio CTAs"
```

### Task 3: Full Verification and Browser Review

**Files:**
- Verify only; modify the smallest relevant file if a check reveals a defect.

- [ ] **Step 1: Run the full automated verification suite**

Run:

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run build
git diff --check
```

Expected: all tests pass, ESLint reports no errors, TypeScript/Vite completes a production build, and `git diff --check` prints no output.

- [ ] **Step 2: Confirm the production asset**

Run:

```powershell
Get-Item "dist/elijah-de-los-santos-resume.pdf" | Select-Object FullName, Length
```

Expected: the file exists and is larger than 50,000 bytes.

- [ ] **Step 3: Review the homepage in a browser**

Start the local server:

```powershell
npm.cmd run dev -- --host 127.0.0.1
```

At desktop and mobile widths, verify:

- The hero and closing CTA each show `View Resume` and `Download PDF`.
- Primary project/contact actions remain visually dominant.
- The resume group wraps without horizontal overflow.
- Keyboard focus is visible on both links.
- Preview opens `/elijah-de-los-santos-resume.pdf` in a new tab.
- Download uses `Elijah-De-Los-Santos-Resume.pdf` as its filename.
- No console errors appear.

- [ ] **Step 4: Verify repository scope**

Run:

```powershell
git status --short
git log -3 --oneline
```

Expected: only intentionally retained generated-output files are untracked; the implementation commits are present on `main`.
