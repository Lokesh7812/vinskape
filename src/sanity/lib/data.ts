import { client, hasSanityConfig } from "./client";
import { homeQuery } from "../queries/home";
import {
  aboutQuery,
  servicesQuery,
  galleryQuery,
  productsQuery,
  portfolioCategoriesQuery,
  portfolioCategoryBySlugQuery,
  testimonialsQuery,
  contactQuery,
} from "../queries/pages";
import { demoHomeData } from "../demoContent";
import type { HomeData, ImageAsset } from "../types";

function usableImage(image: ImageAsset | undefined): boolean {
  return typeof image?.url === "string" && image.url.trim().length > 0;
}

function usableItems<T extends { image: ImageAsset }>(items: T[] | undefined, fallback: T[]): T[] {
  const validItems = items?.filter((item) => usableImage(item.image)) ?? [];
  return validItems.length ? validItems : fallback;
}

function usableBrand(brand: HomeData["brand"] | undefined): brand is HomeData["brand"] {
  return Boolean(
    brand &&
      typeof brand.name === "string" &&
      brand.name.trim() &&
      brand.contact &&
      typeof brand.contact.whatsapp === "string"
  );
}

function dedupeItems<T extends { name: string; slug?: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = (item.slug || item.name).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function getHomeData(): Promise<HomeData> {
  if (!hasSanityConfig) return demoHomeData;
  try {
    const live = await client.fetch<Partial<HomeData>>(homeQuery);
    return {
      brand: usableBrand(live.brand) ? live.brand : demoHomeData.brand,
      navigation: live.navigation?.length ? live.navigation : demoHomeData.navigation,
      heroSlides: usableItems(live.heroSlides, demoHomeData.heroSlides),
      introduction:
        live.introduction && usableImage(live.introduction.image)
          ? live.introduction
          : demoHomeData.introduction,
      services: usableItems(live.services, demoHomeData.services),
      projects: usableItems(live.projects, demoHomeData.projects),
      portfolio: dedupeItems(usableItems(live.portfolio, demoHomeData.portfolio)),
      testimonials: live.testimonials?.length ? live.testimonials : demoHomeData.testimonials,
      dealers:
        live.dealers && live.dealers.length
          ? live.dealers.filter((d) => usableImage(d.image))
          : undefined,
    };
  } catch {
    return demoHomeData;
  }
}

// ----------------------------------------------------
// About Page Data
// ----------------------------------------------------
export interface AboutData {
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    backgroundImage: string;
  };
  story: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    paragraphs: string[];
    image: string;
  };
  values: Array<{ icon: string; title: string; desc: string }>;
  stats: Array<{ value: string; label: string }>;
  mission: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    description: string;
  };
  vision: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    description: string;
  };
  cta: {
    heading: string;
    headingAccent: string;
    subtitle: string;
    buttonText: string;
  };
}

export const defaultAboutData: AboutData = {
  hero: {
    eyebrow: "ABOUT VINSKAPE",
    title: "Crafting Spaces.",
    titleAccent: "Defining Lifestyles.",
    subtitle: "We are a design studio dedicated to creating thoughtful, elegant and functional interiors.",
    backgroundImage: "/images/Living Room/Living Room/2.png",
  },
  story: {
    eyebrow: "OUR STORY",
    heading: "Where it all",
    headingAccent: "began.",
    paragraphs: [
      "Vinskape was founded with a singular vision: to transform the way people experience their everyday spaces. What started as a passion for beautiful interiors has grown into a full-service design studio serving homes, offices, and commercial spaces across India.",
      "We believe that great design is not just about aesthetics — it's about creating environments that enhance the quality of life for the people who inhabit them. Every project begins with a deeper understanding of how a space should feel, function, and evolve with its occupants.",
      "Our team of designers, architects and craftspeople bring together decades of combined experience, working with the finest materials and the most innovative techniques to deliver spaces that exceed expectations.",
    ],
    image: "/images/Living Room/Living Room/129 Living.png",
  },
  values: [
    { icon: "✦", title: "Thoughtful Design", desc: "Every space starts with listening to the life that will unfold within it. We design with empathy and intention." },
    { icon: "◆", title: "Functional Luxury", desc: "Beauty and practicality are never separate ideas. We create spaces that look stunning and work flawlessly." },
    { icon: "▣", title: "Attention to Detail", desc: "Light, proportion, material and finish — considered as one cohesive experience." },
    { icon: "◈", title: "End-to-End Approach", desc: "From early concept through to the smallest finishing touch, we manage every step." },
  ],
  stats: [
    { value: "10+", label: "Years of Experience" },
    { value: "250+", label: "Spaces Crafted" },
    { value: "100+", label: "Happy Clients" },
    { value: "24+", label: "Brand Partners" },
  ],
  mission: {
    eyebrow: "OUR MISSION",
    heading: "To create spaces that",
    headingAccent: "inspire.",
    description: "We are committed to delivering interiors that not only look exceptional but enhance the way people live, work and connect. Through innovation, craftsmanship and a deep respect for our clients' visions, we craft spaces that stand the test of time.",
  },
  vision: {
    eyebrow: "OUR VISION",
    heading: "Redefining",
    headingAccent: "interior design.",
    description: "To be the most trusted interior design studio in India, known for our thoughtful approach, premium craftsmanship, and unwavering commitment to client satisfaction.",
  },
  cta: {
    heading: "Let's create something",
    headingAccent: "extraordinary.",
    subtitle: "Start a conversation about your dream space today.",
    buttonText: "Get in touch",
  },
};

