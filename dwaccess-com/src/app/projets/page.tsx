// dwaccess-com/src/app/projets/page.tsx

import type { Metadata } from "next";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projets",
  description: "Projets SaaS, outils internes et réalisations web : React, Next.js, Node.js, SQL.",
};

export default function ProjetsPage() {
  return (
    <div className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Projets</h1>
        <p className="mt-3 max-w-2xl text-sm text-white/70 md:text-base">
          Une sélection de projets représentatifs : plateformes, apps, outils et produits.
          L’idée : montrer une capacité à livrer du concret, pas juste “faire joli”.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {projects.map((p) => (
            <article key={p.title} className="border border-black/15 bg-white p-6 rounded-3xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl">
              <h2 className="text-sm text-black font-semibold">{p.title}</h2>
              <p className="mt-2 text-sm text-black/70">{p.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="border border-black/15 bg-white p-6 rounded-3xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl px-3 py-1 text-xs text-black/70"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-sm text-black/70">
                <span className="font-medium text-black">Point clé :</span> {p.highlight}
              </p>

              {p.links?.length ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-black underline decoration-black/20 underline-offset-4 hover:decoration-black"
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
    </div>
  );
}
