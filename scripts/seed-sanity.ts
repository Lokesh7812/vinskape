/**
 * One-time migration script to seed the 10 gallery projects into Sanity CMS.
 *
 * Safe to run multiple times:
 * - Uses deterministic _id: `project-${slug}`
 * - Checks/caches asset uploads so images are not duplicated
 *
 * Requirements:
 * - SANITY_API_WRITE_TOKEN or SANITY_WRITE_TOKEN in .env.local / env
 *
 * Run with:
 * npm run seed:sanity
 */

import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env.local
const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else {
  dotenv.config({ path: ".env.local" });
}
dotenv.config(); // fallback to .env if any variable is missing

import { createClient } from "@sanity/client";
import { projects } from "../src/data/projects";

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
    "\n❌ Missing Sanity write token!\nPlease set SANITY_API_WRITE_TOKEN (or SANITY_WRITE_TOKEN) in your environment or .env.local file.\n"
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

// Cache for uploaded image paths to Sanity asset IDs
const assetCache = new Map<string, string>();

async function uploadImage(relativePath: string): Promise<string | null> {
  if (!relativePath) return null;
  if (assetCache.has(relativePath)) {
    return assetCache.get(relativePath)!;
  }

  // Find local file in public/ or root
  let localPath = path.resolve(process.cwd(), "public", relativePath.replace(/^\//, ""));
  if (!fs.existsSync(localPath)) {
    localPath = path.resolve(process.cwd(), relativePath.replace(/^\//, ""));
  }

  if (!fs.existsSync(localPath)) {
    console.warn(`  ⚠️ Image not found on disk: ${relativePath}`);
    return null;
  }

  try {
    const filename = path.basename(localPath);
    console.log(`  Uploading asset: ${filename}...`);
    const stream = fs.createReadStream(localPath);
    const asset = await client.assets.upload("image", stream, { filename });
    assetCache.set(relativePath, asset._id);
    return asset._id;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`  ❌ Failed to upload ${relativePath}:`, message);
    return null;
  }
}

async function seed() {
  console.log(`\n🚀 Starting Sanity Gallery Projects seed to [${projectId}/${dataset}]...`);
  console.log(`Found ${projects.length} projects to migrate.\n`);

  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    console.log(`[${i + 1}/${projects.length}] Migrating: "${p.title}" (${p.status})...`);

    // 1. Upload cover image
    const coverAssetId = await uploadImage(p.coverImage);

    // 2. Upload all photos
    const photoAssets: Array<{ _type: "image"; _key: string; asset: { _type: "reference"; _ref: string } }> = [];
    for (let j = 0; j < p.photos.length; j++) {
      const assetId = await uploadImage(p.photos[j]);
      if (assetId) {
        photoAssets.push({
          _type: "image",
          _key: `photo-${j}-${Date.now()}`,
          asset: { _type: "reference", _ref: assetId },
        });
      }
    }

    // 3. Document payload
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc: any = {
      _id: `project-${p.slug}`,
      _type: "project",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      status: p.status,
      category: p.category,
      location: p.location,
      description: p.description,
      order: i + 1,
      photos: photoAssets,
    };

    if (coverAssetId) {
      doc.coverImage = {
        _type: "image",
        asset: { _type: "reference", _ref: coverAssetId },
        alt: p.title,
      };
    }

    if (p.status === "ongoing") {
      doc.progress = p.progress;
      doc.latestUpdate = p.latestUpdate;
    } else if (p.status === "completed") {
      const yr = typeof p.completedYear === "string" ? parseInt(p.completedYear, 10) : p.completedYear;
      doc.completedYear = isNaN(yr) ? 2026 : yr;

      if (p.beforeImage) {
        const beforeAssetId = await uploadImage(p.beforeImage);
        if (beforeAssetId) {
          doc.beforeImage = {
            _type: "image",
            asset: { _type: "reference", _ref: beforeAssetId },
            alt: `${p.title} - Before`,
          };
        }
      }

      const afterAssetId = await uploadImage(p.afterImage);
      if (afterAssetId) {
        doc.afterImage = {
          _type: "image",
          asset: { _type: "reference", _ref: afterAssetId },
          alt: `${p.title} - After`,
        };
      }
    }

    await client.createOrReplace(doc);
    console.log(`  ✅ Project saved with deterministic _id: project-${p.slug}`);
  }

  console.log("\n🎉 All 10 gallery projects successfully migrated into Sanity CMS!");
}

seed().catch((err) => {
  console.error("\n❌ Seed failed:", err);
  process.exit(1);
});
