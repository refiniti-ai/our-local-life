import { NextRequest, NextResponse } from "next/server";
import { authenticate, createSession, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const username = body?.username ?? "";
  const password = body?.password ?? "";

  const user = await authenticate(username, password);
  if (!user) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const token = createSession(user);

  const response = NextResponse.json({
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
    },
    // Also return the signed session token so the client can set the cookie
    // in local preview environments where `Set-Cookie` may not be forwarded.
    sessionToken: token,
  });

  const maxAgeSeconds = 60 * 60 * 8; // 8 hours
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");

  // Important for local preview (`http://localhost`): if we set `Secure`,
  // the browser will not store/send the cookie over plain HTTP, causing
  // `/api/auth/me` to see an unauthenticated user and redirect back to /login.
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const isSecure =
    request.nextUrl.protocol === "https:" || forwardedProto?.toLowerCase() === "https";

  // Use Next's cookie API so the runtime actually emits Set-Cookie.
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSeconds,
    secure: isSecure,
  });

  return response;
}

