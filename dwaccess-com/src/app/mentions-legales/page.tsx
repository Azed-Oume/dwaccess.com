// dwaccess-com/src/app/mentions-legales/page.tsx

import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site DWACCESS (Digital Web Access).",
};

export default function MentionsLegalesPage() {
  return (
    <div className="px-4 py-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Mentions légales</h1>

        <div className="prose prose-neutral mt-8 max-w-none">
          <p>
            Ce site est édité par <strong>{siteConfig.legalName}</strong> — {siteConfig.city}.
          </p>

          <h2>Éditeur</h2>
          <p>
            Nom commercial : <strong>{siteConfig.name}</strong>
            <br />
            Responsable : <strong>{siteConfig.ownerName}</strong>
            <br />
            Email : <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>

          <h2>Hébergement</h2>
          <p>
            Hébergement : Vercel / ou autre selon déploiement (à compléter si nécessaire).
          </p>

          <h2>Données personnelles</h2>
          <p>
            Ce site ne collecte pas de données personnelles sans votre consentement.  
            Si un formulaire est mis en place, les données transmises servent uniquement à
            répondre à votre demande.
          </p>

          <h2>Cookies</h2>
          <p>
            Ce site peut utiliser des cookies techniques et/ou de mesure d’audience (optionnel).
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            Le contenu de ce site (textes, visuels, code) est protégé. Toute reproduction non autorisée
            est interdite.
          </p>

          <p className="text-sm text-black/60">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>
        </div>
      </div>
    </div>
  );
}
