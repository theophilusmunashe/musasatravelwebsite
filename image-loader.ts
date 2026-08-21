import type { ImageLoaderProps } from "next/image";

/**
 * Returns `src` unchanged so the browser never hits `/_next/image` (Sharp).
 * Fixes production on cPanel when the app is built on Windows and served on Linux.
 */
export default function imageLoader({ src }: ImageLoaderProps): string {
  return src;
}
