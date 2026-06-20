# Palakata Alim Madrasah — Website

Bilingual (English / বাংলা) website + school portal for Palakata Alim Madrasah.
Built per `../palakata-madrasah-spec.md`.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 ·
shadcn/ui · Lucide icons · Prisma 6 + PostgreSQL (Neon) · Auth.js v5 · Cloudflare R2 · sharp.

All dependency versions are pinned exactly (no `^`/`~`) per the 10-year stability rule.

---

## Quick start (local)

```bash
npm install
cp .env.example .env.local      # then fill in the values (see below)
npx prisma generate
npx prisma db push              # needs a real DATABASE_URL
npm run seed:principal          # creates the first PRINCIPAL login
npm run dev                     # http://localhost:3000
```

Production build / run:

```bash
npm run build
npm start
```

> Already verified: `npm run build` compiles all 22 routes, and the server boots
> and serves every page. The site renders fully **without** a database (using
> placeholder content); the database is only needed for login, results and the portal.

---

## What YOU must provide (the `[UPDATE]` items)

The site runs now, but these need real values before going live:

### 1. Environment variables → `.env.local`
| Var | Where to get it |
|---|---|
| `DATABASE_URL` | Neon dashboard → Connection string |
| `AUTH_SECRET` | `npx auth secret` (a dev one is already generated in `.env.local`) |
| `AUTH_URL` | `http://localhost:3000` locally · `https://palakata.edu.bd` in prod |
| `R2_ACCOUNT_ID` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` | Cloudflare R2 → API token |
| `R2_BUCKET_NAME` / `R2_PUBLIC_URL` | Your R2 bucket name + public URL |

### 2. Institution content
- **`lib/site.ts`** — name, EIIN, madrasah code, phone, email, address, principal & founder
  names, established year, stats (students/teachers/pass-rate). Every `[UPDATE]` lives here
  or in the page files.
- **`lib/sample-data.ts`** — placeholder notices/events/achievements/hero captions (replace
  with DB-backed data once the admin panel CRUD is built).
- **Page copy** — search the repo for `[UPDATE` to find history, mission, fees, syllabus etc.
- **Images** — hero slides, gallery and founder/principal photos are gradient placeholders;
  upload real (compressed) images via R2 / the upload route.

### 3. First login
`npm run seed:principal` creates `principal / Change@123` (must be changed on first login).
Edit the username/name in `scripts/create-principal.ts` first.

---

## Project notes & decisions

- **`next-auth` is `5.0.0-beta.31`**, not `5.0.0` — Auth.js v5 has not shipped a stable
  `5.0.0` to npm yet; the beta has the exact v5 API the spec uses.
- **`proxy.ts` instead of `middleware.ts`** — Next 16 renamed middleware → proxy (nodejs
  runtime). Auth route-guarding lives there. It uses an edge-safe split config
  (`lib/auth.config.ts`) so Prisma/bcrypt stay out of the proxy bundle.
- **Async request APIs** — Next 16 requires `await`ing `params`/`searchParams`/`cookies`.
- **Fonts** load via `<link>` (Google Fonts) to avoid build-time fetching; families:
  Cinzel (EN display), Hind Siliguri (BN), Noto Naskh Arabic (Arabic), Inter (EN body).
- **Language** is client-side (`components/i18n/language-provider.tsx`), stored in
  `localStorage` (`lang`), default **bn**. Use `useLang()` → `{ t, num, lang, setLang }`
  or the `<T en bn />` component. A no-flash script in `app/layout.tsx` sets it before paint.
- **Styling** is Tailwind + shadcn/ui only; brand tokens live in `app/globals.css`
  (`@theme`). Icons are Lucide only (stroke 1.5).

### Auth: Student vs User (resolved)
The spec was ambiguous: `lib/auth.ts` authenticated against the **`User`** table by `username`,
but §13 says students log in with **roll number** (the `Student` table). `authorize()` now checks
**both**: first `User` (staff/admin by username), then falls back to `Student` (by `rollNumber`),
returning `role: "STUDENT"`. So admins create students in the Students module and those students
can log in immediately with their roll number + the password the admin set.

---

## Status — what's done vs. still to build

**Done & working**
- Full public site: home (3D scroll Quran animation, hero slider, welcome, sidebar cards,
  info cards, stats band), About, Academic, Admission, Administration, Facilities,
  Co-Curriculum, Gallery, Departments, Contact (form), Alumni, Notice, Events, Result search.
- Bilingual EN/BN toggle everywhere · compact, responsive layouts (mobile → desktop).
- Auth.js v5 login (`/sign-in`) for staff **and students**, forced password change
  (`/change-password`), route protection via `proxy.ts`.
- Role-aware dashboard shell with real routes + active state; admin overview; student portal.
- **Students CRUD** (`/dashboard/students`) — add class-wise, filter by class, enable/disable,
  reset password — DB-backed server actions (`lib/actions/students.ts`).
- **Notices CRUD** (`/dashboard/notices`) — create / publish / pin / delete — server actions.
- Public **Notice & Events** pages read from the DB (`lib/queries.ts`) with sample-data fallback.
- Grade/GPA helper (`lib/grade.ts`), class/term/fee constants (`lib/constants.ts`).
- Prisma schema (all models), R2 upload + sharp compression, public result API.

**Stubbed / next steps** (route + schema + helpers exist; pages show a "next module" card)
- `/dashboard/results` — bulk result entry (auto grade/GPA via `lib/grade.ts`).
- `/dashboard/finance` — add fees, mark paid/due, history.
- `/dashboard/events`, `/gallery`, `/teachers` — CRUD (same pattern as Notices/Students).
- `/dashboard/users` — staff accounts with one-time generated passwords + role rules.
- `/dashboard/settings` — edit institution details (currently in `lib/site.ts`).
- Print result-card & testimonial templates (print CSS hooks are in place).

---

## Deploy (Vercel)
Import the repo, set **Root Directory = `palakata-madrasah`**, add all `.env.local` vars in
Project → Settings → Environment Variables, deploy. Point `palakata.edu.bd` DNS at Vercel via
Cloudflare. See spec §16 for the full walkthrough.
