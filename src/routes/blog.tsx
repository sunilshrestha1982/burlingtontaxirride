import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { loadPageContent, mergeMeta, heroOverrides } from "@/lib/page-content";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { PHONE, PHONE_TEL } from "@/lib/site-data";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  loader: () => loadPageContent("/blog"),
  head: ({ loaderData }) => pageHead(mergeMeta({
    title: "Burlington VT Taxi Ride Service Guide",
    description: "Book a Burlington taxi for BTV airport transfers, long-distance trips, ski resort shuttles, and hourly car service. Get a custom quote and reserve your ride online.",
    image: "/places/burlington-vt.jpg",
    path: "/blog",
    ogType: "article",
  }, loaderData ?? null)),
  component: Page,
});

const flatFareRoutes: Array<[string, string]> = [
  ["BTV Airport ↔ Downtown Burlington", "≈ 10 min"],
  ["BTV Airport ↔ South Burlington", "≈ 10 min"],
  ["BTV Airport ↔ Williston / Essex", "≈ 15 min"],
  ["BTV Airport ↔ Shelburne", "≈ 20 min"],
  ["BTV Airport ↔ UVM / UVM Medical Center", "≈ 15 min"],
  ["BTV Airport ↔ Church Street Marketplace", "≈ 10 min"],
];

const longDistanceRoutes: Array<[string, string]> = [
  ["Burlington → Stowe Mountain Resort", "≈ 55 min"],
  ["Burlington → Smugglers' Notch", "≈ 60 min"],
  ["Burlington → Sugarbush / Mad River Valley", "≈ 1 hr 10 min"],
  ["Burlington → Killington Resort", "≈ 2 hr"],
  ["Burlington → Jay Peak", "≈ 1 hr 45 min"],
  ["Burlington → Montpelier", "≈ 50 min"],
  ["Burlington → Montreal (YUL)", "≈ 2 hr"],
  ["Burlington → Boston / Logan (BOS)", "≈ 3 hr 30 min"],
  ["Burlington → Manchester, NH (MHT)", "≈ 3 hr"],
  ["Burlington → Albany, NY (ALB)", "≈ 3 hr"],
];

