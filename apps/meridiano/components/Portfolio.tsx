import Image from "next/image";
import { Reveal } from "./Reveal";
import type { Dictionary } from "@/lib/content";

/**
 * The three category cards.
 *
 * Maria's artwork is used exactly as delivered: full square, no crop, no colour
 * change, and no text laid over it - the category name, tagline and launch year
 * are already set into the image. A light scrim just settles the card into the
 * grid.
 *
 * Because the words live in the pixels, the localised name and tagline are
 * carried in `alt` instead. That keeps the cards readable to screen readers and
 * to search engines, and keeps them meaningful on /pt and /es, where the
 * artwork itself stays English.
 */
export function Portfolio({ t }: { t: Dictionary }) {
  return (
    <section
      className="section portfolio"
      id="portfolio"
      aria-labelledby="portfolio-title"
    >
      <div className="shell">
        <Reveal className="section-head">
          <span className="label">{t.portfolio.label}</span>
          <h2 className="display" id="portfolio-title">
            {t.portfolio.title}
          </h2>
        </Reveal>

        <ul className="portfolio-grid">
          {t.portfolio.cards.map((card, i) => (
            <Reveal as="li" className="card" key={card.key} delay={i * 110}>
              <Image
                src={`/images/portfolio-${card.key}.webp`}
                alt={`${card.name}. ${card.tagline} ${card.status}.`}
                fill
                sizes="(min-width: 780px) 33vw, 100vw"
              />
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="portfolio-note">{t.portfolio.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
