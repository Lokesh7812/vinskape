import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | VINSKAPE Interior Design",
  description: "Learn about Vinskape's story, values, and commitment to crafting exceptional interior spaces.",
};

const values = [
  { icon: "✦", title: "Thoughtful Design", desc: "Every space starts with listening to the life that will unfold within it. We design with empathy and intention." },
  { icon: "◆", title: "Functional Luxury", desc: "Beauty and practicality are never separate ideas. We create spaces that look stunning and work flawlessly." },
  { icon: "▣", title: "Attention to Detail", desc: "Light, proportion, material and finish — considered as one cohesive experience." },
  { icon: "◈", title: "End-to-End Approach", desc: "From early concept through to the smallest finishing touch, we manage every step." },
];

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "250+", label: "Spaces Crafted" },
  { value: "100+", label: "Happy Clients" },
  { value: "24+", label: "Brand Partners" },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="ABOUT VINSKAPE"
        title="Crafting Spaces."
        titleAccent="Defining Lifestyles."
        subtitle="We are a design studio dedicated to creating thoughtful, elegant and functional interiors."
        backgroundImage="/images/Living Room/Living Room/2.png"
      />

      {/* Story Section */}
      <section className="abt-story shell">
        <div className="abt-story-content">
          <p className="eyebrow dark">OUR STORY</p>
          <h2>Where it all <em>began.</em></h2>
          <p>
            Vinskape was founded with a singular vision: to transform the way people experience their everyday spaces.
            What started as a passion for beautiful interiors has grown into a full-service design studio serving
            homes, offices, and commercial spaces across India.
          </p>
          <p>
            We believe that great design is not just about aesthetics — it&apos;s about creating environments that
            enhance the quality of life for the people who inhabit them. Every project begins with a deeper
            understanding of how a space should feel, function, and evolve with its occupants.
          </p>
          <p>
            Our team of designers, architects and craftspeople bring together decades of combined experience,
            working with the finest materials and the most innovative techniques to deliver spaces that exceed expectations.
          </p>
        </div>
        <div className="abt-story-img">
          <Image src="/images/Living Room/Living Room/129 Living.png" alt="Vinskape studio" fill sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
      </section>

      {/* Values */}
      <section className="abt-values">
        <div className="shell">
          <p className="eyebrow">THE VINSKAPE WAY</p>
          <h2>Designed with purpose.<br /><em>Crafted with precision.</em></h2>
          <div className="abt-values-grid">
            {values.map((v, i) => (
              <div className="abt-value-card" key={v.title}>
                <div className="abt-value-icon">{v.icon}</div>
                <span className="abt-value-num">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="abt-stats shell">
        <div className="abt-stats-grid">
          {stats.map((s) => {
            const match = s.value.match(/^(\d+)(.*)$/);
            return (
              <div className="abt-stat" key={s.label}>
                <strong>{match?.[1]}<span>{match?.[2]}</span></strong>
                <p>{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission */}
      <section className="abt-mission shell">
        <div className="abt-mission-card">
          <div>
            <p className="eyebrow dark">OUR MISSION</p>
            <h2>To create spaces that <em>inspire.</em></h2>
            <p>
              We are committed to delivering interiors that not only look exceptional but enhance the way people
              live, work and connect. Through innovation, craftsmanship and a deep respect for our clients&apos; visions,
              we craft spaces that stand the test of time.
            </p>
          </div>
          <div>
            <p className="eyebrow dark">OUR VISION</p>
            <h2>Redefining <em>interior design.</em></h2>
            <p>
              To be the most trusted interior design studio in India, known for our thoughtful approach,
              premium craftsmanship, and unwavering commitment to client satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="abt-cta">
        <div className="shell">
          <h2>Let&apos;s create something <em>extraordinary.</em></h2>
          <p>Start a conversation about your dream space today.</p>
          <a href="/contact" className="button light">Get in Touch <span>↗</span></a>
        </div>
      </section>
    </main>
  );
}
