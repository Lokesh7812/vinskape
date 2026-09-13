"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

interface PortfolioGalleryGridProps {
  images: string[];
  name: string;
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    // Lock scroll on both html and body for maximum compatibility
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlHeight = html.style.height;
    const prevBodyHeight = body.style.height;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.height = "100%";
    body.style.height = "100%";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      html.style.height = prevHtmlHeight;
      body.style.height = prevBodyHeight;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100dvh",
        zIndex: 99999,
        background: "rgba(0, 0, 0, 0.96)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: "16px",
        touchAction: "none",
      }}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close photo preview"
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 100000,
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.15)",
          border: "2px solid rgba(255, 255, 255, 0.4)",
          color: "white",
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          lineHeight: 1,
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      >
        ✕
      </button>

      {/* Image container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "92vw",
          height: "80dvh",
          maxWidth: 1200,
          maxHeight: 900,
          cursor: "default",
        }}
      >
        <Image
          src={src}
          alt="Enlarged view"
          fill
          sizes="100vw"
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </div>,
    document.body
  );
}

export function PortfolioGalleryGrid({ images, name }: PortfolioGalleryGridProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

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

      {lightbox && <Lightbox src={lightbox} onClose={closeLightbox} />}
    </>
  );
}
