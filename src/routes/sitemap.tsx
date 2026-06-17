import { createFileRoute, Link } from "@tanstack/react-router";
import { LOCATIONS } from "@/lib/locations";
import { AIRPORTS, VT_DESTINATIONS } from "@/lib/site-data";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Sitemap — Burlington VT Taxi Ride" },
      { name: "description", content: "Browse every page on Burlington VT Taxi Ride — services, locations, airports, and contact." },
    ],
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

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-surface/40 p-6">
      <h2 className="font-display text-2xl text-gold">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm">{children}</ul>
    </section>
  );
}

function Page() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Site Index</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Sitemap</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Every page on Burlington VT Taxi Ride, all in one place.</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Group title="Main Pages">
          {main.map((p) => (
            <li key={p.to}><Link to={p.to} className="text-muted-foreground hover:text-gold">{p.label}</Link></li>
          ))}
        </Group>

        <Group title="Locations">
          {LOCATIONS.map((l) => (
            <li key={l.slug}>
              <Link to="/$slug" params={{ slug: l.slug }} className="text-muted-foreground hover:text-gold">{l.label}</Link>
            </li>
          ))}
        </Group>

        <Group title="Airports">
          {AIRPORTS.map((a) => (
            <li key={a.code} className="text-muted-foreground">
              <span className="text-gold">{a.code}</span> — {a.name}
            </li>
          ))}
        </Group>

        <Group title="Vermont Destinations">
          {VT_DESTINATIONS.map((d) => (
            <li key={d.slug} className="text-muted-foreground">{d.name}</li>
          ))}
        </Group>

        <Group title="Legal">
          {legal.map((p) => (
            <li key={p.to}><Link to={p.to} className="text-muted-foreground hover:text-gold">{p.label}</Link></li>
          ))}
        </Group>
      </div>
    </div>
  );
}
