'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { getJwtToken, bearer } from "@/lib/get-jwt";

export function CancelBooking({ bookingId }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

const handleCancel = async () => {
    setPending(true);

    try {
        const token = await getJwtToken();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${bookingId}`,
            {
                method: 'DELETE',
                headers: { ...  vbearer(token) },
            }
        );

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Failed to cancel booking');
        }

        router.refresh();

    } catch (error) {
        console.error(error);
        alert(error.message);
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
      {pending ? 'Cancelling…' : 'Cance'}
    </button>
  );
}
