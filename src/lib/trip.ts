import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { isAllowedEmail } from "@/lib/allowed";

export const loadTrip = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<{ email: string | null }>`
      select email from "user" where id = ${context.userId} limit 1
    `;
    let email = rows[0]?.email ?? null;
    if (!email) {
      const { getSessionUser } = await import("@/lib/auth/verify.server");
      email = (await getSessionUser())?.email ?? null;
    }
    if (!isAllowedEmail(email)) {
      throw new Error("Forbidden");
    }
    const { TRIP, days, PAID } = await import("@/data/itinerary");
    return { TRIP, days, PAID };
  });
