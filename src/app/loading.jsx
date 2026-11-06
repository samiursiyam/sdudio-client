/* Root loading — branded splash shown while the first segment
   of the app is streaming in (dotted map grid, pulsing brand
   mark, indeterminate progress bar) */
export default function Loading() {
  return (
    <main
      className="flex min-h-[calc(100vh-72px)] flex-1 items-center justify-center bg-white"
      style={{
        backgroundImage: 'radial-gradient(circle, #eceff3 1.2px, transparent 1.2px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="flex flex-col items-center px-6 text-center">
        {/* brand mark */}
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="size-4 animate-brand-dot rounded-full bg-[#e61a4f]"
          />
          <span className="text-3xl font-black uppercase tracking-[0.18em] text-[#12121a] sm:text-4xl">
            Studio<span className="text-[#e61a4f]">.</span>ora
          </span>
        </div>

        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground/40">
          Find your next session
        </p>

        {/* indeterminate progress bar */}
        <div
          role="status"
          aria-label="Loading"
          className="relative mt-8 h-1 w-48 overflow-hidden rounded-full bg-[#f3d9de] sm:w-64"
        >
          <span
            aria-hidden
            className="animate-splash-bar absolute top-0 h-full rounded-full bg-[#e61a4f]"
          />
        </div>

        <p className="mt-4 text-sm font-medium text-foreground/55">
          Preparing your space…
        </p>
      </div>
    </main>
  );
}
