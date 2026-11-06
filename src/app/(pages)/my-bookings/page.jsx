import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { BookingCard } from '@/components/my-bookings/booking-card';
import { BackendUnavailable } from '@/components/backend-unavailable';
import { RouteShell, PageHeadingSkeleton, ListSkeleton } from '@/components/loading/skeletons';
import { BACKEND_URL, getBackendAuthHeaders } from '@/lib/backend';

const MyBookingsContent = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect('/login?redirect=/my-bookings');
    }

    const user = session.user;

    let data = [];
    let backendError = null;

    const authHeaders = await getBackendAuthHeaders(user);

    try {
        const res = await fetch(
            `${BACKEND_URL}/bookings/${encodeURIComponent(user.email)}`,
            { headers: authHeaders, cache: 'no-store' }
        );
        if (!res.ok) {
            backendError = res.status === 401 || res.status === 403 ? 'auth' : `http-${res.status}`;
        } else {
            data = await res.json();
        }
    } catch (error) {
        backendError = 'unreachable';
    }

    const bookings = Array.isArray(data) ? data : [];

    if (backendError) {
        return (
            <RouteShell>
                <h1 className="text-3xl font-normal text-foreground sm:text-4xl">
                    My Bookings
                </h1>
                <p className="mt-3 text-sm text-foreground/70">
                    Manage and view your upcoming studio sessions
                </p>
                <BackendUnavailable
                    retryHref="/my-bookings"
                    description={
                        backendError === 'auth'
                            ? 'Your session could not be verified by the booking server. Please log in again.'
                            : 'We could not load your bookings — the booking server is unreachable or returned an error. Your bookings are safe; this is a connection problem.'
                    }
                />
            </RouteShell>
        );
    }
    return (
        <main className="min-h-screen bg-white px-4 py-10 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-normal text-foreground sm:text-4xl">
                    My Bookings
                </h1>
                <p className="mt-3 text-sm text-foreground/70">
                    Manage and view your upcoming studio sessions
                </p>

                {bookings.length === 0 ? (
                    <div className="mt-8 border border-[#e3e7ec] bg-white p-10 text-center">
                        <p className="text-lg font-medium text-foreground">
                            No bookings found
                        </p>
                        <p className="mt-2 text-sm text-foreground/60">
                            You have not booked any trips yet. Explore
                            Explore studio spaces to plan your next session.
                        </p>
                    </div>
                ) : (
                    <div className="mt-8 space-y-5">
                        {bookings.map((booking) => (
                            <BookingCard key={booking._id} booking={booking} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

/* Suspense boundary — dynamic fetch shows the shared skeleton list */
export default function Page() {
    return (
        <Suspense
            fallback={
                <RouteShell>
                    <PageHeadingSkeleton />
                    <div className="mt-8">
                        <ListSkeleton count={3} />
                    </div>
                </RouteShell>
            }
        >
            <MyBookingsContent />
        </Suspense>
    );
}
