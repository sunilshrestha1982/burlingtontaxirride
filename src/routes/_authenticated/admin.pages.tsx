import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { CircleDot, Eye, EyeOff, FilePlus2, RefreshCw, Rocket, Save, Search, Undo2 } from "lucide-react";
import { ImageField } from "@/components/admin/MediaPicker";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { LocationPageContent, PageDraft } from "@/lib/page-content";
import { createLocationPage, discardDraft, listPages, publishDraft, saveDraft } from "@/lib/page-content.functions";

export const Route = createFileRoute("/_authenticated/admin/pages")({ component: CmsPage });

type Draft = {
  slug: string; nav_label: string; destination_name: string; meta_title: string;
  meta_description: string; eyebrow: string; hero_title: string; hero_highlight: string;
  hero_description: string; hero_image: string; body: string; content: LocationPageContent;
};

const text = (value: string | null | undefined) => value ?? "";
const toDraft = (page: PageDraft): Draft => ({
  slug: text(page.has_draft ? page.draft_slug : page.slug) || page.slug,
  nav_label: text(page.has_draft ? page.draft_nav_label : page.nav_label) || page.nav_label,
  destination_name: text(page.has_draft ? page.draft_destination_name : page.destination_name),
  meta_title: text(page.has_draft ? page.draft_meta_title : page.meta_title),
  meta_description: text(page.has_draft ? page.draft_meta_description : page.meta_description),
  eyebrow: text(page.has_draft ? page.draft_eyebrow : page.eyebrow),
  hero_title: text(page.has_draft ? page.draft_hero_title : page.hero_title),
  hero_highlight: text(page.has_draft ? page.draft_hero_highlight : page.hero_highlight),
  hero_description: text(page.has_draft ? page.draft_hero_description : page.hero_description),
  hero_image: text(page.has_draft ? page.draft_hero_image : page.hero_image),
  body: text(page.has_draft ? page.draft_body : page.body),
  content: (page.has_draft ? page.draft_content : page.content) ?? {},
});

