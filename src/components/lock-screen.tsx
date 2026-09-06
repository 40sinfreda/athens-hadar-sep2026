import { useEffect, useState } from "react";
import { Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmailAuthForm } from "@/components/email-auth-form";
import {
  hasPasskey,
  passkeySupported,
  registerPasskey,
  unlockWithPasskey,
} from "@/lib/passkey";

export function LockPending() {
  return <main className="min-h-dvh bg-primary" aria-busy="true" />;
}

export function LockScreen({ onUnlock }: { onUnlock: () => void }) {
  const [mode, setMode] = useState<"setup" | "unlock" | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    setSupported(passkeySupported());
    setMode(hasPasskey() ? "unlock" : "setup");
  }, []);

  async function run() {
    if (!mode) return;
    setError(null);
    setBusy(true);
    try {
      if (mode === "setup") await registerPasskey();
      else await unlockWithPasskey();
      onUnlock();
    } catch {
      setError("האימות בוטל או נכשל. נסו שוב, או היכנסו עם המייל.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-primary px-6 py-10 text-primary-fg">
      <div className="w-full max-w-sm rounded-[28px] bg-primary-fg/8 p-6 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-[18px] bg-primary-fg/10">
          <Fingerprint className="size-8" strokeWidth={1.6} />
        </div>
        <h1 className="mt-5 font-display text-3xl font-semibold">אתונה · הדר</h1>
        <p className="mt-2 text-sm leading-relaxed text-primary-fg/80">
          {mode === "unlock"
            ? "פתחו עם טביעת אצבע, Face ID, או המייל."
            : "פעם ראשונה במכשיר — טביעת אצבע / Face ID, או כניסה עם המייל."}
        </p>

        {!supported && (
          <p className="mt-3 text-sm text-primary-fg/75">
            אין ביומטריה בדפדפן הזה. היכנסו עם המייל.
          </p>
        )}

        {error && <p className="mt-3 text-sm text-primary-fg">{error}</p>}

        <Button
          type="button"
          variant="ghost"
          size="lg"
          className="mt-6 w-full bg-primary-fg text-primary hover:bg-primary-fg/90"
          disabled={!supported || busy || !mode}
          onClick={() => void run()}
        >
          <Fingerprint className="size-4" />
          {busy
            ? "ממתינים לאימות…"
            : mode === "unlock"
              ? "פתיחה עם טביעת אצבע"
              : "הגדרת טביעת אצבע"}
        </Button>

        <p className="my-4 text-xs text-primary-fg/60">או</p>
        <EmailAuthForm onSignedIn={onUnlock} />
      </div>
    </main>
  );
}
