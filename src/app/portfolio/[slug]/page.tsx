"use client";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { PageHero } from "@/components/layout/PageHero";

type RoomData = {
  name: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  heroImage: string;
  overview: string;
  features: { title: string; desc: string }[];
  materials: string[];
  images: string[];
};

const roomsData: Record<string, RoomData> = {
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

const allCategoriesList = [
  { slug: "living-room", name: "Living Room" },
  { slug: "modular-kitchen", name: "Modular Kitchen" },
  { slug: "bedroom", name: "Bedroom" },
  { slug: "kids-room", name: "Kids Room" },
  { slug: "dining", name: "Dining" },
  { slug: "office", name: "Office" },
  { slug: "commercial", name: "Commercial" },
  { slug: "bathroom", name: "Bathroom" },
];

export default function PortfolioItemPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug.toLowerCase() : "";
  const data = roomsData[slug];
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!data) {
    notFound();
  }

  return (
    <main>
      <PageHero
        eyebrow={data.eyebrow}
        title={data.title}
        titleAccent={data.titleAccent}
        subtitle={data.subtitle}
        backgroundImage={data.heroImage}
      />

      {/* Category Navigation Bar */}
      <nav className="shell" style={{ padding: "40px 42px 0" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", borderBottom: "1px solid #ddd6cb", paddingBottom: "20px" }}>
          <Link
            href="/portfolio"
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              color: "#666",
              textDecoration: "none",
              border: "1px solid #ccc",
            }}
          >
            ← All Rooms
          </Link>
          {allCategoriesList.map((cat) => (
            <Link
              key={cat.slug}
              href={`/portfolio/${cat.slug}`}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                textDecoration: "none",
                backgroundColor: (cat.slug === slug || (slug === "kitchen" && cat.slug === "modular-kitchen")) ? "#1e1d1a" : "transparent",
                color: (cat.slug === slug || (slug === "kitchen" && cat.slug === "modular-kitchen")) ? "#f5f3ee" : "#555",
                border: "1px solid #1e1d1a",
                transition: "all 0.2s ease",
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Room Overview & Highlights */}
      <section className="shell" style={{ padding: "50px 42px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "50px", alignItems: "start" }}>
          <div>
            <p className="eyebrow dark">DESIGN PHILOSOPHY</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", margin: "0 0 16px", color: "#1e1d1a" }}>
              Tailored for how you live.
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#555", marginBottom: "24px" }}>
              {data.overview}
            </p>
            <div style={{ marginTop: "24px" }}>
              <p style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, color: "#8c724c", marginBottom: "10px" }}>
                Primary Materials & Finishes:
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {data.materials.map((mat) => (
                  <span
                    key={mat}
                    style={{
                      background: "#e8e3d8",
                      color: "#3e3a34",
                      padding: "6px 14px",
                      borderRadius: "15px",
                      fontSize: "12px",
                    }}
                  >
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: "#ffffff", padding: "32px", borderRadius: "4px", border: "1px solid #e2ddd4", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", margin: "0 0 20px", color: "#1e1d1a" }}>
              Signature Features
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {data.features.map((feat, i) => (
                <div key={feat.title} style={{ borderBottom: i < data.features.length - 1 ? "1px solid #eee" : "none", paddingBottom: "14px" }}>
                  <strong style={{ display: "block", fontSize: "15px", color: "#1e1d1a", marginBottom: "4px" }}>
                    0{i + 1}. {feat.title}
                  </strong>
                  <p style={{ margin: 0, fontSize: "13px", color: "#666", lineHeight: "1.5" }}>
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "28px" }}>
              <Link
                href={`/contact?service=${encodeURIComponent(data.name)}`}
                className="button dark"
                style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
              >
                Request Quotation for {data.name} <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Grid */}
      <section className="shell" style={{ padding: "0 42px 100px" }}>
        <div style={{ marginBottom: "30px" }}>
          <p className="eyebrow dark">PROJECT GALLERY</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", margin: 0, color: "#1e1d1a" }}>
            Real Spaces Crafted by Vinskape
          </h2>
          <small style={{ color: "#777" }}>Click any photo to view in high resolution</small>
        </div>

        <div className="pf-grid">
          {data.images.map((img, i) => (
            <button
              key={`${img}-${i}`}
              className={`pf-item ${i === 0 ? "pf-item--large" : ""}`}
              onClick={() => setLightbox(img)}
              aria-label={`View ${data.name} photo ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${data.name} design ${i + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="pf-item-overlay">
                <span className="pf-item-zoom">⊕</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div className="pf-lightbox" onClick={() => setLightbox(null)}>
          <button className="pf-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <div className="pf-lightbox-img">
            <Image src={lightbox} alt="Enlarged view" fill sizes="100vw" style={{ objectFit: "contain" }} />
          </div>
        </div>
      )}
    </main>
  );
}
