// dwaccess-com/src/app/mentions-legales/page.tsx

import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site DWACCESS (Digital Web Access).",
};

export default function MentionsLegalesPage() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-3xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-white/80">
          <span className="h-2 w-2 rounded-full bg-zinc-300" />
          Légal
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Mentions légales
        </h1>

        <div className="mt-10 space-y-8 text-sm text-white/70 md:text-base">
          <p>
            Ce site est édité par{" "}
            <span className="font-semibold text-white">{siteConfig.legalName}</span> —{" "}
            {siteConfig.city}.
          </p>

          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]">
            <h2 className="text-base font-semibold text-white">Éditeur</h2>
            <p className="mt-3">
              Nom commercial : <span className="font-semibold text-white">{siteConfig.name}</span>
              <br />
              Responsable : <span className="font-semibold text-white">{siteConfig.ownerName}</span>
              <br />
              Email :{" "}
              <a
                className="underline underline-offset-4 decoration-white/20 hover:decoration-white/50"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
              </a>
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]">
            <h2 className="text-base font-semibold text-white">Hébergement</h2>
            <p className="mt-3">
              Hébergement : Vercel (ou autre selon déploiement). À compléter si nécessaire.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]">
            <h2 className="text-base font-semibold text-white">Données personnelles</h2>
            <p className="mt-3">
              Ce site ne collecte pas de données personnelles sans votre consentement.
              Si un formulaire est mis en place, les informations transmises servent uniquement à répondre à votre demande.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]">
            <h2 className="text-base font-semibold text-white">Cookies</h2>
            <p className="mt-3">
              Ce site peut utiliser des cookies techniques et/ou de mesure d’audience (optionnel).
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]">
            <h2 className="text-base font-semibold text-white">Propriété intellectuelle</h2>
            <p className="mt-3">
              Le contenu de ce site (textes, visuels, code) est protégé. Toute reproduction non autorisée est interdite.
            </p>
          </div>

          <p className="text-xs text-white/50">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>
      </div>
    </section>
  );
}
