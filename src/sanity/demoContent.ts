import type { HomeData } from "./types";
const img = (id: string, alt: string) => ({ url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2200&q=85`, alt });
export const demoHomeData: HomeData = {
  brand: {
    name: "VINSKAPE",
    tagline: "Crafting Spaces. Defining Lifestyles.",
    contact: {
      phone: "+91 81110 00245",
      whatsapp: "918111000245",
      whatsappMessage: "Hi Vinskape team, I need a quotation for interior design.",
      email: "studio@vinskape.in",
      address: "S.No.75 Ponmar Kandigai Road, Opposite Jones Castle Valley, Vengadamangalam, Chennai - 600127",
      instagram: "https://www.instagram.com/vinskape?igsi=MXQwYW5qZHYyMDFpaA==",
      hours: "Mon–Sat, 09:30–19:00"
    }
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Gallery", href: "/gallery" },
    { label: "Our Dealerships", href: "/dealerships" },
    { label: "Products", href: "/products" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact", featured: true }
  ],
  heroSlides: [
    { id: "welcome", eyebrow: "WELCOME TO VINSKAPE", heading: "Crafting Spaces.\nDefining Lifestyles.", description: "Transforming homes, workplaces and commercial environments into thoughtfully designed spaces that feel distinctly yours.", image: { url: "/images/Living Room/Living Room/Living.png", alt: "Warm modern living room" }, primaryCta: "Explore Our Work", secondaryCta: "Begin a conversation" },
    { id: "residential", eyebrow: "RESIDENTIAL INTERIORS", heading: "Interiors Designed\nAround You", description: "Elegant apartments and sophisticated villas, balanced for beauty, comfort and the rhythms of everyday life.", image: { url: "/images/Bedroom/Bedroom/Classic Bedroom.png", alt: "Contemporary home interior" }, primaryCta: "Discover Residential", secondaryCta: "Get a Quote" },
    { id: "timeless", eyebrow: "TIMELESS DESIGN", heading: "Where Elegance\nMeets Function", description: "Refined details, intelligent planning and materials chosen to grow more beautiful with time.", image: { url: "/images/Kitchen/Kitchen/Modern Kitchen (1).png", alt: "Minimal kitchen dining interior" }, primaryCta: "View Our Portfolio", secondaryCta: "Contact Us" },
    { id: "commercial", eyebrow: "COMMERCIAL SPACES", heading: "Spaces That Build\nExperiences", description: "Memorable environments that strengthen your brand and elevate each customer interaction.", image: { url: "/images/Commercial/Commercial/Hotel.png", alt: "Warm hotel interior" }, primaryCta: "Explore Commercial", secondaryCta: "Consult Our Team" },
    { id: "story", eyebrow: "YOUR SPACE. YOUR STORY.", heading: "Let’s Create Something\nExtraordinary", description: "Tell us about your space and let our design team turn your vision into a beautifully crafted reality.", image: { url: "/images/Living Room/Living Room/4.png", alt: "Sophisticated modern interior" }, primaryCta: "Start Your Project", secondaryCta: "View Gallery" }
  ],
  introduction: {
    eyebrow: "ABOUT VINSKAPE",
    heading: "Spaces designed to feel like yours.",
    description: "Vinskape brings architectural thinking to the intimate details of everyday living. We make rooms that work beautifully, and feel quietly personal.",
    image: { url: "/images/Living Room/Living Room/129 Living.png", alt: "Modern Vinskape residence" },
    cta: { text: "Discover our approach", action: "/about" },
    statistics: [
      { value: "10+", label: "Years of design experience" },
      { value: "250+", label: "Spaces crafted" },
      { value: "100%", label: "Client-focused design" }
    ]
  },
  services: [
    { name: "Residential", slug: "residential", description: "Homes with a quietly luxurious sense of ease.", items: ["2BHK & 3BHK", "Luxury Villas", "Bungalows"], image: { url: "/images/Living Room/Living Room/1.png", alt: "Residential interior" } },
    { name: "Commercial", slug: "commercial", description: "Spaces that invite customers to stay, notice and return.", items: ["Workspaces", "Retail", "Hospitality", "Healthcare"], image: { url: "/images/Commercial/Commercial/Dental Clinic.png", alt: "Commercial interior" } },
    { name: "Enterprise", slug: "enterprise", description: "Workplaces calibrated for people, purpose and performance.", items: ["Corporate Offices", "Collaborative Workspaces", "Biophilic Design"], image: { url: "/images/Commercial/Commercial/Hotel.png", alt: "Enterprise office interior" } }
  ],
  projects: [
    { name: "Contemporary Residence", category: "Residential", location: "Chennai", description: "Natural stone, smoked oak and a calm, open plan.", status: "FEATURED", image: { url: "/images/Living Room/Living Room/1.png", alt: "Contemporary living room in Chennai" } },
    { name: "Urban Luxury Villa", category: "Residential", location: "Ponmar, Chennai", description: "A modern retreat built around daylight and gathering.", status: "COMPLETED", image: { url: "/images/Living Room/Living Room/Living.png", alt: "Urban luxury villa in Chennai" } },
    { name: "Modern Dental Clinic", category: "Healthcare", location: "Chennai", description: "Textured materiality and serene clinical aesthetics.", status: "COMPLETED", image: { url: "/images/Commercial/Commercial/Dental Clinic.png", alt: "Dental clinic interior" } },
    { name: "Boutique Hospitality Hotel", category: "Commercial", location: "Chennai", description: "A considered journey through product, lighting and space.", status: "COMPLETED", image: { url: "/images/Commercial/Commercial/Hotel.png", alt: "Hotel hospitality interior" } }
  ],
  portfolio: [
    { name: "Living Room", slug: "living-room", image: { url: "/images/Living Room/Living Room/Living.png", alt: "Vinskape Living Room Interior" } },
    { name: "Modular Kitchen", slug: "kitchen", image: { url: "/images/Kitchen/Kitchen/Modern Kitchen (1).png", alt: "Vinskape Modern Modular Kitchen" } },
    { name: "Master Bedroom", slug: "bedroom", image: { url: "/images/Bedroom/Bedroom/Classic Bedroom.png", alt: "Vinskape Classic Bedroom Interior" } },
    { name: "Kids Room", slug: "kids-room", image: { url: "/images/Kids Room/Kids Room/Kids Room.png", alt: "Vinskape Kids Room Design" } },
    { name: "Dining Space", slug: "dining", image: { url: "/images/Dining/Dining/Dining.png", alt: "Vinskape Dining Room" } },
    { name: "Walk-in Wardrobe", slug: "bedroom", image: { url: "/images/Bedroom/Bedroom/Walk-in-Wardrobe 1.png", alt: "Vinskape Luxury Walk-in Wardrobe" } },
    { name: "Commercial & Office", slug: "commercial", image: { url: "/images/Commercial/Commercial/Hotel.png", alt: "Vinskape Commercial & Office Design" } },
    { name: "Healthcare & Clinic", slug: "commercial", image: { url: "/images/Commercial/Commercial/Dental Clinic.png", alt: "Vinskape Healthcare & Clinic Design" } }
  ],
  testimonials: [
    { quote: "The team listened closely, then made every room feel more considered than we imagined possible. From the modular kitchen to the living room, everything is pristine.", name: "Dr. K. Ramanathan", place: "Chennai", project: "Contemporary Residence, Ponmar" },
    { quote: "The process was grounded, thoughtful and exceptionally clear from the initial 3D drawings to the final dealership finishings.", name: "Suresh & Anitha", place: "Chennai", project: "Luxury 3BHK Villa" }
  ]
};

