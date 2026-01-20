// dwaccess-com/src/app/services/page.tsx

import type { Metadata } from "next";
import Link from "next/link";

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
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-white/80">
          <span className="h-2 w-2 rounded-full bg-sky-400" />
          Services
        </div>

        {/* Titre */}
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Services
        </h1>

        {/* Sous-titre */}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Du site vitrine au produit SaaS : je construis des bases propres et évolutives,
          avec une approche claire et orientée résultat.
        </p>

        {/* Cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {blocks.map((b) => (
            <div
              key={b.title}
              className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
            >
              <p className="text-sm font-semibold text-white">{b.title}</p>
              <p className="mt-2 text-sm text-white/70">{b.desc}</p>

              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {b.bullets.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/6 px-6 py-3 text-sm font-medium text-white hover:bg-white/1"
                >
                  Discuter de votre besoin
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA bas de page */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8">
          <p className="text-sm font-semibold text-white">Vous souhaitez un devis rapide ?</p>
          <p className="mt-2 text-sm text-white/70">
            Expliquez votre besoin (objectif, pages/fonctionnalités, délai). Je vous répondrai avec
            une proposition claire.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
            >
              Me contacter
            </Link>

            <Link
              href="/projets"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/6 px-6 py-3 text-sm font-medium text-white hover:bg-white/1"
            >
              Voir des exemples
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
