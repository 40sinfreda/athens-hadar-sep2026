import type { DayPlan } from "@/data/itinerary";
import { cn } from "@/lib/utils";

export function DayNav({ active, days }: { active: string; days: DayPlan[] }) {
  return (
    <nav
      aria-label="ימים"
      className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {days.map((d) => {
          const [, m, day] = d.date.split("-");
          const isOn = active === d.id;
          return (
            <a
              key={d.id}
              href={`#${d.id}`}
              className={cn(
                "flex h-12 min-w-14 shrink-0 flex-col items-center justify-center rounded-[12px] px-3 text-center transition-colors duration-150",
                isOn ? "bg-primary text-primary-fg" : "bg-card text-fg border border-border",
              )}
            >
              <span className="text-[11px] font-medium leading-none">{d.short}</span>
              <span className="mt-1 text-sm font-semibold tabular-nums leading-none">
                {Number(day)}.{Number(m)}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
