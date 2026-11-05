import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { SmartImage } from '@/components/smart-image';
import { sortNewestFirst } from '@/lib/destinations';

export function FeaturedDestinations({ destinations = [] }) {
  /* Newest 6 destinations */
  const fresh = sortNewestFirst(destinations).slice(0, 6);

  if (fresh.length === 0) {
    return (
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-10">
          <p className="text-center text-sm text-foreground/60">
            No studios to show yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="explore" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-10">
        {/* Section heading */}
        <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#e61a4f]">
          <span aria-hidden className="h-px w-8 bg-[#e61a4f]/40" />
          Fresh Picks
          <span aria-hidden className="h-px w-8 bg-[#e61a4f]/40" />
        </p>
        <h2 className="mt-4 text-center text-3xl font-extrabold leading-tight text-foreground sm:text-4xl">
          Freshly Added
          <br />
          Studio Spaces
        </h2>

        <div className="mt-14 space-y-16 sm:mt-20 sm:space-y-20">
          {fresh.map((destination, index) => {
            const flip = index % 2 === 1;

            return (
              <Link
                key={destination._id}
                href={`/destinations/${destination._id}`}
                className="group grid items-center gap-8 md:grid-cols-2 md:gap-14"
              >
                {/* Image — alternates left / right like the reference design */}
                <div
                  className={`relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted shadow-sm transition-shadow duration-300 group-hover:shadow-xl ${
                    flip ? 'md:order-2' : ''
                  }`}
                >
                  <SmartImage
                    src={destination.imageUrl}
                    alt={destination.name}
                    fill
                    sizes="(min-width: 768px) 460px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Category chip on top of the image */}
                  <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-foreground backdrop-blur-sm">
                    {destination.category}
                  </span>
                  {/* Big row number, faint outline style */}
                  <span
                    aria-hidden
                    className="absolute bottom-3 right-5 text-5xl font-extrabold text-white/70 sm:text-6xl"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Details */}
                <div className={flip ? 'md:order-1' : ''}>
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#e61a4f]">
                    <MapPin className="size-3.5" aria-hidden />
                    {destination.country}
                  </p>

                  <h3 className="mt-2 text-2xl font-extrabold leading-snug text-foreground sm:text-[28px]">
                    {destination.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                    {destination.description}
                  </p>

                  <p className="mt-4 text-2xl font-bold text-foreground">
                    ${destination.price}
                    <span className="ml-1.5 text-xs font-medium text-foreground/60">
                      / {destination.duration}
                    </span>
                  </p>

                  {/* View Details — pill button with arrow circle */}
                  <span className="mt-6 inline-flex items-center gap-3 rounded-full border border-foreground/15 py-2.5 pl-6 pr-2.5 text-sm font-bold text-foreground transition-all duration-300 group-hover:border-[#e61a4f] group-hover:bg-[#e61a4f] group-hover:text-white">
                    View Details
                    <span className="flex size-7 items-center justify-center rounded-full bg-[#e61a4f] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#e61a4f]">
                      <ArrowRight className="size-3.5" aria-hidden />
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
