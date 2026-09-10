"use client";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";

type GalleryCategory = {
  title: string;
  titleAccent: string;
  eyebrow: string;
  subtitle: string;
  statusBadge: string;
  badgeClass: string;
  heroImage: string;
  projects: {
    name: string;
    location: string;
    type: string;
    image: string;
    progress?: number;
    year?: string;
    desc: string;
    tags: string[];
  }[];
};

const galleryData: Record<string, GalleryCategory> = {
  ongoing: {
    title: "Currently in",
    titleAccent: "progress.",
    eyebrow: "ONGOING PROJECTS",
    subtitle: "Active site execution, custom modular installations, and architectural transformations happening right now across Chennai and South India.",
    statusBadge: "Active Sites",
    badgeClass: "gal-badge--ongoing",
    heroImage: "/images/Living Room/Living Room/4.png",
    projects: [
      {
        name: "Modern Villa Interiors",
        location: "Ponmar, Chennai",
        type: "Residential",
        image: "/images/Living Room/Living Room/4.png",
        progress: 75,
        desc: "Full interior execution featuring custom false ceiling, cove lighting, Italian marble accents, and built-in entertainment units.",
        tags: ["False Ceiling", "Italian Marble", "Living & Dining"],
      },
      {
        name: "Luxury 4BHK Apartment",
        location: "Jones Castle Valley, Chennai",
        type: "Residential",
        image: "/images/Bedroom/Bedroom/Premium.png",
        progress: 60,
        desc: "Master bedroom suite with fluted wall paneling, integrated acoustic headboard, and walk-in wardrobe cabinetry.",
        tags: ["Master Suite", "Fluted Panels", "Walk-in Closet"],
      },
      {
        name: "Boutique Hospitality & Café",
        location: "ECR, Chennai",
        type: "Commercial",
        image: "/images/Commercial/Commercial/Hotel.png",
        progress: 45,
        desc: "High-end café dining space with custom brass lighting, timber acoustic baffling, and ambient bar counters.",
        tags: ["Hospitality", "Custom Lighting", "Commercial"],
      },
      {
        name: "Modular Kitchen & Pantry Hub",
        location: "Vengadamangalam, Chennai",
        type: "Residential",
        image: "/images/Kitchen/Kitchen/Modern Kitchen (1).png",
        progress: 85,
        desc: "Handleless acrylic modular kitchen equipped with Hettich soft-close tandem drawers and quartz island counters.",
        tags: ["Hettich Fittings", "Quartz Countertop", "Modular Kitchen"],
      },
    ],
  },
  completed: {
    title: "Successfully",
    titleAccent: "delivered.",
    eyebrow: "COMPLETED PROJECTS",
    subtitle: "Finished spaces crafted with precision, premium brand fittings, and handed over seamlessly to happy clients.",
    statusBadge: "Delivered",
    badgeClass: "gal-badge--done",
    heroImage: "/images/Living Room/Living Room/Living.png",
    projects: [
      {
        name: "Contemporary Residence",
        location: "Chennai",
        type: "Residential",
        year: "2026",
        image: "/images/Living Room/Living Room/1.png",
        desc: "Turnkey interior styling with neutral palettes, concealed storage, and custom modular media wall.",
        tags: ["Turnkey", "Contemporary", "Living Room"],
      },
      {
        name: "Classic Master Bedroom & Wardrobe",
        location: "Chennai",
        type: "Residential",
        year: "2026",
        image: "/images/Bedroom/Bedroom/Classic Bedroom.png",
        desc: "Warm timber accents, built-in study nook, and seamless floor-to-ceiling wardrobe storage.",
        tags: ["Wardrobe", "Study Unit", "Timber Finish"],
      },
      {
        name: "Dental Clinic & Surgical Lounge",
        location: "Chennai",
        type: "Healthcare",
        year: "2025",
        image: "/images/Commercial/Commercial/Dental Clinic.png",
        desc: "Ultra-hygienic clinical interior with seamless acoustic wall cladding, ergonomic reception desk, and calming mood lighting.",
        tags: ["Healthcare", "Acoustic Wall", "Reception"],
      },
      {
        name: "Modern Kitchen & Breakfast Counter",
        location: "Chennai",
        type: "Residential",
        year: "2025",
        image: "/images/Kitchen/Kitchen/1.png",
        desc: "Dual-tone modular kitchen layout with tall pantry pullouts, Faber chimney integration, and breakfast bar.",
        tags: ["Modular Kitchen", "Faber Appliances", "Breakfast Bar"],
      },
      {
        name: "Children's Creative Bedroom",
        location: "Chennai",
        type: "Residential",
        year: "2025",
        image: "/images/Kids Room/Kids Room/Kids Room.png",
        desc: "Playful yet functional children's bedroom with study zones, ergonomic bookshelf storage, and soft rounded cabinetry.",
        tags: ["Kids Bedroom", "Study Desk", "Custom Storage"],
      },
      {
        name: "Bespoke Dining & Living Flow",
        location: "Chennai",
        type: "Residential",
        year: "2024",
        image: "/images/Dining/Dining/Dining.png",
        desc: "Open-plan dining experience featuring custom 6-seater dining table, pendant illumination, and partition display credenza.",
        tags: ["Dining Room", "Pendant Lighting", "Open Plan"],
      },
    ],
  },
};

