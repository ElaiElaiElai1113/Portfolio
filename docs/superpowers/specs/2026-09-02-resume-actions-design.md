# Resume Preview and Download Actions

## Objective

Add the verified, current resume PDF to the portfolio and make it available through two explicit actions: quick browser preview and direct PDF download. Preserve the existing dark editorial design and keep project exploration and contact as the page's primary calls to action.

## Confirmed Asset

- Source file: `output/pdf/Elijah_De_Los_Santos_Resume.pdf`
- Public site path: `/elijah-de-los-santos-resume.pdf`
- The source PDF remains preserved in `output/pdf/`.

## Interaction Design

Replace the ambiguous single `Download Resume` control with a compact resume action group:

- **View Resume** opens the public PDF in a new browser tab.
- **Download PDF** uses the browser's native download behavior.
- Both actions appear in the two existing homepage call-to-action areas: the hero and the closing collaboration section.
- `View My Work` remains the primary hero action.
- `Start a Conversation` remains the primary closing action.
- Resume actions use secondary visual treatment so they remain discoverable without competing with the page's main conversion paths.

## Component Design

Refactor the existing resume component into a reusable action group rather than duplicating link markup in the homepage.

The component will:

- Default to `/elijah-de-los-santos-resume.pdf`.
- Render semantic anchor links through the existing button component.
- Use `target="_blank"` and `rel="noreferrer"` for preview.
- Use the HTML `download` attribute for direct download.
- Expose existing size and styling hooks needed by both homepage placements.
- Keep the current restrained motion treatment and preserve reduced-motion behavior provided by the site's motion system.
- Use distinct icons and visible labels so the two actions are not ambiguous.

## Analytics

Keep analytics optional and non-blocking. When `gtag` is available:

- Preview emits `resume_view`.
- Download emits `resume_download`.
- Both events use the `engagement` category and `resume` label.

The links must still work normally when analytics is unavailable or blocked.

## Responsive and Accessibility Behavior

- The resume action group wraps cleanly on narrow screens.
- Both controls remain keyboard accessible with visible focus styling inherited from the shared button component.
- Link text describes the action without relying on icons.
- Preview uses a new tab only where explicitly communicated by the link's accessible label.
- The PDF has a descriptive filename when downloaded.

## Testing Strategy

- Add component tests that verify the preview URL, new-tab attributes, download attribute, and separate analytics events.
- Update any existing tests or imports affected by the component refactor.
- Run the complete test suite, lint, TypeScript/Vite production build, and `git diff --check`.
- Use browser automation at desktop and mobile widths to verify both homepage placements, layout wrapping, preview behavior, download behavior, console errors, and horizontal overflow.
- Confirm the deployed asset is included in the production build output.

## Acceptance Criteria

- The latest resume is available at `/elijah-de-los-santos-resume.pdf`.
- Both homepage CTA areas offer explicit preview and direct-download actions.
- Preview opens the PDF in a new tab.
- Download produces the descriptive PDF filename.
- Primary portfolio and contact actions retain stronger visual hierarchy.
- Resume actions are accessible by keyboard and remain readable without icons.
- Tests, lint, production build, diff checks, and responsive browser verification pass.
