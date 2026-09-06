import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authClient, authEnabled, signIn } from "@/lib/auth/client";

export function EmailAuthForm({ onSignedIn }: { onSignedIn?: () => void }) {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!authEnabled) {
    return <p className="text-sm text-primary-fg/70">הכניסה במייל כבויה כרגע.</p>;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim() || "הדר",
        });
        if (err) throw new Error(err.message);
      } else {
        const { error: err } = await authClient.signIn.email({
          email: email.trim(),
          password,
        });
        if (err) throw new Error(err.message);
      }
      await authClient.getSession();
      onSignedIn?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "הכניסה נכשלה");
    } finally {
      setBusy(false);
    }
  }

  const field =
    "h-11 w-full rounded-[12px] border-0 bg-primary-fg/12 px-3 text-sm text-primary-fg placeholder:text-primary-fg/50 outline-none";

  return (
    <div className="space-y-3 text-start">
      <Button
        type="button"
        variant="ghost"
        size="lg"
        className="w-full bg-primary-fg text-primary hover:bg-primary-fg/90"
        onClick={() => void signIn("grok-google", { callbackURL: "/" })}
      >
        <Mail className="size-4" />
        כניסה עם Gmail
      </Button>

      <p className="text-center text-xs text-primary-fg/60">או עם סיסמה</p>

      <form onSubmit={(e) => void submit(e)} className="space-y-2">
        {mode === "up" && (
          <input
            className={field}
            autoComplete="name"
            placeholder="שם"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          className={field}
          type="email"
          required
          autoComplete="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={field}
          type="password"
          required
          minLength={8}
          autoComplete={mode === "up" ? "new-password" : "current-password"}
          placeholder="סיסמה (לפחות 8 תווים)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-primary-fg">{error}</p>}
        <Button
          type="submit"
          variant="ghost"
          size="lg"
          className="w-full border border-primary-fg/25 bg-transparent text-primary-fg hover:bg-primary-fg/10"
          disabled={busy}
        >
          {busy ? "רגע…" : mode === "up" ? "יצירת חשבון" : "כניסה עם אימייל"}
        </Button>
      </form>

      <button
        type="button"
        className="w-full text-center text-sm text-primary-fg/75 underline-offset-4 hover:underline"
        onClick={() => {
          setMode(mode === "in" ? "up" : "in");
          setError(null);
        }}
      >
        {mode === "in" ? "אין חשבון? הרשמה" : "יש חשבון? כניסה"}
      </button>
    </div>
  );
}
