import { NextResponse } from "next/server";

type Body = Record<string, unknown>;
const str = (v: unknown, max = 500) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // honeypot: bots fill the hidden "website" field
  if (str(body.website)) return NextResponse.json({ ok: true });

  const name = str(body.name, 120);
  const phone = str(body.phone, 40);
  const email = str(body.email, 160);
  const area = str(body.area, 120);
  const puppy = str(body.puppy, 160);
  const message = str(body.message, 2000);

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please tell us your name.";
  if (!/^\+?[\d\s()-]{7,20}$/.test(phone)) errors.phone = "Please enter a phone or WhatsApp number.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "That email doesn't look right.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const entry = { receivedAt: new Date().toISOString(), name, phone, email, area, puppy, message };

  // Optional: forward to a webhook (Slack, Zapier, Make, a Google Apps Script...) when configured.
  const hook = process.env.ENQUIRY_WEBHOOK_URL;
  if (hook) {
    try {
      await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(entry) });
    } catch (e) {
      console.error("Enquiry webhook failed", e);
    }
  }
  console.log("[enquiry]", JSON.stringify(entry));
  return NextResponse.json({ ok: true });
}
