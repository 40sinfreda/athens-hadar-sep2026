import type { Cost } from "@/data/itinerary";

export function coupleAmount(c: Cost) {
  return c.for === "person" ? c.amount * 2 : c.amount;
}

export function formatCost(c: Cost) {
  const n =
    c.currency === "EUR"
      ? `${c.amount % 1 === 0 ? c.amount.toFixed(0) : c.amount.toFixed(2)} €`
      : `${c.amount} ₪`;
  const who = c.for === "person" ? "לאדם" : c.for === "couple" ? "לזוג" : "";
  return [n, who, c.estimate ? "הערכה" : null, c.note].filter(Boolean).join(" · ");
}
