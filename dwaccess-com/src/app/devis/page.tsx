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
    <div className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Demander un devis</h1>
        <p className="mt-3 max-w-2xl text-sm text-black/70 md:text-base">
          Réponds à 4 questions et je te renvoie une estimation + un plan d’action.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="border border-black/15 bg-white p-6 rounded-3xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl px-3 py-1 text-xs text-black/70">
            <p className="text-sm font-semibold">Ce que j’ai besoin de savoir</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-black/70">
              <li>Ton activité + objectif (vendre, crédibilité, prise de RDV…)</li>
              <li>Pages souhaitées (Accueil, Services, Projets, Contact…)</li>
              <li>Deadline (date)</li>
              <li>Budget indicatif (même une fourchette)</li>
            </ul>

            <div className="mt-6">
              <a
                href={`mailto:${siteConfig.email}?subject=Demande%20de%20devis&body=Bonjour%20Azed%2C%0A%0AActivit%C3%A9%20%3A%20...%0AObjectif%20%3A%20...%0APages%20%2F%20fonctionnalit%C3%A9s%20%3A%20...%0AD%C3%A9lai%20%3A%20...%0ABudget%20%3A%20...%0A%0AMerci%20!`}
                className="inline-flex rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white hover:bg-black/90"
              >
                Envoyer une demande de devis
              </a>
            </div>
          </div>

          <div className="border border-black/15 bg-white p-6 rounded-3xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl px-3 py-1 text-xs text-black/70">
            <p className="text-sm font-semibold">Ou sinon… contact classique</p>
            <p className="mt-2 text-sm text-black/70">
              Si tu préfères discuter avant, passe par la page contact.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex rounded-2xl border border-black/15 bg-white px-6 py-3 text-sm font-medium hover:bg-black/5"
              >
                Aller à Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
