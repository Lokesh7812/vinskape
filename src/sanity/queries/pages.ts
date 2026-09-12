export const aboutQuery = `*[_type == "aboutPage"][0]{
  heroEyebrow,
  heroTitle,
  heroTitleAccent,
  heroSubtitle,
  "heroBackgroundImage": heroBackgroundImage.asset->url,
  storyEyebrow,
  storyHeading,
  storyHeadingAccent,
  storyParagraphs,
  "storyImage": storyImage.asset->url,
  values[]{ icon, title, desc },
  stats[]{ value, label },
  mission{ eyebrow, heading, headingAccent, description },
  vision{ eyebrow, heading, headingAccent, description },
  cta{ heading, headingAccent, subtitle, buttonText }
}`;

export const servicesQuery = `*[_type == "servicesPage"][0]{
  heroEyebrow,
  heroTitle,
  heroTitleAccent,
  heroSubtitle,
  "heroBackgroundImage": heroBackgroundImage.asset->url,
  residential{
    eyebrow, heading, headingAccent, description,
    items[]{ name, desc, icon }
  },
  commercial{
    eyebrow, heading, headingAccent, description,
    items[]{ name, desc, icon }
  },
  enterprise{
    eyebrow, heading, headingAccent, description,
    items[]{ name, desc, icon }
  },
  cta{ heading, description, buttonText }
}`;

export const galleryQuery = `*[_type == "galleryProject"] | order(order asc){
  name,
  location,
  type,
  status,
  progress,
  year,
  "image": image.asset->url
}`;

export const productsQuery = `*[_type == "productItem"] | order(order asc){
  name,
  desc,
  features,
  "image": image.asset->url,
  icon
}`;

export const portfolioCategoriesQuery = `*[_type == "portfolioCategory" && active == true] | order(order asc){
  name,
  "slug": slug.current,
  "coverImage": coverImage.asset->url,
  "images": gallery[].asset->url
}`;

export const portfolioCategoryBySlugQuery = `*[_type == "portfolioCategory" && (slug.current == $slug || ($slug == "modular-kitchen" && slug.current == "kitchen") || ($slug == "kitchen" && slug.current == "modular-kitchen"))][0]{
  name,
  "slug": slug.current,
  eyebrow,
  heroTitle,
  heroTitleAccent,
  heroSubtitle,
  "heroImage": heroImage.asset->url,
  "coverImage": coverImage.asset->url,
  overview,
  features[]{ title, desc },
  materials,
  "images": gallery[].asset->url
}`;

export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc){
  "quote": testimonial,
  "name": clientName,
  "place": location,
  "project": coalesce(project->title, "Interior Design"),
  rating
}`;

export const contactQuery = `*[_type == "contactPage"][0]{
  heroEyebrow,
  heroTitle,
  heroTitleAccent,
  heroSubtitle,
  heading,
  headingAccent,
  description,
  phone,
  whatsapp,
  email,
  address,
  workingHours,
  instagram,
  facebook,
  linkedin
}`;
