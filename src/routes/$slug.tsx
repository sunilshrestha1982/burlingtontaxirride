import { createFileRoute, notFound, Link, redirect } from "@tanstack/react-router";
import { locationBySlug, LOCATIONS } from "@/lib/locations";
import { destinationTaxiSlug, VT_DESTINATIONS, PHONE, PHONE_TEL } from "@/lib/site-data";
import { absoluteImage, SITE_URL } from "@/lib/seo";
import { BookingForm } from "@/components/BookingForm";
import { loadPageContent, loadPageRedirect, type PageContent } from "@/lib/page-content";
import { Phone, Check } from "lucide-react";

const pick = (v: string | null | undefined, fallback: string) =>
  typeof v === "string" && v.trim().length > 0 ? v.trim() : fallback;

export const Route = createFileRoute("/$slug")({
  loader: async ({ params }) => {
    const destination = await loadPageRedirect(`/${params.slug}`);
    if (destination) throw redirect({ href: destination, statusCode: 301 });
    const cms = await loadPageContent(`/${params.slug}`);
    const known = locationBySlug(params.slug);
    if (!known && !cms) throw notFound();
    const destinationName = cms?.destination_name ?? known?.destination ?? cms?.nav_label ?? "Vermont";
    return {
      slug: params.slug,
      label: cms?.nav_label ?? known?.label ?? destinationName,
      title: cms?.hero_title ?? known?.title ?? `Burlington to ${destinationName} Taxi`,
      destination: destinationName,
      drive: known?.drive ?? "Fixed-rate quote",
      image: known?.image ?? cms?.hero_image ?? "/places/burlington-vt.jpg",
      description: cms?.meta_description ?? known?.description ?? `Professional Burlington taxi service to ${destinationName}.`,
      cms,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [] };
    const cms = loaderData.cms as PageContent | null;
    const url = `${SITE_URL}/${loaderData.slug}`;
    const title = pick(cms?.meta_title, `${loaderData.title} | Burlington VT Taxi Ride`);
    const description = pick(cms?.meta_description, loaderData.description);
    const image = absoluteImage(pick(cms?.hero_image, loaderData.image));
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: image },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  errorComponent: ({ error }) => <div className="p-10 text-center text-muted-foreground">{error.message}</div>,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <h1 className="font-display text-5xl text-gold">404</h1>
      <p className="mt-4 text-muted-foreground">Page not found.</p>
      <Link to="/" className="mt-6 inline-block text-gold underline">Back home</Link>
    </div>
  ),
  component: LocationPage,
});

// Strip trailing ", VT" / " VT" / " Resort, VT" etc. for the uppercase highlight
function shortName(name: string): string {
  return name
    .replace(/,\s*VT\s*$/i, "")
    .replace(/\s+Resort$/i, " Resort")
    .trim();
}

