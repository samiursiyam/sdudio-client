import Image from 'next/image';

/* Hosts allowed in next.config.mjs (images.remotePatterns).
   Anything else falls back to an unoptimized <img> so that
   user-entered image URLs never crash the page. */
const OPTIMIZED_HOSTS = new Set([
  'images.unsplash.com',
  'localhost',
  '127.0.0.1',
]);

function canOptimize(src) {
  if (typeof src !== 'string' || src.length === 0) return false;
  /* Local paths (/foo.jpg) are always optimizable */
  if (src.startsWith('/')) return true;
  try {
    return OPTIMIZED_HOSTS.has(new URL(src).hostname);
  } catch {
    return false;
  }
}

/* Drop-in wrapper around next/image. Optimizes known hosts;
   renders the original URL untouched for every other host. */
export function SmartImage({ src, alt = '', ...props }) {
  return <Image src={src} alt={alt} {...props} unoptimized={!canOptimize(src)} />;
}
