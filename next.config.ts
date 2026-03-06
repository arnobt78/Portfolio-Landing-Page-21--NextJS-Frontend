import type { NextConfig } from 'next';

/** Next.js config: strict mode, image formats/sizes, TypeScript build. */
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Next/Image allowed formats and breakpoints for srcset
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
