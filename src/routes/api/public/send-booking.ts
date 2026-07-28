import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  bookingAdminEmail,
  bookingCustomerEmail,
  type BookingPayload,
} from "@/lib/email-templates";
import { EMAIL } from "@/lib/site-data";

const ADMIN_EMAIL = "burlingtonvttaxiride@gmail.com";
const FROM_NAME = "Burlington VT Taxi Ride";

const GATEWAY_URL =
  "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

const schema = z.object({
  reference: z.string().max(40).optional(),
  service: z.string().max(80).optional(),
  name: z.string().trim().max(100).optional(),
  phone: z.string().max(40).optional(),
  email: z.string().trim().email().max(255).optional(),
  pickup: z.string().max(300).optional(),
  dropoff: z.string().max(300).optional(),
  date: z.string().max(40).optional(),
  time: z.string().max(20).optional(),
  passengers: z.string().max(4).optional(),
  luggage: z.string().max(4).optional(),
  flight: z.string().max(40).optional(),
  submittedAt: z.string().max(40).optional(),
});

function base64UrlEncode(input: string): string {
  // UTF-8 safe base64url
  const bytes = new TextEncoder().encode(input);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64Encode(input: string): string {
  // Standard base64 for MIME body parts
  const bytes = new TextEncoder().encode(input);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

function encodeSubject(subject: string): string {
  // RFC 2047 UTF-8 encoded-word for non-ASCII or long subjects
  const bytes = new TextEncoder().encode(subject);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return `=?UTF-8?B?${btoa(bin)}?=`;
}

function buildRawEmail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  fromName?: string;
}): string {
  const fromHeader = opts.fromName ? `${opts.fromName} <me>` : "me";
  const headers = [
    `From: ${fromHeader}`,
    `To: ${opts.to}`,
    `Subject: ${encodeSubject(opts.subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
  ];
  if (opts.replyTo) headers.push(`Reply-To: ${opts.replyTo}`);
  const msg = headers.join("\r\n") + "\r\n\r\n" + base64Encode(opts.html);
  return base64UrlEncode(msg);
}

async function sendViaGmail(payload: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const gmailKey = process.env.GOOGLE_MAIL_API_KEY;
  if (!lovableKey || !gmailKey) {
    throw new Error("Gmail connector not configured");
  }
  const raw = buildRawEmail({ ...payload, fromName: FROM_NAME });
  const res = await fetch(`${GATEWAY_URL}/users/me/messages/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": gmailKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`gmail ${res.status}: ${text.slice(0, 300)}`);
  }
  return res.json().catch(() => ({}));
}

async function sendViaRelay(payload: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const url = process.env.SMTP_RELAY_URL;
  const secret = process.env.SMTP_RELAY_SECRET;
  if (!url) throw new Error("SMTP relay not configured");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(secret ? { "X-Relay-Secret": secret } : {}),
    },
    body: JSON.stringify({
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      replyTo: payload.replyTo,
      fromName: FROM_NAME,
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`relay ${res.status}: ${text.slice(0, 300)}`);
  }
  return res.json().catch(() => ({}));
}

async function sendEmail(payload: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  // Prefer the SMTP relay (Gmail app password) when configured.
  if (process.env.SMTP_RELAY_URL) return sendViaRelay(payload);
  return sendViaGmail(payload);
}

export const Route = createFileRoute("/api/public/send-booking")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "invalid json" }, { status: 400 });
        }
        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return Response.json(
            { error: "validation failed", issues: parsed.error.issues },
            { status: 400 },
          );
        }

        const booking = parsed.data as BookingPayload;

        const admin = bookingAdminEmail(booking);
        const customer = bookingCustomerEmail(booking);

        const results: Record<string, unknown> = {};

        try {
          results.admin = await sendEmail({
            to: ADMIN_EMAIL,
            subject: admin.subject,
            html: admin.html,
            replyTo: booking.email,
          });
        } catch (e) {
          results.adminError = String((e as Error).message || e);
        }

        if (booking.email) {
          try {
            results.passenger = await sendEmail({
              to: booking.email,
              subject: customer.subject,
              html: customer.html,
              replyTo: EMAIL,
            });
          } catch (e) {
            results.passengerError = String((e as Error).message || e);
          }
        }

        const ok = !results.adminError && !results.passengerError;

        // Persist the reservation so it shows up on the /admin bookings page.
        try {
          const { supabaseAdmin } = await import(
            "@/integrations/supabase/client.server"
          );
          await supabaseAdmin.from("bookings").insert({
            reference: booking.reference ?? null,
            service: booking.service ?? null,
            name: booking.name ?? null,
            phone: booking.phone ?? null,
            email: booking.email ?? null,
            pickup: booking.pickup ?? null,
            dropoff: booking.dropoff ?? null,
            ride_date: booking.date ?? null,
            ride_time: booking.time ?? null,
            passengers: booking.passengers ?? null,
            luggage: booking.luggage ?? null,
            flight: booking.flight ?? null,
            admin_email_sent: !results.adminError,
            admin_email_error: (results.adminError as string) ?? null,
            passenger_email_sent: booking.email
              ? !results.passengerError
              : false,
            passenger_email_error: (results.passengerError as string) ?? null,
          });
        } catch (e) {
          console.error("booking persist failed", e);
        }

        return Response.json({ ok, results }, { status: ok ? 200 : 502 });
      },
    },
  },
});
