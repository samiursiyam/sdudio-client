'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SmartImage } from '@/components/smart-image';
import { sortNewestFirst } from '@/lib/destinations';

const padNumber = (index) => String(index + 1).padStart(2, '0');

const DestinationShowcase = ({ destinations = [] }) => {
  const [active, setActive] = useState(0);

  /* Newest 6, same order as the Fresh Picks section */
  const rooms = sortNewestFirst(destinations).slice(0, 6);

  if (rooms.length === 0) return null;

  const current = rooms[active];

  return (
    <section className="bg-[#12121a] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-10">
        <p className="text-center text-sm font-bold text-[#e61a4f]">Explore</p>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-white sm:text-4xl">
          Featured Rooms
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-white/60">
          Pick a room from the list — the place, story and price switch over
          with a smooth transition
        </p>

        {/* Showcase panel — pink list | image | white details */}
        <div className="mt-12 flex flex-col overflow-hidden lg:flex-row">
          {/* Numbered list */}
          <nav className="bg-[#e61a4f] p-3 lg:w-64 lg:shrink-0">
            <ul className="space-y-1">
              {rooms.map((destination, index) => (
                <li key={destination._id}>
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    className={`block w-full px-5 py-3 text-left text-sm font-bold transition-colors duration-300 ${
                      index === active
                        ? 'bg-white text-foreground'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <span aria-hidden className="mr-1.5">
                      {padNumber(index)}.
                    </span>
                    {destination.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Images — all pre-loaded and stacked, crossfade on every change */}
          <div className="relative min-h-64 flex-1 lg:min-h-80">
            {rooms.map((destination, index) => (
              <SmartImage
                key={destination._id}
                src={destination.imageUrl}
                alt={destination.name}
                fill
                sizes="(min-width: 1024px) 448px, 100vw"
                draggable={false}
                className={`object-cover transition-opacity duration-700 ${
                  index === active ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>

          {/* Details — name, story, price */}
          <div
            key={`panel-${current._id}`}
            className="bg-white p-8 lg:w-80 lg:shrink-0"
          >
            <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700">
              <h3 className="text-2xl font-extrabold text-foreground">
                {current.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {current.description}
              </p>
              <p className="mt-4 text-3xl font-extrabold text-[#e61a4f]">
                ${current.price}
                <span className="ml-1 text-lg font-bold text-foreground">
                  /trip
                </span>
              </p>
              <Link
                href={`/destinations/${current._id}`}
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#e61a4f] px-8 py-3.5 text-xs font-bold text-white transition-colors hover:bg-[#c9123f]"
              >
                Read more
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { DestinationShowcase };
