import { useState } from "react";
import { PHONE, PHONE_TEL } from "@/lib/site-data";
import { Phone } from "lucide-react";

export function BookingForm() {
  const [sent, setSent] = useState(false);
  return (
    <div className="rounded-2xl border border-gold/30 bg-surface/80 p-6 shadow-gold backdrop-blur sm:p-8">
      <p className="text-xs uppercase tracking-widest text-gold">— Quick Booking</p>
      <h3 className="mt-2 font-display text-3xl text-foreground">Reserve Your Ride</h3>
      <p className="mt-1 text-sm text-muted-foreground">Confirmed within minutes — fixed rate, no surprises.</p>

      {sent ? (
        <div className="mt-6 rounded-xl border border-gold/40 bg-gold/10 p-6 text-center">
          <h4 className="font-display text-2xl text-gold">Request received</h4>
          <p className="mt-2 text-sm text-muted-foreground">We'll confirm your booking within minutes. For immediate help call <a className="text-gold underline" href={`tel:${PHONE_TEL}`}>{PHONE}</a>.</p>
        </div>
      ) : (
        <form
          className="mt-6 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Service Type</label>
            <select required className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none">
              <option value="">Select a service…</option>
              <option>Airport Transfer — To Airport</option>
              <option>Airport Transfer — From Airport</option>
              <option>Long Distance Transfer</option>
              <option>Round Trip</option>
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <input required placeholder="Pickup Address" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
            <input required placeholder="Drop-off Location" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <input required type="date" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
            <input required type="time" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
            <select required className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none">
              <option value="">Passengers</option>
              {[1,2,3,4,5,6].map((n)=> <option key={n}>{n} Passenger{n>1?"s":""}</option>)}
            </select>
          </div>
          <input required type="tel" placeholder="Your Phone" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
          <button type="submit" className="gradient-gold rounded-md px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold hover:opacity-90 transition">
            ✦ Book My Ride Now
          </button>
          <p className="text-center text-xs text-muted-foreground">or call us directly</p>
          <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 text-lg font-bold text-gold">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
          <p className="text-center text-xs text-muted-foreground">Available 24/7 · Every Day · Holidays</p>
        </form>
      )}
    </div>
  );
}
