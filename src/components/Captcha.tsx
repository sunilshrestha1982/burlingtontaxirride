import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

export function useCaptcha() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [answer, setAnswer] = useState("");
  const regen = () => {
    setA(Math.floor(Math.random() * 9) + 1);
    setB(Math.floor(Math.random() * 9) + 1);
    setAnswer("");
  };
  useEffect(regen, []);
  const valid = Number(answer) === a + b;
  return { a, b, answer, setAnswer, regen, valid };
}

export function Captcha({ c }: { c: ReturnType<typeof useCaptcha> }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-muted-foreground">Security check — solve to continue</label>
      <div className="flex items-center gap-2">
        <div className="select-none rounded-md border border-gold/40 bg-surface px-4 py-2 font-display text-lg tracking-widest text-gold">
          {c.a} + {c.b} = ?
        </div>
        <input
          required
          inputMode="numeric"
          value={c.answer}
          onChange={(e) => c.setAnswer(e.target.value.replace(/\D/g, ""))}
          placeholder="Answer"
          className="w-28 rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none"
        />
        <button type="button" onClick={c.regen} aria-label="Refresh captcha" className="rounded-md border border-border p-2 text-muted-foreground hover:text-gold">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      {c.answer && !c.valid && <p className="mt-1 text-xs text-destructive">Incorrect — please try again.</p>}
    </div>
  );
}
