import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import StoryReveal from "../components/StoryReveal.jsx";
import StickyShowcase from "../components/StickyShowcase.jsx";
import { categories, collectionPath, coverFor, featured, paintings } from "../data/site.js";
import "./Home.css";

export default function Home() {
  return (
    <>
      <Hero />
      <StoryReveal />
      <StickyShowcase works={featured} />

      <section className="collections" aria-labelledby="collections-title">
        <div className="container">
          <h2 id="collections-title">Explore the collection.</h2>
          <p className="collections-lede">
            {paintings.length} works across oil, acrylic, watercolor, and charcoal.
          </p>
          <div className="collection-grid">
            {categories.map((c) => {
              const cover = coverFor(c.name);
              const count = paintings.filter((p) => p.category === c.name).length;
              return (
                <Link
                  key={c.name}
                  to={collectionPath(c)}
                  className="collection-tile"
                  style={{ "--art": c.dot }}
                >
                  <div className="collection-text">
                    <h3>{c.name}</h3>
                    <p>{c.blurb}</p>
                    <span className="collection-count">
                      {count} {count === 1 ? "work" : "works"}
                    </span>
                  </div>
                  <div className="collection-art">
                    <img
                      src={cover.images[0].thumb}
                      alt={cover.title}
                      loading="lazy"
                      width={cover.images[0].width}
                      height={cover.images[0].height}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="collaborate on-dark" data-nav-dark aria-labelledby="collab-title">
        <div className="container collaborate-inner">
          <h2 id="collab-title">I’m always open to collaborate.</h2>
          <p>Have an idea for a commission or a creative project? Tell Olga what you have in mind.</p>
          <Link to="/contact?topic=Collaboration" className="btn btn-light">
            Start a conversation
          </Link>
        </div>
      </section>
    </>
  );
}
