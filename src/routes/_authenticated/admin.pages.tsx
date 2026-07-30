import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { listPages, saveDraft, publishDraft, discardDraft } from "@/lib/page-content.functions";
import type { PageDraft } from "@/lib/page-content";
import { ImageField } from "@/components/admin/MediaPicker";
import { PageHero } from "@/components/PageHero";
import { Save, RefreshCw, Eye, EyeOff, Rocket, Undo2, CircleDot } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/pages")({
  component: CmsPage,
});


type Draft = {
  meta_title: string;
  meta_description: string;
  eyebrow: string;
  hero_title: string;
  hero_highlight: string;
  hero_description: string;
  hero_image: string;
  body: string;
};

/** Editor always works on the pending draft when one exists, otherwise on the live copy. */
const toDraft = (p: PageDraft): Draft =>
  p.has_draft
    ? {
        meta_title: p.draft_meta_title ?? "",
        meta_description: p.draft_meta_description ?? "",
        eyebrow: p.draft_eyebrow ?? "",
        hero_title: p.draft_hero_title ?? "",
        hero_highlight: p.draft_hero_highlight ?? "",
        hero_description: p.draft_hero_description ?? "",
        hero_image: p.draft_hero_image ?? "",
        body: p.draft_body ?? "",
      }
    : {
        meta_title: p.meta_title ?? "",
        meta_description: p.meta_description ?? "",
        eyebrow: p.eyebrow ?? "",
        hero_title: p.hero_title ?? "",
        hero_highlight: p.hero_highlight ?? "",
        hero_description: p.hero_description ?? "",
        hero_image: p.hero_image ?? "",
        body: p.body ?? "",
      };


