import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/availability";

export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get("from");
  const days = req.nextUrl.searchParams.get("days");
  // Parse as local date so timezone doesn't skip today
  const fromDate = from
    ? (() => {
        const [y, m, d] = from.split("-").map(Number);
        return new Date(y, m - 1, d);
      })()
    : new Date();
  const numDays = days ? Math.min(90, Math.max(1, parseInt(days, 10))) : 60;
  const slots = getAvailableSlots(fromDate, numDays);
  return NextResponse.json({ slots });
}
