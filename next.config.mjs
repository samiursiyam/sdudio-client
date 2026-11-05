/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: false,
  partialPrefetching: false,
  reactCompiler: true,
  /* Image optimization — resize + convert (WebP/AVIF) remote images
     through the built-in next/image optimizer */
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
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
