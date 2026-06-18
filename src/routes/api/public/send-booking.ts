import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import {
  bookingAdminEmail,
  bookingCustomerEmail,
  type BookingPayload,
} from "@/lib/email-templates";
import { EMAIL } from "@/lib/site-data";

const ADMIN_EMAIL = "burlingtonvttaxiride@gmail.com";

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

async function sendViaRelay(payload: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const url = process.env.SMTP_RELAY_URL;
  const secret = process.env.SMTP_RELAY_SECRET;
  if (!url || !secret) throw new Error("SMTP relay not configured");
  const res = await fetch(`${url.replace(/\/$/, "")}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-relay-secret": secret,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`relay ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json().catch(() => ({}));
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
          results.admin = await sendViaRelay({
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
            results.passenger = await sendViaRelay({
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
        return Response.json({ ok, results }, { status: ok ? 200 : 502 });
      },
    },
  },
});
