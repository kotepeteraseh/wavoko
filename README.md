# Wavoko website (Next.js + Supabase)

## 1. Create the project (VS Code terminal)
```
npx create-next-app@latest wavoko --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd wavoko
npm i @supabase/supabase-js @supabase/ssr lucide-react
```
## 2. Copy these files in
Copy `src/` over the generated `src/` (replace when asked), plus `supabase/` and `.env.example`. Rename `.env.example` to `.env.local` and fill it in.

## 3. Database
Create a project at supabase.com. In its SQL Editor, paste and run `supabase/schema.sql`.

## 4. Client dashboard (monday.com)
Create a board with columns whose IDs are `client_email`, `role` and `status` (status values: Applied, Replied, Interview, Offer). Put the API token and board ID in `.env.local`. Your team adds one item per application, with the client's email.

## 5. Images
Put your photos in `public/images/` named `hero.jpg`, `story-1.jpg`, `story-2.jpg`, `story-3.jpg`. Until then the image areas show a soft green block.

## 6. Run
```
npm run dev
```
Open http://localhost:3000

## Structure
```
src/app/page.tsx              Home
src/app/about, services, success-stories, talent, finance, privacy   Content pages
src/app/contact/page.tsx      Contact form
src/app/auth/page.tsx         Sign up / sign in
src/app/wecoapply/page.tsx    WECOAPPLY page with plans
src/app/dashboard/page.tsx    Client dashboard (read-only, from monday.com)
src/app/dashboard/details     Resume details, job preferences, resume upload
src/app/api/applications      Server route that reads monday.com
src/components/Header.tsx, Footer.tsx, PageIntro.tsx
src/lib/supabase.ts, plans.ts
supabase/schema.sql
```
Not yet included: payments, real Talent and Finance tools.

## Brand (locked)
Colors: Cream #F2EDE6 (page), Ink #1A1410, Charcoal #3D3832, Signal #12B76A, Sprout #D1FAE5, Sand #E8E2DA. Fonts: Fraunces (headings) and Inter (body), loaded automatically through next/font, nothing to install. Tokens live in `src/app/globals.css`. Use Signal sparingly, never as a large background.
