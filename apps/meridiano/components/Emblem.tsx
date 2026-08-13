import Image from "next/image";

/**
 * The Meridiano emblem - palm, sun, mountain, horizon and the Copacabana
 * promenade inside a gold seal.
 *
 * This is Maria's master artwork (docs/brand/identity/Logo-Meridiano-circulo.png),
 * cropped to the seal and masked to a transparent disc so it sits on the silk
 * hero, the emerald sections and the blurred header bar alike. The dark field
 * inside the ring is part of the artwork, not a background we added.
 *
 * NOTE: the accompanying .svg is a wrapper around this same bitmap, not a true
 * vector. If a real vector export ever arrives, swap the <Image> for it - every
 * call site here passes only `title` and `className`, so nothing else changes.
 */
export function Emblem({
  title,
  className,
  preload,
}: {
  /** Accessible name. Omit for decorative uses - the image is then hidden. */
  title?: string;
  className?: string;
  /** Set on the one instance that is above the fold. */
  preload?: boolean;
}) {
  const decorative = !title;

  return (
    <Image
      src="/images/emblem.png"
      alt={decorative ? "" : title}
      aria-hidden={decorative || undefined}
      className={className}
      width={478}
      height={478}
      sizes="128px"
      preload={preload}
    />
  );
}
