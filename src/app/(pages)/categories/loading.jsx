import { RouteShell, PageHeadingSkeleton, CardGridSkeleton } from '@/components/loading/skeletons';

/* /categories — heading + category grid placeholder */
export default function Loading() {
  return (
    <RouteShell>
      <PageHeadingSkeleton />
      <div className="mt-10">
        <CardGridSkeleton count={6} />
      </div>
    </RouteShell>
  );
}
