import { NextRequest, NextResponse } from "next/server";
import { getBookings, addBooking, getBooking, updateBooking } from "@/lib/store";
import { sendCustomerConfirmation, sendCrewNotification } from "@/lib/notify";
import { getUserFromSessionToken, getSessionTokenFromRequest } from "@/lib/auth";

function requireAdmin(request: NextRequest) {
  const token = getSessionTokenFromRequest(request);
  const user = getUserFromSessionToken(token ?? null);
  return !!user;
}

function normalizePhone(phone: string): string {
  return (phone || "").replace(/\D/g, "").slice(-10);
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const email = url.searchParams.get("email")?.trim().toLowerCase() ?? "";
  const phone = url.searchParams.get("phone")?.trim() ?? "";

  const all = getBookings();

  // If no filters, return all bookings (admin / internal use)
  if (!email && !phone) {
    return NextResponse.json({ bookings: all });
  }

  const normPhone = phone ? normalizePhone(phone) : "";
  const filtered = all.filter((b) => {
    const matchesEmail = email
      ? (b.email || "").trim().toLowerCase() === email
      : true;
    const matchesPhone = normPhone
      ? normalizePhone(b.phone) === normPhone
      : true;
    return matchesEmail && matchesPhone;
  });

  return NextResponse.json({ bookings: filtered });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    leadId,
    customerName,
    phone,
    email,
    address,
    squareFootage,
    serviceType,
    scheduledDate,
    scheduledTime,
    finalTotal,
    depositAmount,
    depositPaid,
    gateAccessInstructions,
    powerAccessInstructions,
    waterAccessInstructions,
    createAccount,
  } = body;
  if (
    !customerName ||
    !phone ||
    !email ||
    !address ||
    squareFootage == null ||
    !scheduledDate ||
    !scheduledTime ||
    finalTotal == null ||
    depositAmount == null
  ) {
    return NextResponse.json({ error: "Missing required booking fields" }, { status: 400 });
  }
  const booking = addBooking({
    leadId: leadId || "",
    customerName,
    phone,
    email,
    address,
    squareFootage: Number(squareFootage),
    serviceType: serviceType || "Turf Cleaning",
    scheduledDate,
    scheduledTime,
    finalTotal: Number(finalTotal),
    depositAmount: Number(depositAmount),
    depositPaid: !!depositPaid,
    confirmationSent: false,
    reminderSent: false,
    crewNotified: false,
    status: "scheduled",
    gateAccessInstructions: gateAccessInstructions || undefined,
    powerAccessInstructions: powerAccessInstructions || undefined,
    waterAccessInstructions: waterAccessInstructions || undefined,
    createAccount: !!createAccount,
  });
  const payload = {
    customerName,
    phone,
    email,
    address,
    scheduledDate,
    scheduledTime,
    serviceType: serviceType || "Turf Cleaning",
    squareFootage: Number(squareFootage),
    finalTotal: Number(finalTotal),
    gateAccessInstructions: gateAccessInstructions || undefined,
    powerAccessInstructions: powerAccessInstructions || undefined,
    waterAccessInstructions: waterAccessInstructions || undefined,
  };
  sendCustomerConfirmation(payload).catch((e) => console.error("Confirm send failed:", e));
  sendCrewNotification(payload).catch((e) => console.error("Crew notify failed:", e));
  return NextResponse.json(booking);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const id = body?.id;
  if (typeof id !== "string") {
    return NextResponse.json({ error: "Booking id is required" }, { status: 400 });
  }
  const existing = getBooking(id);
  if (!existing) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  const clientReschedule = body?.clientReschedule;
  if (
    clientReschedule &&
    typeof clientReschedule.email === "string" &&
    typeof clientReschedule.phone === "string" &&
    typeof clientReschedule.scheduledDate === "string" &&
    typeof clientReschedule.scheduledTime === "string"
  ) {
    const emailMatch =
      (existing.email || "").trim().toLowerCase() ===
      clientReschedule.email.trim().toLowerCase();
    const phoneMatch =
      normalizePhone(existing.phone) === normalizePhone(clientReschedule.phone);
    if (!emailMatch || !phoneMatch) {
      return NextResponse.json({ error: "Invalid credentials for this booking" }, { status: 403 });
    }
    if (existing.status !== "scheduled") {
      return NextResponse.json({ error: "Only scheduled appointments can be rescheduled" }, { status: 400 });
    }
    const booking = updateBooking(id, {
      scheduledDate: clientReschedule.scheduledDate,
      scheduledTime: clientReschedule.scheduledTime,
    });
    return NextResponse.json(booking);
  }

  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updates: Record<string, unknown> = {};
  if (typeof body?.agentId === "string" || body?.agentId === null) {
    updates.agentId = body.agentId || undefined;
  }
  if (typeof body?.status === "string") {
    updates.status = body.status;
  }

  const booking = updateBooking(id, updates);
  return NextResponse.json(booking);
}
