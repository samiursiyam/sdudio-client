import { RouteShell, Pulse, CardGridSkeleton } from '@/components/loading/skeletons';

/* /destinations — heading + filter pills + card grid placeholder */
export default function Loading() {
  return (
    <RouteShell>
      <Pulse className="h-10 w-56 sm:w-80" />
      <Pulse className="mt-4 h-4 w-64 sm:w-96" />
      {/* filter pills */}
      <div className="mt-6 flex flex-wrap gap-2">
        {['w-24', 'w-32', 'w-20', 'w-28', 'w-24', 'w-36'].map((width, index) => (
          <Pulse key={index} className={`h-9 rounded-full ${width}`} />
        ))}
      </div>
      <div className="mt-10">
        <CardGridSkeleton count={6} />
      </div>
    </RouteShell>
  );
}
