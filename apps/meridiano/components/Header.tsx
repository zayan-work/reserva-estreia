"use client";

import { useEffect, useState } from "react";
import { Emblem } from "./Emblem";
import {
  localeNames,
  localePath,
  locales,
  type Dictionary,
  type Locale,
} from "@/lib/content";

/**
 * Fixed header. Transparent over the hero, then materialises into a blurred
 * emerald bar once the page scrolls - so the hero reads as one uninterrupted
 * image on load.
 */
export function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [atop, setAtop] = useState(true);

  useEffect(() => {
    const onScroll = () => setAtop(window.scrollY < 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sections = [
    ["essence", t.nav.essence],
    ["market", t.nav.market],
    ["portfolio", t.nav.portfolio],
    ["approach", t.nav.approach],
    ["leadership", t.nav.leadership],
    ["contact", t.nav.contact],
  ] as const;

  return (
    <header className="header" data-atop={atop}>
      <div className="shell">
        <a className="brandmark" href={localePath(locale)}>
          <Emblem />
          <span>Meridiano</span>
        </a>

        <nav className="navlinks" aria-label={t.nav.menuLabel}>
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>

        {/* Plain anchors on purpose: each locale has its own root layout, so
            switching language must replace the document to change <html lang>.
            A client-side transition cannot do that. */}
        <nav className="langswitch" aria-label="Language">
          {locales.map((code, i) => (
            <span key={code} style={{ display: "contents" }}>
              {i > 0 && (
                <span className="sep" aria-hidden="true">
                  |
                </span>
              )}
              <a
                href={localePath(code)}
                hrefLang={code}
                aria-current={code === locale ? "true" : undefined}
              >
                {localeNames[code]}
              </a>
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
}
