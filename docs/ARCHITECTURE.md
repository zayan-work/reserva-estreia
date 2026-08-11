# Meridiano + Estreia · Merge Architecture

Status: **built.** The monorepo migration is done, Estreia is unchanged and
building from its new location, and the Meridiano site is complete and running.
Section 6 records which open questions Rengan has since answered and which are
still open.

---

## 0. The tension to resolve first

The handoff (Rengan, Aug 2026) is explicit that the two properties stay apart:

> "The two sites do not cross-link publicly." (§02)
> "Keep the two sites on separate infrastructure. Estreia stays on its current
> stack. Meridianocasa is a new deployment." (§02, note)
> "No mention of the Estreia site or cross-linking" (§08, Not on the site)

The instruction now is to merge them. Those are only compatible under one reading:

> **Merge the codebase, not the brands.**
> One repository, one toolchain, one deploy pipeline -
> two apps, two domains, two themes, zero public cross-links.

That is what this document proposes. If Rengan means something more visible · one
domain, shared nav, Estreia reachable from meridianocasa.com · that is a different
build and it contradicts §02 and §08 of his own handoff in writing. See §5 for what
that costs. **Get it in writing before we build it.**

---

## 1. What exists today

`reserva-estreia/` · live consumer reservation site.

| | |
|---|---|
| Stack | Next.js 16.2.10 (App Router), React 19.2.4, TypeScript, Tailwind v4 |
| Package manager | pnpm 11.5.1 (pinned via `packageManager`) |
| Theme | Wine/plum + rose + cream, Fraunces + Inter · `app/globals.css` |
| Language | pt-BR live; en/es dictionaries exist under `lib/i18n/` behind a compile-time `ACTIVE_LOCALE` toggle, no switcher |
| Data | File store (`lib/store.ts`) + optional webhook mirror to Sheet/CRM |
| Protected | `proxy.ts` · Basic Auth on `/painel` and `/api/stats` |
| Analytics | Plausible, conditional on env |
| Git | Own repo, 3 commits. Parent folder is **not** a repo. |
| Workspace | `pnpm-workspace.yaml` exists but declares no `packages:` · single-package today |

Meridiano · does not exist yet. Two source documents, and **they disagree** (§6).

---

## 2. Recommended architecture

```
estreia/                          ← becomes the git root
├─ apps/
│  ├─ estreia/                    ← today's reserva-estreia, moved wholesale
│  │  ├─ app/  components/  lib/  public/
│  │  ├─ app/globals.css          ← wine/rose/cream. Untouched.
│  │  └─ next.config.ts           ← + outputFileTracingRoot
│  └─ meridiano/                  ← new, built from scratch
│     ├─ app/  components/  lib/  public/
│     ├─ app/globals.css          ← near-black/gold. Its own file. Never imports Estreia's.
│     └─ next.config.ts           ← + outputFileTracingRoot
├─ packages/
│  ├─ i18n/                       ← locale machinery only · no strings, no styles
│  ├─ forms/                      ← POST → validate → persist → mirror-to-webhook
│  └─ tsconfig/  eslint-config/   ← shared lint + compiler base
├─ docs/
├─ pnpm-workspace.yaml
└─ package.json                   ← scripts only, no app deps
```

### The rule that makes this safe

> **No shared design layer. Ever.**
> Not tokens, not `globals.css`, not fonts, not any component that carries a visual
> opinion. The two themes never meet in the import graph.

This is the direct answer to "I don't want to build the new site inside the old one."
They share a *repo*, not a *look*. Meridiano's near-black-and-gold institutional
register and Estreia's warm wine-and-rose consumer register stay in separate folders
with separate stylesheets, and neither can accidentally inherit from the other.

**Shared (safe · logic, no appearance):**
- `packages/i18n` · locale list, dictionary typing, resolution, `hreflang` emitter.
  Estreia's existing `lib/i18n/` is already the right shape; lift the machinery,
  leave the pt/en/es strings in the app.
