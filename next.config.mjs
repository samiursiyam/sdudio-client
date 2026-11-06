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
  /* The browser reaches the Express backend through the same-origin
     /backend/* route handler (src/app/backend/[...path]/route.js),
     which verifies the better-auth session and re-asserts identity
     with x-internal-secret + x-user-* headers — no CORS and no
     public backend URL in the client bundle. */
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
