# MA Steel — website

A production-ready, fully static marketing site for a steel scrap (*kabad / bhangar*) business in Nashik.
Pure **HTML5 + CSS3 + vanilla JavaScript** — no frameworks, no build step, no backend. Made for **GitHub Pages**.

> **Sahi Tol. Sahi Daam. Turant Payment.**

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | The whole site (16 sections, SEO meta, JSON-LD, i18n hooks) |
| `style.css` | Design system + all components + responsive + reduced-motion |
| `script.js` | **CONFIG**, data arrays, WhatsApp wiring, i18n, estimator, animations |
| `404.html` | Friendly not-found page |
| `robots.txt` | Crawl rules + sitemap pointer |
| `sitemap.xml` | Single-page sitemap |
| `manifest.webmanifest` | PWA-lite install metadata |
| `images/` | Put your real photos here (see `images/README.md`) |

---

## 1. What to replace (go-live checklist)

Everything lives in **one place**: the `CONFIG` object at the top of `script.js`.

- [ ] **Phone number** — `CONFIG.phone` (`917718012713`, no `+`, no spaces) and `CONFIG.phoneDisplay` (`+91 77180 12713`). *(Already set to MA Steel's number.)*
- [ ] **WhatsApp default message** — `CONFIG.waMessage` / `CONFIG.waMessageHi`.
- [ ] **Owner, business, tagline, email, address, timings** — `CONFIG.*`.
- [ ] **Stats** — `CONFIG.stats` (years / tons / clients / areas) and the `data-count` fallbacks in `index.html`.
- [ ] **Founded year** — `CONFIG.founded` + the "since 2014" strings in HTML.
- [ ] **Google Maps embed** — replace the iframe `src` in `index.html` (and `CONFIG.mapEmbed`) with your real embed URL.
- [ ] **Rates** — the `RATES` array in `script.js` (also fills ticker, table + selectors).
- [ ] **Service areas** — `CONFIG.areas`.
- [ ] **Testimonials** — replace the 3 sample reviews in `index.html` (marked with a code comment).
- [ ] **Photos** — add to `images/` (see below) and edit the `GALLERY` array + `GALLERY` alt text.
- [x] **Domain** — set to `https://mohammadaamir1102.github.io/ashrafscrap/` in `index.html` (canonical, OG, JSON-LD), `robots.txt`, `sitemap.xml`. Change if you rename the repo.
- [ ] **Languages** — the toggle cycles **EN → हिंदी → मराठी**. Translations live in the `I18N` object in `script.js`.
- [ ] **OG cover image** — `images/og-cover.jpg` (1200×630).
- [ ] **PWA icons** — `images/icon-192.png`, `images/icon-512.png`, `images/icon-maskable-512.png`.
- [ ] **Hardcoded WhatsApp fallback hrefs** — index.html has valid no-JS `wa.me/917718012713` links; update them if you change the number (JS overrides them once loaded).

> The site keeps working fully (readable, clickable) even if JavaScript fails — the static content and hardcoded `wa.me` / `tel:` links are the fallback.

---

## 2. Photos to add to `/images`

| Filename | Suggested shot | Used for |
|----------|----------------|----------|
| `og-cover.jpg` | 1200×630 branded cover | Social share |
| `gallery-1.jpg` | HMS 1 & 2 scrap stacked in the yard | Gallery |
| `gallery-2.jpg` | Digital weighing scale in use | Gallery |
| `gallery-3.jpg` | Truck loading / pickup | Gallery |
| `gallery-4.jpg` | SS 304/316 sorted by grade | Gallery |
| `gallery-5.jpg` | Cast iron parts / machinery | Gallery |
| `gallery-6.jpg` | Structural beams & pipes | Gallery |
| `icon-192.png` | App icon 192×192 | Manifest |
| `icon-512.png` | App icon 512×512 | Manifest |
| `icon-maskable-512.png` | Maskable icon 512×512 | Manifest |
| `favicon.png` *(optional)* | 32×32 | Browser tab (inline SVG is used by default) |

If a gallery photo is missing, the card shows a graceful gradient fallback (no broken-image icon).

---

## 3. Deploy to GitHub Pages (step by step)

1. **Create a repo** on GitHub — e.g. `ashraf-steel-scrap` (public).
2. **Upload files** — easiest way: on the repo page click **Add file → Upload files**, drag in `index.html`, `style.css`, `script.js`, `404.html`, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `README.md` and the `images/` folder. Commit.
   *(Or via terminal: `git init && git add . && git commit -m "Initial site" && git branch -M main && git remote add origin https://github.com/USERNAME/REPO.git && git push -u origin main`.)*
3. Go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Set **Branch = `main`** and **Folder = `/ (root)`**. Save.
6. Wait ~1 minute. Your live URL appears at the top:
   `https://USERNAME.github.io/REPO/`
7. Update the domain in `index.html`, `robots.txt` and `sitemap.xml` to match, then commit.
8. *(Optional)* **Custom domain**: add your domain under Settings → Pages → Custom domain and create a `CNAME` record with your registrar.

**Tip:** all paths are **relative**, so the site works in a repo subfolder (`/repo/`) with no changes.

---

## 4. Five quick manual tests (responsiveness + WhatsApp)

1. **Phone — Chrome/Safari DevTools at 375 px & 320 px:** no horizontal scroll; bottom sticky bar shows WhatsApp + Call with safe-area padding; the hamburger opens a full-screen menu.
2. **WhatsApp links:** tap the header button, hero button, a scrap card, the floating button and a footer number — each must open `wa.me` with the correct prefilled message (scrap cards name the scrap type).
3. **Estimator:** choose SS 304, enter `2` tons, tap *Estimate value*, then *Confirm price on WhatsApp* — the WhatsApp message should contain the type, weight and estimate. Empty submit should show a prompt, not crash.
4. **Language + theme:** site opens **light** by default; toggling cycles **EN → हिंदी → मराठी → EN** and theme toggles light/dark; both choices persist after reload. Static WhatsApp buttons follow the active language.
5. **Desktop (1280 px+):** hover cards for tilt + spotlight, magnetic buttons, cursor glow, scroll progress bar. Keyboard-test the FAQ and the gallery lightbox (`Tab`, `Enter`, `←/→`, `Esc`).

---

## Notes

- Fonts (Sora + Inter + Noto Sans Devanagari for Hindi/Marathi) and the Google Maps iframe are the only external resources.
- Default theme is **light**; the toggle persists in `localStorage`.
- Languages: **English / हिंदी / मराठी** via the navbar toggle.
- `images/` ships with branded **placeholder** graphics — replace with real photos (same filenames) any time.
- No backend: there is no enquiry form by design (a static WhatsApp-first site). Visitors use the WhatsApp / Call buttons.
- Accessibility: skip link, ARIA labels, focus-visible rings, WCAG-AA contrast in both themes, full keyboard support.
- Performance: inline critical hero CSS, `defer` script, lazy images with `width`/`height`, canvas particles pause off-screen, and every animation respects `prefers-reduced-motion`.

Made with care in Nashik · Built by [Mohammad Aamir](https://www.linkedin.com/in/mohammad-aamir-026b87230/).
