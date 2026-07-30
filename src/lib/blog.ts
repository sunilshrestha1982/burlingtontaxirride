import { supabase } from "@/integrations/supabase/client";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  body: string | null;
  author: string | null;
  published: boolean;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

/** Published posts for the public blog index (SSR-safe). */
export async function loadPublishedPosts(): Promise<BlogPost[]> {
  try {
    const { data } = await (supabase as any)
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("published_at", { ascending: false });
    return (data ?? []) as BlogPost[];
  } catch {
    return [];
  }
}

export async function loadPublishedPost(slug: string): Promise<BlogPost | null> {
  try {
    const { data } = await (supabase as any)
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    return (data as BlogPost) ?? null;
  } catch {
    return null;
  }
}

export const formatPostDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

/** Split a plain-text body into paragraphs; a short line before a paragraph acts as a subheading. */
export function bodyBlocks(body: string | null): Array<{ type: "h" | "p"; text: string }> {
  if (!body) return [];
  return body
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((text) =>
      text.length < 80 && !/[.!?]$/.test(text)
        ? ({ type: "h", text } as const)
        : ({ type: "p", text } as const),
    );
}
