"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { calculateQuote, getDepositAmount, RATES, type QuoteInput, type PropertyType, type AddOnKey } from "@/lib/pricing";
import { BadgeCheck } from "@/components/BadgeIcons";

const PROPERTY_OPTIONS: { value: PropertyType; label: string }[] = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "hoa", label: "HOA" },
  { value: "other", label: "Other" },
];

const ADD_ONS: { key: AddOnKey; label: string; rate: string }[] = [
  { key: "heavyOdor", label: "Heavy Odor Treatment", rate: "+$0.10/sq ft" },
  { key: "stainTreatment", label: "Stain Treatment", rate: "+$0.05/sq ft" },
  { key: "infillRefresh", label: "Infill Refresh", rate: "+$0.15/sq ft" },
];

const AGREEMENTS = [
  {
    id: "sqft",
    text: "Final pricing is based on actual measured square footage at time of service. If actual size exceeds estimate, additional square footage will be billed at $0.45 per sq ft plus any selected add-ons.",
  },
  {
    id: "petwaste",
    text: "If yard is not cleared prior to arrival, a $50 cleanup fee will be added.",
  },
  {
    id: "deposit",
    text: "Deposit secures appointment and applies to final invoice.",
  },
];

const DEPOSIT_PERCENT = 50;

const defaultQuote: QuoteInput = {
  squareFootage: 0,
  propertyType: "residential",
  petWasteRemoved: true,
  addOns: [],
  gateAccess: false,
  powerAccess: true,
  waterAccess: true,
  gateAccessInstructions: "",
  powerAccessInstructions: "",
  waterAccessInstructions: "",
};

