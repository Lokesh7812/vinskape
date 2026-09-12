import { loadEnvConfig } from "@next/env";
import { createClient, type IdentifiedSanityDocumentStub } from "@sanity/client";
import fs from "fs";
import path from "path";
import { demoHomeData } from "../src/sanity/demoContent";
import type { ImageAsset, NavigationItem } from "../src/sanity/types";
import {
  defaultAboutData,
  defaultServicesData,
  defaultOngoingProjects,
  defaultCompletedProjects,
  defaultProductsData,
  defaultPortfolioCategories,
  defaultRoomsData,
  defaultTestimonials,
  defaultContactData,
} from "../src/sanity/lib/data";

// Load env vars from .env.local manually before anything else
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
  console.error("\n========================================================");
  console.error("ERROR: SANITY_WRITE_TOKEN is missing in .env.local!");
  console.error("To generate your token:");
  console.error("1. Go to: https://sanity.io/organizations/o29mfiiuq/project/3ki8luuz");
  console.error("2. Click 'API' tab -> 'Tokens' -> '+ Add API token'");
  console.error("3. Give it Name 'seed', Role 'Editor'");
  console.error("4. Copy the token and add to .env.local: SANITY_WRITE_TOKEN=sk...");
  console.error("========================================================\n");
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", token, useCdn: false });
const uploadCache = new Map<string, Promise<string>>();

