import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listMessages, updateMessage, type ContactMessage } from "@/lib/contact.functions";
import { CheckCircle2, Circle, Mail, Phone, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/messages")({
  component: AdminMessagesPage,
});

function AdminMessagesPage() {
  const fetchMessages = useServerFn(listMessages);
  const update = useServerFn(updateMessage);
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: () => fetchMessages(),
  });

  const toggle = useMutation({
    mutationFn: (m: ContactMessage) => update({ data: { id: m.id, handled: !m.handled } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-messages"] }),
  });

  const messages = data?.isAdmin ? data.messages : [];
  const open = messages.filter((m) => !m.handled).length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Leads</p>
          <h1 className="mt-2 font-display text-4xl">Contact Messages</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {open} awaiting follow-up · {messages.length} total
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-4 py-2 text-sm font-semibold text-gold hover:bg-gold/10"
        >
          <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {isLoading && <p className="mt-10 text-sm text-muted-foreground">Loading messages…</p>}
      {error && <p className="mt-10 text-sm text-destructive">{(error as Error).message}</p>}
      {data && !data.isAdmin && (
        <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-8">
          <h2 className="font-display text-2xl">No admin access</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This account has not been granted admin access yet.
          </p>
        </div>
      )}

      {data?.isAdmin && messages.length === 0 && (
        <p className="mt-10 text-sm text-muted-foreground">No messages yet.</p>
      )}

      <div className="mt-8 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`rounded-2xl border p-5 ${
              m.handled ? "border-border bg-surface/30 opacity-70" : "border-gold/30 bg-surface/60"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl">{m.name || "Unnamed"}</h2>
                <p className="text-xs text-muted-foreground">
                  {new Date(m.created_at).toLocaleString()} {m.service ? `· ${m.service}` : ""}
                </p>
              </div>
              <button
                onClick={() => toggle.mutate(m)}
                className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-semibold ${
                  m.handled
                    ? "border-emerald-500/50 text-emerald-500"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.handled ? (
                  <CheckCircle2 className="h-3.5 w-3.5" />
                ) : (
                  <Circle className="h-3.5 w-3.5" />
                )}
                {m.handled ? "Followed up" : "Mark followed up"}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              {m.phone && (
                <a href={`tel:${m.phone}`} className="inline-flex items-center gap-1.5 text-gold">
                  <Phone className="h-3.5 w-3.5" /> {m.phone}
                </a>
              )}
              {m.email && (
                <a
                  href={`mailto:${m.email}`}
                  className="inline-flex items-center gap-1.5 text-gold break-all"
                >
                  <Mail className="h-3.5 w-3.5" /> {m.email}
                </a>
              )}
            </div>

            {(m.pickup || m.dropoff) && (
              <p className="mt-3 text-sm text-muted-foreground">
                {m.pickup || "—"} → {m.dropoff || "—"}
              </p>
            )}
            {m.message && (
              <p className="mt-3 whitespace-pre-wrap rounded-lg border border-border/60 bg-background/40 p-3 text-sm">
                {m.message}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
