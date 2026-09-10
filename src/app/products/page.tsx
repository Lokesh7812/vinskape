import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | VINSKAPE Interior Design",
  description: "Explore Vinskape's curated collection of premium furniture and furnishings.",
};

const products = [
  {
    name: "Wooden Furnitures",
    desc: "Handcrafted solid wood furniture built with premium teak, walnut and oak. From dining tables to bookshelves, each piece is designed for lasting beauty and structural integrity.",
    features: ["Solid wood construction", "Custom finishes", "Lifetime durability", "Traditional & modern styles"],
    image: "/images/Dining/Dining/Dining.png",
    icon: "🪵",
  },
  {
    name: "Custom Made Sofas",
    desc: "Bespoke sofa designs tailored to your space, style and comfort preferences. Choose your fabric, dimensions and configuration for a truly personal centrepiece.",
    features: ["Made to measure", "Premium fabrics", "Ergonomic design", "5-year frame warranty"],
    image: "/images/Living Room/Living Room/Living.png",
    icon: "🛋️",
  },
  {
    name: "Cushion Furnitures",
    desc: "Luxuriously upholstered accent chairs, ottomans and seating designed for comfort without compromising on aesthetics. Perfect for living rooms and lounges.",
    features: ["High-density foam", "Stain-resistant fabrics", "Modular options", "Designer patterns"],
    image: "/images/Living Room/Living Room/3.png",
    icon: "💺",
  },
  {
    name: "Recliners",
    desc: "Premium recliners with smooth mechanisms, plush cushioning and elegant leather or fabric upholstery. Designed for ultimate relaxation in your living space.",
    features: ["Manual & motorized", "Genuine leather options", "Zero-gravity positions", "Built-in lumbar support"],
    image: "/images/Living Room/Living Room/7.png",
    icon: "🪑",
  },
  {
    name: "Curtains",
    desc: "Curated curtain collections ranging from sheer elegance to blackout luxury. Custom lengths, motorized tracks and premium fabrics to complement every interior.",
    features: ["Motorized options", "Blackout & sheer", "Custom sizing", "UV protection"],
    image: "/images/Bedroom/Bedroom/Bedroom.png",
    icon: "🪟",
  },
];

export default function ProductsPage() {
  return (
    <main>
      <PageHero
        eyebrow="OUR PRODUCTS"
        title="Crafted with care,"
        titleAccent="built to last."
        subtitle="A curated collection of premium furniture and furnishings for your perfect interior."
        backgroundImage="/images/Living Room/Living Room/8.png"
      />

      <section className="prod-section shell">
        {products.map((product, i) => (
          <article className={`prod-card ${i % 2 === 1 ? "prod-card--reverse" : ""}`} key={product.name}>
            <div className="prod-card-img">
              <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="prod-card-content">
              <div className="prod-card-icon">{product.icon}</div>
              <span className="prod-card-num">0{i + 1}</span>
              <h2>{product.name}</h2>
              <p>{product.desc}</p>
              <ul className="prod-features">
                {product.features.map((f) => (
                  <li key={f}>
                    <span className="prod-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="button light">Enquire Now <span>↗</span></button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
