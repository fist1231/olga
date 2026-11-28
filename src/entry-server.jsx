/* eslint-disable react/only-export-components -- build-time entry, never hot-reloaded */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Root from "./Root.jsx";

export { allPaths, imagesFor, metaFor, SITE_URL } from "./seo.js";

// Used only at build time (scripts/prerender.mjs) to turn each page into HTML.
export function render(url) {
  return renderToString(<Root Router={StaticRouter} routerProps={{ location: url }} />);
}
