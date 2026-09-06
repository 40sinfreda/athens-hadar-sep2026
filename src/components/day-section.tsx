import type { DayPlan } from "@/data/itinerary";
import { EventCard } from "@/components/event-card";
import { AlternativesButton } from "@/components/alternatives";

export function DaySection({ day }: { day: DayPlan }) {
  const [, m, d] = day.date.split("-");
  const pretty = `${Number(d)}.${Number(m)}`;

  return (
    <section id={day.id} className="scroll-mt-28">
      <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-wide text-primary">
            {day.weekday} · {pretty}
          </p>
          <h2 className="mt-1 font-display text-3xl font-semibold leading-tight text-fg">
            {day.title}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted">{day.summary}</p>
        </div>
        <AlternativesButton weekday={day.weekday} items={day.alternatives} />
      </header>
      <ol className="relative space-y-3 border-r border-line pr-4 sm:pr-6">
        {day.events.map((e) => (
          <li key={e.id}>
            <EventCard event={e} />
          </li>
        ))}
      </ol>
    </section>
  );
}
