import { createClient } from "@sanity/client";

export const hasSanityConfig = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "missing-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  useCdn: false, // Set to false to bypass CDN caching and reflect CMS updates immediately
});
