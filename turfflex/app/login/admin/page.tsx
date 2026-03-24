"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed");
        setSubmitting(false);
        return;
      }
      // Set the session cookie from the response so login works even when the
      // server's Set-Cookie header is stripped (e.g. by Firebase Hosting/Cloud Run proxy on live).
      const data = await res.json().catch(() => ({}));
      const sessionToken: string | undefined = data?.sessionToken;
      if (sessionToken) {
        const maxAgeSeconds = 60 * 60 * 8; // must match server
        const secure = window.location.protocol === "https:" ? "; Secure" : "";
        // Do not encode the token: it is base64url.signature; encoding the dot breaks server verification.
        // Use __session so Firebase Hosting forwards it (Hosting strips all other cookies on rewrites).
        document.cookie = `__session=${sessionToken}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secure}`;
        // Fallback for live: Firebase Hosting may still drop cookies; send token in Authorization header.
        try {
          sessionStorage.setItem("turfflex_admin_token", sessionToken);
        } catch (_) {}
      }

      // Give the browser a moment to persist the cookie before redirecting
      await new Promise((r) => setTimeout(r, 150));
      window.location.href = "/admin";
    } catch {
      setError("Unable to log in. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <header className="border-b border-charcoal/10 bg-cream">
        <div className="mx-auto max-w-6xl px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/images/TURFFLEX_ONE_COLOR_LOGO.png"
              alt="Turfflex"
              width={160}
              height={42}
              className="h-9 w-auto"
            />
          </Link>
          <Link href="/login" className="font-body text-sm text-charcoal/70 hover:text-charcoal">
            ← Back to login
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white border-2 border-charcoal/10 rounded-lg shadow-badge p-6">
          <h1 className="font-display text-2xl text-charcoal mb-2 tracking-tight text-center">
            Admin sign in
          </h1>
          <p className="font-body text-sm text-charcoal-light mb-6 text-center">
            Enter your admin credentials to access the dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-body text-sm font-medium text-charcoal mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body focus:border-aqua outline-none"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block font-body text-sm font-medium text-charcoal mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-charcoal/20 rounded px-3 py-2 font-body focus:border-aqua outline-none"
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="font-body text-sm text-service-red mt-1">{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-4 bg-aqua text-cream font-display text-lg tracking-wider px-4 py-3 rounded shadow-badge hover:bg-aqua-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center font-body text-xs text-charcoal-light">
            Default: <span className="font-medium">admin / changeme</span>. Set env vars for production.
          </p>
        </div>
      </main>
    </div>
  );
}
