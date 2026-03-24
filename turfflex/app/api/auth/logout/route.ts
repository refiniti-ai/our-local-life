import { NextRequest, NextResponse } from "next/server";
import { destroySession, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  destroySession(token ?? null);

  const response = NextResponse.json({ ok: true });
  let cookie = `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
  if (process.env.NODE_ENV === "production") {
    cookie += "; Secure";
  }
  response.headers.append("Set-Cookie", cookie);

  return response;
}

