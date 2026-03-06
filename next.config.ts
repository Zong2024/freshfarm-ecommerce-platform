import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "", // 如果網址沒有特定 port，留空即可
        pathname: "/**", // 允許該網域下的所有路徑
      },
    ],
  },
};

export default nextConfig;
