import Link from 'next/link';
import { CloudOff, RefreshCw } from 'lucide-react';

/* Shown when the Express backend can't be reached from the server —
   so a misconfigured deployment says so instead of rendering
   "No bookings found" (which looks like lost data) */
export function BackendUnavailable({
  title = "We can't reach the server right now",
  description = 'Your data is safe — this is a connection problem, not lost data. Please try again in a moment.',
  retryHref,
}) {
  return (
    <div className="mt-8 border border-amber-200 bg-amber-50 p-8 text-center dark:border-amber-500/20 dark:bg-amber-500/5">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/10">
        <CloudOff className="size-7 text-amber-600 dark:text-amber-400" aria-hidden />
      </span>
      <h2 className="mt-4 text-lg font-bold text-foreground">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-foreground/70">
        {description}
      </p>
      {retryHref ? (
        <Link
          href={retryHref}
          className="mt-5 inline-flex items-center gap-2 bg-[#e61a4f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#c9123f]"
        >
          <RefreshCw className="size-4" aria-hidden />
          Try again
        </Link>
      ) : null}
    </div>
  );
}
