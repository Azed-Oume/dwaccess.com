// src/components/Process.tsx
const steps = [
  {
    title: "1) Cadrage",
    desc: "Objectif, pages, fonctionnalités, contenu, planning. On évite les surprises.",
  },
  {
    title: "2) Design & structure",
    desc: "Wireframe simple → structure SEO → UI premium et lisible.",
  },
  {
    title: "3) Développement",
    desc: "Implémentation propre, responsive, perf, et validation régulière.",
  },
  {
    title: "4) Mise en ligne",
    desc: "Déploiement, DNS/SSL, analytics (si voulu), et plan de maintenance.",
  },
];

export default function Process() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-white/80">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          Méthode
        </div>

        {/* Titre */}
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Process simple & carré
        </h2>

        {/* Sous-titre */}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Transparent, efficace, sans flou : tu sais toujours où on en est.
        </p>

        {/* Cards */}
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