export async function getAboutData(): Promise<AboutData> {
  if (!hasSanityConfig) return defaultAboutData;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await client.fetch<any>(aboutQuery);
    if (!res) return defaultAboutData;
    return {
      hero: {
        eyebrow: res.heroEyebrow || defaultAboutData.hero.eyebrow,
        title: res.heroTitle || defaultAboutData.hero.title,
        titleAccent: res.heroTitleAccent || defaultAboutData.hero.titleAccent,
        subtitle: res.heroSubtitle || defaultAboutData.hero.subtitle,
        backgroundImage: res.heroBackgroundImage || defaultAboutData.hero.backgroundImage,
      },
      story: {
        eyebrow: res.storyEyebrow || defaultAboutData.story.eyebrow,
        heading: res.storyHeading || defaultAboutData.story.heading,
        headingAccent: res.storyHeadingAccent || defaultAboutData.story.headingAccent,
        paragraphs: res.storyParagraphs?.length ? res.storyParagraphs : defaultAboutData.story.paragraphs,
        image: res.storyImage || defaultAboutData.story.image,
      },
      values: res.values?.length ? res.values : defaultAboutData.values,
      stats: res.stats?.length ? res.stats : defaultAboutData.stats,
      mission: res.mission?.heading ? res.mission : defaultAboutData.mission,
      vision: res.vision?.heading ? res.vision : defaultAboutData.vision,
      cta: res.cta?.heading ? res.cta : defaultAboutData.cta,
    };
  } catch {
    return defaultAboutData;
  }
}

// ----------------------------------------------------
// Services Page Data
// ----------------------------------------------------
export interface ServiceItem {
  name: string;
  desc: string;
  icon: string;
}

export interface ServicesData {
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    backgroundImage: string;
  };
  residential: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    description: string;
    items: ServiceItem[];
  };
  commercial: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    description: string;
    items: ServiceItem[];
  };
  enterprise: {
    eyebrow: string;
    heading: string;
    headingAccent: string;
    description: string;
    items: ServiceItem[];
  };
  cta: {
    heading: string;
    description: string;
    buttonText: string;
  };
}

export const defaultServicesData: ServicesData = {
  hero: {
    eyebrow: "OUR SERVICES",
    title: "Designing every kind",
    titleAccent: "of space.",
    subtitle: "From residential dream homes to enterprise workplaces, we bring thoughtful design to every scale.",
    backgroundImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=85",
  },
  residential: {
    eyebrow: "RESIDENTIAL",
    heading: "Homes designed around",
    headingAccent: "you.",
    description: "Elegant apartments and sophisticated villas, balanced for beauty, comfort and the rhythms of everyday life.",
    items: [
      { name: "Apartment 2BHK Interior", desc: "Smart, space-efficient designs that transform compact 2BHK apartments into elegant, functional living spaces.", icon: "🏠" },
      { name: "3BHK Interiors", desc: "Balanced layouts with premium finishes, creating distinct zones for family, work and relaxation.", icon: "🏡" },
      { name: "4BHK Interiors", desc: "Spacious, luxurious interiors with custom furnishings and refined material palettes throughout.", icon: "🏘️" },
      { name: "Villa", desc: "Grand-scale villa interiors combining architectural drama with intimate, liveable comfort.", icon: "🏛️" },
      { name: "Bungalow", desc: "Classic bungalow interiors with modern sensibilities, designed around natural light and open flow.", icon: "🌿" },
    ],
  },
  commercial: {
    eyebrow: "COMMERCIAL",
    heading: "Spaces that build",
    headingAccent: "experiences.",
    description: "Memorable environments that strengthen your brand and elevate each customer interaction.",
    items: [
      { name: "Office Workspaces", desc: "Productive, inspiring work environments that reflect your company culture and boost team performance.", icon: "💼" },
      { name: "Retail Outlets", desc: "Store designs that guide the customer journey, strengthen brand identity and drive conversions.", icon: "🛍️" },
      { name: "Hospitality", desc: "Hotels, restaurants and cafés designed for memorable guest experiences and operational excellence.", icon: "🍽️" },
      { name: "Healthcare & Clinics", desc: "Calming, hygienic spaces that prioritize patient comfort and efficient clinical workflows.", icon: "🏥" },
      { name: "Educational & Institutions", desc: "Dynamic learning environments designed to inspire focus, creativity and collaboration.", icon: "🎓" },
    ],
  },
  enterprise: {
    eyebrow: "ENTERPRISE",
    heading: "Workplaces calibrated for",
    headingAccent: "performance.",
    description: "Corporate environments designed for people, purpose and long-term value.",
    items: [
      { name: "Corporate Office Interiors", desc: "Executive-grade office spaces with boardrooms, lounges and workstations that command presence.", icon: "🏢" },
      { name: "Collaborative Workspaces", desc: "Open-plan co-working environments designed for flexibility, interaction and innovation.", icon: "🤝" },
      { name: "Biophilic Enterprise Design", desc: "Nature-integrated workspaces that boost wellness, reduce stress and enhance productivity.", icon: "🌱" },
    ],
  },
  cta: {
    heading: "Ready to transform your space?",
    description: "Let's discuss your project and bring your vision to life.",
    buttonText: "Get in touch",
  },
};

