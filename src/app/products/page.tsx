import Image from "next/image";
import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";
import { getProductsData } from "@/sanity/lib/data";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products | VINSKAPE Interior Design",
  description: "Explore Vinskape's curated collection of premium furniture and furnishings.",
};

export default async function ProductsPage() {
  const products = await getProductsData();

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
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="prod-card-content">
              {product.icon && <div className="prod-card-icon">{product.icon}</div>}
              <span className="prod-card-num">0{i + 1}</span>
              <h2>{product.name}</h2>
              <p>{product.desc}</p>
              {product.features && product.features.length > 0 && (
                <ul className="prod-features">
                  {product.features.map((f) => (
                    <li key={f}>
                      <span className="prod-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              <a
                href={`/contact?service=${encodeURIComponent(product.name)}`}
                className="button light"
                style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}
              >
                Enquire Now <span>↗</span>
              </a>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
