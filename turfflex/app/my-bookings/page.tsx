"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  format,
  parseISO,
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
} from "date-fns";
import type { Booking } from "@/lib/types";

const TIME_LABELS: Record<string, string> = {
  "08:00": "8:00 AM",
  "10:00": "10:00 AM",
  "12:00": "12:00 PM",
  "14:00": "2:00 PM",
};

type SlotOption = { date: string; time: string; label: string; available: boolean };

export default function MyBookingsPage() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [rescheduleId, setRescheduleId] = useState<string | null>(null);
  const [slots, setSlots] = useState<SlotOption[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [rescheduleMonth, setRescheduleMonth] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailTrimmed = email.trim();
    const phoneTrimmed = phone.trim();
    if (!emailTrimmed && !phoneTrimmed) {
      setError("Enter an email or phone number to look up your appointments.");
      return;
    }

    setLoading(true);
    setSubmitted(true);
    try {
      const params = new URLSearchParams();
      if (emailTrimmed) params.set("email", emailTrimmed);
      if (phoneTrimmed) params.set("phone", phoneTrimmed);
      const res = await fetch(`/api/bookings?${params.toString()}`);
      const data = await res.json();
      if (!res.ok) {
        setBookings([]);
        setError(data.error || "Could not load bookings");
        return;
      }
      setBookings(data.bookings || []);
    } catch {
      setError("Something went wrong. Please try again.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const upcoming = useMemo(
    () =>
      bookings.filter((b) => {
        if (b.status !== "scheduled") return false;
        const d = new Date(b.scheduledDate + "T" + b.scheduledTime);
        return d >= new Date();
      }),
    [bookings]
  );
  const past = useMemo(
    () =>
      bookings
        .filter((b) => b.status !== "scheduled" || new Date(b.scheduledDate + "T" + b.scheduledTime) < new Date())
        .sort(
          (a, b) =>
            new Date(b.scheduledDate + "T" + b.scheduledTime).getTime() -
            new Date(a.scheduledDate + "T" + a.scheduledTime).getTime()
        ),
    [bookings]
  );

  const openReschedule = (id: string) => {
    setRescheduleId(id);
    setSelectedDate(null);
    setSelectedTime(null);
    setRescheduleMonth(new Date());
    setSlotsLoading(true);
    const from = format(new Date(), "yyyy-MM-dd");
    fetch(`/api/availability?from=${from}&days=90`)
      .then((r) => r.json())
      .then((d) => {
        setSlots(d.slots || []);
      })
      .finally(() => setSlotsLoading(false));
  };

  const availableByDate = useMemo(() => {
    const map: Record<string, SlotOption[]> = {};
    slots.filter((s) => s.available).forEach((s) => {
      if (!map[s.date]) map[s.date] = [];
      map[s.date].push(s);
    });
    return map;
  }, [slots]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(rescheduleMonth);
    const monthEnd = endOfMonth(rescheduleMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const days: Date[] = [];
    let d = calStart;
    while (d <= calEnd) {
      days.push(d);
      d = addDays(d, 1);
    }
    return days;
  }, [rescheduleMonth]);

  const datesWithAvailability = useMemo(() => Object.keys(availableByDate), [availableByDate]);
  const timeSlotsForSelected = selectedDate ? availableByDate[selectedDate] || [] : [];

  const isDayAvailable = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return datesWithAvailability.includes(dateStr);
  };
  const isDayDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isBefore(date, today) || !isDayAvailable(date);
  };

  const confirmReschedule = async () => {
    if (!rescheduleId || !selectedDate || !selectedTime || (!email.trim() && !phone.trim())) return;
    setSaving(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: rescheduleId,
          clientReschedule: {
            email: email.trim(),
            phone: phone.trim(),
            scheduledDate: selectedDate,
            scheduledTime: selectedTime,
          },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === rescheduleId
              ? { ...b, scheduledDate: selectedDate, scheduledTime: selectedTime }
              : b
          )
        );
        setRescheduleId(null);
      } else {
        setError(data.error || "Reschedule failed");
      }
    } finally {
      setSaving(false);
    }
  };

  const bookingToReschedule = rescheduleId ? bookings.find((b) => b.id === rescheduleId) : null;

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-charcoal/10 bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-4 flex justify-between items-center gap-4">
          <Link href="/">
            <Image
              src="/images/TURFFLEX_ONE_COLOR_LOGO.png"
              alt="Turfflex"
              width={160}
              height={42}
              className="h-9 w-auto"
            />
          </Link>
          <nav className="flex items-center gap-3 font-body text-sm font-medium text-charcoal">
            <Link href="/quote" className="hover:text-aqua">Get a quote</Link>
            <Link href="/login" className="bg-charcoal/10 border-2 border-charcoal/20 px-3 py-2 rounded shadow-badge hover:bg-charcoal/20 font-medium">
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <h1 className="font-display text-3xl text-charcoal text-center mb-2">My Appointments</h1>
        <p className="font-script text-xl text-service-red text-center mb-8">Flex Your Turf</p>

        {!submitted ? (
          <div className="bg-white border-2 border-charcoal/10 rounded-lg shadow-badge p-6">
            <p className="font-body text-charcoal-light mb-4">
              Enter the email <span className="font-medium">or</span> phone number you used when booking to view and manage your appointments.
            </p>
            <form onSubmit={handleLookup} className="space-y-4">
              <div>
                <label className="block font-body text-sm font-medium text-charcoal mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body focus:border-aqua outline-none"
                />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-charcoal mb-1">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body focus:border-aqua outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-aqua text-cream font-display text-lg tracking-wider px-4 py-3 rounded shadow-badge hover:bg-aqua-dark disabled:opacity-60 transition-colors"
              >
                {loading ? "Loading…" : "View my appointments"}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="font-body text-sm text-charcoal/70 hover:text-charcoal"
              >
                ← Use different email or phone
              </button>
            </div>

            {error && (
              <p className="font-body text-service-red mb-4">{error}</p>
            )}

            {bookings.length === 0 && !loading && (
              <div className="bg-white border-2 border-charcoal/10 rounded-lg shadow-badge p-8 text-center">
                <p className="font-body text-charcoal-light">No appointments found for this email and phone.</p>
              </div>
            )}

            {upcoming.length > 0 && (
              <section className="mb-10">
                <h2 className="font-display text-xl text-charcoal mb-4 tracking-wide border-b border-charcoal/10 pb-2">
                  Upcoming appointments
                </h2>
                <div className="space-y-4">
                  {upcoming.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white border-2 border-charcoal/10 rounded-lg shadow-badge p-4"
                    >
                      <p className="font-display text-lg text-charcoal">
                        {format(parseISO(b.scheduledDate), "EEEE, MMM d")} at {TIME_LABELS[b.scheduledTime] || b.scheduledTime}
                      </p>
                      <p className="font-body text-charcoal-light text-sm mt-1">{b.address}</p>
                      <p className="font-body text-charcoal-light text-sm">
                        Turf Cleaning · {b.squareFootage} sq ft · Total ${b.finalTotal.toFixed(2)} (deposit ${b.depositAmount.toFixed(2)})
                      </p>
                      <button
                        type="button"
                        onClick={() => openReschedule(b.id)}
                        className="mt-3 font-body text-sm text-aqua hover:underline"
                      >
                        Reschedule
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {past.length > 0 && (
              <section>
                <h2 className="font-display text-xl text-charcoal mb-4 tracking-wide border-b border-charcoal/10 pb-2">
                  Past appointments & invoices
                </h2>
                <div className="space-y-4">
                  {past.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white border-2 border-charcoal/10 rounded-lg shadow-badge p-4 opacity-90"
                    >
                      <p className="font-display text-lg text-charcoal">
                        {format(parseISO(b.scheduledDate), "MMM d, yyyy")} at {TIME_LABELS[b.scheduledTime] || b.scheduledTime}
                      </p>
                      <p className="font-body text-charcoal-light text-sm mt-1">{b.address}</p>
                      <p className="font-body text-sm text-charcoal mt-2">
                        Status: <span className="capitalize">{b.status.replace("_", " ")}</span>
                      </p>
                      <p className="font-body text-sm text-charcoal mt-1">
                        Total: <span className="font-medium">${b.finalTotal.toFixed(2)}</span>
                        {b.depositPaid && (
                          <span className="text-charcoal-light ml-2">(Deposit ${b.depositAmount.toFixed(2)} paid)</span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {/* Reschedule modal */}
        {rescheduleId && bookingToReschedule && (
          <div className="fixed inset-0 bg-charcoal/50 flex items-center justify-center p-4 z-50">
            <div className="bg-cream rounded-lg shadow-badge max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
              <h3 className="font-display text-xl text-charcoal mb-4">Pick a new date and time</h3>
              {slotsLoading ? (
                <p className="font-body text-charcoal-light">Loading availability…</p>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <button
                      type="button"
                      onClick={() => setRescheduleMonth((m) => subMonths(m, 1))}
                      className="p-2 rounded hover:bg-charcoal/10 font-body text-charcoal"
                    >
                      ←
                    </button>
                    <span className="font-display text-charcoal">{format(rescheduleMonth, "MMMM yyyy")}</span>
                    <button
                      type="button"
                      onClick={() => setRescheduleMonth((m) => addMonths(m, 1))}
                      className="p-2 rounded hover:bg-charcoal/10 font-body text-charcoal"
                    >
                      →
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-center font-body text-xs text-charcoal-light py-1">
                        {day}
                      </div>
                    ))}
                    {calendarDays.map((day) => {
                      const dateStr = format(day, "yyyy-MM-dd");
                      const disabled = isDayDisabled(day);
                      const selected = selectedDate === dateStr;
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
                            "aspect-square flex items-center justify-center rounded text-sm font-body",
                            disabled && "cursor-not-allowed text-charcoal/30 bg-charcoal/5",
                            !disabled && "hover:bg-aqua/20",
                            selected && "bg-aqua text-cream font-medium",
                            !isSameMonth(day, rescheduleMonth) && "text-charcoal/40",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {format(day, "d")}
                        </button>
                      );
                    })}
                  </div>
                  {selectedDate && (
                    <div className="mb-4">
                      <p className="font-body text-sm text-charcoal mb-2">Time on {format(parseISO(selectedDate), "EEEE, MMM d")}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlotsForSelected.map((slot) => (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setSelectedTime(slot.time)}
                            className={
                              selectedTime === slot.time
                                ? "border-2 border-aqua bg-aqua text-cream font-body py-2 px-3 rounded"
                                : "border-2 border-charcoal/20 hover:border-aqua/50 font-body py-2 px-3 rounded"
                            }
                          >
                            {TIME_LABELS[slot.time] || slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-3 justify-end mt-4">
                    <button
                      type="button"
                      onClick={() => setRescheduleId(null)}
                      className="font-body border-2 border-charcoal/30 px-4 py-2 rounded hover:bg-charcoal/5"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={confirmReschedule}
                      disabled={!selectedDate || !selectedTime || saving}
                      className="bg-aqua text-cream font-display px-4 py-2 rounded shadow-badge hover:bg-aqua-dark disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {saving ? "Saving…" : "Confirm new date"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
