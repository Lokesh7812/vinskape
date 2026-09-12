import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";
import { getServicesData } from "@/sanity/lib/data";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services | VINSKAPE Interior Design",
  description: "Explore Vinskape's residential, commercial, and enterprise interior design services.",
};

export default async function ServicesPage() {
  const data = await getServicesData();

  return (
    <main>
      <PageHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        titleAccent={data.hero.titleAccent}
        subtitle={data.hero.subtitle}
        backgroundImage={data.hero.backgroundImage}
      />

      {/* Residential */}
      <section className="svc-section shell" id="residential">
        <div className="svc-section-header">
          <span className="svc-number">01</span>
          <div>
            <p className="eyebrow dark">{data.residential.eyebrow}</p>
            <h2>{data.residential.heading} <em>{data.residential.headingAccent}</em></h2>
            <p className="svc-section-desc">{data.residential.description}</p>
          </div>
        </div>
        <div className="svc-grid">
          {data.residential.items.map((item) => (
            <a
              href={`/contact?service=${encodeURIComponent(item.name)}`}
              className="svc-card"
              key={item.name}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <div className="svc-card-icon">{item.icon}</div>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <span className="svc-card-arrow" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Commercial */}
      <section className="svc-section svc-section--dark" id="commercial">
        <div className="shell">
          <div className="svc-section-header">
            <span className="svc-number">02</span>
            <div>
              <p className="eyebrow">{data.commercial.eyebrow}</p>
              <h2>{data.commercial.heading} <em>{data.commercial.headingAccent}</em></h2>
              <p className="svc-section-desc" style={{ color: "#a99f90" }}>{data.commercial.description}</p>
            </div>
          </div>
          <div className="svc-grid">
            {data.commercial.items.map((item) => (
              <a
                href={`/contact?service=${encodeURIComponent(item.name)}`}
                className="svc-card svc-card--dark"
                key={item.name}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <div className="svc-card-icon">{item.icon}</div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <span className="svc-card-arrow" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise */}
      <section className="svc-section shell" id="enterprise">
        <div className="svc-section-header">
          <span className="svc-number">03</span>
          <div>
            <p className="eyebrow dark">{data.enterprise.eyebrow}</p>
            <h2>{data.enterprise.heading} <em>{data.enterprise.headingAccent}</em></h2>
            <p className="svc-section-desc">{data.enterprise.description}</p>
          </div>
        </div>
        <div className="svc-grid svc-grid--enterprise">
          {data.enterprise.items.map((item) => (
            <a
              href={`/contact?service=${encodeURIComponent(item.name)}`}
              className="svc-card"
              key={item.name}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <div className="svc-card-icon">{item.icon}</div>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <span className="svc-card-arrow" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="svc-cta">
        <div className="shell">
          <h2>{data.cta.heading}</h2>
          <p>{data.cta.description}</p>
          <a href="/contact" className="button light">{data.cta.buttonText} <span>↗</span></a>
        </div>
      </section>
    </main>
  );
}
