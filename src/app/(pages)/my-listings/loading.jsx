import { RouteShell, Pulse, CardGridSkeleton, StatCardsSkeleton } from '@/components/loading/skeletons';

/* /my-listings — heading + stats + listings grid placeholder */
export default function Loading() {
  return (
    <RouteShell>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Pulse className="h-10 w-64 sm:w-80" />
          <Pulse className="mt-4 h-4 w-56" />
        </div>
        <Pulse className="h-11 w-44" />
      </div>
      <div className="mt-8">
        <StatCardsSkeleton />
      </div>
      <div className="mt-10">
        <CardGridSkeleton count={4} />
      </div>
    </RouteShell>
  );
}
