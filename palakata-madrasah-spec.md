# Palakata Alim Madrasah — Full Project Specification

> Hand this file to Claude Code and say: **"Build this project according to the spec."**  
> Update any section marked `[UPDATE]` before handing it over.

---

## 1. Project Overview

**Institution name:** Palakata Alim Madrasah  
**Domain:** `palakata.edu.bd` _(register via BTCL — requires EIIN number)_  
**Purpose:** Official website for a Bangladeshi Alim-level madrasah serving 1500+ students  
**Languages:** Bilingual — English and Bengali (toggled by user, saved in localStorage)  
**Target devices:** Desktop, tablet, mobile — compact layout, fully responsive on all screen sizes

---

## 2. Tech Stack

### EXACT VERSIONS — DO NOT UPGRADE WITHOUT DISCUSSION

```json
{
  "next": "16.2.9",
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "typescript": "5.8.3",
  "tailwindcss": "4.1.8",
  "@prisma/client": "6.9.0",
  "prisma": "6.9.0",
  "next-auth": "5.0.0",
  "bcryptjs": "3.0.2",
  "@types/bcryptjs": "2.4.6",
  "lucide-react": "0.511.0",
  "class-variance-authority": "0.7.1",
  "clsx": "2.1.1",
  "tailwind-merge": "3.3.0",
  "tw-animate-css": "1.3.4"
}
```

> **Critical rule:** Use exact versions in `package.json` — no `^` or `~` prefix anywhere.  
> Always commit `package-lock.json`. Never run `npm update`.

### Styling — Tailwind CSS + shadcn/ui only

- **All styling must use Tailwind CSS utility classes exclusively** — no custom CSS files, no CSS modules, no inline `style={}` props (except for dynamic values that Tailwind cannot express, e.g. CSS custom property values)
- **shadcn/ui** is the component library — use its Button, Card, Dialog, Table, Badge, Tabs, Input, Select, Dropdown, Sheet, Tooltip, etc. components wherever applicable. Do not hand-roll UI primitives that shadcn already provides.
- Initialize shadcn with: `npx shadcn@latest init` — choose **New York** style, **CSS variables** for color, Tailwind v4
- Install components as needed: `npx shadcn@latest add button card dialog table badge tabs input select dropdown-menu sheet tooltip`
- The `components/ui/` folder is owned by shadcn — do not manually edit files there; instead extend or wrap them in `components/` sub-folders

### Services (all free tier)

| Service            | Purpose             | Free tier                             |
| ------------------ | ------------------- | ------------------------------------- |
| **Neon**           | PostgreSQL database | 0.5 GB, no 7-day pause                |
| **Cloudflare R2**  | Image/file storage  | 10 GB, zero egress                    |
| **Auth.js v5**     | Authentication      | Open source — free forever, no limits |
| **Vercel**         | Frontend hosting    | 100 GB bandwidth/month                |
| **Cloudflare DNS** | DNS + SSL           | Free                                  |

### Build mode

```js
// next.config.js
const nextConfig = {
  // No static export — Auth.js requires API routes
  // Vercel handles API routes natively, no extra config needed
  images: {
    unoptimized: true,
  },
};
module.exports = nextConfig;
```

> Auth.js v5 requires `/api/auth/[...nextauth]` API routes which are incompatible with `output: 'export'`.  
> Vercel supports Next.js API routes natively — no extra flags or adapters needed. Auth.js works out of the box.

---

## 3. Repository Structure

