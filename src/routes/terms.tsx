import { createFileRoute } from "@tanstack/react-router";
import { EMAIL, PHONE } from "@/lib/site-data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => pageHead({
    title: "Terms of Service — Burlington VT Taxi Ride",
    description: "Terms and conditions for booking and using Burlington VT Taxi Ride transportation services.",
    image: "/og-image.jpg",
    path: "/terms",
  }),
  component: Page,
});

function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Legal</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 17, 2026</p>

      <div className="prose prose-invert mt-10 max-w-none space-y-6 text-muted-foreground">
        <p>
          These terms govern your use of Burlington VT Taxi Ride's transportation services. By
          booking a ride or using our website, you agree to be bound by them.
        </p>

        <h2 className="font-display text-2xl text-foreground">Bookings &amp; Confirmation</h2>
        <p>
          A booking is confirmed once we send a confirmation by phone, SMS, or email. Quoted fares
          are fixed unless the trip details (pickup, drop-off, passengers, stops, or wait time)
          change.
        </p>

        <h2 className="font-display text-2xl text-foreground">Cancellations &amp; No-Shows</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Cancellations made more than 2 hours before pickup: no charge.</li>
          <li>Cancellations within 2 hours of pickup: 50% of the quoted fare may apply.</li>
          <li>No-shows or cancellations after the driver has arrived: full fare may apply.</li>
        </ul>

        <h2 className="font-display text-2xl text-foreground">Payment</h2>
        <p>
          We accept major credit cards, debit cards, and cash where arranged. Tolls, parking, and
          additional stops not included in the original quote may be added to the final fare.
        </p>

        <h2 className="font-display text-2xl text-foreground">Passenger Conduct</h2>
        <p>
          For everyone's safety, smoking, illegal substances, and open alcohol containers are not
          permitted in our vehicles. Drivers may refuse or end service for disruptive behavior, and
          cleaning fees may apply to soiled vehicles.
        </p>

        <h2 className="font-display text-2xl text-foreground">Liability</h2>
        <p>
          We carry the licensing and insurance required to operate in Vermont. We are not liable
          for delays caused by weather, traffic, border wait times, mechanical failure, or other
          events beyond our reasonable control, though we will always do our best to keep you
          informed.
        </p>

        <h2 className="font-display text-2xl text-foreground">Lost &amp; Found</h2>
        <p>
          Please contact us right after your ride if you believe you left something behind. We will
          do our best to recover and return items.
        </p>

        <h2 className="font-display text-2xl text-foreground">Changes</h2>
        <p>
          We may update these terms from time to time. The latest version is always posted on this
          page.
        </p>

        <h2 className="font-display text-2xl text-foreground">Contact</h2>
        <p>
          Questions? Email <a className="text-gold underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>{" "}
          or call <span className="text-gold">{PHONE}</span>.
        </p>
      </div>
    </article>
  );
}