function CmsPage() {
  const fetchPages = useServerFn(listPages);
  const persist = useServerFn(saveDraft);
  const publish = useServerFn(publishDraft);
  const discard = useServerFn(discardDraft);
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["cms-pages"],
    queryFn: () => fetchPages(),
  });

  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);


  const pages = data?.isAdmin ? data.pages : [];
  const current = pages.find((p) => p.slug === selected) ?? null;

  useEffect(() => {
    if (!selected && pages.length > 0) setSelected(pages[0].slug);
  }, [pages, selected]);

  useEffect(() => {
    if (current) setDraft(toDraft(current));
  }, [current?.slug, current?.updated_at, current?.draft_updated_at, current?.has_draft]);

  const flash = (msg: string) => {
    setSaved(msg);
    queryClient.invalidateQueries({ queryKey: ["cms-pages"] });
    setTimeout(() => setSaved(null), 4000);
  };

  const mutation = useMutation({
    mutationFn: (payload: Draft & { slug: string }) =>
      persist({
        data: {
          slug: payload.slug,
          meta_title: payload.meta_title || null,
          meta_description: payload.meta_description || null,
          eyebrow: payload.eyebrow || null,
          hero_title: payload.hero_title || null,
          hero_highlight: payload.hero_highlight || null,
          hero_description: payload.hero_description || null,
          hero_image: payload.hero_image || null,
          body: payload.body || null,
        },
      }),
    onSuccess: () => flash("Draft saved — not live yet. Review, then publish."),
  });

  const publishMutation = useMutation({
    mutationFn: (slug: string) => publish({ data: { slug } }),
    onSuccess: () => flash("Published — now live on the website."),
  });

  const discardMutation = useMutation({
    mutationFn: (slug: string) => discard({ data: { slug } }),
    onSuccess: () => flash("Draft discarded — the live version is unchanged."),
  });


  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Content Management</p>
          <h1 className="mt-2 font-display text-4xl">Website Pages</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Edit the headline, intro text, image and search-engine details for each page. Leave a
            field empty to keep the built-in default.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
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

      {isLoading && <p className="mt-10 text-sm text-muted-foreground">Loading pages…</p>}
      {error && <p className="mt-10 text-sm text-destructive">{(error as Error).message}</p>}
      {data && !data.isAdmin && (
        <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-8">
          <h2 className="font-display text-2xl">No admin access</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This account has not been granted admin access yet.
          </p>
        </div>
      )}

      {pages.length > 0 && (
        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <ul className="space-y-1">
            {pages.map((p, i) => (
              <li key={p.slug}>
                {(i === 0 || (pages[i - 1].sort_order < 200 && p.sort_order >= 200)) && (
                  <p className="px-3 pb-1 pt-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
                    {p.sort_order >= 200 ? "Location Pages" : "Main Pages"}
                  </p>
                )}
                <button
                  onClick={() => setSelected(p.slug)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm ${
                    p.slug === selected
                      ? "bg-surface text-gold"
                      : "text-muted-foreground hover:bg-surface hover:text-gold"
                  }`}
                >
                  {p.nav_label}
                  {p.has_draft && (
                    <span className="ml-2 inline-flex items-center gap-1 rounded-full border border-amber-500/50 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-amber-500">
                      <CircleDot className="h-2.5 w-2.5" /> Draft
                    </span>
                  )}
                  <span className="ml-2 font-mono text-[11px] opacity-60">{p.slug}</span>
                </button>

              </li>
            ))}
          </ul>


          {current && draft && (
            <div className="space-y-6">
            <form
              className="space-y-4 rounded-2xl border border-border bg-surface/40 p-6"
              onSubmit={(e) => {
                e.preventDefault();
                mutation.mutate({ ...draft, slug: current.slug });
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl">{current.nav_label}</h2>
                {current.has_draft ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/50 bg-amber-500/10 px-3 py-1 text-[11px] uppercase tracking-widest text-amber-500">
                    <CircleDot className="h-3 w-3" /> Pending changes — not live
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] uppercase tracking-widest text-emerald-500">
                    Published
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Saving stores a draft only. Nothing changes on the website until you press Publish.
                {current.published_at &&
                  ` Last published ${new Date(current.published_at).toLocaleString()}.`}
              </p>


              <Text
                label="Hero eyebrow"
                value={draft.eyebrow}
                onChange={(v) => setDraft({ ...draft, eyebrow: v })}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Text
                  label="Hero headline"
                  value={draft.hero_title}
                  onChange={(v) => setDraft({ ...draft, hero_title: v })}
                />
                <Text
                  label="Headline highlight (gold text)"
                  value={draft.hero_highlight}
                  onChange={(v) => setDraft({ ...draft, hero_highlight: v })}
                />
              </div>
              <Area
                label="Hero description"
                value={draft.hero_description}
                onChange={(v) => setDraft({ ...draft, hero_description: v })}
              />
              <ImageField
                label="Hero / share image"
                value={draft.hero_image}
                onChange={(v) => setDraft({ ...draft, hero_image: v })}
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
              <Area
                label="Internal notes"
                value={draft.body}
                onChange={(v) => setDraft({ ...draft, body: v })}
              />

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10 disabled:opacity-60"
                >
                  <Save className="h-4 w-4" /> {mutation.isPending ? "Saving…" : "Save draft"}
                </button>
                <button
                  type="button"
                  disabled={!current.has_draft || publishMutation.isPending}
                  onClick={() => publishMutation.mutate(current.slug)}
                  className="gradient-gold inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-40"
                >
                  <Rocket className="h-4 w-4" />
                  {publishMutation.isPending ? "Publishing…" : "Publish to website"}
                </button>
                <button
                  type="button"
                  disabled={!current.has_draft || discardMutation.isPending}
                  onClick={() => discardMutation.mutate(current.slug)}
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-40"
                >
                  <Undo2 className="h-4 w-4" /> Discard draft
                </button>
                {saved && <span className="text-sm text-emerald-500">{saved}</span>}
                {[mutation.error, publishMutation.error, discardMutation.error]
                  .filter(Boolean)
                  .map((e, i) => (
                    <span key={i} className="text-sm text-destructive">
                      {(e as Error).message}
                    </span>
                  ))}
              </div>

            </form>

            {preview && (
              <div className="overflow-hidden rounded-2xl border border-gold/30">
                <div className="flex items-center gap-2 border-b border-border bg-surface/60 px-4 py-2 text-[11px] uppercase tracking-widest text-gold">
                  <Eye className="h-3.5 w-3.5" /> Preview — draft version (not yet published)
                </div>
                <div className="pointer-events-none origin-top scale-[0.85]">
                  <PageHero
                    eyebrow={draft.eyebrow || current.eyebrow || undefined}
                    title={draft.hero_title || current.hero_title || current.nav_label}
                    highlight={draft.hero_highlight || undefined}
                    description={draft.hero_description || ""}
                    backgroundImage={draft.hero_image || undefined}
                  />
                </div>
                <div className="border-t border-border bg-background/60 p-4">
                  <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Google result preview
                  </p>
                  <p className="mt-2 text-base text-gold">
                    {draft.meta_title || current.meta_title || current.nav_label}
                  </p>
                  <p className="text-xs text-emerald-500">
                    burlingtonvttaxiride.com{current.slug === "/" ? "" : current.slug}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {draft.meta_description || current.meta_description || "—"}
                  </p>
                </div>
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
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <textarea
        value={value}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none focus:border-gold"
      />
    </label>
  );
}
