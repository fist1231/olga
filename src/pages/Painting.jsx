import { useCallback, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Lightbox from "../components/Lightbox.jsx";
import PaintingCard from "../components/PaintingCard.jsx";
import { bySlug, categoryByName, collectionPath, formatPrice, paintings, site } from "../data/site.js";
import NotFound from "./NotFound.jsx";
import "./Painting.css";

function PurchaseAction({ p }) {
  const inquire = `/contact?painting=${p.slug}`;
  if (p.status === "sold") {
    return (
      <>
        <p className="buy-note">This original has found a home.</p>
        <Link to={inquire} className="btn btn-primary">
          {p.printsAvailable ? "Ask about prints" : "Ask about similar work"}
        </Link>
      </>
    );
  }
  if (p.stripeLink) {
    return (
      <a href={p.stripeLink} className="btn btn-primary">
        Buy now
      </a>
    );
  }
  return (
    <>
      <Link to={inquire} className="btn btn-primary">
        {p.status === "print" ? "Order a print" : "Inquire to buy"}
      </Link>
      <p className="buy-note">Send Olga a short message to arrange the purchase.</p>
    </>
  );
}

export default function Painting() {
  const { slug } = useParams();
  const p = bySlug[slug];
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const close = useCallback(() => setZoomed(false), []);

  if (!p) return <NotFound />;

  const img = p.images[active] || p.images[0];
  const more = paintings.filter((x) => x.category === p.category && x.slug !== p.slug).slice(0, 3);

  return (
    <div className="container painting" style={{ "--art": p.color }}>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <Link to={collectionPath(categoryByName[p.category])}>{categoryByName[p.category].heading}</Link>
      </nav>

      <div className="painting-grid">
        <div className="painting-media">
          <button className="painting-stage" onClick={() => setZoomed(true)} aria-label={`View ${p.title} full screen`}>
            <span className="painting-mat">
            {!zoomed && (
              <motion.img
                layoutId={`art-${p.slug}-${active}`}
                src={img.src}
                alt={p.title}
                width={img.width}
                height={img.height}
                fetchPriority="high"
                transition={{ type: "spring", stiffness: 260, damping: 32 }}
              />
            )}
            </span>
          </button>
          {p.images.length > 1 && (
            <div className="painting-thumbs" role="group" aria-label="More views">
              {p.images.map((im, i) => (
                <button
                  key={im.src}
                  className={i === active ? "is-active" : ""}
                  aria-pressed={i === active}
                  aria-label={`View ${i + 1}`}
                  onClick={() => setActive(i)}
                >
                  <img src={im.thumb} alt="" width={im.width} height={im.height} />
                </button>
              ))}
            </div>
          )}
          <p className="zoom-hint">Tap or click the painting to see it full screen.</p>
        </div>

        <div className="painting-info">
          <h1>{p.title}</h1>
          <p className="painting-details">{p.details}</p>
          <p className="painting-price">
            {p.status === "sold" ? "Sold" : formatPrice(p.price)}
            {p.status === "print" && <span> · Limited print</span>}
          </p>
          <div className="painting-buy">
            <PurchaseAction p={p} />
          </div>
          <dl className="painting-facts">
            <div>
              <dt>Artist</dt>
              <dd>{site.artist}</dd>
            </div>
            <div>
              <dt>Collection</dt>
              <dd>{p.category}</dd>
            </div>
            <div>
              <dt>Framing</dt>
              <dd>
                <Link to="/framing" className="text-link">
                  See framing options
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {more.length > 0 && (
        <section className="more" aria-labelledby="more-title">
          <h2 id="more-title">More {p.category.toLowerCase()}</h2>
          <ul>
            {more.map((m) => (
              <li key={m.slug}>
                <PaintingCard painting={m} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <AnimatePresence>
        {zoomed && <Lightbox image={img} title={p.title} layoutId={`art-${p.slug}-${active}`} onClose={close} />}
      </AnimatePresence>
    </div>
  );
}
