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
    fields: [
      defineField({ name: "name", type: "string" }),
      defineField({ name: "slug", type: "slug", options: { source: "name" } }),
      defineField({ name: "description", type: "text" }),
      defineField({
        name: "coverImage",
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "alt", type: "string" })],
      }),
      defineField({ name: "active", type: "boolean", initialValue: true }),
      order(),
    ],
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
];
