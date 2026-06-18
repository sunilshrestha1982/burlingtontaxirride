import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { PHONE, PHONE_TEL } from "@/lib/site-data";
import { LOCATIONS } from "@/lib/locations";

const links = [
  { to: "/", label: "Home" },
  { to: "/airport-transfers", label: "Airport Transfers" },
  { to: "/airports-we-serve", label: "Airports We Serve" },
  { to: "/long-distance", label: "Long Distance" },
] as const;

const tail = [
  { to: "/corporate", label: "Corporate" },
  { to: "/ski-resort", label: "Ski Resort" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [locOpen, setLocOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo compact />
        <nav className="hidden lg:flex flex-wrap items-center justify-center gap-1 xl:gap-2">
          {links.map((l) => (
            <Link key={l.to} to={l.to}
              className="shrink-0 whitespace-nowrap px-2 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-gold xl:px-3 xl:text-sm [&.active]:text-gold [&.active]:border-b-2 [&.active]:border-gold"
              activeOptions={{ exact: l.to === "/" }}>
              {l.label}
            </Link>
          ))}

          {/* Location dropdown (replaces Services) */}
          <div className="relative shrink-0" onMouseEnter={() => setLocOpen(true)} onMouseLeave={() => setLocOpen(false)}>
            <button className="inline-flex items-center gap-1 whitespace-nowrap px-2 py-2 text-[13px] font-medium text-muted-foreground hover:text-gold xl:px-3 xl:text-sm">
              Location <ChevronDown className="h-3.5 w-3.5 shrink-0" />
            </button>
            {locOpen && (
              <div className="absolute left-0 top-full z-50 w-72 rounded-md border border-border bg-background py-2 shadow-gold">
                {LOCATIONS.map((l) => (
                  <Link key={l.slug} to="/$slug" params={{ slug: l.slug }}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-gold">
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {tail.map((l) => (
            <Link key={l.to} to={l.to}
              className="shrink-0 whitespace-nowrap px-2 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-gold xl:px-3 xl:text-sm [&.active]:text-gold [&.active]:border-b-2 [&.active]:border-gold">
              {l.label}
            </Link>
          ))}
          <a href={`tel:${PHONE_TEL}`} className="ml-1 inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-md px-2 py-2 text-[13px] font-semibold text-gold hover:bg-surface xl:px-3 xl:text-sm">
            <Phone className="h-4 w-4 shrink-0" /> <span className="hidden xl:inline">{PHONE}</span>
          </a>
        </nav>
        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base text-muted-foreground hover:bg-surface hover:text-gold [&.active]:text-gold"
                activeOptions={{ exact: l.to === "/" }}>
                {l.label}
              </Link>
            ))}
            <details className="rounded-md px-1">
              <summary className="cursor-pointer rounded-md px-3 py-2 text-base text-muted-foreground hover:bg-surface hover:text-gold">Location</summary>
              <div className="ml-2 mt-1 border-l border-border pl-3">
                {LOCATIONS.map((l) => (
                  <Link key={l.slug} to="/$slug" params={{ slug: l.slug }} onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-gold">
                    {l.label}
                  </Link>
                ))}
              </div>
            </details>
            {tail.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-base text-muted-foreground hover:bg-surface hover:text-gold [&.active]:text-gold">
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
