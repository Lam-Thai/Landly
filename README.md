# Landly

Landly is a modern SaaS landing experience built with [Next.js](https://nextjs.org) App Router — polished motion, premium UI sections (Hero, Features), and auth-ready routes for growth into a full product.

## Stack

| Layer | Technology |
| ----- | ---------- |
| Framework | **Next.js 15** (App Router) |
| UI | **React 19**, **Tailwind CSS 4**, **Framer Motion** |
| Fonts | **Geist** (`next/font`) |
| Auth | **Clerk** (`@clerk/nextjs`), `middleware.ts` for protected routes |
| Database | **PostgreSQL** + **Prisma** |
| PDF | **@react-pdf/renderer** (`/api/pdf`) |
| Webhooks | **Svix** (Clerk user sync → DB) |
| E2E | **Playwright** (`@playwright/test`, Chromium) |
| Git hooks | **Husky** (`pre-push` runs E2E) |

## Prerequisites

- **Node.js 20** (matches CI)

## Getting started

```bash
npm install
```

Create a `.env.local` with the variables your features need (examples below). All `.env*` files are ignored by Git.

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start Next.js in development mode |
| `npm run build` | Production build |
| `npm run start` | Start production server (after `build`) |
| `npm run lint` | ESLint (`next lint`) |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push schema to the database (`prisma db push`) |
| `npm run db:studio` | Open Prisma Studio |
| `npm run test:e2e` | Playwright tests (starts dev server via config) |
| `npm run test:e2e:ui` | Playwright UI mode |
| `npm run test:e2e:debug` | Playwright debug mode |

Playwright installs only Chromium for this project:

```bash
npx playwright install chromium
```

## Project layout

- `app/` — App Router pages and API routes
- `components/` — UI and sections (`Hero`, `Features`, `Navbar`, etc.)
- `lib/` — Shared utilities (`auth`, `prisma`, `pdf`, animations)
- `prisma/` — Schema and migrations workflow (`schema.prisma`)
- `e2e/` — Playwright end-to-end specs
- `.husky/` — Git hooks

## Authentication

- **Public**: `/`, `/sign-in`, `/sign-up`, `/api/webhooks/*`
- **Protected**: `/dashboard/*` (enforced in `middleware.ts`)

Sign-in and sign-up use Clerk’s `<SignIn />` and `<SignUp />` components.

During Playwright runs, the app can use `PLAYWRIGHT_E2E` / `NEXT_PUBLIC_PLAYWRIGHT_E2E` (set in `playwright.config.ts`) so tests stay fast and avoid real external auth calls. Normal `npm run dev` does not set these.

## API routes

| Route | Notes |
| ----- | ----- |
| `POST /api/pdf` | Authenticated PDF generation |
| `POST /api/ai` | Authenticated stub (extend for AI) |
| `POST /api/upload` | Authenticated stub (extend for uploads) |
| `POST /api/webhooks/clerk` | Clerk webhook (requires `CLERK_WEBHOOK_SECRET`, validates with Svix) |

## Environment variables

Configure these in `.env.local` as you enable features:

- **Next / Clerk**: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, and Clerk URL settings as required by [Clerk + Next.js](https://clerk.com/docs/quickstarts/nextjs).
- **Webhooks**: `CLERK_WEBHOOK_SECRET` for `/api/webhooks/clerk`.
- **Database**: `DATABASE_URL` for PostgreSQL (Prisma).

Never commit secrets. See `.gitignore` for ignored patterns.

## Database (Prisma)

Schema lives in `prisma/schema.prisma` (PostgreSQL `User` model keyed by Clerk). After configuring `DATABASE_URL`:

```bash
npm run db:generate
npm run db:push
```

## Testing & CI

- **Local / pre-push**: `npm run test:e2e` (Husky runs this on `git push` unless you skip hooks).
- **CI**: [.github/workflows/e2e.yml](.github/workflows/e2e.yml) runs on pull requests targeting `main` (Node 20, `npm ci`, Playwright Chromium, `npm run test:e2e`).

## Deploy

The app can be deployed on [Vercel](https://vercel.com) or any Next.js-compatible host; set production environment variables to match Clerk, database, and webhooks.

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Playwright Documentation](https://playwright.dev/docs/intro)
