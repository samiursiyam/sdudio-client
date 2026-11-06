import { RouteShell, PageHeadingSkeleton, Pulse, StatCardsSkeleton } from '@/components/loading/skeletons';

/* /profile — heading + profile card + stats + quick actions placeholder */
export default function Loading() {
  return (
    <RouteShell maxWidth="max-w-5xl">
      <PageHeadingSkeleton />
      {/* profile card */}
      <div className="mt-10 flex items-center gap-6 border border-[#e3e7ec] bg-white p-8">
        <Pulse className="size-24 shrink-0 rounded-full" />
        <div className="space-y-3">
          <Pulse className="h-6 w-40" />
          <Pulse className="h-4 w-56" />
        </div>
      </div>
      <div className="mt-6">
        <StatCardsSkeleton />
      </div>
      {/* quick actions */}
      <Pulse className="mt-10 h-6 w-36" />
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[0, 1, 2, 3].map((index) => (
          <Pulse key={index} className="h-24" />
        ))}
      </div>
    </RouteShell>
  );
}
