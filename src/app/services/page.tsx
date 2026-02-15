// dwaccess-com/src/app/services/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import OpenContactButton from "../modal/OpenContactButton";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Création de sites vitrines, développement d’applications web, SEO technique, déploiement et maintenance.",
};

const blocks = [
  {
    title: "Site vitrine (pro)",
    desc: "Idéal pour présenter votre activité, inspirer confiance et capter des demandes.",
    bullets: [
      "Structure SEO et pages rapides",
      "Design moderne et responsive",
      "Contenu clair orienté conversion",
      "Mise en ligne + HTTPS",
    ],
  },
  {
    title: "Application web",
    desc: "Quand vous avez besoin d’un dashboard, d’un espace client ou d’une logique métier.",
    bullets: [
      "Front React / Next.js",
      "API Node / Express (si nécessaire)",
      "Base SQL + Sequelize",
      "Rôles, auth, admin",
    ],
  },
  {
    title: "SEO technique & performance",
    desc: "Pour se positionner et charger vite, sans sacrifier le design.",
    bullets: [
      "Optimisation vitesse (LCP/CLS)",
      "Metadata, OpenGraph",
      "Structure sémantique",
      "Bonnes pratiques accessibilité",
    ],
  },
  {
    title: "Déploiement & maintenance",
    desc: "Mise en ligne propre, suivi, correctifs et évolutions.",
    bullets: [
      "Vercel / VPS / DNS",
      "SSL, redirections",
      "Correctifs et mises à jour",
      "Support & roadmap",
    ],
  },
];

export default function ServicesPage() {
  return (
    <section className="section-home">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="badge-bg">
          <span className="badge-dot-3" />
          Services
        </div>

        {/* Titre */}
        <h1 className="badge-title">
          Services
        </h1>
        {/* Sous-titre */}
        <p className="badge-text">
          Du site vitrine au produit SaaS : je construis des bases propres et évolutives,
          avec une approche claire et orientée résultat.
        </p>
        {/* Cards */}
        <section className="mt-12 grid gap-4 md:grid-cols-2">
          {blocks.map((b) => (
            <article
              key={b.title}
              className="badge-article"
            >
              <h2 className="badge-article-title">{b.title}</h2>
              <p className="badge-article-text">{b.desc}</p>

              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {b.bullets.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>
        {/* CTA bas de page */}
        <section className="badge-article mt-5">
          <article className="flex flex-col items-center text-center">
              <h2 className="text-xl font-semibold text-white">
                Vous souhaitez un devis rapide ?
              </h2>
              <p className="mt-2 text-xl text-white max-w-xl">
                Expliquez votre besoin (objectif, pages/fonctionnalités, délai).
                Je vous répondrai avec une proposition claire.
              </p>
            {/* Boutons */}
            <nav className="mt-8 flex justify-center gap-3 sm:flex-row">
              <OpenContactButton />
              <Link
                href="/projets"
                className="badge-button"
              >
                Voir des exemples
              </Link>
            </nav>
          </article>
        </section>
      </div>
    </section>
  );
}
