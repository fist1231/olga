import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { bySlug, site } from "../data/site.js";
import "./Contact.css";

const topics = ["Buying a painting", "Commission", "Collaboration", "Framing", "Something else"];

export default function Contact() {
  const [params] = useSearchParams();
  const painting = bySlug[params.get("painting")];
  const initialTopic = painting
    ? "Buying a painting"
    : topics.find((t) => t.toLowerCase().startsWith((params.get("topic") || "").toLowerCase())) || topics[0];

  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next = {};
    if (!data.get("name").trim()) next.name = "Enter your name.";
    const email = data.get("email").trim();
    if (!email) next.email = "Enter your email so Olga can reply.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter an email address like name@example.com.";
    if (!data.get("message").trim()) next.message = "Write a short message.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }

    if (!site.formspreeId) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="container contact-done">
        <h1>Message sent.</h1>
        <p>Thank you. Olga will reply to the email address you entered.</p>
      </div>
    );
  }

  return (
    <div className="container contact">
      <header className="page-head">
        <h1>Let’s talk.</h1>
        <p>Questions about a painting, a commission, or a collaboration? Send Olga a message.</p>
      </header>

      <form className="contact-form" onSubmit={onSubmit} noValidate>
        <div className="field-row">
          <Field label="Name" name="name" autoComplete="name" error={errors.name} />
          <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
        </div>

        <label className="field">
          <span>Topic</span>
          <select name="topic" defaultValue={initialTopic}>
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
          error={errors.message}
          defaultValue={painting ? `Hi Olga, I’m interested in “${painting.title}”.` : ""}
        />

        {status === "error" && (
          <p className="form-error" role="alert">
            {site.formspreeId
              ? "The message didn’t send. Check your connection and try again, or message Olga on Instagram."
              : "The contact form isn’t connected yet. For now, message Olga on Instagram."}{" "}
            <a href={site.instagram} target="_blank" rel="noreferrer">
              {site.instagramHandle}
            </a>
          </p>
        )}

        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
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
