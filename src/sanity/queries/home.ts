export const homeQuery = `{
  "brand": *[_type == "siteSettings"][0]{"name":brandName,"tagline":tagline,"contact":contact},
  "navigation": *[_type == "navigationItem" && !defined(parent) && visible == true] | order(order asc){label,featured,"children": *[_type == "navigationItem" && parent._ref == ^._id && visible == true] | order(order asc){label,featured}},
  "heroSlides": *[_type == "heroSlide" && active == true && defined(backgroundImage.asset)] | order(order asc){"id":_id,eyebrow,heading,description,"image": {"url": backgroundImage.asset->url,"alt": backgroundImage.alt},"primaryCta":primaryCta.text,"secondaryCta":secondaryCta.text},
  "introduction": *[_type == "homeIntroduction" && defined(image.asset)][0]{eyebrow,heading,description,"image":{"url":image.asset->url,"alt":image.alt},"cta":cta{ text, action },statistics[]{value,label}},
  "services": *[_type == "service" && active == true && defined(image.asset)] | order(order asc){name,description,items,"image":{"url":image.asset->url,"alt":image.alt}},
  "projects": *[_type == "project" && featured == true && defined(coverImage.asset)] | order(order asc){"name":title,category,location,description,status,"image":{"url":coverImage.asset->url,"alt":coverImage.alt}},
  "portfolio": *[_type == "portfolioCategory" && active == true && defined(coverImage.asset)] | order(order asc){name,"slug":slug.current,"image":{"url":coverImage.asset->url,"alt":coverImage.alt}},
  "testimonials": *[_type == "testimonial" && featured == true] | order(order asc){"quote":testimonial,"name":clientName,"place":location,"project":project->title},
  "dealers": *[_type == "dealer" && active == true && defined(logo.asset)] | order(order asc){name, category, description, website, "image": {"url": logo.asset->url, "alt": name}}
}`;

