import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { bySlug, site } from "../data/site.js";
import { useHydrated } from "../useHydrated.js";
import "./Contact.css";

const topics = ["Buying a painting", "Commission", "Collaboration", "Framing", "Something else"];
// Some email apps cut off very long mailto: links (~2,000 characters), so keep messages under this.
const MAX_MESSAGE = 1500;

// The email the visitor's own email app opens with: addressed to Olga, ready to send.
function buildEmail({ name, topic, message, painting }) {
  const subject = painting ? `Website inquiry: ${painting.title}` : `Website message: ${topic}`;
  const details = [`Name: ${name}`, `Topic: ${topic}`];
  if (painting) details.push(`Painting: ${painting.title} (${painting.details})`);
  const body = `${message}\n\n—\n${details.join("\n")}`;
  const q = (pairs) => pairs.map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join("&");
  return {
    mailto: `mailto:${site.contactEmail}?${q([["subject", subject], ["body", body]])}`,
    // For people who use Gmail in the browser instead of an email app.
    gmail: `https://mail.google.com/mail/?${q([["view", "cm"], ["to", site.contactEmail], ["su", subject], ["body", body]])}`,
  };
}

// Opening a mailto: link through a real link click works the same way in every browser.
function openEmailApp(href) {
  const a = document.createElement("a");
  a.href = href;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function Contact() {
  // The pre-built page has no ?painting= or ?topic=; those are applied right after the page loads.
  const [rawParams] = useSearchParams();
  const hydrated = useHydrated();
  const params = hydrated ? rawParams : new URLSearchParams();
  const painting = bySlug[params.get("painting")];
  const initialTopic = painting
    ? "Buying a painting"
    : topics.find((t) => t.toLowerCase().startsWith((params.get("topic") || "").toLowerCase())) || topics[0];

  const [errors, setErrors] = useState({});
  const [draft, setDraft] = useState(null); // what the visitor wrote, kept for "Edit message"
  const [email, setEmail] = useState(null); // set once the email app has been opened
  const [copied, setCopied] = useState(false);
  const doneHeading = useRef(null);

  // Show the "finish in your email app" screen from its top, and move keyboard/screen-reader focus to it.
  useEffect(() => {
    if (!email) return;
    window.scrollTo({ top: 0, behavior: "instant" });
    doneHeading.current?.focus();
  }, [email]);

  function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const values = {
      name: data.get("name").trim(),
      topic: data.get("topic"),
      message: data.get("message").trim(),
    };
    const next = {};
    if (!values.name) next.name = "Enter your name.";
    if (!values.message) next.message = "Write a short message.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    const built = buildEmail({ ...values, painting });
    setDraft(values);
    setEmail(built);
    setCopied(false);
    openEmailApp(built.mailto);
  }

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(site.contactEmail);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (email) {
    return (
      <div className="container contact-done">
        <h1 ref={doneHeading} tabIndex={-1}>
          Finish in your email app.
        </h1>
        <p>Your message to Olga is ready. Press Send in your email app.</p>
        <div className="contact-fallback">
          <p>
            Didn’t open?{" "}
            <a href={email.gmail} target="_blank" rel="noreferrer" className="text-link">
              Use Gmail instead
            </a>
            , or email Olga at{" "}
            <a href={`mailto:${site.contactEmail}`} className="text-link">
              {site.contactEmail}
            </a>
            .
          </p>
          <div className="contact-fallback-actions">
            <button type="button" className="btn btn-light" onClick={copyAddress}>
              {copied ? "Address copied" : "Copy address"}
            </button>
            <button type="button" className="btn btn-light" onClick={() => setEmail(null)}>
              Edit message
            </button>
          </div>
          <p className="visually-hidden" aria-live="polite">
            {copied ? "Email address copied." : ""}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container contact">
      <header className="page-head">
        <h1>Let’s talk.</h1>
        <p>
          Questions about a painting, a commission, or a collaboration? Write Olga a message: it opens in your email
          app, ready to send.
        </p>
      </header>

      {/* key: redraw the form once after load so a ?painting= link fills in the fields */}
      <form className="contact-form" onSubmit={onSubmit} noValidate key={hydrated ? "ready" : "first"}>
        <Field label="Name" name="name" autoComplete="name" error={errors.name} defaultValue={draft?.name} />

        <label className="field">
          <span>Topic</span>
          <select name="topic" defaultValue={draft?.topic || initialTopic}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>

        {painting && (
          <label className="field">
            <span>Painting</span>
            <input name="painting" defaultValue={`${painting.title} (${painting.details})`} readOnly />
          </label>
        )}

        <Field
          label="Message"
          name="message"
          textarea
          maxLength={MAX_MESSAGE}
          error={errors.message}
          defaultValue={draft?.message ?? (painting ? `Hi Olga, I’m interested in “${painting.title}”.` : "")}
        />

        <button className="btn btn-primary" type="submit">
          Write email
        </button>
      </form>

      <p className="contact-alt">
        Prefer Instagram? Send a message to{" "}
        <a href={site.instagram} target="_blank" rel="noreferrer">
          {site.instagramHandle}
        </a>
        .
      </p>
    </div>
  );
}

function Field({ label, name, error, textarea, ...rest }) {
  const id = `f-${name}`;
  const Tag = textarea ? "textarea" : "input";
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <Tag
        id={id}
        name={name}
        rows={textarea ? 6 : undefined}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        {...rest}
      />
      {error && (
        <p className="field-error" id={`${id}-err`}>
          {error}
        </p>
      )}
    </div>
  );
}
