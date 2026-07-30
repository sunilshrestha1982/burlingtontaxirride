import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ImagePlus, Loader2, RefreshCw, X } from "lucide-react";

export const mediaUrl = (path: string) => `/api/public/media/${path}`;

const slugifyName = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-|-$/g, "");

type LibraryItem = { path: string; url: string };

function useMediaLibrary(open: boolean) {
  const [items, setItems] = useState<LibraryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.storage
      .from("media")
      .list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
    if (error) setError(error.message);
    setItems(
      (data ?? [])
        .filter((f) => f.id)
        .map((f) => ({ path: f.name, url: mediaUrl(f.name) })),
    );
    setLoading(false);
  }, []);

  useEffect(() => {
    if (open) void load();
  }, [open, load]);

  return { items, loading, error, reload: load };
}

/** Text field + upload button + library picker for hero / share images. */
export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { items, loading, error, reload } = useMediaLibrary(open);

  async function upload(file: File) {
    setUploading(true);
    setUploadError(null);
    const path = `${Date.now()}-${slugifyName(file.name)}`;
    const { error } = await supabase.storage
      .from("media")
      .upload(path, file, { cacheControl: "31536000", upsert: false });
    setUploading(false);
    if (error) {
      setUploadError(error.message);
      return;
    }
    onChange(mediaUrl(path));
    setOpen(true);
    void reload();
  }

  return (
    <div className="rounded-lg border border-border/70 bg-background/40 p-3">
      <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <div className="mt-2 flex flex-wrap items-start gap-3">
        {value ? (
          <img
            src={value}
            alt=""
            className="h-20 w-32 shrink-0 rounded-md border border-border object-cover"
          />
        ) : (
          <div className="flex h-20 w-32 shrink-0 items-center justify-center rounded-md border border-dashed border-border text-[11px] text-muted-foreground">
            No image
          </div>
        )}
        <div className="min-w-[220px] flex-1 space-y-2">
          <input
            value={value}
            placeholder="/places/burlington-vt.jpg"
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-md border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none focus:border-gold"
          />
          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gold/40 px-3 py-1.5 text-xs font-semibold text-gold hover:bg-gold/10">
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <ImagePlus className="h-3.5 w-3.5" />
              )}
              {uploading ? "Uploading…" : "Upload image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  if (f) void upload(f);
                }}
              />
            </label>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              {open ? "Hide library" : "Choose from library"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-destructive"
              >
                <X className="h-3.5 w-3.5" /> Clear
              </button>
            )}
          </div>
          {uploadError && <p className="text-xs text-destructive">{uploadError}</p>}
        </div>
      </div>

      {open && (
        <div className="mt-3 rounded-md border border-border/70 bg-surface/40 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Media library
            </span>
            <button
              type="button"
              onClick={() => void reload()}
              className="inline-flex items-center gap-1 text-xs text-gold"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
          {!loading && items.length === 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              No uploads yet — use “Upload image” above.
            </p>
          )}
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {items.map((it) => (
              <button
                key={it.path}
                type="button"
                onClick={() => onChange(it.url)}
                className={`overflow-hidden rounded-md border ${
                  value === it.url ? "border-gold" : "border-border"
                }`}
                title={it.path}
              >
                <img src={it.url} alt={it.path} className="h-16 w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
