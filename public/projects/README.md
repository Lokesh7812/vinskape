# Project Photos

Each project has its own subfolder named by slug. To add real photos:

1. Create a folder: `/public/projects/<project-slug>/`
2. Add your images (JPG, PNG, or WebP)
3. Update the `photos` array in `src/data/projects.ts`
4. For completed projects, also set `beforeImage` and `afterImage`

Example:
```
/public/projects/modern-villa-interiors/
  cover.jpg
  photo-01.jpg
  photo-02.jpg
  before.jpg
  after.jpg
```

If a completed project has no `beforeImage`, the card will show only the after image instead of a before/after slider. The page will not crash.
