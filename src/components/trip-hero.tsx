import { KeyRound, Phone, Plane } from "lucide-react";
import { mapsLink, mapsSearch } from "@/lib/maps";
import { TRIP } from "@/data/itinerary";

export function TripHero() {
  const apt = mapsLink("הדירה במפות", TRIP.apartment);

  return (
    <header className="border-b border-border bg-primary text-primary-fg">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <p className="text-sm font-medium tracking-wide text-primary-fg/75">{TRIP.couple}</p>
        <h1 className="mt-1 font-display text-4xl font-semibold leading-tight sm:text-5xl">
          {TRIP.title}
        </h1>
        <p className="mt-2 text-lg text-primary-fg/85">{TRIP.datesLabel} · {TRIP.nights} לילות</p>

        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          <Fact icon={Plane} label="טיסות" value={`${TRIP.outbound}\n${TRIP.inbound}`} />
          <Fact
            icon={KeyRound}
            label="דירה"
            value={`${TRIP.apartmentName}\n${TRIP.apartment}`}
            href={apt.url}
          />
        </dl>

        <ul className="mt-6 space-y-1.5 text-sm leading-relaxed text-primary-fg/85">
          <li>PNR {TRIP.pnr} · {TRIP.seats} · Economy Lite, בלי כבודה בבטן</li>
          <li>צ׳ק־אין אחרי 15:00 · יציאה ב־28.9 בשעה 07:00 לטיסה</li>
          <li>וואטסאפ למארחים סביב 20.9 — בלי הטופס אין קוד לדלת</li>
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={`tel:${TRIP.hostPhone.replace(/\s/g, "")}`}
            className="inline-flex h-11 items-center gap-2 rounded-[12px] bg-primary-fg px-3 text-sm font-medium text-primary"
          >
            <Phone className="size-4" />
            {TRIP.hostPhone}
          </a>
          <a
            href={mapsSearch(TRIP.apartment)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center rounded-[12px] border border-primary-fg/25 px-3 text-sm font-medium"
          >
            ניווט לדירה
          </a>
        </div>
      </div>
    </header>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Plane;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <dt className="flex items-center gap-1.5 text-xs font-medium text-primary-fg/70">
        <Icon className="size-3.5" />
        {label}
      </dt>
      <dd className="mt-1 whitespace-pre-line text-sm leading-snug">{value}</dd>
    </>
  );
  const cls = "rounded-[18px] bg-primary-fg/8 px-3 py-3";
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return <div className={cls}>{inner}</div>;
}
