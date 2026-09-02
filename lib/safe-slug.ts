/** URL-safe slug for static export / FTP (no spaces or punctuation). */
export function safeUrlSlug(slug: string | undefined | null): string {
  return (slug || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
