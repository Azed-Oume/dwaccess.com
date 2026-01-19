// dwaccess-com/src/app/devis/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Demander un devis",
  description: "Demande de devis : site vitrine, application web, SEO, maintenance.",
};

export default function DevisPage() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-white/80">
          <span className="h-2 w-2 rounded-full bg-sky-400" />
          Devis
        </div>

        {/* Titre */}
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Demander un devis
        </h1>

        {/* Intro */}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Réponds à 4 questions et je te renvoie une estimation + un plan d’action.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {/* Card 1 */}
          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8">
            <p className="text-sm font-semibold text-white">Ce que j’ai besoin de savoir</p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
              <li>Ton activité + objectif (vendre, crédibilité, prise de RDV…)</li>
              <li>Pages souhaitées (Accueil, Services, Projets, Contact…)</li>
              <li>Deadline (date)</li>
              <li>Budget indicatif (même une fourchette)</li>
            </ul>

            <div className="mt-6">
              <a
                href={`mailto:${siteConfig.email}?subject=Demande%20de%20devis&body=Bonjour%20Azed%2C%0A%0AActivit%C3%A9%20%3A%20...%0AObjectif%20%3A%20...%0APages%20%2F%20fonctionnalit%C3%A9s%20%3A%20...%0AD%C3%A9lai%20%3A%20...%0ABudget%20%3A%20...%0A%0AMerci%20!`}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
              >
                Envoyer une demande de devis
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8">
            <p className="text-sm font-semibold text-white">Ou sinon… contact classique</p>
            <p className="mt-2 text-sm text-white/70">
              Si tu préfères discuter avant, passe par la page contact.
            </p>

            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/6 px-6 py-3 text-sm font-medium text-white hover:bg-white/1"
              >
                Aller à Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
