// src/components/CTA.tsx
import Link from "next/link";
import { siteConfig } from "@/content/site";

export default function CTA() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-white/80">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Contact
        </div>

        {/* Titre */}
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          On en parle ?
        </h2>

        {/* Sous-titre */}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Décris-moi ton besoin (site vitrine, app web, refonte, SEO). Je te réponds avec une
          approche claire, un plan d’action, et une estimation.
        </p>

        {/* Bloc CTA en card (même style HERO cards) */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
            >
              Contact / devis
            </Link>

            {siteConfig.github ? (
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/6 px-6 py-3 text-sm font-medium text-white hover:bg-white/1"
              >
                Voir mon GitHub
              </a>
            ) : null}
          </div>

          <p className="mt-4 text-sm text-white/70">
            Réponse rapide + proposition claire. Si tu as déjà un site : audit express possible.
          </p>
        </div>
      </div>
    </section>
  );
}
