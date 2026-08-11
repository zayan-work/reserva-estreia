/**
 * The Meridiano emblem - palm, sun, mountain, horizon and the Copacabana wave,
 * reduced to essential forms inside a thin circular border, per the identity
 * document's "Emblem Construction" section.
 *
 * Drawn as a single-stroke vector so it stays crisp at every size and inherits
 * its colour from `currentColor` (gold everywhere it is used today).
 *
 * NOTE FOR MARIA: this is a faithful vector reconstruction of the emblem in the
 * identity artwork, not the master file. Drop the original SVG/AI export in and
 * replace this component when it is available.
 */
export function Emblem({
  title,
  className,
}: {
  /** Accessible name. Omit for decorative uses - the SVG is then hidden. */
  title?: string;
  className?: string;
}) {
  const decorative = !title;

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <clipPath id="meridiano-emblem-clip">
          <circle cx="32" cy="32" r="29" />
        </clipPath>
      </defs>

      {/* the seal */}
      <circle cx="32" cy="32" r="30.2" strokeWidth="1.1" />

      <g clipPath="url(#meridiano-emblem-clip)">
        {/* sun - simple circle, minimal rays */}
        <circle cx="43.4" cy="21.6" r="3.2" strokeWidth="0.9" />
        <g strokeWidth="0.85" opacity="0.95">
          <path d="M43.4 15.6v-2.3M43.4 29.9v2.3M49.4 21.6h2.3M35.1 21.6h2.3" />
          <path d="M47.65 17.35l1.63-1.63M37.52 27.48l-1.63 1.63M47.65 25.85l1.63 1.63M37.52 15.72l-1.63-1.63" />
        </g>

        {/* mountains - Brazilian coastline silhouette, very abstract */}
        <path
          d="M6 41.5c4.6-.3 7.4-3.2 10.6-6.6 3.1-3.3 5.6-3.1 8.4.3 2.3 2.8 4.2 5 6.6 6.3"
          strokeWidth="0.9"
          opacity="0.9"
        />
        <path
          d="M28 41.8c2.9-1.4 5-3.9 7.4-6.7 2.8-3.3 5.4-3.4 8.3-.2 3 3.3 6 6 10.3 6.6"
          strokeWidth="0.9"
        />

        {/* palm - very simplified, no realistic leaves */}
        <path d="M22.8 45.2c.6-5.4 1.1-9.6 1.5-12.6" strokeWidth="1" />
        <g strokeWidth="0.95">
          <path d="M24.4 31.9c-2.9-2.5-6-3-9.2-1.4" />
          <path d="M24.4 31.9c-2-3.3-4.8-5-8.4-5.1" />
          <path d="M24.4 31.9c.3-3.9 2.2-6.6 5.6-8.2" />
          <path d="M24.4 31.9c2.9-2.2 6-2.7 9.2-1.4" />
          <path d="M24.4 31.9c1.2-3.6.8-6.8-1.3-9.6" />
        </g>

        {/* the Copacabana promenade, abstracted into three parallel waves */}
        <g strokeWidth="0.9">
          <path d="M2 48.4c5-3.4 10-3.4 15 0s10 3.4 15 0 10-3.4 15 0 10 3.4 15 0" />
          <path d="M2 53.2c5-3.4 10-3.4 15 0s10 3.4 15 0 10-3.4 15 0 10 3.4 15 0" />
          <path
            d="M2 58c5-3.4 10-3.4 15 0s10 3.4 15 0 10-3.4 15 0 10 3.4 15 0"
            opacity="0.6"
          />
        </g>
      </g>
    </svg>
  );
}
