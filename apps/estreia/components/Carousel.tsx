"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { STYLES } from "@/lib/collection";
import Image from "next/image";

/** Editorial carousel — "Opções & estilos" (v0.0.2 spec §2.3).
 *  Native scroll-snap does the moving, so touch swipe works with zero JS and
 *  the arrows/dots are pure enhancement. Mobile gets dots, ≥768px gets arrows. */
export default function Carousel() {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);

  /** Distance from one card's left edge to the next, gap included. */
  const stepOf = (el: HTMLDivElement) => {
    const a = el.children[0] as HTMLElement | undefined;
    const b = el.children[1] as HTMLElement | undefined;
    return a && b ? b.offsetLeft - a.offsetLeft : el.clientWidth;
  };

  const behavior = (): ScrollBehavior =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setAtStart(scrollLeft <= 2);
    setAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 2);
    setActive(
      Math.max(0, Math.min(STYLES.length - 1, Math.round(scrollLeft / stepOf(el))))
    );
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    sync();
    // Card widths are vw/clamp based, so re-measure on any layout change.
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const scrollTo = (index: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: index * stepOf(el), behavior: behavior() });
  };

  const nudge = (dir: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * stepOf(el), behavior: behavior() });
  };

  return (
    <section className="carousel" aria-labelledby="colecao-title">
      <div className="wrap">
        <div className="head center">
          <span className="eyebrow">Opções &amp; estilos</span>
          <h2 id="colecao-title">A coleção, do seu jeito.</h2>
          <p>
            Modelagens, cores e texturas para acompanhar diferentes momentos,
            estilos e corpos. Porque conforto também é se reconhecer na peça.
          </p>
        </div>
      </div>

      <div className="carouselViewport">
        <div
          ref={track}
          className="carouselTrack"
          onScroll={sync}
          role="region"
          aria-label="Carrossel de opções e estilos da coleção"
          tabIndex={0}
        >
          {STYLES.map((s) => (
            <figure className="carouselCard" key={s.src}>
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 900px) 320px, (min-width: 768px) 280px, 72vw"
              />
              <figcaption>
                <span>{s.label}</span>
                <p>{s.body}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="carouselDots" aria-hidden="true">
          {STYLES.map((s, i) => (
            <button
              type="button"
              key={s.src}
              className={i === active ? "on" : undefined}
              onClick={() => scrollTo(i)}
              tabIndex={-1}
            />
          ))}
        </div>

        <div className="carouselNav">
          <button
            type="button"
            onClick={() => nudge(-1)}
            disabled={atStart}
            aria-label="Ver estilos anteriores"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            disabled={atEnd}
            aria-label="Ver mais estilos"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
