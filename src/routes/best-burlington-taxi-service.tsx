import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { BookingForm } from "@/components/BookingForm";
import { CTASection } from "@/components/CTASection";
import { Check, Star, Clock, ShieldCheck, MapPin, Plane } from "lucide-react";
import { PHONE, PHONE_TEL } from "@/lib/site-data";
import { Phone } from "lucide-react";

export const Route = createFileRoute("/best-burlington-taxi-service")({
  head: () =>
    pageHead({
      title: "Best Burlington Taxi Service | 24/7 Burlington VT Taxi Ride",
      description:
        "Rated the best Burlington VT taxi service — 24/7 professional airport transfers, long-distance rides, and local pickups. Fixed rates, flight tracking, and clean modern vehicles.",
      image: "/places/burlington-vt.jpg",
      path: "/best-burlington-taxi-service",
    }),
  component: Page,
});

const highlights = [
  { icon: Clock, title: "24/7 Availability", desc: "Every day, every holiday — early flights, late arrivals, and last-minute rides." },
  { icon: ShieldCheck, title: "Licensed & Insured", desc: "Fully licensed drivers, insured vehicles, and background-checked professionals." },
  { icon: Plane, title: "BTV Flight Tracking", desc: "We monitor your flight in real time and adjust pickup automatically — no fees for delays." },
  { icon: MapPin, title: "Local Knowledge", desc: "Vermont-based drivers who know every backroad, resort, and airport terminal." },
];

const reasons = [
  "Fixed, upfront rates — no surge pricing, no hidden fees",
  "Clean 2026 Toyota Sienna vehicles seating up to 7 passengers",
  "Free bottled water, phone chargers, and Wi‑Fi on request",
  "Meet-and-greet service at Burlington International Airport (BTV)",
  "Corporate accounts and monthly invoicing available",
  "Child seats and extra luggage space available on request",
];

const areas = [
  "Burlington", "South Burlington", "Winooski", "Colchester", "Essex",
  "Williston", "Shelburne", "Stowe", "Waterbury", "Montpelier",
  "Middlebury", "Killington", "Jay Peak", "Sugarbush", "Smugglers' Notch",
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="— Voted #1 in Burlington"
        title="The Best"
        highlight="Burlington Taxi Service"
        description="Burlington VT Taxi Ride is Vermont's most trusted 24/7 taxi and car service. Airport transfers, long-distance trips, corporate rides, and local pickups — all with fixed rates and professional drivers."
        backgroundImage="/places/burlington-vt.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Why We're The Best</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl">
              Burlington's <span className="text-gradient-gold">Top-Rated</span> Taxi & Car Service
            </h2>
            <div className="mt-3 h-1 w-16 rounded bg-gold/70" />
            <p className="mt-6 text-muted-foreground">
              When it comes to reliable transportation in Burlington, Vermont, Burlington VT Taxi Ride sets the
              standard. For years we've served Vermonters and visitors with punctual pickups, fair fixed rates, and
              drivers who genuinely care about your trip. Whether you need a ride to Burlington International Airport
              (BTV), a long-distance transfer to Boston, Montreal, or New York, or a quick pickup across town — we're
              the taxi Burlington trusts.
            </p>
            <p className="mt-4 text-muted-foreground">
              Every ride is booked at a confirmed flat rate. No surge pricing during snowstorms, holidays, or peak
              travel weekends. Just clean, modern vehicles, professional drivers, and a company that answers the phone
              when you call.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {highlights.map((h) => (
                <div key={h.title} className="rounded-2xl border border-border bg-surface/40 p-5">
                  <div className="flex items-start gap-3">
                    <h.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="font-display text-lg">{h.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{h.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-12 font-display text-2xl sm:text-3xl">Why Burlington Chooses Us</h3>
            <ul className="mt-5 space-y-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3 text-muted-foreground">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-12 font-display text-2xl sm:text-3xl">Service Area</h3>
            <p className="mt-3 text-muted-foreground">
              We proudly serve Burlington and communities across Vermont — plus long-distance runs into New Hampshire,
              New York, Massachusetts, and Montreal, Canada.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {areas.map((a) => (
                <span key={a} className="rounded-full border border-border bg-background px-4 py-2 text-xs text-muted-foreground">
                  {a}
                </span>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-gold/30 bg-gradient-to-br from-surface/60 to-background p-8 text-center shadow-gold">
              <div className="mx-auto flex w-fit items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <h3 className="mt-4 font-display text-2xl sm:text-3xl">Book The Best Taxi in Burlington</h3>
              <p className="mt-2 text-sm text-muted-foreground">Fixed rates. Real drivers. Answered 24/7.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/book-online" className="gradient-gold inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-gold">
                  Book Online
                </Link>
                <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3 text-sm font-semibold text-gold hover:bg-gold/10">
                  <Phone className="h-4 w-4" /> {PHONE}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <BookingForm />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
