export type Location = {
  slug: string;
  label: string;
  title: string;
  destination: string;
  drive: string;
  image: string;
  description: string;
};

export const LOCATIONS: Location[] = [
  { slug: "burlington-montreal-shuttle", label: "Burlington to Montreal (YUL) Shuttle", title: "Burlington to Montréal (YUL) Shuttle", destination: "Montréal-Trudeau Airport", drive: "~2 hr (incl. border)", image: "/places/montreal-city.jpg",
    description: "Direct cross-border shuttle between Burlington, VT and Montréal-Trudeau International Airport (YUL). Flight tracking, meet-and-greet, passport assistance, and fixed rates 24/7." },
  { slug: "burlington-stowe-taxi", label: "Burlington to/from Stowe", title: "Burlington to / from Stowe, VT", destination: "Stowe, VT", drive: "~40 min", image: "/places/stowe-vt.jpg",
    description: "Door-to-door car service between Burlington / BTV and Stowe, VT. Ski-gear friendly, fixed rates, 24/7 — perfect for resort guests and Stowe Mountain visitors." },
  { slug: "burlington-montpelier-taxi", label: "Burlington to/from Montpelier", title: "Burlington to / from Montpelier, VT", destination: "Montpelier, VT", drive: "~45 min", image: "/places/montpelier-vt.jpg",
    description: "Reliable taxi and chauffeur service between Burlington and Vermont's state capital — business meetings, legislative visits, and personal travel." },
  { slug: "burlington-middlebury-taxi", label: "Burlington to Middlebury", title: "Burlington to Middlebury, VT", destination: "Middlebury, VT", drive: "~45 min", image: "/places/middlebury-vt.jpg",
    description: "Comfortable rides between Burlington and Middlebury — including Middlebury College drop-offs, family visits, and event transportation." },
  { slug: "burlington-warren-waitsfield-taxi", label: "Burlington to Warren / Waitsfield", title: "Burlington to Warren / Waitsfield, VT", destination: "Warren & Waitsfield (Mad River Valley)", drive: "~1 hr", image: "https://loremflickr.com/1600/900/vermont,warren,waitsfield,mad-river-valley,landscape?lock=201",
    description: "Mad River Valley transfers from Burlington — Warren, Waitsfield and surrounding lodges. Ski-gear friendly, fixed pricing." },
  { slug: "burlington-sugarbush-taxi", label: "Burlington to Sugarbush", title: "Burlington to Sugarbush Resort", destination: "Sugarbush Resort, VT", drive: "~1 hr", image: "/places/sugarbush-vt.jpg",
    description: "Direct ski shuttle from Burlington / BTV to Sugarbush Resort. Equipment welcome, early-morning pickups available." },
  { slug: "burlington-smugglers-notch-taxi", label: "Burlington to Smugglers Notch", title: "Burlington to Smugglers' Notch", destination: "Smugglers' Notch Resort, VT", drive: "~50 min", image: "/places/smugglers-notch-vt.jpg",
    description: "Quick, comfortable transfers from Burlington / BTV to Smugglers' Notch Resort — family-friendly with room for gear." },
  { slug: "burlington-st-albans-taxi", label: "Burlington to St. Albans", title: "Burlington to St. Albans, VT", destination: "St. Albans, VT", drive: "~35 min", image: "/places/st-albans-vt.jpg",
    description: "Direct taxi service between Burlington and St. Albans — commuter, medical, and airport-connection transfers." },
  { slug: "burlington-swanton-taxi", label: "Burlington to Swanton", title: "Burlington to Swanton, VT", destination: "Swanton, VT", drive: "~45 min", image: "https://loremflickr.com/1600/900/vermont,swanton,landscape,nature?lock=202",
    description: "Reliable car service between Burlington and Swanton, VT — fixed-rate quote, professional drivers, 24/7 availability." },
  { slug: "burlington-jay-taxi", label: "Burlington to Jay Peak", title: "Burlington to Jay Peak Resort", destination: "Jay Peak Resort, VT", drive: "~1 hr 45 min", image: "/places/jay-peak-vt.jpg",
    description: "Long-distance ski shuttle from Burlington / BTV to Jay Peak Resort. Pre-booked fixed rate, gear-friendly vehicles." },
  { slug: "burlington-killington-taxi", label: "Burlington to/from Killington", title: "Burlington to / from Killington", destination: "Killington Resort, VT", drive: "~1 hr 45 min", image: "/places/killington-vt.jpg",
    description: "Door-to-door car service between Burlington / BTV and Killington Resort — ski, conference, and lodging transfers." },
  { slug: "burlington-newport-taxi", label: "Burlington to Newport", title: "Burlington to Newport, VT", destination: "Newport, VT", drive: "~1 hr 30 min", image: "https://loremflickr.com/1600/900/vermont,newport,lake-memphremagog,landscape?lock=203",
    description: "Comfortable Northeast Kingdom transfers between Burlington and Newport, VT — including Lake Memphremagog destinations." },
  { slug: "tyler-place-family-resort", label: "Tyler Place Family Resort", title: "Burlington / BTV to Tyler Place Family Resort", destination: "Tyler Place Family Resort, Highgate Springs, VT", drive: "~45 min", image: "https://loremflickr.com/1600/900/vermont,highgate-springs,lake-champlain,landscape?lock=204",
    description: "Family-friendly transfers from Burlington International Airport (BTV) to the Tyler Place Family Resort in Highgate Springs, VT. Child seats available on request." },
];

import { naturalLandscapeImage, VT_DESTINATIONS } from "./site-data";

function fromDestination(slug: string): Location | undefined {
  const d = VT_DESTINATIONS.find((v) => v.slug === slug);
  if (!d) return undefined;
  return {
    slug: d.slug,
    label: `Burlington to ${d.name}`,
    title: `Burlington to ${d.name}`,
    destination: d.name,
    drive: "Fixed-rate quote",
    image: d.image,
    description: `Door-to-door taxi and chauffeur service between Burlington / BTV and ${d.name}. Fixed flat rate, professional drivers, 24/7 — book online or call for a quote.`,
  };
}

const NATURAL_LOCATION_IMAGES: Record<string, string> = {
  "burlington-warren-waitsfield-taxi": naturalLandscapeImage("burlington-warren-waitsfield-taxi", "Warren and Waitsfield, VT"),
  "burlington-swanton-taxi": naturalLandscapeImage("burlington-swanton-taxi", "Swanton, VT"),
  "burlington-newport-taxi": naturalLandscapeImage("burlington-newport-taxi", "Newport, VT"),
  "tyler-place-family-resort": naturalLandscapeImage("tyler-place-family-resort", "Tyler Place Family Resort, VT"),
};

export const locationBySlug = (slug: string): Location | undefined => {
  const loc = LOCATIONS.find((l) => l.slug === slug);
  if (loc) return { ...loc, image: NATURAL_LOCATION_IMAGES[slug] ?? loc.image };
  return fromDestination(slug);
};
