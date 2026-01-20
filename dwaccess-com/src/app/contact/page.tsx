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
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-white/80">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Contact
        </div>

        {/* Titre */}
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Contact
        </h1>

        {/* Intro */}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Indiquez ce que vous souhaitez construire (objectif, pages, fonctionnalités, délai).
          Je vous répondrai rapidement avec un plan et une estimation.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {/* Coordonnées */}
          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8">
            <p className="text-sm font-semibold text-white">Coordonnées</p>

            <div className="mt-4 space-y-3 text-sm text-white/70">
              <p>
                <span className="font-medium text-white">Email :</span>{" "}
                <a
                  className="underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
              </p>

              {siteConfig.linkedin ? (
                <p>
                  <span className="font-medium text-white">LinkedIn :</span>{" "}
                  <a
                    className="underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Profil
                  </a>
                </p>
              ) : null}

              {siteConfig.whatsapp ? (
                <p>
                  <span className="font-medium text-white">WhatsApp :</span>{" "}
                  <a
                    className="underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
                    href={siteConfig.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Discuter
                  </a>
                </p>
              ) : null}

              <p>
                <span className="font-medium text-white">GitHub :</span>{" "}
                <a
                  className="underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
                  href={siteConfig.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  {siteConfig.github}
                </a>
              </p>
            </div>

            {/* Bloc aide */}
            <div className="mt-6 rounded-2xl border border-white/12 bg-white/6 p-4 text-sm text-white/70">
              <p className="font-medium text-white">Pour un devis rapide, merci d’indiquer :</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Votre activité et l’objectif du site / de l’application</li>
                <li>Les pages / fonctionnalités attendues</li>
                <li>Le délai souhaité</li>
                <li>Des exemples de sites que vous appréciez (si vous en avez)</li>
              </ul>
            </div>
          </div>

          {/* Formulaire */}
          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8">
            <p className="text-sm font-semibold text-white">Formulaire</p>
            <p className="mt-2 text-sm text-white/70">
              Envoi direct par email via serveur SMTP.
            </p>

            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
