import { Suspense } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { PortfolioClient } from "./PortfolioClient";
import type { Metadata } from "next";
import { getPortfolioCategories } from "@/sanity/lib/data";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio | VINSKAPE Interior Design",
  description: "Browse Vinskape's portfolio of interior spaces across living rooms, kitchens, bedrooms, and more.",
};

export default async function PortfolioPage() {
  const categories = await getPortfolioCategories();

  return (
    <main>
      <PageHero
        eyebrow="OUR PORTFOLIO"
        title="A place for every"
        titleAccent="way of living."
        subtitle="Browse our curated collection of interior spaces across every room and style."
        backgroundImage="/images/Living Room/Living Room/Living.png"
      />
      <Suspense fallback={<div className="shell" style={{ padding: "60px 0" }}>Loading gallery...</div>}>
        <PortfolioClient categories={categories} />
      </Suspense>
    </main>
  );
}
