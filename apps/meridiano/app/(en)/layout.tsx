import type { Metadata, Viewport } from "next";
import { Document } from "@/components/Document";
import { SITE, metadataFor } from "@/lib/site";
import "../globals.css";

/**
 * Root layout for English, served at `/`.
 *
 * There is a second root layout at `app/(intl)/[locale]/layout.tsx` for the
 * prefixed locales. Two root layouts is what lets `<html lang>` be correct per
 * URL - see components/Document.tsx.
 */
export const metadata: Metadata = metadataFor("en");

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE.themeColor,
  colorScheme: "dark",
};

export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Document locale="en">{children}</Document>;
}
