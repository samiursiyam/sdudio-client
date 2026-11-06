'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { toast } from "@/components/ui/toast";

export function CancelBooking({ bookingId }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

const handleCancel = async () => {
    setPending(true);

    try {
        const res = await fetch(
            `/backend/my-bookings/${bookingId}`,
            { method: 'DELETE' }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Failed to cancel booking');
        }

        router.refresh();
        toast.add({
            type: "success",
            title: "Booking cancelled",
            description: "Your booking has been cancelled.",
        });

    } catch (error) {
        console.error(error);
        toast.add({
            type: "error",
            title: "Cancellation failed",
            description: error.message || "Failed to cancel booking",
        });
    } finally {
        setPending(false);
    }
};

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={pending}
      className="flex items-center gap-1.5 border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Trash2 className="size-3.5" aria-hidden />
      {pending ? 'Cancelling…' : 'Cancel'}
    </button>
  );
}
