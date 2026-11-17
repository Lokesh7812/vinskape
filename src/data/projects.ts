// ─── Project Data ───────────────────────────────────────────
// Central data file for all gallery projects.
// Add real photos by placing images in /public/projects/<slug>/
// and updating the photos array below.

export type ProjectStatus = "ongoing" | "completed";
export type ProjectCategory = "Residential" | "Commercial" | "Healthcare";

interface ProjectBase {
  slug: string;
  title: string;
  location: string;
  category: ProjectCategory;
  status: ProjectStatus;
  coverImage: string;
  description: string;
  tags: string[];
  photos: string[];
  order?: number;
}

export interface OngoingProject extends ProjectBase {
  status: "ongoing";
  progress: number;
  latestUpdate: string;
}

export interface CompletedProject extends ProjectBase {
  status: "completed";
  completedYear: number | string;
  beforeImage?: string;
  afterImage: string;
}

export type Project = OngoingProject | CompletedProject;

export const projects: Project[] = [
  // ── Ongoing ──────────────────────────────────────────────
  {
    slug: "modern-villa-interiors",
    title: "Modern Villa Interiors",
    location: "Ponmar, Chennai",
    category: "Residential",
    status: "ongoing",
    coverImage: "/images/Living Room/Living Room/4.png",
    description:
      "Full interior execution featuring custom false ceiling, cove lighting, Italian marble accents, and built-in entertainment units.",
    tags: ["False Ceiling", "Italian Marble", "Living & Dining"],
    photos: [
      "/images/Living Room/Living Room/4.png",
      "/images/Living Room/Living Room/5.png",
      "/images/Living Room/Living Room/3.png",
    ],
    progress: 75,
    latestUpdate: "False ceiling and lighting, Feb 2026",
  },
  {
    slug: "luxury-4bhk-apartment",
    title: "Luxury 4BHK Apartment",
    location: "Jones Castle Valley, Chennai",
    category: "Residential",
    status: "ongoing",
    coverImage: "/images/Bedroom/Bedroom/Premium.png",
    description:
      "Master bedroom suite with fluted wall paneling, integrated acoustic headboard, and walk-in wardrobe cabinetry.",
    tags: ["Master Suite", "Fluted Panels", "Walk-in Closet"],
    photos: [
      "/images/Bedroom/Bedroom/Premium.png",
      "/images/Bedroom/Bedroom/Walk-in-Wardrobe 1.png",
      "/images/Bedroom/Bedroom/Walk-in-Wardrobe 2.png",
    ],
    progress: 60,
    latestUpdate: "Wall paneling and wardrobe framing, Jan 2026",
  },
  {
    slug: "boutique-hospitality-cafe",
    title: "Boutique Hospitality & Café",
    location: "ECR, Chennai",
    category: "Commercial",
    status: "ongoing",
    coverImage: "/images/Commercial/Commercial/Hotel.png",
    description:
      "High-end café dining space with custom brass lighting, timber acoustic baffling, and ambient bar counters.",
    tags: ["Hospitality", "Custom Lighting", "Commercial"],
    photos: [
      "/images/Commercial/Commercial/Hotel.png",
      "/images/Commercial/Commercial/Pastel Biophilic Café Interior.png",
    ],
    progress: 45,
    latestUpdate: "Brass lighting install and bar counter, Mar 2026",
  },
  {
    slug: "modular-kitchen-pantry-hub",
    title: "Modular Kitchen & Pantry Hub",
    location: "Vengadamangalam, Chennai",
    category: "Residential",
    status: "ongoing",
    coverImage: "/images/Kitchen/Kitchen/Modern Kitchen (1).png",
    description:
      "Handleless acrylic modular kitchen equipped with Hettich soft-close tandem drawers and quartz island counters.",
    tags: ["Hettich Fittings", "Quartz Countertop", "Modular Kitchen"],
    photos: [
      "/images/Kitchen/Kitchen/Modern Kitchen (1).png",
      "/images/Kitchen/Kitchen/Modern Kitchen (2).png",
      "/images/Kitchen/Kitchen/Modern Kitchen (3).png",
    ],
    progress: 85,
    latestUpdate: "Quartz countertop fitting, Apr 2026",
  },

  // ── Completed ────────────────────────────────────────────
  {
    slug: "contemporary-residence",
    title: "Contemporary Residence",
    location: "Chennai",
    category: "Residential",
    status: "completed",
    coverImage: "/images/Living Room/Living Room/1.png",
    description:
      "Turnkey interior styling with neutral palettes, concealed storage, and custom modular media wall.",
    tags: ["Turnkey", "Contemporary", "Living Room"],
    photos: [
      "/images/Living Room/Living Room/1.png",
      "/images/Living Room/Living Room/2.png",
      "/images/Living Room/Living Room/7.png",
    ],
    completedYear: "2026",
    beforeImage: "/images/Living Room/Living Room/8.png",
    afterImage: "/images/Living Room/Living Room/1.png",
  },
  {
    slug: "classic-master-bedroom-wardrobe",
    title: "Classic Master Bedroom & Wardrobe",
    location: "Chennai",
    category: "Residential",
    status: "completed",
    coverImage: "/images/Bedroom/Bedroom/Classic Bedroom.png",
    description:
      "Warm timber accents, built-in study nook, and seamless floor-to-ceiling wardrobe storage.",
    tags: ["Wardrobe", "Study Unit", "Timber Finish"],
    photos: [
      "/images/Bedroom/Bedroom/Classic Bedroom.png",
      "/images/Bedroom/Bedroom/Classic Bedroom wardrobe with work table.png",
      "/images/Bedroom/Bedroom/Modern bedroom with oak furniture.png",
    ],
    completedYear: "2026",
    beforeImage: "/images/Bedroom/Bedroom/Warm Minimalist Bedroom Alcove.png",
    afterImage: "/images/Bedroom/Bedroom/Classic Bedroom.png",
  },
  {
    slug: "dental-clinic-surgical-lounge",
    title: "Dental Clinic & Surgical Lounge",
    location: "Chennai",
    category: "Healthcare",
    status: "completed",
    coverImage: "/images/Commercial/Commercial/Dental Clinic.png",
    description:
      "Ultra-hygienic clinical interior with seamless acoustic wall cladding, ergonomic reception desk, and calming mood lighting.",
    tags: ["Healthcare", "Acoustic Wall", "Reception"],
    photos: [
      "/images/Commercial/Commercial/Dental Clinic.png",
      "/images/Commercial/Commercial/Dental Clinic 1.png",
    ],
    completedYear: "2025",
    beforeImage: "/images/Commercial/Commercial/Dental Clinic 1.png",
    afterImage: "/images/Commercial/Commercial/Dental Clinic.png",
  },
  {
    slug: "modern-kitchen-breakfast-counter",
    title: "Modern Kitchen & Breakfast Counter",
    location: "Chennai",
    category: "Residential",
    status: "completed",
    coverImage: "/images/Kitchen/Kitchen/1.png",
    description:
      "Dual-tone modular kitchen layout with tall pantry pullouts, Faber chimney integration, and breakfast bar.",
    tags: ["Modular Kitchen", "Faber Appliances", "Breakfast Bar"],
    photos: [
      "/images/Kitchen/Kitchen/1.png",
      "/images/Kitchen/Kitchen/Warm Beige Marble Modern Kitchen.png",
      "/images/Kitchen/Kitchen/Modern minimalistic kitchen design.png",
    ],
    completedYear: "2025",
    beforeImage: "/images/Kitchen/Kitchen/Warm Modern Kitchen with City Views.png",
    afterImage: "/images/Kitchen/Kitchen/1.png",
  },
  {
    slug: "childrens-creative-bedroom",
    title: "Children's Creative Bedroom",
    location: "Chennai",
    category: "Residential",
    status: "completed",
    coverImage: "/images/Kids Room/Kids Room/Kids Room.png",
    description:
      "Playful yet functional children's bedroom with study zones, ergonomic bookshelf storage, and soft rounded cabinetry.",
    tags: ["Kids Bedroom", "Study Desk", "Custom Storage"],
    photos: [
      "/images/Kids Room/Kids Room/Kids Room.png",
      "/images/Kids Room/Kids Room/Loft Bed with study table.png",
      "/images/Kids Room/Kids Room/Warm Minimalist Bedroom with Pink Accents.png",
    ],
    completedYear: "2025",
    beforeImage: "/images/Kids Room/Kids Room/room.png",
    afterImage: "/images/Kids Room/Kids Room/Kids Room.png",
  },
  {
    slug: "bespoke-dining-living-flow",
    title: "Bespoke Dining & Living Flow",
    location: "Chennai",
    category: "Residential",
    status: "completed",
    coverImage: "/images/Dining/Dining/Dining.png",
    description:
      "Open-plan dining experience featuring custom 6-seater dining table, pendant illumination, and partition display credenza.",
    tags: ["Dining Room", "Pendant Lighting", "Open Plan"],
    photos: [
      "/images/Dining/Dining/Dining.png",
      "/images/Dining/Dining/2.png",
    ],
    completedYear: "2024",
    beforeImage: "/images/Living Room/Living Room/129 Living.png",
    afterImage: "/images/Dining/Dining/Dining.png",
  },
];

// ── Helpers ──
export function getOngoingProjects(): OngoingProject[] {
  return projects.filter((p): p is OngoingProject => p.status === "ongoing");
}

export function getCompletedProjects(): CompletedProject[] {
  return projects.filter((p): p is CompletedProject => p.status === "completed");
}
