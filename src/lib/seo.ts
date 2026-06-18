export const SITE_URL = "https://www.burlingtonvttaxiride.com";

export function absoluteImage(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path}`;
}

interface PageHeadOptions {
  title: string;
  description: string;
  image: string;
  path: string;
  ogType?: string;
  noindex?: boolean;
}

export function pageHead({ title, description, image, path, ogType = "website", noindex = false }: PageHeadOptions) {
  const url = `${SITE_URL}${path}`;
  const absoluteImageUrl = absoluteImage(image);
  const meta: Record<string, string>[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: ogType },
    { property: "og:image", content: absoluteImageUrl },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: absoluteImageUrl },
  ];
  if (noindex) {
    meta.push({ name: "robots", content: "noindex" });
  }
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}
