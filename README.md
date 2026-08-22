# Vinskape home-page demo

This is a polished Next.js home-page prototype with a real Sanity schema and GROQ data layer. It shows curated demo content while Sanity credentials are not configured, so it runs immediately without pretending a CMS connection exists.

## Run it

1. Copy `.env.local.example` to `.env.local` and add your Sanity project ID and dataset.
2. Run `npm install` then `npm run dev`.
3. Run `npm run studio` in another terminal to open Sanity Studio.

## Content model

The Studio includes site settings, fully hierarchical navigation, hero slides, intro, services, projects, portfolio categories, testimonials, dealers, home-section controls, and SEO. The home route fetches its content through GROQ when the project environment is configured, otherwise it gracefully uses the included demo dataset.

For deployment, replace the demo content with documents in the Studio. Image fields have hotspot support and accessible alt text fields.

## Import the included demo content

Create an **Editor** API token in Sanity Manage → API → Tokens, then add `SANITY_WRITE_TOKEN=` to `.env.local` locally. Run `npm install` after pulling these files, then run `npm run seed:sanity`. This imports the content and demo images while preserving manually created Hero Slides with matching internal names.
