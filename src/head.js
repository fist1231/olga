import { metaFor } from "./seo.js";

// Swap the page's search and link-preview tags when the visitor moves to another page.
// The tags written at build time carry data-seo, so they are replaced rather than duplicated.
export function applyHead(pathname) {
  const meta = metaFor(pathname);
  document.title = meta.title;
  document.head.querySelectorAll("[data-seo]").forEach((el) => el.remove());
  for (const [tag, attrs, text] of meta.tags) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    el.setAttribute("data-seo", "");
    if (text) el.textContent = text;
    document.head.appendChild(el);
  }
}
