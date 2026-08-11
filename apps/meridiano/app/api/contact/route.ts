import { NextResponse } from "next/server";

/* =========================================================================
   Contact endpoint. One field, one destination.

   The message is mirrored to CONTACT_WEBHOOK_URL - a Zapier / Make / Google
   Apps Script endpoint that drops it in the hello@meridianocasa.com inbox.
   Same pattern the Estreia app uses for reservations: no database to run, no
   third-party SDK in the bundle, and the durable copy lives where the team
   already reads mail.

   With no webhook configured the route still answers 200 and logs the message
   to the server, so staging review works before the mailbox exists.
   ========================================================================= */

const MAX_LENGTH = 4000;

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const honeypot = typeof body.company === "string" ? body.company.trim() : "";
  const locale = typeof body.locale === "string" ? body.locale : "en";

  // A bot filled the hidden field. Answer 200 so it learns nothing.
  if (honeypot) return NextResponse.json({ ok: true });

  if (!message) {
    return NextResponse.json({ error: "empty_message" }, { status: 400 });
  }

  const record = {
    message: message.slice(0, MAX_LENGTH),
    locale,
    receivedAt: new Date().toISOString(),
    source: "meridianocasa.com",
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    console.info("[meridiano] contact message (no webhook configured)", record);
    return NextResponse.json({ ok: true });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
    if (!response.ok) throw new Error(`webhook responded ${response.status}`);
  } catch (error) {
    // Log the message so it is never silently lost, then tell the visitor.
    console.error("[meridiano] contact webhook failed", error, record);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
