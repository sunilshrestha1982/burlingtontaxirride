import { createFileRoute } from "@tanstack/react-router";
import { EMAIL, PHONE } from "@/lib/site-data";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead({
    title: "Privacy Policy — Burlington VT Taxi Ride",
    description: "How Burlington VT Taxi Ride collects, uses, and protects your personal information.",
    image: "/__l5e/assets-v1/0d43759a-156f-49f4-bd87-ce7fe3cdac15/br-logo.jpeg",
    path: "/privacy",
  }),
  component: Page,
});

function Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">Legal</p>
      <h1 className="mt-3 font-display text-4xl sm:text-5xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: June 17, 2026</p>

      <div className="prose prose-invert mt-10 max-w-none space-y-6 text-muted-foreground">
        <p>
          Burlington VT Taxi Ride ("we", "us", or "our") respects your privacy. This policy explains
          what information we collect when you book a ride or contact us, how we use it, and the
          choices you have.
        </p>

        <h2 className="font-display text-2xl text-foreground">Information We Collect</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Contact details you provide when booking: name, phone number, email, and pickup/drop-off addresses.</li>
          <li>Trip details such as date, time, passenger count, and flight number (if any).</li>
          <li>Technical information like IP address and browser type for security and analytics.</li>
        </ul>

        <h2 className="font-display text-2xl text-foreground">How We Use Your Information</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>To confirm, dispatch, and complete your ride.</li>
          <li>To contact you about your booking via phone, SMS, WhatsApp, or email.</li>
          <li>To respond to inquiries and provide customer support.</li>
          <li>To comply with legal obligations and prevent fraud.</li>
        </ul>

        <h2 className="font-display text-2xl text-foreground">Sharing</h2>
        <p>
          We do not sell your personal information. We share trip details only with the assigned
          driver and with payment, communication, or analytics providers strictly as needed to
          deliver our service.
        </p>

        <h2 className="font-display text-2xl text-foreground">Data Retention &amp; Security</h2>
        <p>
          We keep booking records as long as needed to fulfill the trip, support customer claims,
          and meet tax or legal requirements. We protect your information with reasonable
          administrative and technical safeguards.
        </p>

        <h2 className="font-display text-2xl text-foreground">Your Choices</h2>
        <p>
          You may request access to, correction, or deletion of your personal information by
          contacting us. You can opt out of marketing messages at any time by replying STOP or
          emailing us.
        </p>

        <h2 className="font-display text-2xl text-foreground">Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a className="text-gold underline" href={`mailto:${EMAIL}`}>{EMAIL}</a> or call{" "}
          <span className="text-gold">{PHONE}</span>.
        </p>
      </div>
    </article>
  );
}