export async function getServicesData(): Promise<ServicesData> {
  if (!hasSanityConfig) return defaultServicesData;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await client.fetch<any>(servicesQuery);
    if (!res) return defaultServicesData;
    return {
      hero: {
        eyebrow: res.heroEyebrow || defaultServicesData.hero.eyebrow,
        title: res.heroTitle || defaultServicesData.hero.title,
        titleAccent: res.heroTitleAccent || defaultServicesData.hero.titleAccent,
        subtitle: res.heroSubtitle || defaultServicesData.hero.subtitle,
        backgroundImage: res.heroBackgroundImage || defaultServicesData.hero.backgroundImage,
      },
      residential: {
        eyebrow: res.residential?.eyebrow || defaultServicesData.residential.eyebrow,
        heading: res.residential?.heading || defaultServicesData.residential.heading,
        headingAccent: res.residential?.headingAccent || defaultServicesData.residential.headingAccent,
        description: res.residential?.description || defaultServicesData.residential.description,
        items: res.residential?.items?.length ? res.residential.items : defaultServicesData.residential.items,
      },
      commercial: {
        eyebrow: res.commercial?.eyebrow || defaultServicesData.commercial.eyebrow,
        heading: res.commercial?.heading || defaultServicesData.commercial.heading,
        headingAccent: res.commercial?.headingAccent || defaultServicesData.commercial.headingAccent,
        description: res.commercial?.description || defaultServicesData.commercial.description,
        items: res.commercial?.items?.length ? res.commercial.items : defaultServicesData.commercial.items,
      },
      enterprise: {
        eyebrow: res.enterprise?.eyebrow || defaultServicesData.enterprise.eyebrow,
        heading: res.enterprise?.heading || defaultServicesData.enterprise.heading,
        headingAccent: res.enterprise?.headingAccent || defaultServicesData.enterprise.headingAccent,
        description: res.enterprise?.description || defaultServicesData.enterprise.description,
        items: res.enterprise?.items?.length ? res.enterprise.items : defaultServicesData.enterprise.items,
      },
      cta: res.cta?.heading ? res.cta : defaultServicesData.cta,
    };
  } catch {
    return defaultServicesData;
  }
}

// ----------------------------------------------------
// Gallery Page Data
// ----------------------------------------------------
export interface GalleryItem {
  name: string;
  location: string;
  type: string;
  image: string;
  status?: "Ongoing" | "Completed";
  progress?: number;
  year?: string;
}

export const defaultOngoingProjects: GalleryItem[] = [
  { name: "Modern Villa Interiors", location: "Kochi", type: "Residential", image: "/images/Living Room/Living Room/4.png", progress: 75, status: "Ongoing" },
  { name: "Corporate Office Redesign", location: "Bengaluru", type: "Enterprise", image: "/images/Commercial/Commercial/Hotel.png", progress: 45, status: "Ongoing" },
  { name: "Luxury 4BHK Apartment", location: "Chennai", type: "Residential", image: "/images/Bedroom/Bedroom/Premium.png", progress: 60, status: "Ongoing" },
  { name: "Restaurant & Café", location: "Kochi", type: "Commercial", image: "/images/Kitchen/Kitchen/Modern Kitchen (1).png", progress: 30, status: "Ongoing" },
];

export const defaultCompletedProjects: GalleryItem[] = [
  { name: "Contemporary Residence", location: "Kochi", type: "Residential", image: "/images/Living Room/Living Room/1.png", year: "2026", status: "Completed" },
  { name: "Premium 3BHK Interior", location: "Thrissur", type: "Residential", image: "/images/Bedroom/Bedroom/Classic Bedroom.png", year: "2026", status: "Completed" },
  { name: "Dental Clinic Design", location: "Ernakulam", type: "Healthcare", image: "/images/Commercial/Commercial/Dental Clinic.png", year: "2025", status: "Completed" },
  { name: "Modern Kitchen & Dining", location: "Kochi", type: "Residential", image: "/images/Kitchen/Kitchen/1.png", year: "2025", status: "Completed" },
  { name: "Kids Room Collection", location: "Bengaluru", type: "Residential", image: "/images/Kids Room/Kids Room/Kids Room.png", year: "2025", status: "Completed" },
  { name: "Luxury Living Spaces", location: "Mumbai", type: "Residential", image: "/images/Living Room/Living Room/Living.png", year: "2024", status: "Completed" },
];

