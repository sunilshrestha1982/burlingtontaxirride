import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { BookingForm } from "@/components/BookingForm";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/ski-resort")({
  head: () => ({
    meta: [
      { title: "Vermont Ski Resort Transfers — Burlington VT Taxi Ride" },
      { name: "description", content: "Safe, comfortable ski shuttles from Burlington to Stowe, Sugarbush, Smugglers' Notch, Bolton Valley, Jay Peak and every Vermont mountain." },
      { property: "og:title", content: "Vermont Ski Resort Transfers" },
      { property: "og:description", content: "Ski Vermont. We'll Drive. Equipment always welcome." },
      { property: "og:image", content: "/places/jay-peak-vt.jpg" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Burlington VT Taxi Ride"
        title="Vermont Ski"
        highlight="Resort Transfers"
        description="Safe, comfortable ski shuttles from Burlington to Stowe, Sugarbush, Smugglers' Notch, Bolton Valley, Jay Peak, and every Vermont mountain. Equipment always welcome."
        backgroundImage="/places/jay-peak-vt.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Vermont Ski Season</p>
            <h2 className="mt-3 font-display text-4xl">Ski Vermont. <span className="text-gradient-gold">We'll Drive.</span></h2>
            <p className="mt-4 text-muted-foreground">
              Vermont is home to some of the best skiing in the Northeast — and Burlington VT Taxi Ride is the safest, most comfortable way to get there. Whether you're flying into BTV and heading straight to the slopes, or a local planning a day at Stowe, we'll get you there with all your gear.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our Toyota Sienna 2026 handles ski equipment, snowboards, boot bags, and up to 7 passengers. We navigate Vermont mountain roads in every condition — ice, snow, and everything in between.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["All Vermont Ski Resorts", "Stowe, Sugarbush, Smugglers' Notch, Bolton Valley, Jay Peak, Mad River Glen, and more."],
                ["Equipment Always Welcome", "Ski bags, snowboards, boot bags, poles, helmets — all accommodated in our full-size SUV."],
                ["Early Morning Pickup", "First-chair early? We're up earlier. Pre-dawn pickups available throughout the season."],
                ["Winter-Ready Vehicles", "All-weather tires, AWD, and drivers experienced with Vermont mountain roads in every condition."],
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
