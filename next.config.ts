import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '*', // Allows any hostname (including local IPs)
        port: '3000',  // Match the port your Next.js app is running on
        pathname: '/uploads/**', // Restrict access to the uploads directory
      },
    ],
  },
};

export default nextConfig;
