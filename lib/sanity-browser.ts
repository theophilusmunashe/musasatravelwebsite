import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/** Published reads from the browser so cPanel static pages can show Studio edits without a rebuild. */
export function getBrowserSanityClient() {
  return createClient({
    projectId: projectId || "missing",
    dataset,
    apiVersion,
    useCdn: false,
  });
}
