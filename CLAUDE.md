# GoGull — Project Context

## What is GoGull

GoGull is a location-discovery app that converts short-form video scrolling into real-world experiences. Users discover nearby places through up-to-date video previews instead of outdated photos. The platform serves three audiences: end users, local businesses, and content creators.

The product currently targets Croatia (initially limited area, expanding). Tagline: *"Pretvori ovisnost o swajpanju u stvarna iskustva."*

## Stack

- **Next.js 15** (App Router, Turbopack in dev)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **next-intl 4** — i18n with `hr` (default) and `en` locales, `localePrefix: "always"`
- **Sanity v3** — CMS for landing page media and site settings (hero video, poster, mockup image, webappUrl, social links, contact email, legal URLs)
- **Supabase** — newsletter signups (`newsletter_subscribers` table)
- **Vercel** — deployment

## Project Structure

```
app/
  [locale]/          # Locale-scoped pages (hr/en)
    page.tsx         # Landing page (main entry)
    privacy/
    terms/
  api/newsletter/    # Newsletter signup API route (POST → Supabase)
  globals.css
  layout.tsx         # Root layout (no locale)

components/
  layout/Header.tsx
  sections/          # HeroSection, ForUsersSection, ForBusinessSection,
                     # ForCreatorsSection, FooterSection, FeatureCard, icons
  ui/                # Button, LanguageSwitcher, LazyVideo, NewsletterForm

i18n/
  routing.ts         # locales: ["hr", "en"], defaultLocale: "hr"
  request.ts
  navigation.ts

lib/
  sanity/client.ts   # sanityConfigured flag — graceful fallback when no env vars
  sanity/queries.ts
  sanity/types.ts
  site.ts            # siteConfig (fallback URLs, social links)
  supabase.ts        # createSupabaseAdmin()

messages/
  hr.json            # Croatian strings (primary)
  en.json

sanity/schemas/      # landingPage, siteSettings, index
middleware.ts        # next-intl locale routing
```

## Environment Variables

```
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_WEBAPP_URL
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET        # defaults to "production"
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

Sanity is **optional** — `sanityConfigured` is `false` when `NEXT_PUBLIC_SANITY_PROJECT_ID` is missing/placeholder, and the page falls back to `siteConfig` defaults. The app builds and runs without Sanity connected.

## Dev Commands

```bash
npm run dev          # Next.js dev server (Turbopack)
npm run build
npm run lint
npm run sanity       # Sanity Studio dev server
npm run sanity:deploy
```

## Key Conventions

- All user-facing copy lives in `messages/hr.json` and `messages/en.json` — never hardcode strings in components.
- Croatian (`hr`) is the default locale; all new copy keys go in both files.
- Sanity data is fetched server-side in `app/[locale]/page.tsx` with a try/catch fallback — keep it that way.
- Newsletter API route at `app/api/newsletter/route.ts` writes to Supabase; schema is in `supabase/schema.sql`.
- Brand assets (logo, color palette, typography guide) are in `Dizajn/`.
- `lib/site.ts` is the single source of truth for fallback config (URLs, social links).
