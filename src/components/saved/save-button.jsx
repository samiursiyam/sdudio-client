'use client';

import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { toast } from "@/components/ui/toast";

/* localStorage list of saved destination ids */
const readSaved = () => {
  try {
    return JSON.parse(localStorage.getItem('savedDestinations')) || [];
  } catch (error) {
    return [];
  }
};

export function SaveButton({ destinationId, className = 'absolute left-3 top-3' }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readSaved().includes(destinationId));
  }, [destinationId]);

  const toggle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const savedList = readSaved();
    const next = savedList.includes(destinationId)
      ? savedList.filter((id) => id !== destinationId)
      : [...savedList, destinationId];

    const isRemoving = savedList.includes(destinationId);

    try {
      localStorage.setItem('savedDestinations', JSON.stringify(next));
    } catch (error) {
      // localStorage unavailable
    }

    toast.add(
      isRemoving
        ? { type: "info", title: "Removed from saved" }
        : { type: "success", title: "Saved to your list" }
    );

    setSaved(!saved);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={saved ? 'Remove from saved' : 'Save destination'}
      className={`${className} z-10 flex size-8 items-center justify-center rounded-full bg-white/95 transition-transform hover:scale-110`}
    >
      <Heart
        aria-hidden
        className={`size-4 ${
          saved ? 'fill-[#e61a4f] text-[#e61a4f]' : 'text-foreground/70'
        }`}
      />
    </button>
  );
}
