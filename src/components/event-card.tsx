import { Check, ExternalLink, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCost, type EventItem } from "@/data/itinerary";
import { KindIcon, kindLabel } from "@/components/kind-icon";
import { useDone } from "@/store";

export function EventCard({ event }: { event: EventItem }) {
  const done = useDone((s) => s.done[event.id] ?? false);
  const toggle = useDone((s) => s.toggle);
  const range = event.end ? `${event.start}–${event.end}` : event.start;

  return (
    <article
      className={cn(
        "relative rounded-[28px] border border-border bg-card p-4 shadow-card sm:p-5",
        done && "opacity-70",
      )}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => toggle(event.id)}
          aria-pressed={done}
          aria-label={done ? "סמן כלא בוצע" : "סמן כבוצע"}
          className={cn(
            "mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-[12px] border transition-colors duration-150",
            done
              ? "border-done bg-done text-primary-fg"
              : "border-border bg-surface text-muted",
          )}
        >
          <Check className="size-5" strokeWidth={2.2} />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <time dir="ltr" className="font-medium tabular-nums text-primary">
              {range}
            </time>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted">
              <KindIcon kind={event.kind} className="size-3.5" />
              {kindLabel(event.kind)}
            </span>
          </div>
          <h3
            className={cn(
              "mt-1 font-display text-xl font-semibold leading-snug text-fg",
              done && "line-through decoration-line",
            )}
          >
            {event.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{event.detail}</p>

          {event.costs.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {event.costs.map((c, i) => (
                <li
                  key={i}
                  className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-fg"
                >
                  {formatCost(c)}
                </li>
              ))}
            </ul>
          )}

          {event.tips && event.tips.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm text-olive">
              {event.tips.map((t) => (
                <li key={t} className="leading-snug">
                  {t}
                </li>
              ))}
            </ul>
          )}

          {event.maps.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {event.maps.map((m) => {
                const isNav =
                  /ניווט|→|מהדירה|מהמוזיאון|מגליפדה|דירה →|ל-Edem|לגליפדה|מבנאקי/.test(
                    m.label,
                  );
                return (
                  <a
                    key={m.url + m.label}
                    href={m.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 items-center gap-1.5 rounded-[12px] border border-border bg-surface px-3 text-sm font-medium text-primary hover:bg-card"
                  >
                    {isNav ? (
                      <Navigation className="size-3.5" strokeWidth={2} />
                    ) : (
                      <ExternalLink className="size-3.5" strokeWidth={2} />
                    )}
                    {m.label}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