async function sanityImage(image: ImageAsset, name: string) {
  if (!uploadCache.has(image.url)) {
    uploadCache.set(
      image.url,
      (async () => {
        let buffer: Buffer;
        let contentType = "image/jpeg";
        let filename = `${name}.jpg`;

        if (image.url.startsWith("/") || image.url.startsWith("./")) {
          const cleanPath = image.url.replace(/^\//, "");
          const localPath = path.join(process.cwd(), "public", cleanPath);
          if (!fs.existsSync(localPath)) {
            throw new Error(`Local file not found at: ${localPath}`);
          }
          buffer = fs.readFileSync(localPath);
          const ext = path.extname(localPath).toLowerCase();
          contentType = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
          filename = path.basename(localPath);
        } else {
          const response = await fetch(image.url);
          if (!response.ok) throw new Error(`Could not download image for ${name} from ${image.url}`);
          buffer = Buffer.from(await response.arrayBuffer());
          contentType = response.headers.get("content-type") ?? "image/jpeg";
        }

        console.log(`Uploading image asset for ${name} (${filename})...`);
        const asset = await client.assets.upload("image", buffer, { filename, contentType });
        return asset._id;
      })()
    );
  }
  const assetPromise = uploadCache.get(image.url);
  if (!assetPromise) throw new Error(`Image upload was not queued for ${name}.`);
  return { _type: "image", asset: { _type: "reference", _ref: await assetPromise }, alt: image.alt };
}

async function safeSanityImage(url: string, alt: string, name: string) {
  try {
    return await sanityImage({ url, alt }, name);
  } catch (err) {
    console.warn(`Could not upload ${name} (${url}):`, err);
    return undefined;
  }
}

function navDocuments(items: NavigationItem[], parent?: string, path = ""): IdentifiedSanityDocumentStub[] {
  return items.flatMap((item, index) => {
    const id = `seed-nav-${`${path}-${index}-${item.label}`.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    return [
      {
        _id: id,
        _type: "navigationItem",
        label: item.label,
        visible: true,
        featured: Boolean(item.featured),
        order: index + 1,
        ...(parent ? { parent: { _type: "reference", _ref: parent } } : {}),
      },
      ...navDocuments(item.children ?? [], id, id),
    ];
  });
}

const dealerships = [
  // Laminates & Surfaces
  { name: "Greenlam", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/01_Greenlam.png" },
  { name: "Merino", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/02_Merino.png" },
  { name: "Century Laminates", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/03_Century_Laminates.png" },
  { name: "Stylam", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/04_Stylam.png" },
  { name: "Catch", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/05_Catch.png" },
  { name: "AICA", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/06_AICA.png" },
  // Hardware & Fittings
  { name: "Hettich", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/07_Hettich.png" },
  { name: "Ebco", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/08_Ebco.png" },
  { name: "Slate", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/09_Slate.png" },
  { name: "Olive", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/10_Olive.png" },
  { name: "Hablo", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/11_Hablo.png" },
  // Kitchen & Appliances
  { name: "Faber", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/12_Faber.png" },
  { name: "Carysil", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/13_Carysil.png" },
  { name: "Bosch", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/14_Bosch.png" },
  { name: "LG", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/15_LG.png" },
  { name: "Samsung", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/16_Samsung.png" },
  { name: "Crompton Greaves", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/17_Crompton_Greaves.png" },
  { name: "Philips", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/18_Philips.png" },
  { name: "Venus", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/19_Venus.png" },
  { name: "Vu", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/20_VU.png" },
  { name: "AO Smith", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/21_AO_Smith.png" },
  // Comfort & Furnishing
  { name: "Wafefit", category: "Comfort & Furnishing", logo: "/24_separate_brand_logos/22_Wafefit.png" },
  { name: "Peps", category: "Comfort & Furnishing", logo: "/24_separate_brand_logos/23_Peps.png" },
  { name: "Restolex", category: "Comfort & Furnishing", logo: "/24_separate_brand_logos/24_Restolex.png" },
];

async function seed() {
  console.log(`Connecting to Sanity project: ${projectId} (dataset: ${dataset})...\n`);

  // 1. Site Settings
  console.log("Seeding Site Settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    brandName: demoHomeData.brand.name,
    tagline: demoHomeData.brand.tagline,
    contact: demoHomeData.brand.contact,
    heroAutoplayDuration: 5600,
    seo: {
      title: "VINSKAPE | Interior Design & Architecture",
      description: "Vinskape creates thoughtful, elegant and functional interiors for homes, commercial spaces and modern workplaces.",
      keywords: ["interior design", "architecture", "Vinskape", "Chennai interior design", "luxury interiors"],
    },
  });

  // 2. Navigation
  console.log("Seeding Navigation...");
  const existingNavigationCount = await client.fetch<number>(`count(*[_type == "navigationItem"])`);
  if (!existingNavigationCount) {
    let transaction = client.transaction();
    for (const document of navDocuments(demoHomeData.navigation)) transaction = transaction.createIfNotExists(document);
    await transaction.commit();
  }

  // 3. Hero Slides
  console.log("Seeding Hero Slides...");
  const heroTitles = [
    "Welcome to Vinskape",
    "Residential Interiors",
    "Timeless Design",
    "Commercial Spaces",
    "Your Space, Your Story",
  ];
  for (const [index, slide] of demoHomeData.heroSlides.entries()) {
    const title = heroTitles[index] || slide.eyebrow;
    const bgImage = await safeSanityImage(slide.image.url, slide.image.alt, `hero-slide-${index + 1}`);
    await client.createOrReplace({
      _id: `seed-hero-${index + 1}`,
      _type: "heroSlide",
      title,
      eyebrow: slide.eyebrow,
      heading: slide.heading,
      description: slide.description,
      backgroundImage: bgImage,
      primaryCta: { text: slide.primaryCta, action: "#" },
      secondaryCta: slide.secondaryCta ? { text: slide.secondaryCta, action: "#contact" } : undefined,
      textAlignment: "left",
      active: true,
      order: index + 1,
    });
  }

  // 4. Home Introduction
  console.log("Seeding Home Introduction...");
  const intro = demoHomeData.introduction;
  const introImage = await safeSanityImage(intro.image.url, intro.image.alt, "home-introduction");
  await client.createOrReplace({
    _id: "seed-home-introduction",
    _type: "homeIntroduction",
    eyebrow: intro.eyebrow,
    heading: intro.heading,
    description: intro.description,
    image: introImage,
    cta: intro.cta,
    statistics: intro.statistics,
  });

  // 5. Featured Projects (Home)
  console.log("Seeding Featured Projects...");
  const projectIds = demoHomeData.projects.map((_, index) => `seed-project-${index + 1}`);
  for (const [index, project] of demoHomeData.projects.entries()) {
    const coverImage = await safeSanityImage(project.image.url, project.image.alt, `project-${index + 1}`);
    await client.createOrReplace({
      _id: projectIds[index],
      _type: "project",
      title: project.name,
      slug: { _type: "slug", current: project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") },
      category: project.category,
      projectType: project.category,
      location: project.location,
      description: project.description,
      coverImage,
      status: project.status === "FEATURED" ? "Ongoing" : "Completed",
      featured: true,
      order: index + 1,
    });
  }

  // 6. Services (Home)
  console.log("Seeding Services...");
  for (const [index, service] of demoHomeData.services.entries()) {
    const serviceImage = await safeSanityImage(service.image.url, service.image.alt, `service-${index + 1}`);
    await client.createOrReplace({
      _id: `seed-service-${index + 1}`,
      _type: "service",
      name: service.name,
      category: service.name,
      description: service.description,
      image: serviceImage,
      items: service.items,
      cta: { text: `Explore ${service.name}`, action: `/services#${service.slug || service.name.toLowerCase()}` },
      featured: true,
      active: true,
      order: index + 1,
    });
  }

  // 7. Portfolio Categories WITH all Category Gallery Images & Full Sub-Page Content
  console.log("Cleaning up old legacy portfolio seeds...");
  for (let i = 1; i <= 8; i++) {
    try {
      await client.delete(`seed-portfolio-${i}`);
    } catch {
      // ignore if not present
    }
  }
  try {
    await client.delete("seed-portfolio-kitchen");
  } catch {
    // ignore
  }

  console.log("Seeding Full Portfolio Sub-Pages with Gallery Images...");
  for (const [index, category] of defaultPortfolioCategories.entries()) {
    const room = defaultRoomsData[category.slug];
    const galleryAssets = [];
    for (const [imgIdx, imgUrl] of category.images.entries()) {
      const asset = await safeSanityImage(imgUrl, `${category.name} ${imgIdx + 1}`, `pf-${category.slug}-${imgIdx + 1}`);
      if (asset) {
        galleryAssets.push({
          ...asset,
          _key: `gallery_${category.slug}_${imgIdx + 1}`,
        });
      }
    }

    let heroImageAsset = galleryAssets[0];
    if (room?.heroImage && room.heroImage !== category.images[0]) {
      const heroUploaded = await safeSanityImage(room.heroImage, `${category.name} Hero`, `pf-${category.slug}-hero`);
      if (heroUploaded) heroImageAsset = heroUploaded;
    }

    const featuresWithKeys = (room?.features || []).map((feat, fIdx) => ({
      _key: `feat_${category.slug}_${fIdx + 1}`,
      title: feat.title,
      desc: feat.desc,
    }));

    await client.createOrReplace({
      _id: `seed-portfolio-${category.slug}`,
      _type: "portfolioCategory",
      name: category.name,
      slug: { _type: "slug", current: category.slug },
      description: `${category.name} spaces thoughtfully crafted by Vinskape.`,
      coverImage: galleryAssets[0],
      eyebrow: room?.eyebrow || `PORTFOLIO · ${category.name.toUpperCase()}`,
      heroTitle: room?.title || category.name,
      heroTitleAccent: room?.titleAccent || "",
      heroSubtitle: room?.subtitle || "",
      heroImage: heroImageAsset,
      overview: room?.overview || "",
      features: featuresWithKeys,
      materials: room?.materials || [],
      gallery: galleryAssets,
      active: true,
      order: index + 1,
    });
  }

  // 8. Testimonials (All 6)
  console.log("Seeding All 6 Testimonials...");
  for (const [index, testimonial] of defaultTestimonials.entries()) {
    await client.createOrReplace({
      _id: `seed-testimonial-${index + 1}`,
      _type: "testimonial",
      clientName: testimonial.name,
      location: testimonial.place,
      testimonial: testimonial.quote,
      rating: testimonial.rating || 5,
      project: { _type: "reference", _ref: projectIds[index % projectIds.length] },
      featured: true,
      order: index + 1,
    });
  }

  // 9. Dealerships & Partners (All 24 Brand Logos)
  console.log("Seeding 24 Dealership Partners with Brand Logos...");
  for (const [index, dealer] of dealerships.entries()) {
    const id = `seed-dealer-${index + 1}`;
    const logoAsset = await safeSanityImage(dealer.logo, dealer.name, `dealer-logo-${index + 1}`);

    await client.createOrReplace({
      _id: id,
      _type: "dealer",
      name: dealer.name,
      category: dealer.category,
      description: `Authorized dealer partner for premium ${dealer.category.toLowerCase()}.`,
      logo: logoAsset,
      active: true,
      featured: true,
      order: index + 1,
    });
  }

  // 10. About Page Document
  console.log("Seeding About Page Document...");
  const aboutHeroBg = await safeSanityImage(defaultAboutData.hero.backgroundImage, "About Hero", "about-hero-bg");
  const aboutStoryImg = await safeSanityImage(defaultAboutData.story.image, "About Story", "about-story-img");
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heroEyebrow: defaultAboutData.hero.eyebrow,
    heroTitle: defaultAboutData.hero.title,
    heroTitleAccent: defaultAboutData.hero.titleAccent,
    heroSubtitle: defaultAboutData.hero.subtitle,
    heroBackgroundImage: aboutHeroBg,
    storyEyebrow: defaultAboutData.story.eyebrow,
    storyHeading: defaultAboutData.story.heading,
    storyHeadingAccent: defaultAboutData.story.headingAccent,
    storyParagraphs: defaultAboutData.story.paragraphs,
    storyImage: aboutStoryImg,
    values: defaultAboutData.values,
    stats: defaultAboutData.stats,
    mission: defaultAboutData.mission,
    vision: defaultAboutData.vision,
    cta: defaultAboutData.cta,
  });

  // 11. Services Page Document
  console.log("Seeding Services Page Document...");
  const svcHeroBg = await safeSanityImage(defaultServicesData.hero.backgroundImage, "Services Hero", "services-hero-bg");
  await client.createOrReplace({
    _id: "servicesPage",
    _type: "servicesPage",
    heroEyebrow: defaultServicesData.hero.eyebrow,
    heroTitle: defaultServicesData.hero.title,
    heroTitleAccent: defaultServicesData.hero.titleAccent,
    heroSubtitle: defaultServicesData.hero.subtitle,
    heroBackgroundImage: svcHeroBg,
    residential: defaultServicesData.residential,
    commercial: defaultServicesData.commercial,
    enterprise: defaultServicesData.enterprise,
    cta: defaultServicesData.cta,
  });

  // 12. Gallery Projects (Ongoing + Completed)
  console.log("Seeding Gallery Projects...");
  for (const [index, project] of defaultOngoingProjects.entries()) {
    const img = await safeSanityImage(project.image, project.name, `gal-ongoing-${index + 1}`);
    await client.createOrReplace({
      _id: `seed-gal-ongoing-${index + 1}`,
      _type: "galleryProject",
      name: project.name,
      location: project.location,
      type: project.type,
      status: "Ongoing",
      progress: project.progress,
      image: img,
      order: index + 1,
    });
  }
  for (const [index, project] of defaultCompletedProjects.entries()) {
    const img = await safeSanityImage(project.image, project.name, `gal-completed-${index + 1}`);
    await client.createOrReplace({
      _id: `seed-gal-completed-${index + 1}`,
      _type: "galleryProject",
      name: project.name,
      location: project.location,
      type: project.type,
      status: "Completed",
      year: project.year,
      image: img,
      order: index + 10,
    });
  }

  // 13. Products & Furniture
  console.log("Seeding Products & Furniture...");
  for (const [index, prod] of defaultProductsData.entries()) {
    const img = await safeSanityImage(prod.image, prod.name, `product-${index + 1}`);
    await client.createOrReplace({
      _id: `seed-prod-${index + 1}`,
      _type: "productItem",
      name: prod.name,
      desc: prod.desc,
      features: prod.features,
      image: img,
      icon: prod.icon,
      order: index + 1,
    });
  }

  // 14. Contact Page Document
  console.log("Seeding Contact Page Document...");
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    heroEyebrow: defaultContactData.heroEyebrow,
    heroTitle: defaultContactData.heroTitle,
    heroTitleAccent: defaultContactData.heroTitleAccent,
    heroSubtitle: defaultContactData.heroSubtitle,
    heading: defaultContactData.heading,
    headingAccent: defaultContactData.headingAccent,
    description: defaultContactData.description,
    phone: defaultContactData.phone,
    whatsapp: defaultContactData.whatsapp,
    email: defaultContactData.email,
    address: defaultContactData.address,
    workingHours: defaultContactData.workingHours,
    instagram: defaultContactData.instagram,
  });

  console.log("\n========================================================");
  console.log("SUCCESS! ALL website content & images across ALL pages");
  console.log("have been uploaded directly into your Sanity Content Studio!");
  console.log("Visit: http://localhost:3000/admin");
  console.log("========================================================\n");
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exitCode = 1;
});
