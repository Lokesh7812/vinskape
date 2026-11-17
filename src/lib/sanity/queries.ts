import { client } from "./client";
import { urlFor } from "./image";
import {
  projects as localProjects,
  getOngoingProjects as getLocalOngoing,
  getCompletedProjects as getLocalCompleted,
  type Project,
  type OngoingProject,
  type CompletedProject,
  type ProjectCategory,
} from "@/data/projects";

export const projectsByStatusQuery = `*[_type == "project" && (status == $status || status == $statusCap)] | order(order asc, _createdAt desc){
  _id,
  title,
  "slug": slug.current,
  status,
  category,
  location,
  description,
  coverImage,
  "coverImageUrl": coverImage.asset->url,
  photos,
  "photoUrls": photos[].asset->url,
  progress,
  latestUpdate,
  beforeImage,
  "beforeImageUrl": beforeImage.asset->url,
  afterImage,
  "afterImageUrl": afterImage.asset->url,
  completedYear,
  order
}`;

export const projectCountsQuery = `{
  "ongoing": count(*[_type == "project" && (status == "ongoing" || status == "Ongoing")]),
  "completed": count(*[_type == "project" && (status == "completed" || status == "Completed")])
}`;

// Helper to convert Sanity image or URL string into an optimized URL
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function resolveImage(img: any, fallbackUrl?: string): string {
  if (fallbackUrl) return fallbackUrl;
  if (!img) return "";
  if (typeof img === "string") return img;
  if (img.asset?._ref) {
    try {
      return urlFor(img).auto("format").fit("max").url();
    } catch {
      return "";
    }
  }
  return "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapSanityProject(doc: any): Project {
  const status = (doc.status || "ongoing").toLowerCase() as "ongoing" | "completed";
  const coverImage = resolveImage(doc.coverImage, doc.coverImageUrl);

  // Extract all photos
  const photos: string[] = [];
  if (Array.isArray(doc.photoUrls) && doc.photoUrls.length > 0) {
    for (const url of doc.photoUrls) {
      if (url) photos.push(url);
    }
  } else if (Array.isArray(doc.photos)) {
    for (const p of doc.photos) {
      const url = resolveImage(p);
      if (url) photos.push(url);
    }
  }
  if (photos.length === 0 && coverImage) {
    photos.push(coverImage);
  }

  const base = {
    slug: doc.slug || doc._id,
    title: doc.title || "Untitled Project",
    location: doc.location || "Chennai",
    category: (doc.category || "Residential") as ProjectCategory,
    description: doc.description || "",
    tags: [doc.category || "Design"].filter(Boolean),
    coverImage: coverImage || "/images/Living Room/Living Room/1.png",
    photos,
    order: typeof doc.order === "number" ? doc.order : 0,
  };

  if (status === "ongoing") {
    const ongoing: OngoingProject = {
      ...base,
      status: "ongoing",
      progress: typeof doc.progress === "number" ? doc.progress : 50,
      latestUpdate: doc.latestUpdate || "Site execution in progress",
    };
    return ongoing;
  }

  const beforeImage = resolveImage(doc.beforeImage, doc.beforeImageUrl) || undefined;
  const afterImage = resolveImage(doc.afterImage, doc.afterImageUrl) || coverImage;

  const completed: CompletedProject = {
    ...base,
    status: "completed",
    completedYear: doc.completedYear || new Date().getFullYear(),
    beforeImage,
    afterImage,
  };
  return completed;
}

export async function getGalleryProjects(status: "ongoing" | "completed"): Promise<Project[]> {
  try {
    const statusCap = status.charAt(0).toUpperCase() + status.slice(1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = await client.fetch<any[]>(projectsByStatusQuery, {
      status,
      statusCap,
    });

    if (results && results.length > 0) {
      return results.map(mapSanityProject);
    }
  } catch (error) {
    console.warn("Sanity fetch failed for gallery projects, using fallback:", error);
  }

  // Graceful fallback to local data
  return status === "ongoing" ? getLocalOngoing() : getLocalCompleted();
}

export async function getProjectCounts(): Promise<{ ongoing: number; completed: number }> {
  try {
    const counts = await client.fetch<{ ongoing: number; completed: number }>(projectCountsQuery);
    if (counts && (counts.ongoing > 0 || counts.completed > 0)) {
      return counts;
    }
  } catch (error) {
    console.warn("Sanity fetch failed for project counts, using fallback:", error);
  }

  // Graceful fallback to local count
  const ongoing = localProjects.filter((p) => p.status === "ongoing").length;
  const completed = localProjects.filter((p) => p.status === "completed").length;
  return { ongoing, completed };
}
