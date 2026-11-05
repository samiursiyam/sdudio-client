import React, { Fragment, Suspense } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Plus, Wallet } from 'lucide-react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { DestinationCard } from '@/components/destinations/destination-card';
import EditDestination from '@/components/EditDestination';
import DeleteDestination from '@/components/DeleteDestination';

const formatDate = (value) => {
    if (!value) return '—';
    return new Date(value).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    });
};

const MyListingsContent = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect('/login?redirect=/my-listings');
    }

    const user = session.user;

    /* Best-effort JWT for the external backend; pages still render when it fails */
    let jwt = null;
    try {
        const tokenData = await auth.api.getToken({ headers: await headers() });
        jwt = tokenData?.token ?? null;
    } catch {
        jwt = null;
    }

    let data = [];

    try {
        const res = await fetch(`${process.env.SERVER_URL}/destinations`, {
            headers: jwt ? { Authorization: `Bearer ${jwt}` } : {},
        });
        data = await res.json();
    } catch (error) {
        // Backend unreachable — fall through to the empty state
    }

    const email = String(user.email || '').trim().toLowerCase();
    const isOwner = (destination) =>
        String(destination?.userEmail || '').trim().toLowerCase() === email;

    /* Studios with no owner (legacy seed data) are visible to everyone,
       plus studios owned by the current user. Studios added with
       someone else's email stay hidden. */
    const listings = (Array.isArray(data) ? data : []).filter(
        (destination) => !destination?.userEmail || isOwner(destination)
    );

    /* Quick overview numbers */
    const categories = new Set(listings.map((item) => item.category).filter(Boolean));
    const totalValue = listings.reduce(
        (sum, item) => sum + (Number(item.price) || 0),
        0
    );

    return (
        <main className="min-h-screen bg-white px-4 py-10 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-normal text-foreground sm:text-4xl">
                            My Studio Listings
                        </h1>
                        <p className="mt-3 text-sm text-foreground/70">
                            Your studios, plus the shared ones
                            everyone can see

                        </p>
                    </div>

                    <Link
                        href="/add-destination"
                        className="flex items-center gap-2 bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-700"
                    >
                        <Plus className="size-4" aria-hidden />
                        Add New Space
                    </Link>
                </div>

                {/* Overview stats */}
                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="border border-[#e3e7ec] bg-white p-5">
                        <p className="text-xs font-bold uppercase tracking-wide text-foreground/50">
                            Total Listings
                        </p>
                        <p className="mt-1 text-3xl font-bold text-[#e61a4f]">
                            {listings.length}
                        </p>
                    </div>

                    <div className="border border-[#e3e7ec] bg-white p-5">
                        <p className="text-xs font-bold uppercase tracking-wide text-foreground/50">
                            Categories Used
                        </p>
                        <p className="mt-1 text-3xl font-bold text-foreground">
                            {categories.size}
                        </p>
                    </div>

                    <div className="border border-[#e3e7ec] bg-white p-5">
                        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-foreground/50">
                            <Wallet className="size-3.5" aria-hidden />
                            Combined Value
                        </p>
                        <p className="mt-1 text-3xl font-bold text-foreground">
                            ${totalValue}
                        </p>
                    </div>
                </div>

                {/* Listings grid */}
                {listings.length === 0 ? (
                    <div className="mt-8 border border-[#e3e7ec] bg-white p-10 text-center">
                        <p className="text-lg font-medium text-foreground">
                            No studios found
                        </p>
                        <p className="mt-2 text-sm text-foreground/60">
                            The studio list is empty — check that the backend is
                            running.
                        </p>
                    </div>
                ) : (
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                        {listings.map((destination) => (
                            <div key={destination._id}>
                                <DestinationCard destination={destination} />

                                {/* Owner actions — only for studios this user owns */}
                                {isOwner(destination) && (
                                    <div className="mt-3 flex items-center gap-3">
                                        <EditDestination destination={destination} />
                                        <DeleteDestination
                                            id={destination._id}
                                            redirectTo="/my-listings"
                                        />
                                    </div>
                                )}

                                <p className="mt-2 text-xs text-foreground/60">
                                    Added: {formatDate(destination.createdAt)}
                                </p>
                            </div>
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
                        <div className="flex items-start justify-between gap-4">
                            <div className="w-full">
                                <h1 className="h-10 w-72 animate-pulse bg-[#f7f8fa]" />
                                <div className="mt-4 h-4 w-56 animate-pulse bg-[#f7f8fa]" />
                            </div>
                            <div className="h-11 w-48 shrink-0 animate-pulse bg-[#f7f8fa]" />
                        </div>
                        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {[0, 1, 2].map((index) => (
                                <Fragment key={index}>
                                    <div className="h-24 animate-pulse bg-[#f7f8fa]" />
                                </Fragment>
                            ))}
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                            {[0, 1, 2, 3].map((index) => (
                                <div key={index} className="space-y-3">
                                    <div className="aspect-[19/10] animate-pulse bg-[#f7f8fa]" />
                                    <div className="h-4 w-40 animate-pulse bg-[#f7f8fa]" />
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            }
        >
            <MyListingsContent />
        </Suspense>
    );
}
