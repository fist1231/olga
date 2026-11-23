import { Link } from "react-router-dom";
import { bio, paintings, schools, site } from "../data/site.js";
import "./About.css";

const places = ["Crete", "Riga", "Croatia", "Terracina", "Bolivia", "Abbaye de Lérins"];

export default function About() {
  const originals = paintings.filter((p) => p.category !== "Drawings").length;
  return (
    <>
      <section className="container about-hero">
        <div className="about-portrait">
          <img
            src="/images/portrait.webp"
            alt="Olga Tislina in a straw hat, photographed in black and white"
            width="1168"
            height="1544"
          />
        </div>
        <div className="about-copy">
          <h1>Hi, I’m Olga.</h1>
          <p className="about-bio">{bio}</p>
          <a href={site.instagram} target="_blank" rel="noreferrer" className="text-link">
            Follow along on Instagram {site.instagramHandle}
          </a>
        </div>
      </section>

      <section className="about-facts" aria-label="At a glance">
        <div className="container about-facts-grid">
          <div>
            <h2>Where she paints and studies</h2>
            <ul>
              {schools.map((s) => (
                <li key={s.name}>
                  <strong>{s.name}</strong>
                  <span>{s.place}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Places in the paintings</h2>
            <p className="about-places">{places.join(", ")}.</p>
          </div>
          <div>
            <h2>In the studio</h2>
            <p className="about-places">
              {originals} originals in oil, acrylic, and watercolor, plus charcoal sketches.
            </p>
          </div>
        </div>
      </section>

      <section className="container about-cta">
        <h2>See the work.</h2>
        <div className="about-cta-actions">
          <Link to="/shop" className="btn btn-primary">
            Shop the collection
          </Link>
          <Link to="/contact" className="text-link">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}
