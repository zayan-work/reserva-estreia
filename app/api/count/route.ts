import { NextResponse } from "next/server";
import { getCount } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/count — PUBLIC. Just the live reservation total for the hero
 * counter. This is the true count from the data source, not a seed (Spec §2).
 */
export async function GET() {
  try {
    const count = await getCount();
    return NextResponse.json(
      { count },
      { headers: { "cache-control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
