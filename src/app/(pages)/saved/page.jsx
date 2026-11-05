'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { DestinationCard } from '@/components/destinations/destination-card';
import { getJwtToken, bearer } from "@/lib/get-jwt";

/* Reads the id list saved with the heart buttons */
const readSaved = () => {
  try {
    return JSON.parse(localStorage.getItem('savedDestinations')) || [];
  } catch (error) {
    return [];
  }
};

const SavedPage = () => {
  const [savedIds, setSavedIds] = useState(null);
  const [destinations, setDestinations] = useState([]);

  /* Load saved ids + fetch destinations once on mount */
  useEffect(() => {
    const load = async () => {
      try {
        const token = await getJwtToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destinations`, {
          headers: { ...bearer(token) },
        });
        const data = await res.json();
        setDestinations(Array.isArray(data) ? data : []);
      } catch (error) {
        setDestinations([]);
      }
    };

    setSavedIds(readSaved());
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
  };

  /* savedIds === null → still loading from localStorage */
  if (savedIds === null) {
    return (
      <main className="min-h-screen bg-white px-4 py-10 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="h-10 w-44 animate-pulse bg-[#f7f8fa]" />
          <div className="mt-8 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="animate-pulse bg-[#f7f8fa]">
                <div className="aspect-[19/10]" />
                <div className="p-3">
                  <div className="h-4 w-36 bg-[#eef0f3]" />
                  <div className="mt-2 h-3 w-24 bg-[#eef0f3]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const savedDestinations = destinations.filter((destination) =>
    savedIds.includes(destination._id)
  );

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
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
      </div>
    </main>
  );
};

export default SavedPage;
