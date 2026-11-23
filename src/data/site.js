import { paintings } from "./paintings.js";

export const site = {
  artist: "Olga Tislina",
  brand: "I.F. Love Art",
  instagram: "https://www.instagram.com/olgatislina_art/",
  instagramHandle: "@olgatislina_art",
  // Free form backend: create a form at formspree.io and put its ID in .env as VITE_FORMSPREE_ID
  formspreeId: import.meta.env.VITE_FORMSPREE_ID || "",
};

// Olga's own words from her About page, kept as written.
export const bio =
  "I have always been passionate about the arts. While choosing a career in performing arts, I also loved expressing myself through visual arts, especially drawing and painting. I enjoy taking painting classes at The Arts of Great Falls Art School, VA, and the Woodstock School of Art, NY. I often participate in workshops offered by renowned artists. My main inspiration has always been nature and traveling.";

export const schools = [
  { name: "The Arts of Great Falls Art School", place: "Great Falls, Virginia" },
  { name: "Woodstock School of Art", place: "Woodstock, New York" },
];

export const categories = [
  { name: "Paintings", blurb: "Oil paintings of flowers, still life, and places she has traveled." },
  { name: "Abstract", blurb: "Acrylic explorations in color and texture." },
  { name: "Watercolor", blurb: "Snowy villages, quiet seasides, and city streets." },
  { name: "Drawings", blurb: "Charcoal sketches, available as limited prints." },
];

// The paintings shown in the big scrolling showcase on the home page.
// Swap slugs here to change which works are featured.
export const featuredSlugs = [
  "rose-garden-crete",
  "favorite-cafe",
  "abbaye-de-lerins-monastery",
  "riga",
  "yellow-roses-in-a-glass-vase",
];

export const bySlug = Object.fromEntries(paintings.map((p) => [p.slug, p]));
export const featured = featuredSlugs.map((s) => bySlug[s]).filter(Boolean);

export function formatPrice(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);
}

export function coverFor(category) {
  const preferred = {
    Paintings: "white-roses",
    Abstract: "bubbles",
    Watercolor: "it-snowed",
    Drawings: "a-child-and-a-sea-sketch-crete-limited-print",
  }[category];
  return bySlug[preferred] || paintings.find((p) => p.category === category);
}

export { paintings };
