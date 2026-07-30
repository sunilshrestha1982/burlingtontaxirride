import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, LayoutList, FileText } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Back Office — Burlington VT Taxi Ride" },
      {
        name: "description",
        content:
          "Internal back office for Burlington VT Taxi Ride reservations and website page content.",
      },
      { property: "og:title", content: "Back Office — Burlington VT Taxi Ride" },
      { property: "og:description", content: "Internal back office for reservations and content." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const linkClass =
    "block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-gold [&.active]:bg-surface [&.active]:text-gold";

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="text-xs uppercase tracking-[0.3em] text-gold">Back Office</p>
        <nav className="mt-4 space-y-1">
          <Link to="/admin" activeOptions={{ exact: true }} className={linkClass}>
            <span className="inline-flex items-center gap-2">
              <LayoutList className="h-4 w-4" /> Reservations
            </span>
          </Link>
          <Link to="/admin/pages" className={linkClass}>
            <span className="inline-flex items-center gap-2">
              <FileText className="h-4 w-4" /> Website Pages
            </span>
          </Link>
        </nav>
        <button
          onClick={signOut}
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </aside>
      <div className="min-w-0">
        <Outlet />
      </div>
    </div>
  );
}
