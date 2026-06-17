import { createFileRoute, Link } from "@tanstack/react-router";
import { LOCATIONS } from "@/lib/locations";
import { AIRPORTS, VT_DESTINATIONS } from "@/lib/site-data";

const SITE = "https://burlingtontaxirride.taxi-webdesign.com";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Sitemap — Burlington VT Taxi Ride" },
      { name: "description", content: "Browse every page on Burlington VT Taxi Ride — services, locations, airports, and contact." },
      { property: "og:url", content: `${SITE}/sitemap` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/sitemap` }],
  }),
  component: Page,
});

const main = [
  { to: "/", label: "Home" },
  { to: "/airport-transfers", label: "Airport Transfers" },
  { to: "/airports-we-serve", label: "Airports We Serve" },
  { to: "/long-distance", label: "Long Distance" },
  { to: "/corporate", label: "Corporate & Executive" },
  { to: "/ski-resort", label: "Ski Resort Transfers" },
  { to: "/services", label: "All Services" },
  { to: "/book-online", label: "Book Online" },
  { to: "/contact", label: "Contact Us" },
] as const;

const legal = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
  { to: "/sitemap", label: "Sitemap" },
] as const;

function Row({ to, label }: { to: string; label: string }) {
  return (
    <li className="flex flex-col gap-0.5 border-b border-border/40 py-2 last:border-0">
      <Link to={to} className="text-sm text-muted-foreground hover:text-gold">{label}</Link>
      <span className="text-[10px] text-muted-foreground/60">{SITE}{to}</span>
    </li>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-surface/40 p-6">
      <h2 className="font-display text-2xl text-gold">{title}</h2>
      <ul className="mt-4">{children}</ul>
    </section>
  );
}

function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Site Index</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Sitemap</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Every page on Burlington VT Taxi Ride, all in one place. Each link below shows its canonical URL.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <Group title="Main Pages">
          {main.map((p) => <Row key={p.to} to={p.to} label={p.label} />)}
        </Group>

        <Group title="Legal">
          {legal.map((p) => <Row key={p.to} to={p.to} label={p.label} />)}
        </Group>

        <Group title="Locations">
          {LOCATIONS.map((l) => (
            <Row key={l.slug} to={`/${l.slug}`} label={l.label} />
          ))}
        </Group>

        <Group title="Airports We Serve">
          {AIRPORTS.map((a) => (
            <li key={a.code} className="border-b border-border/40 py-2 text-sm text-muted-foreground last:border-0">
              <span className="text-gold">{a.code}</span> — {a.name}
              <span className="block text-[10px] text-muted-foreground/60">{a.location}</span>
            </li>
          ))}
        </Group>

        <Group title="Vermont Destinations">
          {VT_DESTINATIONS.map((d) => (
            <li key={d.slug} className="border-b border-border/40 py-2 text-sm text-muted-foreground last:border-0">{d.name}</li>
          ))}
        </Group>
      </div>
    </div>
  );
}
