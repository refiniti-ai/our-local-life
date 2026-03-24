import Link from "next/link";
import Image from "next/image";
import { BadgeShield, BadgeStar, BadgeCheck, BadgeMedallion, BadgeRibbon } from "@/components/BadgeIcons";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-cream canvas-texture">
      {/* Diagonal stripe accent – moving */}
      <div className="absolute inset-0 stripe-diag pointer-events-none" />

      <header className="relative border-b border-charcoal/10 bg-cream/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/TURFFLEX_ONE_COLOR_LOGO.png"
              alt="Turfflex"
              width={180}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <nav className="flex items-center gap-2 sm:gap-6 font-body text-sm font-medium text-charcoal flex-shrink-0">
            <a href="#services" className="hidden sm:inline hover:text-aqua transition-colors">Services</a>
            <a href="#how-it-works" className="hidden sm:inline hover:text-aqua transition-colors">How It Works</a>
            <Link href="/quote" className="bg-service-red text-cream px-3 py-2 sm:px-5 sm:py-2.5 rounded shadow-badge hover:bg-service-red-dark transition-colors text-center whitespace-nowrap">
              Get Instant Quote
            </Link>
            <Link href="/login" className="bg-charcoal/10 text-charcoal border-2 border-charcoal/20 px-3 py-2 sm:px-5 sm:py-2.5 rounded shadow-badge hover:bg-charcoal/20 hover:border-charcoal/30 transition-colors text-center font-medium whitespace-nowrap">
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 py-12 sm:py-20">
        {/* Hero */}
        <section className="text-center mb-16 sm:mb-24">
          <div className="flex justify-center gap-4 sm:gap-8 mb-4">
            <BadgeRibbon className="text-aqua/60 w-10 h-10 sm:w-12 sm:h-12" size={48} />
            <BadgeMedallion className="text-service-red/60 w-10 h-10 sm:w-12 sm:h-12" size={48} />
            <BadgeRibbon className="text-aqua/60 w-10 h-10 sm:w-12 sm:h-12 scale-x-[-1]" size={48} />
          </div>
          <p className="font-display text-aqua text-lg sm:text-xl tracking-widest uppercase mb-2">
            Turf Cleaning · Arizona
          </p>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-charcoal mb-4 tracking-tight">
            FLEX YOUR TURF
          </h1>
          <p className="font-script text-2xl sm:text-3xl text-service-red mb-6">
            Flex Your Turf
          </p>
          <p className="mx-auto max-w-xl font-body text-charcoal-light text-lg mb-10">
            Professional artificial grass cleaning. Trusted since the 50s. Get an instant quote, book online, and get your turf looking like new.
          </p>
          <Link
            href="/quote"
            className="inline-block bg-aqua text-cream font-display text-xl tracking-wider px-10 py-4 rounded shadow-badge hover:bg-aqua-dark transition-colors"
          >
            GET INSTANT QUOTE
          </Link>
        </section>

        {/* Block – mid-century bold */}
        <section className="bg-charcoal text-cream py-12 px-6 rounded mb-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl sm:text-3xl tracking-wider mb-4">
              SIMPLE. STRONG. BUILT TO LAST.
            </h2>
            <p className="font-body text-cream/90">
              We don’t do trendy. We do clean, confident service you can count on — estimate, book, and confirm in minutes.
            </p>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mb-20">
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal text-center mb-10 tracking-tight">
            WHAT WE DO
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Turf Cleaning", desc: "Deep clean and refresh your artificial grass so it looks and smells like new.", Icon: BadgeShield },
              { title: "Add-Ons", desc: "Heavy odor treatment, stain treatment, infill refresh — we’ve got you covered.", Icon: BadgeStar },
              { title: "Transparent Pricing", desc: "$0.45/sq ft base rate. Instant quote. No surprises.", Icon: BadgeCheck },
            ].map((item) => (
              <div key={item.title} className="bg-white border-2 border-charcoal/10 rounded p-6 shadow-badge flex flex-col items-center text-center">
                {"Icon" in item && (
                  <span className="text-aqua mb-3">
                    <item.Icon size={44} className="mx-auto" />
                  </span>
                )}
                <h3 className="font-display text-xl text-aqua tracking-wider mb-2">{item.title}</h3>
                <p className="font-body text-charcoal-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="mb-20">
          <h2 className="font-display text-3xl sm:text-4xl text-charcoal text-center mb-10 tracking-tight">
            HOW IT WORKS
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-12 items-center flex-wrap">
            {["Get instant quote", "Pay deposit", "Pick date", "We show up"].map((step, i) => (
              <div key={step} className="flex items-center gap-4">
                <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-service-red bg-service-red text-cream font-display text-xl shadow-badge">
                  {i + 1}
                </span>
                <span className="font-display text-lg tracking-wide text-charcoal">{step}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/quote"
              className="inline-block bg-service-red text-cream font-display text-lg tracking-wider px-8 py-3 rounded shadow-badge hover:bg-service-red-dark transition-colors"
            >
              GET INSTANT QUOTE
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-charcoal/10 pt-16 text-center">
          <div className="flex justify-center gap-3 mb-4">
            <BadgeRibbon className="text-charcoal/30 w-8 h-8" size={32} />
            <BadgeStar className="text-aqua/50 w-8 h-8" size={32} />
            <BadgeRibbon className="text-charcoal/30 w-8 h-8 scale-x-[-1]" size={32} />
          </div>
          <p className="font-script text-3xl text-service-red mb-2">Flex Your Turf</p>
          <p className="font-body text-charcoal-light mb-6">Ready for a quote? It only takes a minute.</p>
          <Link
            href="/quote"
            className="inline-block bg-aqua text-cream font-display text-xl tracking-wider px-10 py-4 rounded shadow-badge hover:bg-aqua-dark transition-colors"
          >
            GET INSTANT QUOTE
          </Link>
        </section>
      </main>

      <footer className="relative border-t border-charcoal/10 py-8 mt-12">
        <div className="mx-auto max-w-6xl px-4 text-center font-body text-sm text-charcoal-light">
          © {new Date().getFullYear()} Turfflex. All rights reserved.
          {" · "}
          <Link href="/my-bookings" className="text-charcoal/60 hover:text-charcoal">
            My appointments
          </Link>
          {" · "}
          <Link href="/login" className="text-charcoal/60 hover:text-charcoal">
            Login
          </Link>
        </div>
      </footer>
    </div>
  );
}
