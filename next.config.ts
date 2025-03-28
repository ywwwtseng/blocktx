import { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "www.tbstat.com",
      },
    ],
  },
};

export default nextConfig;
