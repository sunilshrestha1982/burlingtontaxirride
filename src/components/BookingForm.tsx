import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { CalendarIcon, Clock, Phone } from "lucide-react";
import { PHONE, PHONE_TEL } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Errors = Partial<Record<
  "name" | "phone" | "pickup" | "dropoff" | "date" | "time" | "service",
  string
>>;

const NAME_RE = /^[A-Za-zÀ-ÿ '.-]{2,60}$/;

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
      if (!NAME_RE.test(v)) return "Enter a valid name.";
      return;
    case "phone": {
      if (!v) return "Phone number is required.";
      const d = digits(v);
      if (d.length < 10 || d.length > 15) return "Enter a valid phone number.";
      return;
    }
    case "pickup":
      if (!v) return "Pickup address is required.";
      return;
    case "dropoff":
      if (!v) return "Drop-off location is required.";
      return;
    case "date":
      return v ? undefined : "Please select a date.";
    case "time":
      return v ? undefined : "Please select a time.";
  }
}

export function BookingForm() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [values, setValues] = useState({
    service: "",
    name: "",
    phone: "",
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    passengers: "1",
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
      "w-full rounded-md border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none",
      errors[k] ? "border-destructive focus:border-destructive" : "border-border focus:border-gold",
    );

  const labelCls = "mb-2 block text-xs font-bold uppercase tracking-widest text-gold";

  const formatTime = (t: string) => {
    if (!t) return "";
    const [h, m] = t.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hh = ((h + 11) % 12) + 1;
    return `${hh}:${String(m).padStart(2, "0")} ${ampm}`;
  };

  return (
    <div className="rounded-2xl border border-gold/30 bg-surface/80 p-6 shadow-gold backdrop-blur sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-gold">— Book Your Ride</p>
      <h3 className="mt-2 font-display text-4xl text-foreground">Reserve Your Ride Today</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Confirmed within minutes — no hidden fees.
      </p>

      <form
        noValidate
        className="mt-6 grid gap-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const keys: (keyof Errors)[] = ["service", "name", "phone", "pickup", "dropoff", "date", "time"];
          const next: Errors = {};
          for (const k of keys) {
            const msg = validateField(k, (values as any)[k] || "");
            if (msg) next[k] = msg;
          }
          setErrors(next);
          setTouched(Object.fromEntries(keys.map((k) => [k, true])));
          if (Object.keys(next).length > 0) return;

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
          } catch {}
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
          <label className={labelCls}>Drop-off</label>
          <input
            value={values.dropoff}
            onChange={(e) => setField("dropoff", e.target.value)}
            onBlur={() => onBlur("dropoff")}
            placeholder="Burlington Airport or destination"
            className={inputCls("dropoff")}
          />
          {errors.dropoff && <p className="mt-1 text-xs text-destructive">{errors.dropoff}</p>}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
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
                  <span>{dateObj ? format(dateObj, "PP") : "mm/dd/yyyy"}</span>
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
                <option value="" disabled>--:-- --</option>
                {times.map((t) => (
                  <option key={t} value={t}>{formatTime(t)}</option>
                ))}
              </select>
              <Clock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
            </div>
            {errors.time && <p className="mt-1 text-xs text-destructive">{errors.time}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Passengers</label>
            <select
              value={values.passengers}
              onChange={(e) => setField("passengers", e.target.value)}
              className={inputCls("name").replace("border-destructive", "border-border")}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <option key={n} value={String(n)}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input
              type="tel"
              value={values.phone}
              onChange={(e) => setField("phone", e.target.value)}
              onBlur={() => onBlur("phone")}
              placeholder="(802) 555-0000"
              className={inputCls("phone")}
              autoComplete="tel"
            />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-md border border-gold/40 bg-background px-5 py-4 text-sm font-bold uppercase tracking-widest text-foreground hover:bg-gold hover:text-primary-foreground transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Sending…" : "✦ Reserve My Ride Now"}
        </button>
        <p className="text-center text-sm text-muted-foreground">or call us 24/7</p>
        <a
          href={`tel:${PHONE_TEL}`}
          className="flex items-center justify-center gap-2 rounded-md border border-gold px-5 py-4 text-lg font-bold text-gold hover:bg-gold/10 transition"
        >
          <Phone className="h-5 w-5" /> {PHONE}
        </a>
      </form>
    </div>
  );
}
