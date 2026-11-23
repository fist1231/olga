import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { formatPrice } from "../data/site.js";
import "./StickyShowcase.css";

// A tall section whose inner panel "sticks" to the screen.
// Scrolling moves through the featured paintings one at a time, like a gallery wall in the dark.
export default function StickyShowcase({ works }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(works.length - 1, Math.max(0, Math.floor(v * works.length)));
    setIndex((cur) => (cur === next ? cur : next));
  });

  const work = works[index];
  const img = work.images[0];

  return (
    <section
      className="showcase on-dark"
      data-nav-dark
      ref={ref}
      style={{ height: `${works.length * 90 + 30}vh` }}
      aria-labelledby="showcase-title"
    >
      <div className="showcase-sticky">
        <div className="container showcase-grid">
          <div className="showcase-head">
            <h2 id="showcase-title">Featured works</h2>
            <ol className="showcase-steps" aria-hidden="true">
              {works.map((w, i) => (
                <li key={w.slug} className={i === index ? "is-active" : ""} />
              ))}
            </ol>
          </div>

          <div className="showcase-stage">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.img
                key={work.slug}
                src={img.src}
                alt={work.title}
                width={img.width}
                height={img.height}
                initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>

          <div className="showcase-info" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={work.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <h3>{work.title}</h3>
                <p className="showcase-details">{work.details}</p>
                <p className="showcase-price">
                  {work.status === "sold" ? "Sold" : formatPrice(work.price)}
                </p>
                <Link to={`/shop/${work.slug}`} className="btn btn-light">
                  View painting
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Plain list so keyboard and screen-reader users can reach every featured work.
          Hidden until a link inside it gets keyboard focus, then it appears. */}
      <ul className="showcase-links" aria-label="Featured works">
        {works.map((w) => (
          <li key={w.slug}>
            <Link to={`/shop/${w.slug}`}>{w.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
