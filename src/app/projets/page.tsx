import type { Metadata } from "next";
import ProjetsClient from "./ProjetsClient";

export const metadata: Metadata = {
  title: "Réalisations web — SaaS & applications React/Node",
  description:
    "Découvrez les projets réalisés par DWACCESS : applications SaaS, outils internes, sites vitrines. Stack React, Next.js, Node.js, SQL — livrés proprement.",
};

export default function ProjetsPage() {
  return <ProjetsClient />;
}
