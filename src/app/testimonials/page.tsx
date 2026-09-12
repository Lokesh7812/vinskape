import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";
import { getTestimonials } from "@/sanity/lib/data";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testimonials | VINSKAPE Interior Design",
  description: "Read what our clients say about their Vinskape interior design experience.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <main>
      <PageHero
        eyebrow="CLIENT TESTIMONIALS"
        title="Words that"
        titleAccent="inspire us."
        subtitle="Hear from the families and businesses who trusted us with their spaces."
      />

      <section className="tst-section shell">
        <div className="tst-grid">
          {testimonials.map((t, i) => (
            <article className="tst-card" key={t.name + i}>
              <div className="tst-card-quote">&ldquo;</div>
              <blockquote>{t.quote}</blockquote>
              <div className="tst-card-stars">
                {"★".repeat(Math.max(1, Math.min(5, t.rating || 5)))}
              </div>
              <div className="tst-card-author">
                <div className="tst-card-avatar">{t.name ? t.name.charAt(0) : "V"}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.place}</span>
                  <small>{t.project}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="tst-cta">
        <div className="shell">
          <h2>Ready to create your own <em>story?</em></h2>
          <p>Join our growing family of happy clients.</p>
          <a href="/contact" className="button light">Start Your Project <span>↗</span></a>
        </div>
      </section>
    </main>
  );
}
