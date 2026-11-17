/**
 * One-time script to:
 * 1. Unset the 'project' reference on seed-testimonial-* documents that point to seed-project-*
 * 2. Delete the legacy seed-project-* documents
 *
 * SAFETY GUARDS:
 * - Does NOT touch any document whose _id starts with "project-"
 * - Only operates on documents explicitly identified as legacy demo seeds
 */

import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else {
  dotenv.config({ path: ".env.local" });
}
dotenv.config();

import { createClient } from "@sanity/client";

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_PROJECT_ID ||
  "3ki8luuz";

const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_DATASET ||
  "production";

const token =
  process.env.SANITY_API_WRITE_TOKEN ||
  process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    "\n❌ Missing Sanity write token!\nPlease set SANITY_API_WRITE_TOKEN (or SANITY_WRITE_TOKEN) in your .env.local file.\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

async function cleanup() {
  console.log(`\n🧹 Starting cleanup in Sanity [${projectId}/${dataset}]...`);

  // 1. Fetch seed projects to delete
  const seedProjects = await client.fetch<Array<{ _id: string; title?: string }>>(
    `*[_id match "seed-project-*" || _id match "drafts.seed-project-*"]{ _id, title }`
  );

  // Safety filter: NEVER touch any document starting with "project-"
  const safeToDelete = seedProjects.filter(
    (p) => !p._id.startsWith("project-") && !p._id.startsWith("drafts.project-")
  );

  console.log(`Found ${safeToDelete.length} legacy seed-project documents to delete.`);

  // 2. Fetch testimonials referencing seed projects
  const allTestimonials = await client.fetch<Array<{ _id: string; clientName?: string; project?: { _ref?: string } }>>(
    `*[_type == "testimonial" && defined(project._ref)]{ _id, clientName, project }`
  );

  const testimonials = allTestimonials.filter((t) =>
    t.project?._ref && t.project._ref.startsWith("seed-project-")
  );

  console.log(`Found ${testimonials.length} testimonials referencing seed projects.`);

  // Step A: Clear references on testimonials
  for (const t of testimonials) {
    console.log(`  Unsetting project reference on testimonial: ${t._id} (${t.clientName || "Unnamed"})...`);
    await client.patch(t._id).unset(["project"]).commit();
  }
  console.log(`  ✅ Cleared project references on ${testimonials.length} testimonials.\n`);

  // Step B: Delete the seed-project-* documents
  for (const p of safeToDelete) {
    console.log(`  Deleting legacy project: ${p._id} (${p.title || "Untitled"})...`);
    await client.delete(p._id);
  }
  console.log(`  ✅ Successfully deleted ${safeToDelete.length} legacy seed-project documents.\n`);

  console.log("🎉 Cleanup complete! Only your new projects with _id 'project-*' remain in Sanity.\n");
}

cleanup().catch((err) => {
  console.error("\n❌ Cleanup failed:", err);
  process.exit(1);
});
