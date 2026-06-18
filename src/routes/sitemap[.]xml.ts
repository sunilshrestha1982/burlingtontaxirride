import { createFileRoute } from "@tanstack/react-router";
import { LOCATIONS } from "@/lib/locations";
import { VT_DESTINATIONS } from "@/lib/site-data";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://www.burlingtonvttaxirride.com";

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

const dynamicSlugs = [
  ...LOCATIONS.map((l) => l.slug),
  ...VT_DESTINATIONS.map((d) => d.slug),
];

const uniqueSlugs = Array.from(new Set(dynamicSlugs));

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          ...staticPaths.map((path) => ({
            path,
            changefreq: path === "/" ? "weekly" : "monthly",
            priority: path === "/" ? "1.0" : "0.7",
          })),
          ...uniqueSlugs.map((slug) => ({
            path: `/${slug}`,
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
