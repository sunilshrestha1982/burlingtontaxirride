import { useEffect, useState } from "react";

const slides = [
  { src: "/places/btv-airport.jpg", alt: "Burlington International Airport BTV terminal" },
  { src: "/places/burlington-vt.jpg", alt: "Burlington Vermont waterfront" },
  { src: "/places/stowe-vt.jpg", alt: "Vermont scenic mountain landscape" },
  { src: "/places/montreal-city.jpg", alt: "Montreal skyline transfer destination" },
  { src: "/places/toyota-sienna-2026.jpg", alt: "2026 Toyota Sienna 7-passenger minivan for Vermont transfers" },
];

export function HeroSlideshow() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);
  const go = (n: number) => setI((n + slides.length) % slides.length);
  return (
    <div className="absolute inset-0 -z-10">
      {slides.map((s, idx) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
      <button
        onClick={() => go(i - 1)}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/40 bg-background/40 px-2 py-1 text-sm text-gold backdrop-blur hover:bg-gold/20 sm:left-3 sm:px-3 sm:py-2 sm:text-base"
      >←</button>
      <button
        onClick={() => go(i + 1)}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-gold/40 bg-background/40 px-2 py-1 text-sm text-gold backdrop-blur hover:bg-gold/20 sm:right-3 sm:px-3 sm:py-2 sm:text-base"
      >→</button>
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-gold" : "w-2 bg-gold/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
