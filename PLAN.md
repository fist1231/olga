# Plan: Olga Tislina website redesign

Rebuilding Olga's Squarespace store (I.F. Love Art) as a fast, Apple-style React site.
Clean, spacious, smooth, with the paintings and Olga's story up front.

## Decisions
- **Stack:** React + Vite, `react-router-dom` for pages, `motion` for animation. Hosted on Hostinger (web hosting plan, static files).
- **Checkout:** Stripe Payment Links, one per painting (`stripeLink` in `src/data/paintings.js`).
  Until a link is added, the button says "Inquire to buy" and opens the contact form with the painting pre-filled.
- **Home:** Olga's story first, then a scrolling "Featured works" gallery, then the collections.
- **Branding:** the gold heart logo stays, shown small in the menu bar next to "Olga Tislina".
- **Pages:** Home, Shop, Painting detail, About, Framing & mounting, Contact. The empty News page was dropped.

## Done
- [x] Branch `redesign`, Vite + React project set up
- [x] Migrated all 50 works (titles, prices, sizes, categories, sold status) and images from Squarespace
- [x] Converted images to WebP (`public/images/paintings/`, full size + `-sm` thumbnail)
- [x] Design system: colors, type scale, spacing in `src/styles/global.css`
- [x] Nav: blurred sticky bar that turns dark over dark sections; full-screen mobile menu
- [x] Home: hero with line-by-line headline + portrait parallax, story quote (static, no animation by request),
      sticky "Featured works" showcase, collection tiles, collaborate banner
- [x] Shop: category filter with sliding pill + animated re-flow, sold badges, link-shareable filters (`/shop?category=Watercolor`)
- [x] Painting page: large view, extra photos, full-screen zoom, Buy/Inquire button, "More" suggestions
- [x] About, Framing & mounting, Contact (validation, opens the visitor's email app), 404 page
- [x] Checked at desktop (1440px) and phone (390px) sizes; reduced-motion setting respected
- [x] `.htaccess` (generated at build) so page links, 404s, and redirects work on Hostinger
- [x] Accessibility pass: text contrast (all pass AA), labels, alt text, one h1 per page, 44px nav targets,
      screen-reader text for the animated quote, keyboard-visible links for the featured showcase
- [x] Removed copy that stated unconfirmed facts (signing, reply times, etc.)
- [x] Clean transparent PNG logo (+ favicon, Apple touch icon)
- [x] Artsier look: Fraunces headline font; color system drawn from her paintings (each painting has its own color
      for card tints, page tints, and the featured-gallery glow); colored hero headline and paint washes;
      bold collaborate section; palette strip in the footer. Contrast re-checked (all AA).

- [x] SEO: every page is pre-built as real HTML at build time (`scripts/prerender.mjs`), with its own title,
      description, canonical link, link-preview (Open Graph) tags, and Google structured data (`src/seo.js`).
      `sitemap.xml` + `robots.txt` generated; unknown URLs return a real 404; old Squarespace URLs redirect.

## Waiting on Olga
- [ ] **Stripe:** create a Payment Link for each painting she wants to sell online, then paste each link into `stripeLink`
- [x] **Contact form:** opens the visitor's email app (a `mailto:` link) with a message to olga_tislina@yahoo.com,
      ready to send. No outside service. Fallbacks: "Use Gmail instead" link and a copyable address.
- [ ] **Framing page:** confirm the frame and mounting options. The old text may have been Squarespace template copy.
      Once confirmed, the framing page's search description in `src/seo.js` can name the options.
- [ ] **Look & feel:** does Olga like the font (Fraunces) and the amount of color? Both are easy to adjust.
- [ ] **Featured works:** confirm the 5 paintings in `featuredSlugs` (`src/data/site.js`)
- [ ] **Prints:** confirm print prices/sizes for drawings and for sold paintings with prints (Wild Flowers, Sunflowers)
- [ ] **Commissions:** confirm she takes commissions (the home page and contact form mention them)
- [ ] **Domain:** choose the web address, and when to switch off Squarespace. Nothing on Squarespace has been changed.

## Publishing on Hostinger
1. The address is set in `vite.config.js` (`SITE_URL = 'https://olgas-art.com'`). Change it there if the domain changes.
2. Run `npm run package`. It builds the site and creates `olga-site.zip`.
3. In Hostinger hPanel → Websites → Manage → File Manager, open `public_html`, upload `olga-site.zip`,
   right-click it → Extract (into `public_html`), then delete the zip. Remove Hostinger's default `default.php`
   or old `index.php` if present. The extracted files include a hidden `.htaccess`: it must end up in `public_html`.
4. In hPanel → Security → SSL, make sure the free SSL certificate is installed (the site redirects to https).
5. Check: `/shop/favorite-cafe` opens a painting, `/shop/` redirects to `/shop`, a made-up address shows the
   "This page isn't here" page, and `/sitemap.xml` lists the real address.
To update the site later: repeat steps 2–3 (extracting over the old files). Delete `public_html/assets` first,
so old build files don't pile up.

## SEO launch checklist (after the first upload)
- [ ] Add the site to Google Search Console, verify the domain, and submit `/sitemap.xml`.
- [ ] Check a painting page in Google's Rich Results Test. Expect warnings about missing shipping/returns info:
      add those only once Olga confirms her policies.
- [ ] Once the domain points to Hostinger, spot-check that old Squarespace links redirect (e.g. `/shop/p/favorite-cafe`).
      The redirects are in `scripts/prerender.mjs` and assume the painting slugs didn't change.

## Next
- [ ] Publish on Hostinger to share with Olga (only after the user approves); see "Publishing on Hostinger"
- [ ] Design critique pass after Olga's feedback; test with VoiceOver on a real iPhone
- [ ] Optional: email address in the footer, a newsletter, or a "Recently sold" section
