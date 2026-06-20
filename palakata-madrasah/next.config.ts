import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Images are served from Cloudflare R2 (already compressed to WebP before
  // upload) and from /public — so Next's optimizer is disabled. See spec §2.
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        // Cloudflare R2 public bucket. Replace hostname via env in production.
        hostname: "**.r2.dev",
      },
      {
        protocol: "https",
        hostname: "**.r2.cloudflarestorage.com",
      },
    ],
  },
};

export default nextConfig;
