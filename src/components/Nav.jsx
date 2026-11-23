import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { site } from "../data/site.js";
import InstagramIcon from "./InstagramIcon.jsx";
import "./Nav.css";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/framing", label: "Framing" },
  { to: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  // Switch the bar to its dark style while it sits over a section marked data-nav-dark.
  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const y = 26; // middle of the nav bar
      const over = [...document.querySelectorAll("[data-nav-dark]")].some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= y && r.bottom >= y;
      });
      setDark((d) => (d === over ? d : over));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Lock page scroll and allow Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className={`nav ${open ? "is-open" : ""} ${dark && !open ? "is-dark" : ""}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-brand" aria-label={`${site.artist}, home`} onClick={() => setOpen(false)}>
            <img src="/images/logo.webp" alt="" width="34" height="26" />
            <span>{site.artist}</span>
          </Link>

          <nav className="nav-links" aria-label="Main">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? "active" : "")}>
                {l.label}
              </NavLink>
            ))}
            <a className="nav-ig" href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </nav>

          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Rendered outside <header>: the header's blur effect would otherwise trap this fixed panel inside the bar. */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="nav-sheet"
            aria-label="Main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul>
              {[{ to: "/", label: "Home" }, ...links].map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i + 0.05, duration: 0.3 }}
                >
                  <Link to={l.to} onClick={() => setOpen(false)}>
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <a href={site.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
