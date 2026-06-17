import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { PHONE, PHONE_TEL } from "@/lib/site-data";

const links = [
  { to: "/", label: "Home" },
  { to: "/airport-transfers", label: "Airport Transfers" },
  { to: "/airports-we-serve", label: "Airports We Serve" },
  { to: "/long-distance", label: "Long Distance" },
  { to: "/services", label: "Services" },
  { to: "/corporate", label: "Corporate" },
  { to: "/ski-resort", label: "Ski Resort" },
  { to: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo compact />
        <nav className="hidden xl:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-gold [&.active]:text-gold [&.active]:border-b-2 [&.active]:border-gold"
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <a href={`tel:${PHONE_TEL}`} className="ml-2 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-gold hover:bg-surface">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
        </nav>
        <button className="xl:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="xl:hidden border-t border-border/60 bg-background">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base text-muted-foreground hover:bg-surface hover:text-gold [&.active]:text-gold"
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <a href={`tel:${PHONE_TEL}`} className="mt-2 inline-flex items-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-semibold text-primary-foreground">
              <Phone className="h-4 w-4" /> Call {PHONE}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
