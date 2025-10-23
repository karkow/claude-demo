import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Maintain Next.js 15 behavior for image optimization
    minimumCacheTTL: 60, // Keep 60s cache (v16 default is 4 hours)
    qualities: [50, 75, 85, 100], // Support multiple quality levels (v16 default is [75] only)
    maximumRedirects: 5, // Allow redirects (v16 default is 3)
  },
};

export default nextConfig;
