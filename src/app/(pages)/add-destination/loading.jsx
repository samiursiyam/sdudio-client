import { RouteShell, Pulse } from '@/components/loading/skeletons';

/* /add-destination — form placeholder */
export default function Loading() {
  return (
    <RouteShell maxWidth="max-w-3xl">
      <Pulse className="h-10 w-64" />
      <Pulse className="mt-4 h-4 w-72" />

      <div className="mt-8 space-y-6 border border-[#e3e7ec] bg-white p-6 sm:p-8">
        {/* two-column field rows */}
        {[0, 1, 2, 3].map((row) => (
          <div key={row} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[0, 1].map((col) => (
              <div key={col} className="space-y-2">
                <Pulse className="h-3.5 w-24" />
                <Pulse className="h-11 w-full" />
              </div>
            ))}
          </div>
        ))}
        {/* textarea */}
        <div className="space-y-2">
          <Pulse className="h-3.5 w-24" />
          <Pulse className="h-28 w-full" />
        </div>
        <Pulse className="h-12 w-full" />
      </div>
    </RouteShell>
  );
}
