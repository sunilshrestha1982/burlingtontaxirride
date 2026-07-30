import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { PageContent } from "./page-content";

const pageInput = z.object({
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

export const listPages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError) throw new Error("Could not verify admin access");
    if (!isAdmin) return { isAdmin: false as const, pages: [] as PageContent[] };

    const { data, error } = await (context.supabase as any)
      .from("page_content")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return { isAdmin: true as const, pages: (data ?? []) as PageContent[] };
  });

export const savePage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => pageInput.parse(data))
  .handler(async ({ context, data }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (roleError) throw new Error("Could not verify admin access");
    if (!isAdmin) throw new Error("Admin access required");

    const { slug, ...fields } = data;
    const { error } = await (context.supabase as any)
      .from("page_content")
      .update(fields)
      .eq("slug", slug);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
