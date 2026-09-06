import { useEffect, useState } from "react";
import { Fingerprint } from "lucide-react";
import { ItineraryApp } from "@/components/itinerary-app";
import { Button } from "@/components/ui/button";
import { PAID, TRIP, days } from "@/data/itinerary";

const KEY = "athens-hadar-gate";
const HASH =
  "0f8811209a76ebd3aacfdba176eb4839d3e51d41886be6d00a4bfb5c2f359635";

async function sha(text: string) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function PagesApp() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === "1") setOpen(true);
    } catch {
      /* ignore */
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const h = await sha(code.trim());
    if (h !== HASH) {
      setError("קוד שגוי");
      return;
    }
    sessionStorage.setItem(KEY, "1");
    setOpen(true);
  }

  if (open) {
    return (
      <ItineraryApp trip={TRIP} days={days} paid={PAID} showAccount={false} />
    );
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-primary px-6 text-primary-fg">
      <div className="w-full max-w-sm rounded-[28px] bg-primary-fg/8 p-6 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-[18px] bg-primary-fg/10">
          <Fingerprint className="size-8" strokeWidth={1.6} />
        </div>
        <h1 className="mt-5 font-display text-3xl font-semibold">אתונה · הדר</h1>
        <p className="mt-2 mb-6 text-sm leading-relaxed text-primary-fg/80">
          קוד כניסה משותף לישראל ולשרית.
        </p>
        <form onSubmit={(e) => void submit(e)} className="space-y-3">
          <input
            className="h-11 w-full rounded-[12px] border-0 bg-primary-fg/12 px-3 text-center text-sm text-primary-fg placeholder:text-primary-fg/50 outline-none"
            type="password"
            autoComplete="current-password"
            placeholder="קוד כניסה"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {error && <p className="text-sm">{error}</p>}
          <Button
            type="submit"
            variant="ghost"
            size="lg"
            className="w-full bg-primary-fg text-primary hover:bg-primary-fg/90"
          >
            כניסה
          </Button>
        </form>
      </div>
    </main>
  );
}
