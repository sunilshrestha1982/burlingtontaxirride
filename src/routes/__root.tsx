import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="font-display text-7xl text-gold">404</h1>
      <h2 className="mt-4 font-display text-2xl">Page not found</h2>
      <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
      <a href="/" className="mt-6 inline-flex items-center justify-center rounded-md gradient-gold px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold">Go home</a>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="font-display text-2xl">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">Please try again or head home.</p>
      <div className="mt-6 flex gap-2">
        <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md gradient-gold px-5 py-3 text-sm font-semibold text-primary-foreground">Try again</button>
        <a href="/" className="rounded-md border border-border px-5 py-3 text-sm font-semibold">Home</a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Burlington VT Taxi Ride — 24/7 Airport & Long Distance Car Service" },
      { name: "description", content: "Professional Burlington Vermont taxi & airport transfer service. Fixed rates to BTV, Montreal YUL, Boston, Albany, and across New England. 24/7 availability." },
      { name: "author", content: "Burlington VT Taxi Ride" },
      { property: "og:title", content: "Burlington VT Taxi Ride — 24/7 Airport & Long Distance Car Service" },
      { property: "og:description", content: "Professional Burlington Vermont taxi & airport transfer service. Fixed rates to BTV, Montreal YUL, Boston, Albany, and across New England. 24/7 availability." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Burlington VT Taxi Ride — 24/7 Airport & Long Distance Car Service" },
      { name: "twitter:description", content: "Professional Burlington Vermont taxi & airport transfer service. Fixed rates to BTV, Montreal YUL, Boston, Albany, and across New England. 24/7 availability." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b9c3ae1d-dc84-4059-a740-a7854311dd7a/id-preview-17eb1c5c--c457098b-7768-4e05-a4c1-4bf17df3708f.lovable.app-1781687096806.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b9c3ae1d-dc84-4059-a740-a7854311dd7a/id-preview-17eb1c5c--c457098b-7768-4e05-a4c1-4bf17df3708f.lovable.app-1781687096806.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1"><Outlet /></main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
