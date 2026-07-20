import { CATEGORIES, SIZES } from "./reservation";
import type { Category, Reservation, Size } from "./reservation";

export type Stats = {
  reservations: number;
  visits: number;
  /** visit → reservation, percent (0 when no visits yet) */
  conversion: number;
  /** share of reservations that left a WhatsApp, percent */
  whatsappPct: number;
  topSize: Size | null;
  sizes: Record<Size, number>;
  categories: Record<Category, number>;
};

/** Pure aggregation — shared by every storage adapter and the dashboard. */
export function computeStats(
  reservations: Reservation[],
  visits: number
): Stats {
  const sizes = Object.fromEntries(SIZES.map((s) => [s, 0])) as Record<
    Size,
    number
  >;
  const categories = Object.fromEntries(
    CATEGORIES.map((c) => [c, 0])
  ) as Record<Category, number>;

  let withWhats = 0;
  for (const r of reservations) {
    if (r.whatsappDigits) withWhats++;
    if (r.tamanho && r.tamanho in sizes) sizes[r.tamanho]++;
    for (const c of r.categorias) if (c in categories) categories[c]++;
  }

  let topSize: Size | null = null;
  let max = 0;
  for (const s of SIZES) {
    if (sizes[s] > max) {
      max = sizes[s];
      topSize = s;
    }
  }

  const total = reservations.length;
  return {
    reservations: total,
    visits,
    conversion: visits > 0 ? Math.min(100, (total / visits) * 100) : 0,
    whatsappPct: total > 0 ? (withWhats / total) * 100 : 0,
    topSize,
    sizes,
    categories,
  };
}
