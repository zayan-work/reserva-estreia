"use client";

import { useEffect } from "react";

/**
 * Fires a single visit beacon per browser session so the internal dashboard
 * can show a visit → reservation conversion. Purely additive; failures are
 * swallowed and never affect the page. (Plausible/GA remain the real traffic
 * source of truth — Spec §1.4.)
 */
export default function VisitBeacon() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem("estreia:visited")) return;
      sessionStorage.setItem("estreia:visited", "1");
    } catch {
      /* private mode — still beacon once per load */
    }
    const ctrl = new AbortController();
    fetch("/api/visit", { method: "POST", signal: ctrl.signal, keepalive: true }).catch(
      () => {}
    );
    return () => ctrl.abort();
  }, []);

  return null;
}
