/**
 * The symbol family derived from the emblem - one icon per brand concept.
 * Gold only, very thin line, rounded corners, no fills, no gradients.
 */
import type { Pillar } from "@/lib/content";

const shared = {
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** Origin, energy, creation. Simple circle, minimal rays. */
function Sun({ className }: { className?: string }) {
  return (
    <svg {...shared} className={className}>
      <circle cx="20" cy="20" r="6.4" />
      <path d="M20 5.2v4.2M20 30.6v4.2M34.8 20h-4.2M9.4 20H5.2" />
      <path d="M30.46 9.54l-2.97 2.97M12.51 27.49l-2.97 2.97M30.46 30.46l-2.97-2.97M12.51 12.51l-2.97-2.97" />
    </svg>
  );
}

/** Brazil, nature, growth. Very simplified - no realistic leaves. */
function Palm({ className }: { className?: string }) {
  return (
    <svg {...shared} className={className}>
      <path d="M19.4 34.6c.5-7.6 1-13 1.4-16.4" />
      <path d="M20.8 17.4c-3.5-3.1-7.3-3.7-11.2-1.8" />
      <path d="M20.8 17.4c-2.4-4-5.9-6-10.2-6.2" />
      <path d="M20.8 17.4c.4-4.7 2.7-8 6.8-10" />
      <path d="M20.8 17.4c3.5-2.7 7.3-3.3 11.2-1.8" />
      <path d="M20.8 17.4c1.5-4.4 1-8.3-1.6-11.7" />
    </svg>
  );
}

/** Movement, trade, global reach. Three parallel waves. */
function Waves({ className }: { className?: string }) {
  return (
    <svg {...shared} className={className}>
      <path d="M4 13.6c2.7-2.9 5.3-2.9 8 0s5.3 2.9 8 0 5.3-2.9 8 0 5.3 2.9 8 0" />
      <path d="M4 20c2.7-2.9 5.3-2.9 8 0s5.3 2.9 8 0 5.3-2.9 8 0 5.3 2.9 8 0" />
      <path d="M4 26.4c2.7-2.9 5.3-2.9 8 0s5.3 2.9 8 0 5.3-2.9 8 0 5.3 2.9 8 0" />
    </svg>
  );
}

/** Future, vision, the meridian. One elegant curved line. */
function Horizon({ className }: { className?: string }) {
  return (
    <svg {...shared} className={className}>
      <path d="M3.6 24.8C9.2 17.6 14.6 14 20 14s10.8 3.6 16.4 10.8" />
      <path d="M3.6 30.4h32.8" opacity="0.5" />
    </svg>
  );
}

const registry = {
  sun: Sun,
  palm: Palm,
  waves: Waves,
  horizon: Horizon,
} satisfies Record<Pillar["icon"], (p: { className?: string }) => React.ReactElement>;

export function PillarIcon({
  name,
  className,
}: {
  name: Pillar["icon"];
  className?: string;
}) {
  const Icon = registry[name];
  return <Icon className={className} />;
}
