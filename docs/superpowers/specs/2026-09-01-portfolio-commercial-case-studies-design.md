# Commercial Case Studies Portfolio Design

**Date:** 2026-09-01

## Objective

Reposition Elijah De Los Santos's portfolio for full-stack engineering roles by leading with shipped commercial systems while preserving, updating, and verifying every existing project. The portfolio should show credible ownership of business problems, application architecture, integrations, and delivery rather than reading as a list of technologies or demos.

## Audience and Positioning

The primary audience is hiring managers and engineering teams evaluating a full-stack or product engineer. Elijah will be described as the **Sole Full-Stack Developer** when the available evidence supports that claim. Project narratives will emphasize end-to-end product delivery, practical business workflows, data and security decisions, integrations, and production readiness.

Claims must be grounded in repository documentation, deployed behavior, or user-confirmed responsibility. The portfolio will not invent usage numbers, revenue, conversion lifts, team size, or other metrics. For sites without source access, the case study will distinguish visible product behavior from implementation details that cannot be verified.

## Portfolio Information Architecture

### Homepage

The homepage will feature six projects in this order:

1. EasyDrive Ecosystem
2. RewardMe
3. Synergize Business Group
4. Innerfire Co.
5. Medellin Rewards
6. Pokebuddy

This mix leads with commercial work and retains one technically distinctive AI project. The section heading and supporting copy will position the work as shipped products and business systems.

### Projects Archive

The projects page will retain every old and new project. It will support clear, business-oriented filters:

- Business Systems
- Commerce
- SaaS
- AI
- Mobile
- Automation

Technology remains visible on cards and detail pages but will no longer drive an overwhelming quick-filter list. Every card will communicate the project's real state with one of these labels:

- Live Product
- Demo
- Source Available
- Client Work
- Archived Build

Projects without an available deployment will remain in the archive and link to their case study. They will not display a dead Live Demo action.

## New Commercial Case Studies

### EasyDrive Ecosystem

EasyDrive Canada and EasyDrive Finance will be presented as one connected case study rather than competing entries.

The narrative will cover:

- A public vehicle marketplace and customer purchase journey.
- A financing acquisition funnel with a multi-step application.
- Server-side validation and lead qualification.
- Confirmed Google Sheets delivery and optional downstream integrations.
- Meta browser and server-side conversion tracking.
- Dealer operations including inventory, leads, appointments, customer records, marketplace assistance, e-signature, reporting, billing, and fleet finance.
- Next.js, React, TypeScript, TanStack Start, Supabase, Stripe, Zod, and Playwright where supported by repository evidence.

The primary live link will be `https://easydrivecanada.com/`, with `https://easydrivefinance.ca/` represented as a second product surface in the gallery and case study.

### RewardMe

RewardMe will be presented as a two-sided local rewards product for members and participating businesses. The case study will cover only behavior verified on `https://rewardme-prod.vercel.app/`:

- Member acquisition and membership options.
- Published partner offers and reward-rate communication.
- Member QR use and verified-purchase messaging.
- Reward balance and activity concepts.
- A separate business acquisition journey with commission and credit participation models.
- Multilingual English, Tagalog, and Spanish interfaces.
- Clear relationship boundaries with the separate Synergize product.

The entry will not include a source link or claim an unverified framework, database, or backend architecture.

### Synergize Business Group

Synergize will be presented as an invite-only B2B credit network that helps businesses turn idle capacity into spending power. The case study will cover:

- Public education, industry discovery, invitation, member, and owner/admin surfaces.
- A credit ledger and network economics calculator.
- Role-scoped Supabase authentication for owner and member access.
- Atomic and retry-safe credit adjustments.
- Serialized purchase-request transitions and idempotent membership approval.
- React, Supabase, serverless APIs, SQL migrations, and browser/database verification.

The public live link is `https://synergize-business-group.vercel.app/`. The repository will be linked only if it is appropriate for public sharing; otherwise the case study will use the Client Work state.

### Innerfire Co.

Innerfire Co. will be presented as a premium Shopify commerce and brand-education experience, based on the deployed site at `https://innerfireco.com.au/`:

- Product discovery and catalog navigation.
- Product, starter-kit, bundle, subscription, and founders-circle merchandising.
- Account and cart entry points.
- Research and sourcing education.
- Brand storytelling and conversion-focused landing-page structure.
- Shopify storefront behavior visible on the deployed site.

