/** @type {import('next').NextConfig} */

const isVercel = process.env.VERCEL === "1";
const isCpanelStatic = process.env.CPANEL_STATIC === "1";

const nextConfig = {
  env: {
    CPANEL_STATIC: process.env.CPANEL_STATIC || "",
  },
  // Vercel: default Node hosting. cPanel: static HTML (no Setup Node.js App).
  ...(isCpanelStatic
    ? {
        output: "export",
        trailingSlash: true,
      }
    : {}),
  typescript: {
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
          unoptimized: true,
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
