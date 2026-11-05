import Link from 'next/link';
import {
  Compass,
  ClipboardCheck,
  CalendarPlus,
  Heart,
  ArrowRight,
} from 'lucide-react';

/* The four steps a visitor goes through on Wanderlast */
const steps = [
  {
    number: '01',
    icon: Compass,
    title: 'Browse Studio Spaces',
    text: 'Explore every kind of creative space from the home page or the Spaces page. Filter by category, price and name until you find the room that fits your session.',
  },
  {
    number: '02',
    icon: ClipboardCheck,
    title: 'Check Every Detail',
    text: 'Open any space to see photos, highlights, the full equipment list and the exact price per session — everything you need to decide, all in one place.',
  },
  {
    number: '03',
    icon: CalendarPlus,
    title: 'Book Your Session',
    text: 'Log in, pick a date on the booking card and hit Rent Now — your session is reserved in seconds. Free cancellation up to 48 hours before you start.',
  },
  {
    number: '04',
    icon: Heart,
    title: 'Save & Manage Anytime',
    text: 'Tap the heart on a space to keep it in your Saved list, then view or cancel your bookings whenever you want from the My Bookings page.',
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-background py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-10">
        {/* Small handwritten heading */}
        <p className="text-center text-3xl text-[#e61a4f] [font-family:var(--font-hand)] sm:text-4xl">
          Simple process
        </p>
        <h2 className="mt-1 text-center text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          How It Works
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-foreground/60">
          From first look to a booked session in four easy steps —
          here is everything you can do on Wanderlast
        </p>

        {/* Steps — connected by a dashed line on desktop */}
        <div className="relative mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connector line behind the number badges (desktop only) */}
          <div
            aria-hidden
            className="absolute left-[12%] right-[12%] top-10 hidden border-t-2 border-dashed border-[#e61a4f]/25 lg:block"
          />

          {steps.map(({ number, icon: Icon, title, text }) => (
            <div
              key={number}
              className="relative flex flex-col items-center rounded-2xl border border-[#e3e7ec] bg-white p-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-[#e61a4f]/40 hover:shadow-xl"
            >
              {/* Number badge sitting on the connector line */}
              <span className="relative z-10 flex size-20 items-center justify-center rounded-full border border-[#e61a4f]/25 bg-white text-[#e61a4f] shadow-sm">
                <Icon className="size-8" strokeWidth={1.6} aria-hidden />
                <span className="absolute -right-1.5 -top-1.5 flex size-7 items-center justify-center rounded-full bg-[#e61a4f] text-xs font-extrabold text-white shadow">
                  {number}
                </span>
              </span>

              <h3 className="mt-5 text-lg font-extrabold leading-snug text-foreground">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-foreground/60">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Quick links — jump straight into the two main pages */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 rounded-full bg-[#e61a4f] px-10 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#c9123f]"
          >
            Explore Studio Spaces
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-8 py-4 text-sm font-bold text-foreground transition-all duration-300 hover:border-[#e61a4f] hover:text-[#e61a4f]"
          >
            Browse by Category
          </Link>
        </div>

        {/* Reassurance note */}
        <p className="mt-6 text-center text-xs text-foreground/50">
          Browsing is free — you only need an account when you are ready
          to book a session.
        </p>
      </div>
    </section>
  );
}
