import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { PHONE, PHONE_TEL, EMAIL, WHATSAPP, ADDRESS } from "@/lib/site-data";
import { Phone, Mail, MessageCircle, Globe, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/40 mt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Logo compact />
          <p className="mt-4 text-sm text-muted-foreground">
            Professional airport transfers, taxi & chauffeur service throughout Burlington, Vermont and beyond — available 24 hours a day, 7 days a week, every holiday.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/airport-transfers" className="text-muted-foreground hover:text-gold">Airport Transfers</Link></li>
            <li><Link to="/corporate" className="text-muted-foreground hover:text-gold">Corporate Travel</Link></li>
            <li><Link to="/long-distance" className="text-muted-foreground hover:text-gold">Long Distance</Link></li>
            <li><Link to="/ski-resort" className="text-muted-foreground hover:text-gold">Ski Resort Transfers</Link></li>
            <li><Link to="/services" className="text-muted-foreground hover:text-gold">Weddings & Events</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Service Areas</h4>
          <ul className="space-y-2 text-sm">
            <li className="text-muted-foreground">Burlington, VT</li>
            <li className="text-muted-foreground">Middlebury, VT</li>
            <li className="text-muted-foreground">Stowe, VT</li>
            <li className="text-muted-foreground">Montpelier, VT</li>
            <li className="text-muted-foreground">Montréal YUL</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-gold">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li><a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold"><Phone className="h-4 w-4 text-gold" />{PHONE}</a></li>
            <li><a href={WHATSAPP} className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold"><MessageCircle className="h-4 w-4 text-gold" />WhatsApp Us</a></li>
            <li><a href={`mailto:${EMAIL}`} className="inline-flex items-start gap-2 text-muted-foreground hover:text-gold break-all"><Mail className="h-4 w-4 mt-0.5 text-gold shrink-0" />{EMAIL}</a></li>
            <li><Link to="/book-online" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold"><Globe className="h-4 w-4 text-gold" />Book Online</Link></li>
            <li className="inline-flex items-start gap-2 text-muted-foreground"><MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />{ADDRESS}</li>
          </ul>
          <h4 className="mt-6 mb-3 text-xs font-bold uppercase tracking-widest text-gold">Hours</h4>
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4 text-gold" />24/7 · Every Day · Including Holidays</p>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Burlington VT Taxi Ride · All Rights Reserved · Serving Burlington, Vermont & surrounding communities.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-gold">Privacy</Link>
            <Link to="/terms" className="hover:text-gold">Terms</Link>
            <Link to="/sitemap" className="hover:text-gold">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
