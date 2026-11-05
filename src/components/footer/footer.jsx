import { Send } from "lucide-react";
import Link from "next/link";
import { FooterGallery } from "@/components/footer/footer-gallery";

/* Brand icons (same inline SVG approach as the navbar) */
const socialIcons = [
  {
    label: "X (Twitter)",
    path: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  },
  {
    label: "Facebook",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "YouTube",
    path: "M23.498 6.186c-.293-1.095-1.152-1.94-2.247-2.235C19.325 3.44 12 3.44 12 3.44s-7.325 0-9.251.511c-1.096.294-1.955 1.14-2.247 2.235C-.001 8.113-.001 12-.001 12s0 3.887.501 5.814c.293 1.095 1.152 1.94 2.247 2.235 1.926.511 9.253.511 9.253.511s7.325 0 9.251-.511c1.095-.294 1.954-1.14 2.247-2.235.501-1.927.501-5.814.501-5.814s0-3.887-.501-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

const sitemapLinks = [
  { label: "Home", href: "/" },
  { label: "Spaces", href: "/destinations" },
  { label: "Categories", href: "/categories" },
  { label: "My Bookings", href: "/my-bookings" },
];

export function Footer({ destinations = [] }) {
  return (
    <footer className="bg-[#17151d] text-white">
      {/* Slow-moving studio gallery — click for details, hold to drag (left→right) */}
      <FooterGallery destinations={destinations} />

      {/* Main footer content */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.1fr_0.8fr_1.1fr_1.2fr]">
        {/* Brand */}
        <div>
          <Link href="/" aria-label="Wanderlast home" className="flex items-center gap-2">
            <span aria-hidden className="size-2.5 rounded-full bg-[#e61a4f]" />
            <span className="text-2xl font-extrabold uppercase tracking-wide">
              Wanderlast
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            Premium studio spaces for creators — photo, film, music, podcast
            and more. Book by the hour, create without limits.
          </p>

          {/* Social icons */}
          <div className="mt-6 flex items-center gap-5">
            {socialIcons.map(({ label, path }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-white/70 transition-colors hover:text-[#e61a4f]"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Sitemap */}
        <div>
          <h3 className="text-lg font-extrabold text-[#e61a4f]">Sitemap</h3>
          <ul className="mt-6 flex flex-col items-start gap-4">
            {sitemapLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="group flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-[#e61a4f]"
                >
                  <span aria-hidden className="text-[10px] text-[#e61a4f]">
                    »
                  </span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 className="text-lg font-extrabold text-[#e61a4f]">Contact info</h3>

          <div className="mt-6 flex items-start gap-3">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mt-0.5 size-4 shrink-0 text-[#e61a4f]"
              aria-hidden
            >
              <path d="M12 0C7.58 0 4 3.58 4 8c0 5.95 8 16 8 16s8-10.05 8-16c0-4.42-3.58-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
            </svg>
            <div>
              <p className="text-sm font-bold">Our location:</p>
              <p className="mt-1 text-sm text-white/60">
                7516 Studio Ave, Creative District, USA
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mt-0.5 size-4 shrink-0 text-[#e61a4f]"
              aria-hidden
            >
              <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02z" />
            </svg>
            <div>
              <p className="text-sm font-bold">Hotline:</p>
              <a
                href="tel:+7869011622"
                className="mt-1 block text-sm text-white/60 transition-colors hover:text-white"
              >
                +786 901-16-22
              </a>
              <a
                href="tel:+4930760932311"
                className="block text-sm text-white/60 transition-colors hover:text-white"
              >
                +493 076-093-23-11
              </a>
            </div>
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-lg font-extrabold text-[#e61a4f]">Subscribe</h3>
          <form
            action="#subscribe"
            className="relative mt-6 max-w-[320px]"
          >
            <input
              type="email"
              required
              placeholder="Your email..."
              aria-label="Email address"
              className="h-12 w-full rounded-full bg-white pl-5 pr-14 text-sm text-foreground placeholder:text-foreground/50 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#e61a4f] text-white transition-colors hover:bg-[#c9123f]"
            >
              <Send className="size-4" aria-hidden />
            </button>
          </form>

          <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-xs text-white/60">
            <input
              type="checkbox"
              required
              className="mt-0.5 size-3.5 accent-[#e61a4f]"
            />
            I have read and agree to the{" "}
            <span className="font-semibold text-white">terms &amp; conditions</span>
          </label>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#100f15] py-5 text-center text-sm font-semibold text-[#e61a4f]">
        © 2026 Wanderlast. All rights reserved.
      </div>
    </footer>
  );
}
