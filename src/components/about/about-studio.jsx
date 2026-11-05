'use client';

import Link from 'next/link';
import { SmartImage } from '@/components/smart-image';
import {
  Guitar,
  Building2,
  Headphones,
  SlidersHorizontal,
  Waves,
  FileCheck,
} from 'lucide-react';

/* Features sit 3 on the left and 3 on the right of the studio image */
const leftFeatures = [
  {
    icon: Guitar,
    title: 'Live Instruments',
    text: 'Guitars, drums and keyboards ready in every room — plug in and play from the moment you arrive.',
  },
  {
    icon: Building2,
    title: 'Multiple Studios',
    text: 'Ten kinds of creative spaces across the city, so you always find the room that fits your session.',
  },
  {
    icon: Headphones,
    title: 'Professional Equipment',
    text: 'Broadcast-grade microphones, monitors and mixers maintained by our in-house technicians.',
  },
];

const rightFeatures = [
  {
    icon: SlidersHorizontal,
    title: 'Own Arrangements',
    text: 'Customize the room layout, lighting and gear before your session — everything is set the way you want.',
  },
  {
    icon: Waves,
    title: 'Extra Sound-Quality',
    text: 'Sound-treated acoustics and calibrated monitoring give every recording a clean, studio finish.',
  },
  {
    icon: FileCheck,
    title: 'Rights Protection',
    text: 'Everything you record stays yours — full ownership and privacy on every single session.',
  },
];

export function AboutStudio() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-10">
        {/* Bold intro paragraph */}
        <p className="mx-auto max-w-3xl text-center text-xl font-extrabold leading-relaxed text-foreground sm:text-2xl">
          Book the perfect room for your sound — lighting rigs, backdrops and
          gear for{' '}
          <span className="text-[#e61a4f]">
            every kind of creative work
          </span>
          . From first take to final mix, our spaces are built for sessions
          that feel effortless.
        </p>

        {/* Features left / image center / features right */}
        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.2fr_1fr]">
          {/* Left column */}
          <div className="space-y-10">
            {leftFeatures.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <Icon
                  className="size-9 shrink-0 text-[#e61a4f] sm:size-11"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div>
                  <h3 className="text-base font-extrabold text-foreground sm:text-lg">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center image */}
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <SmartImage
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=900&auto=format&fit=crop"
                alt="Studio speakers and a guitar in a recording room"
                fill
                sizes="(min-width: 1024px) 470px, 448px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-10">
            {rightFeatures.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <Icon
                  className="size-9 shrink-0 text-[#e61a4f] sm:size-11"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div>
                  <h3 className="text-base font-extrabold text-foreground sm:text-lg">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground/60">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About studio pill button */}
        <div className="mt-14 flex justify-center">
          <Link
            href="#about-us"
            className="rounded-full bg-[#e61a4f] px-14 py-5 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#c9123f]"
          >
            About studio
          </Link>
        </div>
      </div>
    </section>
  );
}