```
palakata-madrasah/
├── app/
│   ├── layout.tsx              # Root layout with fonts, SessionProvider
│   ├── page.tsx                # Home page
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts    # Auth.js API handler (GET + POST)
│   ├── (public)/               # Public routes (no auth needed)
│   │   ├── about/page.tsx
│   │   ├── academic/page.tsx
│   │   ├── admission/page.tsx
│   │   ├── administration/page.tsx
│   │   ├── facilities/page.tsx
│   │   ├── co-curriculum/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── departments/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── alumni/page.tsx
│   │   ├── notice/page.tsx
│   │   └── result/page.tsx
│   ├── sign-in/page.tsx        # Custom login page
│   └── (admin)/                # Protected admin routes
│       └── dashboard/page.tsx
├── components/
│   ├── layout/
│   │   ├── UtilityBar.tsx      # Top thin bar (contact info + lang toggle)
│   │   ├── Header.tsx          # Dark green header (seal + name + mihrab)
│   │   ├── MenuBar.tsx         # Horizontal nav with dropdowns
│   │   ├── NoticeTicker.tsx    # Scrolling notices + Login button
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── QuranAnimation.tsx  # 3D scroll-triggered Quran opening
│   │   ├── HeroSlider.tsx      # Image carousel with dots
│   │   ├── WelcomeSection.tsx
│   │   ├── SidebarCards.tsx    # Admission + Founder + Links
│   │   ├── InfoCards.tsx       # Notices / Events / Achievements grid
│   │   └── StatsBand.tsx       # 1500+ students, 25 teachers, etc.
│   ├── ui/
│   │   ├── LanguageToggle.tsx
│   │   ├── MadrasahSeal.tsx    # SVG seal component
│   │   └── MihrabDecoration.tsx # SVG mosque decoration
│   └── admin/
│       └── Dashboard.tsx
├── lib/
│   ├── db.ts                   # Prisma client singleton
│   ├── auth.ts                 # Auth.js config (NextAuth + CredentialsProvider)
│   ├── r2.ts                   # Cloudflare R2 upload helper
│   └── i18n.ts                 # Language strings (EN + BN)
├── middleware.ts               # Protects /dashboard and /admin/* routes
├── prisma/
│   └── schema.prisma
├── public/
│   └── images/                 # Static images (optimized, WebP, <200KB each)
├── types/
│   ├── index.ts
│   └── next-auth.d.ts          # Extends Session type to include role
├── .env.local                  # Never commit this
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## 4. Environment Variables

Create `.env.local` with these values:

```env
# Neon Database
DATABASE_URL="postgresql://..."      # [UPDATE: paste from Neon dashboard]

# Auth.js v5 (NextAuth)
AUTH_SECRET="..."                    # [UPDATE: run `npx auth secret` to generate]
AUTH_URL="https://palakata.edu.bd"   # [UPDATE: your live domain]

