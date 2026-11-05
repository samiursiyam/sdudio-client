"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { SmartImage } from "@/components/smart-image";

/* Fallback set — shown before the backend answers (or if it is down).
   These all link to the Spaces page since they have no detail page. */
const FALLBACK_SPACES = [
  {
    src: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=800&auto=format&fit=crop",
    alt: "Podcast studio",
    href: "/destinations",
  },
  {
    src: "https://images.unsplash.com/photo-1544197150-a99e707d89da?q=80&w=800&auto=format&fit=crop",
    alt: "Streaming studio",
    href: "/destinations",
  },
  {
    src: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop",
    alt: "Rehearsal studio",
    href: "/destinations",
  },
  {
    src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop",
    alt: "Music suite",
    href: "/destinations",
  },
  {
    src: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
    alt: "Photo studio",
    href: "/destinations",
  },
  {
    src: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=800&auto=format&fit=crop",
    alt: "Video editing studio",
    href: "/destinations",
  },
  {
    src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
    alt: "Art workshop",
    href: "/destinations",
  },
  {
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=800&auto=format&fit=crop",
    alt: "Film stage",
    href: "/destinations",
  },
];

/* Faster drift: pixels per millisecond (~80 px/sec) — বাম থেকে ডানে */
const SPEED = 0.08;
/* Mouse/touch moves beyond this count as a drag, not a click */
const DRAG_THRESHOLD = 6;

export function FooterGallery({ destinations = [] }) {
  /* Real listings from the backend (fetched once on the server and
     passed down) — every tile links to its detail page.
     Falls back to static tiles (linking to /destinations) if empty. */
  const tiles = destinations
    .filter((item) => item?.imageUrl && item?._id)
    .map((item) => ({
      src: item.imageUrl,
      alt: item.name || "Studio space",
      href: `/destinations/${item._id}`,
    }));
  const items = tiles.length > 0 ? tiles : FALLBACK_SPACES;

  const trackRef = useRef(null);

  /* Marquee + drag state kept in refs so the rAF loop never re-renders */
  const offsetRef = useRef(0);
  const halfRef = useRef(0);
  const dragRef = useRef({ down: false, startX: 0, startOffset: 0, moved: false });

  /* Keep one full track measured so the loop can wrap seamlessly */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);

    /* rAF loop — images drift left → right, paused while you hold them */
    let raf;
    let last = performance.now();

    const tick = (now) => {
      const delta = Math.min(now - last, 100);
      last = now;

      if (!dragRef.current.down && halfRef.current > 0) {
        offsetRef.current += delta * SPEED;
        /* keep offset inside (-half, 0] so the doubled track loops forever */
        const half = halfRef.current;
        offsetRef.current = ((offsetRef.current % half) + half) % half - half;
      }

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  /* Grab the track with the mouse OR a finger */
  const onPointerDown = (event) => {
    const track = trackRef.current;
    dragRef.current = {
      down: true,
      startX: event.clientX,
      startOffset: offsetRef.current,
      moved: false,
    };
    track?.setPointerCapture?.(event.pointerId);
  };

  /* While held, the track follows your pointer in both directions */
  const onPointerMove = (event) => {
    if (!dragRef.current.down) return;

    const dx = event.clientX - dragRef.current.startX;
    if (Math.abs(dx) > DRAG_THRESHOLD) dragRef.current.moved = true;

    offsetRef.current = dragRef.current.startOffset + dx;
  };

  const endDrag = (event) => {
    dragRef.current.down = false;
    trackRef.current?.releasePointerCapture?.(event.pointerId);
  };

  /* After a real drag, swallow the click so the link doesn't fire */
  const onTrackClick = (event) => {
    if (dragRef.current.moved) event.preventDefault();
  };

  return (
    <div className="relative overflow-hidden bg-[#17151d]">
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClick={onTrackClick}
        className="flex w-max cursor-grab select-none gap-2 py-3 [touch-action:pan-y] active:cursor-grabbing sm:gap-3"
      >
        {/* Track is doubled (aria-hidden second copy) for the seamless loop */}
        {[false, true].map((isClone) => (
          <div
            key={isClone ? "clone" : "main"}
            aria-hidden={isClone}
            className="flex gap-2 sm:gap-3"
          >
            {items.map((item, index) => (
              <Link
                key={`${item.href}-${index}`}
                href={item.href}
                draggable={false}
                tabIndex={isClone ? -1 : 0}
                className="group relative block h-32 w-52 shrink-0 overflow-hidden rounded-xl sm:h-44 sm:w-72 sm:rounded-2xl lg:h-52 lg:w-80"
              >
                <SmartImage
                  src={item.src}
                  alt={isClone ? "" : item.alt}
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 208px"
                  draggable={false}
                  onError={(event) => {
                    event.currentTarget.style.opacity = "0.3";
                  }}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Name reveal on hover */}
                <span className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2.5 pt-8 text-xs font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-sm">
                  {item.alt}
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Edge fades so tiles slide in/out softly */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#17151d] to-transparent sm:w-20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#17151d] to-transparent sm:w-20"
      />
    </div>
  );
}
