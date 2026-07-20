import type { Metadata } from "next";
import Dashboard from "@/components/Dashboard";
import { DECISION_THRESHOLD } from "@/lib/site";
import { getStats } from "@/lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Internal route — keep it out of search results (proxy.ts also gates it).
export const metadata: Metadata = {
  title: "Painel de demanda",
  robots: { index: false, follow: false },
};

/**
 * Server-rendered behind proxy.ts Basic Auth. We read the stats on the server
 * (already authenticated) so real data is on screen at first paint; the client
 * then live-refreshes via /api/stats.
 */
export default async function PainelPage() {
  const stats = await getStats();
  return <Dashboard initialStats={{ ...stats, threshold: DECISION_THRESHOLD }} />;
}
