# Josh's Product Lab

A personal PM portfolio website with full content management admin panel.

**Tech Stack:** Next.js 14 · Tailwind CSS · Neon PostgreSQL

---

## Setup

> **✨ Neon Integration:** This project now includes Neon AI skills and infrastructure-as-code support! See `NEON_INTEGRATION_SUMMARY.md` for details on what's been set up.

### 1. Install dependencies

```bash
npm install
npm install @neon/config  # For neon.ts support
```

### 2. Set up your Neon database

1. Create a new project at [console.neon.tech](https://console.neon.tech)
2. Copy your connection string
3. Create a new SQL query in the Neon dashboard
4. Copy and run the contents of `schema.sql`

### 3. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
ADMIN_PASSWORD=your_secure_password
COOKIE_SECRET=a_long_random_string_at_least_32_chars
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Admin Panel

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Enter the password you set in `ADMIN_PASSWORD`
3. Manage all content across 6 tabs:
   - **Hero** — headline, subtext, CTA button
   - **Projects** — add, edit, delete projects with featured toggle
   - **About** — about page text (3 paragraphs)
   - **Currently** — building, reading, targeting
   - **Social Links** — LinkedIn, GitHub, Email, etc.
   - **Site Config** — site title, meta description, footer text

---

## Routes

### Public

- `/` — Homepage
- `/about` — About page
- `/work/[slug]` — Individual project page

### Admin

- `/admin/login` — Login page
- `/admin` — Dashboard (password protected)

---

## Database Schema

### `site_config`
Key-value store for all site settings (hero text, about text, footer, etc.)

### `projects`
All projects with title, label, headline, description, slug, external link, featured flag, sort order

### `social_links`
Social media links with platform, URL, and sort order

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Import into Vercel
3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
   - `COOKIE_SECRET`
4. Deploy

---

## Key Features

✅ **Zero hardcoded content** — everything editable via admin panel  
✅ **Full CRUD** — create, edit, delete projects  
✅ **Featured projects** — highlight your best work  
✅ **External links** — link directly to live projects  
✅ **Password protected** — simple cookie-based auth  
✅ **Mobile responsive** — looks great on all devices  
✅ **Clean design** — Inter font, subtle shadows, no animations  

---

Built with care 🛠️
