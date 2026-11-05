
import React, { Suspense } from 'react';
import { notFound } from 'next/navigation';
import {
    ArrowLeft,
    CalendarDays,
    Check,
    MapPin,
    Star,
} from 'lucide-react';

import Link from 'next/link';
import EditDestination from '@/components/EditDestination';
import DeleteDestination from '@/components/DeleteDestination';
import BookingCard from '@/components/BookingCard';
import { SaveButton } from '@/components/saved/save-button';
import { SmartImage } from '@/components/smart-image';
import { getDestination } from '@/lib/destinations-server';

const FALLBACK_HIGHLIGHTS = [
    'Broadcast-quality lighting rig',
    'Sound-treated acoustics',
    '4K multi-camera capture',
    'High-speed Wi-Fi & power backup',
    'Dedicated technician support',
];

const DestinationDetail = async ({ id }) => {
    const destination = await getDestination(id);

    if (!destination?._id) notFound();

    const {
        name,
        country,
        description,
        duration,
        imageUrl,
        price,
        category,
        rating,
        reviews,
    } = destination;

    const highlights =
        Array.isArray(destination.highlights) &&
        destination.highlights.length > 0
            ? destination.highlights
            : description
                ? description
                    .replace(/[.!?]$/, '')
                    .split(/,\s*/)
                    .filter(Boolean)
                : FALLBACK_HIGHLIGHTS;

    return (
        <main className="min-h-screen bg-white px-4 py-10 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">

                {/* Top bar */}
                <div className="flex items-center justify-between">
                    <Link
                        href="/destinations"
                        className="flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="size-4" aria-hidden />
                        Back to All Spaces
                    </Link>

                    <div className="flex items-center gap-2">
                        <SaveButton destinationId={destination._id} className="mr-1" />

                        <EditDestination destination={destination} />

                        <DeleteDestination id={id} />
                    </div>
                </div>

                {/* Hero image */}
                <div className="relative mt-6 aspect-[19/8] w-full overflow-hidden bg-[#eef7f8]">
                    <SmartImage
                        src={imageUrl}
                        alt={name}
                        fill
                        preload
                        sizes="(min-width: 1280px) 1152px, 100vw"
                        className="object-cover"
                    />
                </div>



                

                <div className="mt-4 border-t border-[#e3e7ec]" />

                {/* Content + Booking Card */}
                <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">

                    {/* Destination Information */}
                    <div>
                        <p className="flex items-center gap-1.5 text-xs text-foreground/60">
                            <MapPin className="size-3.5 text-cyan-600" aria-hidden />

                            {country}

                            {category && (
                                <span className="text-foreground/40">
                                    • {category}
                                </span>
                            )}
                        </p>

                        <h1 className="mt-1 text-4xl font-normal text-foreground sm:text-[40px]">
                            {name}
                        </h1>

                        {(rating || reviews) && (
                            <p className="mt-3 flex items-center gap-5 text-sm text-foreground/70">
                                <span className="flex items-center gap-1.5">
                                    <Star
                                        className="size-4 fill-green-600 text-green-600"
                                        aria-hidden
                                    />

                                    <span className="font-semibold text-foreground">
                                        {rating ?? '4.9'}
                                    </span>

                                    {reviews
                                        ? `(${reviews} reviews)`
                                        : '(234 reviews)'}
                                </span>

                                <span className="flex items-center gap-1.5">
                                    <CalendarDays
                                        className="size-4 text-cyan-600"
                                        aria-hidden
                                    />
                                    {duration}
                                </span>
                            </p>
                        )}

                        {/* Overview */}
                        <h2 className="mt-8 text-xl text-foreground">
                            Overview
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/70">
                            {description}
                        </p>

                        {/* Highlights */}
                        <h2 className="mt-8 text-xl text-foreground">
                            Highlights
                        </h2>

                        <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                            {highlights.map((highlight, index) => (
                                <li
                                    key={index}
                                    className="flex items-center gap-2 text-sm text-foreground/70"
                                >
                                    <Check
                                        className="size-4 shrink-0 text-green-600"
                                        aria-hidden
                                    />
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Booking Card */}
                    <BookingCard destination={destination} />

                </div>
            </div>
        </main>
    );
};

const DestinationDetailPage = async ({ params }) => {
    const { id } = await params;

    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-white px-4 py-10 sm:px-10 lg:px-16">
                    <div className="mx-auto max-w-6xl">
                        <div className="h-4 w-36 animate-pulse bg-[#f7f8fa]" />

                        <div className="mt-6 aspect-[19/8] w-full animate-pulse bg-[#f7f8fa]" />

                        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
                            <div>
                                <div className="h-3 w-24 animate-pulse bg-[#f7f8fa]" />
                                <div className="mt-3 h-9 w-72 animate-pulse bg-[#f7f8fa]" />
                                <div className="mt-8 h-5 w-28 animate-pulse bg-[#f7f8fa]" />
                                <div className="mt-2 h-4 w-full max-w-2xl animate-pulse bg-[#f7f8fa]" />
                            </div>

                            <div className="h-72 animate-pulse bg-[#f7f8fa]" />
                        </div>
                    </div>
                </main>
            }
        >
            <DestinationDetail id={id} />
        </Suspense>
    );
};

export default DestinationDetailPage;
