import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | VINSKAPE Interior Design",
  description: "Explore Vinskape's residential, commercial, and enterprise interior design services.",
};

const residential = [
  { name: "Apartment 2BHK Interior", desc: "Smart, space-efficient designs that transform compact 2BHK apartments into elegant, functional living spaces.", icon: "🏠" },
  { name: "3BHK Interiors", desc: "Balanced layouts with premium finishes, creating distinct zones for family, work and relaxation.", icon: "🏡" },
  { name: "4BHK Interiors", desc: "Spacious, luxurious interiors with custom furnishings and refined material palettes throughout.", icon: "🏘️" },
  { name: "Villa", desc: "Grand-scale villa interiors combining architectural drama with intimate, liveable comfort.", icon: "🏛️" },
  { name: "Bungalow", desc: "Classic bungalow interiors with modern sensibilities, designed around natural light and open flow.", icon: "🌿" },
];

const commercial = [
  { name: "Office Workspaces", desc: "Productive, inspiring work environments that reflect your company culture and boost team performance.", icon: "💼" },
  { name: "Retail Outlets", desc: "Store designs that guide the customer journey, strengthen brand identity and drive conversions.", icon: "🛍️" },
  { name: "Hospitality", desc: "Hotels, restaurants and cafés designed for memorable guest experiences and operational excellence.", icon: "🍽️" },
  { name: "Healthcare & Clinics", desc: "Calming, hygienic spaces that prioritize patient comfort and efficient clinical workflows.", icon: "🏥" },
  { name: "Educational & Institutions", desc: "Dynamic learning environments designed to inspire focus, creativity and collaboration.", icon: "🎓" },
];

const enterprise = [
  { name: "Corporate Office Interiors", desc: "Executive-grade office spaces with boardrooms, lounges and workstations that command presence.", icon: "🏢" },
  { name: "Collaborative Workspaces", desc: "Open-plan co-working environments designed for flexibility, interaction and innovation.", icon: "🤝" },
  { name: "Biophilic Enterprise Design", desc: "Nature-integrated workspaces that boost wellness, reduce stress and enhance productivity.", icon: "🌱" },
];

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="OUR SERVICES"
        title="Designing every kind"
        titleAccent="of space."
        subtitle="From residential dream homes to enterprise workplaces, we bring thoughtful design to every scale."
        backgroundImage="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2200&q=85"
      />

      {/* Residential */}
      <section className="svc-section shell" id="residential">
        <div className="svc-section-header">
          <span className="svc-number">01</span>
          <div>
            <p className="eyebrow dark">RESIDENTIAL</p>
            <h2>Homes designed around <em>you.</em></h2>
            <p className="svc-section-desc">Elegant apartments and sophisticated villas, balanced for beauty, comfort and the rhythms of everyday life.</p>
          </div>
        </div>
        <div className="svc-grid">
          {residential.map((item) => (
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
              <p className="eyebrow">COMMERCIAL</p>
              <h2>Spaces that build <em>experiences.</em></h2>
              <p className="svc-section-desc" style={{ color: "#a99f90" }}>Memorable environments that strengthen your brand and elevate each customer interaction.</p>
            </div>
          </div>
          <div className="svc-grid">
            {commercial.map((item) => (
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
            <p className="eyebrow dark">ENTERPRISE</p>
            <h2>Workplaces calibrated for <em>performance.</em></h2>
            <p className="svc-section-desc">Corporate environments designed for people, purpose and long-term value.</p>
          </div>
        </div>
        <div className="svc-grid svc-grid--enterprise">
          {enterprise.map((item) => (
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
          <h2>Ready to transform your space?</h2>
          <p>Let&apos;s discuss your project and bring your vision to life.</p>
          <a href="/contact" className="button light">Get in touch <span>↗</span></a>
        </div>
      </section>
    </main>
  );
}
