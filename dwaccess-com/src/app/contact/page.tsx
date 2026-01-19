// dwaccess-com/src/app/contact/page.tsx

import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez-moi pour un devis : site vitrine, application web, SEO, maintenance.",
};

export default function ContactPage() {
  return (
    <div className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Contact</h1>
        <p className="mt-3 max-w-2xl text-sm text-black/70 md:text-base">
          Dis-moi ce que tu veux construire (objectif, pages, fonctionnalités, délai). Je réponds
          rapidement avec un plan et une estimation.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="border border-black/15 bg-white p-6 rounded-3xl shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-xl px-3 py-1 text-xs text-black/70">
            <p className="text-sm font-semibold">Coordonnées</p>

            <div className="mt-4 space-y-3 text-sm text-black/70">
              <p>
                <span className="font-medium text-black">Email :</span>{" "}
                <a className="underline decoration-black/20 underline-offset-4 hover:decoration-black" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </p>

              {siteConfig.linkedin ? (
                <p>
                  <span className="font-medium text-black">LinkedIn :</span>{" "}
                  <a className="underline decoration-black/20 underline-offset-4 hover:decoration-black" href={siteConfig.linkedin} target="_blank" rel="noreferrer">
                    Profil
                  </a>
                </p>
              ) : null}

              {siteConfig.whatsapp ? (
                <p>
                  <span className="font-medium text-black">WhatsApp :</span>{" "}
                  <a className="underline decoration-black/20 underline-offset-4 hover:decoration-black" href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
                    Discuter
                  </a>
                </p>
              ) : null}

              <p>
                <span className="font-medium text-black">GitHub :</span>{" "}
                <a className="underline decoration-black/20 underline-offset-4 hover:decoration-black" href={siteConfig.github} target="_blank" rel="noreferrer">
                  {siteConfig.github}
                </a>
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 bg-black/5 p-4 text-sm text-black/70">
              <p className="font-medium text-black">Pour un devis rapide, indique :</p>
              <ul className="mt-2 list-disc pl-5">
                <li>Ton activité + objectif du site/app</li>
                <li>Pages / fonctionnalités attendues</li>
                <li>Délai souhaité</li>
                <li>Exemples de sites que tu aimes (si tu en as)</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-black/12 bg-white/60 backdrop-blur-xl p-6 shadow-sm">
            <p className="text-sm font-semibold">Formulaire</p>
            <p className="mt-2 text-sm text-black/70">
              Envoi direct par email via serveur SMTP.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
