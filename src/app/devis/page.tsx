// dwaccess-com/src/app/devis/DevisPage.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import OpenContactButton from "../modal/OpenContactButton";

export const metadata: Metadata = {
  title: "Demander un devis",
  description: "Demande de devis : site vitrine, application web, SEO, maintenance.",
};

export default function DevisPage() {
  return (
    <section className="section-home">
      <div className="mx-auto max-w-6xl">
        <div className="badge-bg">
          <span className="badge-dot-6" />
          Devis
        </div>

        <h1 className="badge-title">
          Demander un devis
        </h1>

        <p className="badge-text">
          Répondez à 4 questions, et je vous renverrai une estimation ainsi qu’un plan d’action.
        </p>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <article className="badge-article">
            <h2 className="badge-article-title">Ce dont j’ai besoin pour estimer</h2>

            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-white/70">
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
          </article>

          <article className="badge-article flex flex-col">
            <h2 className="badge-article-title">
              Ou bien : contact classique
            </h2>

            <p className="mt-2 text-sm text-white/70">
              Si vous préférez échanger avant, vous pouvez passer par la page Contact.
            </p>

            <div className="mt-auto pt-6">
              <OpenContactButton />
            </div>
          </article>

        </section>
      </div>
    </section>
  );
}
