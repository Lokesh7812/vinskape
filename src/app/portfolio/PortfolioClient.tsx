"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import type { PortfolioCategoryData } from "@/sanity/lib/data";

export function PortfolioClient({ categories }: { categories: PortfolioCategoryData[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (categoryParam && categories.length > 0) {
      const foundIndex = categories.findIndex(
        (c) =>
          c.slug.toLowerCase() === categoryParam.toLowerCase() ||
          c.name.toLowerCase().includes(categoryParam.toLowerCase())
      );
      if (foundIndex !== -1) {
        setActive(foundIndex);
      }
    }
  }, [categoryParam, categories]);

  const cat = categories[active] || categories[0];

  if (!cat) {
    return (
      <div className="shell" style={{ padding: "60px 0" }}>
        No categories available.
      </div>
    );
  }

  return (
    <>
      <section className="pf-section shell">
        {/* Filter tabs */}
        <div className="pf-tabs">
          {categories.map((c, i) => (
            <button
              key={c.slug || c.name}
              className={`pf-tab ${i === active ? "pf-tab--active" : ""}`}
              onClick={() => setActive(i)}
            >
              {c.name}
              <span className="pf-tab-count">{c.images?.length || 0}</span>
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="pf-grid">
          {cat.images && cat.images.length > 0 ? (
            cat.images.map((img, i) => (
              <button
                key={`${img}-${i}`}
                className={`pf-item ${i === 0 ? "pf-item--large" : ""}`}
                onClick={() => setLightbox(img)}
              >
                <Image
                  src={img}
                  alt={`${cat.name} design ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="pf-item-overlay">
                  <span className="pf-item-zoom">⊕</span>
                </div>
              </button>
            ))
          ) : (
            <div className="pf-empty">
              <div className="pf-empty-icon">📐</div>
              <h3>Coming Soon</h3>
              <p>{cat.name} projects are being curated. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="pf-lightbox" onClick={() => setLightbox(null)}>
          <button className="pf-lightbox-close" onClick={() => setLightbox(null)}>
            ✕
          </button>
          <div className="pf-lightbox-img">
            <Image
              src={lightbox}
              alt="Full view"
              fill
              sizes="100vw"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
