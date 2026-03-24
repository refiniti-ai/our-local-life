import type { Lead, Booking, ServiceAgent } from "./types";

const leads: Lead[] = [];
const bookings: Booking[] = [];
const serviceAgents: ServiceAgent[] = [];

export function addLead(lead: Omit<Lead, "id" | "createdAt">): Lead {
  const id = "lead_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
  const created = { ...lead, id, createdAt: new Date().toISOString() } as Lead;
  leads.push(created);
  return created;
}

export function getLead(id: string): Lead | undefined {
  return leads.find((l) => l.id === id);
}

export function getLeads(): Lead[] {
  return [...leads].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function addBooking(booking: Omit<Booking, "id" | "createdAt">): Booking {
  const id = "book_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
  const created = { ...booking, id, createdAt: new Date().toISOString() } as Booking;
  bookings.push(created);
  return created;
}

export function getBooking(id: string): Booking | undefined {
  return bookings.find((b) => b.id === id);
}

export function getBookings(): Booking[] {
  return [...bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function updateBookingStatus(id: string, status: Booking["status"]): Booking | undefined {
  const b = bookings.find((x) => x.id === id);
  if (b) b.status = status;
  return b;
}

export function getBookingsOnDate(date: string): Booking[] {
  return bookings.filter((b) => b.scheduledDate === date && b.status === "scheduled");
}

function normalizePhone(phone: string): string {
  return (phone || "").replace(/\D/g, "").slice(-10);
}

export function getBookingsByCustomer(email: string, phone: string): Booking[] {
  const norm = normalizePhone(phone);
  const emailLower = (email || "").trim().toLowerCase();
  return bookings.filter(
    (b) =>
      (b.email || "").trim().toLowerCase() === emailLower &&
      normalizePhone(b.phone) === norm
  );
}

export function addServiceAgent(agent: Omit<ServiceAgent, "id">): ServiceAgent {
  const id = "agent_" + Date.now() + "_" + Math.random().toString(36).slice(2, 9);
  const created: ServiceAgent = {
    ...agent,
    id,
  };
  serviceAgents.push(created);
  return created;
}

export function getServiceAgents(): ServiceAgent[] {
  return [...serviceAgents].sort((a, b) => a.name.localeCompare(b.name));
}

export function updateBooking(id: string, updates: Partial<Booking>): Booking | undefined {
  const booking = bookings.find((b) => b.id === id);
  if (!booking) return undefined;
  Object.assign(booking, updates);
  return booking;
}
