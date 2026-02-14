// dwaccess-com/src/app/modal/contactModal.tsx
"use client";

import React, { useEffect, useId, useRef, useState } from "react";

type StatusType = "success" | "danger" | "warning" | "info" | "";
type Status = { type: StatusType; message: string };

type ContactFormState = {
  title: string;
  name: string;
  email: string;
  subject: string;
  phone: string;
  message: string;
  website: string; // honeypot anti-bot
};

type ContactModalProps = {
  show: boolean;
  onHide?: () => void;
  title?: string;
};

async function readJsonSafe(res: Response) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return { ok: res.ok, raw: text };
  }
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const EMPTY_FORM: ContactFormState = {
  title: "",
  name: "",
  email: "",
  subject: "",
  phone: "",
  message: "",
  website: "",
};

export default function ContactModal({ show, onHide, title }: ContactModalProps) {
  const formId = useId();
  const alertRef = useRef<HTMLDivElement | null>(null);

  const [status, setStatus] = useState<Status>({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<ContactFormState>(EMPTY_FORM);

  useEffect(() => {
    if (title) setForm((prev) => ({ ...prev, title }));
  }, [title]);

  // Escape / Block scroll
  useEffect(() => {
    if (!show) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onHide?.();

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [show, onHide]);

  // Focus alert for accessibility when it appears
  useEffect(() => {
    if (status.message) {
      // petite pause pour laisser le DOM peindre
      window.setTimeout(() => alertRef.current?.focus(), 0);
    }
  }, [status.message]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    setStatus({ type: "", message: "" });

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      const data = await readJsonSafe(res);

      // Cas OK
      if (res.ok && data?.ok !== false) {
        setStatus({
          type: "success",
          message: "Merci ! Votre message a bien été envoyé.",
        });

        setForm(EMPTY_FORM);
        window.setTimeout(() => onHide?.(), 5000);
        return;
      }

      // Cas erreur : on différencie 429 (warning)
      const serverMsg = data?.error || data?.message || `Erreur HTTP ${res.status}`;

      setStatus({
        type: res.status === 429 ? "warning" : "danger",
        message: serverMsg,
      });
    } catch (err: any) {
      setStatus({
        type: "danger",
        message: err?.message || "Une erreur est survenue. Merci de réessayer.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (!show) return null;

  const alertVariant =
    status.type === "success"
      ? "tp-alert--success"
      : status.type === "danger"
      ? "tp-alert--danger"
      : status.type === "warning"
      ? "tp-alert--warning"
      : status.type === "info"
      ? "tp-alert--info"
      : "tp-alert--neutral";

  const alertIcon =
    status.type === "success"
      ? "✅"
      : status.type === "danger"
      ? "⛔"
      : status.type === "warning"
      ? "⚠️"
      : status.type === "info"
      ? "ℹ️"
      : "💬";

  return (
    <div className="tp-modal-overlay" aria-modal="true" role="dialog" aria-labelledby={`${formId}-title`}>
      {/* Overlay */}
      <button
        type="button"
        onClick={onHide}
        className="tp-modal-backdrop"
        aria-label="Fermer"
        disabled={submitting}
      />

      {/* Card */}
      <div className="tp-modal-card" role="document">
        {/* Header */}
        <div className="tp-modal-header">
          <div>
            <div className="tp-chip">
              <span className="tp-chip-dot" />
              Contact
            </div>

            <h1 id={`${formId}-title`} className="tp-title">
              {title || "Contact & Devis personnalisé"}
            </h1>

            <p className="tp-subtitle">
              Indiquez votre besoin : objectif, pages, fonctionnalités, délai.
              <br />
              Je vous répondrai rapidement avec un plan et une estimation.
            </p>
          </div>

          <button
            type="button"
            onClick={onHide}
            disabled={submitting}
            className="tp-btn-close"
            aria-label="Fermer la fenêtre"
          >
            ✕
          </button>
        </div>

        {/* Alert */}
        {status.message && (
          <div
            ref={alertRef}
            tabIndex={-1}
            className={`tp-alert ${alertVariant}`}
            role={status.type === "danger" ? "alert" : "status"}
            aria-live={status.type === "danger" ? "assertive" : "polite"}
          >
            <span className="tp-alert-icon" aria-hidden="true">
              {alertIcon}
            </span>
            <div className="tp-alert-text">{status.message}</div>
          </div>
        )}

        {/* Body */}
        <div className="tp-modal-body">
          <form onSubmit={handleSubmit} aria-busy={submitting}>
            {/* Honeypot anti-bot */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="tp-grid">
              <div>
                <label htmlFor={`${formId}-name`} className="tp-label">
                  Nom & Prénom *
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom complet"
                  className="tp-input"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-email`} className="tp-label">
                  Adresse email *
                </label>
                <input
                  id={`${formId}-email`}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="vous@email.com"
                  className="tp-input"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-phone`} className="tp-label">
                  Téléphone *
                </label>
                <input
                  id={`${formId}-phone`}
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="06 12 34 56 78"
                  className="tp-input"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-subject`} className="tp-label">
                  Sujet *
                </label>
                <input
                  id={`${formId}-subject`}
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  placeholder="Demande de devis — site vitrine"
                  className="tp-input"
                />
              </div>

              <div>
                <label htmlFor={`${formId}-message`} className="tp-label">
                  Votre message *
                </label>
                <textarea
                  id={`${formId}-message`}
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="Décrivez votre projet : objectif, pages, délai…"
                  className="tp-input tp-textarea"
                />
                <p className="tp-help">Exemple : « Site vitrine 4 pages, mise en ligne sous 2 semaines ».</p>
              </div>
            </div>

            {/* Footer */}
            <div className="tp-modal-footer">
              <p className="tp-consent">En envoyant ce formulaire, vous acceptez d’être recontacté.</p>

              <button type="submit" disabled={submitting} className="tp-btn-submit">
                {submitting ? (
                  <>
                    <span className="tp-spinner" />
                    Envoi en cours…
                  </>
                ) : (
                  "Envoyer le message"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
