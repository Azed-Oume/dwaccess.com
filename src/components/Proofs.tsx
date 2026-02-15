// src/components/Proofs.tsx
import { proofs } from "@/content/proofs";

export default function Proofs() {
  return (
    <section className="section-home">
      <article className="mx-auto max-w-6xl">

        <div className="badge-bg">
          <span className="badge-dot-2" />
          Pourquoi travailler avec nous
        </div>

        <h2 className="badge-title">
          Un accompagnement fiable & professionnel
        </h2>

        <p className="mt-4 text-lg text-white/70">
          Un site professionnel doit être solide, rapide et évolutif. Voici ce qui fait la différence dans mon approche.
        </p>

        <aside className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {proofs.map((pr) => (
            <article
              key={pr.title}
              className="badge-article"
            >
              <h3 className="badge-article-title">{pr.title}</h3>
              <p className="badge-article-text">{pr.desc}</p>
            </article>
          ))}
        </aside>

      </article>
    </section>
  );
}
