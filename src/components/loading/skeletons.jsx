/* Shared presentational skeleton blocks — used by loading.jsx files
   and inline Suspense fallbacks so every loading state on the site
   looks consistent. Pure JSX, no state/hooks (server-safe).
   bg-[#f7f8fa] is neutralized to var(--muted) in dark mode by globals.css */

export function Pulse({ className = "" }) {
  return <div aria-hidden className={`animate-pulse bg-[#f7f8fa] ${className}`} />;
}

export function PageHeadingSkeleton() {
  return (
    <div>
      <Pulse className="h-10 w-48 sm:w-64" />
      <Pulse className="mt-4 h-4 w-56 sm:w-72" />
    </div>
  );
}

export function CardSkeleton({ className = "" }) {
  return (
    <div className={`overflow-hidden border border-[#e3e7ec] bg-white ${className}`}>
      <Pulse className="aspect-[19/10]" />
      <div className="space-y-2.5 p-4">
        <Pulse className="h-5 w-3/4" />
        <Pulse className="h-3.5 w-1/2" />
        <div className="flex items-center justify-between pt-3">
          <Pulse className="h-6 w-16" />
          <Pulse className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="space-y-5">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-5 border border-[#e3e7ec] bg-white p-5 sm:flex-row"
        >
          <Pulse className="h-40 w-full shrink-0 sm:w-64" />
          <div className="flex-1 space-y-3 py-1">
            <Pulse className="h-6 w-24 rounded-full" />
            <Pulse className="h-5 w-1/2" />
            <Pulse className="h-3.5 w-40" />
            <Pulse className="h-3.5 w-40" />
            <div className="flex items-center justify-between pt-4">
              <Pulse className="h-8 w-24" />
              <div className="flex gap-3">
                <Pulse className="h-9 w-24" />
                <Pulse className="h-9 w-24" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatCardsSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <Pulse key={index} className="h-24" />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <Pulse className="aspect-[19/10] w-full" />
        <Pulse className="h-8 w-2/3" />
        <Pulse className="h-4 w-1/3" />
        <div className="space-y-2.5 pt-2">
          <Pulse className="h-4 w-full" />
          <Pulse className="h-4 w-full" />
          <Pulse className="h-4 w-4/5" />
        </div>
      </div>
      <Pulse className="h-96" />
    </div>
  );
}

/* Full white page wrapper so route loading screens match the app chrome */
export function RouteShell({ children, maxWidth = "max-w-6xl" }) {
  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-10 lg:px-16">
      <div className={`mx-auto ${maxWidth}`}>{children}</div>
    </main>
  );
}
