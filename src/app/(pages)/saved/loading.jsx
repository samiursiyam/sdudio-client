import { RouteShell, PageHeadingSkeleton, CardGridSkeleton } from '@/components/loading/skeletons';

/* /saved — heading + saved-card grid placeholder */
export default function Loading() {
  return (
    <RouteShell>
      <PageHeadingSkeleton />
      <div className="mt-8">
        <CardGridSkeleton count={3} />
      </div>
    </RouteShell>
  );
}
