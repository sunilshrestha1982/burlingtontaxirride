import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { listPosts, savePost, deletePost } from "@/lib/blog.functions";
import { bodyBlocks, type BlogPost } from "@/lib/blog";
import { ImageField } from "@/components/admin/MediaPicker";
import { Eye, EyeOff, Plus, RefreshCw, Save, Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/blog")({
  component: AdminBlogPage,
});

type Draft = {
  id: string | null;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string;
  body: string;
  author: string;
  published: boolean;
  meta_title: string;
  meta_description: string;
  sort_order: number;
};

const emptyDraft = (): Draft => ({
  id: null,
  slug: "",
  title: "",
  excerpt: "",
  cover_image: "",
  body: "",
  author: "Burlington VT Taxi Ride",
  published: false,
  meta_title: "",
  meta_description: "",
  sort_order: 100,
});

const toDraft = (p: BlogPost): Draft => ({
  id: p.id,
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt ?? "",
  cover_image: p.cover_image ?? "",
  body: p.body ?? "",
  author: p.author ?? "",
  published: p.published,
  meta_title: p.meta_title ?? "",
  meta_description: p.meta_description ?? "",
  sort_order: p.sort_order,
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);

function AdminBlogPage() {
  const fetchPosts = useServerFn(listPosts);
  const persist = useServerFn(savePost);
  const remove = useServerFn(deletePost);
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["admin-blog"],
    queryFn: () => fetchPosts(),
  });

  const posts = data?.isAdmin ? data.posts : [];
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [preview, setPreview] = useState(false);
  const [saved, setSaved] = useState<string | null>(null);

  useEffect(() => {
    if (!draft && posts.length > 0) {
      setSelectedId(posts[0].id);
      setDraft(toDraft(posts[0]));
    }
  }, [posts, draft]);

  const mutation = useMutation({
    mutationFn: (d: Draft) =>
      persist({
        data: {
          id: d.id,
          slug: d.slug || slugify(d.title),
          title: d.title,
          excerpt: d.excerpt || null,
          cover_image: d.cover_image || null,
          body: d.body || null,
          author: d.author || null,
          published: d.published,
          meta_title: d.meta_title || null,
          meta_description: d.meta_description || null,
          sort_order: d.sort_order,
        },
      }),
    onSuccess: (res) => {
      setSaved(draft?.published ? "Saved & published." : "Saved as draft.");
      setSelectedId(res.id);
      setDraft((d) => (d ? { ...d, id: res.id } : d));
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      setTimeout(() => setSaved(null), 4000);
    },
  });

  const deletion = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      setDraft(null);
      setSelectedId(null);
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
    },
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Content Management</p>
          <h1 className="mt-2 font-display text-4xl">Blog Articles</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Write, edit and publish articles. Drafts stay hidden until you tick “Published”.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setDraft(emptyDraft());
              setSelectedId(null);
            }}
            className="gradient-gold inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <Plus className="h-4 w-4" /> New article
          </button>
          <button
            onClick={() => setPreview((p) => !p)}
            className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-semibold ${
              preview
                ? "border-gold bg-gold/10 text-gold"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {preview ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {preview ? "Live preview on" : "Live preview off"}
          </button>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-4 py-2 text-sm font-semibold text-gold hover:bg-gold/10"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} /> Refresh
          </button>
        </div>
      </div>

      {isLoading && <p className="mt-10 text-sm text-muted-foreground">Loading articles…</p>}
      {error && <p className="mt-10 text-sm text-destructive">{(error as Error).message}</p>}
      {data && !data.isAdmin && (
        <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-8">
          <h2 className="font-display text-2xl">No admin access</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This account has not been granted admin access yet.
          </p>
        </div>
      )}

      {data?.isAdmin && (
        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <ul className="space-y-1">
            {posts.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => {
                    setSelectedId(p.id);
                    setDraft(toDraft(p));
                  }}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                    p.id === selectedId
                      ? "bg-surface text-gold"
                      : "text-muted-foreground hover:bg-surface hover:text-gold"
                  }`}
                >
                  <span className="block truncate">{p.title}</span>
                  <span className="text-[11px] opacity-70">
                    {p.published ? "Published" : "Draft"} · /blog/{p.slug}
                  </span>
                </button>
              </li>
            ))}
            {posts.length === 0 && (
              <li className="px-3 py-2 text-sm text-muted-foreground">No articles yet.</li>
            )}
          </ul>

          {draft && (
            <div className="space-y-6">
              <form
                className="space-y-4 rounded-2xl border border-border bg-surface/40 p-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  mutation.mutate(draft);
                }}
              >
                <Text
                  label="Title"
                  value={draft.title}
                  onChange={(v) =>
                    setDraft({
                      ...draft,
                      title: v,
                      slug: draft.id || draft.slug ? draft.slug : slugify(v),
                    })
                  }
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Text
                    label="URL slug (blog/your-slug)"
                    value={draft.slug}
                    onChange={(v) => setDraft({ ...draft, slug: slugify(v) })}
                  />
                  <Text
                    label="Author"
                    value={draft.author}
                    onChange={(v) => setDraft({ ...draft, author: v })}
                  />
                </div>
                <Area
                  label="Excerpt (shown in the article list)"
                  value={draft.excerpt}
                  onChange={(v) => setDraft({ ...draft, excerpt: v })}
                />
                <ImageField
                  label="Cover / share image"
                  value={draft.cover_image}
                  onChange={(v) => setDraft({ ...draft, cover_image: v })}
                />
                <Area
                  label="Article body (blank line between paragraphs; a short line becomes a heading)"
                  rows={14}
                  value={draft.body}
                  onChange={(v) => setDraft({ ...draft, body: v })}
                />
                <Text
                  label="Search engine title"
                  value={draft.meta_title}
                  onChange={(v) => setDraft({ ...draft, meta_title: v })}
                />
                <Area
                  label="Search engine description"
                  value={draft.meta_description}
                  onChange={(v) => setDraft({ ...draft, meta_description: v })}
                />
                <div className="flex flex-wrap items-center gap-6">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={draft.published}
                      onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
                      className="h-4 w-4 accent-current text-gold"
                    />
                    Published
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                    Order
                    <input
                      type="number"
                      value={draft.sort_order}
                      onChange={(e) =>
                        setDraft({ ...draft, sort_order: Number(e.target.value) || 0 })
                      }
                      className="w-20 rounded-md border border-border bg-background/60 px-2 py-1 text-sm text-foreground"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={mutation.isPending || !draft.title.trim()}
                    className="gradient-gold inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
                  >
                    <Save className="h-4 w-4" /> {mutation.isPending ? "Saving…" : "Save article"}
                  </button>
                  {draft.id && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm("Delete this article permanently?")) deletion.mutate(draft.id!);
                      }}
                      className="inline-flex items-center gap-2 rounded-md border border-destructive/50 px-4 py-2 text-sm font-semibold text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  )}
                  {saved && <span className="text-sm text-emerald-500">{saved}</span>}
                  {mutation.error && (
                    <span className="text-sm text-destructive">
                      {(mutation.error as Error).message}
                    </span>
                  )}
                </div>
              </form>

              {preview && (
                <div className="overflow-hidden rounded-2xl border border-gold/30">
                  <div className="flex items-center gap-2 border-b border-border bg-surface/60 px-4 py-2 text-[11px] uppercase tracking-widest text-gold">
                    <Eye className="h-3.5 w-3.5" /> Live preview — unsaved draft
                  </div>
                  <article className="p-6">
                    {draft.cover_image && (
                      <img
                        src={draft.cover_image}
                        alt=""
                        className="mb-6 h-56 w-full rounded-xl object-cover"
                      />
                    )}
                    <h2 className="font-display text-3xl">{draft.title || "Untitled article"}</h2>
                    {draft.excerpt && (
                      <p className="mt-3 text-muted-foreground">{draft.excerpt}</p>
                    )}
                    <div className="mt-6 space-y-4">
                      {bodyBlocks(draft.body).map((b, i) =>
                        b.type === "h" ? (
                          <h3 key={i} className="font-display text-2xl text-gold">
                            {b.text}
                          </h3>
                        ) : (
                          <p key={i} className="text-muted-foreground">
                            {b.text}
                          </p>
                        ),
                      )}
                    </div>
                  </article>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Text({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none focus:border-gold"
      />
    </label>
  );
}

function Area({
  label,
  value,
  rows = 3,
  onChange,
}: {
  label: string;
  value: string;
  rows?: number;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none focus:border-gold"
      />
    </label>
  );
}
