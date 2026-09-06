import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ItineraryApp } from "@/components/itinerary-app";
import { DeniedScreen, LockPending, LockScreen } from "@/components/lock-screen";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { isAllowedEmail } from "@/lib/allowed";
import { loadTrip } from "@/lib/trip";
import type { Cost, DayPlan, TripMeta } from "@/data/itinerary";

export const Route = createFileRoute("/")({ component: Home });

type TripPayload = { TRIP: TripMeta; days: DayPlan[]; PAID: Cost[] };

function Home() {
  const { user, isPending } = useCurrentUserState();
  const [trip, setTrip] = useState<TripPayload | null>(null);
  const [blocked, setBlocked] = useState(false);

  const allowed = isAllowedEmail(user?.primaryEmail);

  useEffect(() => {
    if (!user || !allowed) {
      setTrip(null);
      return;
    }
    let live = true;
    loadTrip()
      .then((data) => {
        if (live) setTrip(data);
      })
      .catch(() => {
        if (live) setBlocked(true);
      });
    return () => {
      live = false;
    };
  }, [user, allowed]);

  if (isPending) return <LockPending />;
  if (!user) return <LockScreen />;
  if (!allowed || blocked) return <DeniedScreen />;
  if (!trip) return <LockPending />;

  return <ItineraryApp trip={trip.TRIP} days={trip.days} paid={trip.PAID} />;
}
