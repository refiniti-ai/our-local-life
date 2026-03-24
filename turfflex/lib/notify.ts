/**
 * Phase 1: SMS and email notifications.
 * - Immediate confirmation (SMS + email) after booking
 * - 24-hour reminder (cron or on-demand)
 * - Crew notification when job is booked
 *
 * Configure: TWILIO_* for SMS, RESEND_API_KEY or SMTP for email, CREW_PHONE for crew SMS.
 */

export interface BookingNotifyPayload {
  customerName: string;
  phone: string;
  email: string;
  address: string;
  scheduledDate: string;
  scheduledTime: string;
  serviceType: string;
  squareFootage: number;
  finalTotal: number;
  gateAccessInstructions?: string;
  powerAccessInstructions?: string;
  waterAccessInstructions?: string;
}

export async function sendCustomerConfirmation(payload: BookingNotifyPayload): Promise<void> {
  const msg = `Turfflex: You're booked for ${payload.scheduledDate} at ${payload.scheduledTime}. Address: ${payload.address}. Questions? Reply to this number.`;
  await sendSms(payload.phone, msg);
  await sendEmail(payload.email, "Turfflex – Booking confirmed", confirmationEmailBody(payload));
}

export async function sendCrewNotification(payload: BookingNotifyPayload): Promise<void> {
  const crewPhone = process.env.CREW_PHONE || process.env.CREW_PHONES;
  if (!crewPhone) {
    console.log("[Notify] CREW_PHONE not set – crew notification skipped. Payload:", payload);
    return;
  }
  let msg = `Turfflex job: ${payload.customerName}, ${payload.address}, ${payload.scheduledDate} ${payload.scheduledTime}, ${payload.serviceType}, ${payload.squareFootage} sq ft. Phone: ${payload.phone}`;
  const accessParts: string[] = [];
  if (payload.gateAccessInstructions?.trim()) accessParts.push("Gate: " + payload.gateAccessInstructions.trim());
  if (payload.powerAccessInstructions?.trim()) accessParts.push("Power: " + payload.powerAccessInstructions.trim());
  if (payload.waterAccessInstructions?.trim()) accessParts.push("Water: " + payload.waterAccessInstructions.trim());
  if (accessParts.length) msg += " " + accessParts.join(". ");
  await sendSms(crewPhone, msg);
}

async function sendSms(to: string, body: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;
  if (!accountSid || !authToken || !from) {
    console.log("[Notify] Twilio not configured – SMS skipped. To:", to, "Body:", body);
    return;
  }
  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const form = new URLSearchParams({ To: to, From: from, Body: body });
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: "Basic " + Buffer.from(accountSid + ":" + authToken).toString("base64"), "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });
  if (!res.ok) console.error("[Notify] Twilio error:", await res.text());
}

function confirmationEmailBody(p: BookingNotifyPayload): string {
  const accessLines: string[] = [];
  if (p.gateAccessInstructions?.trim()) accessLines.push("Gate: " + p.gateAccessInstructions.trim());
  if (p.powerAccessInstructions?.trim()) accessLines.push("Power: " + p.powerAccessInstructions.trim());
  if (p.waterAccessInstructions?.trim()) accessLines.push("Water: " + p.waterAccessInstructions.trim());
  const accessBlock = accessLines.length ? "\nAccess / instructions we have on file:\n" + accessLines.join("\n") + "\n" : "";
  return `
Hi ${p.customerName},

Your Turfflex appointment is confirmed.

Date: ${p.scheduledDate}
Time: ${p.scheduledTime}
Address: ${p.address}
Service: ${p.serviceType}
Square footage: ${p.squareFootage}
Total: $${p.finalTotal.toFixed(2)}${accessBlock}

Please ensure the yard is clear of pet waste before we arrive. Final pricing is based on actual measured square footage at time of service.

We'll send a reminder 24 hours before your appointment.

– Turfflex
  `.trim();
}

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log("[Notify] Resend not configured – email skipped. To:", to);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "Turfflex <noreply@turfflex.com>",
      to: [to],
      subject,
      html: html.replace(/\n/g, "<br>"),
    }),
  });
  if (!res.ok) console.error("[Notify] Resend error:", await res.text());
}
