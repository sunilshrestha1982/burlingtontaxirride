import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { PageDraft } from "./page-content";

const draftInput = z.object({
  id: z.string().uuid(),
  slug: z.string().min(1).max(160),
  nav_label: z.string().min(2).max(160),
  destination_name: z.string().max(160).nullable(),
  meta_title: z.string().max(200).nullable(),
  meta_description: z.string().max(500).nullable(),
  eyebrow: z.string().max(200).nullable(),
  hero_title: z.string().max(200).nullable(),
  hero_highlight: z.string().max(200).nullable(),
  hero_description: z.string().max(2000).nullable(),
  hero_image: z.string().max(500).nullable(),
  body: z.string().max(20000).nullable(),
  content: z.record(z.string(), z.unknown()).default({}),
});

const idInput = z.object({ id: z.string().uuid() });

const reservedSlugs = new Set([
  "/", "/admin", "/auth", "/airport-transfers", "/airports-we-serve", "/blog",
  "/book-online", "/booking-confirmed", "/contact", "/corporate", "/long-distance",
  "/privacy", "/services", "/sitemap", "/ski-resort", "/terms",
]);

function normalizeSlug(value: string) {
  if (value.trim() === "/") return "/";
  const clean = value.trim().toLowerCase().replace(/^\/+|\/+$/g, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(clean)) {
    throw new Error("Use lowercase letters, numbers, and single hyphens in the URL");
  }
  return `/${clean}`;
}

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data: isAdmin, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error("Could not verify admin access");
  if (!isAdmin) throw new Error("Admin access required");
}

export const listPages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError) throw new Error("Could not verify admin access");
    if (!isAdmin) return { isAdmin: false as const, pages: [] as PageDraft[] };

    const { data, error } = await (context.supabase as any)
      .from("page_content")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return { isAdmin: true as const, pages: (data ?? []) as PageDraft[] };
  });

/** Store edits as an unpublished draft. The live website is untouched. */
export const saveDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => draftInput.parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context as any);
    const slug = normalizeSlug(data.slug);
    const { data: currentPage } = await (context.supabase as any)
      .from("page_content")
      .select("slug")
      .eq("id", data.id)
      .single();
    if (reservedSlugs.has(slug) && currentPage?.slug !== slug) {
      throw new Error("That URL is reserved for a main website page");
    }
    const { data: duplicate } = await (context.supabase as any)
      .from("page_content")
      .select("id")
      .eq("slug", slug)
      .neq("id", data.id)
      .maybeSingle();
    if (duplicate) throw new Error("That URL is already used by another page");
    const { error } = await (context.supabase as any)
      .from("page_content")
      .update({
        draft_slug: slug,
        draft_nav_label: data.nav_label,
        draft_destination_name: data.destination_name,
        draft_meta_title: data.meta_title,
        draft_meta_description: data.meta_description,
        draft_eyebrow: data.eyebrow,
        draft_hero_title: data.hero_title,
        draft_hero_highlight: data.hero_highlight,
        draft_hero_description: data.hero_description,
        draft_hero_image: data.hero_image,
        draft_body: data.body,
        draft_content: data.content,
        has_draft: true,
        draft_updated_at: new Date().toISOString(),
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

/** Copy the stored draft onto the live columns so visitors see it. */
export const publishDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => idInput.parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context as any);
    const { error } = await (context.supabase as any).rpc("publish_page_content", {
      _page_id: data.id,
    });
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

/** Throw away pending changes and keep the live version. */
export const discardDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => idInput.parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context as any);
    const { error } = await (context.supabase as any)
      .from("page_content")
      .update({
        draft_meta_title: null,
        draft_slug: null,
        draft_nav_label: null,
        draft_destination_name: null,
        draft_meta_description: null,
        draft_eyebrow: null,
        draft_hero_title: null,
        draft_hero_highlight: null,
        draft_hero_description: null,
        draft_hero_image: null,
        draft_body: null,
        draft_content: null,
        has_draft: false,
        draft_updated_at: null,
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const createLocationPage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ destination: z.string().min(2).max(160) }).parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context as any);
    const town = data.destination.trim().replace(/,?\s*VT$/i, "");
    const slug = normalizeSlug(`burlington-to-${town.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-taxi`);
    const { data: row, error } = await (context.supabase as any)
      .from("page_content")
      .insert({
        slug,
        nav_label: `Burlington to ${town} Taxi`,
        destination_name: `${town}, VT`,
        page_type: "location",
        sort_order: 500,
        meta_title: `Burlington to ${town} Taxi | 24/7 Vermont Car Service`,
        meta_description: `Book a professional Burlington to ${town} taxi with fixed rates, clean vehicles, licensed drivers, and 24/7 service.`,
        eyebrow: "Burlington VT Taxi Ride",
        hero_title: `Burlington to ${town} Taxi`,
        hero_highlight: town,
        hero_description: `Professional door-to-door taxi service from Burlington, Vermont to ${town}. Fixed rates and 24/7 availability.`,
        content: {},
        published_at: new Date().toISOString(),
      })
      .select("id")
      .single();
    if (error) throw new Error(error.code === "23505" ? "That location page already exists" : error.message);
    return { id: row.id as string };
  });
