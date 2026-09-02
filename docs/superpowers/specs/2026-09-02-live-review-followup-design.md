# Live Portfolio Review Follow-up Design

## Objective

Resolve the remaining usability, navigation, experience-parity, certification-copy, and skills-positioning issues found during the September 2026 live portfolio review while preserving the established editorial visual system.

## Confirmed Scope

- Reset the viewport to the top whenever the React Router pathname changes.
- Add Certifications to the desktop and mobile primary navigation.
- Add a keyboard shortcut for Certifications and keep the shortcut reference synchronized with the implemented keys.
- Add the 2025 DICT Region 11 Software Development Internship and 2025 Ateneo SAMAHAN Project Manager role to the Experience page.
- Preserve the resume's date precision: show `2025 · 3 months` for DICT and `2025` for SAMAHAN rather than inventing start or end months.
- Remove the repeated `Credential details available on request.` message from every certification card.
- Do not add credential links, IDs, scans, or verification claims because the user explicitly deferred them.
- Replace the certification-card placeholder with one honest page-level note explaining that public verification links are not currently displayed.
- Align the About page's lead technology language with demonstrated portfolio work: Next.js, React, TypeScript, Supabase/PostgreSQL, Shopify, Flutter, Playwright, and n8n.

## Architecture and Components

### Route Scroll Reset

Create a focused `ScrollToTop` component that reads `location.pathname` and calls `window.scrollTo(0, 0)` in an effect after pathname changes. Render it once inside `UniquePublicLayout`, where it applies to every public route and project-detail transition. Hash-only changes remain untouched because they support case-study table-of-contents links.

### Navigation

Extend the existing shared `navigation` collection in `UniqueNavigation` with Certifications so desktop and mobile surfaces remain synchronized. Use `r` as the shortcut key for ceRtifications because `c` is already assigned to Contact. Update `KeyboardShortcutsModal` to reflect the actual navigation and theme shortcuts, including About, Automation, Certifications, and the existing `b` theme key.

### Experience Data

Extend `Experience` with optional `date_label` and `duration_label` fields. Existing entries continue to use parsed dates and calculated durations. Resume entries whose precise months are unavailable use explicit display labels and retain neutral ISO dates only for data compatibility and stable ordering; those fallback dates are never presented to visitors.

Add DICT as a technical internship entry with the two resume-backed achievements. Add SAMAHAN as a project-management entry focused on cross-functional planning, delivery coordination, and stakeholder communication. Move the `Earlier experience` divider below the DICT entry so the client role and technical internship lead the page.

### Certification Presentation

Certification cards continue to show title, issuer, and completion month. Cards without a public credential URL end cleanly after their metadata. The closing section carries one concise note that supporting documentation is not displayed publicly and can be discussed during the hiring process. No verification badge or proof claim is introduced.

### About Positioning

Keep the page layout and motion unchanged. Rewrite the Full-Stack Applications description around shipped Next.js/React/TypeScript products backed by Supabase/PostgreSQL and commerce or mobile delivery where appropriate. Reorganize skill badges into frontend/mobile, backend/data, platforms/delivery, and product/process groups that prioritize technologies evidenced by the project case studies and resume.

## Testing Strategy

Use test-driven development for each behavior:

- A route-scroll regression test must fail before `ScrollToTop` is implemented and then prove pathname changes reset both axes.
- Navigation tests must prove Certifications appears in desktop/mobile navigation data and that shortcut labels match their handlers.
- Experience data tests must prove DICT and SAMAHAN are present with resume-accurate public date labels and required achievements.
- Certification tests must prove cards no longer repeat the deferred placeholder or imply verification links.
- About content tests must prove evidence-aligned technologies are present and unsupported lead-stack wording is absent.

After the focused tests pass, run the full test suite, lint, production build, and `git diff --check`. Then use browser automation to inspect every primary page plus representative project routes at desktop and mobile widths, with special attention to scroll reset, navigation discovery, overflow, broken assets, semantic headings, and runtime errors.

## Acceptance Criteria

- Every internal pathname transition lands at the top of the destination page.
- Certifications is directly reachable from desktop and mobile primary navigation.
- Keyboard shortcut help matches the implemented shortcuts.
- Experience shows Independent Client Work, DICT Region 11, and Ateneo SAMAHAN in a credible order with no invented public dates.
- Certification cards do not repeat placeholder text or make unsupported verification claims.
- About emphasizes the technologies demonstrated by the strongest live and source-available projects.
- Existing project, contact, automation, resume, theme, and responsive behavior remains intact.
- Focused tests, full tests, lint, build, diff checks, and browser QA pass before completion.
