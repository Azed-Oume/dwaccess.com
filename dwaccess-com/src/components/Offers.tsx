// src/components/Offers.tsx
import Link from "next/link";

const offers = [
  {
    title: "Site vitrine (pro)",
    price: "à partir de 900€",
    bullets: [
      "1 à 5 pages",
      "Design premium + responsive",
      "SEO technique de base",
      "Performance & accessibilité",
      "Déploiement + HTTPS",
    ],
  },
  {
    title: "Application web",
    price: "à partir de 2 500€",
    bullets: [
      "Front React/Next",
      "API Node/Express (si besoin)",
      "Auth / dashboard / admin",
      "Base de données (SQL)",
      "Évolutivité & règles métier",
    ],
  },
  {
    title: "Maintenance & évolutions",
    price: "forfait / mensuel",
    bullets: [
      "Correctifs & améliorations",
      "Sécurité & mises à jour",
      "Optimisations SEO/perf",
      "Support & suivi",
      "Roadmap produit",
    ],
  },
];

export default function Offers() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 
                        px-3 py-1 text-xs text-white/80">
          <span className="h-2 w-2 rounded-full bg-indigo-400" />
          Services proposés
        </div>

        {/* Titre */}
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Services & prestations
        </h2>

        {/* Sous-titre */}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Des solutions propres, performantes et faites pour durer.
        </p>

        {/* Cards */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {offers.map((o) => (
            <div
              key={o.title}
              className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl
                         shadow-[0_1px_0_rgba(255,255,255,0.06)]
                         transition-all duration-200 ease-out 
                         hover:-translate-y-1 hover:border-white/20 hover:bg-white/8"
            >
              <p className="text-sm font-semibold text-white">{o.title}</p>
              <p className="mt-2 text-sm text-white/70">{o.price}</p>

              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {o.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90">
                  Demander un devis
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
