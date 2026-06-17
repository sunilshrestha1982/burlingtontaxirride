import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/PageHero";
import { BookingForm } from "@/components/BookingForm";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/book-online")({
  head: () => ({
    meta: [
      { title: "Book a Ride Online — Burlington VT Taxi Ride" },
      { name: "description", content: "Reserve your Burlington VT taxi or airport transfer online. Confirmed within minutes — fixed rate, no surprises." },
      { property: "og:title", content: "Book a Ride Online — Burlington VT Taxi Ride" },
      { property: "og:description", content: "Reserve your ride 24/7." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero
        eyebrow="— Book Your Ride"
        title="Reserve"
        highlight="Your Ride"
        description="Confirmed within minutes — fixed rate, no surprises. Available 24 hours a day, every day of the year."
        backgroundImage="/places/burlington-vt.jpg"
        ctaLabel="Call Us"
      />
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <BookingForm />
      </section>
      <CTASection />
    </>
  );
}
