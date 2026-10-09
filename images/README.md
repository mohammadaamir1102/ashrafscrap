# /images — photo drop folder

Add your real photos here using these exact filenames (the site already references them).
Until a photo exists, the gallery shows a tasteful gradient fallback, so nothing looks broken.

## Required / suggested files

| Filename | Size / ratio | What to shoot |
|----------|--------------|----------------|
| `og-cover.jpg` | 1200×630 | Branded cover for WhatsApp / Facebook / X shares. Yard + logo + "Best Rates in Nashik". |
| `gallery-1.jpg` | ~800×600 (landscape) | HMS 1 & 2 heavy melting scrap stacked in the yard. |
| `gallery-2.jpg` | ~800×1000 (portrait) | Certified digital scale weighing a load. |
| `gallery-3.jpg` | ~800×600 | Truck being loaded with scrap for a pickup. |
| `gallery-4.jpg` | ~800×600 | Stainless steel 304/316 sorted by grade. |
| `gallery-5.jpg` | ~800×1000 | Cast iron machine parts / old machinery. |
| `gallery-6.jpg` | ~800×600 | Structural beams, channels and pipes. |

## PWA / favicon icons

| Filename | Size | Notes |
|----------|------|-------|
| `icon-192.png` | 192×192 | Android home-screen icon. |
| `icon-512.png` | 512×512 | Splash / store icon. |
| `icon-maskable-512.png` | 512×512 | Maskable (keep logo inside the middle 80%). |
| `favicon.png` | 32×32 | Optional — an inline SVG favicon is already in `index.html`. |

## Tips

- Compress JPGs (target < 200 KB each) with [squoosh.app](https://squoosh.app) or TinyPNG.
- Keep the same aspect ratios listed above so the masonry gallery stays tidy.
- After adding/renaming files, update the `GALLERY` array near the top of `script.js`.
- Write descriptive `alt` text — it helps SEO ("kabadi Nashik", "MS scrap buyer Nashik") and accessibility.
