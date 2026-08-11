/**
 * i18n entry point. Import from here everywhere:
 *
 *   import { t } from "@/lib/i18n";
 *   <h1>{t.hero.titleLead} <em>{t.hero.titleEm}</em></h1>
 *
 * `t` is the dictionary for the ACTIVE_LOCALE set in ./config.ts — flip that one
 * constant to preview the whole site in pt / en / es. Components stay unaware of
 * which language is on; they just read keys.
 *
 * When wiring per-request/per-URL locales later, switch to getDictionary(locale)
 * and pass the locale down — the dictionaries and types below don't change.
 */
import { ACTIVE_LOCALE, DEFAULT_LOCALE, type Locale } from "./config";
import type { Dictionary } from "./types";
import { pt } from "./dictionaries/pt";
import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";

export const dictionaries: Record<Locale, Dictionary> = { pt, en, es };

/** Get the dictionary for a locale, falling back to the default. */
export function getDictionary(locale: Locale = ACTIVE_LOCALE): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

/** The active dictionary — the default import for components. */
export const t: Dictionary = getDictionary();

export { ACTIVE_LOCALE, DEFAULT_LOCALE } from "./config";
export type { Locale } from "./config";
export type { Dictionary } from "./types";
