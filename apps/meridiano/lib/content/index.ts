/**
 * Locale registry.
 *
 * English is the default and lives at `/`. The other locales get real URLs
 * (`/pt`, `/es`) rather than a client-only toggle, so translated pages are
 * indexable, linkable and shareable - you can send a Brazilian partner a
 * Portuguese link. `hreflang` alternates are emitted from `lib/site.ts`.
 */
import type { Dictionary } from "./types";
import { en } from "./en";
import { pt } from "./pt";
import { es } from "./es";

export const locales = ["en", "pt", "es"] as const;
export type Locale = (typeof locales)[number];

/** The default locale. Served at `/`, never at `/en`. */
export const DEFAULT_LOCALE: Locale = "en";

/** Locales that get their own path prefix. */
export const PREFIXED_LOCALES = locales.filter(
  (l) => l !== DEFAULT_LOCALE,
) as Exclude<Locale, typeof DEFAULT_LOCALE>[];

export const dictionaries: Record<Locale, Dictionary> = { en, pt, es };

/** Short names for the header switcher. */
export const localeNames: Record<Locale, string> = {
  en: "EN",
  pt: "PT",
  es: "ES",
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** The path a locale is served from. `/` for English, `/pt` and `/es` otherwise. */
export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}

export type { Dictionary } from "./types";
export type {
  Pillar,
  PortfolioCard,
  ApproachCard,
  Person,
} from "./types";
