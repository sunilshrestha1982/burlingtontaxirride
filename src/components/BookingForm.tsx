import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { PHONE, PHONE_TEL } from "@/lib/site-data";
import { Phone } from "lucide-react";
import { Captcha, useCaptcha } from "./Captcha";

export function BookingForm() {
  const navigate = useNavigate();
  const captcha = useCaptcha();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="rounded-2xl border border-gold/30 bg-surface/80 p-6 shadow-gold backdrop-blur sm:p-8">
      <p className="text-xs uppercase tracking-widest text-gold">— Quick Booking</p>
      <h3 className="mt-2 font-display text-3xl text-foreground">Reserve Your Ride</h3>
      <p className="mt-1 text-sm text-muted-foreground">Confirmed within minutes — fixed rate, no surprises.</p>

      <form
        className="mt-6 grid gap-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!captcha.valid) return;
          setError(null);
          setSubmitting(true);

          const fd = new FormData(e.currentTarget);
          const booking = {
            service: String(fd.get("service") || ""),
            pickup: String(fd.get("pickup") || ""),
            dropoff: String(fd.get("dropoff") || ""),
            date: String(fd.get("date") || ""),
            time: String(fd.get("time") || ""),
            passengers: String(fd.get("passengers") || ""),
            phone: String(fd.get("phone") || ""),
            reference: "BVT-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
            submittedAt: new Date().toISOString(),
          };

          // Notify admin (best-effort — never block confirmation if email fails).
          try {
            await fetch("/api/public/send-booking", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(booking),
            });
          } catch {
            // ignore — confirmation still shown
          }

          sessionStorage.setItem("lastBooking", JSON.stringify(booking));
          setSubmitting(false);
          navigate({ to: "/booking-confirmed" });
        }}
      >
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Service Type</label>
          <select name="service" required className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none">
            <option value="">Select a service…</option>
            <option>Airport Transfer — To Airport</option>
            <option>Airport Transfer — From Airport</option>
            <option>Long Distance Transfer</option>
            <option>Round Trip</option>
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="pickup" required placeholder="Pickup Address" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
          <input name="dropoff" required placeholder="Drop-off Location" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <input name="date" required type="date" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
          <input name="time" required type="time" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
          <select name="passengers" required className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none">
            <option value="">Passengers</option>
            {[1,2,3,4,5,6].map((n)=> <option key={n}>{n} Passenger{n>1?"s":""}</option>)}
          </select>
        </div>
        <input name="phone" required type="tel" placeholder="Your Phone" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
        <Captcha c={captcha} />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={!captcha.valid || submitting}
          className="gradient-gold rounded-md px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Sending…" : "✦ Book My Ride Now"}
        </button>
        <p className="text-center text-xs text-muted-foreground">or call us directly</p>
        <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 text-lg font-bold text-gold">
          <Phone className="h-4 w-4" /> {PHONE}
        </a>
        <p className="text-center text-xs text-muted-foreground">Available 24/7 · Every Day · Holidays</p>
      </form>
    </div>
  );
}
