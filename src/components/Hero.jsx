import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import "./Hero.css";

const lines = ["Nature, travel,", "and the colors", "in between."];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // As you scroll past, the portrait drifts slower than the page (parallax) and the text fades.
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  // Scroll-linked effects ignore MotionConfig, so switch them off by hand for reduced-motion visitors.
  const reduce = useReducedMotion();

  return (
    <section className="hero" ref={ref}>
      <div className="container hero-grid">
        <motion.div className="hero-copy" style={reduce ? undefined : { opacity: textOpacity }}>
          <motion.p
            className="hero-name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Olga Tislina, painter
          </motion.p>
          <h1 aria-label={lines.join(" ")}>
            {lines.map((line, i) => (
              <span className="hero-line" key={line} aria-hidden="true">
                <motion.span
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            <p className="hero-lede">
              Original oil paintings, abstracts, and watercolors, from the rose gardens of Crete to a street
              corner in Riga.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary">
                Shop the collection
              </Link>
              <Link to="/about" className="text-link">
                Meet Olga
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-portrait"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.img
            style={reduce ? undefined : { y: portraitY }}
            src="/images/portrait.webp"
            alt="Olga Tislina in a straw hat, photographed in black and white"
            width="1168"
            height="1544"
            fetchPriority="high"
          />
        </motion.div>
      </div>
    </section>
  );
}
