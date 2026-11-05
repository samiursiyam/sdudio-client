"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
  {
    quote:
      '"The Podcast Lounge Was Flawless. Acoustics, Mics And Lighting All On Point — We Recorded An Entire Season In One Weekend."',
    name: "Michael Chen",
    location: "Singapore",
    photo: "/image/traveler-1.jpg",
  },
  {
    quote:
      "'The Film Stage Exceeded All Expectations. Grip Equipment, Power And The Crew Support Were World Class. Highly Recommend!'",
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/image/traveler-2.jpg",
  },
  {
    quote:
      '"From Booking To Check-Out, Everything Was Smooth. The Music Suite Sounded Incredible And The Rate Was More Than Fair."',
    name: "David Okafor",
    location: "London, UK",
    photo: "/image/traveler-1.jpg",
  },
  {
    quote:
      "'The Creative Event Space Was A Dream For Our Launch. Immaculate Rooms, Wonderful Staff And Everything Ready On Time.'",
    name: "Priya Sharma",
    location: "Toronto, Canada",
    photo: "/image/traveler-2.jpg",
  },
];

export function Testimonials() {
  const trackRef = useRef(null);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    if (!card) return;
    const gap = 24;
    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header row: heading + arrows */}
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-medium text-foreground sm:text-4xl lg:text-[42px] lg:leading-tight">
              What Travelers Say
            </h2>
            <p className="mt-1.5 text-sm text-foreground/60">
              Real experiences from creators who rent with us
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => scrollByCard(-1)}
              className="flex size-11 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors hover:border-cyan-500 hover:bg-cyan-500 hover:text-white"
            >
              <ArrowLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => scrollByCard(1)}
              className="flex size-11 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-colors hover:border-cyan-500 hover:bg-cyan-500 hover:text-white"
            >
              <ArrowRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        {/* Slider track */}
        <ul
          ref={trackRef}
          className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth sm:mt-10 sm:gap-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map(({ quote, name, location, photo }) => (
            <li
              key={name}
              className="flex w-full flex-none snap-start gap-4 border border-border/70 bg-white p-5 sm:gap-6 sm:p-6 md:w-[calc(50%-8px)] lg:w-[calc(50%-12px)]"
            >
              <div className="flex min-w-0 flex-1 flex-col">
                <p className="text-base leading-[1.45] text-foreground sm:text-lg">
                  {quote}
                </p>
                <div className="mt-auto pt-6">
                  <p className="text-xs font-semibold text-cyan-600">
                    &mdash; {name}
                  </p>
                  <p className="mt-0.5 text-xs text-foreground/50">
                    {location}
                  </p>
                </div>
              </div>

              {/* Traveler photo */}
              <div className="relative aspect-square w-28 shrink-0 sm:w-36 lg:w-[150px]">
                <Image
                  src={photo}
                  alt={name}
                  fill
                  sizes="(min-width: 1024px) 150px, (min-width: 640px) 144px, 112px"
                  className="object-cover object-top"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
