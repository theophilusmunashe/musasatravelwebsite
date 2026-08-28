/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const isVercel = process.env.VERCEL === "1";
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  // cPanel zip/FTP deploy needs standalone. Vercel provides its own output.
  ...(!isVercel
    ? {
        output: "standalone",
        outputFileTracingRoot: projectRoot,
      }
    : {}),
  typescript: {
    // Sanity schema typings fail under TypeScript 5.9 and block `next build`.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    ...(!isVercel
      ? {
          loader: "custom",
          loaderFile: "./image-loader.ts",
        }
      : {}),
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

export default nextConfig;
