// src/components/Process.tsx
const steps = [
  {
    title: "1) Cadrage",
    desc: "Objectifs, pages, fonctionnalités, contenu, planning. On évite les mauvaises surprises.",
  },
  {
    title: "2) Design & structure",
    desc: "Wireframe simple → structure SEO → interface lisible et professionnelle.",
  },
  {
    title: "3) Développement",
    desc: "Implémentation propre, responsive, performante, avec validations régulières.",
  },
  {
    title: "4) Mise en ligne",
    desc: "Déploiement, DNS/SSL, analytics (si souhaités) et plan de maintenance.",
  },
];

export default function Process() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl">

        <div className="inline-flex items-center gap-2 font-bold rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          Méthode
        </div>

        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Process simple & efficace
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Transparent, clair et structuré : vous savez toujours exactement où nous en sommes.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
            >
              <p className="text-sm font-semibold text-white">{s.title}</p>
              <p className="mt-2 text-sm text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
