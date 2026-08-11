import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { CleanReservation, Reservation } from "./reservation";
import { computeStats, type Stats } from "./stats";

/* =========================================================================
   Reservation store (Build Spec §1.3 — "the one thing that must work").
   Every reservation is persisted. The default adapter is a JSON file store
   which works on any persistent Node host and in local dev.

   PRODUCTION DESTINATIONS
   - Persistent host (VPS / Render / Railway / Fly / `next start`): the file
     store below is durable. Set DATA_DIR to a writable, persistent path.
   - Serverless (Vercel): the filesystem is ephemeral, so ALSO set
     RESERVATIONS_WEBHOOK_URL to a Google Sheet / Airtable / CRM endpoint
     (Zapier/Make/Apps Script). Each reservation is mirrored there durably.
   - Swap in a managed DB (Supabase/Airtable) by implementing the same small
     surface used below (add / list / visits). Kept intentionally minimal.
   ========================================================================= */

type DB = { reservations: Reservation[]; visits: number };

// On Vercel the only writable path is /tmp (and it is EPHEMERAL — fine for a
// preview/approval deploy, not for the real traffic test). Locally we use
// ./.data. For durable production, set DATA_DIR to a persistent volume OR set
// RESERVATIONS_WEBHOOK_URL to mirror every reservation to a Sheet/CRM.
const DATA_DIR =
  process.env.DATA_DIR ||
  (process.env.VERCEL ? "/tmp/estreia-data" : path.join(process.cwd(), ".data"));
const DATA_FILE = path.join(DATA_DIR, "reservations.json");

// Survive HMR in dev (module re-evaluation) by stashing state on globalThis.
const g = globalThis as unknown as {
  __estreiaDB?: DB;
  __estreiaLock?: Promise<unknown>;
  __estreiaLoaded?: boolean;
};

async function load(): Promise<DB> {
  if (g.__estreiaDB) return g.__estreiaDB;
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<DB>;
    g.__estreiaDB = {
      reservations: Array.isArray(parsed.reservations)
        ? parsed.reservations
        : [],
      visits: typeof parsed.visits === "number" ? parsed.visits : 0,
    };
  } catch {
    g.__estreiaDB = { reservations: [], visits: 0 };
  }
  return g.__estreiaDB;
}

async function persist(db: DB): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(db, null, 2), "utf8");
}

/** Serialize read-modify-write ops so concurrent submits don't clobber. */
function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const prev = g.__estreiaLock ?? Promise.resolve();
  const next = prev.then(fn, fn);
  g.__estreiaLock = next.catch(() => {});
  return next;
}

/** Fire-and-forget mirror to the team's real destination (Sheet/CRM). */
function mirror(reservation: Reservation): void {
  const url = process.env.RESERVATIONS_WEBHOOK_URL;
  if (!url) return;
  // Do not block the response on the webhook; log failures for QA.
  void fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(reservation),
  }).catch((err) => {
    console.error("[reservations] webhook mirror failed:", err);
  });
}

export type AddResult = { reservation: Reservation; isNew: boolean };

/**
 * Add a reservation. Dedupe rule (Spec §Data capture): the same WhatsApp
 * twice is an UPDATE, not a double-count — the original queue number is kept.
 */
export async function addReservation(
  clean: CleanReservation
): Promise<AddResult> {
  return withLock(async () => {
    const db = await load();
    const existing = db.reservations.find(
      (r) => r.whatsappDigits === clean.whatsappDigits
    );

    if (existing) {
      existing.nome = clean.nome;
      existing.email = clean.email ?? existing.email;
      existing.tamanho = clean.tamanho ?? existing.tamanho;
      existing.categorias = clean.categorias.length
        ? clean.categorias
        : existing.categorias;
      existing.timestamp = clean.timestamp;
      // keep attribution from the first touch if we already have it
      existing.utm_source = existing.utm_source ?? clean.utm_source;
      existing.utm_content = existing.utm_content ?? clean.utm_content;
      existing.utm_medium = existing.utm_medium ?? clean.utm_medium;
      existing.utm_campaign = existing.utm_campaign ?? clean.utm_campaign;
      await persist(db);
      mirror(existing);
      return { reservation: existing, isNew: false };
    }

    const reservation: Reservation = {
      id: randomUUID(),
      ...clean,
      queue: db.reservations.length + 1,
    };
    db.reservations.push(reservation);
    await persist(db);
    mirror(reservation);
    return { reservation, isNew: true };
  });
}

export async function getCount(): Promise<number> {
  const db = await load();
  return db.reservations.length;
}

export async function incrementVisit(): Promise<void> {
  await withLock(async () => {
    const db = await load();
    db.visits += 1;
    await persist(db);
  });
}

export async function getStats(): Promise<Stats> {
  const db = await load();
  return computeStats(db.reservations, db.visits);
}
