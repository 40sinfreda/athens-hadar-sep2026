import { Fingerprint } from "lucide-react";
import { EmailAuthForm } from "@/components/email-auth-form";
import { UserButton } from "@/lib/auth/gates";

export function LockPending() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-primary px-6 text-primary-fg">
      <p className="font-display text-3xl font-semibold">אתונה · הדר</p>
    </main>
  );
}

export function LockScreen() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-primary px-6 py-10 text-primary-fg">
      <div className="w-full max-w-sm rounded-[28px] bg-primary-fg/8 p-6 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-[18px] bg-primary-fg/10">
          <Fingerprint className="size-8" strokeWidth={1.6} />
        </div>
        <h1 className="mt-5 font-display text-3xl font-semibold">אתונה · הדר</h1>
        <p className="mt-2 mb-6 text-sm leading-relaxed text-primary-fg/80">
          הלו״ז פרטי. כניסה רק לישראל ולשרית — עם Gmail או אימייל וסיסמה.
        </p>
        <EmailAuthForm />
      </div>
    </main>
  );
}

export function DeniedScreen() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-primary px-6 text-primary-fg">
      <div className="w-full max-w-sm rounded-[28px] bg-primary-fg/8 p-6 text-center">
        <h1 className="font-display text-3xl font-semibold">אין גישה</h1>
        <p className="mt-3 mb-6 text-sm leading-relaxed text-primary-fg/80">
          האפליקציה הזו רק לישראל ולשרית הדר. התחברו עם Gmail של ישראל, או שלחו את
          המייל של שרית כדי שנוסיף אותו.
        </p>
        <div className="flex justify-center text-primary-fg">
          <UserButton />
        </div>
      </div>
    </main>
  );
}
