import { Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { PHONE, PHONE_TEL } from "@/lib/site-data";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  ctaLabel = "Reserve Your Ride",
  backgroundImage,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description: string;
  ctaLabel?: string;
  backgroundImage?: string;
  breadcrumb?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {backgroundImage ? (
          <img src={backgroundImage} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_30%_50%,oklch(0.78_0.13_80_/_0.18),transparent_60%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        {breadcrumb && <div className="mb-6 text-sm text-muted-foreground">{breadcrumb}</div>}
        {eyebrow && <span className="inline-block rounded-full border border-gold/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold">{eyebrow}</span>}
        <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight text-foreground sm:text-5xl md:text-6xl">
          {title}{" "}
          {highlight && <span className="text-gradient-gold">{highlight}</span>}
        </h1>
        <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/book-online" className="gradient-gold inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold">{ctaLabel}</Link>
          <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3 text-sm font-semibold text-gold hover:bg-gold/10">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
