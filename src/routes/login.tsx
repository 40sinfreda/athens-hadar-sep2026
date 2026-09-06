import { Navigate, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Fingerprint } from "lucide-react";
import { EmailAuthForm } from "@/components/email-auth-form";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  if (isPending) {
    return <main className="min-h-dvh bg-primary" />;
  }
  if (user) return <Navigate to="/" />;

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-primary px-6 text-primary-fg">
      <div className="w-full max-w-sm rounded-[28px] bg-primary-fg/8 p-6">
        <div className="mx-auto flex size-16 items-center justify-center rounded-[18px] bg-primary-fg/10">
          <Fingerprint className="size-8" strokeWidth={1.6} />
        </div>
        <h1 className="mt-5 text-center font-display text-3xl font-semibold">
          אתונה · הדר
        </h1>
        <p className="mt-2 mb-6 text-center text-sm text-primary-fg/80">
          כניסה עם המייל או Gmail
        </p>
        <EmailAuthForm onSignedIn={() => void navigate({ to: "/" })} />
      </div>
    </main>
  );
}
