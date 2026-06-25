import { createClient } from "next-sanity";

export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder";
export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityConfigured =
  Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "placeholder";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});
