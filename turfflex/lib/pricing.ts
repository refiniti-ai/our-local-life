export const RATES = {
  basePerSqFt: 0.45,
  minimumJob: 150,
  petWasteFee: 50,
  heavyOdor: 0.1,
  stainTreatment: 0.05,
  infillRefresh: 0.15,
} as const;

export type PropertyType = "residential" | "commercial" | "hoa" | "other";

export type AddOnKey = "heavyOdor" | "stainTreatment" | "infillRefresh";

export interface QuoteInput {
  squareFootage: number;
  propertyType: PropertyType;
  numDogs?: number;
  petWasteRemoved: boolean;
  addOns: AddOnKey[];
  gateAccess: boolean;
  powerAccess: boolean;
  waterAccess: boolean;
  /** Instructions or access code when gate access is needed */
  gateAccessInstructions?: string;
  /** Instructions or access when power is needed */
  powerAccessInstructions?: string;
  /** Instructions or access when water is needed */
  waterAccessInstructions?: string;
}

export interface AddOnDetail {
  key: AddOnKey;
  label: string;
  amount: number;
}

export interface QuoteBreakdown {
  baseTotal: number;
  addOnTotal: number;
  wasteFee: number;
  subtotal: number;
  minimumApplied: boolean;
  finalTotal: number;
  addOnDetails: AddOnDetail[];
}

const ADD_ON_LABELS: Record<AddOnKey, string> = {
  heavyOdor: "Heavy Odor Treatment",
  stainTreatment: "Stain Treatment",
  infillRefresh: "Infill Refresh",
};

export function calculateQuote(input: QuoteInput): QuoteBreakdown {
  const { squareFootage, petWasteRemoved, addOns } = input;
  const baseTotal = squareFootage * RATES.basePerSqFt;
  const addOnDetails: AddOnDetail[] = addOns.map((key) => ({
    key,
    label: ADD_ON_LABELS[key],
    amount: squareFootage * RATES[key],
  }));
  const addOnTotal = addOnDetails.reduce((sum, d) => sum + d.amount, 0);
  const wasteFee = petWasteRemoved ? 0 : RATES.petWasteFee;
  const subtotal = baseTotal + addOnTotal + wasteFee;
  const minimumApplied = subtotal < RATES.minimumJob;
  const finalTotal = minimumApplied ? RATES.minimumJob : subtotal;
  return {
    baseTotal,
    addOnTotal,
    wasteFee,
    subtotal,
    minimumApplied,
    finalTotal,
    addOnDetails,
  };
}

export function getDepositAmount(finalTotal: number, depositPercent: number = 50): number {
  return Math.round(finalTotal * (depositPercent / 100));
}
