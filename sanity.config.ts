"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schema";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "musasa-travel",
  title: "Musasa Travel",
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  // Safari/iOS blocks Sanity cookies on vercel.app, which makes Google login
  // return 400. Token auth keeps the session in localStorage instead.
  auth: {
    loginMethod: "token",
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
