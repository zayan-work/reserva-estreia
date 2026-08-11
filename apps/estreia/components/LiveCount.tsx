"use client";

import { useEffect, useRef, useState } from "react";
import { animateNumber, fmt, RESERVED_EVENT } from "@/lib/anim";

/**
 * Hero live counter. Reads the TRUE reservation total from /api/count (not a
 * seed — Spec §2), animates up on first paint, polls for other visitors'
 * reservations, and bumps instantly when this visitor reserves.
 */
export default function LiveCount() {
  const [display, setDisplay] = useState<string>("—");
  const current = useRef<number>(0);
  const cancel = useRef<() => void>(() => {});

  useEffect(() => {
    let alive = true;

    const to = (target: number, dur: number) => {
      cancel.current();
      cancel.current = animateNumber(current.current, target, dur, (v) => {
        if (alive) setDisplay(fmt(v));
      });
      current.current = target;
    };

    const fetchCount = async (dur: number) => {
      try {
        const res = await fetch("/api/count", { cache: "no-store" });
        if (!res.ok) return;
        const { count } = (await res.json()) as { count: number };
        if (alive && typeof count === "number" && count !== current.current) {
          to(count, dur);
        }
      } catch {
        /* offline / transient — keep last value */
      }
    };

    fetchCount(1400);
    const poll = setInterval(() => fetchCount(700), 25000);

    const onReserved = (e: Event) => {
      const count = (e as CustomEvent<{ count: number }>).detail?.count;
      if (typeof count === "number") to(count, 700);
    };
    window.addEventListener(RESERVED_EVENT, onReserved);

    return () => {
      alive = false;
      cancel.current();
      clearInterval(poll);
      window.removeEventListener(RESERVED_EVENT, onReserved);
    };
  }, []);

  return (
    <div className="big" aria-live="polite">
      {display}
    </div>
  );
}
