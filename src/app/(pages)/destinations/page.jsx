import React, { Suspense, Fragment } from 'react';
import { DestinationsGrid } from "@/components/destinations/destinations-grid";
import { getDestinations } from "@/lib/destinations-server";

const DestinationPage = async() => {
    const data = await getDestinations();

    return (
        <main className="min-h-screen bg-white px-4 py-10 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-3xl font-normal text-foreground sm:text-4xl">
                    Explore Studio Spaces
                </h1>
                <p className="mt-3 text-sm text-foreground/70">
                    Rent the perfect studio for your next session from our curated collection
                </p>

                <DestinationsGrid destinations={Array.isArray(data) ? data : []} />
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
                        <h1 className="text-3xl font-normal text-foreground sm:text-4xl">
                            Explore All Destinations
                        </h1>
                        <p className="mt-3 text-sm text-foreground/70">
                            Find your perfect studio space from our curated collection
                        </p>
                        <div className="mt-6 h-11 animate-pulse border border-[#e3e7ec] bg-[#f7f8fa]" />
                        <div className="mt-5 h-4 w-40 animate-pulse bg-[#f7f8fa]" />
                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <Fragment key={index}>
                                    <div className="aspect-[19/10] w-full animate-pulse bg-[#f7f8fa]" />
                                    <div className="h-3 w-20 animate-pulse bg-[#f7f8fa]" />
                                    <div className="h-4 w-40 animate-pulse bg-[#f7f8fa]" />
                                    <div className="h-3 w-28 animate-pulse bg-[#f7f8fa]" />
                                </Fragment>
                            ))}
                        </div>
                    </div>
                </main>
            }
        >
            <DestinationPage />
        </Suspense>
    );
}