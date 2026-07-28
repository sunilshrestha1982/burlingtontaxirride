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
import brLogo from "../assets/br-logo-square.jpeg.asset.json";
import brLogoFavicon from "../assets/br-logo-square.jpeg.asset.json";


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
      { name: "theme-color", content: "#0f172a" },
      { name: "google-site-verification", content: "gIRGGD5DhwzF_SfOEVsZ7k-03sGwJn-eSmIN5iRDdpk" },
      { name: "author", content: "Burlington VT Taxi Ride" },
      { property: "og:site_name", content: "Burlington VT Taxi Ride" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", type: "image/jpeg", href: brLogoFavicon.url },
      { rel: "apple-touch-icon", sizes: "180x180", href: brLogoFavicon.url },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" },
    ],
    scripts: [
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-TVY0PSY8PJ",
      },
      {
        children: `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-TVY0PSY8PJ');`,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Organization", "LocalBusiness"],
          "@id": "https://www.burlingtonvttaxiride.com/#business",
          name: "Burlington VT Taxi Ride",
          url: "https://www.burlingtonvttaxiride.com",
          logo: `https://www.burlingtonvttaxiride.com${brLogo.url}`,
          image: `https://www.burlingtonvttaxiride.com${brLogo.url}`,
          description: "Professional Burlington Vermont taxi & airport transfer service. Fixed rates to BTV, Montreal YUL, Boston, Albany, and across New England. 24/7 availability.",
          telephone: "+18024480707",
          email: "burlingtonvttaxiride@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Burlington",
            addressRegion: "VT",
            postalCode: "05401",
            addressCountry: "US",
          },
          areaServed: {
            "@type": "State",
            name: "Vermont",
          },
          priceRange: "$$",
          sameAs: [
            "https://www.burlingtonvttaxiride.com",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://www.burlingtonvttaxiride.com/#website",
          name: "Burlington VT Taxi Ride",
          url: "https://www.burlingtonvttaxiride.com",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://www.burlingtonvttaxiride.com/?search={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
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
