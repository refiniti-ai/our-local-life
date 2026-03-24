import { NextRequest, NextResponse } from "next/server";
import { addLead, getLeads } from "@/lib/store";

export async function GET() {
  const leads = getLeads();
  return NextResponse.json({ leads });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, address, quoteInput, quoteBreakdown, agreementsAccepted, createAccount } = body;
    if (!name || !phone || !email || !address || !quoteInput || !quoteBreakdown) {
      return NextResponse.json(
        { error: "Missing required fields: name, phone, email, address, quoteInput, quoteBreakdown" },
        { status: 400 }
      );
    }
    const lead = addLead({
      name,
      phone,
      email,
      address,
      quoteInput,
      quoteBreakdown,
      agreementsAccepted: !!agreementsAccepted,
      createAccount: !!createAccount,
    });
    return NextResponse.json(lead);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
