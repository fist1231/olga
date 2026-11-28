import { Link } from "react-router-dom";
import { formatPrice } from "../data/site.js";
import "./PaintingCard.css";

function statusLabel(p) {
  if (p.status === "sold") return "Sold";
  if (p.status === "print") return `Limited print · ${formatPrice(p.price)}`;
  return formatPrice(p.price);
}

export default function PaintingCard({ painting }) {
  const img = painting.images[0];
  return (
    <Link to={`/shop/${painting.slug}`} className="card" style={{ "--art": painting.color }}>
      <div className="card-frame">
        <div className="card-mat">
          <img src={img.thumb} alt={painting.title} loading="lazy" width={img.width} height={img.height} />
        </div>
        {painting.status === "sold" && <span className="card-badge">Sold</span>}
      </div>
      <div className="card-text">
        <h3>{painting.title}</h3>
        <p className="card-details">{painting.details}</p>
        <p className="card-price">{statusLabel(painting)}</p>
      </div>
    </Link>
  );
}
