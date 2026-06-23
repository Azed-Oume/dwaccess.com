// src/app/services/creation-site-internet/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import OpenContactButton from "@/app/modal/OpenContactButton";

export const metadata: Metadata = {
  title: "Création de site internet à Argenteuil — Développeur web",
  description:
    "Création de site internet professionnel à Argenteuil et en Île-de-France. Site vitrine, landing page ou site multipage : design moderne, SEO technique, responsive et rapide. Devis gratuit sous 24 h.",
  alternates: { canonical: "https://dwaccess.fr/services/creation-site-internet" },
};

const steps = [
  {
    num: "01",
    title: "Cadrage",
    desc: "On définit ensemble l'objectif du site, les pages nécessaires, la cible et le ton. Un brief clair évite les allers-retours inutiles.",
  },
  {
    num: "02",
    title: "Design & intégration",
    desc: "Maquette sobre et moderne, intégrée en Next.js avec Tailwind. Mobile-first par défaut, rapide sur tous les appareils.",
  },
  {
    num: "03",
    title: "SEO technique",
    desc: "Balises titre, meta description, OpenGraph, données structurées JSON-LD, sitemap et robots.txt configurés dès le départ.",
  },
  {
    num: "04",
    title: "Déploiement",
    desc: "Mise en ligne sur Vercel ou VPS, HTTPS, nom de domaine, redirections propres. Le site est prêt à indexer.",
  },
];

const faqs = [
  {
    q: "Combien coûte un site vitrine ?",
    a: "Un site vitrine professionnel démarre à 490 € HT. Le prix final dépend du nombre de pages, des fonctionnalités (formulaire, carte, galerie) et du niveau de personnalisation.",
  },
  {
    q: "Combien de temps pour livrer un site ?",
    a: "Entre 1 et 3 semaines selon la complexité. Un site 3 pages avec contenu fourni peut être livré en moins de 10 jours.",
  },
  {
    q: "Vous intervenez où ?",
    a: "Basé à Argenteuil (95), j'interviens sur tout le Val-d'Oise et l'Île-de-France. Les échanges se font à distance ou en présentiel selon votre préférence.",
  },
  {
    q: "Le site sera-t-il bien référencé ?",
    a: "Le SEO technique de base (structure, vitesse, métadonnées, données structurées) est inclus dans toutes mes réalisations. Le référencement naturel se construit dans la durée : je vous guide sur les étapes suivantes.",
  },
];

export default function CreationSiteInternetPage() {
  return (
    <section className="section-home">
      <div className="mx-auto max-w-6xl">
        <div className="badge-bg">
          <span className="badge-dot-2" />
          Création de site internet
        </div>

        {/* H1 */}
        <h1 className="badge-title">
          Création de site internet à Argenteuil
        </h1>
        <p className="badge-text">
          Développeur web indépendant basé à Argenteuil, je conçois des sites vitrines
          professionnels pour artisans, TPE, professions libérales et startups d'Île-de-France.
          Code propre, design soigné, SEO intégré dès le départ.
        </p>

        {/* Offre */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Site vitrine 1 à 5 pages",
              price: "à partir de 490 € HT",
              items: ["Design responsive mobile-first", "SEO technique de base", "Formulaire de contact", "HTTPS + déploiement"],
            },
            {
              title: "Landing page conversion",
              price: "à partir de 390 € HT",
              items: ["Page unique orientée action", "Copywriting structuré", "CTA et formulaire", "Vitesse maximale"],
            },
            {
              title: "Site multipage sur mesure",
              price: "Devis sur demande",
              items: ["Architecture sur mesure", "Blog / actualités", "SEO avancé par page", "Maintenance incluse 1 mois"],
            },
          ].map((o) => (
            <article key={o.title} className="badge-article flex flex-col">
              <h2 className="badge-article-title">{o.title}</h2>
              <p className="mt-1 text-sm font-semibold" style={{ color: "var(--gold)" }}>{o.price}</p>
              <ul className="mt-4 space-y-2 text-sm flex-1" style={{ color: "var(--fg-muted)" }}>
                {o.items.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "var(--gold)" }} />
                    {x}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Process */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold" style={{ color: "var(--fg)" }}>
            Comment ça se passe ?
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {steps.map((s) => (
              <article key={s.num} className="badge-article">
                <span className="text-2xl font-bold" style={{ color: "var(--gold)" }}>{s.num}</span>
                <h3 className="badge-article-title mt-2">{s.title}</h3>
                <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Pourquoi choisir un dev indé */}
        <article className="badge-article mt-8">
          <h2 className="badge-article-title text-lg">Pourquoi faire appel à un développeur indépendant à Argenteuil ?</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            <p>
              Une agence web facture des frais de structure. Un développeur freelance local vous offre
              un interlocuteur unique, disponible, qui connaît votre marché et votre territoire.
              Vous parlez directement à la personne qui code.
            </p>
            <p>
              Je travaille sur Argenteuil, Cergy, Bezons, Colombes et tout le Val-d'Oise.
              Les réunions de cadrage peuvent se faire en présentiel ou en visio selon votre préférence.
              Délais tenus, devis respecté.
            </p>
          </div>
        </article>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold" style={{ color: "var(--fg)" }}>Questions fréquentes</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <article key={f.q} className="badge-article">
                <h3 className="badge-article-title">{f.q}</h3>
                <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>{f.a}</p>
              </article>
            ))}
          </div>
        </div>

        {/* CTA */}
        <article className="badge-article mt-8 text-center">
          <h2 className="text-xl font-semibold" style={{ color: "var(--fg)" }}>
            Vous avez un projet de site internet ?
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            Décrivez votre activité et vos besoins — je vous réponds avec une estimation claire sous 24 h.
          </p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <OpenContactButton 