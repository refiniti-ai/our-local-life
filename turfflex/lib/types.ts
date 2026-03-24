import type { QuoteInput, QuoteBreakdown } from "./pricing";

export type { QuoteInput, QuoteBreakdown, PropertyType, AddOnKey } from "./pricing";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  quoteInput: QuoteInput;
  quoteBreakdown: QuoteBreakdown;
  agreementsAccepted: boolean;
  createdAt: string;
  createAccount?: boolean;
}

export interface Booking {
  id: string;
  leadId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  squareFootage: number;
  serviceType: string;
  scheduledDate: string;
  scheduledTime: string;
  finalTotal: number;
  depositAmount: number;
  depositPaid: boolean;
  confirmationSent: boolean;
  reminderSent: boolean;
  crewNotified: boolean;
  status: "scheduled" | "completed" | "cancelled" | "no_show";
  /** Optional assigned service agent ID */
  agentId?: string;
  createdAt: string;
  gateAccessInstructions?: string;
  powerAccessInstructions?: string;
  waterAccessInstructions?: string;
  createAccount?: boolean;
}

export interface TimeSlot {
  date: string;
  time: string;
  label: string;
}

export interface ServiceAgent {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  active: boolean;
}
