import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import "./StoryReveal.css";

// Two sentences from Olga's own bio, kept word-for-word.
const quote =
  "I have always been passionate about the arts. My main inspiration has always been nature and traveling.";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

export default function StoryReveal() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  // Words light up one by one as the paragraph scrolls through the screen.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = quote.split(" ");

  return (
    <section className="story" ref={ref} aria-label="Olga’s story">
      <div className="container">
        <blockquote className="story-quote">
          {reduce ? (
            <p>{quote}</p>
          ) : (
            <p>
              <span className="visually-hidden">{quote}</span>
              <span aria-hidden="true">
                {words.map((w, i) => (
                  <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                    {w}
                  </Word>
                ))}
              </span>
            </p>
          )}
          <footer>
            <Link to="/about" className="text-link">
              Read Olga’s story
            </Link>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
