// src/components/CaseStudies.tsx
import Link from "next/link";
import { projects } from "@/content/projects";

export default function CaseStudies() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl">

        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-white/80">
          <span className="h-2 w-2 rounded-full bg-violet-400" />
          Projets & réalisations
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Quelques projets représentatifs
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Produits, outils internes, SaaS : du concret, livré proprement.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {projects.map((p) => (
            <div
              key={p.title}
              className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
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

              <p className="mt-4 text-sm text-white/70">
                <span className="font-medium text-white">Point clé :</span> {p.highlight}
              </p>

              {p.links?.length ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {p.links.slice(0, 2).map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              ) : null}

              <div className="mt-6">
                <Link
                  href="/projets"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/6 px-6 py-3 text-sm font-medium text-white hover:bg-white/1"
                >
                  Voir plus
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/projets"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/6 px-6 py-3 text-sm font-medium text-white hover:bg-white/1"
          >
            Voir tous les détails
          </Link>
        </div>

      </div>
    </section>
  );
}
