import { createHmac, randomBytes } from "crypto";

export interface AdminUser {
  id: string;
  username: string;
  name: string;
}

const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours
// Firebase Hosting strips all cookies except __session when rewriting to Cloud Run/Functions.
export const SESSION_COOKIE_NAME = "__session";

function getSessionSecret(): string {
  // Only use SESSION_SECRET for signing/verifying session cookies.
  // Falling back to ADMIN_PASSWORD can vary between environments/instances
  // and cause signature mismatches (login succeeds but /api/auth/me fails).
  return process.env.SESSION_SECRET || "turfflex-session-secret-change-in-production";
}

function getConfiguredCredentials() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "changeme";
  return { username, password };
}

function signPayload(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

export async function authenticate(username: string, password: string): Promise<AdminUser | null> {
  const creds = getConfiguredCredentials();
  if (username !== creds.username || password !== creds.password) {
    return null;
  }
  return {
    id: "admin",
    username: creds.username,
    name: "Admin",
  };
}

/** Create a signed session token (cookie value) so auth works without server-side session store (e.g. serverless). */
export function createSession(user: AdminUser): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = JSON.stringify({ user, exp });
  const encoded = Buffer.from(payload, "utf8").toString("base64url");
  const sig = signPayload(encoded);
  return `${encoded}.${sig}`;
}

export function getUserFromSessionToken(token: string | undefined | null): AdminUser | null {
  if (!token || !token.includes(".")) return null;
  const [encoded, sig] = token.split(".");
  if (!encoded || sig !== signPayload(encoded)) return null;
  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as { user: AdminUser; exp: number };
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return null;
    if (!payload.user?.id || !payload.user?.username) return null;
    return payload.user;
  } catch {
    return null;
  }
}

export function destroySession(_token: string | undefined | null) {
  // No server-side store; clearing the cookie is enough
}

/** Cookie key used by client for Bearer fallback (sessionStorage). */
export const ADMIN_TOKEN_STORAGE_KEY = "turfflex_admin_token";

/**
 * Get session token from request: __session cookie (forwarded by Firebase Hosting) or Authorization: Bearer.
 * Use the header when the cookie is stripped so admin auth works on live.
 */
export function getSessionTokenFromRequest(
  request: { cookies: { get: (name: string) => { value: string } | undefined }; headers: { get: (name: string) => string | null } },
): string | null {
  const fromCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (fromCookie) return fromCookie;
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7).trim() || null;
  return null;
}

