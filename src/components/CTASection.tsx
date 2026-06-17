import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle } from "lucide-react";
import { PHONE, PHONE_TEL, WHATSAPP } from "@/lib/site-data";

export function CTASection({ eyebrow = "Ready to Ride?", title = "Book Your Vermont Ride Today", subtitle = "Fixed rates, professional licensed drivers, 24/7 availability. Call us or book online — confirmed within minutes." }: { eyebrow?: string; title?: string; subtitle?: string }) {
  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-surface/40 py-20">
      <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_30%_50%,oklch(0.78_0.13_80_/_0.25),transparent_60%)]" />
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
        <h2 className="mt-3 font-display text-4xl sm:text-5xl text-foreground">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">{subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/book-online" className="gradient-gold inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold text-primary-foreground shadow-gold">
            Book Online Now
          </Link>
          <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3 text-sm font-semibold text-gold hover:bg-gold/10">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
          <a href={WHATSAPP} className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
