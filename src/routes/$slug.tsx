import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { locationBySlug, LOCATIONS } from "@/lib/locations";
import { VT_DESTINATIONS, PHONE, PHONE_TEL } from "@/lib/site-data";
import { BookingForm } from "@/components/BookingForm";
import { Phone, Check } from "lucide-react";

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

// Strip trailing ", VT" / " VT" / " Resort, VT" etc. for the uppercase highlight
function shortName(name: string): string {
  return name
    .replace(/,\s*VT\s*$/i, "")
    .replace(/\s+Resort$/i, " Resort")
    .trim();
}

function LocationPage() {
  const loc = Route.useLoaderData();
  const short = shortName(loc.destination);
  const upper = short.toUpperCase();

  const features = [
    { title: "Fixed Rates", desc: "Confirmed before booking" },
    { title: "Flight Tracking", desc: "Real-time BTV monitoring" },
    { title: "Toyota Sienna 2026", desc: "Up to 7 passengers" },
    { title: "24/7 Available", desc: "Every day, every holiday" },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={loc.image} alt={loc.destination} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-36 text-center">
          <div className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-gold">Home</Link>
            <span className="mx-2">›</span>
            <span>Destinations</span>
            <span className="mx-2">›</span>
            <span>{short}</span>
          </div>
          <span className="mt-6 inline-block rounded-full border border-gold/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold sm:text-xs">
            Burlington VT Taxi Ride
          </span>
          <h1 className="mt-8 font-display text-5xl leading-tight sm:text-6xl md:text-7xl">
            BTV <span className="text-gold">→</span>{" "}
            <span className="text-gradient-gold">{short}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Professional taxi & car service from Burlington, Vermont to {short}. Fixed rates, licensed drivers, 24/7.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/book-online" className="gradient-gold inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-gold">
              Reserve Your Ride
            </Link>
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3.5 text-sm font-semibold text-gold hover:bg-gold/10">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Burlington VT to {short}, Vermont</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
              Burlington VT to <span className="text-gradient-gold">{upper}</span> Taxi & Shuttle Service
            </h2>
            <div className="mt-3 h-1 w-16 rounded bg-gold/70" />
            <p className="mt-6 text-muted-foreground">
              Burlington VT Taxi Ride provides professional, fixed-rate transportation to and from {short}, Vermont. Our licensed drivers offer reliable service 24/7 — whether you need an airport transfer to Burlington International (BTV), a long-distance ride, or a point-to-point trip across Vermont. Every fare is confirmed before you book with no surge pricing and no hidden fees.
            </p>
            <p className="mt-4 text-muted-foreground">
              Whether you're heading to {short} for business, a getaway, or a connection home, our drivers know the routes, plan around weather and traffic, and make sure every pickup is on time. Clean, modern vehicles with plenty of room for luggage, gear, and groups up to 7.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-border bg-surface/40 p-5">
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="font-display text-lg">{f.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-gold/30 bg-gradient-to-br from-surface/60 to-background p-8 text-center shadow-gold">
              <h3 className="font-display text-2xl sm:text-3xl">Ready to Travel to {short}?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Book online or call us — confirmed in minutes.</p>
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

      {/* OTHER ROUTES */}
      <section className="border-y border-border/60 bg-surface/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="font-display text-2xl">Other Popular Destinations</h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {[...LOCATIONS.map((l) => ({ slug: l.slug, label: l.label })),
              ...VT_DESTINATIONS.map((d) => ({ slug: d.slug, label: d.name }))]
              .filter((l, i, arr) => l.slug !== loc.slug && arr.findIndex((x) => x.slug === l.slug) === i)
              .slice(0, 24)
              .map((l) => (
                <Link key={l.slug} to="/$slug" params={{ slug: l.slug }} className="rounded-full border border-border bg-background px-4 py-2 text-xs text-muted-foreground hover:border-gold/60 hover:text-gold">
                  {l.label}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
