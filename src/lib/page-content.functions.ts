import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { PageDraft } from "./page-content";

const draftInput = z.object({
  slug: z.string().min(1),
  meta_title: z.string().max(200).nullable(),
  meta_description: z.string().max(500).nullable(),
  eyebrow: z.string().max(200).nullable(),
  hero_title: z.string().max(200).nullable(),
  hero_highlight: z.string().max(200).nullable(),
  hero_description: z.string().max(2000).nullable(),
  hero_image: z.string().max(500).nullable(),
  body: z.string().max(20000).nullable(),
});

const slugInput = z.object({ slug: z.string().min(1) });

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
    const { slug, ...f } = data;
    const { error } = await (context.supabase as any)
      .from("page_content")
      .update({
        draft_meta_title: f.meta_title,
        draft_meta_description: f.meta_description,
        draft_eyebrow: f.eyebrow,
        draft_hero_title: f.hero_title,
        draft_hero_highlight: f.hero_highlight,
        draft_hero_description: f.hero_description,
        draft_hero_image: f.hero_image,
        draft_body: f.body,
        has_draft: true,
        draft_updated_at: new Date().toISOString(),
      })
      .eq("slug", slug);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

/** Copy the stored draft onto the live columns so visitors see it. */
export const publishDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => slugInput.parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context as any);

    const { data: row, error: readError } = await (context.supabase as any)
      .from("page_content")
      .select("*")
      .eq("slug", data.slug)
      .maybeSingle();
    if (readError) throw new Error(readError.message);
    if (!row) throw new Error("Page not found");
    if (!row.has_draft) throw new Error("There are no pending changes to publish");

    const { error } = await (context.supabase as any)
      .from("page_content")
      .update({
        meta_title: row.draft_meta_title,
        meta_description: row.draft_meta_description,
        eyebrow: row.draft_eyebrow,
        hero_title: row.draft_hero_title,
        hero_highlight: row.draft_hero_highlight,
        hero_description: row.draft_hero_description,
        hero_image: row.draft_hero_image,
        body: row.draft_body,
        has_draft: false,
        draft_updated_at: null,
        published_at: new Date().toISOString(),
      })
      .eq("slug", data.slug);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

/** Throw away pending changes and keep the live version. */
export const discardDraft = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => slugInput.parse(data))
  .handler(async ({ context, data }) => {
    await assertAdmin(context as any);
    const { error } = await (context.supabase as any)
      .from("page_content")
      .update({
        draft_meta_title: null,
        draft_meta_description: null,
        draft_eyebrow: null,
        draft_hero_title: null,
        draft_hero_highlight: null,
        draft_hero_description: null,
        draft_hero_image: null,
        draft_body: null,
        has_draft: false,
        draft_updated_at: null,
      })
      .eq("slug", data.slug);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
