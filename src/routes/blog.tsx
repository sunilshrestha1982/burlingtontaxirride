import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { PHONE, PHONE_TEL } from "@/lib/site-data";

export const Route = createFileRoute("/blog")({
  head: () => pageHead({
    title: "Burlington VT Taxi Rates & Pricing Guide 2026",
    description: "Transparent Burlington VT taxi rates: BTV airport flat fares, hourly rates, long-distance pricing to Stowe, Killington, Montreal, Boston. No surge pricing.",
    image: "/places/burlington-vt.jpg",
    path: "/blog",
    ogType: "article",
  }),
  component: Page,
});

const flatFares: Array<[string, string, string]> = [
  ["BTV Airport ↔ Downtown Burlington", "$35 – $45", "≈ 10 min"],
  ["BTV Airport ↔ South Burlington", "$30 – $40", "≈ 10 min"],
  ["BTV Airport ↔ Williston / Essex", "$40 – $55", "≈ 15 min"],
  ["BTV Airport ↔ Shelburne", "$50 – $65", "≈ 20 min"],
  ["BTV Airport ↔ UVM / UVM Medical Center", "$35 – $45", "≈ 15 min"],
  ["BTV Airport ↔ Church Street Marketplace", "$35 – $45", "≈ 10 min"],
];

const longDistance: Array<[string, string, string]> = [
  ["Burlington → Stowe Mountain Resort", "$155 – $185", "≈ 55 min"],
  ["Burlington → Smugglers' Notch", "$165 – $195", "≈ 60 min"],
  ["Burlington → Sugarbush / Mad River Valley", "$185 – $215", "≈ 1 hr 10 min"],
  ["Burlington → Killington Resort", "$295 – $345", "≈ 2 hr"],
  ["Burlington → Jay Peak", "$245 – $285", "≈ 1 hr 45 min"],
  ["Burlington → Montpelier", "$135 – $165", "≈ 50 min"],
  ["Burlington → Montreal (YUL)", "$345 – $395", "≈ 2 hr"],
  ["Burlington → Boston / Logan (BOS)", "$695 – $795", "≈ 3 hr 30 min"],
  ["Burlington → Manchester, NH (MHT)", "$525 – $595", "≈ 3 hr"],
  ["Burlington → Albany, NY (ALB)", "$485 – $545", "≈ 3 hr"],
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Blog · Pricing Guide"
        title="Burlington VT Taxi Rates &"
        highlight="Pricing Guide 2026"
        description="A transparent breakdown of what a Burlington taxi ride actually costs in 2026 — BTV airport flat fares, hourly rates, ski-resort runs, and long-distance trips. No surge pricing, ever."
        backgroundImage="/places/burlington-vt.jpg"
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Published · June 2026 · 6 min read</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">How much does a taxi cost in Burlington, Vermont?</h2>
          <p className="mt-4 text-muted-foreground">
            One of the questions we hear most often is simply: <em>"How much will my ride cost?"</em> Unlike rideshare apps, Burlington VT Taxi Ride uses flat, published fares — no surge pricing, no mystery multipliers, and no last-minute price hikes during snowstorms, UVM move-in week, or Friday-night airport rushes. Below is our complete 2026 pricing guide.
          </p>
        </header>

        <section className="space-y-4">
          <h3 className="font-display text-2xl text-gold">BTV Airport Flat Fares</h3>
          <p className="text-muted-foreground">
            Burlington International Airport (BTV) is our most-requested destination. We use flat, distance-based fares so you know the price the moment you book. Fares are per vehicle (up to 4 passengers + standard luggage) and include meet-and-greet, baggage assistance, and tolls.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface/60 text-left">
                <tr>
                  <th className="p-3 font-display text-gold">Route</th>
                  <th className="p-3 font-display text-gold">Flat Fare</th>
                  <th className="p-3 font-display text-gold">Drive Time</th>
                </tr>
              </thead>
              <tbody>
                {flatFares.map(([r, f, t]) => (
                  <tr key={r} className="border-t border-border">
                    <td className="p-3">{r}</td>
                    <td className="p-3">{f}</td>
                    <td className="p-3 text-muted-foreground">{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h3 className="font-display text-2xl text-gold">Long-Distance & Ski-Resort Rates</h3>
          <p className="text-muted-foreground">
            Heading to the mountains or out of state? Long-distance fares are quoted door-to-door and include all tolls, fuel, and driver wait time at the curb. Round-trip and multi-stop discounts available on request.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-surface/60 text-left">
                <tr>
                  <th className="p-3 font-display text-gold">Route</th>
                  <th className="p-3 font-display text-gold">Estimated Fare</th>
                  <th className="p-3 font-display text-gold">Drive Time</th>
                </tr>
              </thead>
              <tbody>
                {longDistance.map(([r, f, t]) => (
                  <tr key={r} className="border-t border-border">
                    <td className="p-3">{r}</td>
                    <td className="p-3">{f}</td>
                    <td className="p-3 text-muted-foreground">{t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12 space-y-4">
          <h3 className="font-display text-2xl text-gold">Hourly &amp; "As-Directed" Service</h3>
          <p className="text-muted-foreground">
            For wine tours, wedding shuttles, conference days, and multi-stop business runs we offer hourly service starting at <strong>$95/hour</strong> (two-hour minimum). Your driver stays with you for the duration, with no per-mile surcharge.
          </p>
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
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li><strong>Extra stops:</strong> $5 – $15 per additional stop depending on detour distance.</li>
            <li><strong>Oversized luggage:</strong> Ski bags, golf clubs, and bike boxes are free; trailer rentals quoted separately.</li>
            <li><strong>Holiday surcharge:</strong> A flat $10 fee applies on Thanksgiving Day, Christmas Day, and New Year's Eve after 8 PM.</li>
            <li><strong>Tolls outside Vermont:</strong> Trips to Montreal include CBSA wait time; Boston runs include MA Pike tolls.</li>
          </ul>
        </section>

        <section className="mt-12 rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
          <h3 className="font-display text-2xl text-gold">Get an exact quote in under a minute</h3>
          <p className="mt-2 text-muted-foreground">
            Every quote on this page is an estimate. For a guaranteed flat rate tailored to your pickup time and address, book online or call dispatch directly.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/book-online" className="inline-flex items-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90">
              Book Online
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
