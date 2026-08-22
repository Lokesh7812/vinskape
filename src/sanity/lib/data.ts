import { client, hasSanityConfig } from "./client";
import { homeQuery } from "../queries/home";
import { demoHomeData } from "../demoContent";
import type { HomeData, ImageAsset } from "../types";

function usableImage(image: ImageAsset | undefined): boolean {
  return typeof image?.url === "string" && image.url.trim().length > 0;
}

function usableItems<T extends { image: ImageAsset }>(items: T[] | undefined, fallback: T[]): T[] {
  const validItems = items?.filter(item => usableImage(item.image)) ?? [];
  return validItems.length ? validItems : fallback;
}

function usableBrand(brand: HomeData["brand"] | undefined): brand is HomeData["brand"] {
  return Boolean(brand && typeof brand.name === "string" && brand.name.trim() && brand.contact && typeof brand.contact.whatsapp === "string");
}
export async function getHomeData(): Promise<HomeData> {
  if (!hasSanityConfig) return demoHomeData;
  try {
    const live = await client.fetch<Partial<HomeData>>(homeQuery);
    return {
      brand: usableBrand(live.brand) ? live.brand : demoHomeData.brand,
      navigation: live.navigation?.length ? live.navigation : demoHomeData.navigation,
      heroSlides: usableItems(live.heroSlides, demoHomeData.heroSlides),
      introduction: live.introduction && usableImage(live.introduction.image) ? live.introduction : demoHomeData.introduction,
      services: usableItems(live.services, demoHomeData.services),
      projects: usableItems(live.projects, demoHomeData.projects),
      portfolio: usableItems(live.portfolio, demoHomeData.portfolio),
      testimonials: live.testimonials?.length ? live.testimonials : demoHomeData.testimonials,
    };
  } catch { return demoHomeData; }
}
