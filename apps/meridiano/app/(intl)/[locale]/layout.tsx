import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Document } from "@/components/Document";
import { SITE, metadataFor } from "@/lib/site";
import { PREFIXED_LOCALES, isLocale, type Locale } from "@/lib/content";
import "../../globals.css";

/** Only `/pt` and `/es` exist - English lives at `/`, not `/en`. */
export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return metadataFor(isLocale(locale) ? locale : "en");
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE.themeColor,
  colorScheme: "dark",
};

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();

  return <Document locale={locale as Locale}>{children}</Document>;
}
