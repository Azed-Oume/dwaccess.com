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
        <div className="inline-flex items-center gap-2 font-bold rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm">
          <span className="h-2 w-2 rounded-full bg-zinc-300" />
          Légal
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-4xl">
          Mentions légales
        </h1>

        <div className="mt-10 space-y-8 text-sm md:text-base">
          <h2 className="text-3xl font-semibold tracking-tight ">
            Ce site est édité par{" "}
            <span className="font-bold ">{siteConfig.legalName}</span> —{" "}
            {siteConfig.city}.
          </h2>

          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]">
            <h2 className="font-bold">Éditeur</h2>
            <p className="mt-3">
              Nom commercial : <span className="font-semibold ">{siteConfig.name}</span>
              <br />
              Responsable : <span className="font-semibold">{siteConfig.ownerName}</span>
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
            <h2 className="font-bold">Hébergement</h2>
            <p className="mt-3">
              Hébergement : Vercel, Lws (ou autre selon déploiement).
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]">
            <h2 className="font-bold ">Données personnelles</h2>
            <p className="mt-3">
              Ce site ne collecte pas de données personnelles sans votre consentement.
              Si un formulaire est mis en place, les informations transmises servent uniquement à répondre à votre demande.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]">
            <h2 className="font-bold ">Cookies</h2>
            <p className="mt-3">
              Ce site peut utiliser des cookies techniques et/ou de mesure d’audience (optionnel).
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]">
            <h2 className="font-bold ">Propriété intellectuelle</h2>
            <p className="mt-3">
              Le contenu de ce site (textes, visuels, code) est protégé. Toute reproduction non autorisée est interdite.
            </p>
          </div>

          <p >
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>
      </div>
    </section>
  );
}
