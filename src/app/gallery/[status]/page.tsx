import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGalleryProjects, getProjectCounts } from "@/lib/sanity/queries";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ status: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { status: rawStatus } = await params;
  const status = rawStatus?.toLowerCase();
  const isOngoing = status === "ongoing";
  return {
    title: `${isOngoing ? "Ongoing Projects" : "Completed Projects"} | VINSKAPE Gallery`,
    description: isOngoing
      ? "Active interior design sites and modular installations in progress."
      : "Delivered turnkey residential, commercial, and healthcare interior projects.",
  };
}

export default async function GallerySubPage({ params }: PageProps) {
  const { status: rawStatus } = await params;
  const status = rawStatus?.toLowerCase();

  if (status !== "ongoing" && status !== "completed") {
    notFound();
  }

  const [projects, counts] = await Promise.all([
    getGalleryProjects(status as "ongoing" | "completed"),
    getProjectCounts(),
  ]);

  return <GalleryClient status={status as "ongoing" | "completed"} projects={projects} counts={counts} />;
}
