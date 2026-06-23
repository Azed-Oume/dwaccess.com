// src/app/services/developpement-application-web/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import OpenContactButton from "@/app/modal/OpenContactButton";

export const metadata: Metadata = {
  title: "Développement application web sur mesure — React & Node.js",
  description:
    "Développement d'applications web métier sur mesure en React et Node.js. Dashboard, SaaS, espace client, logiciel de gestion : architecture solide, évolutive et sécurisée. Basé à Argenteuil, Île-de-France.",
  alternates: { canonical: "https://dwaccess.fr/services/developpement-application-web" },
};

const useCases = [
  {
    title: "Logiciel de gestion métier",
    desc: "Remplacez vos tableurs par une application sur mesure : gestion des clients, des stocks, des plannings ou de la facturation. Interface claire, règles métier personnalisées.",
  },
  {
    title: "Application SaaS",
    desc: "Vous avez une idée de produit ? Je construis votre MVP : authentification, espace utilisateur, abonnements, back-office d'administration.",
  },
  {
    title: "Dashboard & reporting",
    desc: "Visualisez vos données en temps réel : tableaux de bord interactifs, graphiques, exports, rôles et permissions par profil.",
  },
  {
    title: "API & back-end Node.js",
    desc: "Besoin d'une API REST robuste ? Architecture Express / Node.js, base SQL, validation des données, sécurité et documentation.",
  },
];

const stack = [
  { name: "React", desc: "Interface utilisateur composants réutilisables, SPA ou hybride" },
  { name: "Next.js", desc: "SSR, SSG, routing avancé, performance et SEO" },
  { name: "Node.js / Express", desc: "API REST, middlewares, authentification JWT" },
  { name: "PostgreSQL / MySQL", desc: "Modélisation relationnelle, migrations, Sequelize ORM" },
  { name: "TypeScript", desc: "Code typé, moins de bugs, meilleure maintenabilité" },
  { name: "Tailwind CSS", desc: "Design system cohérent, rapide à itérer" },
];

export default function DeveloppementApplicationWebPage() {
  return (
    <section className="section-home">
      <div className="mx-auto max-w-6xl">
        <div className="badge-bg">
          <span className="badge-dot-2" />
          Application web
        </div>

        {/* H1 */}
        <h1 className="badge-title">
          Développement d'application web sur mesure
        </h1>
        <p className="badge-text">
          Vous avez besoin d'un outil métier, d'un SaaS ou d'un espace client ?
          Je développe des applications web React / Node.js robustes et évolutives,
          pensées pour durer et faciles à faire évoluer.
        </p>

        {/* Cas d'usage */}
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {useCases.map((u) => (
            <article key={u.title} className="badge-article">
              <h2 className="badge-article-title">{u.title}</h2>
              <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>{u.desc}</p>
            </article>
          ))}
        </div>

        {/* Stack */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold" style={{ color: "var(--fg)" }}>Stack technique</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            Des technologies éprouvées, choisies pour leur fiabilité et leur écosystème.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {stack.map((s) => (
              <article key={s.name} className="badge-article">
                <h3 className="text-sm font-semibold" style={{ color: "var(--gold)" }}>{s.name}</h3>
                <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Approche */}
        <article className="badge-article mt-8">
          <h2 className="badge-article-title text-lg">Mon approche : MVP d'abord, évolution ensuite</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3 text-sm" style={{ color: "var(--fg-muted)" }}>
            <div>
              <p className="font-semibold mb-1" style={{ color: "var(--fg)" }}>Phase 1 — Cadrage</p>
              <p>On définit le périmètre fonctionnel minimum viable : ce qui doit marcher le jour J, ce qui peut attendre.</p>
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: "var(--fg)" }}>Phase 2 — Développement itératif</p>
              <p>Livraisons régulières, feedback rapide. Vous voyez l'application évoluer semaine après semaine.</p>
            </div>
            <div>
              <p className="font-semibold mb-1" style={{ color: "var(--fg)" }}>Phase 3 — Industrialisation</p>
              <p>Tests, documentation, déploiement en production. L'application est stable, sécurisée et prête à monter en charge.</p>
            </div>
          </div>
        </article>

        {/* Tarif */}
        <article className="badge-article mt-4">
          <h2 className="badge-article-title">Quel budget prévoir ?</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            Une application web sur mesure démarre à <span style={{ color: "var(--gold)", fontWeight: 600 }}>1 490 € HT</span> pour
            un MVP simple (authentification + une fonctionnalité core). Le prix dépend du nombre
            de rôles, du volume de données et des intégrations tierces. Je fournis toujours un devis
            détaillé avant de démarrer.
          </p>
        </article>

        {/* CTA */}
        <article className="badge-article mt-8 text-center">
          <h2 className="text-xl font-semibold" style={{ color: "var(--fg)" }}>
            Parlons de votre projet
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            Décrivez votre besoin — fonctionnalités clés, utilisateurs, contraintes. Je vous réponds avec une approche et une estimation sous 24 h.
          </p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <OpenContactButton