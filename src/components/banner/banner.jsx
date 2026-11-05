'use client';

import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

/* Brand icons */
const socialIcons = [
  {
    label: 'X (Twitter)',
    image: '/image/a.jpg',
  },
  {
    label: 'Facebook',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'YouTube',
    path: 'M23.498 6.186c-.293-1.095-1.152-1.94-2.247-2.235C19.325 3.44 12 3.44 12 3.44s-7.325 0-9.251.511c-1.096.294-1.955 1.14-2.247 2.235C-.001 8.113-.001 12-.001 12s0 3.887.501 5.814c.293 1.095 1.152 1.94 2.247 2.235 1.926.511 9.253.511 9.253.511s7.325 0 9.251-.511c1.095-.294 1.954-1.14 2.247-2.235.501-1.927.501-5.814.501-5.814s0-3.887-.501-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
];

const slides = [
  {
    outline: 'Audio',
    solid: 'Mastering',
    description:
      'Sound-treated rooms, pro consoles and everything you need — rent by the hour and create without limits.',
    image: '/image/a.jpg',
  },
  {
    outline: 'Recording',
    solid: 'Studio',
    description:
      'From podcasts to film shoots — book a fully equipped studio, walk in and start creating.',
    image: '/image/b.jpg',
  },
  {
    outline: 'Vocal',
    solid: 'Recording',
    description:
      'Ten kinds of creative spaces for makers, performers and storytellers — your next session starts here.',
    image: '/image/c.jpg',
  },
];

export function Banner() {
  const [active, setActive] = useState(0);

  /* Auto transition */
  useEffect(() => {
    const timer = setInterval(
      () => setActive((current) => (current + 1) % slides.length),
      5000
    );

    return () => clearInterval(timer);
  }, []);

  const slide = slides[active];

  return (
    <section className="relative flex min-h-[640px] flex-1 flex-col overflow-hidden bg-[#141419] md:h-[92vh]">

      {/* Background image */}
      <div className="absolute inset-0" aria-hidden>
        <img
          key={slide.image}
          src={slide.image}
          alt=""
          onError={(event) => {
            event.currentTarget.style.display = 'none';
          }}
          className="h-full w-full animate-in fade-in zoom-in-105 duration-[1500ms] object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[#12121a]/70"
      />

      {/* Vertical social icons */}
      <div className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {socialIcons.map(({ label, path, image }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            {image ? (
              <img
                src={image}
                alt={label}
                className="size-4 rounded-full object-cover"
              />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-3.5"
                aria-hidden
              >
                <path d={path} />
              </svg>
            )}
          </a>
        ))}
      </div>

      {/* Hero copy */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 sm:px-10 lg:px-16">

        <div key={active} className="py-16">
          <h1 className="text-5xl font-bold leading-[1.05] sm:text-7xl xl:text-8xl">

            <span
              className="block animate-in fade-in slide-in-from-left-10 fill-mode-both duration-700 text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.9)]"
              aria-hidden={false}
            >
              {slide.outline}
            </span>

            <span className="mt-2 block animate-in fade-in slide-in-from-left-10 fill-mode-both delay-150 duration-700 font-extrabold text-white">
              {slide.solid}
            </span>

          </h1>

          <p className="mt-6 max-w-md animate-in fade-in slide-in-from-bottom-4 fill-mode-both delay-300 duration-700 text-sm leading-relaxed text-white/70 sm:text-base">
            {slide.description}
          </p>

          <a
            href="#explore"
            className="mt-10 inline-flex w-fit animate-in fade-in fill-mode-both delay-500 duration-700 items-center justify-center rounded-full bg-[#e61a4f] px-10 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#c9123f]"
          >
            Read more
          </a>
        </div>
      </div>

      {/* Auto-rotation dots */}
      <div className="absolute bottom-8 left-6 z-20 flex items-center gap-2 lg:left-16">
        {slides.map((item, index) => (
          <button
            key={item.outline}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === active
                ? 'w-8 bg-[#e61a4f]'
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Scroll down */}
      <a
        href="#explore"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 z-20 flex size-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
      >
        <ArrowDown className="size-5 animate-bounce" aria-hidden />
      </a>

    </section>
  );
}