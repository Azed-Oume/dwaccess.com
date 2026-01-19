// dwaccess-com/src/app/projets/page.tsx
import type { Metadata } from "next";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projets",
  description: "Projets SaaS, outils internes et réalisations web : React, Next.js, Node.js, SQL.",
};

export default function ProjetsPage() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-white/80">
          <span className="h-2 w-2 rounded-full bg-violet-400" />
          Projets
        </div>

        {/* Titre */}
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Projets
        </h1>

        {/* Intro */}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Une sélection de projets représentatifs : plateformes, apps, outils et produits.
          L’idée : montrer une capacité à livrer du concret, pas juste “faire joli”.
        </p>

        {/* Cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
            >
              <h2 className="text-sm font-semibold text-white">{p.title}</h2>
              <p className="mt-2 text-sm text-white/70">{p.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
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
                <div className="mt-5 flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
