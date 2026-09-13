"use client";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";

type ServiceDetail = {
  name: string;
  category: "Residential" | "Commercial" | "Enterprise";
  categorySlug: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  heroImage: string;
  overview: string;
  highlights: string[];
  deliverables: { title: string; desc: string }[];
  process: string[];
  suitableFor: string;
  relatedLinks: { label: string; href: string }[];
};

const servicesData: Record<string, ServiceDetail> = {
  // ── Categories ──
  "residential": {
    name: "Residential Interiors",
    category: "Residential",
    categorySlug: "residential",
    eyebrow: "SERVICES · RESIDENTIAL",
    title: "Homes designed",
    titleAccent: "around you.",
    subtitle: "From smart 2BHK apartments to expansive luxury villas, we balance comfort, aesthetics, and everyday functionality.",
    heroImage: "/images/Living Room/Living Room/1.png",
    overview: "Every home is personal. Our residential design practice brings together custom modular kitchens, bespoke bedroom wardrobes, false ceiling illumination, and luxurious living spaces tailored to your family's lifestyle and Chennai climate.",
    highlights: [
      "Custom Modular Kitchen with German soft-close fittings (Hettich / Ebco)",
      "Tailored Wardrobes & Walk-in Closets with sensor LED lighting",
      "Living Room Media Walls & Acoustic Cladding",
      "False Ceiling & Architectural Lighting Plans",
      "Space-saving Furniture & Ergonomic Study Tables",
    ],
    deliverables: [
      { title: "Apartment 2BHK Interior", desc: "Space-optimized layouts, multi-functional furniture, and contemporary aesthetics." },
      { title: "3BHK Interiors", desc: "Zoned master suites, kids rooms, and spacious living-dining integration." },
      { title: "4BHK Interiors", desc: "Expansive luxury finishes, private balconies, and dedicated guest suites." },
      { title: "Luxury Villas", desc: "Grand double-height living spaces, internal courtyards, and home theaters." },
      { title: "Bungalows", desc: "Timeless traditional touches fused with sleek modern living comforts." },
    ],
    process: ["Initial Consultation & Site Measurement", "3D Realistic Renders & Material Selection", "Precision Factory Manufacturing", "Professional On-site Installation & Handover"],
    suitableFor: "Homeowners in Chennai looking for turnkey or customized interior solutions.",
    relatedLinks: [
      { label: "Apartment 2BHK Interior", href: "/services/residential/apartment-2bhk" },
      { label: "3BHK Interiors", href: "/services/residential/3bhk-interiors" },
      { label: "4BHK Interiors", href: "/services/residential/4bhk-interiors" },
      { label: "Villa Interiors", href: "/services/residential/villa" },
      { label: "Bungalow Design", href: "/services/residential/bungalow" },
    ],
  },
  "commercial": {
    name: "Commercial Interiors",
    category: "Commercial",
    categorySlug: "commercial",
    eyebrow: "SERVICES · COMMERCIAL",
    title: "Spaces that build",
    titleAccent: "experiences.",
    subtitle: "Commercial environments designed to strengthen brand equity, enhance customer flow, and boost workplace performance.",
    heroImage: "/images/Commercial/Commercial/Hotel.png",
    overview: "We design and build commercial properties that balance striking visual impact with strict functional, ergonomic, and durability requirements.",
    highlights: [
      "High-durability commercial grade finishes and anti-skid surfaces",
      "Customer journey and retail conversion flow optimization",
      "Integrated MEP, HVAC, and architectural LED lighting",
      "Custom reception counters and corporate branding feature walls",
    ],
    deliverables: [
      { title: "Office Workspaces", desc: "High-productivity desks, collaborative break-out areas, and meeting pods." },
      { title: "Retail Outlets", desc: "Display merchandising systems that highlight products and maximize floor capacity." },
      { title: "Hospitality (Hotels & Cafés)", desc: "Atmospheric dining rooms, acoustic ceiling baffling, and ambient bar lounges." },
      { title: "Healthcare & Clinics", desc: "Soothing clinical waiting lounges, hygienic consultation chambers, and lab spaces." },
      { title: "Educational & Institutions", desc: "Engaging training rooms, lecture halls, and interactive learning environments." },
    ],
    process: ["Brand Discovery & Zoning Strategy", "Code Compliance & Technical Drawings", "Custom Millwork & Fixture Fabrication", "Fast-track Turnkey Execution"],
    suitableFor: "Business owners, hospitality brands, retail chains, and medical clinics.",
    relatedLinks: [
      { label: "Office Workspaces", href: "/services/commercial/office-workspaces" },
      { label: "Retail Outlets", href: "/services/commercial/retail-outlets" },
      { label: "Hospitality & Cafés", href: "/services/commercial/hospitality" },
      { label: "Healthcare & Clinics", href: "/services/commercial/healthcare-clinics" },
      { label: "Educational & Institutions", href: "/services/commercial/educational-institutions" },
    ],
  },
  "enterprise": {
    name: "Enterprise Design",
    category: "Enterprise",
    categorySlug: "enterprise",
    eyebrow: "SERVICES · ENTERPRISE",
    title: "Workplaces calibrated for",
    titleAccent: "performance.",
    subtitle: "Large-scale corporate headquarters, tech campuses, and sustainable biophilic work environments.",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    overview: "For growing companies and corporate enterprises, we craft headquarters that inspire innovation, foster employee wellness, and adapt to modern hybrid work demands.",
    highlights: [
      "Agile workspace planning with flexible hot-desking zones",
      "Acoustically certified boardrooms and video-conferencing suites",
      "Biophilic living green walls and circadian lighting integration",
      "Turnkey project management with strict timeline milestones",
    ],
    deliverables: [
      { title: "Corporate Office Interiors", desc: "Executive suites, boardrooms, and signature brand entrance lobbies." },
      { title: "Collaborative Workspaces", desc: "Town halls, brainstorm pods, and open-plan flexible seating." },
      { title: "Biophilic Enterprise Design", desc: "Living plant installations, natural materials, and wellness hubs." },
    ],
    process: ["Workplace Strategy & Space Audit", "3D Virtual Modeling & Engineering", "Modular System Installation", "Commissioning & Facility Handover"],
    suitableFor: "Tech companies, corporate hubs, and enterprise facilities.",
    relatedLinks: [
      { label: "Corporate Office Interiors", href: "/services/enterprise/corporate-offices" },
      { label: "Collaborative Workspaces", href: "/services/enterprise/collaborative-workspaces" },
      { label: "Biophilic Enterprise Design", href: "/services/enterprise/biophilic-design" },
    ],
  },

  // ── Residential Subpages ──
  "residential/apartment-2bhk": {
    name: "Apartment 2BHK Interior",
    category: "Residential",
    categorySlug: "residential",
    eyebrow: "RESIDENTIAL · APARTMENT 2BHK",
    title: "Smart, space-efficient",
    titleAccent: "2BHK living.",
    subtitle: "Turn compact apartments into open, elegant homes with multi-functional furniture and concealed storage.",
    heroImage: "/images/Living Room/Living Room/Living.png",
    overview: "Our 2BHK interior package focuses on eliminating clutter, optimizing natural light, and creating designated zones for living, dining, cooking, and sleeping.",
    highlights: [
      "Modular parallel or L-shaped kitchen tailored for compact spaces",
      "Master bedroom sliding wardrobe with full-length mirror",
      "Sleek wall-mounted entertainment unit with hidden cable channel",
      "Compact dining bench or folding breakfast counter",
    ],
    deliverables: [
      { title: "Foyer & Shoe Console", desc: "Slim profile storage with seating bench and key drop." },
      { title: "Living & Dining", desc: "TV media unit, accent wall paneling, and floating display shelves." },
      { title: "Modular Kitchen", desc: "BWP marine ply base and wall cabinets with anti-termite guarantee." },
      { title: "2 Bedrooms", desc: "Wardrobes, headboards, nightstands, and optional study desk." },
    ],
    process: ["Space Audit & Floor Planning", "3D Visualization", "Factory Fabrication (30 Days)", "Site Installation (10 Days)"],
    suitableFor: "2BHK apartment owners in Chennai and surrounding suburbs.",
    relatedLinks: [
      { label: "Explore 3BHK Interiors", href: "/services/residential/3bhk-interiors" },
      { label: "Explore 4BHK Interiors", href: "/services/residential/4bhk-interiors" },
      { label: "All Residential Services", href: "/services/residential" },
    ],
  },
  "residential/3bhk-interiors": {
    name: "3BHK Interiors",
    category: "Residential",
    categorySlug: "residential",
    eyebrow: "RESIDENTIAL · 3BHK INTERIORS",
    title: "Balanced luxury for",
    titleAccent: "modern families.",
    subtitle: "Distinct zones for family gatherings, private quiet retreats, and dedicated work-from-home nooks.",
    heroImage: "/images/Bedroom/Bedroom/Classic Bedroom.png",
    overview: "A 3BHK offers the freedom to balance private personal spaces with generous shared entertaining areas. We design master suites, customized kids rooms, and inviting living-dining corridors.",
    highlights: [
      "Island or extended U-shaped modular kitchen with pantry tall unit",
      "Walk-in or hinged floor-to-ceiling wardrobe storage in 3 bedrooms",
      "False ceiling with dual-circuit ambient & task lighting",
      "Custom pooja unit and display bar credenza",
    ],
    deliverables: [
      { title: "Master Suite", desc: "King headboard paneling, walk-in closet, and dresser mirror." },
      { title: "Kids / Teen Room", desc: "Study desk, open bookshelves, and vibrant pastel accents." },
      { title: "Guest Bedroom", desc: "Minimalist wardrobe, warm lighting, and luggage storage." },
      { title: "Living & Entertainment", desc: "Marble/wood fluted paneling and designer ceiling cove." },
    ],
    process: ["Concept Discussion & 3D Renderings", "Material & Hardware Selection", "Factory Production", "Precision Assembly & Final Polish"],
    suitableFor: "Families seeking complete, cohesive 3BHK interior transformations.",
    relatedLinks: [
      { label: "2BHK Interiors", href: "/services/residential/apartment-2bhk" },
      { label: "4BHK Interiors", href: "/services/residential/4bhk-interiors" },
      { label: "Villa Interiors", href: "/services/residential/villa" },
    ],
  },
  "residential/4bhk-interiors": {
    name: "4BHK Interiors",
    category: "Residential",
    categorySlug: "residential",
    eyebrow: "RESIDENTIAL · 4BHK INTERIORS",
    title: "Grand scale,",
    titleAccent: "refined details.",
    subtitle: "Expansive luxury living with premium veneers, imported Italian marble, and bespoke millwork throughout.",
    heroImage: "/images/Living Room/Living Room/4.png",
    overview: "Our 4BHK interior projects feature executive-level finishes, dedicated entertainment lounges, home offices, and custom cabinetry built to heirloom standards.",
    highlights: [
      "Italian marble flooring protection & customized inlay accents",
      "Large-format open dry kitchen + utility wet kitchen layout",
      "Private dressing rooms and glass wardrobe showcases",
      "Balcony deck transformations with wooden pergolas & greenery",
    ],
    deliverables: [
      { title: "Grand Foyer", desc: "Statement entryway with brass inlay, shoe gallery, and console." },
      { title: "Formal & Family Living", desc: "Two distinct living zones with acoustic separation." },
      { title: "4 Designer Bedrooms", desc: "Bespoke bed backdrops, automated curtains, and dressing suites." },
      { title: "Home Office & Study", desc: "Executive desk, library bookshelves, and integrated power docks." },
    ],
    process: ["Architectural Review & Concept Plan", "Detailed 3D & BOQ Costing", "Precision Millwork Fabrication", "Turnkey On-Site Execution & Handover"],
    suitableFor: "Owners of spacious luxury 4BHK apartments and penthouses.",
    relatedLinks: [
      { label: "Villa Interiors", href: "/services/residential/villa" },
      { label: "3BHK Interiors", href: "/services/residential/3bhk-interiors" },
      { label: "All Residential Services", href: "/services/residential" },
    ],
  },
  "residential/villa": {
    name: "Villa Interiors",
    category: "Residential",
    categorySlug: "residential",
    eyebrow: "RESIDENTIAL · VILLA",
    title: "Architectural grandeur",
    titleAccent: "inside and out.",
    subtitle: "Custom interiors for multi-level independent residences, double-height ceilings, and private courtyards.",
    heroImage: "/images/Living Room/Living Room/129 Living.png",
    overview: "Villa interiors demand a holistic architectural perspective. We harmonize double-height living areas, internal staircases, home theaters, and outdoor sit-outs into a unified experience.",
    highlights: [
      "Double-height feature walls with stone claddings and chandeliers",
      "Staircase lighting and frameless glass balustrades",
      "Dedicated home theater room with acoustic dampening",
      "Outdoor patio & terrace lounge installations",
    ],
    deliverables: [
      { title: "Grand Double-Height Living", desc: "6-meter tall feature walls, acoustic treatments, and statement lighting." },
      { title: "Gourmet Kitchen & Island", desc: "Breakfast bar, walk-in pantry, and built-in premium appliances." },
      { title: "Multi-Suite Bedrooms", desc: "Private balconies, custom wardrobes, and spa-inspired ensuite vanities." },
      { title: "Entertainment & Lounge", desc: "Bar counter, billiard room, or private theater setup." },
    ],
    process: ["Structural & Architectural Alignment", "3D Walkthroughs & Material Palettes", "On-site Civil & Millwork Coordination", "White-glove Turnkey Handover"],
    suitableFor: "Independent villa owners across Chennai, ECR, and gated communities.",
    relatedLinks: [
      { label: "Bungalow Interiors", href: "/services/residential/bungalow" },
      { label: "4BHK Interiors", href: "/services/residential/4bhk-interiors" },
      { label: "All Residential Services", href: "/services/residential" },
    ],
  },
  "residential/bungalow": {
    name: "Bungalow Interiors",
    category: "Residential",
    categorySlug: "residential",
    eyebrow: "RESIDENTIAL · BUNGALOW",
    title: "Heritage elegance meets",
    titleAccent: "modern comfort.",
    subtitle: "Sprawling single or two-storey independent residences crafted with timeless natural woods and airy courtyards.",
    heroImage: "/images/Dining/Dining/Dining.png",
    overview: "We preserve the warmth and open breezeways characteristic of classic bungalows while upgrading the infrastructure with contemporary modular storage, modern kitchens, and refined lighting.",
    highlights: [
      "Rich teak wood and brass detailing fused with minimalist lines",
      "Verandah & verandah-adjacent seating areas",
      "Courtyard landscaping and skylight integration",
      "Modern climate-controlled bedroom suites",
    ],
    deliverables: [
      { title: "Verandah & Sit-Out", desc: "Weatherproof teak benches, brass hanging swings, and ambient lanterns." },
      { title: "Central Hall & Dining", desc: "High wooden ceilings, expansive dining table, and partition credenzas." },
      { title: "Traditional-Modern Kitchen", desc: "Modern pullouts dressed in classic timber veneers." },
      { title: "Private Bed Chambers", desc: "Carved headboard details, linen drapery, and walk-in dressing." },
    ],
    process: ["Heritage & Layout Assessment", "Custom Woodwork & Finish Curation", "Precision Carpentry & Modular Fitting", "Final Handover"],
    suitableFor: "Bungalow and independent estate owners in South India.",
    relatedLinks: [
      { label: "Villa Interiors", href: "/services/residential/villa" },
      { label: "Residential Overview", href: "/services/residential" },
      { label: "View Portfolio", href: "/portfolio" },
    ],
  },

  // ── Commercial Subpages ──
  "commercial/office-workspaces": {
    name: "Office Workspaces",
    category: "Commercial",
    categorySlug: "commercial",
    eyebrow: "COMMERCIAL · OFFICE WORKSPACES",
    title: "High-productivity",
    titleAccent: "work environments.",
    subtitle: "Ergonomic workstations, collaborative meeting pods, and noise-dampened focus zones.",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    overview: "We turn office spaces into productive hubs that attract top talent, boost everyday collaboration, and reflect your corporate identity.",
    highlights: [
      "Modular workstations with concealed wire raceways and charging hubs",
      "Acoustic phone booths and breakout pods for private calls",
      "Ergonomic mesh task chairs and height-adjustable standing desks",
      "Cafeteria and recreational lounge zones",
    ],
    deliverables: [
      { title: "Reception & Waiting Lobby", desc: "Backlit corporate logo, comfortable lounge seating, and reception desk." },
      { title: "Workstation Floor", desc: "Modular desking clusters with acoustic fabric privacy screens." },
      { title: "Conference Rooms", desc: "Video-conference ready tables, acoustic wall slats, and AV integration." },
      { title: "Pantry & Breakout", desc: "Modular dry pantry, coffee bar counter, and relaxed casual seating." },
    ],
    process: ["Density & Headcount Planning", "Acoustic & Electrical Layouts", "Off-site Fabrication", "Fast-track Commissioning"],
    suitableFor: "Startups, IT companies, creative agencies, and regional branch offices.",
    relatedLinks: [
      { label: "Corporate Offices", href: "/services/enterprise/corporate-offices" },
      { label: "Retail Outlets", href: "/services/commercial/retail-outlets" },
      { label: "All Commercial Services", href: "/services/commercial" },
    ],
  },
  "commercial/retail-outlets": {
    name: "Retail Outlets",
    category: "Commercial",
    categorySlug: "commercial",
    eyebrow: "COMMERCIAL · RETAIL OUTLETS",
    title: "Storefronts that",
    titleAccent: "captivate & convert.",
    subtitle: "Showrooms and retail spaces engineered for product visibility, footfall circulation, and brand immersion.",
    heroImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
    overview: "Retail interiors must tell a story and sell products. We calibrate shelving heights, focal display islands, and lighting angles to drive customer engagement.",
    highlights: [
      "High CRI directional spotlights to accentuate product textures",
      "Modular display wall shelving adjustable for seasonal merchandising",
      "Point-of-Sale (POS) cash desks with anti-theft security integration",
      "Window display vitrines with maximum street appeal",
    ],
    deliverables: [
      { title: "Store Entrance & Façade", desc: "Illuminated 3D signage and high-impact window display platforms." },
      { title: "Perimeter Display Walls", desc: "Slatwall, track shelving, and backlit niche display shelving." },
      { title: "Central Display Islands", desc: "Feature gondolas and low-profile customer consultation tables." },
      { title: "Trial Rooms & Billing", desc: "Private fitting suites with flattering mirrors and streamlined cash desk." },
    ],
    process: ["Customer Flow Analysis", "Display Millwork Engineering", "Rapid Shop Fitting Installation", "Store Launch Preparation"],
    suitableFor: "Fashion boutiques, electronics showrooms, jewelry stores, and specialty retailers.",
    relatedLinks: [
      { label: "Hospitality & Cafés", href: "/services/commercial/hospitality" },
      { label: "Healthcare & Clinics", href: "/services/commercial/healthcare-clinics" },
      { label: "Commercial Services", href: "/services/commercial" },
    ],
  },
  "commercial/hospitality": {
    name: "Hospitality (Hotels, Restaurants & Cafés)",
    category: "Commercial",
    categorySlug: "commercial",
    eyebrow: "COMMERCIAL · HOSPITALITY",
    title: "Atmospheric spaces",
    titleAccent: "for unforgettable dining.",
    subtitle: "Warm, textured interiors for restaurants, boutique hotels, and bustling urban cafés.",
    heroImage: "/images/Commercial/Commercial/Hotel.png",
    overview: "Hospitality interiors require a delicate balance of mood, acoustic comfort, operational service speed, and resilient materials that withstand constant use.",
    highlights: [
      "Mood-shifting lighting scenes from daylight lunch to intimate dinner",
      "Acoustic plaster and sound-baffling ceiling designs",
      "Commercial kitchen and bar counter ergonomic layouts",
      "Stain-proof commercial upholstery and solid hardwood tabletops",
    ],
    deliverables: [
      { title: "Dining Floor & Booths", desc: "Bespoke booth seating, banquettes, and free-standing flexible tables." },
      { title: "Bar & Counter", desc: "Stone/brass bar front, overhead glass rack, and speed rail integration." },
      { title: "Host Stand & Waiting", desc: "Inviting entryway with photo-worthy feature walls." },
      { title: "Restroom Suites", desc: "Designer guest washrooms with luxury mirrors and warm indirect lighting." },
    ],
    process: ["Concept & Moodboard Development", "Kitchen & Seating Capacity Planning", "Fabrication & Material Testing", "Pre-opening Site Commissioning"],
    suitableFor: "Restaurateurs, café founders, and boutique hotel operators.",
    relatedLinks: [
      { label: "Retail Outlets", href: "/services/commercial/retail-outlets" },
      { label: "Office Workspaces", href: "/services/commercial/office-workspaces" },
      { label: "Commercial Services", href: "/services/commercial" },
    ],
  },
  "commercial/healthcare-clinics": {
    name: "Healthcare & Clinics",
    category: "Commercial",
    categorySlug: "commercial",
    eyebrow: "COMMERCIAL · HEALTHCARE",
    title: "Calm, hygienic",
    titleAccent: "healing spaces.",
    subtitle: "Medical and dental clinic interiors that reduce patient anxiety and support efficient clinical operations.",
    heroImage: "/images/Commercial/Commercial/Dental Clinic.png",
    overview: "Healthcare environments require clinical hygiene without feeling cold or sterile. We use calming colors, acoustic insulation, non-porous surfaces, and ergonomic treatment cabinetry.",
    highlights: [
      "Seamless non-porous Corian and acrylic solid surfaces for zero bacterial growth",
      "Calming waiting lounges with indirect glare-free illumination",
      "Concealed medical gas line and dental equipment integration",
      "Doctor consultation suites with private discussion areas",
    ],
    deliverables: [
      { title: "Patient Waiting Lounge", desc: "Comfortable ergonomic seating, reception desk, and calming water/nature feature." },
      { title: "Consultation Chambers", desc: "Executive doctor desk, patient exam bed curtaining, and document storage." },
      { title: "Treatment & Operatory Rooms", desc: "Custom dental cabinetry, sterile wash basins, and equipment hookups." },
      { title: "Sterilization & Pharmacy", desc: "Organized autoclave counters and secure medicine storage." },
    ],
    process: ["Clinical Workflow Analysis", "Medical Standard Compliance", "Antimicrobial Material Fabrication", "Rapid Turnkey Execution"],
    suitableFor: "Dentists, doctors, diagnostic centers, wellness spas, and private clinics.",
    relatedLinks: [
      { label: "View Dental Clinic Project", href: "/gallery/completed" },
      { label: "Office Workspaces", href: "/services/commercial/office-workspaces" },
      { label: "All Commercial Services", href: "/services/commercial" },
    ],
  },
  "commercial/educational-institutions": {
    name: "Educational & Institutions",
    category: "Commercial",
    categorySlug: "commercial",
    eyebrow: "COMMERCIAL · EDUCATION",
    title: "Inspiring environments for",
    titleAccent: "curious minds.",
    subtitle: "Dynamic classrooms, training centers, libraries, and campus auditoriums designed for focus and collaboration.",
    heroImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80",
    overview: "Modern education spaces must inspire engagement while enduring rigorous daily student usage. We design durable, flexible layouts that transition seamlessly between lectures and group teamwork.",
    highlights: [
      "Flexible reconfigurable mobile student desks and ergonomic seating",
      "High-clarity acoustic wall panels and digital smartboard integration",
      "Durable laminate cabinetry with heavy-duty edge-banding",
      "Quiet library reading pods and collaborative media spaces",
    ],
    deliverables: [
      { title: "Smart Classrooms", desc: "Interactive display wall, tiered seating options, and teacher podium." },
      { title: "Library & Resource Hub", desc: "Modular book shelving, individual study carrels, and computer labs." },
      { title: "Auditoriums & Seminar Halls", desc: "Acoustic wall panelling, stage lighting, and plush theater seating." },
      { title: "Faculty Lounge & Admin", desc: "Staff cubicles, meeting tables, and secure records storage." },
    ],
    process: ["Pedagogy & Spatial Flow Planning", "Acoustic Engineering & Lighting Design", "Heavy-Duty Fabrication", "Handover"],
    suitableFor: "Schools, colleges, coaching academies, and corporate learning centers.",
    relatedLinks: [
      { label: "Office Workspaces", href: "/services/commercial/office-workspaces" },
      { label: "Enterprise Design", href: "/services/enterprise" },
      { label: "All Services", href: "/services" },
    ],
  },

  // ── Enterprise Subpages ──
  "enterprise/corporate-offices": {
    name: "Corporate Office Interiors",
    category: "Enterprise",
    categorySlug: "enterprise",
    eyebrow: "ENTERPRISE · CORPORATE OFFICES",
    title: "Executive presence,",
    titleAccent: "engineered elegance.",
    subtitle: "Signature headquarters, boardrooms, and executive suites that convey authority and forward-thinking vision.",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    overview: "For enterprise clients, we craft corporate offices that command respect from global clients and create an inspiring everyday workplace for leadership teams.",
    highlights: [
      "Signature double-height reception with architectural statement chandelier",
      "Acoustically certified executive boardrooms with motorized AV screens",
      "C-Suite private executive cabins with private lounges and meeting nooks",
      "Enterprise security access control integration",
    ],
    deliverables: [
      { title: "Grand Corporate Lobby", desc: "3D brand monument wall, security turnstiles, and concierge reception." },
      { title: "The Boardroom", desc: "24-seat conference table with integrated microphone ports and retractable displays." },
      { title: "Leadership Suites", desc: "Fine veneer credenzas, Italian leather executive chairs, and private ensuite." },
      { title: "Client Hospitality Lounge", desc: "Private espresso bar, dining suite, and curated art gallery lighting." },
    ],
    process: ["Enterprise Architecture Assessment", "3D Executive Walkthroughs", "Precision High-Spec Millwork", "White-Glove Commissioning"],
    suitableFor: "Multinational corporations, financial institutions, and enterprise headquarters.",
    relatedLinks: [
      { label: "Collaborative Workspaces", href: "/services/enterprise/collaborative-workspaces" },
      { label: "Biophilic Design", href: "/services/enterprise/biophilic-design" },
      { label: "Enterprise Overview", href: "/services/enterprise" },
    ],
  },
  "enterprise/collaborative-workspaces": {
    name: "Collaborative Workspaces",
    category: "Enterprise",
    categorySlug: "enterprise",
    eyebrow: "ENTERPRISE · COLLABORATIVE",
    title: "Spaces that spark",
    titleAccent: "ideas & innovation.",
    subtitle: "Flexible open-plan layouts, agile project rooms, and multi-purpose town hall auditoriums.",
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    overview: "Break away from rigid cubicles. Our collaborative workspace designs empower cross-functional teams to brainstorm, huddle, and deliver rapid innovation.",
    highlights: [
      "Agile whiteboard walls and portable markerboards",
      "Tiered bleacher seating for company-wide all-hands meetings",
      "Acoustic baffle ceilings that preserve open-plan energy without speech distraction",
      "Flexible power tracks and motorized standing team tables",
    ],
    deliverables: [
      { title: "Agile Project Rooms", desc: "Writetable glass walls, modular wheeled tables, and video sprint stations." },
      { title: "Town Hall Arena", desc: "Stepped wooden bleachers, high-lumen laser projector, and stage lights." },
      { title: "Open Collaboration Lounges", desc: "High-back acoustic sofas that create semi-private conversation pockets." },
      { title: "Innovation Labs", desc: "Prototyping benches, presentation screens, and secure lockers." },
    ],
    process: ["Collaboration Persona Mapping", "Agile Layout Engineering", "Fast-track Turnkey Setup", "Handover"],
    suitableFor: "Tech innovators, product teams, and modern co-working operators.",
    relatedLinks: [
      { label: "Corporate Offices", href: "/services/enterprise/corporate-offices" },
      { label: "Biophilic Design", href: "/services/enterprise/biophilic-design" },
      { label: "Enterprise Overview", href: "/services/enterprise" },
    ],
  },
  "enterprise/biophilic-design": {
    name: "Biophilic Enterprise Design",
    category: "Enterprise",
    categorySlug: "enterprise",
    eyebrow: "ENTERPRISE · BIOPHILIC DESIGN",
    title: "Bringing nature",
    titleAccent: "into the workplace.",
    subtitle: "Living green walls, circadian lighting, and natural stone textures that promote cognitive wellness and reduce burnout.",
    heroImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    overview: "Scientific studies prove that biophilic design reduces employee fatigue by up to 30%. We integrate automated living walls, natural daylight optimization, and non-toxic organic materials.",
    highlights: [
      "Automated hydroponic indoor vertical gardens with drip irrigation",
      "Circadian rhythm LED lighting that mirrors natural sun cycles",
      "Natural stone, clay plaster, and certified FSC timber finishes",
      "Indoor zen water features and air-purifying botanical islands",
    ],
    deliverables: [
      { title: "Living Green Atriums", desc: "Floor-to-ceiling vertical gardens with automated nutrient dosing." },
      { title: "Wellness & Mindfulness Pods", desc: "Low-stimulus rejuvenation quiet spaces for focused meditation or rest." },
      { title: "Botanical Work Desks", desc: "Integrated plant troughs separating workstation rows." },
      { title: "Circadian Lighting Network", desc: "Tunable white lighting that transitions from energizing 5000K to calming 2700K." },
    ],
    process: ["Botanical & Daylight Simulation", "Irrigation & MEP Integration", "Plant Sourcing & Planting", "Maintenance Protocols Handover"],
    suitableFor: "Forward-thinking enterprises committed to employee well-being, ESG goals, and LEED/WELL certifications.",
    relatedLinks: [
      { label: "Corporate Offices", href: "/services/enterprise/corporate-offices" },
      { label: "Collaborative Workspaces", href: "/services/enterprise/collaborative-workspaces" },
      { label: "Enterprise Overview", href: "/services/enterprise" },
    ],
  },
};

