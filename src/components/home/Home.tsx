import Image from "next/image";
import Link from "next/link";
import { Hero } from "./Hero";
import { HomeContact } from "./HomeContact";
import type { HomeData } from "@/sanity/types";

const Arrow = () => <span className="arrow">→</span>;

export function Home({ data }: { data: HomeData }) {
  const c = data.brand.contact;
  const intro = data.introduction;

  return (
    <main>
      <Hero slides={data.heroSlides} />

      {/* Intro Section */}
      <section className="intro shell">
        <div className="intro-image">
          <Image src={intro.image.url} alt={intro.image.alt} fill sizes="(max-width: 800px) 100vw, 42vw" priority />
        </div>
        <div className="intro-copy">
          <p className="eyebrow dark">{intro.eyebrow}</p>
          <h2>{intro.heading}</h2>
          <p>{intro.description}</p>
          <Link href="/about" className="link-button">
            {intro.cta.text} <Arrow />
          </Link>
          <div className="metrics">
            {intro.statistics.map((stat) => {
              const match = stat.value.match(/^(\d+)(.*)$/);
              return (
                <div key={stat.label}>
                  <strong>{match?.[1] ?? stat.value}<span>{match?.[2]}</span></strong>
                  <small>{stat.label}</small>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services shell">
        <div className="section-head">
          <p className="eyebrow dark">WHAT WE SHAPE</p>
          <h2>Designing every kind<br />of <em>space.</em></h2>
          <div>
            <p>From the first idea to the final finish, every project begins with a deeper understanding of how it should feel.</p>
            <Link href="/services" className="link-button" style={{ marginTop: "12px", display: "inline-block" }}>
              Explore All Services <Arrow />
            </Link>
          </div>
        </div>
        <div className="service-grid">
          {data.services.map((s, i) => (
            <Link
              href={`/services#${s.slug || s.name.toLowerCase()}`}
              className="service-card"
              key={s.name}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <div className="card-image">
                <Image src={s.image.url} alt={s.image.alt} fill sizes="(max-width: 800px) 100vw, 33vw" />
              </div>
              <p>0{i + 1}</p>
              <h3>{s.name}</h3>
              <p className="service-desc">{s.description}</p>
              <ul>{s.items.map((x) => <li key={x}>{x}</li>)}</ul>
              <span className="round-arrow" aria-label={`Explore ${s.name}`} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects">
        <div className="shell">
          <div className="project-heading">
            <p className="eyebrow">SELECTED SPACES</p>
            <h2>Stories told<br />through <em>space.</em></h2>
            <Link href="/gallery" className="button outline">
              View all projects <Arrow />
            </Link>
          </div>
          <div className="project-grid">
            {data.projects.map((p, i) => (
              <Link
                key={p.name}
                href="/gallery"
                className={`project project-${i}`}
                style={{ textDecoration: "none", color: "inherit", display: "block" }}
              >
                <Image src={p.image.url} alt={p.image.alt} fill sizes="(max-width: 800px) 100vw, 50vw" />
                <div>
                  <p>{p.status} · {p.category}</p>
                  <h3>{p.name}</h3>
                  <span>{p.location} <Arrow /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section: A place for every way of living */}
      <section className="portfolio shell">
        <div className="section-head">
          <p className="eyebrow dark">EXPLORE THE DETAILS</p>
          <h2>A place for every<br /><em>way of living.</em></h2>
          <div>
            <p>Every room has a purpose, a mood and a texture. Click any space to explore our curated portfolio.</p>
            <Link href="/portfolio" className="link-button" style={{ marginTop: "12px", display: "inline-block" }}>
              Open Full Portfolio <Arrow />
            </Link>
          </div>
        </div>
        <div className="portfolio-grid">
          {data.portfolio.map((p, i) => (
            <Link
              key={p.name}
              href={`/portfolio?category=${p.slug || "living-room"}`}
              className={`portfolio-item tile-${i}`}
              aria-label={`View ${p.name} portfolio`}
              style={{ display: "block", textDecoration: "none" }}
            >
              <Image src={p.image.url} alt={p.image.alt} fill sizes="(max-width: 800px) 50vw, 25vw" />
              <span>{p.name}<Arrow /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* The Vinskape Way */}
      <section className="why">
        <div className="shell why-inner">
          <div>
            <p className="eyebrow">THE VINSKAPE WAY</p>
            <h2>Designed with purpose.<br /><em>Crafted with precision.</em></h2>
            <Link href="/about" className="button outline" style={{ marginTop: "28px", display: "inline-block" }}>
              Our Story & Ethos <Arrow />
            </Link>
          </div>
          <div className="benefits">
            {[
              ["01", "Thoughtful design", "Every space starts with listening to the life that will unfold within it."],
              ["02", "Functional luxury", "Beauty and practicality are never separate ideas."],
              ["03", "Attention to detail", "Light, proportion, material and finish, considered as one."],
              ["04", "End-to-end approach", "From early concept through to the smallest finishing touch."],
            ].map((x) => (
              <div key={x[0]}>
                <span>{x[0]}</span>
                <h3>{x[1]}</h3>
                <p>{x[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners / Dealerships */}
      <section className="partners shell">
        <p className="eyebrow dark">OUR TRUSTED PARTNERS & DEALERSHIPS</p>
        <div>
          <h2>Good work is never<br />done <em>alone.</em></h2>
          <p>We collaborate with India's leading premium makers, fittings and hardware suppliers.</p>
        </div>
        <div className="brand-logos-grid">
          {[
            { file: "01_Greenlam.png", name: "Greenlam" },
            { file: "02_Merino.png", name: "Merino" },
            { file: "03_Century_Laminates.png", name: "Century Laminates" },
            { file: "04_Stylam.png", name: "Stylam" },
            { file: "05_Catch.png", name: "Catch" },
            { file: "06_AICA.png", name: "AICA" },
            { file: "07_Hettich.png", name: "Hettich" },
            { file: "08_Ebco.png", name: "Ebco" },
            { file: "09_Slate.png", name: "Slate" },
            { file: "10_Olive.png", name: "Olive" },
            { file: "11_Hablo.png", name: "Hablo" },
            { file: "12_Faber.png", name: "Faber" },
            { file: "13_Carysil.png", name: "Carysil" },
            { file: "14_Bosch.png", name: "Bosch" },
            { file: "15_LG.png", name: "LG" },
            { file: "16_Samsung.png", name: "Samsung" },
            { file: "17_Crompton_Greaves.png", name: "Crompton Greaves" },
            { file: "18_Philips.png", name: "Philips" },
            { file: "19_Venus.png", name: "Venus" },
            { file: "20_VU.png", name: "VU" },
            { file: "21_AO_Smith.png", name: "AO Smith" },
            { file: "22_Wafefit.png", name: "Wafefit" },
            { file: "23_Peps.png", name: "Peps" },
            { file: "24_Restolex.png", name: "Restolex" },
          ].map((brand) => (
            <Link key={brand.name} href="/dealerships" className="brand-logo-item">
              <Image
                src={`/24_separate_brand_logos/${brand.file}`}
                alt={brand.name}
                width={140}
                height={80}
                style={{ objectFit: "contain" }}
              />
            </Link>
          ))}
        </div>
        <div style={{ marginTop: "28px" }}>
          <Link href="/dealerships" className="link-button">
            View all 24+ authorized dealerships <Arrow />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials shell">
        <p className="eyebrow dark">CLIENT NOTES</p>
        <div className="quote-mark">&ldquo;</div>
        {data.testimonials.map((t, i) => (
          <article key={t.name + i} className={i ? "hidden-quote" : ""}>
            <blockquote>{t.quote}</blockquote>
            <p>
              <strong>{t.name}</strong> · {t.place}
              <br />
              <small>{t.project}</small>
            </p>
          </article>
        ))}
        <div style={{ marginTop: "32px" }}>
          <Link href="/testimonials" className="link-button">
            Read all client testimonials <Arrow />
          </Link>
        </div>
      </section>

      {/* Modern Luxury Home Contact & Inquiry Section */}
      <HomeContact contact={c} />
    </main>
  );
}