function LocationPage() {
  const loc = Route.useLoaderData();
  const cms = loc.cms as PageContent | null;
  const short = shortName(loc.destination);
  const upper = short.toUpperCase();

  const heroImage = pick(cms?.hero_image, loc.image);
  const eyebrow = pick(cms?.eyebrow, "Burlington VT Taxi Ride");
  const heroTitle = cms?.hero_title?.trim();
  const heroHighlight = pick(cms?.hero_highlight, short);
  const heroDescription = pick(
    cms?.hero_description,
    `Professional taxi & car service from Burlington, Vermont to ${short}. Fixed rates, licensed drivers, 24/7.`,
  );

  const content = cms?.content ?? {};

  const features = [
    { title: pick(content.benefit_1_title, "Fixed Rates"), desc: pick(content.benefit_1_description, "Confirmed before booking") },
    { title: pick(content.benefit_2_title, "Flight Tracking"), desc: pick(content.benefit_2_description, "Real-time BTV monitoring") },
    { title: pick(content.benefit_3_title, "Comfortable Vehicles"), desc: pick(content.benefit_3_description, "Room for luggage and groups") },
    { title: pick(content.benefit_4_title, "24/7 Available"), desc: pick(content.benefit_4_description, "Every day, every holiday") },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img src={heroImage} alt={loc.destination} className="hero-kenburns h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/75 via-background/30 to-transparent" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-36 text-center">
          <div className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-gold">Home</Link>
            <span className="mx-2">›</span>
            <span>Destinations</span>
            <span className="mx-2">›</span>
            <span>{short}</span>
          </div>
          <span className="mt-6 inline-block rounded-full border border-gold/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.3em] text-gold sm:text-xs">
            {eyebrow}
          </span>
          <h1 className="mt-8 font-display text-5xl leading-tight sm:text-6xl md:text-7xl">
            {heroTitle ? (
              <>
                {heroTitle}{" "}
                <span className="text-gradient-gold">{heroHighlight}</span>
              </>
            ) : (
              <>
                BTV <span className="text-gold">→</span>{" "}
                <span className="text-gradient-gold">{heroHighlight}</span>
              </>
            )}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            {heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/book-online" className="gradient-gold inline-flex items-center gap-2 rounded-md px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-gold">
              Reserve Your Ride
            </Link>
            <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3.5 text-sm font-semibold text-gold hover:bg-gold/10">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
             <p className="text-xs uppercase tracking-[0.3em] text-gold">{pick(content.intro_eyebrow, `Burlington VT to ${short}, Vermont`)}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl md:text-5xl">
               {content.intro_title ? content.intro_title : <>Burlington VT to <span className="text-gradient-gold">{upper}</span> Taxi & Shuttle Service</>}
            </h2>
            <div className="mt-3 h-1 w-16 rounded bg-gold/70" />
            <p className="mt-6 text-muted-foreground">
               {pick(content.intro_paragraph_1, `Burlington VT Taxi Ride provides professional, fixed-rate transportation to and from ${short}, Vermont. Our licensed drivers offer reliable service 24/7 for airport transfers, long-distance rides, and point-to-point travel.`)}
            </p>
            <p className="mt-4 text-muted-foreground">
               {pick(content.intro_paragraph_2, `Whether you're heading to ${short} for business, a getaway, or a connection home, our drivers plan around weather and traffic and provide clean vehicles with room for luggage, gear, and groups.`)}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-border bg-surface/40 p-5">
                  <div className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                    <div>
                      <p className="font-display text-lg">{f.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-gold/30 bg-gradient-to-br from-surface/60 to-background p-8 text-center shadow-gold">
               <h3 className="font-display text-2xl sm:text-3xl">{pick(content.cta_title, `Ready to Travel to ${short}?`)}</h3>
               <p className="mt-2 text-sm text-muted-foreground">{pick(content.cta_description, "Book online or call us — confirmed in minutes.")}</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/book-online" className="gradient-gold inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-gold">
                  Book Online
                </Link>
                <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-6 py-3 text-sm font-semibold text-gold hover:bg-gold/10">
                  <Phone className="h-4 w-4" /> {PHONE}
                </a>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* OTHER ROUTES */}
      <section className="border-y border-border/60 bg-surface/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="font-display text-2xl">Other Popular Destinations</h3>
          <div className="mt-6 flex flex-wrap gap-2">
            {[...LOCATIONS.map((l) => ({ slug: l.slug, label: l.label })),
              ...VT_DESTINATIONS.map((d) => ({ slug: d.slug, label: d.name }))]
              .filter((l, i, arr) => l.slug !== loc.slug && arr.findIndex((x) => x.slug === l.slug) === i)
              .slice(0, 24)
               .map((l) => (
                 <Link key={l.slug} to="/$slug" params={{ slug: destinationTaxiSlug(l.slug) }} className="rounded-full border border-border bg-background px-4 py-2 text-xs text-muted-foreground hover:border-gold/60 hover:text-gold">
                  {l.label}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
