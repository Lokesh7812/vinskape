import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";
import { getAboutData } from "@/sanity/lib/data";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | VINSKAPE Interior Design",
  description: "Learn about Vinskape's story, values, and commitment to crafting exceptional interior spaces.",
};

export default async function AboutPage() {
  const data = await getAboutData();

  return (
    <main>
      <PageHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        titleAccent={data.hero.titleAccent}
        subtitle={data.hero.subtitle}
        backgroundImage={data.hero.backgroundImage}
      />

      {/* Story Section */}
      <section className="abt-story shell">
        <div className="abt-story-content">
          <p className="eyebrow dark">{data.story.eyebrow}</p>
          <h2>{data.story.heading} <em>{data.story.headingAccent}</em></h2>
          {data.story.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
        <div className="abt-story-img">
          <Image
            src={data.story.image}
            alt="Vinskape studio"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      {/* Values */}
      <section className="abt-values">
        <div className="shell">
          <p className="eyebrow">THE VINSKAPE WAY</p>
          <h2>Designed with purpose.<br /><em>Crafted with precision.</em></h2>
          <div className="abt-values-grid">
            {data.values.map((v, i) => (
              <div className="abt-value-card" key={v.title + i}>
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
          {data.stats.map((s, i) => {
            const match = s.value.match(/^(\d+)(.*)$/);
            return (
              <div className="abt-stat" key={s.label + i}>
                <strong>{match?.[1] || s.value}<span>{match?.[2] || ""}</span></strong>
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
            <p className="eyebrow dark">{data.mission.eyebrow}</p>
            <h2>{data.mission.heading} <em>{data.mission.headingAccent}</em></h2>
            <p>{data.mission.description}</p>
          </div>
          <div>
            <p className="eyebrow dark">{data.vision.eyebrow}</p>
            <h2>{data.vision.heading} <em>{data.vision.headingAccent}</em></h2>
            <p>{data.vision.description}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="abt-cta">
        <div className="shell">
          <h2>{data.cta.heading} <em>{data.cta.headingAccent}</em></h2>
          <p>{data.cta.subtitle}</p>
          <a href="/contact" className="button light">{data.cta.buttonText} <span>↗</span></a>
        </div>
      </section>
    </main>
  );
}
