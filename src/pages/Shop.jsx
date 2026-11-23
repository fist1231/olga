import { useSearchParams } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import PaintingCard from "../components/PaintingCard.jsx";
import { categories, paintings } from "../data/site.js";
import "./Shop.css";

const filters = ["All", ...categories.map((c) => c.name)];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const active = filters.includes(params.get("category")) ? params.get("category") : "All";
  const shown = active === "All" ? paintings : paintings.filter((p) => p.category === active);
  const available = shown.filter((p) => p.status !== "sold").length;

  const choose = (name) => {
    if (name === "All") setParams({}, { replace: true });
    else setParams({ category: name }, { replace: true });
  };

  return (
    <div className="container">
      <header className="page-head">
        <h1>Shop</h1>
        <p>Original paintings and limited prints, signed by the artist.</p>
      </header>

      <LayoutGroup>
        <div className="filter" role="group" aria-label="Filter by category">
          {filters.map((name) => (
            <button
              key={name}
              type="button"
              aria-pressed={active === name}
              className={active === name ? "is-active" : ""}
              onClick={() => choose(name)}
            >
              {active === name && (
                <motion.span
                  layoutId="filter-pill"
                  className="filter-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="filter-label">{name}</span>
            </button>
          ))}
        </div>
      </LayoutGroup>

      <p className="shop-count" aria-live="polite">
        {shown.length} works, {available} available
      </p>

      <motion.ul className="shop-grid" layout>
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((p) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <PaintingCard painting={p} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
