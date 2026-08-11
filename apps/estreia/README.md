# Estreia — Reservation Site

A single-page **demand test**: people reserve a spot on the launch list for free,
and we watch the numbers. Built to the *Estreia Reservation Site Build Spec (v1)*.

> ## ⛔ One hard rule
> This site collects **reservations only**. No payments, no card capture, no Pix
> charge — nothing. The deposit slot in the form is **switched OFF on purpose**
> and must stay off until legal (Felipe) clears the escrow structure **and**
> Rengan confirms in writing. If anyone asks to enable payments, the answer is
> *"not until Rengan confirms Felipe signed off."*

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind v4** tokens + a ported design system in `app/globals.css`
- Fonts self-hosted via `next/font` — **Fraunces** (headlines) + **Inter** (body)
- File-based reservation store with an optional webhook mirror to the team's
  real destination (Sheet / Airtable / CRM)
- Mobile-first, SEO-optimised, LGPD-clean

## Run locally

Uses **pnpm** (`packageManager` is pinned in `package.json`; run `corepack enable` if you don't have pnpm).

```bash
cp .env.example .env.local   # then edit values
pnpm install
pnpm dev                     # http://localhost:3000
```

Build & serve production:

```bash
pnpm build
pnpm start
```

## Structure

```
app/
  layout.tsx            SEO metadata, viewport, fonts, analytics
  page.tsx              landing page (hero · trust · how · form · faq · footer)
  painel/page.tsx       internal demand dashboard (protected)
  opengraph-image.tsx   generated 1200×630 social-share image (interim)
  icon.tsx apple-icon.tsx  on-brand favicons
  sitemap.ts robots.ts manifest.ts
  api/
    reservations/       POST — create/dedupe a reservation
    count/              GET  — public live total (hero counter)
    stats/              GET  — internal aggregates (protected)
    visit/              POST — visit beacon (conversion)
components/             page sections
lib/
  reservation.ts        types + WhatsApp validation + dedupe
  store.ts              persistence (file store + webhook mirror)
  stats.ts              dashboard aggregation
  site.ts faq.ts anim.ts
proxy.ts                Basic Auth gate for /painel + /api/stats
```

## Where reservations go (the thing that must work)

Every reservation is validated (Brazilian WhatsApp format), **deduped by WhatsApp**
(the same number twice is an update, not a double-count), and persisted with all
required fields: `nome, whatsapp, email, tamanho, categorias, timestamp,
utm_source, utm_content` (+ `utm_medium, utm_campaign, referrer, queue`).

Two destinations, use either or both:

1. **File store (default).** JSON at `DATA_DIR/reservations.json`. Durable on any
   **persistent** host (VPS, Render, Railway, Fly, `next start` on a box). The
   dashboard reads real data straight from it.
2. **Webhook mirror (recommended for serverless).** Set `RESERVATIONS_WEBHOOK_URL`
   to a Google Sheet / Airtable / CRM endpoint (Zapier, Make, or a Google Apps
   Script web app). Each reservation is POSTed there. **Required on Vercel**,
   whose filesystem is ephemeral.

> Swapping in a managed DB (Supabase/Airtable) means implementing the same small
> surface in `lib/store.ts` (`add` / `getCount` / `getStats` / visits). Kept
> intentionally minimal.

## Internal dashboard — `/painel`

Real-time demand read: total reservations, visit→reservation conversion,
WhatsApp %, top size, category interest bars, and the production **decision
rule**. It never faces the public — `proxy.ts` gates `/painel` and `/api/stats`
with HTTP Basic Auth (`PAINEL_USER` / `PAINEL_PASSWORD`) and it's disallowed in
`robots.txt`. **Change the default password in every environment.**

## Attribution (measuring the ambassador)

Give the ambassador tagged links, one per post/channel, e.g.:

```
https://reserva.estreia.com.br/?utm_source=ludmilla&utm_content=story1
https://reserva.estreia.com.br/?utm_source=ludmilla&utm_content=feed1
https://reserva.estreia.com.br/?utm_source=ludmilla&utm_content=bio
```

The form reads those UTMs from the URL and saves them on each reservation, so we
can tell whether *her* traffic converts. Install analytics by setting
`NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (Plausible is privacy-friendly and LGPD-clean).

## SEO & performance

- Full metadata + Open Graph + Twitter card, canonical, `pt-BR` locale
- JSON-LD: Organization, WebSite, and **FAQPage** (rich-result eligible)
- `sitemap.xml`, `robots.txt`, web manifest, theme-color, on-brand icons
- Self-hosted fonts (no external requests), mobile-first, `prefers-reduced-motion`
  respected, keyboard-navigable with visible focus

## Deploy

- **Vercel** (fastest): connect the repo, set the env vars, and set
  `RESERVATIONS_WEBHOOK_URL` (ephemeral FS). HTTPS is automatic.
- **Persistent host**: `npm run build && npm start`, set `DATA_DIR` to a
  writable, backed-up volume.

Compress and drop Maria's real hero + supporting imagery in `public/`, and her
`opengraph-image.jpg` into `app/` to override the generated share image.
