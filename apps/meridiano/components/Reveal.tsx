"use client";

import { useEffect, useRef } from "react";

/**
 * Soft fade-in on scroll - the only motion on the site.
 * "Very slow. Almost imperceptible. Silk movement." (identity doc, Motion)
 *
 * The hidden state is applied by CSS only under `html.js`, so a visitor without
 * JavaScript gets the whole page rendered and visible. `prefers-reduced-motion`
 * is honoured in the stylesheet.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  ...rest
}: {
  children: React.ReactNode;
  as?: "div" | "section" | "article" | "li";
  className?: string;
  /** Stagger, in ms. Kept small - this should not read as a sequence. */
  delay?: number;
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.dataset.shown = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.dataset.shown = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className ? `reveal ${className}` : "reveal"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
