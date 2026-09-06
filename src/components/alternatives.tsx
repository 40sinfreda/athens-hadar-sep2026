import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, MapPinned, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Alternative } from "@/data/itinerary";

export function AlternativesButton({
  weekday,
  items,
}: {
  weekday: string;
  items: Alternative[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          <MapPinned className="size-4" />
          אטרקציות חלופיות ל{weekday}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-fg/40" />
        <Dialog.Content
          className="fixed inset-x-0 bottom-0 z-50 max-h-[86dvh] overflow-y-auto rounded-t-[28px] border border-border bg-card p-5 shadow-card outline-none sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-[min(32rem,calc(100vw-2rem))] sm:max-h-[80dvh] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[28px] sm:p-6"
          dir="rtl"
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <Dialog.Title className="font-display text-2xl font-semibold text-fg">
                במקום התוכנית
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted">
                אותו יום, כיוון אחר. כל קישור נפתח במפות.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="סגירה">
                <X className="size-5" />
              </Button>
            </Dialog.Close>
          </div>
          <ul className="space-y-3 pb-[env(safe-area-inset-bottom)]">
            {items.map((a) => (
              <li
                key={a.id}
                className="rounded-[18px] border border-border bg-surface p-4"
              >
                <h4 className="font-display text-lg font-semibold text-fg">{a.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-muted">{a.why}</p>
                {a.costNote && (
                  <p className="mt-2 text-xs font-medium text-primary">{a.costNote}</p>
                )}
                <div className="mt-3 flex flex-wrap gap-2">
                  {a.maps.map((m) => (
                    <a
                      key={m.url}
                      href={m.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-11 items-center gap-1.5 rounded-[12px] bg-primary px-3 text-sm font-medium text-primary-fg"
                    >
                      <ExternalLink className="size-3.5" />
                      {m.label}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
