import { PageHero } from "@/components/layout/PageHero";
import Image from "next/image";
import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Dealerships | VINSKAPE Interior Design",
  description: "Vinskape's authorized dealership partners for premium interior materials and appliances.",
};

const defaultDealerships = [
  // Laminates & Surfaces
  { name: "Greenlam", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/01_Greenlam.png" },
  { name: "Merino", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/02_Merino.png" },
  { name: "Royale Touché", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/25_Royale_Touche.jpg" },
  { name: "Century Laminates", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/03_Century_Laminates.png" },
  { name: "CenturyPly", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/30_CenturyPly.jpg" },
  { name: "Mikasa Plywood", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/29_Mikasa_Plywood.png" },
  { name: "Dream Ply", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/28_Dream_Ply.png" },
  { name: "SiamPly", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/31_SiamPly.png" },
  { name: "Stylam", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/04_Stylam.png" },
  { name: "Catch", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/05_Catch.png" },
  { name: "AICA", category: "Laminates & Surfaces", logo: "/24_separate_brand_logos/06_AICA.png" },

  // Hardware & Fittings
  { name: "Hettich", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/07_Hettich.png" },
  { name: "Häfele", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/26_Hafele.png" },
  { name: "Ebco", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/08_Ebco.png" },
  { name: "Sleek", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/27_Sleek.jpg" },
  { name: "Slate", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/09_Slate.png" },
  { name: "Olive", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/10_Olive.png" },
  { name: "Hablo", category: "Hardware & Fittings", logo: "/24_separate_brand_logos/11_Hablo.png" },

  // Paints & Finishes
  { name: "Asian Paints", category: "Paints & Finishes", logo: "/24_separate_brand_logos/33_Asian_Paints.jpg" },
  { name: "Birla Opus Paints", category: "Paints & Finishes", logo: "/24_separate_brand_logos/32_Birla_Opus_Paints.png" },

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
  { name: "Wakefit", category: "Comfort & Furnishing", logo: "/24_separate_brand_logos/22_Wakefit.png" },
  { name: "Peps", category: "Comfort & Furnishing", logo: "/24_separate_brand_logos/23_Peps.png" },
  { name: "Restolex", category: "Comfort & Furnishing", logo: "/24_separate_brand_logos/24_Restolex.png" },
];

export default async function DealershipsPage() {
  let list = defaultDealerships;
  try {
    const live = await client.fetch<Array<{ name: string; category?: string; logo?: string }>>(`
      *[_type == "dealer" && active == true && defined(logo.asset)] | order(order asc){
        name,
        category,
        "logo": logo.asset->url
      }
    `);
    if (live && live.length > 0) {
      const liveMap = new Map(live.map(d => [d.name.toLowerCase(), d]));

      // Merge: for each default dealership, use live logo if available in Sanity, else default local logo
      const mergedList = defaultDealerships.map(d => {
        const liveMatch = liveMap.get(d.name.toLowerCase());
        return {
          name: d.name,
          category: d.category,
          logo: liveMatch?.logo || d.logo,
        };
      });

      // Include any additional dealers from Sanity that might not be in defaultDealerships
      const defaultNames = new Set(defaultDealerships.map(d => d.name.toLowerCase()));
      for (const d of live) {
        if (!defaultNames.has(d.name.toLowerCase()) && d.logo) {
          mergedList.push({
            name: d.name,
            category: d.category || "Partners",
            logo: d.logo,
          });
        }
      }

      list = mergedList;
    }
  } catch {}

  const categoryOrder = [
    "Laminates & Surfaces",
    "Hardware & Fittings",
    "Paints & Finishes",
    "Kitchen & Appliances",
    "Comfort & Furnishing",
  ];

  const groupedByCategory = list.reduce<Record<string, typeof list>>((acc, d) => {
    if (!acc[d.category]) acc[d.category] = [];
    acc[d.category].push(d);
    return acc;
  }, {});

  const sortedCategories = Object.keys(groupedByCategory).sort((a, b) => {
    const idxA = categoryOrder.indexOf(a);
    const idxB = categoryOrder.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <main>
      <PageHero
        eyebrow="OUR DEALERSHIPS"
        title="Trusted partners in"
        titleAccent="quality."
        subtitle="We work with the finest brands in the industry to deliver materials, hardware, and appliances that meet our exacting standards."
      />

      <section className="dlr-section shell">
        {sortedCategories.map((category) => {
          const brands = groupedByCategory[category];
          if (!brands || brands.length === 0) return null;
          return (
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
          );
        })}
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

