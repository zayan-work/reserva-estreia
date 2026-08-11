"use client";

import { useId, useState } from "react";
import type { Dictionary } from "@/lib/content";

type State = "idle" | "sending" | "sent" | "error";

/**
 * One field, one button - per the handoff. Spam is handled by a honeypot
 * rather than a visible captcha.
 */
export function ContactForm({ t, locale }: { t: Dictionary; locale: string }) {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");
  const fieldId = useId();
  const noteId = useId();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    if (!message.trim()) {
      setState("error");
      return;
    }

    setState("sending");
    const form = event.currentTarget;
    const honeypot = (
      form.elements.namedItem("company") as HTMLInputElement | null
    )?.value;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, company: honeypot, locale }),
      });
      setState(response.ok ? "sent" : "error");
      if (response.ok) setMessage("");
    } catch {
      setState("error");
    }
  }

  const note =
    state === "sent"
      ? t.contact.formSuccess
      : state === "error"
        ? message.trim()
          ? t.contact.formError
          : t.contact.formEmptyError
        : null;

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <label className="label" htmlFor={fieldId}>
        {t.contact.formLabel}
      </label>

      <textarea
        id={fieldId}
        name="message"
        rows={3}
        placeholder={t.contact.formPlaceholder}
        value={message}
        onChange={(event) => {
          setMessage(event.target.value);
          if (state === "error" || state === "sent") setState("idle");
        }}
        aria-describedby={note ? noteId : undefined}
        aria-invalid={state === "error" || undefined}
      />

      {/* honeypot - a real person never sees or fills this */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`${fieldId}-company`}>Company</label>
        <input
          id={`${fieldId}-company`}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button type="submit" disabled={state === "sending" || state === "sent"}>
        {state === "sending" ? t.contact.formSending : t.contact.formButton}
      </button>

      <p
        className="form-note"
        id={noteId}
        role="status"
        aria-live="polite"
        data-state={state === "error" ? "error" : undefined}
      >
        {note}
      </p>
    </form>
  );
}
