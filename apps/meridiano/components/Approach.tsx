import { Reveal } from "./Reveal";
import type { Dictionary } from "@/lib/content";

export function Approach({ t }: { t: Dictionary }) {
  return (
    <section
      className="section approach"
      id="approach"
      aria-labelledby="approach-title"
    >
      <div className="shell">
        <Reveal className="section-head">
          <span className="label">{t.approach.label}</span>
          <h2 className="display" id="approach-title">
            {t.approach.title}
          </h2>
        </Reveal>

        <ul className="approach-grid">
          {t.approach.cards.map((card, i) => (
            <Reveal
              as="li"
              className="approach-card"
              key={card.index}
              delay={i * 110}
            >
              <span className="n" aria-hidden="true">
                {card.index}
              </span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
