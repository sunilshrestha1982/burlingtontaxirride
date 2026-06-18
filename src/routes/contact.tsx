import { createFileRoute } from "@tanstack/react-router";
import { useId, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { PHONE, PHONE_TEL, EMAIL, WHATSAPP, ADDRESS } from "@/lib/site-data";
import { pageHead } from "@/lib/seo";
import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => pageHead({
    title: "Contact - Burlington VT Taxi Ride 24/7",
    description: "Call, text, WhatsApp or message us. We respond within minutes — 24 hours a day.",
    image: "/places/burlington-vt.jpg",
    path: "/contact",
  }),
  component: Page,
});

function Page() {
  const [a, setA] = useState("");
  const [sent, setSent] = useState(false);
  const correct = 12;
  const fid = useId();
  const id = (k: string) => `${fid}-${k}`;

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact"
        highlight="Burlington VT Taxi Ride"
        description="Call, text, WhatsApp, or fill out the form below. We respond within minutes — 24 hours a day."
        backgroundImage="/places/burlington-vt.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Reach Us Directly</p>
            <h2 className="mt-3 font-display text-4xl">Always Available</h2>
            <p className="mt-4 text-muted-foreground">
              We're available every hour of every day — including holidays. The fastest way to confirm a booking is a phone call or text. For non-urgent inquiries, use the contact form and we'll respond within the hour.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                { icon: Phone, label: "Phone / Text", value: PHONE, href: `tel:${PHONE_TEL}`, sub: "Call or text anytime — 24/7" },
                { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, sub: "We reply within the hour" },
                { icon: MessageCircle, label: "WhatsApp", value: "Message on WhatsApp", href: WHATSAPP, sub: "Quick responses, 24/7" },
                { icon: MapPin, label: "Address", value: ADDRESS, href: `https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`, sub: "Burlington, Vermont" },
              ].map((c) => (
                <a key={c.label} href={c.href} className="flex items-start gap-4 rounded-xl border border-border bg-surface/60 p-5 hover:border-gold/50 hover:bg-surface transition">
                  <c.icon className="h-6 w-6 text-gold shrink-0" />
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                    <div className="mt-1 font-semibold text-foreground break-all">{c.value}</div>
                    <div className="text-xs text-muted-foreground">{c.sub}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-border bg-surface/60 p-6">
              <h3 className="inline-flex items-center gap-2 font-display text-lg text-gold"><Clock className="h-4 w-4" />Operating Hours</h3>
              <table className="mt-3 w-full text-sm">
                <tbody>
                  {[
                    ["Monday – Sunday", "24 Hours"],
                    ["Public Holidays", "24 Hours"],
                    ["Airport Pickups", "24 Hours"],
                    ["Early Morning (2–5 AM)", "Available"],
                    ["Late Night (10 PM+)", "Available"],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-t border-border/50">
                      <td className="py-2 text-muted-foreground">{k}</td>
                      <td className="py-2 text-right text-foreground">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-2xl border border-gold/30 bg-surface/80 p-6 shadow-gold sm:p-8">
            <p className="text-xs uppercase tracking-widest text-gold">Send Us a Message</p>
            <h3 className="mt-2 font-display text-3xl">Get in Touch</h3>

            {sent ? (
              <div className="mt-6 rounded-xl border border-gold/40 bg-gold/10 p-6">
                <h4 className="font-display text-2xl text-gold">Message Sent!</h4>
                <p className="mt-2 text-sm text-muted-foreground">Thank you for reaching out. We'll be in touch within the hour. For immediate assistance call <a className="text-gold underline" href={`tel:${PHONE_TEL}`}>{PHONE}</a>.</p>
                <div className="mt-4 flex gap-3">
                  <a href={WHATSAPP} className="rounded-md border border-gold/40 px-4 py-2 text-sm font-semibold text-gold">WhatsApp</a>
                  <a href={`tel:${PHONE_TEL}`} className="rounded-md gradient-gold px-4 py-2 text-sm font-semibold text-primary-foreground">Call now</a>
                </div>
              </div>
            ) : (
              <form
                className="mt-6 grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (parseInt(a, 10) !== correct) {
                    alert("Please answer the math question correctly.");
                    return;
                  }
                  setSent(true);
                }}
              >
                <input required placeholder="Your Name *" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                <input required type="tel" placeholder="Phone Number *" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                <input type="email" placeholder="Email Address" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                <select className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none">
                  <option>Select a service…</option>
                  <option>Airport Transfer — To Airport</option>
                  <option>Airport Transfer — From Airport</option>
                  <option>Long Distance Transfer</option>
                  <option>Round Trip</option>
                  <option>General Inquiry</option>
                </select>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input placeholder="Pickup Location" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                  <input placeholder="Drop-off Location" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input type="date" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                  <select className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none">
                    <option>Passengers</option>
                    {[1,2,3,4,5,6].map((n)=> <option key={n}>{n} Passenger{n>1?"s":""}</option>)}
                  </select>
                </div>
                <textarea rows={4} placeholder="Message or Special Requests" className="rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                <div className="rounded-md border border-border bg-background/60 p-3">
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground">Security Check *</label>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-display text-lg text-gold">What is 3 + 9 =</span>
                    <input required value={a} onChange={(e)=>setA(e.target.value)} className="w-20 rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none" />
                  </div>
                </div>
                <button type="submit" className="gradient-gold rounded-md px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold">Send Message</button>
                <p className="text-center text-xs text-muted-foreground">Or call us directly: <a className="text-gold" href={`tel:${PHONE_TEL}`}>{PHONE}</a></p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
