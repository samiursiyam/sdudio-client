'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SmartImage } from '@/components/smart-image';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Camera,
  Clapperboard,
  Footprints,
  Music,
  Music2,
  Palette,
  PartyPopper,
  Podcast,
  Radio,
  Scissors,
} from 'lucide-react';

/* Studio-space categories — draggable carousel after the banner */
const categories = [
  {
    name: 'Photo Studio',
    description: 'Lighting rigs, backdrops and everything a shoot needs.',
    image:
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop',
    icon: Camera,
  },
  {
    name: 'Film Stage / Cinema Studio',
    description: 'Full production stages for shoots and film sets.',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop',
    icon: Clapperboard,
  },
  {
    name: 'Podcast Lounge',
    description: 'Cozy acoustics and gear for conversations that matter.',
    image:
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop',
    icon: Podcast,
  },
  {
    name: 'Music Suite',
    description: 'Sound-treated rooms for recording and mixing.',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop',
    icon: Music,
  },
  {
    name: 'Art Workshop',
    description: 'Bright open desks for painters and makers.',
    image:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
    icon: Palette,
  },
  {
    name: 'Dance Studio',
    description: 'Mirrors, sprung floors and space to move.',
    image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop',
    icon: Footprints,
  },
  {
    name: 'Rehearsal Studio',
    description: 'Loud-friendly rooms for bands and performers.',
    image:
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop',
    icon: Music2,
  },
  {
    name: 'Podcast & Streaming',
    description: 'Multi-camera setups ready to go live in minutes.',
    image:
      'https://images.unsplash.com/photo-1544197150-a99e707d89da?q=80&w=800&auto=format&fit=crop',
    icon: Radio,
  },
  {
    name: 'Video Editing',
    description: 'Color-accurate suites with the tools you need.',
    image:
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4db44?q=80&w=800&auto=format&fit=crop',
    icon: Scissors,
  },
  {
    name: 'Creative Event Space',
    description: 'Flexible halls for launches, workshops and shoots.',
    image:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=800&auto=format&fit=crop',
    icon: PartyPopper,
  },
];

export function CategoriesShowcase() {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  /* Drag state kept in refs so dragging never re-renders React */
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const hoverRef = useRef(false);

  /* Start following the pointer — mouse, touch and pen all drag the
     track (vertical page scrolling still works: the track only
     claims horizontal gestures via [touch-action:pan-y]) */
  const onPointerDown = (event) => {
    const track = trackRef.current;
    if (!track) return;

    /* Capture so the drag keeps following the pointer even when the
       finger/mouse leaves the track */
    track.setPointerCapture?.(event.pointerId);

    drag.current = {
      down: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      moved: false,
    };
    setDragging(true);
  };

  /* While the button is held, the track follows the mouse */
  const onPointerMove = (event) => {
    if (!drag.current.down) return;
    const track = trackRef.current;
    if (!track) return;

    const dx = event.clientX - drag.current.startX;
    if (Math.abs(dx) > 5) drag.current.moved = true;
    track.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = () => {
    drag.current.down = false;
    setDragging(false);
  };

  /* After a real drag, don't let the card's link fire */
  const handleCardClick = (event) => {
    if (drag.current.moved) event.preventDefault();
  };

  /* Gentle auto-play every 4s — pauses on hover or while dragging,
     and loops back to the first card at the end */
  useEffect(() => {
    const timer = setInterval(() => {
      const track = trackRef.current;
      if (!track || hoverRef.current || drag.current.down) return;

      const maxScroll = track.scrollWidth - track.clientWidth;
      if (track.scrollLeft >= maxScroll - 8) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: 340, behavior: 'smooth' });
      }
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-10">
        <p className="flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#e61a4f]">
          <span aria-hidden className="h-px w-8 bg-[#e61a4f]/40" />
          What we offer
          <span aria-hidden className="h-px w-8 bg-[#e61a4f]/40" />
        </p>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-foreground sm:text-4xl">
          Rent a Studio Space
        </h2>
        <p className="mt-2 text-center text-sm text-foreground/60">
          Ten kinds of creative spaces — drag or use the arrows to explore
        </p>

        <div
          className="relative mt-10"
          onMouseEnter={() => (hoverRef.current = true)}
          onMouseLeave={() => (hoverRef.current = false)}
        >
          {/* Left arrow */}
          <button
            type="button"
            onClick={() =>
              trackRef.current?.scrollBy({ left: -340, behavior: 'smooth' })
            }
            aria-label="Previous categories"
            className="absolute -left-2 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md transition-all hover:-translate-y-1/2 hover:scale-110 sm:flex lg:-left-6"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </button>

          {/* Draggable card track */}
          <div
            ref={trackRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
            className={`flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 select-none [scrollbar-width:none] [touch-action:pan-y] [&::-webkit-scrollbar]:hidden ${
              dragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.name}
                  href={`/categories?category=${category.name}`}
                  onClick={handleCardClick}
                  className="group w-72 flex-none snap-start overflow-hidden rounded-2xl border border-[#e3e7ec] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#e61a4f]/40 hover:shadow-xl"
                >
                  {/* Image with floating icon chip */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <SmartImage
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="288px"
                      draggable={false}
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute left-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm">
                      <Icon className="size-4 text-[#e61a4f]" aria-hidden />
                    </span>
                  </div>

                  {/* Title + description */}
                  <div className="px-5 pb-6 pt-5 text-center">
                    <h3 className="text-lg font-extrabold text-foreground">
                      {category.name}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-foreground/70">
                      {category.description}
                    </p>

                    {/* Read more pill — arrow slides out on hover */}
                    <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#e61a4f] px-6 py-2 text-xs font-bold text-white transition-all duration-300 group-hover:bg-[#c9123f]">
                      Read more
                      <ArrowUpRight
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() =>
              trackRef.current?.scrollBy({ left: 340, behavior: 'smooth' })
            }
            aria-label="Next categories"
            className="absolute -right-2 top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md transition-all hover:-translate-y-1/2 hover:scale-110 sm:flex lg:-right-6"
          >
            <ArrowRight className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}
