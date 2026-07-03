import { MapPin } from "lucide-react";
import { ADDRESS } from "@/lib/site-data";

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/EWZ4owqfSE7wfniN8?g_st=ic";
const EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  "Burlington VT Taxi Ride, " + ADDRESS
)}&output=embed`;

export function LocationMap({
  className = "",
  height = 260,
  title = "Burlington VT Taxi Ride on Google Maps",
}: {
  className?: string;
  height?: number;
  title?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-border bg-surface/60 ${className}`}>
      <iframe
        title={title}
        src={EMBED_SRC}
        width="100%"
        height={height}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ border: 0, display: "block" }}
        allowFullScreen
      />
      <a
        href={GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border-t border-border/60 bg-surface/80 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-gold hover:bg-surface"
      >
        <MapPin className="h-4 w-4" />
        View on Google Maps
      </a>
    </div>
  );
}
