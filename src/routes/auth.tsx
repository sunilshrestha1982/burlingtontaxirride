import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Staff Sign In — Burlington VT Taxi Ride" },
      {
        name: "description",
        content:
          "Secure staff sign in for Burlington VT Taxi Ride dispatchers to review incoming reservations.",
      },
      { property: "og:title", content: "Staff Sign In — Burlington VT Taxi Ride" },
      {
        property: "og:description",
        content: "Secure staff sign in for Burlington VT Taxi Ride dispatchers.",
      },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/auth` }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/admin", replace: true });
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-24 sm:px-6">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Staff Only</p>
      <h1 className="mt-2 font-display text-4xl">Sign In</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Dispatcher access to incoming reservations.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="text-sm text-muted-foreground">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm text-muted-foreground">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="gradient-gold w-full rounded-md px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
