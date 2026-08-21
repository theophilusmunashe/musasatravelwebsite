import type { StaticImageData } from "next/image";

/** String URL/path, or bundled static import (same delivery as logo on cPanel). */
export function resolveImageSrc(
  src: string | StaticImageData | undefined | null
): string {
  if (!src) return "";
  if (typeof src === "string") return src;
  if (typeof src === "object" && "src" in src && typeof src.src === "string") {
    return src.src;
  }
  return "";
}
