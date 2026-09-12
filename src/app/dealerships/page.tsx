import { PageHero } from "@/components/layout/PageHero";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Dealerships | VINSKAPE Interior Design",
  description: "Vinskape's authorized dealership partners for premium interior materials and appliances.",
};

const dealerships = [
  // Laminates & Surfaces
  { name: "Greenlam", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/01_Greenlam.png" },
  { name: "Merino", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/02_Merino.png" },
  { name: "Century Laminates", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/03_Century_Laminates.png" },
  { name: "Stylam", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/04_Stylam.png" },
  { name: "Catch", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/05_Catch.png" },
  { name: "AICA", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/06_AICA.png" },
  // Hardware & Fittings
  { name: "Hettich", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/07_Hettich.png" },
  { name: "Ebco", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/08_Ebco.png" },
  { name: "Slate", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/09_Slate.png" },
  { name: "Olive", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/10_Olive.png" },
  { name: "Hablo", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/11_Hablo.png" },
  // Kitchen & Appliances
  { name: "Faber", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/12_Faber.png" },
  { name: "Carysil", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/13_Carysil.png" },
  { name: "Bosch", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/14_Bosch.png" },
  { name: "LG", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/15_LG.png" },
  { name: "Samsung", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/16_Samsung.png" },
  { name: "Crompton Greaves", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/17_Crompton_Greaves.png" },
  { name: "Philips", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/18_Philips.png" },
  { name: "Venus", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/19_Venus.png" },
  { name: "Vu", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/20_VU.png" },
  { name: "AO Smith", category: "Kitchen & Appliances", logo: "/24_separate_brand_logos/21_AO_Smith.png" },
  // Comfort & Furnishing
  { name: "Wafefit", category: "Comfort & Furnishing", logo: "/24_separate_brand_logos/22_Wafefit.png" },
  { name: "Peps", category: "Comfort & Furnishing", logo: "/24_separate_brand_logos/23_Peps.png" },
  { name: "Restolex", category: "Comfort & Furnishing", logo: "/24_separate_brand_logos/24_Restolex.png" },
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
                  <div className="dlr-card-logo">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={120}
                      height={70}
                      style={{ objectFit: "contain", width: "100%", height: "auto", maxHeight: "70px" }}
                    />
                  </div>
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

