import dotenv from "dotenv";
import path from "path";
import { createClient } from "@sanity/client";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3ki8luuz",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function preview() {
  // 1. Projects to delete (both published and drafts)
  const seedProjects = await client.fetch(
    `*[_id match "seed-project-*" || _id match "drafts.seed-project-*"]{ _id, title, status }`
  );

  // 2. Testimonials referencing any project or with seed-testimonial-*
  const testimonials = await client.fetch(
    `*[_type == "testimonial" && defined(project._ref)]{ _id, clientName, project }`
  );

  const testimonialsWithSeedProjectRef = testimonials.filter((t: any) =>
    t.project?._ref?.includes("seed-project-")
  );

  // 3. Any other documents referencing seed-project-*
  const seedProjectIds = seedProjects.map((p: any) => p._id.replace("drafts.", ""));
  const otherReferencingDocs = await client.fetch(
    `*[references($ids) && !(_id match "seed-project-*") && !(_id match "drafts.seed-project-*")]{ _id, _type }`,
    { ids: seedProjectIds }
  );

  console.log("SEED_PROJECTS_COUNT:", seedProjects.length);
  console.log("SEED_PROJECTS:", JSON.stringify(seedProjects, null, 2));

  console.log("TESTIMONIALS_COUNT:", testimonialsWithSeedProjectRef.length);
  console.log("TESTIMONIALS:", JSON.stringify(testimonialsWithSeedProjectRef, null, 2));

  console.log("OTHER_REFERENCING_DOCS_COUNT:", otherReferencingDocs.length);
  console.log("OTHER_REFERENCING_DOCS:", JSON.stringify(otherReferencingDocs, null, 2));
}

preview().catch(console.error);
