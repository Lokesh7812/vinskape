import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | VINSKAPE Interior Design",
  description: "Explore Vinskape's ongoing and completed interior design projects.",
};

const ongoing = [
  { name: "Modern Villa Interiors", location: "Kochi", type: "Residential", image: "/images/Living Room/Living Room/4.png", progress: 75 },
  { name: "Corporate Office Redesign", location: "Bengaluru", type: "Enterprise", image: "/images/Commercial/Commercial/Hotel.png", progress: 45 },
  { name: "Luxury 4BHK Apartment", location: "Chennai", type: "Residential", image: "/images/Bedroom/Bedroom/Premium.png", progress: 60 },
  { name: "Restaurant & Café", location: "Kochi", type: "Commercial", image: "/images/Kitchen/Kitchen/Modern Kitchen (1).png", progress: 30 },
];

const completed = [
  { name: "Contemporary Residence", location: "Kochi", type: "Residential", image: "/images/Living Room/Living Room/1.png", year: "2026" },
  { name: "Premium 3BHK Interior", location: "Thrissur", type: "Residential", image: "/images/Bedroom/Bedroom/Classic Bedroom.png", year: "2026" },
  { name: "Dental Clinic Design", location: "Ernakulam", type: "Healthcare", image: "/images/Commercial/Commercial/Dental Clinic.png", year: "2025" },
  { name: "Modern Kitchen & Dining", location: "Kochi", type: "Residential", image: "/images/Kitchen/Kitchen/1.png", year: "2025" },
  { name: "Kids Room Collection", location: "Bengaluru", type: "Residential", image: "/images/Kids Room/Kids Room/Kids Room.png", year: "2025" },
  { name: "Luxury Living Spaces", location: "Mumbai", type: "Residential", image: "/images/Living Room/Living Room/Living.png", year: "2024" },
];

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        eyebrow="PROJECT GALLERY"
        title="Stories told"
        titleAccent="through space."
        subtitle="A showcase of our ongoing and completed interior design projects."
        backgroundImage="/images/Living Room/Living Room/5.png"
      />

      {/* Ongoing Projects */}
      <section className="gal-section shell" id="ongoing">
        <div className="gal-section-head">
          <div className="gal-badge gal-badge--ongoing">ONGOING</div>
          <h2>Currently in <em>progress.</em></h2>
          <p>Projects we&apos;re actively crafting and shaping right now.</p>
        </div>
        <div className="gal-grid">
          {ongoing.map((p) => (
            <article className="gal-card" key={p.name}>
              <div className="gal-card-img">
                <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="gal-card-status gal-card-status--ongoing">
                  <span className="gal-pulse" />
                  In Progress
                </div>
              </div>
              <div className="gal-card-body">
                <span className="gal-card-type">{p.type}</span>
                <h3>{p.name}</h3>
                <p className="gal-card-loc">{p.location}</p>
                <div className="gal-progress">
                  <div className="gal-progress-bar" style={{ width: `${p.progress}%` }} />
                </div>
                <span className="gal-progress-label">{p.progress}% Complete</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Completed Projects */}
      <section className="gal-section gal-section--dark" id="completed">
        <div className="shell">
          <div className="gal-section-head">
            <div className="gal-badge gal-badge--done">COMPLETED</div>
            <h2>Successfully <em>delivered.</em></h2>
            <p style={{ color: "#a99f90" }}>Spaces we&apos;ve designed, built and handed over to happy clients.</p>
          </div>
          <div className="gal-grid gal-grid--completed">
            {completed.map((p) => (
              <article className="gal-card gal-card--dark" key={p.name}>
                <div className="gal-card-img">
                  <Image src={p.image} alt={p.name} fill sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="gal-card-status gal-card-status--done">✓ Completed</div>
                  <div className="gal-card-year">{p.year}</div>
                </div>
                <div className="gal-card-body">
                  <span className="gal-card-type">{p.type}</span>
                  <h3>{p.name}</h3>
                  <p className="gal-card-loc">{p.location}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
