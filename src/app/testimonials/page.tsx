import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials | VINSKAPE Interior Design",
  description: "Read what our clients say about their Vinskape interior design experience.",
};

const testimonials = [
  {
    quote: "The team listened closely, then made every room feel more considered than we imagined possible. Our 3BHK apartment feels like a luxury villa now.",
    name: "Priya & Arun Menon",
    place: "Kochi",
    project: "3BHK Apartment Interior",
    rating: 5,
  },
  {
    quote: "The process was grounded, thoughtful and exceptionally clear from the first sketch to the final detail. Our office space completely transformed.",
    name: "Rajesh Kumar",
    place: "Bengaluru",
    project: "Corporate Office Design",
    rating: 5,
  },
  {
    quote: "Vinskape understood our brand identity and translated it beautifully into our restaurant space. Customers constantly compliment the ambiance.",
    name: "Sneha Patel",
    place: "Mumbai",
    project: "Restaurant Interior",
    rating: 5,
  },
  {
    quote: "From modular kitchen to kids room, every single space in our villa was designed with such attention to detail. Truly exceptional work.",
    name: "Dr. Anand & Deepa",
    place: "Thrissur",
    project: "Villa Interior",
    rating: 5,
  },
  {
    quote: "The dental clinic design they created puts our patients at ease instantly. The calming colors and smart layout have made a real difference.",
    name: "Dr. Sarah Thomas",
    place: "Ernakulam",
    project: "Dental Clinic Design",
    rating: 5,
  },
  {
    quote: "We chose Vinskape for our 4BHK and the results exceeded all expectations. The walk-in wardrobe alone is worth every penny!",
    name: "Mohammed & Fathima",
    place: "Calicut",
    project: "4BHK Premium Interior",
    rating: 5,
  },
];

export default function TestimonialsPage() {
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
            <article className="tst-card" key={t.name}>
              <div className="tst-card-quote">&ldquo;</div>
              <blockquote>{t.quote}</blockquote>
              <div className="tst-card-stars">
                {"★".repeat(t.rating)}
              </div>
              <div className="tst-card-author">
                <div className="tst-card-avatar">{t.name.charAt(0)}</div>
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