# Cloudflare R2
R2_ACCOUNT_ID="..."          # [UPDATE]
R2_ACCESS_KEY_ID="..."       # [UPDATE]
R2_SECRET_ACCESS_KEY="..."   # [UPDATE]
R2_BUCKET_NAME="palakata-media"
R2_PUBLIC_URL="https://..."  # [UPDATE: your R2 public bucket URL]
```

---

## 5. Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ── Auth / User accounts ─────────────────────────────────────────
model User {
  id                 String     @id @default(cuid())
  username           String     @unique  // login identifier — NOT email
  password           String              // bcrypt hashed — never plain text
  role               UserRole
  nameEn             String
  nameBn             String?
  isActive           Boolean    @default(true)   // can be toggled at any time
  mustChangePassword Boolean    @default(false)  // true for auto-generated passwords
  createdBy          String?              // userId of whoever created this account
  createdAt          DateTime   @default(now())
  updatedAt          DateTime   @updatedAt
}

enum UserRole {
  PRINCIPAL   // Super admin — can create max 2 ADMIN accounts
  ADMIN       // Can create TEACHER & STUDENT accounts, manage all content
  TEACHER     // Can enter results for own classes only
  STUDENT     // Can view own results, attendance, fees
}
// ─────────────────────────────────────────────────────────────────

model Student {
  id            String     @id @default(cuid())
  rollNumber    String     @unique
  nameEn        String
  nameBn        String
  fatherNameEn  String
  fatherNameBn  String
  motherNameEn  String?
  motherNameBn  String?
  classLevel    ClassLevel
  section       String?
  admissionYear Int
  dateOfBirth   DateTime
  phone         String?
  guardianPhone String?
  address       String?
  photoUrl      String?    // Cloudflare R2 URL
  password      String     // bcrypt hashed — set by admin, reset by admin
  isActive      Boolean    @default(true)  // admin can disable login
  results       Result[]
  fees          Fee[]
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
}

model Teacher {
  id            String   @id @default(cuid())
  nameEn        String
  nameBn        String
  designation   String
  department    String
  qualification String?
  experience    Int?     // years
  phone         String?
  email         String?
  photoUrl      String?  // Cloudflare R2 URL
  joinDate      DateTime?
  isActive      Boolean  @default(true)
  sortOrder     Int      @default(0)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Result {
  id            String     @id @default(cuid())
  student       Student    @relation(fields: [studentId], references: [id])
  studentId     String
  classLevel    ClassLevel
  section       String?
  term          Term
  year          Int
  subject       String
  fullMarks     Float      @default(100)
  obtainedMarks Float?
  grade         String?    // A+, A, A-, B, C, D, F
  gpa           Float?
  isPassed      Boolean    @default(true)
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
}

// ── Finance Module ────────────────────────────────────────────────
model Fee {
  id          String    @id @default(cuid())
  student     Student   @relation(fields: [studentId], references: [id])
  studentId   String
  type        FeeType
  amount      Float
  month       String?   // "2026-01" — for monthly fees only
  year        Int
  description String?
  isPaid      Boolean   @default(false)
  paidAt      DateTime?
  dueDate     DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum FeeType {
  MONTHLY      // Monthly tuition fee
  ADMISSION    // One-time admission fee
  EXAM_FEE     // Per-term exam fee
  OTHER        // Any other charge
}
// ─────────────────────────────────────────────────────────────────

model Notice {
  id          String   @id @default(cuid())
  titleEn     String
  titleBn     String
  contentEn   String?  @db.Text
  contentBn   String?  @db.Text
  fileUrl     String?  // Cloudflare R2 URL (PDF attachment)
  isPublished Boolean  @default(true)
  isPinned    Boolean  @default(false)
  publishedAt DateTime @default(now())
  createdAt   DateTime @default(now())
}

model Event {
  id          String   @id @default(cuid())
  titleEn     String
  titleBn     String
  descriptionEn String? @db.Text
  descriptionBn String? @db.Text
  eventDate   DateTime
  location    String?
  isPublished Boolean  @default(true)
  createdAt   DateTime @default(now())
}

model GalleryImage {
  id          String   @id @default(cuid())
  captionEn   String?
  captionBn   String?
  imageUrl    String   // Cloudflare R2 URL
  category    String   @default("general")
  sortOrder   Int      @default(0)
  isPublished Boolean  @default(true)
  createdAt   DateTime @default(now())
}

model Achievement {
  id          String   @id @default(cuid())
  titleEn     String
  titleBn     String
  descriptionEn String?
  descriptionBn String?
  year        Int
  createdAt   DateTime @default(now())
}

enum ClassLevel {
  EBTEDAYEE_1
  EBTEDAYEE_2
  EBTEDAYEE_3
  EBTEDAYEE_4
  EBTEDAYEE_5
  DAKHIL_6
  DAKHIL_7
  DAKHIL_8
  DAKHIL_9
  DAKHIL_10
  ALIM_11
  ALIM_12
}

enum Term {
  FIRST
  SECOND
}
```

---

## 5b. Auth.js Configuration

### `lib/auth.ts`

```ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcryptjs";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { username: credentials.username as string },
        });
        if (!user) return null; // not found
        if (!user.isActive) return null; // account deactivated
        const valid = compareSync(
          credentials.password as string,
          user.password,
        );
        if (!valid) return null; // wrong password
        return {
          id: user.id,
          username: user.username,
          name: user.nameEn,
          role: user.role,
          mustChangePassword: user.mustChangePassword,
        };
      },
    }),
  ],
  pages: { signIn: "/sign-in" },
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.username = (user as any).username;
        token.mustChangePassword = (user as any).mustChangePassword;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as any).role =
          token.role(session.user as any).username =
          token.username(session.user as any).mustChangePassword =
            token.mustChangePassword;
      }
      return session;
    },
  },
});
```

### `app/api/auth/[...nextauth]/route.ts`

```ts
import { handlers } from "@/lib/auth";
export const { GET, POST } = handlers;
```

### `middleware.ts` (root of project)

```ts
import { auth } from "@/lib/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const mustChange = (req.auth?.user as any)?.mustChangePassword;

  // Force password change if auto-generated password has not been changed yet
  if (req.auth && mustChange && pathname !== "/change-password") {
    return Response.redirect(new URL("/change-password", req.url));
  }
  // Protect all dashboard routes
  if (pathname.startsWith("/dashboard") && !req.auth) {
    return Response.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: ["/dashboard/:path*", "/change-password"],
};
```

