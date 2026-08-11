import { notFound } from "next/navigation";
import { Page } from "@/components/Page";
import { isLocale, type Locale } from "@/lib/content";

export default async function LocalisedHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === "en") notFound();

  return <Page locale={locale as Locale} />;
}
