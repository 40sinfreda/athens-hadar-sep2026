import {
  Car,
  Info,
  KeyRound,
  Landmark,
  Plane,
  ShoppingBasket,
  TrainFront,
  Utensils,
  Waves,
  type LucideIcon,
} from "lucide-react";
import type { EventKind } from "@/data/itinerary";

const ICONS: Record<EventKind, LucideIcon> = {
  flight: Plane,
  drive: Car,
  transit: TrainFront,
  stay: KeyRound,
  food: Utensils,
  sight: Landmark,
  swim: Waves,
  shop: ShoppingBasket,
  note: Info,
};

const LABELS: Record<EventKind, string> = {
  flight: "טיסה",
  drive: "רכב",
  transit: "תחבורה",
  stay: "דירה",
  food: "אוכל",
  sight: "אתר",
  swim: "ים",
  shop: "קניות",
  note: "הערה",
};

export function KindIcon({ kind, className }: { kind: EventKind; className?: string }) {
  const Icon = ICONS[kind];
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
}

export function kindLabel(kind: EventKind) {
  return LABELS[kind];
}
