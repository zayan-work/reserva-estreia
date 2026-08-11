import Link from "next/link";
import { Emblem } from "@/components/Emblem";
import { fontClassName } from "@/lib/fonts";
import { getDictionary } from "@/lib/content";
import { SITE } from "@/lib/site";
import "./globals.css";

/**
 * 404 for any URL outside the three locale pages.
 *
 * The site has one root layout per locale, so an unmatched path has no locale
 * to resolve - Next wraps this in its own bare <html>. The font variables and
 * background are therefore applied here rather than inherited.
 */
export const metadata = {
  // Set even though this page is noindex - without it Next warns during build
  // that it cannot resolve absolute URLs for this segment.
  metadataBase: new URL(SITE.url),
  title: "Meridiano",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const t = getDictionary("en");

  return (
    <div
      className={fontClassName}
      style={{
        minHeight: "100svh",
        background: "var(--emerald)",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <div>
        <Emblem
          className="hero-emblem"
          title={t.hero.emblemAlt}
        />
        <p className="label" style={{ marginBottom: "18px" }}>
          404
        </p>
        <Link
          href="/"
          className="display"
          style={{
            fontSize: "1.6rem",
            color: "var(--gold)",
            textDecoration: "none",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}
        >
          Meridiano
        </Link>
      </div>
    </div>
  );
}
