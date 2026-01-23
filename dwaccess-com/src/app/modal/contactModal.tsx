// dwaccess-com/src/app/modal/contactModal.tsx
"use client";

import React, { useEffect, useId, useState } from "react";
import ContactInfo from "@/components/ContactInfo"; // version propre du bloc info

type Status = { type: "success" | "danger" | ""; message: string };

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

      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || data?.message || `Erreur HTTP ${res.status}`);
      }

      setStatus({
        type: "success",
        message: "Merci ! Votre message a bien été envoyé.",
      });

      setForm(EMPTY_FORM);
      window.setTimeout(() => onHide?.(), 5000);
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

  const alertClass =
    status.type === "success"
      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
      : status.type === "danger"
      ? "border-red-400/30 bg-red-400/10 text-red-100"
      : "border-white/15 bg-white/6 text-white/80";

  return (
    <div className="tp-modal-overlay"
      aria-modal="true"
      role="dialog"
      aria-labelledby={`${formId}-title`}
    >
      {/* Overlay */}
      <button
        type="button"
        onClick={onHide}
        className="absolute inset-0 bg-black/60"
        aria-label="Fermer"
        disabled={submitting}
      />

      {/* Panel */}
      <div className="relative w-full max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Bloc de gauche : infos de contact */}
          <ContactInfo />

          {/* Bloc de droite : formulaire */}
          <div className="tp-modal-card">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 mb-5 px-3 py-3 text-xs text-white/80">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Contact
                </div>

                <h1
                  id={`${formId}-title`}
                  className="text-2xl font-semibold tracking-tight text-white md:text-3xl"
                >
                  {title || "Contact & Devis personnalisé"}
                </h1>

                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Indiquez votre besoin : objectif, pages, fonctionnalités, délai. <br />
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
                className={`mt-5 rounded-2xl border px-4 py-3 text-sm ${alertClass}`}
                role={status.type === "danger" ? "alert" : "status"}
              >
                {status.message}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} aria-busy={submitting} className="mt-6">
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
              <div className="grid gap-4">
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
                    className="tp-input resize-none"
                  />

                  <p className="mt-2 text-xs text-white/55">
                    Exemple : « Site vitrine 4 pages, mise en ligne sous 2 semaines ».
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between flex-col sm:flex-row gap-3">
                <p className="text-xs text-white/50">
                  En envoyant ce formulaire, vous acceptez d’être recontacté.
                </p>

                <button type="submit" disabled={submitting} className="tp-btn-submit">
                  {submitting ? (
                    <>
                      <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/40 border-t-black" />
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
    </div>
  );
}
