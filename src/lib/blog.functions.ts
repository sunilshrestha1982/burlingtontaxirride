import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { BlogPost } from "./blog";

const postInput = z.object({
  id: z.string().uuid().nullable(),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes only"),
  title: z.string().trim().min(1).max(200),
  excerpt: z.string().max(600).nullable(),
  cover_image: z.string().max(500).nullable(),
  body: z.string().max(60000).nullable(),
  author: z.string().max(120).nullable(),
  published: z.boolean(),
  meta_title: z.string().max(200).nullable(),
  meta_description: z.string().max(500).nullable(),
  sort_order: z.number().int().min(0).max(9999),
});

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data: isAdmin, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error("Could not verify admin access");
  return Boolean(isAdmin);
}

export const listPosts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    if (!(await assertAdmin(context)))
      return { isAdmin: false as const, posts: [] as BlogPost[] };

    const { data, error } = await (context.supabase as any)
      .from("blog_posts")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { isAdmin: true as const, posts: (data ?? []) as BlogPost[] };
  });

export const savePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => postInput.parse(data))
  .handler(async ({ context, data }) => {
    if (!(await assertAdmin(context))) throw new Error("Admin access required");

    const { id, ...fields } = data;
    const row = {
      ...fields,
      published_at: fields.published ? new Date().toISOString() : null,
    };

    if (id) {
      const existing = await (context.supabase as any)
        .from("blog_posts")
        .select("published_at, published")
        .eq("id", id)
        .maybeSingle();
      if (fields.published && existing.data?.published_at) {
        row.published_at = existing.data.published_at;
      }
      const { error } = await (context.supabase as any)
        .from("blog_posts")
        .update(row)
        .eq("id", id);
      if (error) throw new Error(error.message);
      return { ok: true as const, id };
    }

    const { data: inserted, error } = await (context.supabase as any)
      .from("blog_posts")
      .insert(row)
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { ok: true as const, id: inserted.id as string };
  });

export const deletePost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ context, data }) => {
    if (!(await assertAdmin(context))) throw new Error("Admin access required");
    const { error } = await (context.supabase as any)
      .from("blog_posts")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
