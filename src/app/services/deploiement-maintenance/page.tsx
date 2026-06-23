// src/app/services/deploiement-maintenance/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import OpenContactButton from "@/app/modal/OpenContactButton";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Déploiement & maintenance — Mise en ligne, VPS, SSL et suivi",
  description:
    "Mise en ligne professionnelle sur Vercel ou VPS, configuration HTTPS et DNS, correctifs, mises à jour de sécurité et évolutions continues. Basé à Argenteuil, Île-de-France.",
  alternates: { canonical: "https://dwaccess.fr/services/deploiement-maintenance" },
};

const services = [
  {
    title: "Déploiement & mise en ligne",
    desc: "Mise en production propre sur Vercel, VPS (Ubuntu/Debian) ou hébergement mutualisé. Configuration du nom de domaine, DNS, reverse proxy (Apache/Nginx) et certificat SSL Let's Encrypt.",
  },
  {
    title: "HTTPS & sécurité de base",
    desc: "Activation HTTPS, redirections HTTP → HTTPS, headers de sécurité (CSP, HSTS, X-Frame-Options), configuration du pare-feu VPS. Votre site est protégé dès le premier jour.",
  },
  {
    title: "Correctifs & mises à jour",
    desc: "Correction de bugs, mises à jour des dépendances (npm, Next.js, Node.js), patches de sécurité. Je surveille et j'agis avant que ça devienne un problème.",
  },
  {
    title: "Évolutions & nouvelles fonctionnalités",
    desc: "Ajout de pages, nouvelles sections, intégrations tierces (paiement, formulaire, analytics). Le site évolue avec votre activité sans repartir de zéro.",
  },
  {
    title: "Support & suivi",
    desc: "Interlocuteur unique, réponse rapide. Pas de ticket interminable — vous m'écrivez, je regarde. Disponible par e-mail et WhatsApp.",
  },
  {
    title: "Roadmap produit",
    desc: "Pour les projets ambitieux : priorisation des fonctionnalités, planning des itérations, arbitrage technique. On avance ensemble avec une vision claire.",
  },
];

const stack = [
  { name: "Vercel", desc: "Déploiement automatique depuis Git, CDN global, preview par branche" },
  { name: "VPS Linux", desc: "Ubuntu/Debian, PM2, Apache ou Nginx, contrôle total" },
  { name: "Let's Encrypt", desc: "SSL gratuit, renouvellement automatique" },
  { name: "PM2", desc: "Gestionnaire de process Node.js, redémarrage automatique, logs" },
  { name: "GitHub Actions", desc: "CI/CD sur mesure si nécessaire" },
  { name: "DNS & domaine", desc: "OVH, Gandi, Cloudflare — configuration complète" },
];

export default function DeploiementMaintenancePage() {
  return (
    <section className="section-home">
      <div className="mx-auto max-w-6xl">

        <BackButton />

        {/* Badge */}
        <div className="badge-bg">
          <span className="badge-dot-5" />
          Déploiement & maintenance
        </div>

        {/* H1 */}
        <h1 className="badge-title">
          Déploiement & maintenance
        </h1>
        <p className="badge-text">
          La mise en ligne, c'est pas la fin — c'est le début. Je gère le déploiement
          initial, la configuration serveur, puis le suivi dans la durée : correctifs,
          mises à jour, évolutions et support réactif.
        </p>

        {/* Services */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="badge-article">
              <h2 className="badge-article-title">{s.title}</h2>
              <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>{s.desc}</p>
            </article>
          ))}
        </div>

        {/* Stack */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold" style={{ color: "var(--fg)" }}>
            Environnements & outils
          </h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {stack.map((s) => (
              <article key={s.name} className="badge-article">
                <h3 className="text-sm font-semibold" style={{ color: "var(--gold)" }}>{s.name}</h3>
                <p className="mt-1 text-sm" style={{ color: "var(--fg-muted)" }}>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Tarif */}
        <article className="badge-article mt-8">
          <h2 className="badge-article-title">Quel budget prévoir ?</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            Le déploiement initial est inclus dans toutes mes prestations de création.
            Pour la maintenance continue, je propose des forfaits mensuels ou de l'intervention
            au besoin — <span style={{ color: "var(--gold)", fontWeight: 600 }}>devis sur demande</span> selon
            le volume et la criticité du projet.
          </p>
        </article>

        {/* CTA */}
        <article className="badge-article mt-4 text-center">
          <h2 className="text-xl font-semibold" style={{ color: "var(--fg)" }}>
            Votre site a besoin d'un suivi ?
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--fg-muted)" }}>
            Dites-moi ce que vous avez en production et ce dont vous avez besoin. Je vous propose une formule adaptée.
          </p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <OpenContactButton />
            <Link href="/services" className="badge-button">Voir tous les services</Link>
          </div>
        </article>

      </div>
    </section>
  );
}
