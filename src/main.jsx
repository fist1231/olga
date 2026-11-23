import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Root from "./Root.jsx";

const container = document.getElementById("root");
const app = <Root Router={BrowserRouter} />;

// Built pages arrive with their content already in the HTML: React attaches to it ("hydrates").
// The dev server sends an empty page, so React draws it from scratch.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
