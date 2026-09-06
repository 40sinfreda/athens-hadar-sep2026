import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ItineraryApp } from "@/components/itinerary-app";
import { LockPending, LockScreen } from "@/components/lock-screen";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { isUnlocked } from "@/lib/passkey";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { user, isPending } = useCurrentUserState();
  const [ready, setReady] = useState(false);
  const [finger, setFinger] = useState(false);

  useEffect(() => {
    setFinger(isUnlocked());
    setReady(true);
  }, []);

  if (isPending || !ready) return <LockPending />;
  if (user || finger) {
    return (
      <ItineraryApp
        onLock={() => setFinger(false)}
      />
    );
  }
  return (
    <LockScreen
      onUnlock={() => setFinger(true)}
    />
  );
}
