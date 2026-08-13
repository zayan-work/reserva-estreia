import Image from "next/image";
import { Emblem } from "./Emblem";
import type { Dictionary } from "@/lib/content";

/**
 * Full-viewport hero. The wordmark is live text rather than the baked artwork
 * so it translates, scales, and is readable to search engines and screen
 * readers; the silk is the untouched brand background.
 */
export function Hero({ t }: { t: Dictionary }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-bg">
        <Image
          src="/images/hero-silk.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          preload
        />
      </div>

      <div className="hero-inner shell">
        <Emblem className="hero-emblem" title={t.hero.emblemAlt} preload />
        <h1 id="hero-title">{t.hero.wordmark}</h1>
        <p className="subline">{t.hero.subline}</p>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>{t.hero.scrollHint}</span>
        <i />
      </div>
    </section>
  );
}
