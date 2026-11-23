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
- Colors (from `src/styles/global.css`): white `#ffffff`, mist `#f5f5f7`, ink `#1d1d1f`, graphite `#6e6e73`,
  gold `#8a6a2c` (accent text, sparingly), gold-light `#d9b45f` (accent on black), black `#000000` (showcase only).
- One font family: the system stack (SF Pro on Apple devices). Big, tight, bold headlines; no all-caps labels.
- Spacing uses the 8px scale variables (`--s1`…`--s16`). Max content width `--page` (1120px).
- One primary button (`.btn-primary`) per view. Buttons say what happens ("Inquire to buy", "Send message").
- Paintings are never cropped: show them whole (`object-fit: contain`) inside an absolutely positioned "mat"
  so tall and wide works both fit.
- Sections that are dark must have `data-nav-dark` so the menu bar switches to its dark style.

## Motion rules
- Wrap is `<MotionConfig reducedMotion="user">`. Scroll-linked effects (`useScroll` / `useTransform`) are NOT
  covered by that, so check `useReducedMotion()` and turn them off by hand.
- Keep motion to a few deliberate moments: hero load, story reveal, featured showcase, filter, zoom. No fade-in on every section.

## Before calling something done
- Look at it in the browser at 1440px and 390px wide.
- Keyboard: everything reachable with Tab, visible focus ring.
- Images: meaningful `alt` text for paintings (the title); `alt=""` for decorative images.
