import { Link, useParams } from "react-router-dom";
import PaintingCard from "../components/PaintingCard.jsx";
import NotFound from "./NotFound.jsx";
import { categories, collectionBySlug, collectionPath, paintings } from "../data/site.js";
import "./Shop.css";
import "./Painting.css";

// One page per category (e.g. /collections/watercolor-paintings): a crawlable page for searches like "watercolor paintings for sale".
export default function Collection() {
  const { slug } = useParams();
  const c = collectionBySlug[slug];
  if (!c) return <NotFound />;
  const works = paintings.filter((p) => p.category === c.name);
  const available = works.filter((p) => p.status !== "sold").length;

  return (
    <div className="container">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <span>{c.heading}</span>
      </nav>
      <header className="page-head">
        <h1>{c.heading}</h1>
        <p>{c.intro}</p>
      </header>
      <p className="shop-count">
        {works.length} works, {available} available
      </p>
      <ul className="shop-grid">
        {works.map((p) => (
          <li key={p.slug}>
            <PaintingCard painting={p} />
          </li>
        ))}
      </ul>
      <p className="collection-more">
        More to explore:{" "}
        {categories
          .filter((x) => x.slug !== c.slug)
          .map((x, i, all) => (
            <span key={x.slug}>
              <Link to={collectionPath(x)} className="text-link">
                {x.heading}
              </Link>
              {i < all.length - 1 ? ", " : ""}
            </span>
          ))}
        .
      </p>
    </div>
  );
}
