import { defineArrayMember, defineField, defineType } from "sanity";

const image = () =>
  defineField({
    name: "image",
    title: "Image",
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Accessible image description",
        type: "string",
      }),
    ],
  });

const cta = () =>
  defineField({
    name: "cta",
    title: "Call to action",
    type: "object",
    fields: [
      defineField({ name: "text", title: "Button label", type: "string" }),
      defineField({
        name: "action",
        title: "Future URL or action",
        type: "string",
        description: "Stored for later routing; the current demo stays on the home page.",
      }),
    ],
  });

const order = () =>
  defineField({
    name: "order",
    title: "Display order",
    type: "number",
    initialValue: 0,
  });

export const schemaTypes = [
  defineType({
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    groups: [
      { name: "brand", title: "Brand" },
      { name: "contact", title: "Contact" },
      { name: "seo", title: "SEO" },
    ],
    fields: [
      defineField({ name: "brandName", title: "Brand name", type: "string", group: "brand" }),
      defineField({ name: "tagline", title: "Tagline", type: "string", group: "brand" }),
      image(),
      defineField({
        name: "contact",
        title: "Contact details",
        type: "object",
        group: "contact",
        fields: [
          defineField({ name: "phone", type: "string" }),
          defineField({ name: "whatsapp", title: "WhatsApp number (country code included)", type: "string" }),
          defineField({ name: "whatsappMessage", title: "Default WhatsApp message", type: "text" }),
          defineField({ name: "email", type: "string" }),
          defineField({ name: "address", type: "string" }),
          defineField({ name: "hours", title: "Business hours", type: "string" }),
          defineField({ name: "instagram", title: "Instagram profile URL", type: "url" }),
        ],
      }),
      defineField({
        name: "heroAutoplayDuration",
        title: "Hero autoplay duration (ms)",
        type: "number",
        initialValue: 5600,
      }),
      defineField({
        name: "seo",
        title: "Default SEO",
        type: "object",
        group: "seo",
        fields: [
          defineField({ name: "title", type: "string" }),
          defineField({ name: "description", type: "text" }),
          defineField({ name: "keywords", type: "array", of: [defineArrayMember({ type: "string" })] }),
          image(),
        ],
      }),
    ],
  }),

  defineType({
    name: "navigationItem",
    title: "Navigation",
    type: "document",
    fields: [
      defineField({
        name: "label",
        title: "Label",
        type: "string",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "parent",
        title: "Parent menu item",
        type: "reference",
        to: [{ type: "navigationItem" }],
      }),
      defineField({ name: "url", title: "Future URL/action", type: "string" }),
      defineField({ name: "visible", title: "Visible", type: "boolean", initialValue: true }),
      defineField({ name: "featured", title: "Accent / featured item", type: "boolean", initialValue: false }),
      order(),
    ],
  }),

  defineType({
    name: "heroSlide",
    title: "Hero Slides",
    type: "document",
    fields: [
      defineField({ name: "title", title: "Internal name", type: "string" }),
      defineField({ name: "eyebrow", type: "string" }),
      defineField({ name: "heading", type: "string" }),
      defineField({ name: "description", type: "text" }),
      defineField({
        name: "backgroundImage",
        title: "Background image",
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "alt", type: "string" })],
      }),
      defineField({
        name: "primaryCta",
        title: "Primary CTA",
        type: "object",
        fields: [
          defineField({ name: "text", type: "string" }),
          defineField({ name: "action", type: "string" }),
        ],
      }),
      defineField({
        name: "secondaryCta",
        title: "Secondary CTA",
        type: "object",
        fields: [
          defineField({ name: "text", type: "string" }),
          defineField({ name: "action", type: "string" }),
        ],
      }),
      defineField({
        name: "textAlignment",
        type: "string",
        options: { list: ["left", "center", "right"] },
        initialValue: "left",
      }),
      defineField({ name: "active", type: "boolean", initialValue: true }),
      order(),
    ],
  }),

  defineType({
    name: "homeIntroduction",
    title: "Home Introduction",
    type: "document",
    fields: [
      defineField({ name: "eyebrow", type: "string" }),
      defineField({ name: "heading", type: "string" }),
      defineField({ name: "description", type: "text" }),
      image(),
      cta(),
      defineField({
        name: "statistics",
        type: "array",
        of: [
          defineArrayMember({
            name: "stat",
            title: "Statistic",
            type: "object",
            fields: [
              defineField({ name: "value", type: "string" }),
              defineField({ name: "label", type: "string" }),
            ],
          }),
        ],
      }),
    ],
  }),

  defineType({
    name: "service",
    title: "Services",
    type: "document",
    fields: [
      defineField({ name: "name", type: "string" }),
      defineField({
        name: "category",
        type: "string",
        options: { list: ["Residential", "Commercial", "Industrial"] },
      }),
      defineField({ name: "description", type: "text" }),
      image(),
      defineField({
        name: "items",
        title: "Sub-services",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
      }),
      cta(),
      defineField({ name: "featured", type: "boolean", initialValue: false }),
      defineField({ name: "active", type: "boolean", initialValue: true }),
      order(),
    ],
  }),

  defineType({
    name: "project",
    title: "Projects",
    type: "document",
    fields: [
      defineField({ name: "title", type: "string" }),
      defineField({ name: "slug", type: "slug", options: { source: "title" } }),
      defineField({ name: "category", type: "string" }),
      defineField({ name: "projectType", type: "string" }),
      defineField({ name: "location", type: "string" }),
      defineField({ name: "description", type: "text" }),
      defineField({
        name: "coverImage",
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "alt", type: "string" })],
      }),
      defineField({
        name: "gallery",
        type: "array",
        of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      }),
      defineField({
        name: "status",
        type: "string",
        options: { list: ["Ongoing", "Completed"] },
      }),
      defineField({ name: "completionDate", type: "date" }),
      defineField({ name: "featured", type: "boolean", initialValue: false }),
      order(),
    ],
  }),

  defineType({
    name: "portfolioCategory",
    title: "Portfolio Categories",
    type: "document",
    groups: [
      { name: "hero", title: "Hero Section" },
      { name: "content", title: "Content" },
      { name: "gallery", title: "Gallery Images" },
    ],
    fields: [
      defineField({ name: "name", type: "string", validation: (r) => r.required() }),
      defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
      defineField({ name: "description", type: "text" }),
      defineField({
        name: "coverImage",
        title: "Cover Image (for Portfolio grid)",
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "alt", type: "string" })],
      }),
      // ── Hero Section ──
      defineField({ name: "eyebrow", title: "Hero Eyebrow", type: "string", group: "hero" }),
      defineField({ name: "heroTitle", title: "Hero Title", type: "string", group: "hero" }),
      defineField({ name: "heroTitleAccent", title: "Hero Title Accent", type: "string", group: "hero" }),
      defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text", group: "hero" }),
      defineField({
        name: "heroImage",
        title: "Hero Background Image",
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "alt", type: "string" })],
        group: "hero",
      }),
      // ── Content ──
      defineField({ name: "overview", title: "Overview Text", type: "text", group: "content" }),
      defineField({
        name: "features",
        title: "Signature Features",
        type: "array",
        group: "content",
        of: [
          defineArrayMember({
            type: "object",
            fields: [
              defineField({ name: "title", type: "string" }),
              defineField({ name: "desc", title: "Description", type: "text" }),
            ],
          }),
        ],
      }),
      defineField({
        name: "materials",
        title: "Materials & Finishes",
        type: "array",
        group: "content",
        of: [defineArrayMember({ type: "string" })],
      }),
      // ── Gallery ──
      defineField({
        name: "gallery",
        title: "Gallery Images",
        type: "array",
        group: "gallery",
        of: [
          defineArrayMember({
            type: "image",
            options: { hotspot: true },
            fields: [defineField({ name: "alt", type: "string" })],
          }),
        ],
      }),
      defineField({ name: "active", type: "boolean", initialValue: true }),
      order(),
    ],
    preview: {
      select: { title: "name", subtitle: "eyebrow", media: "coverImage" },
    },
  }),

  defineType({
    name: "testimonial",
    title: "Testimonials",
    type: "document",
    fields: [
      defineField({ name: "clientName", title: "Client name", type: "string" }),
      defineField({ name: "clientImage", type: "image", options: { hotspot: true } }),
      defineField({ name: "location", type: "string" }),
      defineField({ name: "testimonial", type: "text" }),
      defineField({
        name: "rating",
        type: "number",
        validation: (r) => r.min(1).max(5),
      }),
      defineField({
        name: "project",
        type: "reference",
        to: [{ type: "project" }],
      }),
      defineField({ name: "featured", type: "boolean", initialValue: false }),
      order(),
    ],
  }),

  defineType({
    name: "dealer",
    title: "Dealers & Partners",
    type: "document",
    fields: [
      defineField({ name: "name", title: "Dealer name", type: "string" }),
      defineField({ name: "logo", type: "image" }),
      defineField({ name: "description", type: "text" }),
      defineField({ name: "website", type: "url" }),
      defineField({ name: "category", type: "string" }),
      defineField({ name: "active", type: "boolean", initialValue: true }),
      defineField({ name: "featured", type: "boolean", initialValue: false }),
      order(),
    ],
  }),

  defineType({
    name: "homeSectionSettings",
    title: "Home Section Settings",
    type: "document",
    fields: [
      defineField({ name: "section", type: "string" }),
      defineField({ name: "visible", type: "boolean", initialValue: true }),
      defineField({ name: "heading", type: "string" }),
      defineField({ name: "description", type: "text" }),
      order(),
    ],
  }),

  defineType({
    name: "seoSettings",
    title: "SEO Settings",
    type: "document",
    fields: [
      defineField({ name: "pageTitle", type: "string" }),
      defineField({ name: "metaDescription", type: "text" }),
      defineField({ name: "ogImage", type: "image" }),
      defineField({
        name: "keywords",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
      }),
      defineField({ name: "canonicalUrl", type: "url" }),
      defineField({ name: "noIndex", type: "boolean", initialValue: false }),
    ],
  }),

  defineType({
    name: "aboutPage",
    title: "About Page",
    type: "document",
    fields: [
      defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string" }),
      defineField({ name: "heroTitle", title: "Hero Title", type: "string" }),
      defineField({ name: "heroTitleAccent", title: "Hero Title Accent", type: "string" }),
      defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text" }),
      defineField({
        name: "heroBackgroundImage",
        title: "Hero Background Image",
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "alt", type: "string" })],
      }),
      defineField({ name: "storyEyebrow", title: "Story Eyebrow", type: "string" }),
      defineField({ name: "storyHeading", title: "Story Heading", type: "string" }),
      defineField({ name: "storyHeadingAccent", title: "Story Heading Accent", type: "string" }),
      defineField({
        name: "storyParagraphs",
        title: "Story Paragraphs",
        type: "array",
        of: [defineArrayMember({ type: "text" })],
      }),
      defineField({
        name: "storyImage",
        title: "Story Image",
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "alt", type: "string" })],
      }),
      defineField({
        name: "values",
        title: "Values List",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            fields: [
              defineField({ name: "icon", title: "Icon / Symbol", type: "string" }),
              defineField({ name: "title", title: "Title", type: "string" }),
              defineField({ name: "desc", title: "Description", type: "text" }),
            ],
          }),
        ],
      }),
      defineField({
        name: "stats",
        title: "Statistics",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            fields: [
              defineField({ name: "value", title: "Value (e.g. 10+, 250+)", type: "string" }),
              defineField({ name: "label", title: "Label", type: "string" }),
            ],
          }),
        ],
      }),
      defineField({
        name: "mission",
        title: "Mission Section",
        type: "object",
        fields: [
          defineField({ name: "eyebrow", type: "string" }),
          defineField({ name: "heading", type: "string" }),
          defineField({ name: "headingAccent", type: "string" }),
          defineField({ name: "description", type: "text" }),
        ],
      }),
      defineField({
        name: "vision",
        title: "Vision Section",
        type: "object",
        fields: [
          defineField({ name: "eyebrow", type: "string" }),
          defineField({ name: "heading", type: "string" }),
          defineField({ name: "headingAccent", type: "string" }),
          defineField({ name: "description", type: "text" }),
        ],
      }),
      defineField({
        name: "cta",
        title: "Call to Action",
        type: "object",
        fields: [
          defineField({ name: "heading", type: "string" }),
          defineField({ name: "headingAccent", type: "string" }),
          defineField({ name: "subtitle", type: "text" }),
          defineField({ name: "buttonText", type: "string" }),
        ],
      }),
    ],
  }),

  defineType({
    name: "servicesPage",
    title: "Services Page",
    type: "document",
    fields: [
      defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string" }),
      defineField({ name: "heroTitle", title: "Hero Title", type: "string" }),
      defineField({ name: "heroTitleAccent", title: "Hero Title Accent", type: "string" }),
      defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text" }),
      defineField({
        name: "heroBackgroundImage",
        title: "Hero Background Image",
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "alt", type: "string" })],
      }),
      defineField({
        name: "residential",
        title: "Residential Services",
        type: "object",
        fields: [
          defineField({ name: "eyebrow", type: "string" }),
          defineField({ name: "heading", type: "string" }),
          defineField({ name: "headingAccent", type: "string" }),
          defineField({ name: "description", type: "text" }),
          defineField({
            name: "items",
            type: "array",
            of: [
              defineArrayMember({
                type: "object",
                fields: [
                  defineField({ name: "name", type: "string" }),
                  defineField({ name: "desc", type: "text" }),
                  defineField({ name: "icon", type: "string" }),
                ],
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "commercial",
        title: "Commercial Services",
        type: "object",
        fields: [
          defineField({ name: "eyebrow", type: "string" }),
          defineField({ name: "heading", type: "string" }),
          defineField({ name: "headingAccent", type: "string" }),
          defineField({ name: "description", type: "text" }),
          defineField({
            name: "items",
            type: "array",
            of: [
              defineArrayMember({
                type: "object",
                fields: [
                  defineField({ name: "name", type: "string" }),
                  defineField({ name: "desc", type: "text" }),
                  defineField({ name: "icon", type: "string" }),
                ],
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "enterprise",
        title: "Enterprise Services",
        type: "object",
        fields: [
          defineField({ name: "eyebrow", type: "string" }),
          defineField({ name: "heading", type: "string" }),
          defineField({ name: "headingAccent", type: "string" }),
          defineField({ name: "description", type: "text" }),
          defineField({
            name: "items",
            type: "array",
            of: [
              defineArrayMember({
                type: "object",
                fields: [
                  defineField({ name: "name", type: "string" }),
                  defineField({ name: "desc", type: "text" }),
                  defineField({ name: "icon", type: "string" }),
                ],
              }),
            ],
          }),
        ],
      }),
      defineField({
        name: "cta",
        title: "Call to Action",
        type: "object",
        fields: [
          defineField({ name: "heading", type: "string" }),
          defineField({ name: "description", type: "text" }),
          defineField({ name: "buttonText", type: "string" }),
        ],
      }),
    ],
  }),

  defineType({
    name: "galleryProject",
    title: "Gallery Projects",
    type: "document",
    fields: [
      defineField({ name: "name", title: "Project Name", type: "string", validation: (r) => r.required() }),
      defineField({ name: "location", title: "Location", type: "string" }),
      defineField({
        name: "type",
        title: "Project Type",
        type: "string",
        options: { list: ["Residential", "Commercial", "Enterprise", "Healthcare", "Hospitality"] },
      }),
      defineField({
        name: "status",
        title: "Status",
        type: "string",
        options: { list: ["Ongoing", "Completed"] },
        initialValue: "Ongoing",
      }),
      defineField({
        name: "progress",
        title: "Progress (%) - for Ongoing",
        type: "number",
        validation: (r) => r.min(0).max(100),
      }),
      defineField({
        name: "year",
        title: "Completion Year - for Completed",
        type: "string",
      }),
      defineField({
        name: "image",
        title: "Project Image",
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "alt", type: "string" })],
      }),
      order(),
    ],
  }),

  defineType({
    name: "productItem",
    title: "Products & Furniture",
    type: "document",
    fields: [
      defineField({ name: "name", title: "Product Name", type: "string", validation: (r) => r.required() }),
      defineField({ name: "desc", title: "Description", type: "text" }),
      defineField({
        name: "features",
        title: "Key Features / Bullets",
        type: "array",
        of: [defineArrayMember({ type: "string" })],
      }),
      defineField({
        name: "image",
        title: "Product Image",
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "alt", type: "string" })],
      }),
      defineField({ name: "icon", title: "Icon / Emoji", type: "string" }),
      order(),
    ],
  }),

  defineType({
    name: "contactPage",
    title: "Contact Page",
    type: "document",
    fields: [
      defineField({ name: "heroEyebrow", title: "Hero Eyebrow", type: "string" }),
      defineField({ name: "heroTitle", title: "Hero Title", type: "string" }),
      defineField({ name: "heroTitleAccent", title: "Hero Title Accent", type: "string" }),
      defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text" }),
      defineField({ name: "heading", title: "Section Heading", type: "string" }),
      defineField({ name: "headingAccent", title: "Section Heading Accent", type: "string" }),
      defineField({ name: "description", title: "Description", type: "text" }),
      defineField({ name: "phone", title: "Phone", type: "string" }),
      defineField({ name: "whatsapp", title: "WhatsApp Number", type: "string" }),
      defineField({ name: "email", title: "Email Address", type: "string" }),
      defineField({ name: "address", title: "Physical Address", type: "text" }),
      defineField({ name: "workingHours", title: "Working Hours", type: "string" }),
      defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
      defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
      defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    ],
  }),
];
