# Olga Tislina website: project rules

Apple-inspired portfolio + shop for painter Olga Tislina ("I.F. Love Art"). The paintings are the color;
the interface stays quiet. See PLAN.md for status and open questions.

## Working with the user
- The user is a student newer to git and the terminal: explain steps plainly.
- Work on the `redesign` branch. Commit in small steps; don't push or deploy without asking.

## Stack
- React 19 + Vite, plain CSS files next to each component, `react-router-dom`, `motion` (`motion/react`).
- Run: `npm run dev` (http://localhost:5173). Check: `npx oxlint src` and `npm run build`.
- Content lives in `src/data/`: `paintings.js` (all works) and `site.js` (bio, categories, featured list, helpers).
  Change content there, not inside components.

## Design rules
The art supplies the color: the interface is clean and quiet, and color comes from Olga's paintings.
- **Fonts:** headlines use Fraunces (`--font-display`, self-hosted via `@fontsource-variable/fraunces`,
  "SOFT" 100; h1 also "WONK" 1). Italic Fraunces for small artsy accents (nav name, hero name, story quote).
  Body text stays in the system sans (`--font`). No all-caps labels.
- **Base colors** (`src/styles/global.css`): white, mist `#f5f5f7`, ink `#1d1d1f` (all body text), graphite `#6e6e73`.
- **Painting palette:** rose `#c23a6e`, cobalt `#34539c`, violet `#6a4fb3`, teal `#23707a`, vermilion `#c4511f`
  (all readable on white), saffron `#f0b73f` (surfaces/dark backgrounds only, never text on white).
  `--accent` `#a52a5c` for links on white; `--accent-on-dark` saffron on dark.
- **Per-painting color:** each painting in `paintings.js` has `color`. Pass it as `style={{ "--art": p.color }}` and
  derive tints with `color-mix(in oklab, var(--art) N%, white)`. Keep tints light (≈12–30%).
  Category colors live in `categories[].dot` in `site.js`.
- Text on colored tiles uses `#48484d` or darker (graphite fails contrast on tints). Re-check contrast after color changes.
- Spacing uses the 8px scale variables (`--s1`…`--s16`). Max content width `--page` (1120px).
- One primary button (`.btn-primary`) per view. Buttons say what happens ("Inquire to buy", "Send message").
- Paintings are never cropped: show them whole (`object-fit: contain`) inside an absolutely positioned "mat".
- Dark or strongly colored sections need `data-nav-dark` so the menu bar switches to its dark style.
- Logo: `public/images/logo.png` (transparent). Don't reintroduce white-box workarounds.
- Don't state facts about Olga's business (signing, shipping, reply times) unless she confirmed them.

## Motion rules
- Wrap is `<MotionConfig reducedMotion="user">`. Scroll-linked effects (`useScroll` / `useTransform`) are NOT
  covered by that, so check `useReducedMotion()` and turn them off by hand.
- Keep motion to a few deliberate moments: hero load + paint washes, story reveal, featured showcase (color glow
  crossfades per painting), filter, zoom. No fade-in on every section.
- Animate only `transform` and `opacity` for continuous/scroll effects (no animated blur), and turn CSS keyframe
  animations off in `@media (prefers-reduced-motion: reduce)`.

## Before calling something done
- Look at it in the browser at 1440px and 390px wide.
- Keyboard: everything reachable with Tab, visible focus ring.
- Images: meaningful `alt` text for paintings (the title); `alt=""` for decorative images.