The entry will not include a source link or claim inaccessible theme, integration, or backend implementation details.

### Medellin Rewards

Medellin Rewards will be presented as a member, business, and admin rewards platform with web, PWA, and native-wrapper delivery. The case study will cover:

- Member onboarding and current-offer discovery.
- Business participation and staff QR transaction flows.
- Reward earning, redemption, adjustments, and credit consumption backed by Supabase RPCs.
- Admin operations, referral flows, transaction guidance, and bilingual Spanish/English presentation.
- React, TypeScript, Supabase, TanStack Query, Zod, QR tooling, PWA, and Capacitor.

The public live link is `https://www.medellinrewards.com/`. A source link will be included only if the repository is appropriate for public sharing.

## Existing Project Refresh

The existing projects remain in the archive:

- IssuePilot
- SEBTravels
- Pokebuddy
- AI Tweet Generator
- DailyMacros
- GoDavao - Rideshare Platform

Each existing entry will receive a content and reliability audit. Copy will be tightened around the problem, role, engineering contribution, and verifiable result. IssuePilot may be published from its current hidden state only if the local application and supporting evidence validate the existing claims.

## Case Study Page Content

Every detail page will use a consistent hiring-focused narrative:

1. Product summary and audience.
2. Project state and year.
3. Role and ownership.
4. Business problem and constraints.
5. Solution and system shape.
6. Key user and operational workflows.
7. Architecture, integrations, security, and reliability decisions.
8. Challenges and trade-offs.
9. Outcome without invented metrics.
10. Technology stack, live/source actions when valid, and screenshot gallery.

The layout will preserve the portfolio's dark editorial visual identity. Project screenshots will become stronger visual evidence, with intentional aspect-ratio crops on cards and full views in the gallery.

## Data Model

The project content model will add:

- `category`: one of the approved business-oriented filters.
- `year`: display year.
- `client_work`: whether the item is client work.
- `project_state`: `live-product`, `demo`, `source-available`, `client-work`, or `archived-build`.
- `media`: locally stored screenshots with type, URL, and descriptive caption.

Featured ordering remains explicit. Published state continues to control archive visibility. External actions are rendered only when their URLs are present and valid for the project's state.

## Media Strategy

Screenshots captured from deployed sites will be stored as optimized local assets so the portfolio does not depend on third-party image hosting. At minimum, the following evidence will be included:

- EasyDrive Canada homepage and EasyDrive Finance funnel.
- RewardMe member homepage and business page.
- Synergize homepage and a representative member/network surface where publicly accessible.
- Innerfire Co. homepage and brand story or catalog surface.
- Medellin Rewards homepage and a representative rewards/business surface where publicly accessible.

All screenshots require descriptive alternative text and captions. Card images will use portfolio-controlled crops rather than stretching entire full-page screenshots into thumbnails.

## Error Handling and State Accuracy

- Images will have a local fallback so a missing asset does not leave a broken card.
- Live Demo actions will appear only for verified live deployments.
- Source actions will appear only for verified, publicly shareable repositories.
- Unavailable products will retain a View Case Study path and an accurate state label.
- Invalid project slugs will continue to resolve to the existing not-found experience.
- Content will avoid secrets, private operational details, and unsupported implementation claims.

## Repository Update Policy

Before content extraction, clean sibling repositories may be fetched and fast-forwarded when they are behind their configured upstream branch. Repositories with local changes will not be pulled automatically.

EasyDrive Canada currently contains local modifications and untracked files, so its working tree will be preserved. Portfolio work will use its current verified state unless the user later resolves or explicitly authorizes handling those changes.

## Verification

The portfolio update is complete only after all of the following pass:

- Automated project-data validation for unique IDs and slugs, required case-study fields, approved state values, valid HTTPS URLs, and existing local media.
- Component behavior tests proving unavailable deployments do not render Live Demo actions.
- Lint and TypeScript checks.
- Production build.
- Route checks for every published project detail page.
- Desktop and mobile browser review of the homepage, project archive, filters, cards, screenshots, and detail pages.
- Keyboard focus and descriptive image text checks.
- External URL verification for every displayed live and source action.

Failures will be reported accurately. An external deployment that is unavailable will be relabeled or have its action removed rather than being represented as working.

## Out of Scope

- Rebuilding or modifying the underlying client products.
- Deploying or changing production data for any client product.
- Publishing private repositories.
- Inventing commercial metrics or testimonials.
- A full redesign of the portfolio's established visual system.
