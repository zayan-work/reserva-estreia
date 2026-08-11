import { Emblem } from "./Emblem";
import { PillarIcon } from "./Icons";
import { Reveal } from "./Reveal";
import type { Dictionary } from "@/lib/content";

export function Essence({ t }: { t: Dictionary }) {
  return (
    <section className="section essence" id="essence" aria-labelledby="essence-title">
      <div className="shell">
        <Reveal>
          <Emblem className="essence-emblem" />
          <div className="section-head">
            <span className="label">{t.essence.label}</span>
            <h2 className="display" id="essence-title">
              {t.essence.title}
            </h2>
          </div>
          <p className="body-copy lede">{t.essence.body}</p>
        </Reveal>

        <ul className="pillars">
          {t.essence.pillars.map((pillar, i) => (
            <Reveal as="li" className="pillar" key={pillar.index} delay={i * 90}>
              <PillarIcon name={pillar.icon} />
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
