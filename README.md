# Elijah De Los Santos — Full-Stack Developer Portfolio

A case-study-led portfolio for Elijah De Los Santos, an independent full-stack developer building production web products, client platforms, business systems, and automation workflows.

**Live site:** [portfolio-inky-eight-48.vercel.app](https://portfolio-inky-eight-48.vercel.app)

**Contact:** [elaidelossantos05@gmail.com](mailto:elaidelossantos05@gmail.com)

## What the portfolio includes

- Searchable and filterable project archive with responsive project cards
- Detailed Markdown case studies with responsibilities, decisions, delivery state, media, and technology context
- Production work for EasyDrive, RewardMe, Synergize, Innerfire Co., and Medellin Rewards / Loyality
- Earlier mobile, AI, travel, and commerce projects retained as supporting work
- Independent client experience from March 2026 and BS Information Systems graduation in June 2026
- Interactive n8n workflow demonstration, clearly identified as illustrative
- Responsive dark/light interface, keyboard-accessible navigation, and contextual SEO metadata
- Direct email-draft contact flow with no simulated form-delivery claims
- Route-level code splitting so visitors download page code as they need it

## Stack

- React 19, TypeScript, Vite, and React Router
- Tailwind CSS, Radix UI / shadcn-style components, Framer Motion, and Lucide icons
- TanStack Query over local typed JSON content
- React Helmet Async for canonical, Open Graph, and social metadata
- Vitest and Testing Library for data, rendering, identity, and content-integrity tests

Portfolio content lives in `src/data`. Project screenshots and supporting media live in `public/assets`.

## Run locally

Requires a current Node.js LTS release and npm.

```bash
npm install
npm run dev
```

Vite serves the site at `http://localhost:5173` by default.

## Quality checks

```bash
npm test
npm run lint
npm run build
```

The production build is emitted to `dist`.

## Content structure

```text
src/
├── components/        Reusable UI, project, SEO, and automation components
├── data/              Projects, experience, skills, and certifications
├── layouts/           Shared public-site layout
├── lib/               Site identity, case-study parsing, and presentation helpers
├── pages/             Route-level portfolio pages
├── services/          Typed access to local portfolio data
└── types/             Shared TypeScript models

public/assets/         Project screenshots and static imagery
```

To add or revise a portfolio item, update `src/data/projects.json`, place optimized media in `public/assets/projects`, and run the full quality checks before deployment.

## Deployment

The site is configured as a client-rendered Vite application and deployed on Vercel. Pushes to the connected production branch trigger the hosting workflow; verify the canonical URL, project detail routes, and responsive layouts after each production deployment.

## Author

Elijah De Los Santos — independent full-stack developer based in the Philippines.

- [GitHub](https://github.com/ElaiElaiElai1113)
- [LinkedIn](https://linkedin.com/in/elijahndelosantos)
