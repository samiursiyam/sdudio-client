import { RouteShell, Pulse, DetailSkeleton } from '@/components/loading/skeletons';

/* /destinations/[id] — hero image + details + booking panel placeholder */
export default function Loading() {
  return (
    <RouteShell>
      {/* breadcrumb / back link */}
      <Pulse className="h-4 w-40" />
      <div className="mt-5">
        <DetailSkeleton />
      </div>
    </RouteShell>
  );
}
