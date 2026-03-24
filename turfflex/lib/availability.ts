import { addDays, format, isBefore, isAfter, setHours, setMinutes } from "date-fns";
import { getBookingsOnDate } from "./store";

// Admin-configurable: available days (0 = Sun, 1 = Mon, ... 6 = Sat) and time slots
const DEFAULT_AVAILABLE_DAYS = [1, 2, 3, 4, 5, 6]; // Mon–Sat
const DEFAULT_SLOTS = ["08:00", "10:00", "12:00", "14:00"]; // 8am, 10am, 12pm, 2pm

export interface SlotOption {
  date: string;
  time: string;
  label: string;
  available: boolean;
}

export function getAvailableSlots(
  fromDate: Date,
  numDays: number = 60,
  availableDays: number[] = DEFAULT_AVAILABLE_DAYS,
  timeSlots: string[] = DEFAULT_SLOTS
): SlotOption[] {
  const options: SlotOption[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let d = 0; d < numDays; d++) {
    const date = addDays(fromDate, d);
    const dayOfWeek = date.getDay();
    if (!availableDays.includes(dayOfWeek)) continue;
    if (isBefore(date, today)) continue;

    const dateStr = format(date, "yyyy-MM-dd");
    const existing = getBookingsOnDate(dateStr);

    for (const time of timeSlots) {
      const [h, m] = time.split(":").map(Number);
      const slotDateTime = setMinutes(setHours(date, h), m);
      const isPast = isAfter(today, slotDateTime) && dateStr === format(today, "yyyy-MM-dd");
      const taken = existing.some((b) => b.scheduledTime === time);
      options.push({
        date: dateStr,
        time,
        label: `${format(date, "EEE, MMM d")} at ${time}`,
        available: !isPast && !taken,
      });
    }
  }

  return options;
}
