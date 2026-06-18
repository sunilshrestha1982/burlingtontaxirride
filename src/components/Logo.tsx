import { Link } from "@tanstack/react-router";
import brLogo from "@/assets/br-logo.jpeg.asset.json";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="group flex min-w-0 items-center gap-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/40 bg-surface sm:h-14 sm:w-14">
        <img src={brLogo.url} alt="BR Taxi Ride logo" className="h-full w-full object-cover" />
      </div>
      <div className="flex min-w-0 flex-col leading-none">
        <span className={`font-display font-bold text-gold ${compact ? "text-lg sm:text-xl md:text-2xl" : "text-xl sm:text-2xl md:text-3xl"}`}>
          BURLINGTON VT
        </span>
        <span className={`font-display font-black text-foreground ${compact ? "text-2xl sm:text-3xl md:text-4xl" : "text-3xl sm:text-4xl md:text-5xl"}`}>
          TAXI RIDE
        </span>
        <span className={`mt-1 font-semibold italic text-muted-foreground ${compact ? "text-sm sm:text-base" : "text-base sm:text-lg"}`}>
          Vermont's Premier Transportation
        </span>
      </div>
    </Link>
  );
}
