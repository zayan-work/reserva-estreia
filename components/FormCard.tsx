"use client";

import { useEffect, useRef, useState } from "react";
import { fmt, RESERVED_EVENT } from "@/lib/anim";
import { CATEGORIES, normalizeWhatsapp, SIZES } from "@/lib/reservation";
import { Check } from "./icons";

type FieldErrors = Partial<
  Record<"nome" | "whatsapp" | "email" | "form", string>
>;

const CATEGORY_LABELS: Record<(typeof CATEGORIES)[number], string> = {
  lingerie: "Lingerie",
  loungewear: "Loungewear",
  body: "Body",
  basicos: "Básicos do dia a dia",
};

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void;
  }
}

/**
 * The reservation form (Spec §Page Structure 5 — "the core"). Validates,
 * POSTs to /api/reservations, shows the success state with the queue number,
 * and bumps the live counter. RESERVATION ONLY — no payment is captured.
 */
export default function FormCard() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<number | null>(null); // queue number
  const formRef = useRef<HTMLFormElement>(null);

  // Attribution: capture UTMs + referrer once, so the ambassador's traffic is
  // measurable (Spec §1.4). Read from the URL to survive client-only routing.
  const attribution = useRef<Record<string, string>>({});
  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const a: Record<string, string> = {};
      for (const k of ["utm_source", "utm_content", "utm_medium", "utm_campaign"]) {
        const v = p.get(k);
        if (v) a[k] = v;
      }
      if (document.referrer) a.referrer = document.referrer;
      attribution.current = a;
    } catch {
      /* ignore */
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const nome = String(data.get("nome") || "").trim();
    const whatsapp = String(data.get("whatsapp") || "").trim();
    const email = String(data.get("email") || "").trim();
    const tamanho = String(data.get("size") || "");
    const categorias = data.getAll("categoria").map(String);

    // client-side validation mirrors the server's in-voice messages
    const next: FieldErrors = {};
    if (nome.length < 2) next.nome = "Falta seu nome";
    if (!normalizeWhatsapp(whatsapp)) next.whatsapp = "Confere o WhatsApp";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Confere o e-mail";
    if (Object.keys(next).length > 0) {
      setErrors(next);
      focusFirstError(next);
      return;
    }

    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          nome,
          whatsapp,
          email,
          tamanho,
          categorias,
          ...attribution.current,
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json?.ok) {
        setErrors(
          json?.errors || {
            form: "Não deu para reservar agora. Tente de novo em instantes.",
          }
        );
        focusFirstError(json?.errors || {});
        return;
      }

      // success — bump the hero counter and record the conversion event
      window.dispatchEvent(
        new CustomEvent(RESERVED_EVENT, { detail: { count: json.count } })
      );
      window.plausible?.("Reserva");
      setDone(typeof json.queue === "number" ? json.queue : json.count);
    } catch {
      setErrors({ form: "Sem conexão. Confira a internet e tente de novo." });
    } finally {
      setSubmitting(false);
    }
  }

  function focusFirstError(errs: FieldErrors) {
    const order: (keyof FieldErrors)[] = ["nome", "whatsapp", "email"];
    const first = order.find((k) => errs[k]);
    if (first && formRef.current) {
      const el = formRef.current.elements.namedItem(first) as HTMLElement | null;
      el?.focus();
    }
  }

  if (done !== null) {
    return (
      <div className="formCard">
        <div className="done" role="status">
          <div className="ring">
            <Check />
          </div>
          <h3>Lugar reservado!</h3>
          <p>
            Você está na lista de prioridade. Vamos te chamar no WhatsApp assim
            que a coleção chegar.
          </p>
          <div className="num">#{fmt(done)}</div>
          <p style={{ fontSize: ".85rem" }}>Esse é o seu número na fila.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="formCard">
      <form ref={formRef} onSubmit={onSubmit} noValidate>
        <h3>Reserve seu lugar</h3>
        <p className="sub">Sem cobrança. Você só entra na lista de prioridade.</p>

        <div className="field">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            autoComplete="given-name"
            placeholder="Como você quer ser chamada"
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? "nome-err" : undefined}
          />
          {errors.nome && (
            <p className="err-msg" id="nome-err">
              {errors.nome}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="whatsapp">WhatsApp</label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(11) 90000-0000"
            aria-invalid={!!errors.whatsapp}
            aria-describedby={errors.whatsapp ? "whatsapp-err" : undefined}
          />
          {errors.whatsapp && (
            <p className="err-msg" id="whatsapp-err">
              {errors.whatsapp}
            </p>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">
            E-mail <span style={{ fontWeight: 400, color: "var(--muted)" }}>(opcional)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="email"
            placeholder="voce@email.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-err" : undefined}
          />
          {errors.email && (
            <p className="err-msg" id="email-err">
              {errors.email}
            </p>
          )}
        </div>

        <fieldset className="field">
          <legend className="grouplbl">Tamanho de interesse</legend>
          <div className="sizes">
            {SIZES.map((s) => (
              <span key={s}>
                <input type="radio" name="size" id={`size-${s}`} value={s} />
                <label htmlFor={`size-${s}`}>{s}</label>
              </span>
            ))}
          </div>
        </fieldset>

        <fieldset className="field">
          <legend className="grouplbl">O que você mais quer ver primeiro?</legend>
          <div className="cats">
            {CATEGORIES.map((c) => (
              <label key={c}>
                <input type="checkbox" name="categoria" value={c} />
                {CATEGORY_LABELS[c]}
              </label>
            ))}
          </div>
        </fieldset>

        {/*
          DEPOSIT SLOT — architected but DISABLED ON PURPOSE.
          Do NOT enable, wire, or make this functional. It collects no money.
          It stays OFF until legal (Felipe) clears the escrow structure AND
          Rengan confirms in writing. If anyone asks to turn on payments, the
          answer is "not until Rengan confirms Felipe signed off." (Spec — Read
          This First / §5 / Part 3 "The deposit slot").
        */}
        <div className="depositSlot" aria-hidden="true">
          <div className="row">
            <span className="pix">
              <span className="pixmark">pix</span> Garantir com sinal reembolsável
            </span>
            <span className="badge">Em breve</span>
          </div>
          <p>
            Em uma próxima fase, quem quiser poderá garantir a reserva com um
            sinal simbólico e 100% reembolsável via Pix. Ainda não está ativo.
          </p>
        </div>

        {errors.form && (
          <p className="err-msg" role="alert" style={{ marginTop: 4 }}>
            {errors.form}
          </p>
        )}

        <button className="submit" type="submit" disabled={submitting}>
          {submitting ? "Reservando…" : "Reservar meu lugar"}
        </button>
        <p className="micro">
          Reservar não é comprar e não gera cobrança. Guardamos seus dados
          apenas para te avisar sobre a coleção, conforme a{" "}
          <a href="#privacidade">Política de Privacidade</a> e a LGPD. Você pode
          sair da lista quando quiser.
        </p>
      </form>
    </div>
  );
}
