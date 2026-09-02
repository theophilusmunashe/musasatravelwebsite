"use client";

/**
 * Built-in authoring environment. Catch-all under /studio.
 * https://www.sanity.io/docs/nextjs/embedding-sanity-studio-in-nextjs
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