export default function GallerySubPage() {
  const params = useParams();
  const status = typeof params.status === "string" ? params.status.toLowerCase() : "";
  const data = galleryData[status];

  if (!data) {
    notFound();
  }

  const otherStatus = status === "ongoing" ? "completed" : "ongoing";
  const otherLabel = status === "ongoing" ? "View Completed Projects" : "View Ongoing Projects";

  return (
    <main>
      <PageHero
        eyebrow={data.eyebrow}
        title={data.title}
        titleAccent={data.titleAccent}
        subtitle={data.subtitle}
        backgroundImage={data.heroImage}
      />

      <section className="shell" style={{ padding: "60px 42px 30px" }}>
        {/* Navigation Switcher Tabs */}
        <div style={{ display: "flex", gap: "14px", borderBottom: "1px solid #ddd6cb", paddingBottom: "20px" }}>
          <Link
            href="/gallery"
            className="link-button"
            style={{ textDecoration: "none", color: "#666" }}
          >
            ← All Gallery Projects
          </Link>
          <span style={{ color: "#bbb" }}>|</span>
          <Link
            href="/gallery/ongoing"
            style={{
              padding: "6px 18px",
              borderRadius: "20px",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              backgroundColor: status === "ongoing" ? "#1e1d1a" : "transparent",
              color: status === "ongoing" ? "#f5f3ee" : "#666",
              border: "1px solid #1e1d1a",
              transition: "all 0.25s ease",
            }}
          >
            Ongoing ({galleryData.ongoing.projects.length})
          </Link>
          <Link
            href="/gallery/completed"
            style={{
              padding: "6px 18px",
              borderRadius: "20px",
              fontSize: "12px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              backgroundColor: status === "completed" ? "#1e1d1a" : "transparent",
              color: status === "completed" ? "#f5f3ee" : "#666",
              border: "1px solid #1e1d1a",
              transition: "all 0.25s ease",
            }}
          >
            Completed ({galleryData.completed.projects.length})
          </Link>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="shell" style={{ padding: "20px 42px 100px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "36px",
          }}
        >
          {data.projects.map((p) => (
            <article
              key={p.name}
              style={{
                background: "#ffffff",
                border: "1px solid #e7e2d9",
                borderRadius: "4px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ height: "260px", position: "relative", overflow: "hidden" }}>
                <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 100vw, 40vw" style={{ objectFit: "cover" }} />
                <span
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    backgroundColor: status === "ongoing" ? "rgba(178, 149, 101, 0.95)" : "rgba(30, 29, 26, 0.9)",
                    color: "#fff",
                    padding: "4px 12px",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    borderRadius: "30px",
                    textTransform: "uppercase",
                  }}
                >
                  {p.year ? `Completed ${p.year}` : `${p.progress}% Complete`}
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: "16px",
                    backgroundColor: "rgba(0,0,0,0.65)",
                    color: "#e8c99b",
                    padding: "3px 10px",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    borderRadius: "2px",
                  }}
                >
                  {p.type}
                </span>
              </div>

              <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <small style={{ color: "#8c724c", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  📍 {p.location}
                </small>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", margin: "8px 0 12px", color: "#1e1d1a" }}>
                  {p.name}
                </h3>
                <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.6", margin: "0 0 18px", flex: 1 }}>
                  {p.desc}
                </p>

                {p.progress && (
                  <div style={{ marginBottom: "18px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px", color: "#777" }}>
                      <span>Current Milestone</span>
                      <strong style={{ color: "#1e1d1a" }}>{p.progress}%</strong>
                    </div>
                    <div style={{ height: "4px", background: "#eee", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ width: `${p.progress}%`, height: "100%", background: "var(--gold, #b29565)" }} />
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "11px",
                        background: "#f5f3ee",
                        color: "#555",
                        padding: "3px 9px",
                        borderRadius: "12px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/contact?service=${encodeURIComponent(p.name)}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 16px",
                    background: "#1e1d1a",
                    color: "#f5f3ee",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    borderRadius: "2px",
                  }}
                >
                  <span>Inquire About This Design</span>
                  <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Switcher Banner */}
        <div
          style={{
            marginTop: "60px",
            padding: "36px",
            background: "#ded8cd",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", margin: 0, color: "#1e1d1a" }}>
              Looking for our other work?
            </h3>
            <p style={{ margin: "6px 0 0", color: "#555", fontSize: "14px" }}>
              Explore our full catalog of residential and commercial milestones.
            </p>
          </div>
          <Link href={`/gallery/${otherStatus}`} className="button dark" style={{ textDecoration: "none" }}>
            {otherLabel} →
          </Link>
        </div>
      </section>
    </main>
  );
}