export default function ServiceCatchAllPage() {
  const params = useParams();
  const rawSlug = params.slug;
  const slugKey = Array.isArray(rawSlug) ? rawSlug.join("/").toLowerCase() : typeof rawSlug === "string" ? rawSlug.toLowerCase() : "";

  const data = servicesData[slugKey];

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

      {/* Breadcrumb & Section Navigation */}
      <nav className="shell" style={{ paddingTop: "40px", paddingBottom: "10px" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center", borderBottom: "1px solid #ddd6cb", paddingBottom: "20px" }}>
          <Link href="/services" style={{ fontSize: "13px", color: "#666", textDecoration: "none" }}>
            Services
          </Link>
          <span style={{ color: "#aaa" }}>/</span>
          <Link href={`/services/${data.categorySlug}`} style={{ fontSize: "13px", color: "#666", textDecoration: "none", fontWeight: 500 }}>
            {data.category}
          </Link>
          {slugKey.includes("/") && (
            <>
              <span style={{ color: "#aaa" }}>/</span>
              <span style={{ fontSize: "13px", color: "#1e1d1a", fontWeight: 600 }}>
                {data.name}
              </span>
            </>
          )}
        </div>
      </nav>

      {/* Overview & Key Highlights */}
      <section className="shell" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px", alignItems: "start" }}>
          <div>
            <p className="eyebrow dark">OVERVIEW</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", margin: "0 0 16px", color: "#1e1d1a" }}>
              Tailored for excellence.
            </h2>
            <p style={{ fontSize: "16px", lineHeight: "1.75", color: "#555", marginBottom: "30px" }}>
              {data.overview}
            </p>

            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "24px", margin: "0 0 16px", color: "#1e1d1a" }}>
              What&apos;s Included:
            </h3>
            <ul style={{ paddingLeft: "20px", color: "#555", fontSize: "14px", lineHeight: "1.8", margin: 0 }}>
              {data.highlights.map((h) => (
                <li key={h} style={{ marginBottom: "8px" }}>
                  <strong>{h}</strong>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "32px", padding: "18px 22px", background: "#f5f3ee", borderRadius: "4px", borderLeft: "3px solid var(--gold, #b29565)" }}>
              <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>
                <strong>Ideal for:</strong> {data.suitableFor}
              </p>
            </div>
          </div>

          {/* Deliverables Cards */}
          <div style={{ background: "#ffffff", padding: "clamp(20px, 4vw, 32px)", borderRadius: "4px", border: "1px solid #e2ddd4", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "26px", margin: "0 0 20px", color: "#1e1d1a" }}>
              Key Offerings
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {data.deliverables.map((item, i) => (
                <div key={item.title} style={{ borderBottom: i < data.deliverables.length - 1 ? "1px solid #eee" : "none", paddingBottom: "14px" }}>
                  <h4 style={{ margin: "0 0 4px", fontSize: "16px", color: "#1e1d1a" }}>
                    0{i + 1}. {item.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: "13px", color: "#666", lineHeight: "1.5" }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "30px" }}>
              <Link
                href={`/contact?service=${encodeURIComponent(data.name)}`}
                className="button dark"
                style={{ width: "100%", justifyContent: "center", textDecoration: "none" }}
              >
                Get a Quote for {data.name} <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Execution Process Steps */}
      <section style={{ background: "#282723", color: "#f5f3ee", padding: "80px 0" }}>
        <div className="shell">
          <p className="eyebrow" style={{ color: "#e8c99b" }}>HOW WE DELIVER</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", margin: "0 0 40px" }}>
            The Vinskape Execution Process
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {data.process.map((step, i) => (
              <div key={step} style={{ borderTop: "1px solid #555", paddingTop: "20px" }}>
                <span style={{ fontSize: "12px", color: "var(--gold, #b29565)", letterSpacing: "0.1em", fontWeight: 600 }}>
                  PHASE 0{i + 1}
                </span>
                <p style={{ fontSize: "15px", marginTop: "10px", lineHeight: "1.5", color: "#e3ded7" }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Subpages */}
      {data.relatedLinks.length > 0 && (
        <section className="shell" style={{ paddingTop: "60px", paddingBottom: "100px" }}>
          <p className="eyebrow dark">EXPLORE RELATED SERVICES</p>
          <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", margin: "0 0 24px", color: "#1e1d1a" }}>
            More in {data.category}
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {data.relatedLinks.map((rel) => (
              <Link
                key={rel.label}
                href={rel.href}
                style={{
                  padding: "10px 20px",
                  borderRadius: "30px",
                  fontSize: "13px",
                  textDecoration: "none",
                  backgroundColor: "#f5f3ee",
                  color: "#1e1d1a",
                  border: "1px solid #d4cdc3",
                  transition: "all 0.25s ease",
                }}
              >
                {rel.label} →
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
