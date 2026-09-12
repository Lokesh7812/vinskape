import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { getPortfolioCategoryBySlug } from "@/sanity/lib/data";
import { PortfolioGalleryGrid } from "./PortfolioGalleryGrid";

const allCategoriesList = [
  { slug: "living-room", name: "Living Room" },
  { slug: "modular-kitchen", name: "Modular Kitchen" },
  { slug: "bedroom", name: "Bedroom" },
  { slug: "kids-room", name: "Kids Room" },
  { slug: "dining", name: "Dining" },
  { slug: "office", name: "Office" },
  { slug: "commercial", name: "Commercial" },
  { slug: "bathroom", name: "Bathroom" },
];

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function PortfolioItemPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const slug = (resolvedParams.slug || "").toLowerCase();
  const data = await getPortfolioCategoryBySlug(slug);

  if (!data) {
    notFound();
  }

  return (
    <main>
      <PageHero
        eyebrow={data.eyebrow}
        title={data.title}
        titleAccent={data.titleAccent}
        subtitle={data.subtitle}
        backgroundImage={data.heroImage}
      />

      {/* Category Navigation Bar */}
      <nav className="shell" style={{ padding: "40px 42px 0" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", borderBottom: "1px solid #ddd6cb", paddingBottom: "20px" }}>
          <Link
            href="/portfolio"
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              color: "#666",
              textDecoration: "none",
              border: "1px solid #ccc",
            }}
          >
            ← All Rooms
          </Link>
          {allCategoriesList.map((cat) => (
            <Link
              key={cat.slug}
              href={`/portfolio/${cat.slug}`}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                textDecoration: "none",
                backgroundColor: (cat.slug === slug || (slug === "kitchen" && cat.slug === "modular-kitchen")) ? "#1e1d1a" : "transparent",
                color: (cat.slug === slug || (slug === "kitchen" && cat.slug === "modular-kitchen")) ? "#f5f3ee" : "#555",
                border: "1px solid #1e1d1a",
                transition: "all 0.2s ease",
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Room Overview & Highlights */}
      <section className="shell" style={{ padding: "50px 42px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "50px", alignItems: "start" }}>
          <div>
            <p className="eyebrow dark">DESIGN PHILOSOPHY</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", margin: "0 0 16px", color: "#1e1d1a" }}>
              Tailored for how you live.
            </h2>
            <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#555", marginBottom: "24px" }}>
              {data.overview}
            </p>
            {data.materials && data.materials.length > 0 && (
              <div style={{ marginTop: "24px" }}>
                <p style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, color: "#8c724c", marginBottom: "10px" }}>
                  Primary Materials & Finishes:
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {data.materials.map((mat) => (
                    <span
                      key={mat}
                      style={{
                        background: "#e8e3d8",
                        color: "#3e3a34",
                        padding: "6px 14px",
                        borderRadius: "15px",
                        fontSize: "12px",
                      }}
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{ background: "#ffffff", padding: "32px", borderRadius: "4px", border: "1px solid #e2ddd4", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", margin: "0 0 20px", color: "#1e1d1a" }}>
              Signature Features
            </h3>
            {data.features && data.features.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {data.features.map((feat, i) => (
                  <div key={feat.title} style={{ borderBottom: i < data.features.length - 1 ? "1px solid #eee" : "none", paddingBottom: "14px" }}>
                    <strong style={{ display: "block", fontSize: "15px", color: "#1e1d1a", marginBottom: "4px" }}>
                      0{i + 1}. {feat.title}
                    </strong>
                    <p style={{ margin: 0, fontSize: "13px", color: "#666", lineHeight: "1.5" }}>
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: "28px" }}>
              <Link
                href={`/contact?service=${encodeURIComponent(data.name)}`}
                className="button dark"
                style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
              >
                Request Quotation for {data.name} <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Grid */}
      <section className="shell" style={{ padding: "0 42px 100px" }}>
        <div style={{ marginBottom: "30px" }}>
          <p className="eyebrow dark">PROJECT GALLERY</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", margin: 0, color: "#1e1d1a" }}>
            Real Spaces Crafted by Vinskape
          </h2>
          <small style={{ color: "#777" }}>Click any photo to view in high resolution</small>
        </div>

        <PortfolioGalleryGrid images={data.images} name={data.name} />
      </section>
    </main>
  );
}
