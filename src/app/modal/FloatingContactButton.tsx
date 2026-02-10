"use client";

import { useEffect, useState } from "react";
import { useContactModal } from "@/app/modal/ContactModalProvider";

type Props = {
  showAfter?: number;     // px
  title?: string;         // titre dans la modal
  label?: string;         // texte bouton
  className?: string;     // si tu veux surcharger
};

export default function FloatingContactButton({
  showAfter = 400,
  title = "Demande de devis",
  label = "Demander un devis",
  className = "",
}: Props) {
  const { openContact } = useContactModal();
    const [visible, setVisible] = useState(false);
    
    console.log("Entré dans le bouton flotant");

  useEffect(() => {
  const onScroll = () => {
    const y = window.scrollY;
    console.log("scrollY:", y, "showAfter:", showAfter, "visible:", y >= showAfter);
    setVisible(y >= showAfter);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, [showAfter]);


  if (!visible) return null;

  return (
    <button
    type="button"
    onClick={() => openContact(title)}
    className={`floating-contact-btn z-2147483647 bg-white text-black hover:bg-white/90 ${className}`}
    // style={{ outline: "2px solid red" }}
    >
    {label}
    </button>
  );
}
