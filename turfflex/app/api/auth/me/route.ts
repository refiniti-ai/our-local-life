import { NextRequest, NextResponse } from "next/server";
import { getUserFromSessionToken, getSessionTokenFromRequest } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = getSessionTokenFromRequest(request);
  const user = getUserFromSessionToken(token ?? null);

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
    },
  });
}
