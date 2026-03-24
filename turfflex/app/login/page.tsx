"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
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
          <Link href="/" className="font-body text-sm text-charcoal/70 hover:text-charcoal">
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl text-charcoal mb-2 tracking-tight text-center">
            Log in
          </h1>
          <p className="font-body text-charcoal-light mb-8 text-center">
            Choose how you want to sign in.
          </p>

          <div className="space-y-4">
            <Link
              href="/login/admin"
              className="flex items-center justify-between w-full bg-white border-2 border-charcoal/10 rounded-lg shadow-badge p-5 hover:border-aqua hover:shadow-md transition-all group"
            >
              <div className="text-left">
                <p className="font-display text-lg text-charcoal group-hover:text-aqua transition-colors">
                  Admin
                </p>
                <p className="font-body text-sm text-charcoal-light mt-0.5">
                  Staff dashboard, leads, bookings, service agents
                </p>
              </div>
              <span className="font-body text-charcoal/50 group-hover:text-aqua">→</span>
            </Link>

            <Link
              href="/my-bookings"
              className="flex items-center justify-between w-full bg-white border-2 border-charcoal/10 rounded-lg shadow-badge p-5 hover:border-aqua hover:shadow-md transition-all group"
            >
              <div className="text-left">
                <p className="font-display text-lg text-charcoal group-hover:text-aqua transition-colors">
                  Customer
                </p>
                <p className="font-body text-sm text-charcoal-light mt-0.5">
                  View appointments, reschedule, see past invoices
                </p>
              </div>
              <span className="font-body text-charcoal/50 group-hover:text-aqua">→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
