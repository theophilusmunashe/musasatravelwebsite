import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { buildEnquiryEmailHtml, buildEnquiryEmailSubject, buildEnquiryEmailText, type EnquiryFormData } from "@/lib/enquiry-templates";
import type { CartItem } from "@/lib/cartStore";

type EnquiryPayload = {
  formData?: EnquiryFormData;
  cartItems?: CartItem[];
};

function asArrayCartItems(v: unknown): CartItem[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => x as Partial<CartItem>)
    .filter((x) => typeof x?.id === "string" && typeof x?.name === "string" && typeof x?.category === "string")
    .map((x) => ({
      id: String(x.id),
      name: String(x.name),
      category: x.category as CartItem["category"],
      price: String(x.price ?? ""),
      priceNum: Number(x.priceNum ?? 0) || 0,
      image: String(x.image ?? ""),
      quantity: Number(x.quantity ?? 1) || 1,
      duration: typeof x.duration === "string" ? x.duration : undefined,
      description: typeof x.description === "string" ? x.description : undefined,
    }));
}

async function sendViaResend(opts: { to: string; subject: string; html: string; text: string; replyTo?: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false as const, reason: "missing_resend_key" as const };

  const resend = new Resend(apiKey);
  const from =
    process.env.RESEND_FROM ||
    process.env.SMTP_FROM ||
    "Musasa Travel <onboarding@resend.dev>";

  const { data, error } = await resend.emails.send({
    from,
    to: [opts.to],
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    reply_to: opts.replyTo,
  });

  if (error) {
    return { ok: false as const, reason: "resend_error" as const, message: error.message };
  }
  if (!data?.id) {
    return { ok: false as const, reason: "resend_no_id" as const, message: "Resend returned no message id" };
  }
  return { ok: true as const, id: data.id };
}

async function sendViaSmtp(opts: { to: string; subject: string; html: string; text: string; replyTo?: string }) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const secure = process.env.SMTP_SECURE === "true";
  if (!host || !user || !pass) return { ok: false as const, reason: "missing_smtp" as const };

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const fromAddr = process.env.MAIL_FROM || process.env.SMTP_FROM || `Musasa Travel <${user}>`;
  const info = await transporter.sendMail({
    from: fromAddr,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
    replyTo: opts.replyTo,
  });
  return { ok: true as const, messageId: info.messageId };
}

export async function POST(req: Request) {
  let body: EnquiryPayload | null = null;
  try {
    body = (await req.json()) as EnquiryPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const cartItems = asArrayCartItems(body?.cartItems);
  const formData = (body?.formData ?? {}) as EnquiryFormData;

  const subject = buildEnquiryEmailSubject(cartItems, formData);
  const html = buildEnquiryEmailHtml(cartItems, formData);
  const text = buildEnquiryEmailText(cartItems, formData);
  const replyTo = formData.email ? formData.email : undefined;

  const to = process.env.BOOKINGS_EMAIL_TO || "bookings@musasatravel.com";

  try {
    const resendAttempt = await sendViaResend({ to, subject, html, text, replyTo });
    if (resendAttempt.ok) {
      return NextResponse.json({ ok: true, provider: "resend", id: resendAttempt.id });
    }

    const smtpAttempt = await sendViaSmtp({ to, subject, html, text, replyTo });
    if (smtpAttempt.ok) {
      return NextResponse.json({ ok: true, provider: "smtp", messageId: smtpAttempt.messageId });
    }

    const parts = [
      "Email is not configured or the provider rejected the send.",
      resendAttempt.reason === "resend_error" && resendAttempt.message ? `Resend: ${resendAttempt.message}` : null,
      "Fix: set RESEND_API_KEY and a verified RESEND_FROM domain, or set SMTP_HOST, SMTP_USER, SMTP_PASS (and optional MAIL_FROM).",
      `Resend status: ${resendAttempt.reason}. SMTP status: ${smtpAttempt.reason}.`,
    ]
      .filter(Boolean)
      .join(" ");

    return NextResponse.json({ ok: false, error: parts }, { status: 503 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: `Failed to send email: ${msg}` }, { status: 500 });
  }
}
