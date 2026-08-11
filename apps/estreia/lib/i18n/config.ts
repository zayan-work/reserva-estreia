/**
 * i18n configuration — the site is trilingual: Portuguese (default), English,
 * and Spanish. Copy lives in `./dictionaries/*`; this file only declares which
 * locales exist and which one is currently "on".
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  HOW TO SWITCH THE LANGUAGE THAT RENDERS  (dev toggle — code only, not a UI)
 * ─────────────────────────────────────────────────────────────────────────────
 *  Change ACTIVE_LOCALE below to "pt", "en", or "es" and reload. That's it.
 *  There is deliberately NO language switcher on the website yet — this is the
 *  single knob to flip while translations are being filled in. `getDictionary()`
 *  in ./index.ts reads it.
 */

export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];

/** The canonical/fallback language. Portuguese is the source of truth. */
export const DEFAULT_LOCALE: Locale = "pt";

/**
 * 👉 THE TOGGLE. Flip this to preview the site in another language.
 *    "pt" = Portuguese (default) · "en" = English · "es" = Spanish
 */
export const ACTIVE_LOCALE: Locale = "pt";

/** Human-readable names, handy for a future on-site language switcher. */
export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

/** Per-locale HTML/OG metadata (drives <html lang>, og:locale, etc.). */
export const localeMeta: Record<Locale, { htmlLang: string; ogLocale: string }> = {
  pt: { htmlLang: "pt-BR", ogLocale: "pt_BR" },
  en: { htmlLang: "en-US", ogLocale: "en_US" },
  es: { htmlLang: "es-ES", ogLocale: "es_ES" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
