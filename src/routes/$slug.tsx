import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { locationBySlug, LOCATIONS } from "@/lib/locations";
import { PHONE, PHONE_TEL } from "@/lib/site-data";
import { BookingForm } from "@/components/BookingForm";
import { CTASection } from "@/components/CTASection";
import { Phone, MapPin, Clock, BadgeCheck } from "lucide-react";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const loc = locationBySlug(params.slug);
    if (!loc) throw notFound();
    return loc;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Burlington VT Taxi Ride` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.description },
          { property: "og:image", content: loaderData.image },
        ]
      : [],
  }),
  errorComponent: ({ error }) => <div className="p-10 text-center text-muted-foreground">{error.message}</div>,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <h1 className="font-display text-5xl text-gold">404</h1>
      <p className="mt-4 text-muted-foreground">Page not found.</p>
      <Link to="/" className="mt-6 inline-block text-gold underline">Back home</Link>
    </div>
  ),
  component: LocationPage,
});

function LocationPage() {
  const loc = Route.useLoaderData();
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={loc.image} alt={loc.destination} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Burlington VT Taxi Ride</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl md:text-6xl">{loc.title}</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">{loc.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book-online" className="gradient-gold inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold">Book This Ride</Link>
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3.5 text-sm font-semibold text-gold hover:bg-gold/10">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            { icon: MapPin, label: "Destination", value: loc.destination },
            { icon: Clock, label: "Approx. Drive", value: loc.drive },
            { icon: BadgeCheck, label: "Pricing", value: "Fixed flat-rate quote" },
          ].map((f) => (
            <div key={f.label} className="rounded-2xl border border-border bg-surface/40 p-6">
              <f.icon className="h-6 w-6 text-gold" />
              <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{f.label}</p>
              <p className="mt-1 font-display text-xl">{f.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">About this route</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">{loc.destination}</h2>
            <p className="mt-4 text-muted-foreground">{loc.description}</p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li>• Licensed, background-checked professional drivers</li>
              <li>• Fixed flat rate — confirmed before you book</li>
              <li>• Flight tracking on all airport pickups</li>
              <li>• Clean, modern vehicles with room for luggage and gear</li>
              <li>• 24/7 availability including holidays</li>
            </ul>
          </div>
          <BookingForm />
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="font-display text-2xl">Other Popular Routes</h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {LOCATIONS.filter((l) => l.slug !== loc.slug).map((l) => (
              <Link key={l.slug} to="/$slug" params={{ slug: l.slug }} className="rounded-full border border-border bg-background px-4 py-2 text-xs text-muted-foreground hover:border-gold/60 hover:text-gold">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
