import { createFileRoute, Link } from "@tanstack/react-router";
import { AIRPORTS } from "@/lib/site-data";
import { pageHead } from "@/lib/seo";
import { AirportCard } from "@/components/PlaceCards";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/airports-we-serve")({
  head: () => pageHead({
    title: "Airports We Serve — Burlington VT Taxi Ride",
    description: "Fixed-rate transfers from Burlington Vermont to 14 major airports across New England, New York, Vermont, and Québec — including Stowe (MVL) and Montréal (YUL).",
    image: "/places/airport-bos.jpg",
    path: "/airports-we-serve",
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Burlington VT Taxi Ride"
        title="Airports"
        highlight="We Serve"
        description="Fixed-rate transfers from Burlington, Vermont to 14 major airports across New England, New York, Vermont, and Québec — including Stowe (MVL) and Montréal (YUL). Professional drivers, 24/7 availability."
        backgroundImage="/places/airport-bos.jpg"
        ctaLabel="Book Airport Transfer"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gold/30 bg-surface/60 p-8">
          <span className="rounded-md bg-gold px-3 py-1 text-xs font-bold tracking-widest text-primary-foreground">BTV</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl">Burlington International Airport — Our Home Airport</h2>
          <p className="mt-3 text-muted-foreground max-w-3xl">
            Burlington International Airport (BTV) is our primary service hub. We offer real-time flight tracking, meet & greet at baggage claim, and flat-rate transfers to every Vermont community. <strong className="text-foreground">Can't find a flight from BTV?</strong> We'll drive you to any of the 14 airports below.
          </p>
          <Link to="/airport-transfers" className="mt-5 inline-flex text-xs font-bold uppercase tracking-widest text-gold hover:underline">BTV Transfer Details →</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gold text-center">Regional & Major Hubs</p>
        <h2 className="mt-3 text-center font-display text-4xl sm:text-5xl">All Airports We <span className="text-gradient-gold">Transfer To</span></h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">We serve 13 airports across Vermont, New England, New York, and Québec. All transfers are fixed-rate, pre-booked, and confirmed before you travel.</p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AIRPORTS.map((a) => <AirportCard key={a.code} airport={a} />)}
        </div>
      </section>

      <CTASection eyebrow="Ready to Travel?" title="Book Your Airport Transfer Today" subtitle="Fixed rates confirmed before you book. No surge pricing. Professional drivers. 24/7 availability." />
    </>
  );
}
