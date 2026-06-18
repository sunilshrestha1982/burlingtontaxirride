import { Link } from "@tanstack/react-router";
import type { Airport, City } from "@/lib/site-data";

export function CityCard({ city }: { city: City }) {
  return (
    <Link
      to="/$slug"
      params={{ slug: city.slug }}
      className="hover-zoom-card group block overflow-hidden rounded-xl border border-border bg-surface transition-all hover:border-gold/60 hover:shadow-gold"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={city.image}
          alt={`Taxi from Burlington to ${city.name}`}
          loading="lazy"
          className="hover-zoom-img destination-card-img h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg text-foreground group-hover:text-gold">{city.name}</h3>
      </div>
    </Link>
  );
}

export function AirportCard({ airport }: { airport: Airport }) {
  return (
    <article className="hover-zoom-card group overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-gold/60 hover:shadow-gold">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={airport.image}
          alt={`${airport.name} airport transfer from Burlington VT`}
          loading="lazy"
          className="hover-zoom-img h-full w-full object-cover"
        />
        <span className="absolute left-4 top-4 rounded-md bg-gold px-3 py-1 text-xs font-bold tracking-wider text-primary-foreground">
          {airport.code}
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl text-foreground">{airport.name}</h3>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>📍 {airport.location}</span>
          <span>🕐 {airport.drive}</span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{airport.description}</p>
        <Link to="/book-online" className="mt-4 inline-flex text-xs font-bold uppercase tracking-widest text-gold hover:underline">
          Book Transfer →
        </Link>
      </div>
    </article>
  );
}
