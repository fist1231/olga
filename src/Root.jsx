import { StrictMode } from "react";
import { MotionConfig } from "motion/react";
import App from "./App.jsx";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "./styles/global.css";

// Shared by the browser (main.jsx) and the build-time page renderer (entry-server.jsx).
export default function Root({ Router, routerProps }) {
  return (
    <StrictMode>
      <Router {...routerProps}>
        {/* reducedMotion="user" turns off movement for visitors who ask their device for less motion */}
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </Router>
    </StrictMode>
  );
}