### `types/next-auth.d.ts`

```ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: "PRINCIPAL" | "ADMIN" | "TEACHER" | "STUDENT";
      username: string;
      mustChangePassword: boolean;
    } & DefaultSession["user"];
  }
}
```

### Seeding the Principal account (run once)

```ts
// scripts/create-principal.ts
import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

await prisma.user.create({
  data: {
    username: "principal", // [UPDATE to real username]
    nameEn: "Principal Name", // [UPDATE]
    nameBn: "অধ্যক্ষের নাম", // [UPDATE]
    password: hashSync("Change@123", 12),
    role: "PRINCIPAL",
    mustChangePassword: true,
  },
});
```

Run with: `npx tsx scripts/create-principal.ts`

### Business logic rules (enforce in API routes)

- **Principal** can create max **2 ADMIN** accounts
- When creating any account (ADMIN / TEACHER / STUDENT), auto-generate a password with `crypto.randomBytes(6).toString('hex')`, set `mustChangePassword: true`, and **display the password once** to the creator (it is never shown again)
- **Deactivating** an account sets `isActive: false` — the user gets a "Your account is disabled" message on login
- **Activating** sets `isActive: true` — user can log in immediately
- **Only PRINCIPAL** can deactivate/reactivate ADMIN accounts
- **ADMIN and PRINCIPAL** can deactivate/reactivate TEACHER and STUDENT accounts

### Colors

```css
--green-dark: #0f3a2e; /* Primary dark green (header, footer, buttons) */
--green-mid: #155441; /* Secondary green */
--green-accent: #1d6347; /* Hover states */
--gold: #d4b87c; /* Accent gold (borders, titles, ornaments) */
--gold-dark: #a07830; /* Darker gold for text */
--orange: #ee7c2d; /* CTA buttons (Admission, Login) */
--navy: #0c1142; /* Body background (Islamic pattern base) */
--paper: #ffffff; /* Card backgrounds */
--cream: #fdfaf0; /* Page backgrounds, warm white */
--ink: #1f2937; /* Body text */
--muted: #6b7280; /* Secondary text */
```

### Fonts (load via Google Fonts)

```
Cinzel           — English display headings (institution name, section titles)
Hind Siliguri    — Bengali text (all UI text in Bengali mode)
Noto Naskh Arabic — Arabic text (Quran, Bismillah, cover titles)
Inter            — English body text
```

### Icons — Lucide React (only)

