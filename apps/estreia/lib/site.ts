/**
 * Central site config. Brand name is a codename for now — confirm the final
 * name/domain with Rengan before printing it anywhere permanent (Spec 1.5).
 */

// The public URL — used for SEO canonical, sitemap, Open Graph.
// Priority: explicit env → Vercel's auto-provided domains → placeholder.
// This makes preview/staging deploys produce correct URLs with no config,
// and lets us pin the real domain later once Rengan confirms it (Spec §1.5).
// (Only referenced server-side, so non-public Vercel env vars are safe here.)
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://reserva.estreia.com.br";
}

/**
 * Vercel lists domains without a scheme, so NEXT_PUBLIC_SITE_URL gets pasted in
 * bare more often than not. Accept that shape instead of failing on it: a bare
 * host reaches `new URL()` in the root layout and dies as a plain
 * ERR_INVALID_URL, with nothing in the stack naming the variable at fault.
 */
function normaliseSiteUrl(value: string): string {
  const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  const trimmed = withScheme.replace(/\/+$/, "");
  if (!URL.canParse(trimmed)) {
    throw new Error(
      `Invalid site URL ${JSON.stringify(value)}. Set NEXT_PUBLIC_SITE_URL to ` +
        `a full origin, for example https://example.com.`,
    );
  }
  return trimmed;
}

export const SITE_URL = normaliseSiteUrl(resolveSiteUrl());

export const SITE = {
  brand: "Estreia",
  url: SITE_URL,
  // <title> and meta description — mirror the prototype, tuned for search + share.
  title: "Reserve seu lugar · Coleção Estreia",
  titleTemplate: "%s · Estreia",
  description:
    "A primeira coleção Estreia. Entre na lista de reserva sem pagar nada agora: você garante prioridade e é a primeira a saber quando a peça chega. Feita pra você, produzida no Brasil.",
  locale: "pt_BR",
  lang: "pt-BR",
  keywords: [
    "lista de reserva",
    "coleção de estreia",
    "lingerie brasileira",
    "loungewear",
    "moda íntima",
    "reserva sem compromisso",
    "produzido no Brasil",
  ],
  ogImageAlt:
    "Estreia — A primeira coleção. Feita pra você. Lista de reserva sem compromisso.",
  themeColor: "#4a1830",
} as const;

/**
 * Decision-rule threshold shown on the internal dashboard (Spec Part 2, §6):
 * we only place the production order if reservations clear this threshold AND
 * the ambassador's promotion brought the traffic. Tune with Rengan.
 */
export const DECISION_THRESHOLD = Number(
  process.env.DECISION_THRESHOLD || 500
);
