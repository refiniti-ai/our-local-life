"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { addMonths, endOfMonth, endOfWeek, format, startOfMonth, startOfWeek, addDays, isSameMonth } from "date-fns";
import type { Lead, Booking, ServiceAgent } from "@/lib/types";

const AGENT_COLORS = ["#0f766e", "#b91c1c", "#1d4ed8", "#7c2d12", "#7e22ce", "#15803d"];

function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const t = sessionStorage.getItem("turfflex_admin_token");
    return t ? { Authorization: `Bearer ${t}` } : {};
  } catch {
    return {};
  }
}

export default function AdminPage() {
  const [authChecking, setAuthChecking] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [agents, setAgents] = useState<ServiceAgent[]>([]);
  const [loading, setLoading] = useState(true);

  const [newAgentName, setNewAgentName] = useState("");
  const [newAgentEmail, setNewAgentEmail] = useState("");
  const [newAgentPhone, setNewAgentPhone] = useState("");
  const [savingAgent, setSavingAgent] = useState(false);

  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [selectedAgentId, setSelectedAgentId] = useState<string | "all">("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const headers = getAuthHeaders();
      try {
        const me = await fetch("/api/auth/me", { credentials: "include", headers });
        if (!me.ok) {
          window.location.href = "/login";
          return;
        }
        if (cancelled) return;

        const [leadsRes, bookingsRes, agentsRes] = await Promise.all([
          fetch("/api/leads", { credentials: "include", headers }).then((r) => r.json()),
          fetch("/api/bookings", { credentials: "include", headers }).then((r) => r.json()),
          fetch("/api/agents", { credentials: "include", headers }).then((r) => (r.ok ? r.json() : { agents: [] })),
        ]);

        if (cancelled) return;

        setLeads(leadsRes.leads || leadsRes || []);
        setBookings(bookingsRes.bookings || bookingsRes || []);
        setAgents(agentsRes.agents || []);
        setLoading(false);
        setAuthChecking(false);
      } catch {
        if (!cancelled) {
          window.location.href = "/login";
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const bookingsByDate = useMemo(() => {
    const map: Record<string, Booking[]> = {};
    bookings.forEach((b) => {
      const key = b.scheduledDate;
      if (!map[key]) map[key] = [];
      map[key].push(b);
    });
    return map;
  }, [bookings]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(calendarMonth);
    const monthEnd = endOfMonth(calendarMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const days: Date[] = [];
    let d = calStart;
    while (d <= calEnd) {
      days.push(d);
      d = addDays(d, 1);
    }
    return days;
  }, [calendarMonth]);

  const dayBookingsForView = (dateStr: string): Booking[] => {
    const all = bookingsByDate[dateStr] || [];
    if (selectedAgentId === "all") return all;
    return all.filter((b) => b.agentId === selectedAgentId);
  };

  const handleAddAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName.trim()) return;
    setSavingAgent(true);
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          name: newAgentName.trim(),
          email: newAgentEmail.trim() || undefined,
          phone: newAgentPhone.trim() || undefined,
        }),
      });
      if (res.ok) {
        const created: ServiceAgent = await res.json();
        setAgents((prev) => [...prev, created].sort((a, b) => a.name.localeCompare(b.name)));
        setNewAgentName("");
        setNewAgentEmail("");
        setNewAgentPhone("");
      }
    } finally {
      setSavingAgent(false);
    }
  };

  const handleAssignAgent = async (bookingId: string, agentId: string | "") => {
    const targetId = agentId || null;
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, agentId: targetId || undefined } : b)),
    );
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify({ id: bookingId, agentId: targetId }),
    });
  };

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem("turfflex_admin_token");
    } catch (_) {}
    await fetch("/api/auth/logout", { method: "POST", credentials: "include", headers: getAuthHeaders() });
    window.location.href = "/login";
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <p className="font-body text-charcoal-light">Checking access…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      <header className="border-b border-charcoal/10 bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/images/TURFFLEX_ONE_COLOR_LOGO.png"
              alt="Turfflex"
              width={140}
              height={36}
              className="h-8 w-auto"
            />
          </Link>
          <div className="flex items-center gap-4">
            <span className="font-display text-charcoal/70 tracking-wider">
              ADMIN
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="font-body text-xs text-charcoal border border-charcoal/30 rounded px-3 py-1 hover:bg-charcoal/5"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-12">
        <h1 className="font-display text-3xl text-charcoal tracking-tight">
          DASHBOARD
        </h1>

        {loading ? (
          <p className="font-body text-charcoal-light">Loading…</p>
        ) : (
          <>
            <section>
              <h2 className="font-display text-xl text-charcoal mb-4 tracking-wide border-b border-charcoal/10 pb-2">
                LEADS ({leads.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full font-body text-sm">
                  <thead>
                    <tr className="text-left text-charcoal-light border-b border-charcoal/20">
                      <th className="py-2 pr-4">Name</th>
                      <th className="py-2 pr-4">Phone</th>
                      <th className="py-2 pr-4">Email</th>
                      <th className="py-2 pr-4">Address</th>
                      <th className="py-2 pr-4">Est. Total</th>
                      <th className="py-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((l) => (
                      <tr key={l.id} className="border-b border-charcoal/10">
                        <td className="py-3 pr-4">{l.name}</td>
                        <td className="py-3 pr-4">{l.phone}</td>
                        <td className="py-3 pr-4">{l.email}</td>
                        <td className="py-3 pr-4">{l.address}</td>
                        <td className="py-3 pr-4">
                          ${l.quoteBreakdown?.finalTotal?.toFixed(2) ?? "—"}
                        </td>
                        <td className="py-3">
                          {new Date(l.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl text-charcoal mb-4 tracking-wide border-b border-charcoal/10 pb-2">
                BOOKINGS ({bookings.length})
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full font-body text-sm">
                  <thead>
                    <tr className="text-left text-charcoal-light border-b border-charcoal/20">
                      <th className="py-2 pr-4">Customer</th>
                      <th className="py-2 pr-4">Phone</th>
                      <th className="py-2 pr-4">Address</th>
                      <th className="py-2 pr-4">Date / Time</th>
                      <th className="py-2 pr-4">Total</th>
                      <th className="py-2 pr-4">Deposit</th>
                      <th className="py-2 pr-4">Access</th>
                      <th className="py-2 pr-4">Agent</th>
                      <th className="py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => {
                      const accessParts: string[] = [];
                      if (b.gateAccessInstructions?.trim())
                        accessParts.push("Gate: " + b.gateAccessInstructions.trim());
                      if (b.powerAccessInstructions?.trim())
                        accessParts.push("Power: " + b.powerAccessInstructions.trim());
                      if (b.waterAccessInstructions?.trim())
                        accessParts.push("Water: " + b.waterAccessInstructions.trim());
                      const accessStr = accessParts.length
                        ? accessParts.join(" · ")
                        : "—";
                      const agent =
                        agents.find((a) => a.id === b.agentId) || null;
                      return (
                        <tr key={b.id} className="border-b border-charcoal/10">
                          <td className="py-3 pr-4">{b.customerName}</td>
                          <td className="py-3 pr-4">{b.phone}</td>
                          <td className="py-3 pr-4">{b.address}</td>
                          <td className="py-3 pr-4">
                            {b.scheduledDate} {b.scheduledTime}
                          </td>
                          <td className="py-3 pr-4">
                            ${b.finalTotal?.toFixed(2)}
                          </td>
                          <td className="py-3 pr-4">
                            {b.depositPaid ? "Paid" : "—"}
                          </td>
                          <td
                            className="py-3 pr-4 max-w-[180px] truncate"
                            title={accessStr}
                          >
                            {accessStr}
                          </td>
                          <td className="py-3 pr-4">
                            <select
                              value={b.agentId || ""}
                              onChange={(e) =>
                                handleAssignAgent(b.id, e.target.value)
                              }
                              className="border border-charcoal/30 rounded px-2 py-1 text-xs bg-white"
                            >
                              <option value="">Unassigned</option>
                              {agents.map((a) => (
                                <option key={a.id} value={a.id}>
                                  {a.name}
                                </option>
                              ))}
                            </select>
                            {agent && (
                              <div className="mt-1 text-[11px] text-charcoal-light">
                                {agent.name}
                              </div>
                            )}
                          </td>
                          <td className="py-3">{b.status}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl text-charcoal mb-4 tracking-wide border-b border-charcoal/10 pb-2">
                SERVICE AGENTS
              </h2>
              <div className="grid gap-6 md:grid-cols-[2fr,3fr]">
                <form onSubmit={handleAddAgent} className="bg-white border-2 border-charcoal/10 rounded-lg p-4 shadow-badge space-y-3">
                  <h3 className="font-display text-lg text-charcoal mb-1">
                    Add new agent
                  </h3>
                  <div>
                    <label className="block font-body text-sm text-charcoal mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={newAgentName}
                      onChange={(e) => setNewAgentName(e.target.value)}
                      className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body focus:border-aqua outline-none"
                      placeholder="Crew member name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-charcoal mb-1">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      value={newAgentEmail}
                      onChange={(e) => setNewAgentEmail(e.target.value)}
                      className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body focus:border-aqua outline-none"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-sm text-charcoal mb-1">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      value={newAgentPhone}
                      onChange={(e) => setNewAgentPhone(e.target.value)}
                      className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body focus:border-aqua outline-none"
                      placeholder="(602) 555-1234"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={savingAgent}
                    className="mt-2 inline-flex items-center justify-center bg-aqua text-cream font-display text-sm tracking-wider px-4 py-2 rounded shadow-badge hover:bg-aqua-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    {savingAgent ? "Saving…" : "Add agent"}
                  </button>
                </form>

                <div className="bg-white border-2 border-charcoal/10 rounded-lg p-4 shadow-badge">
                  <h3 className="font-display text-lg text-charcoal mb-3">
                    Current agents ({agents.length})
                  </h3>
                  {agents.length === 0 ? (
                    <p className="font-body text-sm text-charcoal-light">
                      No agents yet. Add your first service agent to start assigning bookings.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {agents.map((a, index) => (
                        <li
                          key={a.id}
                          className="flex items-center justify-between border border-charcoal/10 rounded px-3 py-2"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="inline-block w-2 h-6 rounded-full"
                              style={{
                                backgroundColor:
                                  AGENT_COLORS[index % AGENT_COLORS.length],
                              }}
                            />
                            <div>
                              <div className="font-body text-sm text-charcoal">
                                {a.name}
                              </div>
                              <div className="font-body text-xs text-charcoal-light">
                                {a.email || a.phone || "Active"}
                              </div>
                            </div>
                          </div>
                          <span className="font-body text-[11px] text-emerald-700">
                            {a.active ? "Active" : "Inactive"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-xl text-charcoal mb-4 tracking-wide border-b border-charcoal/10 pb-2">
                CALENDAR BY AGENT
              </h2>
              <div className="bg-white border-2 border-charcoal/10 rounded-lg shadow-badge p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-sm text-charcoal">
                      Showing schedule for
                    </span>
                    <select
                      value={selectedAgentId}
                      onChange={(e) =>
                        setSelectedAgentId(
                          e.target.value === "all" ? "all" : e.target.value,
                        )
                      }
                      className="border-2 border-charcoal/20 rounded px-2 py-1 text-sm font-body bg-white"
                    >
                      <option value="all">All agents</option>
                      {agents.map((a, index) => (
                        <option key={a.id} value={a.id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setCalendarMonth((m) => addMonths(m, -1))
                      }
                      className="px-2 py-1 border border-charcoal/20 rounded text-sm"
                    >
                      ←
                    </button>
                    <span className="font-display text-sm text-charcoal">
                      {format(calendarMonth, "MMMM yyyy")}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setCalendarMonth((m) => addMonths(m, 1))
                      }
                      className="px-2 py-1 border border-charcoal/20 rounded text-sm"
                    >
                      →
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (d) => (
                      <div
                        key={d}
                        className="text-center font-body text-xs font-medium text-charcoal-light py-1"
                      >
                        {d}
                      </div>
                    ),
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day) => {
                    const dateStr = format(day, "yyyy-MM-dd");
                    const dayBookings = dayBookingsForView(dateStr);
                    const hasBookings = dayBookings.length > 0;
                    const isCurrentMonth = isSameMonth(day, calendarMonth);
                    const isSelected = selectedDate === dateStr;
                    return (
                      <button
                        key={dateStr}
                        type="button"
                        onClick={() =>
                          setSelectedDate(
                            isSelected ? null : dateStr,
                          )
                        }
                        className={[
                          "h-16 flex flex-col items-center justify-between rounded border text-xs font-body px-1 py-1 transition-colors",
                          isCurrentMonth
                            ? "border-charcoal/10"
                            : "border-charcoal/5 text-charcoal/40",
                          hasBookings
                            ? "bg-aqua/5 hover:bg-aqua/15"
                            : "bg-white hover:bg-charcoal/5",
                          isSelected &&
                            "ring-2 ring-aqua ring-offset-1 ring-offset-white",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <span className="text-[11px]">
                          {format(day, "d")}
                        </span>
                        {hasBookings && (
                          <span className="text-[10px] text-charcoal-light">
                            {dayBookings.length} job
                            {dayBookings.length > 1 ? "s" : ""}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedDate && (
                  <div className="mt-4 border-t border-charcoal/10 pt-3">
                    <h3 className="font-display text-sm text-charcoal mb-2">
                      {format(new Date(selectedDate), "EEEE, MMM d")}
                    </h3>
                    <div className="space-y-2">
                      {dayBookingsForView(selectedDate).length === 0 ? (
                        <p className="font-body text-sm text-charcoal-light">
                          No bookings for this day.
                        </p>
                      ) : (
                        dayBookingsForView(selectedDate).map((b) => {
                          const agentIndex = agents.findIndex(
                            (a) => a.id === b.agentId,
                          );
                          const color =
                            agentIndex >= 0
                              ? AGENT_COLORS[
                                  agentIndex % AGENT_COLORS.length
                                ]
                              : "#4b5563";
                          const agent =
                            agents.find((a) => a.id === b.agentId) || null;
                          return (
                            <div
                              key={b.id}
                              className="flex items-start justify-between border border-charcoal/10 rounded px-3 py-2"
                            >
                              <div>
                                <div className="font-body text-sm text-charcoal">
                                  {b.scheduledTime} – {b.customerName}
                                </div>
                                <div className="font-body text-xs text-charcoal-light">
                                  {b.address}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {agent && (
                                  <>
                                    <span
                                      className="inline-block w-2 h-6 rounded-full"
                                      style={{ backgroundColor: color }}
                                    />
                                    <span className="font-body text-[11px] text-charcoal">
                                      {agent.name}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

