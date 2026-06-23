// src/app/services/seo-technique/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import OpenContactButton from "@/app/modal/OpenContactButton";

export const metadata: Metadata = {
  title: "SEO technique — Audit & optimisation référencement naturel",
  description:
    "Audit SEO technique, optimisation des Core Web Vitals, données structurées, référencement local Argenteuil. Un développeur web qui optimise le code, pas seulement le contenu.",
  alternates: { canonical: "https://dwaccess.fr/services/seo-technique" },
};

const actions = [
  {
    title: "Audit SEO technique",
    desc: "Analyse complète : vitesse (LCP, CLS, FID), crawlabilité, structure des URLs, balises, données structurées, liens internes, erreurs 404. Livrable : rapport priorisé avec plan d'action.",
  },
  {
    title: "Core Web Vitals",
    desc: "Optimisation des métriques Google : temps de chargement, stabilité visuelle, interactivité. Compression images, lazy loading, code splitting, suppression des ressources bloquantes.",
  },
  {
    title: "Données structurées JSON-LD",
    desc: "Implémentation des schémas Schema.org adaptés à votre activité : LocalBusiness, Service, FAQ, BreadcrumbList. Boost de visibilité dans les résultats enrichis.",
  },
  {
    title: "Référencement local",
    desc: "Optimisation pour les recherches géolocalisées : balisage LocalBusiness, cohérence NAP, pages locales, areaServed. Idéal pour les entreprises d'Argenteuil et du Val-d'Oise.",
  },
  {
    title: "Métadonnées & OpenGraph",
    desc: "Title, meta description, canonical, hreflang, OpenGraph et Twitter Cards correctement configurés sur toutes les pages.",
  },
  {
    title: "Architecture & maillage interne",
    desc: "Structure de site logique, hiérarchie H1/H2/H3 sémantique, maillage interne cohérent qui guide Googlebot et les utilisateurs.",
  },
];

const differences = [
  {
    label: "Développeur, pas consultant",
    desc: "Je n'identifie pas les problèmes sans les corriger. Je corrige directement dans le code — temps de fix : minutes, pas semaines.",
  },
  {
    label: "SEO intégré dès la conception",
    desc: "Quand je crée un site, le SEO technique est inclus par défaut. Pas besoin d'un plugin ou d'un audit 6 mois après la mise en ligne.",
  },
  {
    label: "Performance = SEO",
    desc: "Un site rapide se positionne mieux. J'optimise le code, les images, le rendu — pas seulement les mots-clés.",
  },
];

export default function SeoTechniquePage() {
  return (
    <section className="section-home">
      <div className="mx-auto max-w-6xl">
        <div className="badge-bg">
          <span className="badge-dot-3" />
          SEO technique
        </div>

        {/* H1 */}
        <h1 className="badge-title">
          Optimisation SEO technique
        </h1>
        <p className="badge-text">
          Le SEO de contenu, vous pouvez l'apprendre. Le SEO technique,
          lui, se règle dans le code. En tant que développeur web, j'optimise
          directement la base technique de votre site pour améliorer votre
          visibilité sur Google.
        </p>

        {/* Actions */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {actions.map((a) => (
            <article key={a.title} className="badge-article">
              <h2 className="badge-article-title">{a.title}</h2>
              <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>{a.desc}</p>
            </article>
          ))}
        </div>

        {/* Ce qui me différencie */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold" style={{ color: "var(--fg)" }}>
            Pourquoi un développeur plutôt qu'un consultant SEO ?
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {differences.map((d) => (
              <article key={d.label} className="badge-article">
                <h3 className="badge-article-title">{d.label}</h3>
                <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>{d.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* SEO local */}
        <article className="badge-article mt-8">
          <h2 className="badge-article-title text-lg">Référencement local — Argenteuil & Val-d'Oise</h2>
          <p className="mt-3 text-sm" style={{ color: "var(--fg-muted)" }}>
            Vous êtes artisan, commerçant ou prestataire de services dans le 95 ?
            Le SEO local est votre levier le plus rapide. Je configure votre présence
            technique pour les recherches de proximité : "plombier Argenteuil",
            "avocat Cergy", "restaurant Bezons"...
          </p>
          <ul className="mt-4 grid gap-2 md:grid-cols-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            {[
              "Schéma LocalBusiness avec géolocalisation précise",
              "Pages dédiées par zone géographique",
              "Cohérence NAP (Nom, Adresse, Téléphone)",
              "Optimisation Google Business Profile",
              "Balises areaServed et serviceArea",
              "Contenu local pertinent et indexable",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: "var(--gold)" }} />
                {x}
              </li>
            ))}
          </ul>
        </article>

        {/* CTA */}
        <article className="badge-article mt-8 text-center">
          <h2 className="text-xl font-semibold" style={{ color: "var(--fg)" }}>
            Votre site est-il bien optimisé ?
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            Partagez l'URL de votre site — je regarde et vous dis ce qui bloque votre référencement.
          </p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <OpenContactButton 