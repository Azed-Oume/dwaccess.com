// src/components/CTA.tsx
"use client"

import { useContactModal } from "@/app/modal/ContactModalProvider";
import OpenContactButton from "@/app/modal/OpenContactButton";

export default function CTA() {
  const { openContact } = useContactModal();
  return (
    <section className="section-home">
      <article className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="badge-bg">
          <span className="badge-dot" />
          Contact
        </div>

        {/* Titre */}
        <h2 className="badge-title">
          On en parle ?
        </h2>

        {/* Sous-titre */}
        <p className="badge-text">
          Décrivez votre besoin (site vitrine, application web, refonte, SEO).  
          Je vous répondrai avec une approche claire, un plan d’action et une estimation.
        </p>
          <div className="mt-6 flex  justify-center ">
            <OpenContactButton />
          </div>
          <div className="badge-article mt-4">
            <p className=" text-xl text-bold flex justify-around">
              Réponse rapide et proposition claire.  
              Si vous avez déjà un site : audit express possible.
            </p>
          </div>
        {/* </div> */}
      </article>
    </section>
  );
}
