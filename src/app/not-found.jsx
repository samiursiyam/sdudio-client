import Link from 'next/link';
import { Compass, MapPin, ArrowLeft, LayoutGrid } from 'lucide-react';

export const metadata = {
  title: '404 — Page not found',
  description: 'The page you are looking for does not exist.',
};

/* Custom 404 — on-brand: dotted map grid, huge stroked numerals,
   a dashed "route" that never arrives, and clear paths forward */
export default function NotFound() {
  return (
    <main
      className="relative flex min-h-[calc(100vh-72px)] flex-1 items-center overflow-hidden bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle, #e3e7ec 1.2px, transparent 1.2px)',
        backgroundSize: '26px 26px',
      }}
    >
      {/* soft pink glow behind the numerals */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e61a4f]/10 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-3xl px-6 py-16 text-center">
        {/* badge */}
        <p className="mx-auto inline-flex items-center gap-2 border border-[#e61a4f]/30 bg-[#fdf0f4] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#e61a4f]">
          <Compass className="size-4" aria-hidden />
          Error 404
        </p>

        {/* giant numerals */}
        <p
          aria-hidden
          className="mt-6 select-none text-[9rem] font-black leading-none tracking-tighter text-transparent sm:text-[13rem] [-webkit-text-stroke:3px_#e61a4f]"
        >
          404
        </p>

        {/* dashed route that goes nowhere */}
        <svg
          aria-hidden
          viewBox="0 0 320 40"
          className="mx-auto -mt-2 w-64 text-[#e61a4f] sm:w-80"
          fill="none"
        >
          <path
            d="M4 28 C 70 6, 120 34, 170 20 S 280 8, 306 22"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="7 7"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle cx="4" cy="28" r="4.5" fill="currentColor" opacity="0.5" />
        </svg>
        <MapPin
          aria-hidden
          className="mx-auto -mt-1 size-6 fill-[#e61a4f] text-[#e61a4f]"
        />

        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          You wandered off the map
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-foreground/65 sm:text-base">
          The page you are looking for doesn&apos;t exist, was moved, or never
          made it off the drawing board. Let&apos;s get you back on route.
        </p>

        {/* actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 bg-[#e61a4f] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#c9123f] sm:w-auto"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to Home
          </Link>
          <Link
            href="/destinations"
            className="inline-flex w-full items-center justify-center gap-2 border border-[#12121a] bg-white px-6 py-3 text-sm font-bold text-[#12121a] transition-colors hover:bg-[#12121a] hover:text-white sm:w-auto"
          >
            <LayoutGrid className="size-4" aria-hidden />
            Browse Studio Spaces
          </Link>
        </div>

        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.25em] text-foreground/35">
          Studio.ora — Find your next session
        </p>
      </div>
    </main>
  );
}
