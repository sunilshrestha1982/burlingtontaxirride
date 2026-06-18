import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Plane, Car, Briefcase, Snowflake, Heart, Building2 } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => pageHead({
    title: "Our Services — Burlington VT Taxi Ride",
    description: "Airport, corporate, ski, long-distance, weddings and events transportation throughout Vermont.",
    image: "/places/burlington-vt.jpg",
    path: "/services",
  }),
  component: Page,
});

const SERVICES = [
  { icon: Plane, title: "Airport Transfers", to: "/airport-transfers", img: "/places/btv-airport.jpg",
    desc: "Door-to-door service to & from Burlington International Airport (BTV). Flight tracking, meet & greet, fixed rates — 24/7." },
  { icon: Car, title: "Long Distance & Out-of-State", to: "/long-distance", img: "/places/montreal-city.jpg",
    desc: "Burlington to Montréal (YUL), Albany (ALB), Boston, Stowe, Montpelier and across Vermont. Fixed quote, professional driver." },
  { icon: Briefcase, title: "Corporate & Executive", to: "/corporate", img: "/places/burlington-vt.jpg",
    desc: "Discreet, punctual business travel. Account billing & priority dispatch available." },
  { icon: Snowflake, title: "Ski Resort Transfers", to: "/ski-resort", img: "/places/stowe-vt.jpg",
    desc: "Stowe, Sugarbush, Smugglers' Notch, Bolton Valley, Jay Peak and more. Equipment welcome." },
  { icon: Heart, title: "Weddings & Events", to: "/contact", img: "/places/woodstock-vt.jpg",
    desc: "Bridal party transport, guest shuttles, and event-day chauffeur service across Vermont." },
  { icon: Building2, title: "Hotel & Concierge", to: "/contact", img: "/places/manchester-vt.jpg",
    desc: "Dedicated transport partnerships for Vermont hotels, inns, and concierge teams." },
];

function Page() {
  return (
    <>
      <PageHero
        eyebrow="What We Offer"
        title="Our"
        highlight="Services"
        description="Custom transportation services to meet your every need — airport, corporate, ski, long-distance, weddings and beyond."
        backgroundImage="/places/burlington-vt.jpg"
      />
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.title} className="hover-zoom-card group overflow-hidden rounded-2xl border border-border bg-surface/60 hover:border-gold/60 hover:shadow-gold transition">
              <div className="aspect-[16/10] overflow-hidden">
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
      </section>
      <CTASection />
    </>
  );
}
