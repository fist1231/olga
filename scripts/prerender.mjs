// Runs after `vite build`. Writes one ready-made HTML file per page (so search engines and
// link previews see real content), plus 404.html, sitemap.xml, and robots.txt.
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const server = join(root, "dist-ssr");

const { render, metaFor, allPaths, SITE_URL } = await import(pathToFileURL(join(server, "entry-server.js")).href);
const template = await readFile(join(dist, "index.html"), "utf8");

const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function headFor(path) {
  const meta = metaFor(path);
  const tags = meta.tags.map(([tag, attrs, text]) => {
    const a = Object.entries(attrs)
      .map(([k, v]) => ` ${k}="${esc(v)}"`)
      .join("");
    return tag === "script" ? `<script${a} data-seo>${text}</script>` : `<${tag}${a} data-seo />`;
  });
  return `<title>${esc(meta.title)}</title>\n    ${tags.join("\n    ")}`;
}

function page(path) {
  return template
    .replace("<!--seo-head-->", () => headFor(path))
    .replace('<div id="root"></div>', () => `<div id="root">${render(path)}</div>`);
}

// "/" → index.html, "/shop" → shop.html, "/shop/riga" → shop/riga.html (Vercel's cleanUrls drops ".html").
const fileFor = (path) => (path === "/" ? "index.html" : `${path.slice(1)}.html`);

if (!template.includes("<!--seo-head-->")) throw new Error("index.html is missing the <!--seo-head--> marker");

for (const path of allPaths) {
  const file = join(dist, fileFor(path));
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page(path));
}
await writeFile(join(dist, "404.html"), page("/404"));

const today = new Date().toISOString().slice(0, 10);
const urls = allPaths.map((p) => `  <url><loc>${esc(metaFor(p).canonical)}</loc><lastmod>${today}</lastmod></url>`);
await writeFile(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);
await writeFile(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

await rm(server, { recursive: true, force: true });
console.log(`Pre-rendered ${allPaths.length} pages + 404 for ${SITE_URL}`);
