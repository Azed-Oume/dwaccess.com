// src/components/Proofs.tsx
const items = [
  {
    title: "Accompagnement humain",
    desc: "Tu restes maître du projet. Je conseille, j’exécute, et je m’adapte en cours de route.",
  },
  {
    title: "Stack moderne & solide",
    desc: "React / Next.js / Node / SQL. Une base propre pour évoluer sans tout casser.",
  },
  {
    title: "SEO & performance",
    desc: "Structure, metadata, vitesse, accessibilité : un site qui rank et qui charge vite.",
  },
  {
    title: "Déploiement & suivi",
    desc: "Mise en ligne, DNS, SSL, monitoring basique, correctifs et maintenance.",
  },
];

export default function Proofs() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 
                        px-3 py-1 text-xs text-white/80">
          <span className="h-2 w-2 rounded-full bg-sky-400" />
          Pourquoi travailler avec moi
        </div>

        {/* Titre */}
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Un accompagnement fiable & propre
        </h2>

        {/* Sous-titre */}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Un site pro doit être solide, rapide et durable. Voici ce qui change tout dans ma méthode.
        </p>

        {/* Cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl
                        shadow-[0_1px_0_rgba(255,255,255,0.06)]
                        transition-all duration-200 ease-out 
                        hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
            >
              <p className="text-sm font-semibold text-white">{it.title}</p>
              <p className="mt-2 text-sm text-white/70">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
