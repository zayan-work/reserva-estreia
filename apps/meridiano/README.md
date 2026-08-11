# Meridiano

The corporate credibility and investor site for Meridiano, at **meridianocasa.com**.

One scroll, seven sections, three languages. Institutional register: quiet,
restrained, nothing commerce-facing.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind v4** tokens and a hand-written design system in `app/globals.css`
- Fonts self-hosted via `next/font`: **Cormorant Garamond** (titles) +
  **Montserrat** (body and labels)
- Every page prerendered. One route handler, for the contact form.
- No analytics, no third-party scripts, no trackers.

## Run

From the workspace root:

```bash
pnpm install
pnpm dev:meridiano      # http://localhost:3000
pnpm build:meridiano
```

## Languages

English is the default and lives at `/`. Portuguese and Spanish get real URLs:

| Locale | URL | `<html lang>` |
|---|---|---|
| English | `/` | `en` |
| Portuguese | `/pt` | `pt-BR` |
| Spanish | `/es` | `es` |

The handoff asked for a switcher with "no separate URLs". Real paths were used
instead so the translations are indexable, linkable and shareable: you can send
a Brazilian partner a Portuguese link. `hreflang` alternates and per-locale
canonicals are emitted from `lib/site.ts`, and all three are in the sitemap.

Each locale has its own root layout (`app/(en)/` and `app/(intl)/[locale]/`) so
`<html lang>` is correct per URL. Both delegate to `components/Document.tsx`, so
there is one shell, not three. Adding a language means adding a dictionary to
`lib/content/` and listing it in `lib/content/index.ts`; TypeScript then names
every string still missing.

## Copy

All copy lives in `lib/content/{en,pt,es}.ts`, typed against `types.ts`. Source
of truth is `docs/brand/Meridiano_Trilingual_Content.pdf`. Nothing is hardcoded
in a component.

## Imagery

`public/images/` holds WebP conversions of Maria's artwork in
`docs/brand/identity/`. Total imagery is about 250KB.

The three portfolio cards are cut from the **top third** of the supplied card
art. The full artwork is a finished composition with the category name and
tagline set into it in English, which cannot translate and collides with
anything laid over it. The cards here use the clean texture and set every word
as live text, so `/pt` and `/es` read correctly.

`components/Emblem.tsx` is a vector reconstruction of the Meridiano emblem, not
the master file. **Maria: send the original SVG or AI export and replace that
component.** The four pillar icons in `components/Icons.tsx` follow the symbol
family in the identity document (sun, palm, waves, horizon).

## Contact form

One field, one button. `POST /api/contact` validates, drops anything that fills
the honeypot, and forwards to `CONTACT_WEBHOOK_URL` (a Zapier / Make / Apps
Script endpoint into hello@meridianocasa.com). With no webhook configured it
logs to the server and still answers 200, so staging review works before the
mailbox exists. No captcha.

## Environment

Copy `.env.example` to `.env.local`. Nothing in it is required for the site to
render; only the contact form's destination depends on configuration.

## What must not go on this site

Per the handoff, section 08:

- No product images, no artist names, no prices or commercial terms
- No manufacturer names, no investor decks or financials
- No press logos or "as seen in" badges
- No blog, journal, or newsletter capture
- No third-party analytics at launch
- **No link to or mention of the Estreia site.** The two properties are separate
  in public. They share this repository and nothing else.
