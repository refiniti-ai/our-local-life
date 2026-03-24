import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add STRIPE_SECRET_KEY to .env.local" },
      { status: 503 }
    );
  }
  try {
    const { amount, customerEmail, metadata } = await request.json();
    const amountCents = Math.round(Number(amount) * 100);
    if (amountCents < 50) {
      return NextResponse.json({ error: "Amount must be at least $0.50" }, { status: 400 });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: metadata || {},
      ...(customerEmail && { receipt_email: customerEmail }),
    });
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Payment intent failed" }, { status: 500 });
  }
}
