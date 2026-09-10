export type ImageAsset = { url: string; alt: string };
export type NavigationItem = { label: string; href?: string; children?: NavigationItem[]; featured?: boolean };
export type HeroSlide = { id: string; eyebrow: string; heading: string; description: string; image: ImageAsset; primaryCta: string; secondaryCta?: string };
export type Service = { name: string; slug?: string; description: string; items: string[]; image: ImageAsset };
export type Project = { name: string; category: string; location: string; description: string; image: ImageAsset; status: string };
export type Testimonial = { quote: string; name: string; place: string; project: string };
export type Introduction = { eyebrow: string; heading: string; description: string; image: ImageAsset; cta: { text: string; action?: string }; statistics: { value: string; label: string }[] };
export type HomeData = { brand: { name: string; tagline: string; contact: { phone: string; whatsapp: string; whatsappMessage: string; email: string; address: string; hours: string; instagram?: string } }; navigation: NavigationItem[]; heroSlides: HeroSlide[]; introduction: Introduction; services: Service[]; projects: Project[]; portfolio: { name: string; slug?: string; image: ImageAsset }[]; testimonials: Testimonial[] };
