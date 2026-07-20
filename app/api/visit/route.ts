import { NextResponse } from "next/server";
import { incrementVisit } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/visit — lightweight visit beacon used to compute the
 * visit → reservation conversion on the internal dashboard. The landing page
 * fires this once per browser session. (Plausible/GA remain the source of
 * truth for traffic; this gives the team an at-a-glance conversion number.)
 */
export async function POST() {
  try {
    await incrementVisit();
  } catch {
    // best-effort: a missed visit beacon must never break the page
  }
  return new NextResponse(null, { status: 204 });
}
