import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { BookingForm } from "@/components/BookingForm";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/corporate")({
  head: () => pageHead({
    title: "Corporate & Executive Transportation — Burlington VT Taxi Ride",
    description: "Discreet, punctual corporate car service for Vermont businesses and visiting executives. Account billing and priority dispatch.",
    image: "/places/burlington-vt.jpg",
    path: "/corporate",
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="Burlington VT Taxi Ride"
        title="Corporate & Executive"
        highlight="Transportation"
        description="Discreet, punctual, and professional corporate car service for Vermont businesses and visiting executives. Account billing and priority dispatch available."
        backgroundImage="/places/burlington-vt.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Executive Car Service</p>
            <h2 className="mt-3 font-display text-4xl">Vermont's Premier Corporate Transport</h2>
            <p className="mt-4 text-muted-foreground">
              Burlington VT Taxi Ride provides dedicated corporate transportation to Vermont's leading employers, regional businesses, and visiting executives. From BTV Airport transfers to inter-office Burlington–Montpelier runs and client pickup — we deliver.
            </p>
            <p className="mt-4 text-muted-foreground">
              Corporate account holders receive priority dispatch, consolidated monthly invoicing, dedicated account management, and access to our premium fleet. No apps, no unpredictability — just a professional driver, on time, every time.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Safe & Discreet", "Our drivers operate with full discretion — your privacy and confidentiality are always protected."],
                ["Account Billing & Reporting", "Consolidated monthly invoice with full trip reporting. Simple expense integration."],
                ["Priority Dispatch", "Account holders skip the queue. Last-minute pickups handled with the same professionalism."],
                ["Premium Fleet", "Late-model Toyota Sienna with Wi-Fi, climate control, and ample room for laptops and luggage."],
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
