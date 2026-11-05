'use client';

import { Star } from 'lucide-react';
import { SmartImage } from '@/components/smart-image';

/* Quick numbers that summarize the studio network */
const stats = [
  { value: '10+', label: 'Studio Spaces' },
  { value: '150+', label: 'Sessions Hosted' },
  { value: '98%', label: 'Happy Creators' },
  { value: '24/7', label: 'Support' },
];

export function AboutUs() {
  return (
    <section
      id="about-us"
      className="scroll-mt-20 bg-[#12121a] py-16 text-white sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          {/* Image side */}
          <div className="relative">
            <div className="relative aspect-[4/3]">
              <SmartImage
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=900&auto=format&fit=crop"
                alt="Inside the Wanderlast podcast studio"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="rounded-3xl object-cover"
              />
            </div>
            {/* Floating rating chip */}
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-3 text-foreground shadow-xl sm:left-8">
              <Star className="size-6 fill-[#e61a4f] text-[#e61a4f]" aria-hidden />
              <div>
                <p className="text-sm font-extrabold">4.9 / 5 rating</p>
                <p className="text-xs text-foreground/60">from 320+ creators</p>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div>
            <p className="text-3xl text-[#f9a1bd] [font-family:var(--font-hand)] sm:text-4xl">
              About us
            </p>
            <h2 className="mt-1 text-3xl font-extrabold sm:text-4xl">
              The home for every creative session
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/70">
              Wanderlast started with one recording room and a simple idea —
              creators should spend their time making, not hunting for gear.
              Today we host a network of studios across the city: photo
              stages, podcast lounges, music suites and editing bays, all
              bookable in minutes.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Every space is sound-treated, fully equipped and looked after by
              our own technicians — so your session starts on time and
              sounds exactly the way you imagined it.
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 text-center transition-colors duration-300 hover:border-[#e61a4f]/60"
            >
              <p className="text-3xl font-extrabold text-[#f9a1bd] sm:text-4xl">
                {value}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-white/60">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
