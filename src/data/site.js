import { paintings } from "./paintings.js";

export const site = {
  artist: "Olga Tislina",
  brand: "I.F. Love Art",
  instagram: "https://www.instagram.com/olgatislina_art/",
  instagramHandle: "@olgatislina_art",
  // Contact form messages are emailed here through FormSubmit (formsubmit.co, free, no account).
  // The first message sends Olga an "Activate Form" email; nothing is delivered until she clicks it.
  // After activating, FormSubmit gives a random alias: put it in the .env file as VITE_FORMSUBMIT_KEY=... and rebuild
  // so the email address no longer appears in the site's code.
  contactEmail: "olga_tislina@yahoo.com",
  formKey: import.meta.env.VITE_FORMSUBMIT_KEY || "olga_tislina@yahoo.com",
};

// Olga's own words from her About page, kept as written.
export const bio =
  "I have always been passionate about the arts. While choosing a career in performing arts, I also loved expressing myself through visual arts, especially drawing and painting. I enjoy taking painting classes at The Arts of Great Falls Art School, VA, and the Woodstock School of Art, NY. I often participate in workshops offered by renowned artists. My main inspiration has always been nature and traveling.";

export const schools = [
  { name: "The Arts of Great Falls Art School", place: "Great Falls, Virginia" },
  { name: "Woodstock School of Art", place: "Woodstock, New York" },
];

// Each category also gets its own page (/collections/<slug>) so people searching for, say,
// "watercolor paintings for sale" can land on it. heading/seoTitle/description/intro are the words on that page.
export const categories = [
  {
    name: "Paintings", slug: "oil-paintings", dot: "#c23a6e",
    blurb: "Oil paintings of flowers, still life, and places she has traveled.",
    heading: "Oil paintings",
    seoTitle: "Original oil paintings for sale",
    description: "Original oil paintings by Olga Tislina: flowers, still life, and the places she has traveled. Browse the collection and inquire to buy.",
    intro: "Oil paintings of flowers, still life, and the places Olga has traveled, from rose gardens on Crete to a street corner in Riga.",
  },
  {
    name: "Abstract", slug: "abstract-paintings", dot: "#8a73c6",
    blurb: "Acrylic explorations in color and texture.",
    heading: "Abstract paintings",
    seoTitle: "Original abstract paintings for sale",
    description: "Original abstract acrylic paintings by Olga Tislina: explorations in color and texture. Browse the collection and inquire to buy.",
    intro: "Acrylic explorations in color and texture.",
  },
  {
    name: "Watercolor", slug: "watercolor-paintings", dot: "#4f7fc4",
    blurb: "Snowy villages, quiet seasides, and city streets.",
    heading: "Watercolor paintings",
    seoTitle: "Original watercolor paintings for sale",
    description: "Original watercolor paintings by Olga Tislina: snowy villages, quiet seasides, and city streets. Browse the collection and inquire to buy.",
    intro: "Snowy villages, quiet seasides, and city streets, painted in watercolor.",
  },
  {
    name: "Drawings", slug: "charcoal-drawings", dot: "#6e6e73",
    blurb: "Charcoal sketches, available as limited prints.",
    heading: "Charcoal drawings and prints",
    seoTitle: "Charcoal drawings and limited prints",
    description: "Charcoal drawings by Olga Tislina, available as limited prints: travel sketches and portraits of pets. Browse and inquire to buy.",
    intro: "Charcoal sketches, available as limited prints.",
  },
];

export const collectionPath = (c) => `/collections/${c.slug}`;
export const collectionBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
export const categoryByName = Object.fromEntries(categories.map((c) => [c.name, c]));

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
