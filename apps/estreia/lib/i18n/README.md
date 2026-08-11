# i18n — trilingual copy (pt · en · es)

All user-facing text lives here as typed dictionaries. Portuguese (`pt`) is the
source of truth and default; English (`en`) is a complete translation; Spanish
(`es`) is an **unreviewed draft stub** to be replaced with reviewed copy.

> Components are **not yet wired** to these dictionaries — the live site still
> reads its hard-coded Portuguese strings. This directory is the prepared
> foundation: the content is extracted, typed, and ready to consume.

## Switch the rendered language (dev toggle, code only)

There is intentionally **no language switcher on the website yet**. To preview a
language, open [`config.ts`](./config.ts) and change one line:

```ts
export const ACTIVE_LOCALE: Locale = "pt"; // "pt" | "en" | "es"
```

Then import `t` and read keys:

```ts
import { t } from "@/lib/i18n";
<h1>{t.hero.titleLead} <em>{t.hero.titleEm}</em></h1>
```

## Files

| File | Purpose |
| --- | --- |
| `config.ts` | Locale list, `DEFAULT_LOCALE`, the `ACTIVE_LOCALE` toggle, per-locale HTML/OG metadata. |
| `types.ts` | The `Dictionary` contract. Every locale must satisfy it — a missing key is a compile error. |
| `dictionaries/pt.ts` | Portuguese — source of truth (faithful extraction of the current copy). |
| `dictionaries/en.ts` | English — complete translation. |
| `dictionaries/es.ts` | Spanish — ⚠️ unreviewed draft; replace with your reviewed copy. |
| `index.ts` | `t` (active dictionary), `getDictionary(locale)`, `dictionaries`. |

## Adding or changing a string

1. Add the key to the `Dictionary` interface in `types.ts`.
2. Fill it in **all three** dictionaries (`tsc` fails until each is complete).
3. Run `npx tsc --noEmit` to confirm parity across locales.

## Notes

- **LEGAL-SAFETY strings** (hero reassurances, first two FAQ answers, footer
  legal line, form fine print) must keep their exact meaning across languages —
  clear wording with Rengan before going live (Spec Part 4).
- `WhatsApp`, `Pix`, and `LGPD` are Brazil-specific and kept verbatim in every
  language.
- Some strings are split into segments (`{ pre, bold, post }`) because the UI
  renders one span in bold. Keep the split shape identical across locales.

## Later: real per-URL locales

When you want `/`, `/en`, `/es` to render live (with a switcher), keep these
dictionaries and types as-is and add the routing layer (locale segment +
middleware) on top, calling `getDictionary(locale)` per request. Read
`node_modules/next/dist/docs/` first — this Next.js has breaking changes vs.
stock (see `AGENTS.md`).
