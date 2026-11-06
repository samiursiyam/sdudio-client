import { RouteShell, PageHeadingSkeleton, ListSkeleton } from '@/components/loading/skeletons';

/* /my-bookings — heading + booking row placeholders */
export default function Loading() {
  return (
    <RouteShell>
      <PageHeadingSkeleton />
      <div className="mt-8">
        <ListSkeleton count={3} />
      </div>
    </RouteShell>
  );
}
