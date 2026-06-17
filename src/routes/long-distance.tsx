import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { BookingForm } from "@/components/BookingForm";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/long-distance")({
  head: () => ({
    meta: [
      { title: "Long Distance Rides From Burlington VT — Burlington VT Taxi Ride" },
      { name: "description", content: "Fixed-rate long distance car service from Burlington to Montréal, Albany, Boston, Stowe, Montpelier, and beyond." },
      { property: "og:title", content: "Long Distance Rides From Burlington VT" },
      { property: "og:description", content: "Premium long-distance car service throughout Vermont, Québec, NY and New Hampshire." },
      { property: "og:image", content: "/places/montreal-city.jpg" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Burlington VT Taxi Ride"
        title="Long Distance Rides"
        highlight="From Burlington VT"
        description="Fixed-rate long distance car service from Burlington to Montréal, Albany, Boston, Stowe, Montpelier, and across Vermont and New England."
        backgroundImage="/places/montreal-city.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Vermont & Beyond</p>
            <h2 className="mt-3 font-display text-4xl">Burlington to Anywhere — <span className="text-gradient-gold">We Go the Distance</span></h2>
            <p className="mt-4 text-muted-foreground">
              Sometimes the destination is further than a local cab can take you. Burlington VT Taxi Ride offers premium long-distance car service throughout Vermont and to regional airports, cities, and destinations in Québec, New York, and New Hampshire.
            </p>
            <p className="mt-4 text-muted-foreground">
              Every long-distance ride is in a clean, comfortable vehicle with a professional driver who knows the route. We handle the driving — you arrive refreshed. Fixed quote at booking, no surprises.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Montreal (YUL) — ~1.5 hrs", "Seamless cross-border transfers to Montréal-Trudeau International Airport and the city."],
                ["Albany, NY (ALB) — ~2 hrs", "Albany International Airport for alternative flight options and lower fares."],
                ["Vermont Destinations", "Stowe, Montpelier, Waterbury, Middlebury, St. Albans, and every corner of Vermont."],
                ["Comfortable & Well-Equipped", "Toyota Sienna 2026 with Wi-Fi, climate control, USB charging, and luggage capacity for any trip."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl border border-border bg-surface/60 p-5">
                  <h4 className="font-display text-base text-gold">{t}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <BookingForm />
        </div>
      </section>

      <CTASection />
    </>
  );
}
