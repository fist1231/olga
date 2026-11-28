// Search engine and link-preview info for every page: titles, descriptions, preview images,
// and structured data (JSON-LD) that tells Google what each page is about.
// Used in two places: the build step that writes one HTML file per page (scripts/prerender.mjs),
// and the browser, which swaps these tags when a visitor moves between pages (see App.jsx).
import { bio, bySlug, categories, categoryByName, collectionPath, formatPrice, paintings, site } from "./data/site.js";

// The site's public web address, with no trailing slash. Set it in vite.config.js; Vite fills it in at build time.
export const SITE_URL = import.meta.env.VITE_SITE_URL;

const DEFAULT_IMAGE = bySlug["rose-garden-crete"].images[0];
const PORTRAIT = { src: "/images/portrait.webp", width: 1168, height: 1544 };

// Every page that exists. The build writes an HTML file for each, and they make up sitemap.xml.
export const staticPaths = ["/", "/shop", "/about", "/framing", "/contact"];
export const paintingPaths = paintings.map((p) => `/shop/${p.slug}`);
export const collectionPaths = categories.map(collectionPath);
export const allPaths = [...staticPaths, ...collectionPaths, ...paintingPaths];

const abs = (path) => `${SITE_URL}${path}`;
const artistId = `${SITE_URL}/#artist`;

const person = {
  "@type": "Person",
  "@id": artistId,
  name: site.artist,
  url: abs("/about"),
  image: abs(PORTRAIT.src),
  jobTitle: "Painter",
  knowsAbout: ["Oil painting", "Watercolor", "Acrylic painting", "Charcoal drawing", "Still life", "Landscape painting"],
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

// "Oil on linen panel, 9x12" → { width: 9, height: 12 } (inches). Works without a size in the text return nothing.
function sizeOf(p) {
  const m = p.details.match(/(\d+(?:\.\d+)?)\s*x\s*(\d+(?:\.\d+)?)/i);
  if (!m) return {};
  const inches = (value) => ({ "@type": "QuantitativeValue", value: Number(value), unitCode: "INH" });
  return { width: inches(m[1]), height: inches(m[2]) };
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
    ...sizeOf(p),
    mainEntityOfPage: url,
    offers: {
      "@type": "Offer",
      url,
      price: p.price.toFixed(2),
      priceCurrency: "USD",
      availability,
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": artistId },
    },
  };
}

const pages = {
  "/": {
    title: `${site.artist} | Original Paintings for Sale`,
    description:
      "Original oil paintings, abstracts, watercolors, and limited prints by painter Olga Tislina, inspired by nature and travel. Browse the art collection and inquire to buy.",
    schema: [
      { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: site.artist, alternateName: site.brand, url: abs("/"), inLanguage: "en-US" },
      person,
    ],
  },
  "/shop": {
    title: `Shop Original Paintings and Prints | ${site.artist}`,
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
    title: `About ${site.artist}, Painter and Artist`,
    description:
      "Olga Tislina paints flowers, still life, and the places she travels. She takes painting classes at The Arts of Great Falls Art School, VA, and the Woodstock School of Art, NY.",
    image: PORTRAIT,
    imageAlt: "Olga Tislina in a straw hat, photographed in black and white",
    schema: [{ "@type": "ProfilePage", url: abs("/about"), mainEntity: person }, crumbs([["Home", "/"], ["About", "/about"]])],
  },
  "/framing": {
    title: `Framing and Mounting | ${site.artist}`,
    description: "How Olga Tislina's paintings and prints can be framed and mounted. Ask Olga which option suits your piece.",
    schema: [crumbs([["Home", "/"], ["Framing & mounting", "/framing"]])],
  },
  "/contact": {
    title: `Contact ${site.artist} | Inquiries and Commissions`,
    description: "Questions about a painting, a commission, or a collaboration? Send Olga Tislina a message.",
    schema: [{ "@type": "ContactPage", url: abs("/contact") }, crumbs([["Home", "/"], ["Contact", "/contact"]])],
  },
};

for (const c of categories) {
  const path = collectionPath(c);
  const works = paintings.filter((p) => p.category === c.name);
  pages[path] = {
    title: `${c.seoTitle} | ${site.artist}`,
    description: c.description,
    image: works[0].images[0],
    imageAlt: `${works[0].title}, a work by ${site.artist}`,
    schema: [
      {
        "@type": "CollectionPage",
        name: c.heading,
        url: abs(path),
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: works.length,
          itemListElement: works.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/shop/${p.slug}`), name: p.title })),
        },
      },
      crumbs([["Home", "/"], ["Shop", "/shop"], [c.heading, path]]),
    ],
  };
}

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
      title: `${p.title} | ${kindOf(p)} by ${site.artist}`,
      description: paintingDescription(p),
      image: p.images[0],
      imageAlt: `${p.title}, a work by ${site.artist}`,
      type: "product",
      schema: [
        paintingSchema(p, url),
        crumbs([["Home", "/"], ["Shop", "/shop"], [categoryByName[p.category].heading, collectionPath(categoryByName[p.category])], [p.title, path]]),
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
    ["meta", { name: "twitter:title", content: page.title }],
    ["meta", { name: "twitter:description", content: page.description }],
    ["meta", { name: "twitter:image", content: abs(image.src) }],
    ["meta", { name: "twitter:image:alt", content: page.imageAlt || `A painting by ${site.artist}` }],
  ];
  // max-image-preview:large lets Google show big thumbnails of the paintings in search results.
  tags.push(["meta", { name: "robots", content: page.noindex ? "noindex" : "index, follow, max-image-preview:large" }]);
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

// Pictures on a page, for the image sitemap (helps Google Images find the paintings).
export function imagesFor(pathname) {
  const m = pathname.match(/^\/shop\/([^/]+)$/);
  if (m && bySlug[m[1]]) return bySlug[m[1]].images.map((im) => ({ loc: abs(im.src), title: `${bySlug[m[1]].title} by ${site.artist}` }));
  if (pathname === "/about") return [{ loc: abs(PORTRAIT.src), title: `${site.artist}, painter` }];
  return [];
}
