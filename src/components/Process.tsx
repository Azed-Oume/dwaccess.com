// src/components/Process.tsx
import { process } from "@/content/process";

export default function Process() {
  return (
    <section className="section-home">
      <article className="mx-auto max-w-6xl">

        <div className="badge-bg">
          <span className="badge-dot-5" />
          Méthode
        </div>

        <h2 className="badge-title">
          Process simple & efficace
        </h2>

        <p className="badge-text">
          Transparent, clair et structuré : vous savez toujours exactement où nous en sommes.
        </p>

        <aside className="mt-12 grid gap-4 md:grid-cols-4">
          {process.map((p) => (
            <article
              key={p.title}
              className="badge-article"
            >
              <p className="badge-article-title">{p.title}</p>
              <p className="badge-article-text">{p.desc}</p>
            </article>
          ))}
        </aside>

      </article>
    </section>
  );
}
