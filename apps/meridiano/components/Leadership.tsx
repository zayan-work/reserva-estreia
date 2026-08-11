import Image from "next/image";
import { Reveal } from "./Reveal";
import type { Dictionary } from "@/lib/content";

export function Leadership({ t }: { t: Dictionary }) {
  return (
    <section
      className="section leadership"
      id="leadership"
      aria-labelledby="leadership-title"
    >
      <div className="leadership-bg">
        <Image
          src="/images/leadership-silk.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
        />
      </div>

      <div className="shell">
        <Reveal className="section-head">
          <span className="label">{t.leadership.label}</span>
          <h2 className="display" id="leadership-title">
            {t.leadership.title}
          </h2>
        </Reveal>

        <div className="people">
          {t.leadership.people.map((person, i) => (
            <Reveal
              as="article"
              className="person"
              key={person.email}
              delay={i * 120}
            >
              <span className="role">{person.role}</span>
              <div>
                <h3>{person.name}</h3>
                <p>{person.bio}</p>
                <a href={`mailto:${person.email}`}>{person.email}</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