function CmsPage() {
  const fetchPages = useServerFn(listPages);
  const persist = useServerFn(saveDraft);
  const publish = useServerFn(publishDraft);
  const discard = useServerFn(discardDraft);
  const createPage = useServerFn(createLocationPage);
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch, isFetching } = useQuery({ queryKey: ["cms-pages"], queryFn: () => fetchPages() });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [preview, setPreview] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [newDestination, setNewDestination] = useState("");

  const pages = data?.isAdmin ? data.pages : [];
  const current = pages.find((page) => page.id === selectedId) ?? null;
  const filtered = useMemo(() => pages.filter((page) => {
    const matchesText = `${page.nav_label} ${page.slug} ${page.destination_name ?? ""}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filter === "all" || (filter === "draft" ? page.has_draft : !page.has_draft);
    return matchesText && matchesStatus;
  }), [pages, search, filter]);
  const mainPages = filtered.filter((page) => page.page_type !== "location");
  const locations = filtered.filter((page) => page.page_type === "location");

  useEffect(() => { if (!selectedId && pages[0]) setSelectedId(pages[0].id); }, [pages, selectedId]);
  useEffect(() => { if (current) setDraft(toDraft(current)); }, [current?.id, current?.updated_at, current?.draft_updated_at, current?.has_draft]);

  const flash = (message: string) => {
    setNotice(message);
    queryClient.invalidateQueries({ queryKey: ["cms-pages"] });
    window.setTimeout(() => setNotice(null), 4000);
  };
  const saveMutation = useMutation({
    mutationFn: (payload: Draft & { id: string }) => persist({ data: {
      ...payload,
      slug: payload.slug,
      destination_name: payload.destination_name || null,
      meta_title: payload.meta_title || null, meta_description: payload.meta_description || null,
      eyebrow: payload.eyebrow || null, hero_title: payload.hero_title || null,
      hero_highlight: payload.hero_highlight || null, hero_description: payload.hero_description || null,
      hero_image: payload.hero_image || null, body: payload.body || null,
    } }),
    onSuccess: () => flash("Draft saved. It is not live yet."),
  });
  const publishMutation = useMutation({ mutationFn: (id: string) => publish({ data: { id } }), onSuccess: () => flash("Published to the website.") });
  const discardMutation = useMutation({ mutationFn: (id: string) => discard({ data: { id } }), onSuccess: () => flash("Draft discarded.") });
  const createMutation = useMutation({
    mutationFn: (destination: string) => createPage({ data: { destination } }),
    onSuccess: ({ id }) => { setNewDestination(""); setSelectedId(id); flash("Location page created."); },
  });

  const setContent = (key: keyof LocationPageContent, value: string) => {
    if (draft) setDraft({ ...draft, content: { ...draft.content, [key]: value } });
  };

  return <div className="space-y-6">
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
      <div><p className="text-xs uppercase tracking-[0.3em] text-gold">Content Management</p><h1 className="mt-2 font-display text-4xl">Website Pages</h1><p className="mt-2 text-sm text-muted-foreground">Manage page addresses, search details, hero images, and complete destination content.</p></div>
      <div className="flex gap-2"><Button variant="outline" onClick={() => setPreview((value) => !value)}>{preview ? <Eye /> : <EyeOff />}{preview ? "Preview on" : "Preview off"}</Button><Button variant="outline" onClick={() => refetch()}><RefreshCw className={isFetching ? "animate-spin" : ""} />Refresh</Button></div>
    </header>
    {isLoading && <p className="text-sm text-muted-foreground">Loading pages…</p>}
    {error && <p className="text-sm text-destructive">{(error as Error).message}</p>}
    {data && !data.isAdmin && <p className="rounded-md border border-border p-6">This account does not have admin access.</p>}
    {pages.length > 0 && <div className="grid gap-6 xl:grid-cols-[310px_minmax(0,1fr)]">
      <aside className="space-y-4 border-r border-border pr-5">
        <div className="relative"><Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"/><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search pages and URLs" className="pl-9" /></div>
        <div className="grid grid-cols-3 gap-1 rounded-md bg-surface p-1">{(["all","published","draft"] as const).map((item) => <Button key={item} size="sm" variant={filter === item ? "default" : "ghost"} onClick={() => setFilter(item)} className="capitalize">{item}</Button>)}</div>
        <div className="flex gap-2"><Input value={newDestination} onChange={(event) => setNewDestination(event.target.value)} placeholder="New Vermont town"/><Button size="icon" title="Add location page" disabled={!newDestination.trim() || createMutation.isPending} onClick={() => createMutation.mutate(newDestination)}><FilePlus2 /></Button></div>
        {createMutation.error && <p className="text-xs text-destructive">{createMutation.error.message}</p>}
        <PageList title="Main Pages" pages={mainPages} selectedId={selectedId} onSelect={setSelectedId}/>
        <PageList title={`Location Pages (${locations.length})`} pages={locations} selectedId={selectedId} onSelect={setSelectedId}/>
      </aside>
      {current && draft && <main className="min-w-0 space-y-6">
        <form className="space-y-7" onSubmit={(event) => { event.preventDefault(); saveMutation.mutate({ ...draft, id: current.id }); }}>
          <section className="rounded-md border border-border bg-surface/40 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs uppercase tracking-widest text-muted-foreground">Page identity</p><h2 className="mt-1 font-display text-2xl">{draft.nav_label}</h2></div><Status draft={current.has_draft}/></div>
            <div className="mt-5 grid gap-4 md:grid-cols-2"><Field label="Page name" value={draft.nav_label} onChange={(value) => setDraft({ ...draft, nav_label: value })}/><Field label="Destination" value={draft.destination_name} onChange={(value) => setDraft({ ...draft, destination_name: value })}/></div>
            <Field label="Page URL" value={draft.slug} prefix="burlingtonvttaxiride.com" onChange={(value) => setDraft({ ...draft, slug: value })}/>
            <p className="mt-2 text-xs text-muted-foreground">Location URLs should follow /burlington-to-town-taxi. Publishing a changed URL keeps the old address redirected.</p>
          </section>
          <EditorSection title="Search appearance" subtitle="Keep “Taxi” in titles and descriptions for location pages."><Field label="Meta title" value={draft.meta_title} count={60} onChange={(value) => setDraft({ ...draft, meta_title: value })}/><Area label="Meta description" value={draft.meta_description} count={160} onChange={(value) => setDraft({ ...draft, meta_description: value })}/></EditorSection>
          <EditorSection title="Hero"><div className="grid gap-4 md:grid-cols-2"><Field label="Eyebrow" value={draft.eyebrow} onChange={(value) => setDraft({ ...draft, eyebrow: value })}/><Field label="Highlighted words" value={draft.hero_highlight} onChange={(value) => setDraft({ ...draft, hero_highlight: value })}/></div><Field label="Headline" value={draft.hero_title} onChange={(value) => setDraft({ ...draft, hero_title: value })}/><Area label="Description" value={draft.hero_description} onChange={(value) => setDraft({ ...draft, hero_description: value })}/><ImageField label="Hero and share image" value={draft.hero_image} onChange={(value) => setDraft({ ...draft, hero_image: value })}/></EditorSection>
          {current.page_type === "location" && <EditorSection title="Page content" subtitle="These sections appear below the destination headline."><Field label="Introduction eyebrow" value={text(draft.content.intro_eyebrow)} onChange={(value) => setContent("intro_eyebrow", value)}/><Field label="Introduction heading" value={text(draft.content.intro_title)} onChange={(value) => setContent("intro_title", value)}/><Area label="Introduction paragraph one" rows={5} value={text(draft.content.intro_paragraph_1)} onChange={(value) => setContent("intro_paragraph_1", value)}/><Area label="Introduction paragraph two" rows={5} value={text(draft.content.intro_paragraph_2)} onChange={(value) => setContent("intro_paragraph_2", value)}/><div className="grid gap-4 md:grid-cols-2">{[1,2,3,4].map((number) => { const title = draft.content[`benefit_${number}_title` as keyof LocationPageContent]; const description = draft.content[`benefit_${number}_description` as keyof LocationPageContent]; return <div key={number} className="space-y-3 rounded-md border border-border p-4"><Field label={`Benefit ${number} title`} value={typeof title === "string" ? title : ""} onChange={(value) => setContent(`benefit_${number}_title` as keyof LocationPageContent, value)}/><Area label="Description" value={typeof description === "string" ? description : ""} onChange={(value) => setContent(`benefit_${number}_description` as keyof LocationPageContent, value)}/></div>; })}</div><Field label="Closing heading" value={text(draft.content.cta_title)} onChange={(value) => setContent("cta_title", value)}/><Area label="Closing description" value={text(draft.content.cta_description)} onChange={(value) => setContent("cta_description", value)}/></EditorSection>}
          <EditorSection title="Internal notes"><Area label="Notes (not shown publicly)" value={draft.body} onChange={(value) => setDraft({ ...draft, body: value })}/></EditorSection>
          <div className="sticky bottom-4 z-10 flex flex-wrap items-center gap-3 rounded-md border border-border bg-background/95 p-4 shadow-lg backdrop-blur"><Button type="submit" variant="outline" disabled={saveMutation.isPending}><Save />{saveMutation.isPending ? "Saving…" : "Save draft"}</Button><Button type="button" disabled={!current.has_draft || publishMutation.isPending} onClick={() => publishMutation.mutate(current.id)}><Rocket />{publishMutation.isPending ? "Publishing…" : "Publish to website"}</Button><Button type="button" variant="ghost" disabled={!current.has_draft || discardMutation.isPending} onClick={() => discardMutation.mutate(current.id)}><Undo2 />Discard</Button>{notice && <span className="text-sm text-emerald-500">{notice}</span>}{[saveMutation.error,publishMutation.error,discardMutation.error].filter(Boolean).map((item,index) => <span key={index} className="text-sm text-destructive">{(item as Error).message}</span>)}</div>
        </form>
        {preview && <div className="overflow-hidden rounded-md border border-gold/30"><div className="border-b border-border bg-surface px-4 py-2 text-xs uppercase tracking-widest text-gold">Draft preview — not published</div><div className="pointer-events-none"><PageHero eyebrow={draft.eyebrow} title={draft.hero_title || draft.nav_label} highlight={draft.hero_highlight} description={draft.hero_description} backgroundImage={draft.hero_image || undefined}/></div><div className="space-y-1 border-t border-border p-5"><p className="text-lg text-gold">{draft.meta_title || draft.nav_label}</p><p className="text-xs text-emerald-500">burlingtonvttaxiride.com{draft.slug}</p><p className="text-sm text-muted-foreground">{draft.meta_description}</p></div></div>}
      </main>}
    </div>}
  </div>;
}

function PageList({ title, pages, selectedId, onSelect }: { title: string; pages: PageDraft[]; selectedId: string | null; onSelect: (id: string) => void }) {
  if (!pages.length) return null;
  return <div><p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{title}</p><div className="max-h-[420px] space-y-1 overflow-y-auto pr-1">{pages.map((page) => <Button key={page.id} variant="ghost" onClick={() => onSelect(page.id)} className={`h-auto w-full justify-start whitespace-normal px-3 py-2 text-left ${selectedId === page.id ? "bg-surface text-gold" : "text-muted-foreground"}`}><span className="min-w-0"><span className="block truncate text-sm">{page.nav_label}</span><span className="block truncate font-mono text-[10px] opacity-60">{page.slug}</span></span>{page.has_draft && <CircleDot className="ml-auto text-amber-500"/>}</Button>)}</div></div>;
}
function Status({ draft }: { draft: boolean }) { return <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-widest ${draft ? "border-amber-500/50 text-amber-500" : "border-emerald-500/50 text-emerald-500"}`}>{draft ? "Pending draft" : "Published"}</span>; }
function EditorSection({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) { return <section className="space-y-4 rounded-md border border-border bg-surface/40 p-5"><div><h3 className="font-display text-xl">{title}</h3>{subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}</div>{children}</section>; }
function Field({ label, value, onChange, prefix, count }: { label: string; value: string; onChange: (value: string) => void; prefix?: string; count?: number }) { return <label className="block"><span className="flex justify-between text-[11px] uppercase tracking-widest text-muted-foreground"><span>{label}</span>{count && <span className={value.length > count ? "text-destructive" : ""}>{value.length}/{count}</span>}</span><div className="mt-1 flex items-center rounded-md border border-input focus-within:ring-1 focus-within:ring-ring">{prefix && <span className="border-r border-border px-3 text-xs text-muted-foreground">{prefix}</span>}<Input value={value} onChange={(event) => onChange(event.target.value)} className="border-0 shadow-none focus-visible:ring-0"/></div></label>; }
function Area({ label, value, onChange, rows = 3, count }: { label: string; value: string; onChange: (value: string) => void; rows?: number; count?: number }) { return <label className="block"><span className="flex justify-between text-[11px] uppercase tracking-widest text-muted-foreground"><span>{label}</span>{count && <span className={value.length > count ? "text-destructive" : ""}>{value.length}/{count}</span>}</span><Textarea value={value} rows={rows} onChange={(event) => onChange(event.target.value)} className="mt-1"/></label>; }