function BookNowButton({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center justify-center gap-1.5 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-background hover:opacity-90 ${fullWidth ? "w-full" : ""}`}
    >
      Book now <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function Page() {
  const cms = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow="Blog · Service Guide"
        title="Burlington VT Taxi Ride"
        highlight="Service Guide"
        description="Book your Burlington taxi ride for BTV airport transfers, long-distance trips, ski resort shuttles, and hourly car service. Request a custom quote and reserve your ride in seconds."
        backgroundImage="/places/burlington-vt.jpg"
        {...heroOverrides(cms)}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Published · June 2026 · 6 min read</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">How to book a taxi in Burlington, Vermont</h2>
          <p className="mt-4 text-muted-foreground">
            One of the questions we hear most often is: <em>"How do I book a reliable ride?"</em> Burlington VT Taxi Ride offers flat, custom-quoted fares — no surge pricing, no mystery multipliers, and no last-minute price hikes during snowstorms, UVM move-in week, or Friday-night airport rushes. Below is a quick guide to our service areas and how to get a guaranteed quote.
          </p>
        </header>

        <section className="space-y-4">
          <h3 className="font-display text-2xl text-gold">BTV Airport Flat Fares</h3>
          <p className="text-muted-foreground">
            Burlington International Airport (BTV) is our most-requested destination. We use flat, distance-based fares so you know the price the moment you book. Fares are per vehicle (up to 4 passengers + standard luggage) and include meet-and-greet, baggage assistance, and tolls. Tap <strong>Book now</strong> to get an instant, guaranteed quote for your route.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface/60 text-left">
                <tr>
                  <th className="p-3 font-display text-gold">Route</th>
                  <th className="p-3 font-display text-gold">Drive Time</th>
                  <th className="p-3 font-display text-gold">Reserve</th>
                </tr>
              </thead>
              <tbody>
                {flatFareRoutes.map(([r, t]) => (
                  <tr key={r} className="border-t border-border">
                    <td className="p-3">{r}</td>
                    <td className="p-3 text-muted-foreground">{t}</td>
                    <td className="p-3">
                      <BookNowButton />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h3 className="font-display text-2xl text-gold">Long-Distance & Ski-Resort Trips</h3>
          <p className="text-muted-foreground">
            Heading to the mountains or out of state? Long-distance fares are quoted door-to-door and include all tolls, fuel, and driver wait time at the curb. Round-trip and multi-stop discounts are available on request. Select your route and book online to lock in a guaranteed flat rate.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface/60 text-left">
                <tr>
                  <th className="p-3 font-display text-gold">Route</th>
                  <th className="p-3 font-display text-gold">Drive Time</th>
                  <th className="p-3 font-display text-gold">Reserve</th>
                </tr>
              </thead>
              <tbody>
                {longDistanceRoutes.map(([r, t]) => (
                  <tr key={r} className="border-t border-border">
                    <td className="p-3">{r}</td>
                    <td className="p-3 text-muted-foreground">{t}</td>
                    <td className="p-3">
                      <BookNowButton />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h3 className="font-display text-2xl text-gold">Hourly &amp; "As-Directed" Service</h3>
          <p className="text-muted-foreground">
            For wine tours, wedding shuttles, conference days, and multi-stop business runs we offer flexible hourly service. Your driver stays with you for the duration, with no per-mile surcharge. Contact us for a custom quote tailored to your itinerary.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90">
              Book now <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center rounded-full border border-gold px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10">
              Call {PHONE}
            </a>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h3 className="font-display text-2xl text-gold">What's Included in Every Fare</h3>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>Professional, background-checked, locally-based driver</li>
            <li>Late-model Toyota Sienna with Wi-Fi and climate control</li>
            <li>Meet-and-greet at BTV baggage claim with your name on a sign</li>
            <li>Up to 60 minutes of free flight-arrival wait time</li>
            <li>All tolls, fuel, and standard luggage handling</li>
            <li>24/7 dispatch and SMS ride confirmations</li>
          </ul>
        </section>

        <section className="mt-12 space-y-4">
          <h3 className="font-display text-2xl text-gold">Things That Can Affect Your Fare</h3>
          <p className="text-muted-foreground">
            Because every trip is unique, the final flat rate depends on your exact pickup and drop-off addresses, time of day, number of passengers, luggage, and any extra stops or special requests. Your guaranteed quote is provided before you confirm your booking, so there are no surprises.
          </p>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li><strong>Extra stops:</strong> Additional stops along the route may adjust the flat fare.</li>
            <li><strong>Oversized luggage:</strong> Ski bags, golf clubs, and bike boxes are generally included; trailer rentals or oversized cargo are quoted separately.</li>
            <li><strong>Holidays & late-night service:</strong> A surcharge may apply for overnight or major-holiday travel.</li>
            <li><strong>Tolls outside Vermont:</strong> Cross-border trips to Canada or out-of-state destinations include applicable tolls and border wait time.</li>
          </ul>
        </section>

        <section className="mt-12 rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
          <h3 className="font-display text-2xl text-gold">Get a guaranteed quote in under a minute</h3>
          <p className="mt-2 text-muted-foreground">
            Fares are quoted per trip based on your pickup time and exact address. Book online or call dispatch directly for a guaranteed flat rate.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90">
              Book now <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center rounded-full border border-gold px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10">
              Call {PHONE}
            </a>
          </div>
        </section>

        <footer className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>
            Related reading:{" "}
            <Link to="/airport-transfers" className="text-gold hover:underline">BTV Airport Transfers</Link> ·{" "}
            <Link to="/long-distance" className="text-gold hover:underline">Long-Distance Service</Link> ·{" "}
            <Link to="/ski-resort" className="text-gold hover:underline">Ski Resort Transportation</Link>
          </p>
        </footer>
      </article>

      <CTASection />
    </>
  );
}