- `packages/forms` · Estreia's "validate → persist → mirror to webhook" path is
  exactly what Meridiano's contact form needs. One implementation, two consumers.
- `packages/tsconfig` + `packages/eslint-config` · one lint bar, one TS target.

**Never shared:**
- `globals.css`, design tokens, fonts, any styled component
- `lib/site.ts` · different domains, langs, titles, robots, OG
- Analytics · Estreia runs Plausible; **Meridiano ships with none on launch** (§06)
- Env vars, secrets, data stores

**Concretely stopping accidental coupling:** each app's `tsconfig.json` keeps
`"paths": { "@/*": ["./*"] }` scoped to itself, so `@/` can never resolve across
apps. An ESLint `no-restricted-imports` rule bans `apps/*` cross-imports outright.

### Deployment · still two independent deployments

One repo does not mean one deploy. Two projects on the host, same repo, different
root directories:

| | Estreia | Meridiano |
|---|---|---|
| Root directory | `apps/estreia` | `apps/meridiano` |
| Domain | current | meridianocasa.com *(confirm · see §6)* |
| Env / secrets | own set | own set |
| Analytics | Plausible | none at launch |
| Blast radius | independent | independent |

A broken Meridiano deploy cannot take Estreia down. That preserves the substance of
"separate infrastructure" from the handoff while giving us one clone, one
`pnpm install`, one lint config, one place to do a Next upgrade.

**Required for monorepo builds:** each `next.config.ts` needs
`outputFileTracingRoot: path.join(__dirname, "../../")`. Without it Next traces only
the app folder and workspace-linked `packages/*` are dropped from the build output.
(Verified against the Next 16 docs bundled in `node_modules/next/dist/docs/`.)

---

## 3. Migration · history-preserving, ~1 hour

The existing repo has real history worth keeping. Promote it to the monorepo root
rather than starting fresh:

1. Move `reserva-estreia/.git` up to `estreia/.git`, making the workspace root the repo.
2. `git mv` the app's files into `apps/estreia/`. Full history survives;
   `git log --follow` still works on every file.
3. Root `package.json` (scripts only) + `pnpm-workspace.yaml` gains
   `packages: ["apps/*", "packages/*"]`, keeping the existing `allowBuilds` block.
4. Move `pnpm-lock.yaml` to the root; re-resolve once with `pnpm install`.
5. Merge `.gitignore` upward; verify `.next/`, `node_modules/`, `.data/`, `.env.local`,
   `tsconfig.tsbuildinfo` are all still ignored. **`.env.local` is currently
   untracked · confirm it stays that way after the move.**
6. Add `outputFileTracingRoot` to `apps/estreia/next.config.ts`.
7. `pnpm --filter estreia build` · byte-for-byte the same site.
8. Repoint the existing host project's root directory to `apps/estreia`. **Deploy and
   verify the live site before touching Meridiano.**

Estreia stays live and unchanged in appearance and behaviour throughout. Nothing in
steps 1–8 edits a component or a stylesheet.

Rollback: the pre-move commit is a tag away, and the host's root-directory setting is
a one-field revert.

---

## 4. Meridiano app design

**Stack:** Next 16 App Router, matching Estreia. The handoff says "whatever's fastest
for you" and prefers static · Next satisfies that (every section prerenders; one
route handler for the contact form) and means one toolchain instead of two.

**Structure:** single scroll page, seven sections, mobile-first, per handoff §03.
Content is small enough to live in typed TS dictionaries · no CMS.

```
apps/meridiano/
  app/layout.tsx        fonts (serif display + sans body), metadata, no analytics
  app/page.tsx          the seven sections
  app/api/contact/      POST → honeypot check → mirror to hello@meridianocasa.com
  app/opengraph-image.tsx  1200×630, wordmark on dark
  app/globals.css       its own token set · near-black, warm amber, muted gold
  lib/content/{en,pt,es}.ts
  components/           Hero, Thesis, Market, Lines, Approach, Leadership, Contact
```