export async function getGalleryData(): Promise<{ ongoing: GalleryItem[]; completed: GalleryItem[] }> {
  if (!hasSanityConfig) return { ongoing: defaultOngoingProjects, completed: defaultCompletedProjects };
  try {
    const list = await client.fetch<GalleryItem[]>(galleryQuery);
    if (!list || list.length === 0) {
      return { ongoing: defaultOngoingProjects, completed: defaultCompletedProjects };
    }
    const ongoing = list.filter((p) => p.status === "Ongoing" && Boolean(p.image));
    const completed = list.filter((p) => p.status === "Completed" && Boolean(p.image));
    return {
      ongoing: ongoing.length ? ongoing : defaultOngoingProjects,
      completed: completed.length ? completed : defaultCompletedProjects,
    };
  } catch {
    return { ongoing: defaultOngoingProjects, completed: defaultCompletedProjects };
  }
}

// ----------------------------------------------------
// Products Page Data
// ----------------------------------------------------
export interface ProductItemData {
  name: string;
  desc: string;
  features: string[];
  image: string;
  icon?: string;
}

export const defaultProductsData: ProductItemData[] = [
  {
    name: "Wooden Furnitures",
    desc: "Handcrafted solid wood furniture built with premium teak, walnut and oak. From dining tables to bookshelves, each piece is designed for lasting beauty and structural integrity.",
    features: ["Solid wood construction", "Custom finishes", "Lifetime durability", "Traditional & modern styles"],
    image: "/images/Dining/Dining/Dining.png",
    icon: "🪵",
  },
  {
    name: "Custom Made Sofas",
    desc: "Bespoke sofa designs tailored to your space, style and comfort preferences. Choose your fabric, dimensions and configuration for a truly personal centrepiece.",
    features: ["Made to measure", "Premium fabrics", "Ergonomic design", "5-year frame warranty"],
    image: "/images/Living Room/Living Room/Living.png",
    icon: "🛋️",
  },
  {
    name: "Cushion Furnitures",
    desc: "Luxuriously upholstered accent chairs, ottomans and seating designed for comfort without compromising on aesthetics. Perfect for living rooms and lounges.",
    features: ["High-density foam", "Stain-resistant fabrics", "Modular options", "Designer patterns"],
    image: "/images/Living Room/Living Room/3.png",
    icon: "💺",
  },
  {
    name: "Recliners",
    desc: "Premium recliners with smooth mechanisms, plush cushioning and elegant leather or fabric upholstery. Designed for ultimate relaxation in your living space.",
    features: ["Manual & motorized", "Genuine leather options", "Zero-gravity positions", "Built-in lumbar support"],
    image: "/images/Living Room/Living Room/7.png",
    icon: "🪑",
  },
  {
    name: "Curtains",
    desc: "Curated curtain collections ranging from sheer elegance to blackout luxury. Custom lengths, motorized tracks and premium fabrics to complement every interior.",
    features: ["Motorized options", "Blackout & sheer", "Custom sizing", "UV protection"],
    image: "/images/Bedroom/Bedroom/Bedroom.png",
    icon: "🪟",
  },
];

export async function getProductsData(): Promise<ProductItemData[]> {
  if (!hasSanityConfig) return defaultProductsData;
  try {
    const list = await client.fetch<ProductItemData[]>(productsQuery);
    const valid = list?.filter((p) => Boolean(p.name && p.image)) ?? [];
    return valid.length ? valid : defaultProductsData;
  } catch {
    return defaultProductsData;
  }
}

// ----------------------------------------------------
// Portfolio Categories & Sub-Page Data
// ----------------------------------------------------
export interface RoomFeature {
  title: string;
  desc: string;
}

export interface RoomData {
  name: string;
  slug?: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  heroImage: string;
  coverImage?: string;
  overview: string;
  features: RoomFeature[];
  materials: string[];
  images: string[];
}

