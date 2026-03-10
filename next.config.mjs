import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "s.yimg.com",
      "i.insider.com",
      "cdn.sanity.io",
      "images.pexels.com",
      "res.cloudinary.com",
    ],
  },
};

export default withNextVideo(nextConfig);