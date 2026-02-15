// src/components/Offers.tsx
"use client";

import OpenContactButton from "@/app/modal/OpenContactButton";
import { offers } from "@/content/offers";


export default function Offers() {
  
  return (
    <section className="section-home">
      <article className="mx-auto max-w-6xl">

        <div className="badge-bg">
          <span className="badge-dot-3" />
          Services proposés
        </div>

        <h2 className="badge-title">
          Services & prestations
        </h2>

        <p className="badge-text">
          Des solutions durables, performantes et construites avec soin.
        </p>

        <aside className="mt-12 grid gap-4 md:grid-cols-3">
          {offers.map((o) => (
            <article
              key={o.title}
              className="badge-article">
              <h2 className="badge-article-title">{o.title}</h2>
              <p className="badge-article-text">{o.price}</p>

              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {o.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-white/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </aside>
        <div className="mt-6 flex  justify-center ">
          <OpenContactButton />
        </div>
      </article>
    </section>
  );
}
