import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import "./Lightbox.css";

// Full-screen view of a painting. Closes with Escape, the close button, or a click anywhere.
export default function Lightbox({ image, title, layoutId, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${title}, full view`}
      onClick={onClose}
      initial={{ backgroundColor: "rgba(0,0,0,0)" }}
      animate={{ backgroundColor: "rgba(0,0,0,0.94)" }}
      exit={{ backgroundColor: "rgba(0,0,0,0)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.img
        layoutId={layoutId}
        src={image.src}
        alt={title}
        width={image.width}
        height={image.height}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
      />
      <motion.button
        ref={closeRef}
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close full view"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </motion.button>
    </motion.div>
  );
}
