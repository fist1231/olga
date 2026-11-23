# Olga Tislina — I.F. Love Art

Website for painter Olga Tislina: original oil paintings, abstracts, watercolors, and limited prints.

## Run it on your computer
```
npm install      # first time only: downloads the libraries
npm run dev      # starts the site at http://localhost:5173
```
Press `Ctrl + C` in the terminal to stop it.

## Useful commands
| Command | What it does |
|---|---|
| `npm run build` | Makes the final, optimized site in `dist/` |
| `npm run preview` | Shows that built site locally |
| `npx oxlint src` | Checks the code for common mistakes |

## Where things are
- `src/data/paintings.js`: every painting (title, price, size, status, images, Stripe link)
- `src/data/site.js`: bio, categories, featured paintings, Instagram link
- `src/pages/`: one file per page
- `src/components/`: shared pieces (menu bar, footer, painting card, zoom view…)
- `public/images/`: logo, portrait, and painting images

## Settings
Create a file named `.env` (it is not uploaded to GitHub) to connect the contact form:
```
VITE_FORMSPREE_ID=your-form-id
```

See `PLAN.md` for what's done and what's next.
