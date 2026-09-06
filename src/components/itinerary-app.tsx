import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Cost, DayPlan, TripMeta } from "@/data/itinerary";
import { TripHero } from "@/components/trip-hero";
import { DayNav } from "@/components/day-nav";
import { DaySection } from "@/components/day-section";
import { CostPanel } from "@/components/cost-panel";
import { useDone } from "@/store";

export function ItineraryApp({
  trip,
  days,
  paid,
  header,
}: {
  trip: TripMeta;
  days: DayPlan[];
  paid: Cost[];
  header?: ReactNode;
}) {
  const [active, setActive] = useState(days[0]?.id ?? "d23");
  const hydrate = useDone((s) => s.hydrate);
  const lockUntil = useRef(0);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    const sections = days
      .map((d) => document.getElementById(d.id))
      .filter((el): el is HTMLElement => !!el);

    const obs = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockUntil.current) return;
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target.id) setActive(vis.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [days]);

  function selectDay(id: string) {
    setActive(id);
    lockUntil.current = Date.now() + 900;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-dvh bg-bg text-fg">
      <TripHero trip={trip} />
      <DayNav active={active} days={days} onSelect={selectDay} />
      <div className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-8 pb-24">
        {header}
        <CostPanel days={days} paid={paid} />
        {days.map((day) => (
          <DaySection key={day.id} day={day} />
        ))}
        <footer className="border-t border-border pt-6 text-sm text-muted">
          My Greek Vacations · הזמנה {trip.booking} · לא מלון — מתכלים באחריות האורחים.
        </footer>
      </div>
    </main>
  );
}
