import { Link } from "react-router-dom";
import "./Framing.css";

// NOTE: This copy came from the old Squarespace page and may be template text.
// Olga should confirm these options before launch (tracked in PLAN.md).
const frames = [
  {
    name: "Wood frame",
    text: "A light wood frame that adds softness to your space. Made by a local, family-run framing business.",
    kind: "wood",
  },
  {
    name: "UV acrylic frame",
    text: "A clean acrylic frame for a studio-like, professional finish. Made by a local, family-run framing business.",
    kind: "acrylic",
  },
];

const mounts = [
  { name: "Full-bleed", text: "The artwork runs right to the edge of the frame, with no mat.", kind: "bleed" },
  { name: "Mat", text: "A 2″ white core mat with a beveled edge surrounds the artwork.", kind: "mat" },
  { name: "Float", text: "The artwork sits raised inside the frame, so you see its face and edges.", kind: "float" },
];

function MountDiagram({ kind }) {
  return (
    <div className={`mount mount-${kind}`} aria-hidden="true">
      <div className="mount-art" />
    </div>
  );
}

export default function Framing() {
  return (
    <div className="container">
      <header className="page-head">
        <h1>Framing &amp; mounting</h1>
        <p>All prints are available for custom framing and mounting. Mention the frame and mounting style you’d like when you inquire.</p>
      </header>

      <section aria-labelledby="frames-title" className="framing-section">
        <h2 id="frames-title">Frames</h2>
        <div className="frame-grid">
          {frames.map((f) => (
            <article key={f.name} className="frame-card">
              <div className={`frame-swatch frame-${f.kind}`} aria-hidden="true">
                <div className="frame-inner" />
              </div>
              <h3>{f.name}</h3>
              <p>{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="mounts-title" className="framing-section">
        <h2 id="mounts-title">Mounting styles</h2>
        <div className="mount-grid">
          {mounts.map((m) => (
            <article key={m.name} className="mount-card">
              <MountDiagram kind={m.kind} />
              <h3>{m.name}</h3>
              <p>{m.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="framing-cta">
        <h2>Not sure which to choose?</h2>
        <p>Tell Olga which painting you love and where it will hang, and ask about the options.</p>
        <Link to="/contact?topic=Framing" className="btn btn-primary">
          Ask about framing
        </Link>
      </section>
    </div>
  );
}
