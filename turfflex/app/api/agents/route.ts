import { NextRequest, NextResponse } from "next/server";
import { addServiceAgent, getServiceAgents } from "@/lib/store";
import { getUserFromSessionToken, getSessionTokenFromRequest } from "@/lib/auth";

function requireAdmin(request: NextRequest) {
  const token = getSessionTokenFromRequest(request);
  const user = getUserFromSessionToken(token ?? null);
  return !!user;
}

export async function GET(request: NextRequest) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const agents = getServiceAgents();
  return NextResponse.json({ agents });
}

export async function POST(request: NextRequest) {
  if (!requireAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const name = (body?.name ?? "").trim();
  const email = (body?.email ?? "").trim() || undefined;
  const phone = (body?.phone ?? "").trim() || undefined;

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const agent = addServiceAgent({
    name,
    email,
    phone,
    active: true,
  });

  return NextResponse.json(agent, { status: 201 });
}

