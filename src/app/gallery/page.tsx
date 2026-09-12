import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";
import { getGalleryData } from "@/sanity/lib/data";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery | VINSKAPE Interior Design",
  description: "Explore Vinskape's ongoing and completed interior design projects.",
};

export default async function GalleryPage() {
  const { ongoing, completed } = await getGalleryData();

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
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="gal-card-status gal-card-status--ongoing">
                  <span className="gal-pulse" />
                  In Progress
                </div>
              </div>
              <div className="gal-card-body">
                <span className="gal-card-type">{p.type}</span>
                <h3>{p.name}</h3>
                <p className="gal-card-loc">{p.location}</p>
                {typeof p.progress === "number" && (
                  <>
                    <div className="gal-progress">
                      <div className="gal-progress-bar" style={{ width: `${p.progress}%` }} />
                    </div>
                    <span className="gal-progress-label">{p.progress}% Complete</span>
                  </>
                )}
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
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="gal-card-status gal-card-status--done">✓ Completed</div>
                  {p.year && <div className="gal-card-year">{p.year}</div>}
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
