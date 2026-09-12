"use client";

import Image from "next/image";
import { useState } from "react";

interface PortfolioGalleryGridProps {
  images: string[];
  name: string;
}

export function PortfolioGalleryGrid({ images, name }: PortfolioGalleryGridProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <div className="pf-grid">
        {images.map((img, i) => (
          <button
            key={`${img}-${i}`}
            type="button"
            className={`pf-item ${i === 0 ? "pf-item--large" : ""}`}
            onClick={() => setLightbox(img)}
            aria-label={`View ${name} photo ${i + 1}`}
          >
            <Image
              src={img}
              alt={`${name} design ${i + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="pf-item-overlay">
              <span className="pf-item-zoom">⊕</span>
            </div>
          </button>
        ))}
      </div>

      {lightbox && (
        <div className="pf-lightbox" onClick={() => setLightbox(null)}>
          <button
            type="button"
            className="pf-lightbox-close"
            onClick={() => setLightbox(null)}
            aria-label="Close photo preview"
          >
            ✕
          </button>
          <div className="pf-lightbox-img">
            <Image src={lightbox} alt="Enlarged view" fill sizes="100vw" style={{ objectFit: "contain" }} />
          </div>
        </div>
      )}
    </>
  );
}