Hits the handoff's targets by construction: no blocking scripts, no third-party
anything, five images, fade-in-on-scroll as the only motion (behind
`prefers-reduced-motion`), semantic headings, WCAG AA contrast, alt text per the
imagery brief.

**Language · one decision needed.** The handoff asks for "a simple language switcher
in header, no separate URLs." A client-side switcher with no URLs means Google indexes
English only; the PT and ES translations are invisible to search and unlinkable · you
cannot send a Brazilian partner a Portuguese link. Recommendation: keep English at `/`
as the canonical default exactly as specified, and add `/pt` and `/es` with `hreflang`
tags. Same switcher in the header, same English-first default, but the translations
become real pages. Costs nothing extra and is reversible. **Flag to Rengan.**

**Images:** five placeholders plus the OG card, pending Maria. Every section renders
without its image · the handoff already sanctions this ("If unsure, no image"), so
build and review can proceed on typography alone while imagery is in flight.

---

## 5. If "merge" means one domain

Three shapes, in ascending order of what they break:

| | Shape | Cost |
|---|---|---|
| **A** ✅ | Monorepo, two domains · *recommended* | None. Matches the handoff. |
| **B** | One root domain, subdomain split (`meridianocasa.com` + `reserva.meridianocasa.com`) | DNS-level only; deployments still separate. But it publicly ties the consumer test to the corporate house · contradicts handoff §02/§08. |
| **C** | One domain, path split (`/` Meridiano, `/reserva` Estreia) | Highest cost. Shared cookie and analytics origin; one `robots.txt`/sitemap host, so SEO entangles the institutional site with the consumer test. Estreia needs `basePath` and a re-audit of every absolute path · `/painel`, `/api/*`, `sitemap.ts`, `robots.ts`, `manifest.ts`, OG image routes, the Basic Auth matcher in `proxy.ts`. Directly contradicts "the two sites do not cross-link publicly." |

A is the default and it is what §2 builds. B and C are reachable from A later · the
monorepo does not foreclose them · so **choosing A now costs nothing if Rengan later
wants B or C.** Neither B nor C should be built on a verbal ask, given the handoff
forbids both in writing.

---

## 6. Source-document conflicts, and where they landed

The handoff PDF and the trilingual content PDF disagreed on seven points.
Rengan resolved the blocking three on 11 Aug 2026:

| # | Question | Resolution |
|---|---|---|
| 1 | `meridianocasa.com` or `meridiano.com.br`? | **meridianocasa.com.** "We are a global house, not just a Brazilian one." Wired into `lib/site.ts`. |
| 2 | Near-black and amber, or green and gold? | **Green and gold**, confirmed against Maria's identity document. Palette below. |
| 6 | Reuben or Reuban Benjamin? | **Reuban.** Name and `reuban@meridianocasa.com` are live in all three locales. |

That settled it: the **trilingual content PDF plus Maria's identity document are
the current brief**, and the handoff is the older strategic frame. The remaining
four resolved themselves once the newer documents won:

| # | Handoff said | Built as |
|---|---|---|
| 3 | "Thesis" and "The lines" | **Our Essence** (with four pillars) and **Portfolio**, per the content doc and mockups |
| 4 | "No CTA. Nothing to click." | Section nav in the header, per content doc section 8 and every mockup. The hero itself still has no CTA. |
| 5 | English at launch, PT later, ES maybe | **All three shipped**, since finished copy for all three was delivered |
| 7 | No emblem mentioned | Emblem present, drawn as vector. See the note below. |

Palette, from `MERIDIANO Identity Website.docx`:

