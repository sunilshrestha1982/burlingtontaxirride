import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { BookingForm } from "@/components/BookingForm";
import { CTASection } from "@/components/CTASection";
import { Plane, BadgeCheck, ShieldCheck, Clock, Users } from "lucide-react";

export const Route = createFileRoute("/airport-transfers")({
  head: () => ({
    meta: [
      { title: "Burlington Airport Transfer Service (BTV) — Burlington VT Taxi Ride" },
      { name: "description", content: "Fixed-rate airport rides to and from Burlington International Airport (BTV). Flight tracking, meet & greet, 24/7." },
      { property: "og:title", content: "Burlington Airport Transfer Service" },
      { property: "og:description", content: "Reliable BTV airport transfers with flight tracking and fixed rates." },
      { property: "og:image", content: "/places/btv-airport.jpg" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Burlington VT Taxi Ride"
        title="Burlington Airport"
        highlight="Transfer Service"
        description="Fixed-rate airport rides to and from Burlington International Airport (BTV). Flight tracking, meet & greet, and 24/7 availability — every time."
        backgroundImage="/places/btv-airport.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Burlington International Airport</p>
            <h2 className="mt-3 font-display text-4xl">Your Flight Tracked, Your Driver Ready</h2>
            <p className="mt-4 text-muted-foreground">
              We monitor every BTV arrival in real time. When your flight lands early or gets delayed, your driver already knows — no scrambling, no waiting on the curb, no extra charges for delays.
            </p>
            <p className="mt-4 text-muted-foreground">
              Burlington VT Taxi Ride serves all of Chittenden County and long-distance destinations including Stowe, Montpelier, Middlebury, Montreal (YUL), and Albany (ALB).
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                [Plane, "Real-Time Flight Tracking", "Your driver monitors your flight automatically. Delays or early arrivals — zero extra charge."],
                [Users, "Meet & Greet at Baggage Claim", "Your driver waits at arrivals with a name sign. No hunting for a car, no confusing app pins."],
                [BadgeCheck, "Licensed & Fully Insured", "Every driver is background-checked, licensed, and drives a fully insured, late-model vehicle."],
                [ShieldCheck, "Fixed Rate — No Surge Pricing", "Your fare is quoted and confirmed before you book. No surge, no toll surprises, no hidden fees."],
              ].map(([Icon, t, d]) => {
                const I = Icon as typeof Plane;
                return (
                  <div key={t as string} className="rounded-xl border border-border bg-surface/60 p-5">
                    <I className="h-5 w-5 text-gold" />
                    <h4 className="mt-2 font-display text-base text-foreground">{t as string}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <BookingForm />
        </div>
      </section>

      <CTASection />
    </>
  );
}
