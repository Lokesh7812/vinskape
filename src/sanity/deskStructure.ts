import type { StructureResolver } from "sanity/structure";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // 1. Site Settings (singleton)
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),

      S.divider(),

      // 2. Home
      S.listItem()
        .title("Home")
        .child(
          S.list()
            .title("Home")
            .items([
              S.documentTypeListItem("heroSlide").title("Hero Slides"),
              S.listItem()
                .title("Introduction")
                .id("homeIntroduction")
                .child(
                  S.document()
                    .schemaType("homeIntroduction")
                    .documentId("homeIntroduction")
                    .title("Introduction")
                ),
              S.documentTypeListItem("service").title("Services (Home Highlights)"),
              S.documentTypeListItem("project").title("Projects (Home Highlights)"),
              S.documentTypeListItem("homeSectionSettings").title("Home Section Settings"),
            ])
        ),

      // 3. Pages
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("About Page")
                .id("aboutPage")
                .child(
                  S.document()
                    .schemaType("aboutPage")
                    .documentId("aboutPage")
                    .title("About Page")
                ),
              S.listItem()
                .title("Services Page")
                .id("servicesPage")
                .child(
                  S.document()
                    .schemaType("servicesPage")
                    .documentId("servicesPage")
                    .title("Services Page")
                ),
              S.listItem()
                .title("Contact Page")
                .id("contactPage")
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contactPage")
                    .title("Contact Page")
                ),
            ])
        ),

      // 4. Portfolio (Sub-Pages)
      S.listItem()
        .title("Portfolio (Sub-Pages)")
        .child(
          S.list()
            .title("Portfolio Sub-Pages")
            .items([
              S.listItem()
                .title("Living Room")
                .child(
                  S.document()
                    .schemaType("portfolioCategory")
                    .documentId("seed-portfolio-living-room")
                    .title("Living Room")
                ),
              S.listItem()
                .title("Modular Kitchen")
                .child(
                  S.document()
                    .schemaType("portfolioCategory")
                    .documentId("seed-portfolio-modular-kitchen")
                    .title("Modular Kitchen")
                ),
              S.listItem()
                .title("Bedroom")
                .child(
                  S.document()
                    .schemaType("portfolioCategory")
                    .documentId("seed-portfolio-bedroom")
                    .title("Bedroom")
                ),
              S.listItem()
                .title("Kids Room")
                .child(
                  S.document()
                    .schemaType("portfolioCategory")
                    .documentId("seed-portfolio-kids-room")
                    .title("Kids Room")
                ),
              S.listItem()
                .title("Dining")
                .child(
                  S.document()
                    .schemaType("portfolioCategory")
                    .documentId("seed-portfolio-dining")
                    .title("Dining")
                ),
              S.listItem()
                .title("Office")
                .child(
                  S.document()
                    .schemaType("portfolioCategory")
                    .documentId("seed-portfolio-office")
                    .title("Office")
                ),
              S.listItem()
                .title("Commercial")
                .child(
                  S.document()
                    .schemaType("portfolioCategory")
                    .documentId("seed-portfolio-commercial")
                    .title("Commercial")
                ),
              S.listItem()
                .title("Bathroom")
                .child(
                  S.document()
                    .schemaType("portfolioCategory")
                    .documentId("seed-portfolio-bathroom")
                    .title("Bathroom")
                ),
              S.divider(),
              S.documentTypeListItem("portfolioCategory").title("All Portfolio Categories"),
            ])
        ),

      // 5. Gallery
      S.listItem()
        .title("Gallery")
        .child(
          S.list()
            .title("Gallery")
            .items([
              S.listItem()
                .title("Ongoing Projects")
                .child(
                  S.documentList()
                    .title("Ongoing Projects")
                    .filter('_type == "galleryProject" && status == "Ongoing"')
                ),
              S.listItem()
                .title("Completed Projects")
                .child(
                  S.documentList()
                    .title("Completed Projects")
                    .filter('_type == "galleryProject" && status == "Completed"')
                ),
              S.divider(),
              S.documentTypeListItem("galleryProject").title("All Gallery Projects"),
            ])
        ),

      // 6. Products & Furniture
      S.documentTypeListItem("productItem").title("Products & Furniture"),

      // 7. Testimonials
      S.documentTypeListItem("testimonial").title("Testimonials"),

      // 8. Dealerships & Partners
      S.documentTypeListItem("dealer").title("Dealerships & Partners"),

      S.divider(),

      // 9. Navigation
      S.documentTypeListItem("navigationItem").title("Navigation"),

      // 10. SEO Settings
      S.documentTypeListItem("seoSettings").title("SEO Settings"),
    ]);
