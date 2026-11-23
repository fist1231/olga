import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Painting from "./pages/Painting.jsx";
import About from "./pages/About.jsx";
import Framing from "./pages/Framing.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

const titles = {
  "/": "Olga Tislina — Paintings inspired by nature and travel",
  "/shop": "Shop — Olga Tislina",
  "/about": "About — Olga Tislina",
  "/framing": "Framing & mounting — Olga Tislina",
  "/contact": "Contact — Olga Tislina",
};

export default function App() {
  const location = useLocation();

  // Start each new page at the top, and set the browser tab title.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (titles[location.pathname]) document.title = titles[location.pathname];
  }, [location.pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:slug" element={<Painting />} />
            <Route path="/about" element={<About />} />
            <Route path="/framing" element={<Framing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}
