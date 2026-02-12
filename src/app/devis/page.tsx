// dwaccess-com/src/app/devis/DevisPage.tsx

import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import OpenContactButton from "../modal/OpenContactButton";

export const metadata: Metadata = {
  title: "Demander un devis",
  description: "Demande de devis : site vitrine, application web, SEO, maintenance.",
};

export default function DevisPage() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="inline-flex items-center gap-2 font-bold rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm ">
          <span className="h-2 w-2 rounded-full bg-sky-400" />
          Devis
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Demander un devis
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Répondez à 4 questions, et je vous renverrai une estimation ainsi qu’un plan d’action.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8">
            <p className="text-sm font-semibold text-white">Ce dont j’ai besoin pour estimer</p>

            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
              <li>Votre activité et votre objectif (vente, crédibilité, prise de RDV…)</li>
              <li>Les pages souhaitées (Accueil, Services, Projets, Contact…)</li>
              <li>Votre deadline (date)</li>
              <li>Votre budget indicatif (même une fourchette)</li>
            </ul>

            <div className="mt-6">
              <a
                href={`mailto:${siteConfig.email}?subject=Demande%20de%20devis&body=Bonjour%20Azed%2C%0A%0AActivit%C3%A9%20%3A%20...%0AObjectif%20%3A%20...%0APages%20%2F%20fonctionnalit%C3%A9s%20%3A%20...%0AD%C3%A9lai%20%3A%20...%0ABudget%20%3A%20...%0A%0AMerci%20!`}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white px-6 py-3 text-m font-medium text-black hover:bg-white/10"
              >
                Envoyer une demande de devis
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8">
            <p className="text-sm font-semibold text-white">Ou bien : contact classique</p>
            <p className="mt-2 text-sm text-white/70">
              Si vous préférez échanger avant, vous pouvez passer par la page Contact.
            </p>
            <OpenContactButton />
          </div>
        </div>
      </div>
    </section>
  );
}
