import { createFileRoute } from "@tanstack/react-router";
import { LOCATIONS } from "@/lib/locations";
import { VT_DESTINATIONS } from "@/lib/site-data";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://www.burlingtonvttaxiride.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticPaths = [
  "/",
  "/airport-transfers",
  "/airports-we-serve",
  "/blog",
  "/book-online",
  "/booking-confirmed",
  "/contact",
  "/corporate",
  "/long-distance",
  "/privacy",
  "/services",
  "/ski-resort",
  "/terms",
  "/sitemap",
];

const servicePaths = new Set([
  "/airport-transfers",
  "/airports-we-serve",
  "/long-distance",
  "/corporate",
  "/ski-resort",
  "/services",
  "/book-online",
  "/contact",
]);

const legalPaths = new Set(["/privacy", "/terms", "/sitemap"]);

const dynamicSlugs = [
  ...LOCATIONS.map((l) => l.slug),
  ...VT_DESTINATIONS.map((d) => d.slug),
];

const uniqueSlugs = Array.from(new Set(dynamicSlugs));

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const entries: SitemapEntry[] = [
          ...staticPaths.map((path): SitemapEntry => {
            let changefreq: SitemapEntry["changefreq"] = "monthly";
            let priority = "0.7";
            if (path === "/") {
              changefreq = "weekly";
              priority = "1.0";
            } else if (servicePaths.has(path)) {
              changefreq = "weekly";
              priority = "0.8";
            } else if (legalPaths.has(path)) {
              changefreq = "yearly";
              priority = "0.5";
            }
            return {
              path,
              lastmod: today,
              changefreq,
              priority,
            };
          }),
          ...uniqueSlugs.map((slug): SitemapEntry => ({
            path: `/${slug}`,
            lastmod: today,
            changefreq: "monthly",
            priority: "0.6",
          })),
        ];


        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
