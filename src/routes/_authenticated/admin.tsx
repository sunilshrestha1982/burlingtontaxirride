import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { listBookings, type AdminBooking } from "@/lib/bookings.functions";
import { CheckCircle2, XCircle, MinusCircle, RefreshCw, LogOut } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Bookings Dashboard — Burlington VT Taxi Ride" },
      {
        name: "description",
        content:
          "Internal dashboard listing incoming Burlington VT Taxi Ride reservations and email delivery status.",
      },
      { property: "og:title", content: "Bookings Dashboard — Burlington VT Taxi Ride" },
      {
        property: "og:description",
        content: "Internal dashboard for incoming reservations.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const fetchBookings = useServerFn(listBookings);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: () => fetchBookings(),
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Dispatcher</p>
          <h1 className="mt-2 font-display text-4xl">Incoming Reservations</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-4 py-2 text-sm font-semibold text-gold hover:bg-gold/10"
          >
            <RefreshCw className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>

      {isLoading && <p className="mt-10 text-sm text-muted-foreground">Loading bookings…</p>}
      {error && (
        <p className="mt-10 text-sm text-destructive">
          {(error as Error).message}
        </p>
      )}

      {data && !data.isAdmin && (
        <div className="mt-10 rounded-2xl border border-border bg-surface/40 p-8">
          <h2 className="font-display text-2xl">No admin access</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This account is signed in but has not been granted admin access yet.
          </p>
        </div>
      )}

      {data?.isAdmin && data.bookings.length === 0 && (
        <p className="mt-10 text-sm text-muted-foreground">No reservations yet.</p>
      )}

      {data?.isAdmin && data.bookings.length > 0 && (
        <div className="mt-10 space-y-4">
          {data.bookings.map((b) => (
            <BookingCard key={b.id} b={b} />
          ))}
        </div>
      )}
    </div>
  );
}

function Status({
  sent,
  label,
  err,
  na,
}: {
  sent: boolean;
  label: string;
  err: string | null;
  na?: boolean;
}) {
  const Icon = na ? MinusCircle : sent ? CheckCircle2 : XCircle;
  const color = na
    ? "text-muted-foreground"
    : sent
      ? "text-emerald-500"
      : "text-destructive";
  return (
    <span className="inline-flex items-center gap-1.5 text-xs" title={err ?? undefined}>
      <Icon className={`h-4 w-4 ${color}`} />
      <span className={color}>
        {label}: {na ? "n/a" : sent ? "sent" : "failed"}
      </span>
    </span>
  );
}

function BookingCard({ b }: { b: AdminBooking }) {
  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-display text-xl">
            {b.name || "Unnamed"}{" "}
            <span className="font-mono text-sm text-gold">{b.reference}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Received {new Date(b.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Status sent={b.admin_email_sent} err={b.admin_email_error} label="Admin email" />
          <Status
            sent={b.passenger_email_sent}
            err={b.passenger_email_error}
            label="Passenger email"
            na={!b.email}
          />
        </div>
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Service" value={b.service} />
        <Field label="Phone" value={b.phone} />
        <Field label="Email" value={b.email} />
        <Field label="Passengers / Luggage" value={`${b.passengers ?? "—"} / ${b.luggage ?? "—"}`} />
        <Field label="Pickup" value={b.pickup} />
        <Field label="Drop-off" value={b.dropoff} />
        <Field label="Date / Time" value={`${b.ride_date ?? "—"} ${b.ride_time ?? ""}`} />
        <Field label="Flight" value={b.flight} />
      </dl>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/40 p-3">
      <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-foreground">{value || "—"}</dd>
    </div>
  );
}
