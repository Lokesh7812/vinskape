"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";
import type { PortfolioCategoryData } from "@/sanity/lib/data";

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
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

export function PortfolioClient({ categories }: { categories: PortfolioCategoryData[] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

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

      {lightbox && <Lightbox src={lightbox} onClose={closeLightbox} />}
    </>
  );
}
