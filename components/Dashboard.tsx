"use client";

import { useCallback, useEffect, useState } from "react";
import { fmt } from "@/lib/anim";

type Stats = {
  reservations: number;
  visits: number;
  conversion: number;
  whatsappPct: number;
  topSize: string | null;
  sizes: Record<string, number>;
  categories: Record<string, number>;
  threshold: number;
};

const CATS: { key: string; label: string }[] = [
  { key: "lingerie", label: "Lingerie" },
  { key: "loungewear", label: "Loungewear" },
  { key: "body", label: "Body" },
  { key: "basicos", label: "Básicos" },
];

const pct1 = (n: number) => n.toFixed(1).replace(".", ",") + "%";
const pct0 = (n: number) => Math.round(n) + "%";

/**
 * Internal demand dashboard (Spec §Page Structure 6). Reads REAL data from
 * /api/stats — reservations, visit→reservation conversion, WhatsApp %, top
 * size, category interest — and shows the production decision rule. This route
 * is protected by Basic Auth in proxy.ts and disallowed in robots.txt.
 */
export default function Dashboard({ initialStats }: { initialStats: Stats }) {
  const [stats, setStats] = useState<Stats>(initialStats);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stats", { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      setStats((await res.json()) as Stats);
      setError(false);
    } catch {
      // keep the last good numbers on screen; live refresh is best-effort
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // defer the first refresh so we don't setState synchronously in the effect
    const kick = setTimeout(refresh, 0);
    const poll = setInterval(refresh, 15000);
    return () => {
      clearTimeout(kick);
      clearInterval(poll);
    };
  }, [refresh]);

  const catMax = stats
    ? Math.max(1, ...CATS.map((c) => stats.categories[c.key] || 0))
    : 1;
  const clears = stats ? stats.reservations >= stats.threshold : false;

  return (
    <section className="dash">
      <div className="wrap" style={{ paddingTop: 22, paddingBottom: 60 }}>
        <div className="dash-bar">
          <span className="logo">
            Estreia<span>.</span>
          </span>
          <button
            className="dash-refresh"
            onClick={refresh}
            disabled={loading}
            type="button"
          >
            {loading ? "Atualizando…" : "↻ Atualizar"}
          </button>
        </div>

        <div className="head">
          <span className="eyebrow" style={{ color: "var(--gold)" }}>
            Painel de demanda · interno
          </span>
          <h2>O que a lista está dizendo</h2>
          <p>
            Leitura ao vivo do teste. Esta seção é para o time, não para o
            público — fica atrás de senha.
          </p>
        </div>

        {error && !stats ? (
          <p className="note" role="alert">
            Não foi possível carregar os números agora.{" "}
            <button
              className="dash-refresh"
              onClick={refresh}
              type="button"
              style={{ marginLeft: 8 }}
            >
              Tentar de novo
            </button>
          </p>
        ) : (
          <>
            <div className="dashgrid">
              <div className="kpi">
                <div className="v">{stats ? fmt(stats.reservations) : "—"}</div>
                <div className="l">Reservas</div>
                <div className="d">total na lista</div>
              </div>
              <div className="kpi">
                <div className="v">{stats ? pct1(stats.conversion) : "—"}</div>
                <div className="l">Conversão</div>
                <div className="d">visita → reserva</div>
              </div>
              <div className="kpi">
                <div className="v">{stats ? pct0(stats.whatsappPct) : "—"}</div>
                <div className="l">Com WhatsApp</div>
                <div className="d">contato forte</div>
              </div>
              <div className="kpi">
                <div className="v">{stats?.topSize || "—"}</div>
                <div className="l">Tamanho top</div>
                <div className="d">mais pedido</div>
              </div>
            </div>

            <div className="bars">
              <h4>Interesse por categoria</h4>
              {CATS.map((c) => {
                const v = stats?.categories[c.key] || 0;
                return (
                  <div className="barrow" key={c.key}>
                    <span className="lbl">{c.label}</span>
                    <div className="track">
                      <div
                        className="fill"
                        style={{ width: `${(v / catMax) * 100}%` }}
                      />
                    </div>
                    <span className="val">{fmt(v)}</span>
                  </div>
                );
              })}
            </div>

            <p className="note">
              <strong>Regra de decisão:</strong> só avançamos para o primeiro
              pedido se as reservas passarem do limite combinado{" "}
              <strong>E</strong> se a divulgação da embaixadora trouxer o tráfego
              previsto. Um sem o outro, a gente pausa.
            </p>
            {stats && (
              <p className="note" style={{ opacity: 1 }}>
                Meta de reservas: <strong>{fmt(stats.threshold)}</strong> ·
                atual: <strong>{fmt(stats.reservations)}</strong> —{" "}
                {clears ? "limite atingido ✓" : "ainda abaixo do limite"}.
                Visitas contadas: {fmt(stats.visits)}.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