- **All icons must use [Lucide React](https://lucide.dev)** — the default icon set that ships with shadcn/ui
- Never use emoji, image files, or other icon libraries as icons
- Import icons individually to keep the bundle small:
  ```tsx
  import { Phone, Mail, Menu, ChevronDown, Bell, BookOpen } from "lucide-react";
  ```
- Size with Tailwind: `className="w-5 h-5"` (20px default), `"w-4 h-4"` (small), `"w-6 h-6"` (large)
- Color with Tailwind text utilities: `className="text-gold"`, `"text-green-dark"`, `"text-muted-foreground"`
- Stroke width default (`strokeWidth={1.5}`) for a modern, clean look — do not use `strokeWidth={2}` or higher
- For the madrasah seal and mihrab decoration, keep the hand-crafted inline SVG components (`MadrasahSeal.tsx`, `MihrabDecoration.tsx`) — these are custom artwork, not icon replacements

### Background Pattern

The body background uses an Islamic 8-point geometric pattern on dark navy:

```css
body {
  background-color: #0c1142;
  background-image: url("[SVG data URI — see wireframe file for exact code]");
}
```

All content sections sit on white/cream cards that float above this background.

---

## 7. Page Layout Structure

Every page uses this wrapper:

```
UtilityBar         — dark, contact info left / language toggle right
Header             — dark green band: Seal | Name | Mihrab decoration
MenuBar            — white, sticky, horizontal nav with dropdowns
NoticeTicker       — light blue, scrolling notices + Login button
[page content]
Footer             — dark green, 4-column grid
```

---

## 8. Navigation Menu Structure

```
About ▼
  ├── History
  ├── Mission & Vision
  ├── Principal's Message
  └── Vice Principal's Message

Academic ▼
  ├── Classes
  ├── Syllabus
  ├── Routine
  ├── Academic Calendar
  └── Results

Admission ▼
  ├── Admission Info
  ├── Online Application
  ├── Admission Notice
  └── Fees & Charges

Administration ▼
  ├── Governing Body
  ├── Principal
  ├── Teachers
  └── Staff

Facilities ▼
  ├── Library
  ├── Computer Lab
  ├── Science Lab
  ├── Hostel
  └── Mosque

Co-Curriculum ▼
  ├── Events
  ├── Sports
  ├── Cultural Programs
  └── Scout

Gallery ▼
  ├── Photo Gallery
  ├── Video Gallery
  └── Events

Departments ▼
  ├── Ebtedayee
  ├── Dakhil
  └── Alim

Contact
Alumni Association
```

---

## 9. Home Page Sections (in order)

### 9.1 Quran Animation Section

- Full-screen sticky scroll section (220vh scroll distance)
- 3D Quran book centered on dark patterned background
- Cover has: double gold border frame, rotated diamond ornament, Arabic title القرآن الكريم, THE HOLY QURAN in small caps
- Scroll phase 0–75%: Cover flips open (rotateY 0° → -164°), gold rays fan out, particles rise
- Scroll phase 60–100%: Inner pages fade in with Surah Al-Fatiha (Arabic, right-to-left)
- Gold ambient glow pulses beneath the book as it opens
- "Scroll to open" hint label with bouncing arrow fades out on scroll start
- Language-aware hint text (EN/BN)

### 9.2 Notice Ticker

- Full-width light blue bar
- Dark green "Latest Notices" badge left
- Auto-scrolling notices (CSS animation, pauses on hover, infinite seamless loop)
- Orange Login button right (links to `/sign-in` — custom Auth.js login page)

### 9.3 Main Content (2-column grid)

**Left (2/3 width):**

- Hero image slider with 4 slides and dot pagination
  - Slide 1: Madrasah main gate / campus photo
  - Slide 2: Classroom / students
  - Slide 3: Events / graduation
  - Slide 4: Facilities
- Welcome section: Assalamu Alaikum greeting, welcome text in current language, principal's signature

**Right sidebar (1/3 width):**

- Online Admission card (madrasah seal + Apply Now orange button)
- Founder & Patronage card (photo + name + title) — `[UPDATE: add real name]`
- Important Links card (Madrasah Board, Ministry of Education, Result Portal, NCTB Books)

### 9.4 Info Cards Grid (3 columns)

- Latest Notices (date badge + title, link to /notice)
- Upcoming Events (date badge + title, link to /events)
- Achievements (star badge + year + title)
- Each card has "View All →" footer link

### 9.5 Stats Band

- Dark green full-width band with Islamic geometric overlay
- 4 stats: 1500+ Students | 25 Teachers | 30+ Years | 98% Pass Rate
- Numbers switch between EN/BN numerals with language toggle

### 9.6 Footer (4 columns)

- Column 1: Seal logo + institution name + description
- Column 2: Quick Links
- Column 3: Departments
- Column 4: Contact (address, phone, email, EIIN, Madrasah Code)

---

## 10. Bilingual System

All user-facing text must support English and Bengali. Use this pattern:

```tsx
// In components
const t = useLang(); // custom hook

// In i18n/strings.ts
export const strings = {
  welcome: {
    en: "Welcome to Palakata Alim Madrasah",
    bn: "পালাকাটা আলিম মাদ্রাসায় স্বাগতম",
  },
  // ... all strings
};
```

Language state stored in `localStorage` key `'lang'`, defaulting to `'bn'` (Bengali first for Bangladeshi users).

Fonts switch automatically:

- `en` mode: Cinzel (headings) + Inter (body)
- `bn` mode: Hind Siliguri (everything)
- Arabic text: always Noto Naskh Arabic regardless of mode

---

## 11. Image Upload Rules

> **Critical:** Never let users upload raw camera photos directly.

All images must be compressed before upload:

- Student photos: max **200 KB**, **400×500px**, WebP format
- Teacher photos: max **300 KB**, **400×400px**, WebP format
- Gallery images: max **500 KB**, **1200×800px**, WebP format
- Event images: max **400 KB**, **1200×630px**, WebP format

Use **Sharp** or browser-side **Canvas API** to compress before uploading to R2.

Upload path structure in R2:

```
students/{studentId}/photo.webp
teachers/{teacherId}/photo.webp
gallery/{year}/{filename}.webp
notices/{noticeId}/{filename}.pdf
```

---

## 12. Admin Dashboard (Protected by Auth.js)

Admin route: `/dashboard` — only accessible to users with `role: ADMIN` in the User database table.  
Auth.js middleware (`middleware.ts`) automatically redirects unauthenticated users to `/sign-in`.

Admin can manage:

### 12a. Student Management

- Add new students **class-wise** (select class → fill form → save)
- Fields: Roll No, Name (EN+BN), Father/Mother name, Class, Section, Date of Birth, Phone, Guardian Phone, Address, Photo upload
- Initial password set by admin during student creation
- **Reset student password** — admin sets a new password for any student
- **Disable / Enable student account** — toggle `isActive` flag. Disabled students cannot log in; their data is preserved
- Edit any student detail at any time
- View all students filtered by class and section

### 12b. Exam Results

- Enter results **per class, per subject, per term**
- Bulk entry: select Class → Section → Term → Year → Subject → enter marks for each student in the class
- System auto-calculates grade and GPA from marks entered
- Results appear **automatically in the student's login panel** immediately after saving
- **Print Result Card** — generates a formatted result card per student (all subjects, GPA, pass/fail) ready for browser print
- **Print Testimonial / Certificate** — generates a formal testimonial document per student with institution letterhead

### 12c. Finance Module

- **Add fees per student:**
  - Monthly tuition fee (specify month e.g. January 2026)
  - Admission fee (one-time)
  - Exam fee (per term)
  - Other fees (custom description)
- Mark fee as **Paid** (records payment date)
- Leave fee as unpaid (shows as due)
- Fee history per student — full payment history
- Student finance panel shows:
  - **Green "PAID"** badge for paid fees
  - **Red "DUE"** badge for unpaid fees with due date
- Financial summary per student: total paid, total due, outstanding balance

### 12d. Other management

- Notices (create, publish, pin, attach PDF)
- Events (create, publish)
- Gallery (upload images, set categories)
- Teachers (CRUD: name, photo, designation, order)
- Achievements (create, edit)
- User Accounts (create teacher/admin accounts)
- Site Settings (principal name, phone, EIIN, about text)

---

## 13. Student Portal (`/dashboard/student`)

Students log in with their **roll number + password** (password set/reset by admin).

**What students see:**

- **My Profile** — name, roll, class, section, father/mother name, photo
- **My Results** — all exam results auto-populated from admin entries. Shows subject, obtained marks, full marks, grade, GPA, pass/fail per term per year. Print Result Card button.
- **My Attendance** — attendance record per month
- **Finance / Fees** — complete fee history:
  - Each fee row shows: type, month/description, amount, status
  - **Green "PAID"** if admin marked paid
  - **Red "DUE"** if unpaid, shows due date
  - Summary card: Total Paid / Total Due / Outstanding Balance
- **Notices** — all published notices
- **Print Result Card** — browser print of formatted result card

## 13b. Print Features

### Result Card (Marksheet)

Printed from both admin panel (any student) and student panel (own card).  
Contains:

- Institution name, logo, address, EIIN
- Student: name, roll, class, section, year, term
- Subject-wise table: Subject | Full Marks | Obtained | Grade
- Total marks, GPA, Result (Pass/Fail)
- Principal signature line

### Testimonial / Certificate

Printed from admin panel only.  
Contains:

- Institution letterhead
- Student name, roll, class, section
- "This is to certify that [name] is a bonafide student of..."
- Year of study, conduct remarks
- Date, principal signature, stamp area

---

## 14. Responsive Breakpoints & Compact Layout

```
≥ 1080px  — Full desktop: horizontal menu, 3-column cards, sidebar visible
768–1079px — Tablet: hamburger menu, 2-column cards, sidebar below hero
< 768px   — Mobile: single column, full-width everything
```

### Compactness Rules (apply at all breakpoints)

- **No wasted whitespace** — section padding scales down on smaller screens; never leave large empty gaps
- **Touch targets** — minimum 44×44px for all buttons and links on mobile
- **Font scaling** — headings use `clamp()` so they shrink gracefully; never overflow the viewport
- **Images** — always use `width: 100%` / `max-width: 100%`; no fixed pixel widths that break on small screens
- **Tables** — wrap in a horizontally scrollable container on mobile (`overflow-x: auto`)
- **Navigation** — hamburger menu on tablet and below; full dropdown nav collapses to an off-canvas drawer
- **Cards** — switch from multi-column grid to single column at `< 640px`
- **Sidebar** — stacks below main content on tablet; hidden/accordion on mobile if space is insufficient
- **Footer** — 4-column grid collapses to 2-column on tablet, single column on mobile
- **Stats band** — 4 stats wrap to 2×2 grid on mobile
- **No horizontal scroll** — the page must never require horizontal scrolling on any viewport width

### Tailwind breakpoint mapping

```
sm  → 640px   (large phones, landscape)
md  → 768px   (tablet portrait)
lg  → 1024px  (tablet landscape / small laptop)
xl  → 1280px  (desktop)
```

---

## 15. Stability Rules (10-year maintenance plan)

These are non-negotiable constraints for long-term stability:

1. **Pin exact versions** — `"next": "16.2.6"` not `"^16.2.6"` anywhere in package.json
2. **Commit package-lock.json** — always, without exception
3. **No unnecessary SSR** — use React Server Components for static content, API routes only where needed
4. **Minimal dependencies** — only install what is absolutely necessary
5. **No Docker / Coolify** — not needed for this stack
6. **Security patches only** — only update patch versions (16.2.6 → 16.2.9), never jump majors
7. **LTS upgrades** — plan one deliberate upgrade every 3–4 years maximum

**Allowed dependencies** (keep this list short):

- next, react, react-dom, typescript
- tailwindcss, @tailwindcss/typography
- @prisma/client, prisma
- next-auth (Auth.js v5)
- bcryptjs, @types/bcryptjs (password hashing)
- @aws-sdk/client-s3 (for R2 upload)
- sharp (image compression — server-side only, admin upload)
- **lucide-react** (icons — the only icon library allowed)
- **shadcn/ui** runtime deps: class-variance-authority, clsx, tailwind-merge, tw-animate-css, @radix-ui/\* (installed automatically by `npx shadcn add`)

**Avoid adding:** separate animation libraries, form libraries, date libraries (use native JS), other icon packs (use Lucide only), state managers (use React state + Context), any other CSS framework or component library.

---

## 16. Deployment

### Vercel setup

1. Go to vercel.com → New Project → Import your GitHub repo
2. Framework preset will auto-detect as **Next.js** — leave all defaults
3. Add all `.env.local` variables in Vercel → Settings → Environment Variables
4. Add `AUTH_SECRET` (generate with `npx auth secret`) and `AUTH_URL` (your live domain)
5. Click Deploy — Vercel builds and deploys automatically
6. Every future `git push` to main branch auto-deploys

> No extra flags or adapters needed. Vercel created Next.js — everything works natively.

### Domain setup

1. Register `palakata.edu.bd` via BTCL (requires EIIN + Education Board letter)
2. In Vercel → your project → Settings → Domains → Add `palakata.edu.bd`
3. Vercel will show you two DNS records (A record + CNAME)
4. Log in to Cloudflare DNS → add those two records pointing to Vercel
5. Vercel auto-issues and renews SSL certificate — padlock appears automatically

> Keep Cloudflare as your DNS provider even though Vercel hosts the site. Cloudflare DNS gives you free DDoS protection and faster DNS resolution worldwide.

### Neon database

1. Create project at neon.tech
2. Copy connection string to `DATABASE_URL`
3. Run: `npx prisma db push`
4. Run: `npx prisma db seed` (optional seed file for demo data)

### Cloudflare R2

1. Create bucket named `palakata-media`
2. Enable public access on the bucket
3. Copy credentials to `.env.local`
4. Set CORS policy to allow uploads from your domain

---

## 17. Institution Info to Update

Replace all `[UPDATE]` placeholders in the codebase:

```
[UPDATE: EIIN]              → Real EIIN number from Education Board
[UPDATE: Madrasah Code]     → Real madrasah code
[UPDATE: Phone]             → Real phone number
[UPDATE: Email]             → Real email address
[UPDATE: Address]           → Full address (union, upazila, district)
[UPDATE: Founded year]      → Year the madrasah was established
[UPDATE: Principal name]    → Current principal's name (EN + BN)
[UPDATE: Principal title]   → Designation with honorific (e.g. Mufti, Maulana)
[UPDATE: Founder name]      → Founder's name + title
[UPDATE: About text EN]     → 2–3 paragraph English about section
[UPDATE: About text BN]     → 2–3 paragraph Bengali about section
[UPDATE: Student count]     → Actual current student count
[UPDATE: Teacher count]     → Actual current teacher count
[UPDATE: Founded]           → Number of years in operation
[UPDATE: Pass rate]         → Recent board exam pass percentage
```

---

## 18. Cost Summary

| Item                                    | Cost/year           |
| --------------------------------------- | ------------------- |
| Neon database (free tier)               | ৳0                  |
| Cloudflare R2 (free tier, ~330 MB used) | ৳0                  |
| Auth.js v5 (open source, self-hosted)   | ৳0 forever          |
| Vercel (Hobby tier) + SSL               | ৳0                  |
| Cloudflare DNS                          | ৳0                  |
| Domain: palakata.edu.bd (BTCL)          | ৳700–1,020          |
| **Total**                               | **৳700–1,020/year** |

---

## 19. Build Order for Claude Code

Follow this order — do not skip steps:

- [ ] 1. `npx create-next-app@16.2.6 palakata-madrasah --typescript --tailwind --app`
- [ ] 2. Pin all version numbers in package.json, configure next.config.js
- [ ] 3. Set up Prisma schema (includes Fee, Result, Student with new fields) and run `npx prisma db push`
- [ ] 4. Install Auth.js: `npm install next-auth@5.0.0 bcryptjs@3.0.2 @types/bcryptjs@2.4.6`
- [ ] 5. Create `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`, `middleware.ts`, `types/next-auth.d.ts`
- [ ] 6. Run `npx auth secret` to generate `AUTH_SECRET`, add to `.env.local`
- [ ] 7. Run `npx tsx scripts/create-admin.ts` to create first admin account
- [ ] 8. Build layout components (UtilityBar, Header, MenuBar, NoticeTicker, Footer)
- [ ] 9. Build the language system (context + hook + strings file)
- [ ] 10. Build the Quran 3D scroll animation component
- [ ] 11. Build the Home page (all sections)
- [ ] 12. Build public pages (About, Academic, Admission, etc.)
- [ ] 13. Build public result search page (roll number + year + term → results)
- [ ] 14. Build admin dashboard:
  - [ ] 14a. Student management (add class-wise, edit, disable, reset password)
  - [ ] 14b. Exam result entry (per class per subject per term)
  - [ ] 14c. Finance module (add fees, mark paid/due)
  - [ ] 14d. Print result card and testimonial
  - [ ] 14e. Notices, events, gallery, teachers, settings
- [ ] 15. Build student portal (profile, results auto-shown, finance paid/due, print)
- [ ] 16. Set up R2 upload helper and image compression
- [ ] 17. Deploy to Vercel (import GitHub repo, add env vars), connect domain via Cloudflare DNS

---

## 20. Reference Files

- **Wireframe HTML:** `palakata-madrasah-wireframe.html` — open in browser to see the full visual design including the 3D Quran animation, all sections, colors, and responsive behavior
- **Sample website for layout reference:** https://jaskm.edu.bd — note the header structure (seal + center name + mihrab), menu placement, and notice ticker pattern

---

---

## 21. Database Backup (Important for 10-year plan)

Add this cron job to prevent data loss if Neon ever changes its service:

```bash
# Run weekly via GitHub Actions or any cron service
pg_dump $DATABASE_URL --no-owner --no-acl -Fc > backup-$(date +%Y%m%d).dump

# Upload backup to Cloudflare R2
aws s3 cp backup-$(date +%Y%m%d).dump s3://palakata-media/backups/ \
  --endpoint-url https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com
```

Keep the last 12 weekly backups (3 months of history). Since your database is only ~4 MB, each backup file is tiny.

---

_Last updated: June 2026 — Auth.js v5 replaces Clerk · Vercel replaces Cloudflare Pages_  
_Designer: via Claude (Anthropic)_  
_For questions about the spec, describe the issue and Claude Code will resolve it._
