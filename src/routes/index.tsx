import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { days } from "@/data/itinerary";
import { TripHero } from "@/components/trip-hero";
import { DayNav } from "@/components/day-nav";
import { DaySection } from "@/components/day-section";
import { CostPanel } from "@/components/cost-panel";
import { useDone } from "@/store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [active, setActive] = useState(days[0]?.id ?? "d23");
  const hydrate = useDone((s) => s.hydrate);

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
