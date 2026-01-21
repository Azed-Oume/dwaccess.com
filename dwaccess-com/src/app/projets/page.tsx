import type { Metadata } from "next";
import ProjetsClient from "./ProjetsClient";

export const metadata: Metadata = {
  title: "Projets",
  description: "Projets SaaS, outils internes et réalisations web : React, Next.js, Node.js, SQL.",
};

export default function ProjetsPage() {
  return <ProjetsClient />;
}
