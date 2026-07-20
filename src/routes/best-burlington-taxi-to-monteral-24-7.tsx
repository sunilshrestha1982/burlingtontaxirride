import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { BookingForm } from "@/components/BookingForm";
import { CTASection } from "@/components/CTASection";
import { Check, Clock, ShieldCheck, Plane, MapPin, Phone } from "lucide-react";
import { PHONE, PHONE_TEL } from "@/lib/site-data";

export const Route = createFileRoute("/best-burlington-taxi-to-monteral-24-7")({
  head: () =>
    pageHead({
      title: "Best Burlington to Montreal Taxi — 24/7 Car Service | Burlington VT Taxi Ride",
      description:
        "Reliable 24/7 taxi and car service from Burlington, Vermont to Montreal, Canada (and YUL Trudeau Airport). Fixed cross-border rates, professional drivers, and door-to-door service.",
      image: "/places/montreal-city.jpg",
      path: "/best-burlington-taxi-to-monteral-24-7",
    }),
  component: Page,
});

const highlights = [
  { icon: Clock, title: "24/7 Cross-Border Service", desc: "Day or night — including early-morning YUL flights and late Montreal returns." },
  { icon: Plane, title: "Direct to YUL Airport", desc: "Door-to-door service to Montréal-Trudeau International Airport (YUL) with flight tracking." },
  { icon: ShieldCheck, title: "Experienced Border Drivers", desc: "Drivers who know the Highgate Springs / Saint-Armand crossing and the fastest routes into downtown Montreal." },
  { icon: MapPin, title: "Anywhere in Montreal", desc: "Downtown hotels, Old Port, Plateau, Laval, West Island, or private addresses — one flat rate." },
];

const reasons = [
  "Fixed cross-border rate confirmed before you book — no surge pricing",
  "Approx. 2 hours from Burlington to downtown Montreal (traffic and border dependent)",
  "Clean 2026 Toyota Sienna, seats up to 7 passengers plus luggage",
  "We monitor your YUL flight in real time — free waiting on delays",
  "Meet-and-greet service at YUL, downtown Montreal hotels, and cruise terminals",
  "Passengers are responsible for their own valid passport / travel documents",
];

const routes = [
  { from: "Burlington, VT", to: "Downtown Montreal, QC" },
  { from: "Burlington International (BTV)", to: "Montréal-Trudeau (YUL)" },
  { from: "Stowe, VT", to: "Montreal, QC" },
  { from: "South Burlington, VT", to: "Old Port Montreal" },
  { from: "Colchester / Winooski, VT", to: "Laval / West Island" },
  { from: "Jay Peak, VT", to: "Montreal, QC" },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="— Burlington → Montreal"
        title="Best Burlington Taxi to"
        highlight="Montreal 24/7"
        description="Cross-border car service from Burlington, Vermont to Montreal, Canada and YUL Trudeau Airport. Fixed rates, professional drivers, and available around the clock."
        backgroundImage="/places/montreal-city.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Burlington VT → Montreal, Canada</p>
            <h2 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl">
              The Best 24/7 <span className="text-gradient-gold">Burlington to Montreal</span> Taxi Service
            </h2>
            <div className="mt-3 h-1 w-16 rounded bg-gold/70" />
            <p className="mt-6 text-muted-foreground">
              Traveling from Burlington, Vermont to Montreal, Canada? Burlington VT Taxi Ride offers the most reliable
              24/7 cross-border car service between BTV and YUL Trudeau International Airport, downtown Montreal
              hotels, and anywhere in Quebec. Every trip is booked at a confirmed flat rate — no surge pricing, no
              hidden fees, no surprises at the border.
            </p>
            <p className="mt-4 text-muted-foreground">
              The drive from Burlington to downtown Montreal is roughly 95 miles (about 2 hours), crossing at Highgate
              Springs / Saint-Armand. Our drivers know the route, the border, and the fastest way into the city no
              matter the hour. Book ahead for early-morning YUL flights, late-night returns, business meetings,
              hockey games, concerts, or weekend getaways.
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

            <h3 className="mt-12 font-display text-2xl sm:text-3xl">What's Included</h3>
            <ul className="mt-5 space-y-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3 text-muted-foreground">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-12 font-display text-2xl sm:text-3xl">Popular Burlington ↔ Montreal Routes</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {routes.map((r) => (
                <div key={r.from + r.to} className="rounded-xl border border-border bg-surface/40 p-4 text-sm">
                  <p className="text-muted-foreground">{r.from}</p>
                  <p className="text-gold">↓</p>
                  <p className="font-medium">{r.to}</p>
                </div>
              ))}
            </div>

            <h3 className="mt-12 font-display text-2xl sm:text-3xl">Border Crossing Tips</h3>
            <ul className="mt-5 space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" /><span>All passengers must carry a valid passport or approved travel document (NEXUS, enhanced driver's license, etc.).</span></li>
              <li className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" /><span>Minors traveling without both parents may require a notarized consent letter.</span></li>
              <li className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" /><span>Border wait times vary — we plan every YUL airport transfer with a buffer to make your flight on time.</span></li>
              <li className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" /><span>Have your travel documents ready and answer border officers directly and honestly.</span></li>
            </ul>

            <div className="mt-12 rounded-2xl border border-gold/30 bg-gradient-to-br from-surface/60 to-background p-8 text-center shadow-gold">
              <h3 className="font-display text-2xl sm:text-3xl">Ready to Travel Burlington → Montreal?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Book online or call — confirmed in minutes, 24/7.</p>
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
