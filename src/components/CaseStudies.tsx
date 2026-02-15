// src/components/CaseStudies.tsx
import Link from "next/link";
import { projects } from "@/content/projects";

export default function CaseStudies() {
  return (
    <section className="section-home">
      <article className="mx-auto max-w-6xl">

        <div className="badge-bg">
          <span className="badge-dot-4" />
          Projets & réalisations
        </div>

        <h2 className="badge-title">
          Quelques projets représentatifs
        </h2>

        <p className="badge-text">
          Produits, outils internes, SaaS : du concret, livré proprement.
        </p>

        <aside className="mt-12 grid gap-4 md:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className="badge-article flex h-full flex-col"
            >
              <p className="text-sm font-semibold text-white">{p.title}</p>
              <p className="mt-2 text-sm text-white/70">{p.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.slice(0, 6).map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-white/70"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <p className="badge-text mb-4">
                <span className="font-medium text-white">Point clé :</span> {p.highlight}
              </p>
                <nav
                  className={`mt-auto flex items-end pb-4 ${
                    p.links?.length ? "justify-around" : "justify-center"
                  }`}
                >
                  {p.links?.length ? (
                    <div className="flex gap-3">
                      {p.links.slice(0, 2).map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="badge-button"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  ) : null}

                  <Link href="/projets" className="badge-button">
                    Voir plus
                  </Link>
                </nav>

            </article>
          ))}
        </aside>
      </article>
    </section>
  );
}
