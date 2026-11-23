# Plan: Olga Tislina website redesign

Rebuilding Olga's Squarespace store (I.F. Love Art) as a fast, Apple-style React site.
Clean, spacious, smooth, with the paintings and Olga's story up front.

## Decisions
- **Stack:** React + Vite, `react-router-dom` for pages, `motion` for animation. Hosted on Vercel.
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
- [x] About, Framing & mounting, Contact (validation, Formspree-ready), 404 page
- [x] Checked at desktop (1440px) and phone (390px) sizes; reduced-motion setting respected
- [x] `vercel.json` so page links work when deployed
- [x] Accessibility pass: text contrast (all pass AA), labels, alt text, one h1 per page, 44px nav targets,
      screen-reader text for the animated quote, keyboard-visible links for the featured showcase
- [x] Removed copy that stated unconfirmed facts (signing, reply times, etc.)
- [x] Clean transparent PNG logo (+ favicon, Apple touch icon)
- [x] Artsier look: Fraunces headline font; color system drawn from her paintings (each painting has its own color
      for card tints, page tints, and the featured-gallery glow); colored hero headline and paint washes;
      bold collaborate section; palette strip in the footer. Contrast re-checked (all AA).

## Waiting on Olga
- [ ] **Stripe:** create a Payment Link for each painting she wants to sell online, then paste each link into `stripeLink`
- [ ] **Contact form:** create a free form at formspree.io and put its ID in a `.env` file as `VITE_FORMSPREE_ID=xxxx`
      (and in Vercel's environment variables). Until then the form tells visitors to message her on Instagram.
- [ ] **Framing page:** confirm the frame and mounting options. The old text may have been Squarespace template copy.
- [ ] **Look & feel:** does Olga like the font (Fraunces) and the amount of color? Both are easy to adjust.
- [ ] **Featured works:** confirm the 5 paintings in `featuredSlugs` (`src/data/site.js`)
- [ ] **Prints:** confirm print prices/sizes for drawings and for sold paintings with prints (Wild Flowers, Sunflowers)
- [ ] **Commissions:** confirm she takes commissions (the home page and contact form mention them)
- [ ] **Domain:** choose the web address, and when to switch off Squarespace. Nothing on Squarespace has been changed.

## Next
- [ ] Deploy a Vercel preview link to share with Olga (only after the user approves)
- [ ] Design critique pass after Olga's feedback; test with VoiceOver on a real iPhone
- [ ] Optional: email address in the footer, a newsletter, or a "Recently sold" section
