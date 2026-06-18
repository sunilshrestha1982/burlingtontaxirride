import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PHONE, PHONE_TEL, EMAIL } from "@/lib/site-data";
import { SITE_URL } from "@/lib/seo";
import { CheckCircle2, Phone, Mail, Calendar, MapPin, Users, ArrowLeft } from "lucide-react";

export type BookingDetails = {
  service: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: string;
  phone: string;
  reference: string;
  submittedAt: string;
};

export const Route = createFileRoute("/booking-confirmed")({
  head: () => ({
    meta: [
      { title: "Booking Confirmed — Burlington VT Taxi Ride" },
      { name: "description", content: "Your ride request has been received. We'll confirm shortly." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/booking-confirmed` }],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const [b, setB] = useState<BookingDetails | null>(null);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? sessionStorage.getItem("lastBooking") : null;
    if (raw) {
      try { setB(JSON.parse(raw)); } catch { /* ignore */ }
    } else {
      navigate({ to: "/book-online" });
    }
  }, [navigate]);

  if (!b) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-gold/40 bg-surface/60 p-8 text-center shadow-gold">
        <CheckCircle2 className="mx-auto h-16 w-16 text-gold" />
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-gold">Request Received</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">You're All Set</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you — your booking request has been received. We'll confirm by phone or text within minutes.
        </p>
        <p className="mt-2 text-sm">
          Reference: <span className="font-mono text-gold">{b.reference}</span>
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-6 sm:p-8">
        <h2 className="font-display text-2xl">Your Trip Details</h2>
        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          <Detail icon={MapPin} label="Service">{b.service}</Detail>
          <Detail icon={Users} label="Passengers">{b.passengers}</Detail>
          <Detail icon={MapPin} label="Pickup">{b.pickup}</Detail>
          <Detail icon={MapPin} label="Drop-off">{b.dropoff}</Detail>
          <Detail icon={Calendar} label="Date">{b.date}</Detail>
          <Detail icon={Calendar} label="Time">{b.time}</Detail>
          <Detail icon={Phone} label="Your Phone">{b.phone}</Detail>
        </dl>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-6 sm:p-8">
        <h2 className="font-display text-2xl">What Happens Next</h2>
        <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
          <li><span className="font-bold text-gold">1.</span> Our dispatcher reviews your request and assigns the closest available driver.</li>
          <li><span className="font-bold text-gold">2.</span> You'll receive a confirmation call or text to <span className="text-foreground">{b.phone}</span> within a few minutes.</li>
          <li><span className="font-bold text-gold">3.</span> On the day of your ride, your driver will arrive at the pickup time with vehicle and contact details.</li>
        </ol>
        <p className="mt-5 text-sm text-muted-foreground">
          Need to change anything or didn't hear from us? Call us directly:
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <a href={`tel:${PHONE_TEL}`} className="gradient-gold inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
          <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-5 py-3 text-sm font-semibold text-gold hover:bg-gold/10">
            <Mail className="h-4 w-4" /> {EMAIL}
          </a>
        </div>
      </div>

      <Link to="/" className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold">
        <ArrowLeft className="h-4 w-4" /> Back home
      </Link>
    </div>
  );
}

function Detail({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3.5 w-3.5 text-gold" /> {label}
      </div>
      <dd className="mt-1 text-sm text-foreground">{children || "—"}</dd>
    </div>
  );
}
