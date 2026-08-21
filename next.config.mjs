/** @type {import('next').NextConfig} */
const nextConfig = {
  // Smaller production bundle for cPanel — copy `public` + `.next/static` into
  // `.next/standalone` after build (see deploy comment in package.json).
  output: "standalone",
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
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
