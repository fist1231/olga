// Search engine and link-preview info for every page: titles, descriptions, preview images,
// and structured data (JSON-LD) that tells Google what each page is about.
// Used in two places: the build step that writes one HTML file per page (scripts/prerender.mjs),
// and the browser, which swaps these tags when a visitor moves between pages (see App.jsx).
import { bio, bySlug, categories, formatPrice, paintings, site } from "./data/site.js";

// The site's public web address, with no trailing slash. Set it in vite.config.js; Vite fills it in at build time.
export const SITE_URL = import.meta.env.VITE_SITE_URL;

const DEFAULT_IMAGE = bySlug["rose-garden-crete"].images[0];
const PORTRAIT = { src: "/images/portrait.webp", width: 1168, height: 1544 };

// Every page that exists. The build writes an HTML file for each, and they make up sitemap.xml.
export const staticPaths = ["/", "/shop", "/about", "/framing", "/contact"];
export const paintingPaths = paintings.map((p) => `/shop/${p.slug}`);
export const allPaths = [...staticPaths, ...paintingPaths];

const abs = (path) => `${SITE_URL}${path === "/" ? "" : path}`;
const artistId = `${SITE_URL}/#artist`;

const person = {
  "@type": "Person",
  "@id": artistId,
  name: site.artist,
  url: abs("/about"),
  image: abs(PORTRAIT.src),
  jobTitle: "Painter",
  description: bio,
  sameAs: [site.instagram],
};

const crumbs = (items) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: abs(path),
  })),
});

const kinds = { Paintings: "Original painting", Abstract: "Abstract painting", Watercolor: "Watercolor", Drawings: "Drawing" };
const kindOf = (p) => (p.status === "print" ? "Limited print" : kinds[p.category] || "Artwork");

function paintingDescription(p) {
  const price = p.status === "sold" ? "Sold" : formatPrice(p.price);
  return `${p.title} by ${site.artist}. ${p.details.replace(/\.+$/, "")}. ${kindOf(p)}, ${price}.`;
}

function paintingSchema(p, url) {
  const availability = p.status === "sold" ? "https://schema.org/SoldOut" : "https://schema.org/InStock";
  return {
    "@type": ["Product", "VisualArtwork"],
    "@id": `${url}#artwork`,
    name: p.title,
    description: paintingDescription(p),
    image: p.images.map((im) => abs(im.src)),
    url,
    sku: p.slug,
    category: p.category,
    brand: { "@type": "Brand", name: site.brand },
    creator: { "@id": artistId },
    artform: p.category === "Drawings" ? "Drawing" : "Painting",
    offers: {
      "@type": "Offer",
      url,
      price: p.price.toFixed(2),
      priceCurrency: "USD",
      availability,
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

const pages = {
  "/": {
    title: `${site.artist}, painter | Original paintings inspired by nature and travel`,
    description:
      "Original oil paintings, abstracts, watercolors, and limited prints by Olga Tislina, inspired by nature and travel. Browse the collection and inquire to buy.",
    schema: [
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: site.artist, alternateName: site.brand, url: abs("/") },
      person,
    ],
  },
  "/shop": {
    title: `Shop original paintings and prints | ${site.artist}`,
    description: `Browse ${paintings.length} works by Olga Tislina: ${categories
      .map((c) => c.name.toLowerCase())
      .join(", ")}. Original paintings and limited prints.`,
    schema: [
      {
        "@type": "CollectionPage",
        name: "Shop",
        url: abs("/shop"),
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: paintings.length,
          itemListElement: paintings.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: abs(`/shop/${p.slug}`),
            name: p.title,
          })),
        },
      },
      crumbs([["Home", "/"], ["Shop", "/shop"]]),
    ],
  },
  "/about": {
    title: `About Olga Tislina, painter`,
    description:
      "Olga Tislina paints flowers, still life, and the places she travels. She takes painting classes at The Arts of Great Falls Art School, VA, and the Woodstock School of Art, NY.",
    image: PORTRAIT,
    imageAlt: "Olga Tislina in a straw hat, photographed in black and white",
    schema: [{ "@type": "ProfilePage", url: abs("/about"), mainEntity: person }, crumbs([["Home", "/"], ["About", "/about"]])],
  },
  "/framing": {
    title: `Framing and mounting options | ${site.artist}`,
    description: "How Olga Tislina's paintings and prints can be framed and mounted. Ask Olga which option suits your piece.",
    schema: [crumbs([["Home", "/"], ["Framing & mounting", "/framing"]])],
  },
  "/contact": {
    title: `Contact Olga Tislina`,
    description: "Questions about a painting, a commission, or a collaboration? Send Olga Tislina a message.",
    schema: [{ "@type": "ContactPage", url: abs("/contact") }, crumbs([["Home", "/"], ["Contact", "/contact"]])],
  },
};

const notFound = {
  title: `Page not found | ${site.artist}`,
  description: "This page isn't here. Browse Olga Tislina's paintings in the shop.",
  noindex: true,
};

// Returns everything that belongs in <head> for one URL path.
export function metaFor(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  let page = pages[path];
  const match = path.match(/^\/shop\/([^/]+)$/);
  if (!page && match && bySlug[match[1]]) {
    const p = bySlug[match[1]];
    const url = abs(path);
    page = {
      title: `${p.title} by ${site.artist} | ${kindOf(p)}`,
      description: paintingDescription(p),
      image: p.images[0],
      imageAlt: `${p.title}, a work by ${site.artist}`,
      type: "product",
      schema: [
        paintingSchema(p, url),
        crumbs([["Home", "/"], ["Shop", "/shop"], [p.title, path]]),
      ],
    };
  }
  if (!page) return { ...notFound, path, canonical: null, tags: tagsFor({ ...notFound }, null) };
  const canonical = abs(path);
  return { ...page, path, canonical, tags: tagsFor(page, canonical) };
}

// A flat list of tags: [tagName, attributes] or ["script", attributes, text].
function tagsFor(page, canonical) {
  const image = page.image || DEFAULT_IMAGE;
  const tags = [
    ["meta", { name: "description", content: page.description }],
    ["meta", { property: "og:site_name", content: site.artist }],
    ["meta", { property: "og:locale", content: "en_US" }],
    ["meta", { property: "og:type", content: page.type === "product" ? "product" : "website" }],
    ["meta", { property: "og:title", content: page.title }],
    ["meta", { property: "og:description", content: page.description }],
    ["meta", { property: "og:image", content: abs(image.src) }],
    ["meta", { property: "og:image:width", content: String(image.width) }],
    ["meta", { property: "og:image:height", content: String(image.height) }],
    ["meta", { property: "og:image:alt", content: page.imageAlt || `A painting by ${site.artist}` }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
  ];
  if (page.noindex) tags.push(["meta", { name: "robots", content: "noindex" }]);
  if (canonical) {
    tags.push(["link", { rel: "canonical", href: canonical }]);
    tags.push(["meta", { property: "og:url", content: canonical }]);
  }
  if (page.schema) {
    const json = JSON.stringify({ "@context": "https://schema.org", "@graph": page.schema });
    tags.push(["script", { type: "application/ld+json" }, json.replace(/</g, "\\u003c")]);
  }
  return tags;
}
