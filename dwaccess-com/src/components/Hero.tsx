// src/components/Hero.tsx
import Link from "next/link";
import { siteConfig } from "@/content/site";

export default function Hero() {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-6xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3 py-1 text-xs text-white/80">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Disponible pour missions freelance
        </div>

        {/* Titre */}
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-6xl">
          {siteConfig.headline}
        </h1>

        {/* Sous-titre */}
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          {siteConfig.subheadline}
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
          >
            Me contacter
          </Link>
          <Link
            href="/projets"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/6 px-6 py-3 text-sm font-medium text-white hover:bg-white/1"
          >
            Voir mes projets
          </Link>
        </div>

        {/* 3 cartes */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { title: "Approche", desc: "Cadrage clair, feedback rapide, itérations maîtrisées." },
            { title: "Qualité", desc: "Code maintenable, perf, SEO technique, sécurité de base." },
            { title: "Délais", desc: "Planification simple et livraisons régulières." },
          ].map((x) => (
            <div
              key={x.title}
              className="rounded-3xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/8">
              <p className="text-sm font-semibold text-white">{x.title}</p>
              <p className="mt-2 text-sm text-white/70">{x.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
