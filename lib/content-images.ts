export const MAX_CONTENT_IMAGES = 5;
export const MAX_EXTRA_PHOTOS = MAX_CONTENT_IMAGES - 1;

export function contentImages(
  cover?: string | null,
  gallery?: Array<string | null | undefined> | null
): string[] {
  const urls = [cover, ...(gallery || [])].filter(
    (url): url is string => typeof url === "string" && Boolean(url.trim())
  );
  return [...new Set(urls)].slice(0, MAX_CONTENT_IMAGES);
}
