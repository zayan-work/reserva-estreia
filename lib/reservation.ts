/**
 * Reservation record shape + validation.
 * Fields required by the Build Spec (§1.3): nome, whatsapp, email, tamanho,
 * categorias, timestamp, utm_source, utm_content.
 * THIS IS A RESERVATION ONLY — no payment, no card, no Pix charge is ever
 * captured here. See the deposit slot note in the form (stays OFF).
 */

export const SIZES = ["PP", "P", "M", "G", "GG", "XG", "XXG"] as const;
export type Size = (typeof SIZES)[number];

export const CATEGORIES = ["lingerie", "loungewear", "body", "basicos"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Reservation = {
  id: string;
  nome: string;
  /** normalized E.164-style Brazilian number, e.g. +5511990000000 */
  whatsapp: string;
  /** digits only, used as the dedupe key */
  whatsappDigits: string;
  email: string | null;
  tamanho: Size | null;
  categorias: Category[];
  timestamp: string; // ISO
  utm_source: string | null;
  utm_content: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  /** queue position assigned on first insert (1-based) */
  queue: number;
};

/** Payload coming from the client form (before validation/normalization). */
export type ReservationInput = {
  nome?: unknown;
  whatsapp?: unknown;
  email?: unknown;
  tamanho?: unknown;
  categorias?: unknown;
  utm_source?: unknown;
  utm_content?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  referrer?: unknown;
};

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

/**
 * Validate + normalize a Brazilian WhatsApp number.
 * Accepts: with or without +55 country code, with or without formatting.
 * Rejects junk (too short, bad DDD). Mobile = 11 national digits (DDD + 9 +
 * 8), landline = 10. Returns null when invalid.
 */
export function normalizeWhatsapp(
  raw: unknown
): { e164: string; digits: string } | null {
  let d = str(raw).replace(/\D/g, "");
  if (!d) return null;

  // strip a leading Brazil country code if present
  if ((d.length === 12 || d.length === 13) && d.startsWith("55")) {
    d = d.slice(2);
  }
  // a common paste artifact: leading 0 before the DDD
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);

  if (d.length !== 10 && d.length !== 11) return null;

  const ddd = parseInt(d.slice(0, 2), 10);
  if (isNaN(ddd) || ddd < 11 || ddd > 99) return null;

  // 11-digit numbers are mobile: the 3rd digit must be 9
  if (d.length === 11 && d[2] !== "9") return null;

  return { e164: `+55${d}`, digits: d };
}

export function isValidEmail(raw: unknown): boolean {
  const e = str(raw);
  return e.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

export type ValidationResult =
  | { ok: true; value: CleanReservation }
  | { ok: false; errors: Record<string, string> };

export type CleanReservation = Omit<Reservation, "id" | "queue">;

/**
 * Validate + clean an incoming reservation. Returns field-level errors in
 * Portuguese (matching the form's in-voice error copy).
 */
export function validateReservation(input: ReservationInput): ValidationResult {
  const errors: Record<string, string> = {};

  const nome = str(input.nome);
  if (nome.length < 2) errors.nome = "Falta seu nome";

  const wa = normalizeWhatsapp(input.whatsapp);
  if (!wa) errors.whatsapp = "Confere o WhatsApp";

  const emailRaw = str(input.email);
  let email: string | null = null;
  if (emailRaw) {
    if (!isValidEmail(emailRaw)) errors.email = "Confere o e-mail";
    else email = emailRaw.toLowerCase();
  }

  const tamanhoRaw = str(input.tamanho).toUpperCase();
  const tamanho = (SIZES as readonly string[]).includes(tamanhoRaw)
    ? (tamanhoRaw as Size)
    : null;

  const catsRaw = Array.isArray(input.categorias) ? input.categorias : [];
  const categorias = catsRaw
    .map((c) => str(c).toLowerCase())
    .filter((c): c is Category =>
      (CATEGORIES as readonly string[]).includes(c)
    );

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    value: {
      nome,
      whatsapp: wa!.e164,
      whatsappDigits: wa!.digits,
      email,
      tamanho,
      categorias,
      timestamp: new Date().toISOString(),
      utm_source: str(input.utm_source) || null,
      utm_content: str(input.utm_content) || null,
      utm_medium: str(input.utm_medium) || null,
      utm_campaign: str(input.utm_campaign) || null,
      referrer: str(input.referrer) || null,
    },
  };
}