| Token | Hex | Use |
|---|---|---|
| Meridiano Emerald | `#0F3A2E` | backgrounds, navigation, hero |
| Rainforest Green | `#245345` | cards, hover, secondary blocks |
| Antique Gold | `#D6B35A` | type, icons, rules, borders |
| Light Gold | `#E5C97A` | highlights only |
| Warm Sand | `#EFE5D6` | editorial surfaces |
| Soft Ivory | `#FAF7F1` | body text |
| Deep Charcoal | `#171513` | dark overlays |

Type: Cormorant Garamond for titles, Montserrat for body and the tracked-out
gold labels, two weights each.

### Still open, not blocking

- **The emblem is a vector reconstruction**, not Maria's master file.
  `components/Emblem.tsx` redraws it from the identity document's description
  (thin circular border, palm, sun, mountain, horizon, abstracted Copacabana
  wave). It is crisp at any size and correct in register, but it is not the
  original artwork. **Ask Maria for the SVG or AI export.**
- **The portfolio card artwork could not be used whole.** Each supplied card is
  a finished composition with the category name and tagline set into it in
  English, so it cannot translate and it collides with any text laid over it.
  The cards are cut from the clean texture in the top third of each file and
  every word is live text. If Maria can supply the textures without typography,
  they drop straight in.
- **The handoff bans product images** (section 08); the Intimates card art shows
  product. The cropped texture sidesteps this, but flag it if anyone objects.
- **Rengan has not answered the URL question for translations.** The handoff
  asked for a switcher with "no separate URLs"; `/pt` and `/es` were built as
  real pages instead, because a client-only toggle makes the translations
  invisible to search and impossible to link. Reversible if he disagrees.

---

## 7. What was built

**Monorepo** · the repository root is now `/home/zayan/work/estreia`, promoted
from the old `reserva-estreia` repo so all history survives (57 renames, not 57
deletes plus 57 adds; `git log --follow` still works on every file).

```
estreia/
├─ apps/estreia/       moved wholesale, byte-identical output, 15 routes
├─ apps/meridiano/     new, 10 routes
├─ packages/tsconfig/       shared compiler base
├─ packages/eslint-config/  shared lint base + cross-app import ban
└─ docs/brand/         handoff, content doc, identity doc, Maria's artwork
```

Both apps build and lint clean. Estreia was verified building from its new
location before Meridiano was started, and its appearance and behaviour are
untouched.

**Separation is enforced, not just intended.** Each app's `@/*` alias is scoped
to itself so it cannot resolve across apps, and `packages/eslint-config` carries
a `no-restricted-imports` rule that fails the build on any `apps/*` cross-import.
Neither app can reach the other's stylesheet by accident.

**Meridiano** · seven sections, three locales, every page prerendered. Verified
in the browser at 1440px and 390px: no horizontal overflow, all six images
loading, contact endpoint tested for the valid, honeypot and empty cases.
Total page weight about 411KB across 21 requests, against a 1.5MB budget.

### Remaining before launch

1. Register `meridianocasa.com`, point DNS, issue SSL
2. Provision `hello@` and `reuban@` mailboxes
3. Set `CONTACT_WEBHOOK_URL` so the form delivers to a real inbox
4. Two host projects, one repo: root directories `apps/estreia` and
   `apps/meridiano`, separate env and separate domains
5. Replace the emblem with Maria's master vector
6. Staging link to Rengan, approval, then live

Confidentiality (handoff section 08) holds throughout: staging stays private,
nothing posted publicly, no drafts in the Meridiano WhatsApp group.

---


## 8. Standing constraints · neither site may violate

- **Estreia: no payments.** No card capture, no Pix charge. The deposit slot stays off
  until Felipe clears escrow **and** Rengan confirms in writing. The merge does not
  touch this and must not be read as an occasion to revisit it.
- **Meridiano: no commerce surface.** No product images, no artist names, no prices, no
  manufacturer names, no press logos, no newsletter capture, no live chat, no
  third-party analytics at launch.
- **No public cross-links between the two sites** unless Rengan overrides §02 and §08
  of his own handoff in writing.
