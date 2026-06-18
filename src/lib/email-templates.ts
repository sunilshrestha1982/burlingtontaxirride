// Branded responsive HTML email templates for Burlington VT Taxi Ride.
// Pure functions returning HTML strings — wire to a backend (SMTP / Resend /
// Lovable Cloud) when ready. Inline styles only (max email-client support).

import { PHONE, PHONE_TEL, EMAIL, WHATSAPP } from "@/lib/site-data";

const BRAND = {
  name: "Burlington VT Taxi Ride",
  url: "https://www.burlingtonvttaxirride.com",
  logo: "https://www.burlingtonvttaxirride.com/favicon.png",
  navy: "#0f172a",
  surface: "#111a2e",
  gold: "#c9a25c",
  goldSoft: "#e8d3a3",
  text: "#1a2238",
  muted: "#5b6478",
  border: "#e5dcc4",
};

export type BookingPayload = {
  reference?: string;
  service?: string;
  name?: string;
  phone?: string;
  email?: string;
  pickup?: string;
  dropoff?: string;
  date?: string;
  time?: string;
  passengers?: string;
  luggage?: string;
  flight?: string;
  submittedAt?: string;
};

export type ContactPayload = {
  reference?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  submittedAt?: string;
};

const esc = (s: unknown) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function shell(opts: { preview: string; title: string; body: string }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light" />
<title>${esc(opts.title)}</title>
<style>
  @media only screen and (max-width: 620px) {
    .email-container { width: 100% !important; border-radius: 0 !important; }
    .px-pad { padding-left: 20px !important; padding-right: 20px !important; }
    .py-pad { padding-top: 22px !important; padding-bottom: 22px !important; }
    .brand-name { font-size: 17px !important; letter-spacing: 0.3px !important; }
    .brand-tag { display: none !important; }
    .brand-logo { width: 36px !important; height: 36px !important; margin-right: 10px !important; }
    .h1 { font-size: 22px !important; line-height: 1.25 !important; }
    .h1-sm { font-size: 20px !important; }
    .label-cell { width: 38% !important; font-size: 10px !important; }
    .value-cell { font-size: 13px !important; }
    .btn { display: block !important; width: 100% !important; margin: 8px 0 !important; box-sizing: border-box; }
    .btn-spacer { display: none !important; }
    .summary-grid td { display: block !important; width: 100% !important; padding: 6px 0 !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#f4efe3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${BRAND.text};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${esc(opts.preview)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4efe3;">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="email-container" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 6px 24px rgba(15,23,42,0.08);">
      <tr>
        <td class="px-pad" style="background:${BRAND.navy};padding:22px 28px;" align="left">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="left" valign="middle" class="brand-name" style="color:${BRAND.gold};font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:700;letter-spacing:0.5px;">
                <img src="${BRAND.logo}" width="44" height="44" alt="${BRAND.name}" class="brand-logo" style="display:inline-block;vertical-align:middle;border-radius:50%;border:2px solid ${BRAND.gold};margin-right:12px;background:#ffffff;" />
                <span style="vertical-align:middle;">${BRAND.name}</span>
              </td>
              <td align="right" valign="middle" class="brand-tag" style="color:${BRAND.goldSoft};font-size:11px;letter-spacing:2px;text-transform:uppercase;white-space:nowrap;">
                Premium &middot; 24/7
              </td>
            </tr>
          </table>
        </td>
      </tr>
      ${opts.body}
      <tr>
        <td class="px-pad" style="padding:22px 28px;background:${BRAND.navy};color:#cbd5e1;font-size:12px;line-height:18px;" align="center">
          <div style="color:${BRAND.gold};font-weight:700;letter-spacing:1px;text-transform:uppercase;font-size:11px;margin-bottom:6px;">${BRAND.name}</div>
          <a href="tel:${PHONE_TEL}" style="color:${BRAND.goldSoft};text-decoration:none;">${PHONE}</a>
          &nbsp;&middot;&nbsp;
          <a href="mailto:${EMAIL}" style="color:${BRAND.goldSoft};text-decoration:none;">${EMAIL}</a>
          &nbsp;&middot;&nbsp;
          <a href="${WHATSAPP}" style="color:${BRAND.goldSoft};text-decoration:none;">WhatsApp</a>
          <div style="margin-top:8px;color:#94a3b8;">Burlington, Vermont &middot; Available every day, including holidays.</div>
          <div style="margin-top:10px;color:#64748b;font-size:11px;">© ${new Date().getFullYear()} ${BRAND.name}. All rights reserved.</div>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function row(label: string, value?: string) {
  if (!value) return "";
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #f0e9d6;width:42%;vertical-align:top;">
      <div style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${BRAND.muted};">${esc(label)}</div>
    </td>
    <td style="padding:10px 0;border-bottom:1px solid #f0e9d6;color:${BRAND.text};font-size:14px;font-weight:600;">
      ${esc(value)}
    </td>
  </tr>`;
}

function button(href: string, label: string) {
  return `<a href="${esc(href)}" style="display:inline-block;background:linear-gradient(135deg,${BRAND.gold},${BRAND.goldSoft});color:${BRAND.navy};text-decoration:none;font-weight:700;font-size:13px;letter-spacing:1px;text-transform:uppercase;padding:12px 22px;border-radius:8px;">${esc(label)}</a>`;
}

function detailsTable(rows: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px;border-top:2px solid ${BRAND.gold};">
    ${rows}
  </table>`;
}

/* ============================ BOOKING ============================ */

export function bookingCustomerEmail(b: BookingPayload) {
  const body = `
  <tr><td style="padding:32px 28px 8px 28px;">
    <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.gold};">— Booking Received</div>
    <h1 style="margin:8px 0 0 0;font-family:Georgia,serif;font-size:28px;line-height:1.2;color:${BRAND.text};">
      Thank you${b.name ? `, ${esc(b.name.split(" ")[0])}` : ""} — we've got your ride.
    </h1>
    <p style="margin:10px 0 0 0;color:${BRAND.muted};font-size:14px;line-height:22px;">
      Your reservation has been received and our dispatcher will confirm shortly. Keep this email for your records.
    </p>
    ${b.reference ? `<div style="margin-top:16px;display:inline-block;background:${BRAND.navy};color:${BRAND.gold};font-family:Georgia,serif;letter-spacing:2px;padding:8px 14px;border-radius:6px;font-size:13px;">REF · ${esc(b.reference)}</div>` : ""}
  </td></tr>
  <tr><td style="padding:8px 28px 4px 28px;">
    ${detailsTable(
      row("Service", b.service) +
      row("Date", b.date) +
      row("Time", b.time) +
      row("Pickup", b.pickup) +
      row("Drop-off", b.dropoff) +
      row("Passengers", b.passengers) +
      row("Luggage", b.luggage) +
      row("Flight #", b.flight) +
      row("Phone", b.phone) +
      row("Email", b.email),
    )}
  </td></tr>
  <tr><td style="padding:22px 28px;">
    <div style="background:#fbf6e7;border:1px solid ${BRAND.border};border-radius:10px;padding:16px 18px;">
      <div style="color:${BRAND.text};font-weight:700;font-size:14px;margin-bottom:4px;">What happens next</div>
      <ul style="margin:6px 0 0 18px;padding:0;color:${BRAND.muted};font-size:13px;line-height:20px;">
        <li>Our dispatcher confirms your driver within minutes.</li>
        <li>You'll receive driver name & vehicle details before pickup.</li>
        <li>Need to change anything? Call or text us 24/7.</li>
      </ul>
    </div>
    <div style="margin-top:22px;text-align:center;">
      ${button(`tel:${PHONE_TEL}`, `Call ${PHONE}`)}
      &nbsp;
      ${button(WHATSAPP, "WhatsApp Us")}
    </div>
  </td></tr>`;
  return {
    subject: `Your ride is reserved${b.reference ? ` · ${b.reference}` : ""} — ${BRAND.name}`,
    html: shell({
      preview: `We received your booking${b.reference ? ` (${b.reference})` : ""} — confirmation in minutes.`,
      title: "Booking received",
      body,
    }),
  };
}

export function bookingAdminEmail(b: BookingPayload) {
  const body = `
  <tr><td style="padding:32px 28px 4px 28px;">
    <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.gold};">★ New Booking</div>
    <h1 style="margin:8px 0 0 0;font-family:Georgia,serif;font-size:26px;line-height:1.2;color:${BRAND.text};">
      ${esc(b.service || "Ride request")}
    </h1>
    <p style="margin:8px 0 0 0;color:${BRAND.muted};font-size:13px;">
      Submitted ${esc(b.submittedAt ? new Date(b.submittedAt).toLocaleString() : new Date().toLocaleString())}
    </p>
    ${b.reference ? `<div style="margin-top:14px;display:inline-block;background:${BRAND.navy};color:${BRAND.gold};font-family:Georgia,serif;letter-spacing:2px;padding:7px 12px;border-radius:6px;font-size:13px;">REF · ${esc(b.reference)}</div>` : ""}
  </td></tr>
  <tr><td style="padding:6px 28px;">
    ${detailsTable(
      row("Customer", b.name) +
      row("Phone", b.phone) +
      row("Email", b.email) +
      row("Date", b.date) +
      row("Time", b.time) +
      row("Pickup", b.pickup) +
      row("Drop-off", b.dropoff) +
      row("Passengers", b.passengers) +
      row("Luggage", b.luggage) +
      row("Flight #", b.flight),
    )}
  </td></tr>
  <tr><td style="padding:22px 28px;" align="center">
    ${b.phone ? button(`tel:${b.phone}`, "Call Customer") : ""}
    ${b.email ? `&nbsp;${button(`mailto:${b.email}`, "Reply by Email")}` : ""}
  </td></tr>`;
  return {
    subject: `New booking · ${b.service || "Ride"}${b.reference ? ` · ${b.reference}` : ""}`,
    html: shell({
      preview: `${b.name || "Customer"} requested ${b.service || "a ride"}${b.date ? ` on ${b.date}` : ""}${b.time ? ` at ${b.time}` : ""}.`,
      title: "New booking",
      body,
    }),
  };
}

/* ============================ CONTACT ============================ */

export function contactCustomerEmail(c: ContactPayload) {
  const body = `
  <tr><td style="padding:32px 28px 8px 28px;">
    <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.gold};">— Message Received</div>
    <h1 style="margin:8px 0 0 0;font-family:Georgia,serif;font-size:28px;line-height:1.2;color:${BRAND.text};">
      Thanks${c.name ? `, ${esc(c.name.split(" ")[0])}` : ""} — we'll be in touch shortly.
    </h1>
    <p style="margin:10px 0 0 0;color:${BRAND.muted};font-size:14px;line-height:22px;">
      A team member typically replies within the hour. For urgent rides, please call or text us directly.
    </p>
  </td></tr>
  <tr><td style="padding:8px 28px;">
    ${detailsTable(
      row("Subject", c.subject) +
      row("From", c.name) +
      row("Email", c.email) +
      row("Phone", c.phone),
    )}
    ${c.message ? `<div style="margin-top:18px;background:#fbf6e7;border:1px solid ${BRAND.border};border-radius:10px;padding:16px 18px;color:${BRAND.text};font-size:14px;line-height:22px;white-space:pre-wrap;">${esc(c.message)}</div>` : ""}
  </td></tr>
  <tr><td style="padding:22px 28px;" align="center">
    ${button(`tel:${PHONE_TEL}`, `Call ${PHONE}`)} &nbsp; ${button(WHATSAPP, "WhatsApp Us")}
  </td></tr>`;
  return {
    subject: `We received your message — ${BRAND.name}`,
    html: shell({
      preview: "Thanks for reaching out — we typically reply within the hour.",
      title: "Message received",
      body,
    }),
  };
}

export function contactAdminEmail(c: ContactPayload) {
  const body = `
  <tr><td style="padding:32px 28px 4px 28px;">
    <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${BRAND.gold};">✉ New Contact Message</div>
    <h1 style="margin:8px 0 0 0;font-family:Georgia,serif;font-size:24px;line-height:1.25;color:${BRAND.text};">
      ${esc(c.subject || "Website enquiry")}
    </h1>
    <p style="margin:8px 0 0 0;color:${BRAND.muted};font-size:13px;">
      Submitted ${esc(c.submittedAt ? new Date(c.submittedAt).toLocaleString() : new Date().toLocaleString())}
    </p>
  </td></tr>
  <tr><td style="padding:6px 28px;">
    ${detailsTable(
      row("From", c.name) +
      row("Email", c.email) +
      row("Phone", c.phone),
    )}
    ${c.message ? `<div style="margin-top:18px;background:#fbf6e7;border:1px solid ${BRAND.border};border-radius:10px;padding:16px 18px;color:${BRAND.text};font-size:14px;line-height:22px;white-space:pre-wrap;">${esc(c.message)}</div>` : ""}
  </td></tr>
  <tr><td style="padding:22px 28px;" align="center">
    ${c.email ? button(`mailto:${c.email}`, "Reply by Email") : ""}
    ${c.phone ? `&nbsp;${button(`tel:${c.phone}`, "Call Back")}` : ""}
  </td></tr>`;
  return {
    subject: `New contact · ${c.subject || c.name || "Website"}`,
    html: shell({
      preview: `${c.name || "Visitor"} sent a message via the website.`,
      title: "New contact message",
      body,
    }),
  };
}
