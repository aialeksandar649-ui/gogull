# GoGull Marketing Site

Dvojezični (HR/EN) one-page landing za [gogull.app](https://gogull.app), izgrađen na Next.js 15, next-intl i Sanity CMS.

## Pokretanje

```bash
npm install
cp .env.example .env.local
npm run dev
```

Otvori [http://localhost:3000/hr](http://localhost:3000/hr).

## Env varijable

| Varijabla | Opis |
|-----------|------|
| `NEXT_PUBLIC_SITE_URL` | URL marketing sitea |
| `NEXT_PUBLIC_WEBAPP_URL` | CTA link prema webappu |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity projekt (opcionalno) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase za newsletter |
| `SUPABASE_SERVICE_ROLE_KEY` | Server insert za newsletter |

Bez Sanity/Supabase stranica radi s JSON prijevodima i logira newsletter u konzolu.

## Sanity Studio

```bash
npx sanity init   # prvi put: poveži projekt
npm run sanity
```

U CMS-u kreiraj dokumente `siteSettings` i `landingPage` (singleton).

## Supabase

Pokreni [supabase/schema.sql](./supabase/schema.sql) u SQL editoru.

## Struktura

- `app/[locale]/` — landing, terms, privacy
- `components/sections/` — Hero, Users, Business, Creators, Footer
- `messages/` — HR/EN fallback copy
- `sanity/schemas/` — CMS modeli
