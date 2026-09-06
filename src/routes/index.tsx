import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ItineraryApp } from "@/components/itinerary-app";
import { LockScreen } from "@/components/lock-screen";
import { isUnlocked } from "@/lib/passkey";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(isUnlocked());
    setReady(true);
  }, []);

  if (!ready || !unlocked) {
    return (
      <LockScreen
        onUnlock={() => setUnlocked(true)}
      />
    );
  }

  return <ItineraryApp onLock={() => setUnlocked(false)} />;
}
