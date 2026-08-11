/**
 * Central site config - domain, SEO defaults, and the shared metadata builder.
 *
 * Domain confirmed by Rengan (11 Aug 2026): meridianocasa.com.
 */
import type { Metadata } from "next";
import {
  DEFAULT_LOCALE,
  getDictionary,
  locales,
  localePath,
  type Locale,
} from "./content";

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://meridianocasa.com";
}

export const SITE_URL = resolveSiteUrl().replace(/\/$/, "");

export const SITE = {
  brand: "Meridiano",
  url: SITE_URL,
  themeColor: "#0F3A2E",
} as const;

/**
 * The generated share card at `app/opengraph-image.tsx`.
 *
 * Referenced explicitly rather than left to file-convention discovery: the site
 * uses one root layout per locale, so the generator does not sit in any single
 * layout's segment chain and Next does not attach it on its own.
 */
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Meridiano: a Brazilian creator-led house of apparel and beauty.",
} as const;

/** `hreflang` alternates - every locale points at every other locale. */
function languageAlternates(): Record<string, string> {
  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    alternates[getDictionary(locale).htmlLang] = localePath(locale);
  }
  alternates["x-default"] = localePath(DEFAULT_LOCALE);
  return alternates;
}

/**
 * Metadata for one locale's page. Canonical is the locale's own path, so `/pt`
 * is canonical for Portuguese rather than pointing back at English.
 */
export function metadataFor(locale: Locale): Metadata {
  const t = getDictionary(locale);
  const path = localePath(locale);

  return {
    metadataBase: new URL(SITE.url),
    title: t.meta.title,
    description: t.meta.description,
    applicationName: SITE.brand,
    authors: [{ name: SITE.brand }],
    creator: SITE.brand,
    publisher: SITE.brand,
    alternates: {
      canonical: path,
      languages: languageAlternates(),
    },
    formatDetection: { telephone: false, email: false, address: false },
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      url: path,
      siteName: SITE.brand,
      title: t.meta.title,
      description: t.meta.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}
