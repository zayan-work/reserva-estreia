import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getDictionary, locales, localePath } from "@/lib/content";

/**
 * Every locale is a real, indexable URL with `hreflang` alternates - the reason
 * the translations live at `/pt` and `/es` rather than behind a client toggle.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [
      getDictionary(locale).htmlLang,
      `${SITE_URL}${localePath(locale)}`,
    ]),
  );

  return locales.map((locale) => ({
    url: `${SITE_URL}${localePath(locale)}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1 : 0.8,
    alternates: { languages },
  }));
}
