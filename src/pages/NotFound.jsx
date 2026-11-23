import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container page-head" style={{ textAlign: "center", paddingBottom: "var(--s16)" }}>
      <h1>This page isn’t here.</h1>
      <p style={{ marginInline: "auto" }}>The link may be old, or the painting may have moved.</p>
      <div style={{ marginTop: "var(--s4)" }}>
        <Link to="/shop" className="btn btn-primary">
          Browse the shop
        </Link>
      </div>
    </div>
  );
}
