import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { loadPublishedPost, formatPostDate, bodyBlocks } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await loadPublishedPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) =>
    pageHead({
      title: loaderData?.meta_title || loaderData?.title || "Article",
      description:
        loaderData?.meta_description ||
        loaderData?.excerpt ||
        "Burlington VT Taxi Ride service guide article.",
      image: loaderData?.cover_image || "/places/burlington-vt.jpg",
      path: `/blog/${loaderData?.slug ?? ""}`,
      ogType: "article",
    }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl">Article not found</h1>
      <Link to="/blog" className="mt-4 inline-block text-gold underline">
        Back to the blog
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <Link to="/blog" className="mt-4 inline-block text-gold underline">
        Back to the blog
      </Link>
    </div>
  ),
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={post.title}
        description={post.excerpt ?? ""}
        backgroundImage={post.cover_image ?? "/places/burlington-vt.jpg"}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-gold">
          {[post.author, formatPostDate(post.published_at)].filter(Boolean).join(" · ")}
        </p>
        <div className="mt-6 space-y-5">
          {bodyBlocks(post.body).map((b, i) =>
            b.type === "h" ? (
              <h2 key={i} className="font-display text-2xl text-gold">
                {b.text}
              </h2>
            ) : (
              <p key={i} className="text-muted-foreground">
                {b.text}
              </p>
            ),
          )}
        </div>
      </article>

      <CTASection />
    </>
  );
}
