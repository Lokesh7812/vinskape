import { loadEnvConfig } from "@next/env";
import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

// Load env vars
const envLocalPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  const lines = fs.readFileSync(envLocalPath, "utf-8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx < 0) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (key && !process.env[key]) process.env[key] = val;
  }
}
loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || "3ki8luuz";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("ERROR: SANITY_WRITE_TOKEN is missing!");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", token, useCdn: false });

async function run() {
  console.log("Updating Sanity content...");

  // 1. Update all hero slides in Sanity to have eyebrow: 'WELCOME TO VINSKAPE'
  const heroSlides = await client.fetch<Array<{ _id: string; eyebrow?: string; heading?: string; title?: string }>>(
    '*[_type == "heroSlide"] | order(order asc)'
  );
  console.log(`Found ${heroSlides.length} hero slides in Sanity.`);
  for (const slide of heroSlides) {
    console.log(`Updating slide ${slide._id} (${slide.title || "untitled"})...`);
    await client
      .patch(slide._id)
      .set({
        eyebrow: "WELCOME TO VINSKAPE",
      })
      .commit();
  }
  console.log("✅ All hero slides updated with eyebrow: 'WELCOME TO VINSKAPE'.");

  // 2. Update Enterprise service item (home page)
  const enterpriseServices = await client.fetch<Array<{ _id: string; name: string; items?: string[] }>>(
    '*[_type == "service" && (name match "Enterprise*" || slug.current == "enterprise")]'
  );
  for (const s of enterpriseServices) {
    const filteredItems = (s.items || []).filter(
      (item) => !item.toLowerCase().includes("biophilic")
    );
    console.log(`Updating service ${s._id} items:`, filteredItems);
    await client.patch(s._id).set({ items: filteredItems }).commit();
  }
  console.log("✅ Enterprise service items updated.");

  // 3. Update servicesPage document if present
  const servicesPage = await client.getDocument("servicesPage");
  if (servicesPage && (servicesPage as any).enterprise?.items) {
    const sp = servicesPage as any;
    const currentItems: Array<{ name: string; desc: string; icon?: string }> = sp.enterprise.items || [];
    const filteredItems = currentItems.filter(
      (it) => !it.name.toLowerCase().includes("biophilic")
    );
    console.log(`Updating servicesPage enterprise.items from ${currentItems.length} to ${filteredItems.length} items`);
    await client.patch("servicesPage").set({ "enterprise.items": filteredItems }).commit();
    console.log("✅ servicesPage document updated.");
  }

  // 4. Delete any navigation items referencing Biophilic
  const bioNavItems = await client.fetch<Array<{ _id: string; label: string }>>(
    '*[_type == "navigationItem" && label match "*Biophilic*"]'
  );
  for (const nav of bioNavItems) {
    console.log(`Deleting navigation item: ${nav._id} (${nav.label})`);
    await client.delete(nav._id);
  }

  console.log("🎉 Sanity content update finished successfully!");
}

run().catch((err) => {
  console.error("Error updating Sanity:", err);
  process.exit(1);
});
