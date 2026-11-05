import React, { Fragment, Suspense } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { BookingCard } from '@/components/my-bookings/booking-card';

const MyBookingsContent = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect('/login');
    }

    const user = session.user;

    let data = [];



    const tokenData = await auth.api.getToken({
        headers: await headers(),
    });

    if (!tokenData?.token) {
        throw new Error("JWT token not found. Please login again.");
    }   
    try {
        const res = await fetch(
            `${process.env.SERVER_URL}/bookings/${user.email}`,
            { headers: { Authorization: `Bearer ${tokenData.token}` } }
        );
        data = await res.json();
    } catch (error) {
        // Backend unreachable — fall through to the empty state
    }

    const bookings = Array.isArray(data) ? data : [];



    // console.log('Bookings:', bookings);
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

/* Next.js 16 (Cache Components) — dynamic fetch inside a Suspense boundary */
export default function Page() {
    
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-white px-4 py-10 sm:px-10 lg:px-16">
                    <div className="mx-auto max-w-6xl">
                        <h1 className="h-10 w-44 animate-pulse bg-[#f7f8fa]" />
                        <div className="mt-4 h-4 w-56 animate-pulse bg-[#f7f8fa]" />
                        <div className="mt-8 space-y-5">
                            {[0, 1, 2].map((index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-5 border border-[#e3e7ec] bg-white p-5 sm:flex-row"
                                >
                                    <div className="h-40 w-full shrink-0 animate-pulse bg-[#f7f8fa] sm:h-40 sm:w-64" />
                                    <div className="flex-1 space-y-3 py-1">
                                        <div className="h-6 w-24 animate-pulse rounded-full bg-[#f7f8fa]" />
                                        <div className="h-5 w-52 animate-pulse bg-[#f7f8fa]" />
                                        <Fragment>
                                            <div className="h-3.5 w-44 animate-pulse bg-[#f7f8fa]" />
                                            <div className="h-3.5 w-44 animate-pulse bg-[#f7f8fa]" />
                                        </Fragment>
                                        <div className="flex items-center justify-between pt-4">
                                            <div className="h-8 w-24 animate-pulse bg-[#f7f8fa]" />
                                            <div className="flex gap-3">
                                                <div className="h-9 w-24 animate-pulse bg-[#f7f8fa]" />
                                                <div className="h-9 w-24 animate-pulse bg-[#f7f8fa]" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            }
        >
            <MyBookingsContent />
        </Suspense>
    );
}
