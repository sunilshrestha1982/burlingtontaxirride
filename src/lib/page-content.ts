import { supabase } from "@/integrations/supabase/client";

export type PageContent = {
  slug: string;
  nav_label: string;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  eyebrow: string | null;
  hero_title: string | null;
  hero_highlight: string | null;
  hero_description: string | null;
  hero_image: string | null;
  body: string | null;
  updated_at: string;
};

/** Pages exposed in the back-office CMS (matches the site navigation). */
export const CMS_PAGES: { slug: string; label: string }[] = [
  { slug: "/", label: "Home" },
  { slug: "/airport-transfers", label: "Airport Transfers" },
  { slug: "/airports-we-serve", label: "Airports We Serve" },
  { slug: "/long-distance", label: "Long Distance" },
  { slug: "/corporate", label: "Corporate" },
  { slug: "/ski-resort", label: "Ski Resort" },
  { slug: "/book-online", label: "Reservation" },
  { slug: "/blog", label: "Blog" },
  { slug: "/contact", label: "Contact Us" },
  ...LOCATIONS.map((l) => ({ slug: `/${l.slug}`, label: l.label })),
];

const nonEmpty = (v: string | null | undefined) =>
  typeof v === "string" && v.trim().length > 0 ? v.trim() : undefined;

/** Public read of a page's CMS overrides. Safe to call in a route loader (SSR). */
export async function loadPageContent(slug: string): Promise<PageContent | null> {
  try {
    const { data } = await (supabase as any)
      .from("page_content")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    return (data as PageContent) ?? null;
  } catch {
    return null;
  }
}

export function mergeMeta<T extends { title: string; description: string; image: string }>(
  defaults: T,
  cms: PageContent | null,
): T {
  if (!cms) return defaults;
  return {
    ...defaults,
    title: nonEmpty(cms.meta_title) ?? defaults.title,
    description: nonEmpty(cms.meta_description) ?? defaults.description,
    image: nonEmpty(cms.hero_image) ?? defaults.image,
  };
}

export type HeroProps = {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description: string;
  backgroundImage?: string;
  ctaLabel?: string;
};

export function mergeHero(defaults: HeroProps, cms: PageContent | null): HeroProps {
  if (!cms) return defaults;
  return {
    ...defaults,
    eyebrow: nonEmpty(cms.eyebrow) ?? defaults.eyebrow,
    title: nonEmpty(cms.hero_title) ?? defaults.title,
    highlight: nonEmpty(cms.hero_highlight) ?? defaults.highlight,
    description: nonEmpty(cms.hero_description) ?? defaults.description,
    backgroundImage: nonEmpty(cms.hero_image) ?? defaults.backgroundImage,
  };
}

/** Only the CMS fields that were filled in, ready to spread over <PageHero /> props. */
export function heroOverrides(cms: PageContent | null | undefined): Partial<HeroProps> {
  if (!cms) return {};
  const out: Partial<HeroProps> = {};
  if (nonEmpty(cms.eyebrow)) out.eyebrow = cms.eyebrow!.trim();
  if (nonEmpty(cms.hero_title)) out.title = cms.hero_title!.trim();
  if (nonEmpty(cms.hero_highlight)) out.highlight = cms.hero_highlight!.trim();
  if (nonEmpty(cms.hero_description)) out.description = cms.hero_description!.trim();
  if (nonEmpty(cms.hero_image)) out.backgroundImage = cms.hero_image!.trim();
  return out;
}
