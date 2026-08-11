import { fontClassName } from "@/lib/fonts";
import { getDictionary, type Locale } from "@/lib/content";

/**
 * The single <html>/<body> shell.
 *
 * The site uses one root layout per locale (via route groups) so that
 * `<html lang>` is genuinely correct on every URL rather than a single
 * hardcoded value - this component is what keeps those layouts from
 * duplicating each other.
 */
export function Document({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const t = getDictionary(locale);

  return (
    // suppressHydrationWarning covers exactly one thing: the script below adds
    // a `js` class to this element before React hydrates, so the client sees a
    // className the server did not render. The suppression applies to this
    // element's own attributes only - children are still checked normally.
    <html
      lang={t.htmlLang}
      className={fontClassName}
      suppressHydrationWarning
    >
      <body>
        {/* Marks JS as available so the scroll reveal can hide elements before
            showing them. Without it every section renders visible, which is the
            correct no-JS fallback. Runs before paint, so there is no flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <a className="skip" href="#main">
          {t.nav.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
