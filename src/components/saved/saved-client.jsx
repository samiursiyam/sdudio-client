'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { DestinationCard } from '@/components/destinations/destination-card';
import { CardGridSkeleton, RouteShell, PageHeadingSkeleton } from '@/components/loading/skeletons';
import { toast } from '@/components/ui/toast';

/* Reads the id list saved with the heart buttons */
const readSaved = () => {
  try {
    return JSON.parse(localStorage.getItem('savedDestinations')) || [];
  } catch (error) {
    return [];
  }
};

/* Client island — the server page passes the cached destination list,
   so this page never hits the backend from the browser */
export function SavedClient({ destinations = [] }) {
  const [savedIds, setSavedIds] = useState(null);

  /* Read localStorage after mount (it doesn't exist on the server) */
  useEffect(() => {
    const load = () => setSavedIds(readSaved());
    load();
  }, []);

  const handleRemove = (id) => {
    const next = savedIds.filter((savedId) => savedId !== id);
    try {
      localStorage.setItem('savedDestinations', JSON.stringify(next));
    } catch (error) {
      // localStorage unavailable
    }
    setSavedIds(next);
    toast.add({ type: 'info', title: 'Removed from saved' });
  };

  /* savedIds === null → still reading localStorage */
  if (savedIds === null) {
    return (
      <RouteShell>
        <PageHeadingSkeleton />
        <div className="mt-8">
          <CardGridSkeleton count={3} />
        </div>
      </RouteShell>
    );
  }

  const savedDestinations = (Array.isArray(destinations) ? destinations : []).filter(
    (destination) => savedIds.includes(destination._id)
  );

  return (
    <RouteShell>
      <h1 className="text-3xl font-normal text-foreground sm:text-4xl">
        Saved Spaces
      </h1>
      <p className="mt-3 text-sm text-foreground/70">
        Spaces you saved with the heart button
      </p>

      {savedDestinations.length === 0 ? (
        <div className="mt-8 border border-[#e3e7ec] bg-white p-10 text-center">
          <Heart
            aria-hidden
            className="mx-auto size-8 text-[#e61a4f]"
          />
          <p className="mt-3 text-lg font-medium text-foreground">
            Nothing saved yet
          </p>
          <p className="mt-2 text-sm text-foreground/60">
            Tap the heart icon on any studio space to save it for later.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {savedDestinations.map((destination) => (
            <div key={destination._id}>
              <DestinationCard destination={destination} />

              <button
                type="button"
                onClick={() => handleRemove(destination._id)}
                className="mt-3 flex items-center gap-1.5 border border-red-200 px-3.5 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
              >
                <Heart className="size-3.5" aria-hidden />
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </RouteShell>
  );
}
