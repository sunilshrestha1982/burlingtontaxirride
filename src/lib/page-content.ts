import { supabase } from "@/integrations/supabase/client";
import { LOCATIONS } from "@/lib/locations";

export type PageContent = {
  id: string;
  slug: string;
  nav_label: string;
  sort_order: number;
  page_type: string;
  destination_name: string | null;
  meta_title: string | null;
  meta_description: string | null;
  eyebrow: string | null;
  hero_title: string | null;
  hero_highlight: string | null;
  hero_description: string | null;
  hero_image: string | null;
  body: string | null;
  content: LocationPageContent;
  updated_at: string;
  published_at?: string | null;
};

/** Unpublished edits — admin-only, never exposed to public readers. */
export type PageDraft = PageContent & {
  draft_slug: string | null;
  draft_nav_label: string | null;
  draft_destination_name: string | null;
  draft_meta_title: string | null;
  draft_meta_description: string | null;
  draft_eyebrow: string | null;
  draft_hero_title: string | null;
  draft_hero_highlight: string | null;
  draft_hero_description: string | null;
  draft_hero_image: string | null;
  draft_body: string | null;
  draft_content: LocationPageContent | null;
  has_draft: boolean;
  draft_updated_at: string | null;
};

/** Columns visitors are allowed to read (published version only). */
export const PUBLIC_PAGE_COLUMNS =
  "id, slug, nav_label, sort_order, page_type, destination_name, meta_title, meta_description, eyebrow, hero_title, hero_highlight, hero_description, hero_image, body, content, updated_at, published_at";

export type LocationPageContent = {
  blocks?: TaxiPageBlock[];
  intro_eyebrow?: string;
  intro_title?: string;
  intro_paragraph_1?: string;
  intro_paragraph_2?: string;
  benefit_1_title?: string;
  benefit_1_description?: string;
  benefit_2_title?: string;
  benefit_2_description?: string;
  benefit_3_title?: string;
  benefit_3_description?: string;
  benefit_4_title?: string;
  benefit_4_description?: string;
  cta_title?: string;
  cta_description?: string;
};

export type TaxiPageBlockType =
  | "text"
  | "benefits"
  | "service"
  | "route"
  | "imageText"
  | "faq"
  | "cta"
  | "booking";

export type TaxiPageBlock = {
  id: string;
  type: TaxiPageBlockType;
  eyebrow?: string;
  title?: string;
  description?: string;
  body?: string;
  image?: string;
  imagePosition?: "left" | "right";
  buttonLabel?: string;
  buttonUrl?: string;
  items?: Array<{ title: string; description: string }>;
  origin?: string;
  destination?: string;
  duration?: string;
  distance?: string;
};

export function legacyContentBlocks(content: LocationPageContent, destination: string): TaxiPageBlock[] {
  if (Array.isArray(content.blocks) && content.blocks.length > 0) return content.blocks;
  return [
    {
      id: "introduction",
      type: "text",
      eyebrow: content.intro_eyebrow ?? `Burlington VT to ${destination}`,
      title: content.intro_title ?? `Burlington VT to ${destination} Taxi & Shuttle Service`,
      body: [content.intro_paragraph_1, content.intro_paragraph_2].filter(Boolean).join("\n\n"),
    },
    {
      id: "benefits",
      type: "benefits",
      title: "Why ride with us",
      items: [1, 2, 3, 4].map((number) => ({
        title: content[`benefit_${number}_title` as keyof LocationPageContent] as string ?? ["Fixed Rates", "Flight Tracking", "Comfortable Vehicles", "24/7 Available"][number - 1],
        description: content[`benefit_${number}_description` as keyof LocationPageContent] as string ?? ["Your fare is confirmed before booking.", "Real-time Burlington airport monitoring.", "Clean vehicles with room for luggage and groups.", "Professional service every day and every holiday."][number - 1],
      })),
    },
    {
      id: "closing",
      type: "cta",
      title: content.cta_title ?? `Ready to travel to ${destination}?`,
      description: content.cta_description ?? "Book online or call us for a confirmed ride.",
      buttonLabel: "Book online",
      buttonUrl: "/book-online",
    },
    { id: "reservation", type: "booking", title: "Reserve your ride" },
  ];
}

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
      .select(PUBLIC_PAGE_COLUMNS)
      .eq("slug", slug)
      .maybeSingle();
    return (data as PageContent) ?? null;
  } catch {
    return null;
  }
}

export async function loadPageRedirect(slug: string): Promise<string | null> {
  try {
    const { data } = await (supabase as any)
      .from("page_redirects")
      .select("new_slug")
      .eq("old_slug", slug)
      .maybeSingle();
    return typeof data?.new_slug === "string" ? data.new_slug : null;
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
