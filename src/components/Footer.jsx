import { Link } from "react-router-dom";
import { site } from "../data/site.js";
import "./Footer.css";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/images/logo.png" alt={`${site.brand} logo`} width="88" height="67" />
          <p>
            Original paintings by {site.artist}.
            <br />
            Inspired by nature and travel.
          </p>
        </div>
        <nav aria-label="Footer" className="footer-links">
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/framing">Framing &amp; mounting</Link>
          <Link to="/contact">Contact</Link>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram {site.instagramHandle}
          </a>
        </nav>
      </div>
      <div className="container footer-legal">
        <p>
          © {YEAR} {site.artist}. All artwork and images are the property of the artist.
        </p>
      </div>
    </footer>
  );
}
