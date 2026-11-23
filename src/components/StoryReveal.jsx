import { Link } from "react-router-dom";
import "./StoryReveal.css";

// Two sentences from Olga's own bio, kept word-for-word.
const quote =
  "I have always been passionate about the arts. My main inspiration has always been nature and traveling.";

export default function StoryReveal() {
  return (
    <section className="story" aria-label="Olga’s story">
      <div className="container">
        <blockquote className="story-quote">
          <p>{quote}</p>
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
