"use client";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";

const categories = [
  {
    name: "Living Room",
    slug: "living-room",
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
  {
    name: "Modular Kitchen",
    slug: "kitchen",
    images: [
      "/images/Kitchen/Kitchen/Modern Kitchen (1).png",
      "/images/Kitchen/Kitchen/1.png",
      "/images/Kitchen/Kitchen/Modern Kitchen (2).png",
      "/images/Kitchen/Kitchen/Modern Kitchen (3).png",
      "/images/Kitchen/Kitchen/Modern Kitchen (4).png",
      "/images/Kitchen/Kitchen/dining_room_premium_daylight.jpg",
    ],
  },
  {
    name: "Bedroom",
    slug: "bedroom",
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
  {
    name: "Kids Room",
    slug: "kids-room",
    images: [
      "/images/Kids Room/Kids Room/Kids Room.png",
      "/images/Kids Room/Kids Room/Loft Bed with study table.png",
      "/images/Kids Room/Kids Room/6 (2).png",
      "/images/Kids Room/Kids Room/ChatGPT Image Aug 26, 2026, 04_10_34 PM.png",
    ],
  },
  {
    name: "Dining",
    slug: "dining",
    images: [
      "/images/Dining/Dining/Dining.png",
      "/images/Dining/Dining/2.png",
      "/images/Kitchen/Kitchen/dining_room_premium_daylight.jpg",
    ],
  },
  {
    name: "Office",
    slug: "office",
    images: [
      "/images/Commercial/Commercial/Hotel.png",
      "/images/Commercial/Commercial/Dental Clinic.png",
      "/images/Bedroom/Bedroom/Classic Bedroom wardrobe with work table.png",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    name: "Commercial",
    slug: "commercial",
    images: [
      "/images/Commercial/Commercial/Hotel.png",
      "/images/Commercial/Commercial/Dental Clinic.png",
      "/images/Commercial/Commercial/Dental Clinic 1.png",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    name: "Bathroom",
    slug: "bathroom",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80",
      "/images/Bedroom/Bedroom/Walk-in-Wardrobe 1.png",
      "/images/Bedroom/Bedroom/Walk-in-Wardrobe 2.png",
    ],
  },
];

function PortfolioContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (categoryParam) {
      const foundIndex = categories.findIndex(
        (c) => c.slug.toLowerCase() === categoryParam.toLowerCase() || c.name.toLowerCase().includes(categoryParam.toLowerCase())
      );
      if (foundIndex !== -1) {
        setActive(foundIndex);
      }
    }
  }, [categoryParam]);

  const cat = categories[active];

  return (
    <>
      <section className="pf-section shell">
        {/* Filter tabs */}
        <div className="pf-tabs">
          {categories.map((c, i) => (
            <button
              key={c.slug}
              className={`pf-tab ${i === active ? "pf-tab--active" : ""}`}
              onClick={() => setActive(i)}
            >
              {c.name}
              <span className="pf-tab-count">{c.images.length}</span>
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="pf-grid">
          {cat.images.length > 0 ? (
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
          <button className="pf-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <div className="pf-lightbox-img">
            <Image src={lightbox} alt="Full view" fill sizes="100vw" style={{ objectFit: "contain" }} />
          </div>
        </div>
      )}
    </>
  );
}

export default function PortfolioPage() {
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
        <PortfolioContent />
      </Suspense>
    </main>
  );
}
