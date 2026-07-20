import { NextResponse } from "next/server";
import { validateReservation } from "@/lib/reservation";
import { addReservation, getCount } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/reservations — the core (Spec §1.3).
 * Validates, dedupes by WhatsApp, persists, returns the caller's queue number
 * and the live total. NO payment is ever processed here.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { form: "Envio inválido" } },
      { status: 400 }
    );
  }

  const result = validateReservation(body as Record<string, unknown>);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, errors: result.errors },
      { status: 422 }
    );
  }

  try {
    const { reservation, isNew } = await addReservation(result.value);
    const count = await getCount();
    return NextResponse.json({
      ok: true,
      queue: reservation.queue,
      count,
      isNew,
    });
  } catch (err) {
    console.error("[reservations] failed to persist:", err);
    return NextResponse.json(
      { ok: false, errors: { form: "Não deu para salvar agora. Tente de novo." } },
      { status: 500 }
    );
  }
}
