import type { Cost, DayPlan } from "@/data/itinerary";
import { coupleAmount } from "@/lib/costs";

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export function CostPanel({ days, paid }: { days: DayPlan[]; paid: Cost[] }) {
  let eurFixed = 0;
  let eurEst = 0;
  let ils = 0;

  for (const d of days) {
    for (const e of d.events) {
      for (const c of e.costs) {
        const v = coupleAmount(c);
        if (c.currency === "ILS") ils += v;
        else if (c.estimate) eurEst += v;
        else eurFixed += v;
      }
    }
  }

  const hotel = paid.reduce((s, c) => s + coupleAmount(c), 0);

  return (
    <section className="rounded-[28px] border border-border bg-card p-5 shadow-card sm:p-6">
      <h2 className="font-display text-2xl font-semibold text-fg">עלויות לזוג</h2>
      <p className="mt-1 text-sm text-muted">
        טיסות שולמו בנפרד ולא נכללות כאן. סכומים באירו הם לשהות באתונה.
      </p>
      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="דירה (שולם)" value={`${hotel.toFixed(2)} €`} />
        <Stat label="כרטיסים קבועים" value={`${round1(eurFixed)} €`} hint="אתרים + מטרו שדה" />
        <Stat label="אוכל ותחבורה" value={`~${round1(eurEst)} €`} hint="הערכה" />
        <Stat label="חניון נתב״ג" value={`~${ils} ₪`} hint="הערכה" />
      </dl>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        סה״כ באתונה לזוג, בלי הדירה שכבר שולמה: כ־
        {round1(eurFixed + eurEst)} €. Asteria בגליפדה (70 €) אופציונלי ונכלל בהערכה.
        כרטיס 5 ימים בתחבורה עירונית 8.20 € לאדם יכול להחליף חלק מכרטיסי ה־1.20 €.
      </p>
    </section>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-[18px] bg-surface px-3 py-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 font-display text-xl font-semibold tabular-nums text-fg">{value}</dd>
      {hint ? <p className="mt-0.5 text-[11px] text-subtle">{hint}</p> : null}
    </div>
  );
}
