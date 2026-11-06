/** Base URL of the Express backend — used for the same-origin
    proxy below and to allow its host in next/image. */
const SERVER_URL = (process.env.SERVER_URL || 'http://localhost:5000').replace(/\/+$/, '');

/* Parse the backend URL so any protocol/host/port works in production
   without editing this file (falls back to localhost in dev). */
const backendPattern = (() => {
  try {
    const { protocol, hostname, port } = new URL(SERVER_URL);
    return {
      protocol: protocol.replace(':', ''),
      hostname,
      ...(port ? { port } : {}),
    };
  } catch {
    return { protocol: 'http', hostname: 'localhost', port: '5000' };
  }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: false,
  partialPrefetching: false,
  reactCompiler: true,
  /* Browser calls the backend through /backend/* on this same origin —
     no CORS config and no NEXT_PUBLIC URL needed in production.
     The browser's Authorization header is forwarded untouched. */
  async rewrites() {
    return [
      { source: '/backend/:path*', destination: `${SERVER_URL}/:path*` },
    ];
  },
  /* Image optimization — resize + convert (WebP/AVIF) remote images
     through the built-in next/image optimizer */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      backendPattern,
      { protocol: 'http', hostname: 'localhost', port: '5000' },
      { protocol: 'http', hostname: '127.0.0.1', port: '5000' },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
