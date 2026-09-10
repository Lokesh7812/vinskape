import { PageHero } from "@/components/layout/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Dealerships | VINSKAPE Interior Design",
  description: "Vinskape's authorized dealership partners for premium interior materials and appliances.",
};

const dealerships = [
  // Laminates & Surfaces
  { name: "Greenlam", category: "Laminates & Surfaces", icon: "🟩" },
  { name: "Merino", category: "Laminates & Surfaces", icon: "🪵" },
  { name: "Century Laminates", category: "Laminates & Surfaces", icon: "📐" },
  { name: "Stylam", category: "Laminates & Surfaces", icon: "✨" },
  { name: "Catch", category: "Laminates & Surfaces", icon: "🎯" },
  { name: "AICA", category: "Laminates & Surfaces", icon: "💎" },
  // Hardware & Fittings
  { name: "Hettich", category: "Hardware & Fittings", icon: "⚙️" },
  { name: "Ebco", category: "Hardware & Fittings", icon: "🔧" },
  { name: "Slate", category: "Hardware & Fittings", icon: "🪨" },
  { name: "Olive", category: "Hardware & Fittings", icon: "🫒" },
  { name: "Hablo", category: "Hardware & Fittings", icon: "🔩" },
  // Kitchen & Appliances
  { name: "Faber", category: "Kitchen & Appliances", icon: "🌀" },
  { name: "Carysil", category: "Kitchen & Appliances", icon: "🚰" },
  { name: "Bosch", category: "Kitchen & Appliances", icon: "🔵" },
  { name: "LG", category: "Kitchen & Appliances", icon: "📺" },
  { name: "Samsung", category: "Kitchen & Appliances", icon: "📱" },
  { name: "Crompton Greaves", category: "Kitchen & Appliances", icon: "💡" },
  { name: "Philips", category: "Kitchen & Appliances", icon: "🌟" },
  { name: "Venus", category: "Kitchen & Appliances", icon: "♨️" },
  { name: "Vu", category: "Kitchen & Appliances", icon: "🖥️" },
  { name: "AO Smith", category: "Kitchen & Appliances", icon: "🔥" },
  // Comfort & Furnishing
  { name: "Wafefit", category: "Comfort & Furnishing", icon: "🛏️" },
  { name: "Peps", category: "Comfort & Furnishing", icon: "😴" },
  { name: "Restolex", category: "Comfort & Furnishing", icon: "🛋️" },
];

const groupedByCategory = dealerships.reduce<Record<string, typeof dealerships>>((acc, d) => {
  if (!acc[d.category]) acc[d.category] = [];
  acc[d.category].push(d);
  return acc;
}, {});

export default function DealershipsPage() {
  return (
    <main>
      <PageHero
        eyebrow="OUR DEALERSHIPS"
        title="Trusted partners in"
        titleAccent="quality."
        subtitle="We work with the finest brands in the industry to deliver materials, hardware, and appliances that meet our exacting standards."
      />

      <section className="dlr-section shell">
        {Object.entries(groupedByCategory).map(([category, brands]) => (
          <div className="dlr-group" key={category}>
            <div className="dlr-group-head">
              <h2>{category}</h2>
              <span className="dlr-count">{brands.length} Partners</span>
            </div>
            <div className="dlr-grid">
              {brands.map((brand) => (
                <article className="dlr-card" key={brand.name}>
                  <div className="dlr-card-icon">{brand.icon}</div>
                  <h3>{brand.name}</h3>
                  <span className="dlr-card-cat">{brand.category}</span>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="dlr-trust">
        <div className="shell">
          <p className="eyebrow">WHY OUR PARTNERS MATTER</p>
          <h2>Quality is never <em>accidental.</em></h2>
          <div className="dlr-trust-grid">
            <div>
              <span>01</span>
              <h3>Authentic Products</h3>
              <p>Every product sourced directly from authorized distributors with full warranty coverage.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Best-in-Class Materials</h3>
              <p>Premium laminates, hardware and appliances chosen for durability and aesthetic excellence.</p>
            </div>
            <div>
              <span>03</span>
              <h3>After-Sales Support</h3>
              <p>Complete post-installation support backed by our dealership network.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
