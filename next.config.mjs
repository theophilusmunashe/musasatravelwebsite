import { withNextVideo } from "next-video/process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "s.yimg.com" },
      { protocol: "https", hostname: "i.insider.com" },
    ],
  },
};

export default withNextVideo(nextConfig);
