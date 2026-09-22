import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, GripVertical, Plus, Trash2 } from "lucide-react";
import { ImageField } from "@/components/admin/MediaPicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { TaxiPageBlock, TaxiPageBlockType } from "@/lib/page-content";

const blockOptions: Array<{ type: TaxiPageBlockType; label: string; description: string }> = [
  { type: "text", label: "Text section", description: "Heading and long-form paragraphs" },
  { type: "benefits", label: "Benefits grid", description: "Four scannable selling points" },
  { type: "service", label: "Service details", description: "Cards for service offerings" },
  { type: "route", label: "Route information", description: "Pickup, destination, time, and distance" },
  { type: "imageText", label: "Image + text", description: "Visual content section" },
  { type: "faq", label: "FAQs", description: "Questions and answers" },
  { type: "cta", label: "Call to action", description: "Prominent booking prompt" },
  { type: "booking", label: "Reservation form", description: "Complete booking form" },
];

export function createBlock(type: TaxiPageBlockType): TaxiPageBlock {
  const id = `${type}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  if (type === "benefits") return { id, type, title: "Why choose our taxi service", items: Array.from({ length: 4 }, (_, index) => ({ title: `Benefit ${index + 1}`, description: "Describe this customer benefit." })) };
  if (type === "service") return { id, type, eyebrow: "Our service", title: "Taxi service details", body: "Add a helpful introduction.", items: [{ title: "Professional service", description: "Describe this service." }, { title: "Reliable transportation", description: "Describe this service." }] };
  if (type === "route") return { id, type, eyebrow: "Route details", title: "Plan your journey", origin: "Burlington, Vermont", destination: "", duration: "", distance: "" };
  if (type === "imageText") return { id, type, eyebrow: "Travel with confidence", title: "Comfortable Vermont transportation", body: "Add detailed page copy here.", image: "", imagePosition: "left" };
  if (type === "faq") return { id, type, eyebrow: "Frequently asked questions", title: "Before you travel", items: [{ title: "How do I book?", description: "Book online or call our team." }, { title: "Is service available 24/7?", description: "Yes, advance reservations are available day and night." }] };
  if (type === "cta") return { id, type, title: "Ready to reserve your ride?", description: "Book online or call for a fixed-rate quote.", buttonLabel: "Book online", buttonUrl: "/book-online" };
  if (type === "booking") return { id, type, eyebrow: "Book your ride", title: "Reserve your taxi", body: "Enter your travel details and our team will confirm your reservation." };
  return { id, type, eyebrow: "Burlington VT Taxi Ride", title: "Add a section heading", body: "Write long-form taxi page content here. Separate paragraphs with a blank line." };
}

export function PageBlockEditor({ blocks, onChange }: { blocks: TaxiPageBlock[]; onChange: (blocks: TaxiPageBlock[]) => void }) {
  const [adding, setAdding] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const update = (index: number, block: TaxiPageBlock) => onChange(blocks.map((item, itemIndex) => itemIndex === index ? block : item));
  const move = (index: number, offset: number) => { const next = [...blocks]; const target = index + offset; if (target < 0 || target >= next.length) return; [next[index], next[target]] = [next[target], next[index]]; onChange(next); };
  return <div className="space-y-3">
    {blocks.map((block, index) => <section key={block.id} className="rounded-md border border-border bg-background/60">
      <header className="flex items-center gap-2 border-b border-border px-3 py-2"><GripVertical className="h-4 w-4 text-muted-foreground"/><button type="button" className="min-w-0 flex-1 text-left" onClick={() => setCollapsed({ ...collapsed, [block.id]: !collapsed[block.id] })}><span className="block truncate text-sm font-semibold">{blockOptions.find((option) => option.type === block.type)?.label}</span><span className="block truncate text-xs text-muted-foreground">{block.title || "Untitled block"}</span></button><Button type="button" size="icon" variant="ghost" title="Move up" disabled={index === 0} onClick={() => move(index, -1)}><ChevronUp/></Button><Button type="button" size="icon" variant="ghost" title="Move down" disabled={index === blocks.length - 1} onClick={() => move(index, 1)}><ChevronDown/></Button><Button type="button" size="icon" variant="ghost" title="Duplicate" onClick={() => onChange([...blocks.slice(0, index + 1), { ...block, id: `${block.type}-${Date.now()}` }, ...blocks.slice(index + 1)])}><Copy/></Button><Button type="button" size="icon" variant="ghost" title="Remove" onClick={() => onChange(blocks.filter((_, itemIndex) => itemIndex !== index))}><Trash2/></Button></header>
      {!collapsed[block.id] && <div className="space-y-4 p-4"><CommonFields block={block} onChange={(next) => update(index, next)}/><BlockFields block={block} onChange={(next) => update(index, next)}/></div>}
    </section>)}
    <Button type="button" variant="outline" onClick={() => setAdding(!adding)}><Plus/>{adding ? "Close block menu" : "Add section block"}</Button>
    {adding && <div className="grid gap-2 rounded-md border border-border bg-background p-3 sm:grid-cols-2">{blockOptions.map((option) => <Button key={option.type} type="button" variant="ghost" className="h-auto justify-start whitespace-normal border border-border p-3 text-left" onClick={() => { onChange([...blocks, createBlock(option.type)]); setAdding(false); }}><span><span className="block font-semibold">{option.label}</span><span className="block text-xs text-muted-foreground">{option.description}</span></span></Button>)}</div>}
  </div>;
}

function CommonFields({ block, onChange }: { block: TaxiPageBlock; onChange: (block: TaxiPageBlock) => void }) {
  if (block.type === "benefits") return <Field label="Section heading" value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })}/>;
  return <><div className="grid gap-3 sm:grid-cols-2"><Field label="Eyebrow" value={block.eyebrow ?? ""} onChange={(eyebrow) => onChange({ ...block, eyebrow })}/><Field label="Section heading" value={block.title ?? ""} onChange={(title) => onChange({ ...block, title })}/></div>{block.type !== "text" && block.type !== "imageText" && block.type !== "booking" && <Area label="Supporting description" value={block.description ?? ""} onChange={(description) => onChange({ ...block, description })}/>}</>;
}
function BlockFields({ block, onChange }: { block: TaxiPageBlock; onChange: (block: TaxiPageBlock) => void }) {
  if (["text","service","imageText","booking"].includes(block.type)) return <><Area label="Body content" rows={6} value={block.body ?? ""} onChange={(body) => onChange({ ...block, body })}/>{block.type === "imageText" && <><ImageField label="Section image" value={block.image ?? ""} onChange={(image) => onChange({ ...block, image })}/><label className="block text-[11px] uppercase tracking-widest text-muted-foreground">Image position<select value={block.imagePosition ?? "left"} onChange={(event) => onChange({ ...block, imagePosition: event.target.value as "left" | "right" })} className="mt-1 block h-9 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="left">Left</option><option value="right">Right</option></select></label></>}{block.type === "service" && <ItemsEditor items={block.items ?? []} onChange={(items) => onChange({ ...block, items })}/>}</>;
  if (block.type === "benefits" || block.type === "faq") return <ItemsEditor items={block.items ?? []} onChange={(items) => onChange({ ...block, items })} />;
  if (block.type === "route") return <div className="grid gap-3 sm:grid-cols-2"><Field label="Pickup" value={block.origin ?? ""} onChange={(origin) => onChange({ ...block, origin })}/><Field label="Destination" value={block.destination ?? ""} onChange={(destination) => onChange({ ...block, destination })}/><Field label="Travel time" value={block.duration ?? ""} onChange={(duration) => onChange({ ...block, duration })}/><Field label="Distance" value={block.distance ?? ""} onChange={(distance) => onChange({ ...block, distance })}/></div>;
  if (block.type === "cta") return <div className="grid gap-3 sm:grid-cols-2"><Field label="Button label" value={block.buttonLabel ?? ""} onChange={(buttonLabel) => onChange({ ...block, buttonLabel })}/><Field label="Button link" value={block.buttonUrl ?? ""} onChange={(buttonUrl) => onChange({ ...block, buttonUrl })}/></div>;
  return null;
}
function ItemsEditor({ items, onChange }: { items: Array<{ title: string; description: string }>; onChange: (items: Array<{ title: string; description: string }>) => void }) { return <div className="space-y-3"><p className="text-[11px] uppercase tracking-widest text-muted-foreground">Items</p>{items.map((item, index) => <div key={index} className="grid gap-2 rounded-md border border-border p-3 sm:grid-cols-[1fr_2fr_auto]"><Input value={item.title} placeholder="Title or question" onChange={(event) => onChange(items.map((current, itemIndex) => itemIndex === index ? { ...current, title: event.target.value } : current))}/><Textarea value={item.description} placeholder="Description or answer" onChange={(event) => onChange(items.map((current, itemIndex) => itemIndex === index ? { ...current, description: event.target.value } : current))}/><Button type="button" size="icon" variant="ghost" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}><Trash2/></Button></div>)}<Button type="button" size="sm" variant="outline" onClick={() => onChange([...items, { title: "", description: "" }])}><Plus/>Add item</Button></div>; }
function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="block"><span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span><Input value={value} onChange={(event) => onChange(event.target.value)} className="mt-1"/></label>; }
function Area({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (value: string) => void; rows?: number }) { return <label className="block"><span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span><Textarea value={value} rows={rows} onChange={(event) => onChange(event.target.value)} className="mt-1"/></label>; }