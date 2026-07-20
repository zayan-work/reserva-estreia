/** Client-side helpers for the live counters. */

export const fmt = (n: number) => Math.round(n).toLocaleString("pt-BR");

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Ease a number from `from` to `to`, calling `onFrame` with each value.
 * Honors reduced-motion by jumping straight to the target. Returns a cancel fn.
 */
export function animateNumber(
  from: number,
  to: number,
  dur: number,
  onFrame: (v: number) => void
): () => void {
  if (prefersReducedMotion() || dur <= 0) {
    onFrame(to);
    return () => {};
  }
  let raf = 0;
  let start: number | null = null;
  const step = (ts: number) => {
    if (start === null) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    onFrame(from + (to - from) * (1 - Math.pow(1 - p, 3)));
    if (p < 1) raf = requestAnimationFrame(step);
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

/** Custom event the form dispatches so the hero counter bumps on a new reserve. */
export const RESERVED_EVENT = "estreia:reserved";
