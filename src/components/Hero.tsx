//  dwaccess-com/src/components/Hero.tsx

"use client";

import Link from "next/link";
import { siteConfig } from "@/content/site";
import { hero } from "@/content/hero";
import OpenContactButton from "@/app/modal/OpenContactButton";

export default function Hero() {

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
          <OpenContactButton />
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
