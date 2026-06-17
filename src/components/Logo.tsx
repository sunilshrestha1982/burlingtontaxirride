import { Link } from "@tanstack/react-router";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-surface">
        <span className="text-gold text-xl">✦</span>
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`font-display tracking-wider text-gold ${compact ? "text-base sm:text-lg" : "text-lg sm:text-xl md:text-2xl"}`}>
          BURLINGTON VT
        </span>
        <span className={`font-display font-bold tracking-wide text-foreground ${compact ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl md:text-4xl"}`}>
          TAXI RIDE
        </span>
        <span className={`italic text-muted-foreground ${compact ? "text-xs sm:text-sm" : "text-sm sm:text-base"}`}>
          Vermont's Premier Transportation
        </span>
      </div>
    </Link>
  );
}
