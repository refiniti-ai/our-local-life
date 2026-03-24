"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isBefore,
  isToday,
  parseISO,
} from "date-fns";

type SlotOption = { date: string; time: string; label: string; available: boolean };

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIME_LABELS: Record<string, string> = {
  "08:00": "8:00 AM",
  "10:00": "10:00 AM",
  "12:00": "12:00 PM",
  "14:00": "2:00 PM",
};

export default function BookingPage() {
  const router = useRouter();
  const [slots, setSlots] = useState<SlotOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [confirming, setConfirming] = useState(false);

  // Redirect to quote if no booking data (e.g. direct visit or session cleared)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem("turfflex_booking_data");
    if (!raw) {
      router.replace("/quote");
      return;
    }
  }, [router]);

  useEffect(() => {
    const from = format(new Date(), "yyyy-MM-dd");
    fetch(`/api/availability?from=${from}&days=90`)
      .then((r) => r.json())
      .then((d) => {
        setSlots(d.slots || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const availableByDate = useMemo(() => {
    const map: Record<string, SlotOption[]> = {};
    slots.filter((s) => s.available).forEach((s) => {
      if (!map[s.date]) map[s.date] = [];
      map[s.date].push(s);
    });
    return map;
  }, [slots]);

  const datesWithAvailability = useMemo(() => Object.keys(availableByDate), [availableByDate]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const days: Date[] = [];
    let d = calStart;
    while (d <= calEnd) {
      days.push(d);
      d = addDays(d, 1);
    }
    return days;
  }, [currentMonth]);

  const timeSlotsForSelected = selectedDate ? availableByDate[selectedDate] || [] : [];

  const onConfirm = () => {
    if (!selectedDate || !selectedTime) return;
    const raw = typeof window !== "undefined" ? sessionStorage.getItem("turfflex_booking_data") : null;
    const data = raw ? JSON.parse(raw) : null;
    if (!data) {
      router.replace("/quote");
      return;
    }
    setConfirming(true);
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        leadId: data.leadId,
        customerName: data.customerName,
        phone: data.phone,
        email: data.email,
        address: data.address,
        squareFootage: data.squareFootage,
        serviceType: data.serviceType || "Turf Cleaning",
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        finalTotal: data.finalTotal,
        depositAmount: data.depositAmount,
        depositPaid: true,
        gateAccessInstructions: data.gateAccessInstructions,
        powerAccessInstructions: data.powerAccessInstructions,
        waterAccessInstructions: data.waterAccessInstructions,
      }),
    })
      .then((r) => r.json())
      .then((res) => {
        if (!res.error) setDone(true);
      })
      .finally(() => setConfirming(false));
  };

  const isDayAvailable = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return datesWithAvailability.includes(dateStr);
  };

  const isDayDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isBefore(date, today) || !isDayAvailable(date);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-cream">
        <header className="border-b border-charcoal/10 px-4 py-4">
          <Link href="/">
            <Image src="/images/TURFFLEX_ONE_COLOR_LOGO.png" alt="Turfflex" width={160} height={42} className="h-9 w-auto" />
          </Link>
        </header>
        <main className="max-w-xl mx-auto px-4 py-12 text-center">
          <h1 className="font-display text-3xl text-charcoal mb-6">YOU ARE BOOKED</h1>
          <p className="font-script text-xl text-service-red mb-6">Flex Your Turf</p>
          <p className="font-body text-charcoal-light">
            Confirmation will be sent to your email and phone. Reminder 24 hours before.
          </p>
          <p className="font-body text-sm text-charcoal-light mt-4">
            <Link href="/my-bookings" className="text-aqua hover:underline">View or reschedule</Link> your appointments anytime.
          </p>
          <Link href="/" className="inline-block mt-8 font-display text-aqua">
            Back to home
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-charcoal/10 px-4 py-4 flex justify-between items-center gap-4">
        <Link href="/quote" className="flex-shrink-0">
          <Image src="/images/TURFFLEX_ONE_COLOR_LOGO.png" alt="Turfflex" width={160} height={42} className="h-9 w-auto" />
        </Link>
        <nav className="flex items-center gap-3 font-body text-sm font-medium text-charcoal">
          <Link href="/quote" className="hover:text-aqua">Quote</Link>
          <Link href="/login" className="bg-charcoal/10 border-2 border-charcoal/20 px-3 py-2 rounded shadow-badge hover:bg-charcoal/20 font-medium">
            Login
          </Link>
        </nav>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="font-display text-3xl text-charcoal text-center mb-2">PICK YOUR DATE</h1>
        <p className="font-script text-xl text-service-red text-center mb-8">Flex Your Turf</p>

        {loading ? (
          <p className="font-body text-center text-charcoal-light">Loading calendar...</p>
        ) : slots.length === 0 ? (
          <div className="bg-white border-2 border-charcoal/10 rounded-lg shadow-badge p-8 text-center">
            <p className="font-body text-charcoal-light mb-4">No available slots in the next 90 days. Please contact us to schedule.</p>
            <Link href="/" className="font-display text-aqua hover:underline">Back to home</Link>
          </div>
        ) : (
          <>
            <section className="bg-white border-2 border-charcoal/10 rounded-lg shadow-badge overflow-hidden mb-8">
              <div className="flex items-center justify-between px-4 py-3 border-b border-charcoal/10 bg-cream/50">
                <button
                  type="button"
                  onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
                  className="p-2 rounded hover:bg-charcoal/10 font-body text-charcoal"
                  aria-label="Previous month"
                >
                  ←
                </button>
                <h2 className="font-display text-lg tracking-wide text-charcoal">
                  {format(currentMonth, "MMMM yyyy")}
                </h2>
                <button
                  type="button"
                  onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
                  className="p-2 rounded hover:bg-charcoal/10 font-body text-charcoal"
                  aria-label="Next month"
                >
                  →
                </button>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {WEEKDAY_LABELS.map((day) => (
                    <div key={day} className="text-center font-body text-xs font-medium text-charcoal-light py-1">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day) => {
                    const dateStr = format(day, "yyyy-MM-dd");
                    const disabled = isDayDisabled(day);
                    const selected = selectedDate === dateStr;
                    const isCurrentMonth = isSameMonth(day, currentMonth);
                    return (
                      <button
                        key={dateStr}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          if (disabled) return;
                          setSelectedDate(dateStr);
                          setSelectedTime(null);
                        }}
                        className={[
                          "aspect-square flex items-center justify-center rounded text-sm font-body transition-colors",
                          !isCurrentMonth && "text-charcoal/40",
                          disabled && "cursor-not-allowed text-charcoal/30 bg-charcoal/5",
                          !disabled && "hover:bg-aqua/20",
                          selected && "bg-aqua text-cream font-medium ring-2 ring-aqua ring-offset-1",
                          !selected && !disabled && isToday(day) && "ring-2 ring-charcoal/30",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {format(day, "d")}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {selectedDate && (
              <section className="mb-8">
                <h3 className="font-display text-lg text-charcoal mb-3 tracking-wide">
                  Time on {format(parseISO(selectedDate), "EEEE, MMM d")}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {timeSlotsForSelected.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedTime(slot.time)}
                      className={
                        selectedTime === slot.time
                          ? "border-2 border-aqua bg-aqua text-cream font-body py-3 px-4 rounded shadow-badge"
                          : "border-2 border-charcoal/20 hover:border-aqua/50 font-body py-3 px-4 rounded"
                      }
                    >
                      {TIME_LABELS[slot.time] || slot.time}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {selectedDate && selectedTime && (
              <div className="text-center">
                <p className="font-body text-charcoal-light mb-2">
                  {format(parseISO(selectedDate), "EEEE, MMM d")} at {TIME_LABELS[selectedTime] || selectedTime}
                </p>
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={confirming}
                  className="bg-service-red text-cream font-display text-lg px-8 py-3 rounded shadow-badge hover:bg-service-red-dark disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                  {confirming ? "Booking…" : "CONFIRM BOOKING"}
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
