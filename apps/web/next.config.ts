import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@freshfarm/types", "@freshfarm/utils", "@freshfarm/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com", // 新增這一段
        pathname: "/**",
      },
      //TODO 未來統一把圖片更新同個位置
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com", // 新增 Pixabay 支援
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