export const defaultRoomsData: Record<string, RoomData> = {
  "living-room": {
    name: "Living Room",
    eyebrow: "PORTFOLIO · LIVING ROOMS",
    title: "The heart of",
    titleAccent: "the home.",
    subtitle: "Sophisticated living spaces balanced for comfort, conversation, and visual grandeur.",
    heroImage: "/images/Living Room/Living Room/Living.png",
    overview: "Our living room designs combine architectural lighting, bespoke media consoles, and curated seating configurations to create spaces that welcome and inspire.",
    features: [
      { title: "Bespoke Entertainment Consoles", desc: "Concealed wire management, fluted wall claddings, and floating stone-finish credenzas." },
      { title: "Architectural Ceiling & Illumination", desc: "Warm recessed cove lights, profile tracks, and designer accent pendants." },
      { title: "Custom Seating & Upholstery", desc: "Ergonomic sofa layouts engineered with stain-resistant premium textiles." },
    ],
    materials: ["Italian Marble Accents", "Smoked Oak Veneer", "Warm Brass Detailing", "Acoustic Wall Panels"],
    images: [
      "/images/Living Room/Living Room/Living.png",
      "/images/Living Room/Living Room/1.png",
      "/images/Living Room/Living Room/129 Living.png",
      "/images/Living Room/Living Room/2.png",
      "/images/Living Room/Living Room/3.png",
      "/images/Living Room/Living Room/4.png",
      "/images/Living Room/Living Room/5.png",
      "/images/Living Room/Living Room/6 (1).png",
      "/images/Living Room/Living Room/6 (3).png",
      "/images/Living Room/Living Room/7.png",
      "/images/Living Room/Living Room/8.png",
    ],
  },
  "modular-kitchen": {
    name: "Modular Kitchen",
    eyebrow: "PORTFOLIO · KITCHENS",
    title: "Precision engineered",
    titleAccent: "culinary hubs.",
    subtitle: "German-standard modular hardware, seamless anti-fingerprint surfaces, and intuitive work triangles.",
    heroImage: "/images/Kitchen/Kitchen/Modern Kitchen (1).png",
    overview: "Every kitchen we craft maximizes functional efficiency through smart corner pullouts, integrated appliances, and durable, heat-resistant quartz worktops.",
    features: [
      { title: "Ergonomic Golden Triangle", desc: "Effortless flow between preparation, cooking, and refrigeration zones." },
      { title: "Hettich & Ebco Soft-Close Systems", desc: "Heavy-duty tandem drawers, lift-up bi-fold shutters, and silent-close hinges." },
      { title: "Quartz & Solid Countertops", desc: "Non-porous, scratch-proof surfaces designed for everyday heavy Indian cooking." },
    ],
    materials: ["Anti-fingerprint Acrylic", "BWP Grade Marine Plywood", "Quartz Countertops", "Lacquer Glass Shutters"],
    images: [
      "/images/Kitchen/Kitchen/Modern Kitchen (1).png",
      "/images/Kitchen/Kitchen/1.png",
      "/images/Kitchen/Kitchen/Modern Kitchen (2).png",
      "/images/Kitchen/Kitchen/Modern Kitchen (3).png",
      "/images/Kitchen/Kitchen/Modern Kitchen (4).png",
      "/images/Kitchen/Kitchen/dining_room_premium_daylight.jpg",
    ],
  },
  kitchen: {
    name: "Modular Kitchen",
    eyebrow: "PORTFOLIO · KITCHENS",
    title: "Precision engineered",
    titleAccent: "culinary hubs.",
    subtitle: "German-standard modular hardware, seamless anti-fingerprint surfaces, and intuitive work triangles.",
    heroImage: "/images/Kitchen/Kitchen/Modern Kitchen (1).png",
    overview: "Every kitchen we craft maximizes functional efficiency through smart corner pullouts, integrated appliances, and durable, heat-resistant quartz worktops.",
    features: [
      { title: "Ergonomic Golden Triangle", desc: "Effortless flow between preparation, cooking, and refrigeration zones." },
      { title: "Hettich & Ebco Soft-Close Systems", desc: "Heavy-duty tandem drawers, lift-up bi-fold shutters, and silent-close hinges." },
      { title: "Quartz & Solid Countertops", desc: "Non-porous, scratch-proof surfaces designed for everyday heavy Indian cooking." },
    ],
    materials: ["Anti-fingerprint Acrylic", "BWP Grade Marine Plywood", "Quartz Countertops", "Lacquer Glass Shutters"],
    images: [
      "/images/Kitchen/Kitchen/Modern Kitchen (1).png",
      "/images/Kitchen/Kitchen/1.png",
      "/images/Kitchen/Kitchen/Modern Kitchen (2).png",
      "/images/Kitchen/Kitchen/Modern Kitchen (3).png",
      "/images/Kitchen/Kitchen/Modern Kitchen (4).png",
      "/images/Kitchen/Kitchen/dining_room_premium_daylight.jpg",
    ],
  },
  bedroom: {
    name: "Master & Guest Bedrooms",
    eyebrow: "PORTFOLIO · BEDROOMS",
    title: "Sanctuaries of rest",
    titleAccent: "and quiet luxury.",
    subtitle: "Thoughtfully zoned master suites, walk-in closets, and customized acoustic paneling.",
    heroImage: "/images/Bedroom/Bedroom/Classic Bedroom.png",
    overview: "We turn bedrooms into deeply restorative personal sanctuaries with integrated lighting scenes, upholstered feature headboards, and ample storage solutions.",
    features: [
      { title: "Floor-to-Ceiling Wardrobes", desc: "Custom tinted glass, sensor LED wardrobe profiles, and built-in vanity stations." },
      { title: "Acoustic Bedhead Paneling", desc: "Fabric or leatherette wrapped wall panels that dampen ambient noise." },
      { title: "Multifunctional Study Desks", desc: "Integrated executive work nooks that blend harmoniously into room aesthetics." },
    ],
    materials: ["Fluted Wood Slats", "Tinted Mirrored Shutters", "Italian Leatherette", "Warm Neutral Laminates"],
    images: [
      "/images/Bedroom/Bedroom/Classic Bedroom.png",
      "/images/Bedroom/Bedroom/Premium.png",
      "/images/Bedroom/Bedroom/Bedroom.png",
      "/images/Bedroom/Bedroom/Classic Bedroom wardrobe with work table.png",
      "/images/Bedroom/Bedroom/Pastel with wood combo.png",
      "/images/Bedroom/Bedroom/Walk-in-Wardrobe 1.png",
      "/images/Bedroom/Bedroom/Walk-in-Wardrobe 2.png",
      "/images/Bedroom/Bedroom/a_cozy_modern_minimalist_bedroom_interior_photogr.png",
      "/images/Bedroom/Bedroom/1.jpeg",
      "/images/Bedroom/Bedroom/2.jpeg",
      "/images/Bedroom/Bedroom/3 (1).png",
      "/images/Bedroom/Bedroom/3 (2).png",
    ],
  },
  "kids-room": {
    name: "Kids Room",
    eyebrow: "PORTFOLIO · KIDS ROOMS",
    title: "Spaces to imagine,",
    titleAccent: "learn and grow.",
    subtitle: "Playful, safe, and adaptable children's rooms designed with ergonomic storage and study setups.",
    heroImage: "/images/Kids Room/Kids Room/Kids Room.png",
    overview: "Designed to evolve as your children grow, our kids' rooms balance creative play, structured study space, and generous toy and book organization.",
    features: [
      { title: "Safe Rounded Edges", desc: "Child-safe finishes, non-toxic waterborne coatings, and soft cushioned edges." },
      { title: "Loft Beds & Study Hubs", desc: "Space-saving bunk or loft arrangements with integrated work desks." },
      { title: "Accessible Organization", desc: "Low-height modular cubbies, drawer organizers, and colorful pin-up display walls." },
    ],
    materials: ["Non-toxic Pastel Laminates", "Birch Plywood", "Magnetic Whiteboard Paneling", "Soft Fabrics"],
    images: [
      "/images/Kids Room/Kids Room/Kids Room.png",
      "/images/Kids Room/Kids Room/Loft Bed with study table.png",
      "/images/Kids Room/Kids Room/6 (2).png",
      "/images/Kids Room/Kids Room/ChatGPT Image Aug 26, 2026, 04_10_34 PM.png",
    ],
  },
  dining: {
    name: "Dining Spaces",
    eyebrow: "PORTFOLIO · DINING",
    title: "Moments made",
    titleAccent: "around the table.",
    subtitle: "Warm, inviting dining rooms engineered for both family dinners and memorable hosting.",
    heroImage: "/images/Dining/Dining/Dining.png",
    overview: "We shape dining rooms that foster connection, highlighting distinctive light fixtures, statement tables, and complementary crockery cabinets.",
    features: [
      { title: "Custom Statement Tables", desc: "Solid hardwood, ceramic-topped, and marble dining tables seating 6 to 10 guests." },
      { title: "Bar & Crockery Units", desc: "Backlit fluted glass bar display cabinets with dedicated wine rack storage." },
      { title: "Layered Dining Lighting", desc: "Low-hanging pendant chandeliers paired with dimmable perimeter warm spots." },
    ],
    materials: ["Italian Sintered Stone", "Solid Teak & Oak", "Frosted & Reeded Glass", "Brushed Brass"],
    images: [
      "/images/Dining/Dining/Dining.png",
      "/images/Dining/Dining/2.png",
      "/images/Kitchen/Kitchen/dining_room_premium_daylight.jpg",
    ],
  },
  office: {
    name: "Home Office & Workspaces",
    eyebrow: "PORTFOLIO · OFFICES",
    title: "Focused calm for",
    titleAccent: "deep work.",
    subtitle: "Ergonomically tuned study nooks, executive cabins, and modern home office suites.",
    heroImage: "/images/Commercial/Commercial/Hotel.png",
    overview: "Designed for concentration and productivity, our office interiors optimize natural light, conceal cables, and feature acoustic dampening surfaces.",
    features: [
      { title: "Cable-Free Desks", desc: "Hidden grommets, power docks, and integrated cable raceways." },
      { title: "Acoustic Wall Cladding", desc: "Fabric panels and wooden baffles that minimize echo during video conferences." },
      { title: "Custom Bookcases & Credenzas", desc: "Ample filing capacity, display shelving for awards and curated books." },
    ],
    materials: ["Smoked Walnut", "Powder-coated Matte Black Steel", "Acoustic Felt", "Lacquered Glass"],
    images: [
      "/images/Commercial/Commercial/Hotel.png",
      "/images/Commercial/Commercial/Dental Clinic.png",
      "/images/Bedroom/Bedroom/Classic Bedroom wardrobe with work table.png",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  commercial: {
    name: "Commercial Spaces",
    eyebrow: "PORTFOLIO · COMMERCIAL",
    title: "Environments that",
    titleAccent: "elevate your brand.",
    subtitle: "Retail storefronts, boutique hotels, restaurants, and medical clinics that leave lasting impressions.",
    heroImage: "/images/Commercial/Commercial/Hotel.png",
    overview: "Commercial interiors engineered to support customer movement, brand storytelling, and high-traffic resilience.",
    features: [
      { title: "High-Traffic Surface Durability", desc: "Commercial grade laminate coatings and anti-skid porcelain flooring." },
      { title: "Brand Identity Integration", desc: "Custom reception desks, 3D backlit logo walls, and display vitrines." },
      { title: "Compliant HVAC & Lighting Layouts", desc: "Energy-efficient lighting distribution and optimized climate airflows." },
    ],
    materials: ["Corian Solid Surfaces", "Commercial Vitrified Tiles", "Architectural LED Tracks", "Acoustic Ceiling Grid"],
    images: [
      "/images/Commercial/Commercial/Hotel.png",
      "/images/Commercial/Commercial/Dental Clinic.png",
      "/images/Commercial/Commercial/Dental Clinic 1.png",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  bathroom: {
    name: "Luxury Bathrooms",
    eyebrow: "PORTFOLIO · BATHROOMS",
    title: "Spa-like calm in",
    titleAccent: "your own home.",
    subtitle: "Waterproofed modular vanities, LED back-lit mirrors, and concealed plumbing suites.",
    heroImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
    overview: "We turn functional bathrooms into luxurious private retreats with floating vanities, niche lighting, and walk-in rain showers.",
    features: [
      { title: "Moisture-Resistant Vanities", desc: "100% waterproof HDHMR cabinetry with soft-close drawer organizers." },
      { title: "LED Backlit Mirrors", desc: "Anti-fog demister mirrors with customizable daylight/warm light settings." },
      { title: "Seamless Glass Partitions", desc: "Toughened frameless glass enclosures separating wet and dry zones." },
    ],
    materials: ["Large Format Porcelain Slabs", "Waterproof HDHMR", "Rose Gold & Matte Black Fixtures", "Fluted Glass"],
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80",
      "/images/Bedroom/Bedroom/Walk-in-Wardrobe 1.png",
      "/images/Bedroom/Bedroom/Walk-in-Wardrobe 2.png",
    ],
  },
};

export interface PortfolioCategoryData {
  name: string;
  slug: string;
  coverImage?: string;
  images: string[];
}

export const defaultPortfolioCategories: PortfolioCategoryData[] = [
  { name: defaultRoomsData["living-room"].name, slug: "living-room", images: defaultRoomsData["living-room"].images },
  { name: defaultRoomsData["modular-kitchen"].name, slug: "modular-kitchen", images: defaultRoomsData["modular-kitchen"].images },
  { name: defaultRoomsData["bedroom"].name, slug: "bedroom", images: defaultRoomsData["bedroom"].images },
  { name: defaultRoomsData["kids-room"].name, slug: "kids-room", images: defaultRoomsData["kids-room"].images },
  { name: defaultRoomsData["dining"].name, slug: "dining", images: defaultRoomsData["dining"].images },
  { name: defaultRoomsData["office"].name, slug: "office", images: defaultRoomsData["office"].images },
  { name: defaultRoomsData["commercial"].name, slug: "commercial", images: defaultRoomsData["commercial"].images },
  { name: defaultRoomsData["bathroom"].name, slug: "bathroom", images: defaultRoomsData["bathroom"].images },
];

export async function getPortfolioCategories(): Promise<PortfolioCategoryData[]> {
  if (!hasSanityConfig) return defaultPortfolioCategories;
  try {
    const list = await client.fetch<PortfolioCategoryData[]>(portfolioCategoriesQuery);
    const valid = list?.filter((c) => c.images && c.images.length > 0) ?? [];
    return valid.length ? valid : defaultPortfolioCategories;
  } catch {
    return defaultPortfolioCategories;
  }
}

export async function getPortfolioCategoryBySlug(slug: string): Promise<RoomData | null> {
  const normalizedSlug = slug.toLowerCase();
  const fallbackKey = normalizedSlug === "modular-kitchen" ? "modular-kitchen" : normalizedSlug;
  const fallback = defaultRoomsData[fallbackKey] || defaultRoomsData[normalizedSlug] || null;

  if (!hasSanityConfig) return fallback;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await client.fetch<any>(portfolioCategoryBySlugQuery, { slug: normalizedSlug });
    if (!res) return fallback;

    const validImages = Array.isArray(res.images) ? res.images.filter((img: unknown) => typeof img === "string" && img.length > 0) : [];

    return {
      name: res.name || fallback?.name || "",
      slug: res.slug || normalizedSlug,
      eyebrow: res.eyebrow || fallback?.eyebrow || `PORTFOLIO · ${res.name?.toUpperCase() || ""}`,
      title: res.heroTitle || fallback?.title || res.name || "",
      titleAccent: res.heroTitleAccent || fallback?.titleAccent || "",
      subtitle: res.heroSubtitle || fallback?.subtitle || "",
      heroImage: res.heroImage || res.coverImage || (validImages.length > 0 ? validImages[0] : fallback?.heroImage || ""),
      coverImage: res.coverImage || fallback?.coverImage,
      overview: res.overview || fallback?.overview || "",
      features: (res.features && res.features.length > 0) ? res.features : fallback?.features || [],
      materials: (res.materials && res.materials.length > 0) ? res.materials : fallback?.materials || [],
      images: validImages.length > 0 ? validImages : fallback?.images || [],
    };
  } catch {
    return fallback;
  }
}

// ----------------------------------------------------
// Testimonials Data
// ----------------------------------------------------
export interface TestimonialData {
  quote: string;
  name: string;
  place: string;
  project: string;
  rating: number;
}

export const defaultTestimonials: TestimonialData[] = [
  {
    quote: "The team listened closely, then made every room feel more considered than we imagined possible. Our 3BHK apartment feels like a luxury villa now.",
    name: "Priya & Arun Menon",
    place: "Kochi",
    project: "3BHK Apartment Interior",
    rating: 5,
  },
  {
    quote: "The process was grounded, thoughtful and exceptionally clear from the first sketch to the final detail. Our office space completely transformed.",
    name: "Rajesh Kumar",
    place: "Bengaluru",
    project: "Corporate Office Design",
    rating: 5,
  },
  {
    quote: "Vinskape understood our brand identity and translated it beautifully into our restaurant space. Customers constantly compliment the ambiance.",
    name: "Sneha Patel",
    place: "Mumbai",
    project: "Restaurant Interior",
    rating: 5,
  },
  {
    quote: "From modular kitchen to kids room, every single space in our villa was designed with such attention to detail. Truly exceptional work.",
    name: "Dr. Anand & Deepa",
    place: "Thrissur",
    project: "Villa Interior",
    rating: 5,
  },
  {
    quote: "The dental clinic design they created puts our patients at ease instantly. The calming colors and smart layout have made a real difference.",
    name: "Dr. Sarah Thomas",
    place: "Ernakulam",
    project: "Dental Clinic Design",
    rating: 5,
  },
  {
    quote: "We chose Vinskape for our 4BHK and the results exceeded all expectations. The walk-in wardrobe alone is worth every penny!",
    name: "Mohammed & Fathima",
    place: "Calicut",
    project: "4BHK Premium Interior",
    rating: 5,
  },
];

export async function getTestimonials(): Promise<TestimonialData[]> {
  if (!hasSanityConfig) return defaultTestimonials;
  try {
    const list = await client.fetch<TestimonialData[]>(testimonialsQuery);
    return list?.length ? list : defaultTestimonials;
  } catch {
    return defaultTestimonials;
  }
}

// ----------------------------------------------------
// Contact Page Data
// ----------------------------------------------------
export interface ContactPageData {
  heroEyebrow: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heading: string;
  headingAccent: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  instagram: string;
  facebook?: string;
  linkedin?: string;
}

export const defaultContactData: ContactPageData = {
  heroEyebrow: "CONTACT VINSKAPE",
  heroTitle: "Bring us the beginning",
  heroTitleAccent: "of an idea.",
  heroSubtitle: "Whether it's a question, a concept, or a complete brief — we'd love to hear from you.",
  heading: "Let's start a",
  headingAccent: "conversation.",
  description: "Reach out to us through any of the channels below, or fill out the form and we'll get back to you within 24 hours.",
  phone: "+91 81110 00245",
  whatsapp: "+91 81110 00245",
  email: "studio@vinskape.in",
  address: "S.No.75 Ponmar Kandigai Road, Opposite Jones Castle Valley, Vengadamangalam, Chennai - 600127",
  workingHours: "Mon–Sat, 09:30–19:00",
  instagram: "https://www.instagram.com/vinskape?igsi=MXQwYW5qZHYyMDFpaA==",
};

export async function getContactData(): Promise<ContactPageData> {
  if (!hasSanityConfig) return defaultContactData;
  try {
    const res = await client.fetch<Partial<ContactPageData>>(contactQuery);
    if (!res) return defaultContactData;
    return {
      heroEyebrow: res.heroEyebrow || defaultContactData.heroEyebrow,
      heroTitle: res.heroTitle || defaultContactData.heroTitle,
      heroTitleAccent: res.heroTitleAccent || defaultContactData.heroTitleAccent,
      heroSubtitle: res.heroSubtitle || defaultContactData.heroSubtitle,
      heading: res.heading || defaultContactData.heading,
      headingAccent: res.headingAccent || defaultContactData.headingAccent,
      description: res.description || defaultContactData.description,
      phone: res.phone || defaultContactData.phone,
      whatsapp: res.whatsapp || defaultContactData.whatsapp,
      email: res.email || defaultContactData.email,
      address: res.address || defaultContactData.address,
      workingHours: res.workingHours || defaultContactData.workingHours,
      instagram: res.instagram || defaultContactData.instagram,
      facebook: res.facebook,
      linkedin: res.linkedin,
    };
  } catch {
    return defaultContactData;
  }
}
