// dwaccess-com/src/app/page.tsx

import Hero from "@/components/Hero";
import Proofs from "@/components/Proofs";
import Offers from "@/components/Offers";
import CaseStudies from "@/components/CaseStudies";
import Process from "@/components/Process";
import CTA from "@/components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Proofs />
      <Offers />
      <CaseStudies />
      <Process />
      <CTA />
    </>
  );
}
