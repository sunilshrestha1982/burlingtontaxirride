import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PHONE, PHONE_TEL, VT_DESTINATIONS } from "@/lib/site-data";
import { pageHead } from "@/lib/seo";
import { loadPageContent, mergeMeta } from "@/lib/page-content";
import { BookingForm } from "@/components/BookingForm";
import { CityCard } from "@/components/PlaceCards";
import { CTASection } from "@/components/CTASection";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { Phone, Plane, Car, Briefcase, Snowflake, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  loader: () => loadPageContent("/"),
  head: ({ loaderData }) => pageHead(mergeMeta({
    title: "Burlington VT Taxi Ride | BTV Airport Taxi, Shuttle & Transportation 24/7",
    description: "Burlington VT Taxi Ride. We provide professional airport transportation from Burlington International Airport (BTV) to anywhere in Vermont, New England, and Montreal, Canada.",
    image: "/places/burlington-vt.jpg",
    path: "/",
  }, loaderData ?? null)),
  component: Index,
});

function Index() {
  const [showAllDest, setShowAllDest] = useState(false);
  const visibleDestinations = showAllDest ? VT_DESTINATIONS : VT_DESTINATIONS.slice(0, 8);
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <HeroSlideshow />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-40">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-gold sm:px-4 sm:text-xs sm:tracking-[0.25em]">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" /> Available 24/7 — Burlington, Vermont
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Burlington VT <span className="text-gradient-gold">Taxi Ride</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Fixed-rate airport transfers, corporate travel, ski shuttles and long-distance car service throughout Vermont, New England and Québec.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/book-online" className="gradient-gold inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-gold">Book a Ride</Link>
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3.5 text-sm font-semibold text-gold hover:bg-gold/10">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* WELCOME */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Hello, Welcome To</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">Burlington VT Taxi Ride</h2>
            <p className="mt-5 text-muted-foreground">
              At Burlington VT Taxi Ride, we provide first-class transportation throughout New England, combining professional service, comfort, and reliability on every journey. Based at Burlington International Airport (BTV), Vermont, we offer airport transfers, corporate travel, ski resort shuttles, and long-distance rides, including service to and from Montréal Airport (YUL).
            </p>
            <p className="mt-4 text-muted-foreground">
              From airport transfers and corporate travel to ski resort shuttles and long-distance rides — every journey is elevated by our commitment to exceptional service.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="font-display text-4xl text-gold">24/7</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Availability</div>
              </div>
              <div>
                <div className="font-display text-4xl text-gold">500+</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Happy Riders</div>
              </div>
            </div>
            <Link to="/book-online" className="mt-8 inline-flex items-center gap-2 rounded-md gradient-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold">Book a Ride Now</Link>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* SERVICES */}
      <section className="border-y border-border/60 bg-surface/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gold text-center">What We Offer</p>
          <h2 className="mt-3 text-center font-display text-4xl sm:text-5xl">Our Top Services</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">Custom services to meet your every need — discover our most popular rides.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Plane, title: "Airport Transfers", to: "/airport-transfers", img: "/places/btv-airport.jpg",
                desc: "Door-to-door service to & from Burlington International Airport (BTV). Flight tracking, meet & greet, fixed rates — 24/7." },
              { icon: Car, title: "Long Distance & Out-of-State", to: "/long-distance", img: "/places/montreal-city.jpg",
                desc: "Burlington to Montréal (YUL), Albany (ALB), Boston, Stowe and across Vermont. Fixed quote, professional driver." },
              { icon: Briefcase, title: "Corporate & Executive", to: "/corporate", img: "/places/burlington-vt.jpg",
                desc: "Discreet, punctual business travel for Vermont companies and visiting executives. Account billing available." },
              { icon: Snowflake, title: "Ski Resort Transfers", to: "/ski-resort", img: "/places/stowe-vt.jpg",
                desc: "Stowe, Sugarbush, Smugglers' Notch, Bolton Valley, Jay Peak and more. Equipment welcome." },
            ].map((s) => (
              <article key={s.title} className="hover-zoom-card group overflow-hidden rounded-2xl border border-border bg-background hover:border-gold/60 hover:shadow-gold transition">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={s.title} className="hover-zoom-img h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <s.icon className="h-7 w-7 text-gold" />
                  <h3 className="mt-3 font-display text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <Link to={s.to} className="mt-4 inline-flex text-xs font-bold uppercase tracking-widest text-gold hover:underline">Learn more →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gold text-center">Driven by Excellence</p>
        <h2 className="mt-3 text-center font-display text-4xl sm:text-5xl">Why Choose Burlington VT Taxi Ride</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Professional Chauffeur", "Every driver is licensed, background-checked, and trained to the highest standard."],
            ["Safe & Discreet", "Trust us completely. Our drivers operate with full professionalism and discretion."],
            ["Clean & Comfortable", "A modern, luxurious experience in a spotless vehicle — detailed before every trip."],
            ["Real-Time Flight Tracking", "We monitor your BTV flight automatically. Delays handled at no extra charge."],
            ["Fixed Rates — No Surge", "Your fare is confirmed before you book and locked in. No hidden fees."],
            ["24/7 Support", "Real humans answer — call, text, or WhatsApp us any hour of any day."],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-2xl border border-border bg-surface/50 p-6">
              <h4 className="font-display text-lg text-gold">{title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CITIES WE SERVE */}
      <section className="border-y border-border/60 bg-surface/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">We Go Anywhere</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Cities We Serve</h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            Door-to-door taxi and shuttle service to Montréal-Trudeau International Airport (YUL) from Burlington Airport (BTV), Plattsburgh NY, and Stowe VT — every day, both directions. Fixed-rate, on-time, professional drivers.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {[
              { title: "Plattsburgh NY → Montreal Airport (YUL)", img: "/places/plattsburgh-ny.jpg",
                body: "Direct cross-border transfer from Plattsburgh, NY (including PBG airport) to Montréal-Trudeau International Airport. Passport required. Approx. 1 hr 15 min drive depending on border wait." },
              { title: "Burlington Airport (BTV) → Montreal Airport (YUL)", img: "/places/btv-airport.jpg",
                body: "Direct cross-border transfer from Burlington International Airport (BTV) to Montréal-Trudeau International Airport (YUL). Approx. 2 hr drive including border. Flight tracking, fixed pricing, meet-and-greet at BTV arrivals." },
              { title: "Stowe VT → Montreal Airport (YUL)", img: "/places/stowe-vt.jpg",
                body: "Door-to-door cross-border transfer from Stowe, Vermont resorts, lodges, and homes to Montréal-Trudeau Airport (YUL). Approx. 2 hr 30 min drive including border. Pre-booked, fixed rate, ski-gear friendly." },
            ].map((c) => (
              <article key={c.title} className="hover-zoom-card group overflow-hidden rounded-2xl border border-border bg-background hover:border-gold/60 hover:shadow-gold transition">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={c.img} alt={c.title} loading="lazy" className="hover-zoom-img h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl">{c.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{c.body}</p>
                  <a href={`tel:${PHONE_TEL}`} className="mt-4 inline-flex text-xs font-bold uppercase tracking-widest text-gold hover:underline">Call {PHONE} for a quote →</a>
                </div>
              </article>
            ))}
          </div>

          {/* VT Destinations grid */}
          <div className="mt-20">
            <h3 className="font-display text-3xl font-bold sm:text-4xl md:text-5xl">Burlington VT to Vermont Destinations</h3>
            <p className="mt-3 text-sm text-muted-foreground">Click any destination to book your ride</p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {visibleDestinations.map((d) => <CityCard key={d.slug} city={d} />)}
            </div>
            {VT_DESTINATIONS.length > 8 && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllDest((v) => !v)}
                  className="gradient-gold rounded-md px-8 py-3 text-sm font-semibold tracking-wider uppercase text-primary-foreground shadow-gold hover:opacity-90 transition"
                >
                  {showAllDest ? "Show Less" : `Show More (${VT_DESTINATIONS.length - 8}+ Destinations)`}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        eyebrow="— Book Your Ride"
        title="Book Your Vermont Ride Today"
        subtitle="Use our instant booking tool and get started right away — or call us 24 hours a day."
      />
    </>
  );
}
