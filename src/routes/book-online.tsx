import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { loadPageContent, mergeMeta, heroOverrides } from "@/lib/page-content";
import { PageHero } from "@/components/PageHero";
import { BookingForm } from "@/components/BookingForm";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/book-online")({
  loader: () => loadPageContent("/book-online"),
  head: ({ loaderData }) => pageHead(mergeMeta({
    title: "Book a Ride Online — Burlington VT Taxi Ride",
    description: "Reserve your Burlington VT taxi or airport transfer online. Confirmed within minutes — fixed rate, no surprises.",
    image: "/places/burlington-vt.jpg",
    path: "/book-online",
  }, loaderData ?? null)),
  component: Page,
});

function Page() {
  const cms = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow="— Book Your Ride"
        title="Reserve"
        highlight="Your Ride"
        description="Confirmed within minutes — fixed rate, no surprises. Available 24 hours a day, every day of the year."
        backgroundImage="/places/burlington-vt.jpg"
        ctaLabel="Call Us"
        {...heroOverrides(cms)}
      />
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <BookingForm />
      </section>
      <CTASection />
    </>
  );
}
