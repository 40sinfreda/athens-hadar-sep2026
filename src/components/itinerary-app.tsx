import { useEffect, useState } from "react";
import { Fingerprint, Lock } from "lucide-react";
import { days } from "@/data/itinerary";
import { TripHero } from "@/components/trip-hero";
import { DayNav } from "@/components/day-nav";
import { DaySection } from "@/components/day-section";
import { CostPanel } from "@/components/cost-panel";
import { Button } from "@/components/ui/button";
import { useDone } from "@/store";
import { lockSession, registerPasskey } from "@/lib/passkey";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUser } from "@/lib/auth/use-current-user";

export function ItineraryApp({ onLock }: { onLock: () => void }) {
  const [active, setActive] = useState(days[0]?.id ?? "d23");
  const hydrate = useDone((s) => s.hydrate);
  const user = useCurrentUser();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    const sections = days
      .map((d) => document.getElementById(d.id))
      .filter((el): el is HTMLElement => !!el);

    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target.id) setActive(vis.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <TripHero />
      <DayNav active={active} />
      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-8 pb-24">
        <div className="flex flex-wrap items-center gap-2">
          {user ? (
            <div className="me-auto">
              <UserButton />
            </div>
          ) : (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                lockSession();
                onLock();
              }}
            >
              <Lock className="size-3.5" />
              נעילה
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              void registerPasskey().catch(() => undefined);
            }}
          >
            <Fingerprint className="size-3.5" />
            הוספת טביעת אצבע
          </Button>
        </div>
        <CostPanel />
        {days.map((day) => (
          <DaySection key={day.id} day={day} />
        ))}
        <footer className="border-t border-border pt-6 text-sm text-muted">
          My Greek Vacations · הזמנה 5865470878 · לא מלון — מתכלים באחריות האורחים.
        </footer>
      </div>
    </main>
  );
}