export default function QuotePage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "estimate" | "agreements" | "payment">("form");
  const [quote, setQuote] = useState<QuoteInput>(defaultQuote);
  const [agreements, setAgreements] = useState<Record<string, boolean>>({ sqft: false, petwaste: false, deposit: false });
  const [contact, setContact] = useState({ name: "", phone: "", email: "", address: "" });
  const [wantsAccount, setWantsAccount] = useState(false);
  const [payAndBookLoading, setPayAndBookLoading] = useState(false);

  const breakdown = useMemo(() => {
    if (quote.squareFootage <= 0) return null;
    return calculateQuote(quote);
  }, [quote]);

  const depositAmount = breakdown ? getDepositAmount(breakdown.finalTotal, DEPOSIT_PERCENT) : 0;
  const allAgreed = agreements.sqft && agreements.petwaste && agreements.deposit;

  const handleQuoteChange = (updates: Partial<QuoteInput>) => {
    setQuote((prev) => ({ ...prev, ...updates }));
  };

  const handleAddOnToggle = (key: AddOnKey) => {
    setQuote((prev) => ({
      ...prev,
      addOns: prev.addOns.includes(key) ? prev.addOns.filter((k) => k !== key) : [...prev.addOns, key],
    }));
  };

  const canProceedToEstimate = quote.squareFootage >= 100 && contact.name && contact.phone && contact.email && contact.address;

  const handlePayAndPickDate = async () => {
    setPayAndBookLoading(true);
    let leadId: string | undefined = undefined;
    const finalTotal = breakdown?.finalTotal ?? 0;
    const depAmount = breakdown ? getDepositAmount(breakdown.finalTotal, DEPOSIT_PERCENT) : 0;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          address: contact.address,
          quoteInput: quote,
          quoteBreakdown: breakdown ?? undefined,
          agreementsAccepted: allAgreed,
        }),
      });

      if (res.ok) {
        const lead = await res.json();
        if (!lead.error && lead.id) {
          leadId = lead.id;
        }
      }
    } catch {
      // Ignore errors – still allow user to proceed to booking
    }

    const bookingData = {
      leadId,
      customerName: contact.name,
      phone: contact.phone,
      email: contact.email,
      address: contact.address,
      squareFootage: quote.squareFootage,
      serviceType: "Turf Cleaning",
      finalTotal,
      depositAmount: depAmount,
      gateAccessInstructions: quote.gateAccessInstructions || undefined,
      powerAccessInstructions: quote.powerAccessInstructions || undefined,
      waterAccessInstructions: quote.waterAccessInstructions || undefined,
      createAccount: wantsAccount,
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem("turfflex_booking_data", JSON.stringify(bookingData));
      router.push("/booking");
    }
    setPayAndBookLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-cream canvas-texture">
      <div className="absolute inset-0 stripe-diag pointer-events-none" />

      <header className="relative border-b border-charcoal/10 bg-cream/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 gap-4">
          <Link href="/" className="flex-shrink-0">
            <Image src="/images/TURFFLEX_ONE_COLOR_LOGO.png" alt="Turfflex" width={160} height={42} className="h-9 w-auto object-contain" />
          </Link>
          <nav className="flex items-center gap-3 font-body text-sm font-medium text-charcoal">
            <Link href="/" className="hover:text-aqua">Home</Link>
            <Link href="/login" className="bg-charcoal/10 border-2 border-charcoal/20 px-3 py-2 rounded shadow-badge hover:bg-charcoal/20 font-medium">
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative mx-auto max-w-2xl px-4 py-8">
        <div className="flex justify-center gap-2 items-center mb-2">
          <BadgeCheck size={36} className="text-aqua" />
          <h1 className="font-display text-3xl sm:text-4xl text-charcoal tracking-tight">
            INSTANT QUOTE
          </h1>
        </div>
        <p className="font-script text-xl text-service-red text-center mb-8">Flex Your Turf</p>

        {step === "form" && (
          <>
              <div className="space-y-6 bg-white border-2 border-charcoal/10 rounded-lg p-6 shadow-badge">
              <div>
                <label className="block font-body font-medium text-charcoal mb-1">Full Name *</label>
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                  className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body focus:border-aqua outline-none"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block font-body font-medium text-charcoal mb-1">Phone *</label>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                  className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body focus:border-aqua outline-none"
                  placeholder="(602) 555-1234"
                />
              </div>
              <div>
                <label className="block font-body font-medium text-charcoal mb-1">Email *</label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                  className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body focus:border-aqua outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block font-body font-medium text-charcoal mb-1">Property Address *</label>
                <input
                  type="text"
                  value={contact.address}
                  onChange={(e) => setContact((c) => ({ ...c, address: e.target.value }))}
                  className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body focus:border-aqua outline-none"
                  placeholder="123 Main St, City, AZ"
                />
              </div>

              <div>
                <label className="block font-body font-medium text-charcoal mb-1">Approximate Square Footage *</label>
                <input
                  type="number"
                  min={100}
                  step={50}
                  value={quote.squareFootage || ""}
                  onChange={(e) => handleQuoteChange({ squareFootage: Number(e.target.value) || 0 })}
                  className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body focus:border-aqua outline-none"
                  placeholder="e.g. 500"
                />
                <p className="text-sm text-charcoal-light mt-1">Min 100 sq ft</p>
              </div>

              <div>
                <label className="block font-body font-medium text-charcoal mb-1">Property Type</label>
                <select
                  value={quote.propertyType}
                  onChange={(e) => handleQuoteChange({ propertyType: e.target.value as PropertyType })}
                  className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body focus:border-aqua outline-none"
                >
                  {PROPERTY_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-body font-medium text-charcoal mb-1">Number of Dogs (optional)</label>
                <input
                  type="number"
                  min={0}
                  value={quote.numDogs ?? ""}
                  onChange={(e) => handleQuoteChange({ numDogs: e.target.value === "" ? undefined : Number(e.target.value) })}
                  className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body focus:border-aqua outline-none"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 font-body text-charcoal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={quote.petWasteRemoved}
                    onChange={(e) => handleQuoteChange({ petWasteRemoved: e.target.checked })}
                    className="w-4 h-4 rounded border-2 border-charcoal/30 text-aqua focus:ring-aqua"
                  />
                  Pet waste will be removed before we arrive (if not, $50 fee applies)
                </label>
              </div>

              <div>
                <span className="block font-body font-medium text-charcoal mb-2">Add-Ons</span>
                <div className="space-y-2">
                  {ADD_ONS.map((a) => (
                    <label key={a.key} className="flex items-center justify-between gap-2 cursor-pointer">
                      <span className="font-body text-charcoal">{a.label}</span>
                      <span className="flex items-center gap-2">
                        <span className="text-sm text-charcoal-light">{a.rate}</span>
                        <input
                          type="checkbox"
                          checked={quote.addOns.includes(a.key)}
                          onChange={() => handleAddOnToggle(a.key)}
                          className="w-4 h-4 rounded border-2 border-charcoal/30 text-aqua focus:ring-aqua"
                        />
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-body text-charcoal cursor-pointer">
                    <input
                      type="checkbox"
                      checked={quote.gateAccess}
                      onChange={(e) => handleQuoteChange({ gateAccess: e.target.checked, ...(e.target.checked ? {} : { gateAccessInstructions: "" }) })}
                      className="w-4 h-4 rounded border-2 border-charcoal/30 text-aqua focus:ring-aqua"
                    />
                    Gate access
                  </label>
                  {quote.gateAccess && (
                    <input
                      type="text"
                      value={quote.gateAccessInstructions ?? ""}
                      onChange={(e) => handleQuoteChange({ gateAccessInstructions: e.target.value })}
                      placeholder="Gate code, instructions, or call on arrival"
                      className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body text-sm focus:border-aqua outline-none"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-body text-charcoal cursor-pointer">
                    <input
                      type="checkbox"
                      checked={quote.powerAccess}
                      onChange={(e) => handleQuoteChange({ powerAccess: e.target.checked, ...(e.target.checked ? {} : { powerAccessInstructions: "" }) })}
                      className="w-4 h-4 rounded border-2 border-charcoal/30 text-aqua focus:ring-aqua"
                    />
                    Power access
                  </label>
                  {quote.powerAccess && (
                    <input
                      type="text"
                      value={quote.powerAccessInstructions ?? ""}
                      onChange={(e) => handleQuoteChange({ powerAccessInstructions: e.target.value })}
                      placeholder="Outlet location, instructions, or access code"
                      className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body text-sm focus:border-aqua outline-none"
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 font-body text-charcoal cursor-pointer">
                    <input
                      type="checkbox"
                      checked={quote.waterAccess}
                      onChange={(e) => handleQuoteChange({ waterAccess: e.target.checked, ...(e.target.checked ? {} : { waterAccessInstructions: "" }) })}
                      className="w-4 h-4 rounded border-2 border-charcoal/30 text-aqua focus:ring-aqua"
                    />
                    Water access
                  </label>
                  {quote.waterAccess && (
                    <input
                      type="text"
                      value={quote.waterAccessInstructions ?? ""}
                      onChange={(e) => handleQuoteChange({ waterAccessInstructions: e.target.value })}
                      placeholder="Spigot location, hose instructions, or access"
                      className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body text-sm focus:border-aqua outline-none"
                    />
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-charcoal/10">
                <label className="flex items-start gap-3 font-body text-charcoal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wantsAccount}
                    onChange={(e) => setWantsAccount(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-2 border-charcoal/30 text-aqua focus:ring-aqua flex-shrink-0"
                  />
                  <span className="text-sm">
                    Create a simple login so you can view and reschedule your appointments later.
                    <span className="block text-charcoal-light">
                      We’ll use your email and phone as your login details. No password needed.
                    </span>
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setStep("estimate")}
                disabled={!canProceedToEstimate}
                className="bg-aqua text-cream font-display text-lg tracking-wider px-8 py-3 rounded shadow-badge hover:bg-aqua-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                SEE INSTANT ESTIMATE
              </button>
            </div>
          </>
        )}

        {step === "estimate" && breakdown && (
          <>
            <div className="bg-white border-2 border-charcoal/10 rounded-lg p-6 shadow-badge space-y-4">
              <h2 className="font-display text-xl text-charcoal tracking-wide border-b border-charcoal/10 pb-2">
                YOUR ESTIMATE
              </h2>
              <div className="flex justify-between font-body">
                <span>Base cleaning ({quote.squareFootage} sq ft × ${RATES.basePerSqFt})</span>
                <span>${breakdown.baseTotal.toFixed(2)}</span>
              </div>
              {breakdown.addOnDetails.length > 0 && (
                <>
                  {breakdown.addOnDetails.map((d) => (
                    <div key={d.key} className="flex justify-between font-body text-charcoal-light">
                      <span>{d.label}</span>
                      <span>${d.amount.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-body">
                    <span>Add-ons total</span>
                    <span>${breakdown.addOnTotal.toFixed(2)}</span>
                  </div>
                </>
              )}
              {breakdown.wasteFee > 0 && (
                <div className="flex justify-between font-body text-service-red">
                  <span>Pet waste fee</span>
                  <span>${breakdown.wasteFee.toFixed(2)}</span>
                </div>
              )}
              {breakdown.minimumApplied && (
                <div className="flex justify-between font-body text-charcoal-light">
                  <span>Minimum job adjustment</span>
                  <span>${breakdown.finalTotal - breakdown.subtotal} applied</span>
                </div>
              )}
              <div className="flex justify-between font-display text-xl pt-2 border-t-2 border-charcoal/10">
                <span>Estimated total</span>
                <span className="text-aqua">${breakdown.finalTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body pt-2">
                <span>Deposit required ({DEPOSIT_PERCENT}%)</span>
                <span className="font-medium">${depositAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-body text-sm text-charcoal-light">
                <span>Remaining after service</span>
                <span>${(breakdown.finalTotal - depositAmount).toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => setStep("form")}
                className="font-body font-medium text-charcoal border-2 border-charcoal/30 px-6 py-3 rounded hover:bg-charcoal/5 transition-colors"
              >
                Edit details
              </button>
              <button
                type="button"
                onClick={() => setStep("agreements")}
                className="bg-service-red text-cream font-display text-lg tracking-wider px-8 py-3 rounded shadow-badge hover:bg-service-red-dark transition-colors"
              >
                CONTINUE TO DEPOSIT
              </button>
            </div>
          </>
        )}

        {step === "agreements" && (
          <>
            <div className="bg-white border-2 border-charcoal/10 rounded-lg p-6 shadow-badge space-y-6">
              <h2 className="font-display text-xl text-charcoal tracking-wide">
                PLEASE AGREE TO THE FOLLOWING
              </h2>
              {AGREEMENTS.map((a) => (
                <label key={a.id} className="flex gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreements[a.id]}
                    onChange={(e) => setAgreements((prev) => ({ ...prev, [a.id]: e.target.checked }))}
                    className="mt-1 w-4 h-4 rounded border-2 border-charcoal/30 text-aqua focus:ring-aqua flex-shrink-0"
                  />
                  <span className="font-body text-charcoal-light text-sm">{a.text}</span>
                </label>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                onClick={() => setStep("estimate")}
                className="font-body font-medium text-charcoal border-2 border-charcoal/30 px-6 py-3 rounded hover:bg-charcoal/5 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep("payment")}
                disabled={!allAgreed}
                className="bg-service-red text-cream font-display text-lg tracking-wider px-8 py-3 rounded shadow-badge hover:bg-service-red-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                PAY DEPOSIT & BOOK
              </button>
            </div>
          </>
        )}

        {step === "payment" && (
          <>
            <div className="bg-white border-2 border-charcoal/10 rounded-lg p-6 shadow-badge text-center">
              <h2 className="font-display text-xl text-charcoal tracking-wide mb-2">
                DEPOSIT & BOOKING
              </h2>
              {breakdown && (
                <p className="font-body text-charcoal-light mb-6">
                  Deposit: <span className="font-medium text-charcoal">${depositAmount.toFixed(2)}</span> · 
                  Total job: <span className="font-medium text-charcoal">${breakdown.finalTotal.toFixed(2)}</span>
                </p>
              )}
              <p className="font-body text-charcoal-light text-sm mb-6">
                Pay your deposit to secure your appointment, then pick your date. (Stripe can be connected later.)
              </p>
              <button
                type="button"
                onClick={handlePayAndPickDate}
                disabled={payAndBookLoading}
                className="bg-service-red text-cream font-display text-lg tracking-wider px-8 py-3 rounded shadow-badge hover:bg-service-red-dark disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {payAndBookLoading ? "Taking you to calendar…" : "PAY DEPOSIT & PICK DATE"}
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
