import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { CalendarIcon, Clock, Phone } from "lucide-react";
import { PHONE, PHONE_TEL } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Captcha, useCaptcha } from "./Captcha";

type Errors = Partial<Record<
  "name" | "phone" | "email" | "pickup" | "dropoff" | "date" | "time" | "service" | "flight",
  string
>>;

const NAME_RE = /^[A-Za-zÀ-ÿ '.-]{2,60}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FLIGHT_RE = /^[A-Z0-9]{2}\s?\d{1,4}[A-Z]?$/i;

function digits(s: string) {
  return s.replace(/\D/g, "");
}

function validateField(name: keyof Errors, value: string): string | undefined {
  const v = value.trim();
  switch (name) {
    case "service":
      return v ? undefined : "Please choose a service type.";
    case "name":
      if (!v) return "Full name is required.";
      if (!NAME_RE.test(v)) return "Enter a valid name (letters, 2–60 chars).";
      return;
    case "phone": {
      if (!v) return "Phone number is required.";
      const d = digits(v);
      if (d.length < 10 || d.length > 15) return "Enter a valid phone number (10–15 digits).";
      return;
    }
    case "email":
      if (!v) return "Email is required.";
      if (!EMAIL_RE.test(v)) return "Enter a valid email address.";
      return;
    case "pickup":
      if (!v) return "Pickup address is required.";
      if (v.length < 4) return "Please enter a more specific pickup address.";
      return;
    case "dropoff":
      if (!v) return "Drop-off location is required.";
      if (v.length < 3) return "Please enter a more specific drop-off location.";
      return;
    case "date":
      return v ? undefined : "Please select a date.";
    case "time":
      return v ? undefined : "Please select a time.";
    case "flight":
      if (!v) return; // optional
      if (!FLIGHT_RE.test(v)) return "Flight # should look like 'AA 2341'.";
      return;
  }
}

export function BookingForm() {
  const navigate = useNavigate();
  const captcha = useCaptcha();
  const [submitting, setSubmitting] = useState(false);

  const [values, setValues] = useState({
    service: "",
    name: "",
    phone: "",
    email: "",
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    passengers: "1 Passenger",
    luggage: "No Luggage",
    flight: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Errors, boolean>>>({});

  const dateObj = useMemo(() => (values.date ? new Date(values.date + "T00:00:00") : undefined), [values.date]);
  const times = useMemo(() => {
    const out: string[] = [];
    for (let h = 0; h < 24; h++) {
      for (const m of [0, 15, 30, 45]) {
        out.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      }
    }
    return out;
  }, []);

  const setField = (k: keyof typeof values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (touched[k as keyof Errors]) {
      setErrors((e) => ({ ...e, [k]: validateField(k as keyof Errors, v) }));
    }
  };
  const onBlur = (k: keyof Errors) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((e) => ({ ...e, [k]: validateField(k, (values as any)[k] || "") }));
  };

  const inputCls = (k: keyof Errors) =>
    cn(
      "w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none",
      errors[k] ? "border-destructive focus:border-destructive" : "border-border focus:border-gold",
    );

  const labelCls = "mb-1 block text-xs font-medium uppercase tracking-wider text-muted-foreground";

  const formatTime = (t: string) => {
    if (!t) return "";
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hh = ((h + 11) % 12) + 1;
    return `${hh}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="rounded-2xl border border-gold/30 bg-surface/80 p-6 shadow-gold backdrop-blur sm:p-8">
      <p className="text-xs uppercase tracking-widest text-gold">— Quick Booking</p>
      <h3 className="mt-2 font-display text-3xl text-foreground">
        Reserve Your <em className="text-gradient-gold not-italic">Ride Today</em>
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Confirmed within minutes — no hidden fees, no surprises.
      </p>

      <form
        noValidate
        className="mt-6 grid gap-4"
        onSubmit={async (e) => {
          e.preventDefault();

          const keys: (keyof Errors)[] = ["service", "name", "phone", "email", "pickup", "dropoff", "date", "time", "flight"];
          const next: Errors = {};
          for (const k of keys) {
            const msg = validateField(k, (values as any)[k] || "");
            if (msg) next[k] = msg;
          }
          setErrors(next);
          setTouched(Object.fromEntries(keys.map((k) => [k, true])));
          if (Object.keys(next).length > 0 || !captcha.valid) return;

          setSubmitting(true);
          const booking = {
            ...values,
            reference: "BVT-" + Math.random().toString(36).slice(2, 8).toUpperCase(),
            submittedAt: new Date().toISOString(),
          };

          try {
            await fetch("/api/public/send-booking", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(booking),
            });
          } catch {
            // ignore
          }

          sessionStorage.setItem("lastBooking", JSON.stringify(booking));
          setSubmitting(false);
          navigate({ to: "/booking-confirmed" });
        }}
      >
        <div>
          <label className={labelCls}>Service Type</label>
          <select
            value={values.service}
            onChange={(e) => setField("service", e.target.value)}
            onBlur={() => onBlur("service")}
            className={inputCls("service")}
          >
            <option value="" disabled>Select a service…</option>
            <option>Airport Transfer — To Airport</option>
            <option>Airport Transfer — From Airport</option>
            <option>Long Distance Transfer</option>
            <option>Round Trip</option>
          </select>
          {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Full Name</label>
            <input
              value={values.name}
              onChange={(e) => setField("name", e.target.value)}
              onBlur={() => onBlur("name")}
              placeholder="John Smith"
              className={inputCls("name")}
              autoComplete="name"
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input
              type="tel"
              value={values.phone}
              onChange={(e) => setField("phone", e.target.value)}
              onBlur={() => onBlur("phone")}
              placeholder="(802) 555-0100"
              className={inputCls("phone")}
              autoComplete="tel"
            />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className={labelCls}>Email</label>
          <input
            type="email"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            onBlur={() => onBlur("email")}
            placeholder="you@email.com"
            className={inputCls("email")}
            autoComplete="email"
          />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
        </div>

        <div>
          <label className={labelCls}>Pickup Address</label>
          <input
            value={values.pickup}
            onChange={(e) => setField("pickup", e.target.value)}
            onBlur={() => onBlur("pickup")}
            placeholder="Hotel, home, or address"
            className={inputCls("pickup")}
          />
          {errors.pickup && <p className="mt-1 text-xs text-destructive">{errors.pickup}</p>}
        </div>

        <div>
          <label className={labelCls}>Drop-off Location</label>
          <input
            value={values.dropoff}
            onChange={(e) => setField("dropoff", e.target.value)}
            onBlur={() => onBlur("dropoff")}
            placeholder="Burlington Airport or destination"
            className={inputCls("dropoff")}
          />
          {errors.dropoff && <p className="mt-1 text-xs text-destructive">{errors.dropoff}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  onBlur={() => onBlur("date")}
                  className={cn(
                    inputCls("date"),
                    "flex items-center justify-between text-left",
                    !values.date && "text-muted-foreground",
                  )}
                >
                  <span>{dateObj ? format(dateObj, "PPP") : "Pick a date"}</span>
                  <CalendarIcon className="h-4 w-4 text-gold" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateObj}
                  onSelect={(d) => {
                    setField("date", d ? format(d, "yyyy-MM-dd") : "");
                    setTouched((t) => ({ ...t, date: true }));
                  }}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date}</p>}
          </div>
          <div>
            <label className={labelCls}>Time</label>
            <div className="relative">
              <select
                value={values.time}
                onChange={(e) => setField("time", e.target.value)}
                onBlur={() => onBlur("time")}
                className={cn(inputCls("time"), "appearance-none pr-9")}
              >
                <option value="" disabled>Select a time…</option>
                {times.map((t) => (
                  <option key={t} value={t}>{formatTime(t)}</option>
                ))}
              </select>
              <Clock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
            </div>
            {errors.time && <p className="mt-1 text-xs text-destructive">{errors.time}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Passengers</label>
            <select
              value={values.passengers}
              onChange={(e) => setField("passengers", e.target.value)}
              className={inputCls("name").replace("border-destructive", "border-border")}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <option key={n}>{n} Passenger{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Luggage</label>
            <select
              value={values.luggage}
              onChange={(e) => setField("luggage", e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none"
            >
              <option>No Luggage</option>
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <option key={n}>{n} Bag{n > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Flight # (optional)</label>
          <input
            value={values.flight}
            onChange={(e) => setField("flight", e.target.value)}
            onBlur={() => onBlur("flight")}
            placeholder="e.g. AA 2341 — for tracking"
            className={inputCls("flight")}
          />
          {errors.flight && <p className="mt-1 text-xs text-destructive">{errors.flight}</p>}
        </div>

        <Captcha c={captcha} />
        <button
          type="submit"
          disabled={!captcha.valid || submitting}
          className="gradient-gold rounded-md px-5 py-3 text-sm font-semibold text-primary-foreground shadow-gold hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Sending…" : "✦ Reserve My Ride Now"}
        </button>
        <p className="text-center text-xs text-muted-foreground">or call us directly</p>
        <a href={`tel:${PHONE_TEL}`} className="inline-flex items-center justify-center gap-2 text-lg font-bold text-gold">
          <Phone className="h-4 w-4" /> {PHONE}
        </a>
        <p className="text-center text-xs text-muted-foreground">Available 24/7 · Every Day · Holidays</p>
      </form>
    </div>
  );
}
