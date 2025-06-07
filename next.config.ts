import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:7042",
  },
};

export default nextConfig;
