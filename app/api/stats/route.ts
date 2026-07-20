import { NextResponse } from "next/server";
import { getStats } from "@/lib/store";
import { DECISION_THRESHOLD } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/stats — INTERNAL. Full demand read for the dashboard.
 * Protected by Basic Auth in proxy.ts (never faces the public, Spec §6).
 */
export async function GET() {
  try {
    const stats = await getStats();
    return NextResponse.json(
      { ...stats, threshold: DECISION_THRESHOLD },
      { headers: { "cache-control": "no-store" } }
    );
  } catch (err) {
    console.error("[stats] failed:", err);
    return NextResponse.json({ error: "stats_unavailable" }, { status: 500 });
  }
}
