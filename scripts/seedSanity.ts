import { loadEnvConfig } from "@next/env";
import { createClient, type IdentifiedSanityDocumentStub } from "@sanity/client";
import { demoHomeData } from "../src/sanity/demoContent";
import type { ImageAsset, NavigationItem } from "../src/sanity/types";

loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in .env.local.");
}

const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", token, useCdn: false });
const uploadCache = new Map<string, Promise<string>>();

async function sanityImage(image: ImageAsset, name: string) {
  if (!uploadCache.has(image.url)) {
    uploadCache.set(image.url, (async () => {
      const response = await fetch(image.url);
      if (!response.ok) throw new Error(`Could not download image for ${name}.`);
      const asset = await client.assets.upload("image", Buffer.from(await response.arrayBuffer()), { filename: `${name}.jpg`, contentType: response.headers.get("content-type") ?? "image/jpeg" });
      return asset._id;
    })());
  }
  const assetPromise = uploadCache.get(image.url);
  if (!assetPromise) throw new Error(`Image upload was not queued for ${name}.`);
  return { _type: "image", asset: { _type: "reference", _ref: await assetPromise }, alt: image.alt };
}

function navDocuments(items: NavigationItem[], parent?: string, path = ""): IdentifiedSanityDocumentStub[] {
  return items.flatMap((item, index) => {
    const id = `seed-nav-${`${path}-${index}-${item.label}`.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    return [{ _id: id, _type: "navigationItem", label: item.label, visible: true, featured: Boolean(item.featured), order: index + 1, ...(parent ? { parent: { _type: "reference", _ref: parent } } : {}) }, ...navDocuments(item.children ?? [], id, id)];
  });
}

async function seed() {
  const existingHeroTitles = new Set(await client.fetch<string[]>(`*[_type == "heroSlide"].title`));
  const existingNavigationCount = await client.fetch<number>(`count(*[_type == "navigationItem"])`);

  if (!(await client.fetch<number>(`count(*[_type == "siteSettings"])`))) {
    await client.create({ _id: "seed-site-settings", _type: "siteSettings", brandName: demoHomeData.brand.name, tagline: demoHomeData.brand.tagline, contact: demoHomeData.brand.contact, heroAutoplayDuration: 5600, seo: { title: "VINSKAPE | Interior Design & Architecture", description: "Vinskape creates thoughtful, elegant and functional interiors for homes, commercial spaces and modern workplaces.", keywords: ["interior design", "architecture", "Vinskape"] } });
  }

  if (!existingNavigationCount) {
    let transaction = client.transaction();
    for (const document of navDocuments(demoHomeData.navigation)) transaction = transaction.createIfNotExists(document);
    await transaction.commit();
  }

  for (const [index, slide] of demoHomeData.heroSlides.entries()) {
    const title = ["Welcome to Vinskape", "Residential Interiors", "Timeless Design", "Commercial Spaces", "Your Space, Your Story"][index];
    if (!existingHeroTitles.has(title)) await client.create({ _id: `seed-hero-${index + 1}`, _type: "heroSlide", title, eyebrow: slide.eyebrow, heading: slide.heading, description: slide.description, backgroundImage: await sanityImage(slide.image, `hero-${index + 1}`), primaryCta: { text: slide.primaryCta, action: "#" }, secondaryCta: slide.secondaryCta ? { text: slide.secondaryCta, action: "#contact" } : undefined, textAlignment: "left", active: true, order: index + 1 });
  }

  if (!(await client.fetch<number>(`count(*[_type == "homeIntroduction"])`))) {
    const intro = demoHomeData.introduction;
    await client.create({ _id: "seed-home-introduction", _type: "homeIntroduction", eyebrow: intro.eyebrow, heading: intro.heading, description: intro.description, image: await sanityImage(intro.image, "home-introduction"), cta: intro.cta, statistics: intro.statistics });
  }

  const projectIds = demoHomeData.projects.map((_, index) => `seed-project-${index + 1}`);
  if (!(await client.fetch<number>(`count(*[_type == "project"])`))) {
    for (const [index, project] of demoHomeData.projects.entries()) await client.create({ _id: projectIds[index], _type: "project", title: project.name, slug: { _type: "slug", current: project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }, category: project.category, projectType: project.category, location: project.location, description: project.description, coverImage: await sanityImage(project.image, `project-${index + 1}`), status: "Completed", featured: true, order: index + 1 });
  }

  if (!(await client.fetch<number>(`count(*[_type == "service"])`))) {
    for (const [index, service] of demoHomeData.services.entries()) await client.create({ _id: `seed-service-${index + 1}`, _type: "service", name: service.name, category: service.name, description: service.description, image: await sanityImage(service.image, `service-${index + 1}`), items: service.items, cta: { text: `Explore ${service.name}`, action: "#" }, featured: true, active: true, order: index + 1 });
  }

  if (!(await client.fetch<number>(`count(*[_type == "portfolioCategory"])`))) {
    for (const [index, category] of demoHomeData.portfolio.entries()) await client.create({ _id: `seed-portfolio-${index + 1}`, _type: "portfolioCategory", name: category.name, slug: { _type: "slug", current: category.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") }, description: `${category.name} spaces by Vinskape.`, coverImage: await sanityImage(category.image, `portfolio-${index + 1}`), active: true, order: index + 1 });
  }

  if (!(await client.fetch<number>(`count(*[_type == "testimonial"])`))) {
    for (const [index, testimonial] of demoHomeData.testimonials.entries()) await client.create({ _id: `seed-testimonial-${index + 1}`, _type: "testimonial", clientName: testimonial.name, location: testimonial.place, testimonial: testimonial.quote, rating: 5, project: { _type: "reference", _ref: projectIds[index] }, featured: true, order: index + 1 });
  }

  if (!(await client.fetch<number>(`count(*[_type == "dealer"])`))) {
    for (const [index, name] of ["FORM", "ATELIER", "MATERIA", "NORTHLINE", "STUDIO 06"].entries()) await client.create({ _id: `seed-dealer-${index + 1}`, _type: "dealer", name, description: "Demo partner placeholder — replace with approved partner information.", category: "Demo", active: true, featured: false, order: index + 1 });
  }

  console.log("Vinskape demo content imported. Refresh Sanity Studio and http://localhost:3000.");
}

seed().catch(error => { console.error(error); process.exitCode = 1; });
