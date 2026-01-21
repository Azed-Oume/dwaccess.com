// dwaccess-com/src/components/ContactInfo.tsx
import { siteConfig } from "@/content/site";

export default function ContactInfo() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]">
      <div className="space-y-3 text-sm text-white/70">
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

        {siteConfig.github ? (
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
        ) : null}
      </div>

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
  );
}
