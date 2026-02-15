//  dwaccess-com/src/components/Hero.tsx

"use client";

import Link from "next/link";
import { siteConfig } from "@/content/site";
import { useContactModal } from "@/app/modal/ContactModalProvider";
import { hero } from "@/content/hero";

export default function Hero() {
  const { openContact } = useContactModal();

  return (
    <section className="section-home">
      <h1 className="badge-title-hero">
          Sites & applications web rapides, propres et maintenables.
      </h1>
      <article className="mx-auto max-w-6xl">

        {/* Badge */}
        <div className="badge-bg">
          <span className="badge-dot" />
          Disponible pour missions freelance
        </div>

        {/* Titre */}
        <h2 className="badge-title">
          {siteConfig.headline}
        </h2>
        <p className="badge-text">
          {siteConfig.subheadline}
        </p>

        {/* CTA */}
        <nav className="mt-8 flex justify-center gap-3 sm:flex-row">

          {/* Bouton qui ouvre la modal */}
          <button
            type="button"
            onClick={() => openContact("Demande de devis")}
            className="badge-button"
          >
            Nous contacter
          </button>

          <Link
            href="/projets"
            className="badge-button"
          >
            Voir mes projets
          </Link>
        </nav>

        {/* Cartes */}
        <aside className="mt-12 grid gap-4 md:grid-cols-3">
          {hero.map((x) => (
            <article
              key={x.title}
              className="badge-article"
            >
              <h2 className="badge-article-title">{x.title}</h2>
              <p className="badge-article-text">{x.desc}</p>
            </article>
          ))}
        </aside>
      </article>
    </section>
  );
}
