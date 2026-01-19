// dwaccess-com/src/components/ContactForm.tsx

"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<boolean | null>(null);
  const [error, setError] = useState<string>("");

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (loading) return;
  setLoading(true);
  setOk(null);
  setError("");

  const form = e.currentTarget; // ✅ on garde la référence tout de suite
  const fd = new FormData(form);

  const payload = {
    name: String(fd.get("name") || ""),
    email: String(fd.get("email") || ""),
    subject: String(fd.get("subject") || ""),
    message: String(fd.get("message") || ""),
    website: String(fd.get("website") || ""),
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data.ok === false) {
      setOk(false);
      setError(data.error || `Erreur HTTP ${res.status}`);
      return;
    }

    setOk(true);
    setError("");
    form.reset(); // ✅ plus de null
  } catch (err) {
    console.error("CONTACT_FORM_CATCH:", err);
    setOk(false);
    setError("Impossible d’envoyer le message. Réessaie.");
  } finally {
    setLoading(false);
  }
}

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-black/12 bg-white/60 backdrop-blur-xl p-6 shadow-sm"
    >
      {/* Honeypot anti-bot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        aria-label="Champ anti-spam"
      />
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">Nom</label>
          <input
            id="name"
            name="name"
            required
            className="mt-2 w-full rounded-2xl border border-black/12 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
            placeholder="Azed"
          />
        </div>

        <div> 
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-2xl border border-black/12 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
            placeholder="az@exemple.com"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
        <input
          id="subject"
          name="subject"
          required
          className="mt-2 w-full rounded-2xl border border-black/12 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
          placeholder="Demande de devis — site vitrine"
        />
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-2 w-full resize-none rounded-2xl border border-black/12 bg-white px-4 py-3 text-sm outline-none focus:border-black/30"
          placeholder="Décris ton besoin : objectif, pages, délai, budget (si tu veux)…"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-black/90 disabled:opacity-60"
      >
        {loading ? "Envoi..." : "Envoyer"}
      </button>

      {ok === true ? (
        <p className="mt-4 text-sm text-green-700">Message envoyé ✅ Je te réponds rapidement.</p>
      ) : null}

      {ok === false ? (
        <p className="mt-4 text-sm text-red-700">ERREUR_FROM_CONTACTFORM: ❌ {error}</p>
      ) : null}
    </form>
  );
}
