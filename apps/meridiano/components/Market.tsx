import Image from "next/image";
import { Reveal } from "./Reveal";
import type { Dictionary } from "@/lib/content";

/**
 * On phones the map sits above the copy; from 900px it becomes a full-bleed
 * background with the paragraph pinned right, matching the approved mockup.
 */
export function Market({ t }: { t: Dictionary }) {
  return (
    <section className="market" id="market" aria-labelledby="market-label">
      <div className="market-media">
        <Image
          src="/images/market-brazil.webp"
          alt={t.market.imageAlt}
          fill
          sizes="100vw"
        />
      </div>

      <div className="shell">
        <Reveal className="market-copy">
          <span className="label" id="market-label">
            {t.market.label}
          </span>
          <p>{t.market.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
