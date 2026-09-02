# Hiring-Readiness Portfolio Polish

## Objective

Turn the current portfolio into an application-ready representation of Elijah De Los Santos as an independent full-stack developer with real client delivery experience. Preserve the established dark editorial visual system while fixing trust, contact, spacing, SEO, narrative, and technical-quality issues found during the hiring-manager and software-engineer review.

## Confirmed Facts

- Production URL: `https://portfolio-inky-eight-48.vercel.app`
- Contact email: `elaidelossantos05@gmail.com`
- Degree: BS Information Systems, Ateneo de Davao University
- Graduation: June 2026
- Paid client development began: March 2026
- Elijah was the sole full-stack developer for the majority of the featured client work.

## Positioning

The portfolio will lead with commercial product ownership instead of student status. The primary professional role will be:

**Independent Full-Stack Developer — March 2026 to Present**

The role will explain that Elijah delivers production client platforms across automotive, rewards, commerce, and B2B systems and owns architecture, frontend, backend, data, integrations, deployment, and maintenance for most engagements.

Graduation will be presented as a completed milestone: Elijah graduated in June 2026 while working and transitioned directly into continued client delivery. Earlier virtual-assistant and university-organization work will remain visible in a compact Earlier Experience section, supporting work ethic and communication without overshadowing development experience.

## Projects Page Layout

The Projects page will use the same centered content frame as the navigation and footer:

- `container mx-auto px-6` as the primary page wrapper
- Responsive gutters preserved at mobile, tablet, desktop, and ultrawide sizes
- Three cards per row on large screens within the site's existing container maximum
- Title, description, search, filters, card grid, empty state, and CTA aligned to one shared frame
- No full-bleed card grid or edge-touching headings

The existing card design, project ordering, search, filtering, delivery-state labels, and case-study actions will remain.

## Contact Experience

All contact surfaces will use `elaidelossantos05@gmail.com`. GitHub and LinkedIn will use the already verified profiles. Placeholder social links will be removed; an unverified X/Twitter profile will not be shown.

Because the site is hosted on Vercel and no email-service credentials are available, the contact form will not pretend to send through Netlify. It will validate the message, then open a prefilled email draft addressed to Elijah. The interface will clearly label this behavior and retain a direct email link as a fallback. It must never display a false delivery-success message.

## SEO and Sharing

The canonical base URL, Open Graph URL, sitemap, and robots declaration will use the confirmed production URL. Primary routes and project-detail routes will have contextual titles and descriptions instead of sharing one generic title.

## Credibility Improvements

- Replace student-oriented wording with accurate graduate and client-delivery language.
- Remove or qualify unsupported automation claims such as perfect accuracy and unverified aggregate savings.
- Present automation demonstrations as representative workflow examples unless a metric is explicitly evidenced.
- Keep case-study scope and technical decisions, while avoiding invented business outcomes.
- Add a concise proof-oriented callout connecting professional experience to the featured client products.
- Do not add a resume download until a real resume PDF is available.

## Technical Polish

- Fix duplicate React keys in rendered case-study sections.
- Preserve semantic headings, descriptive image alternatives, keyboard-accessible navigation, and visible focus states.
- Respect reduced-motion preferences for newly touched motion behavior.
- Introduce route-level lazy loading where it reduces the oversized initial production bundle without making navigation feel delayed.
- Refresh the README so it accurately describes the current data-driven portfolio, commands, testing, deployment, and production URL.

## Testing Strategy

Behavioral changes will follow test-driven development:

- Add failing tests for canonical URL generation and route-specific metadata helpers.
- Add failing tests for contact email-draft generation and encoding.
- Add failing tests for unique case-study section identifiers.
- Extend project/content quality gates to verify the confirmed experience dates, production URL, and absence of placeholder profiles.

After implementation, run the complete unit suite, lint, production build, dependency audit, and `git diff --check`. Use Playwright to verify the deployed-layout equivalent locally at desktop and mobile sizes, including Projects gutters, search/filter behavior, mobile navigation, contact behavior without submitting external data, route titles, console errors, broken images, and horizontal overflow.

## Acceptance Criteria

- Projects content is visibly centered with comfortable gutters at wide desktop and mobile widths.
- Experience leads with independent full-stack client work from March 2026 to Present.
- Graduation is accurately shown as June 2026 and no active page says Elijah is still pursuing the degree.
- Every contact surface uses the confirmed Gmail address and verified social profiles.
- The contact workflow cannot falsely claim a message was delivered.
- Canonical, Open Graph, sitemap, and robots URLs use the confirmed Vercel production URL.
- Primary pages and project details expose contextual document titles and descriptions.
- Unsupported automation metrics are removed or clearly presented as illustrative.
- No duplicate React-key warning appears when opening a case study.
- Tests, lint, production build, security audit, responsive Playwright checks, and repository cleanliness pass before completion.
