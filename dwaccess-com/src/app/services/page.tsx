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
    desc: "Idéal pour présenter ton activité, inspirer confiance et capter des demandes.",
    bullets: [
      "Structure SEO + pages rapides",
      "Design moderne + responsive",
      "Contenu clair orienté conversion",
      "Mise en ligne + HTTPS",
    ],
  },
  {
    title: "Application web",
    desc: "Quand tu as besoin d’un dashboard, d’un espace client, d’une logique métier.",
    bullets: [
      "Front React/Next.js",
      "API Node/Express (si nécessaire)",
      "Base SQL + Sequelize",
      "Rôles, auth, admin",
    ],
  },
  {
    title: "SEO technique & performance",
    desc: "Tu veux rank et charger vite, sans sacrifier le design.",
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
    <div className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Services</h1>
        <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
          Du site vitrine au produit SaaS : je construis des bases propres et évolutives,
          avec une approche claire et orientée résultat.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {blocks.map((b) => (
            <div key={b.title} className="border border-black/15 bg-white p-6 rounded-3xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl">
              <p className="text-sm text-black font-semibold">{b.title}</p>
              <p className="mt-2 text-sm text-black/70">{b.desc}</p>
              <ul className="mt-4 space-y-2 text-sm text-black/70">
                {b.bullets.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-black/60" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border border-black/15 bg-white p-6 rounded-3xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl mt-4">
          <p className="text-sm text-black font-semibold">Tu veux un devis rapide ?</p>
          <p className="mt-2 text-sm text-black/70">
            Explique ton besoin (objectif, pages/fonctionnalités, délai). Je te réponds avec
            une proposition claire.
          </p>
          <div className="mt-4">
            <Link
              href="/contact"
              className="inline-flex rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
