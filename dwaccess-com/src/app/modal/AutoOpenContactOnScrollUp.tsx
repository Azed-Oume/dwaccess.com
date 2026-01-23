"use client";

import { useEffect, useRef } from "react";
import { useContactModal } from "@/app/modal/ContactModalProvider";

type Props = {
  threshold?: number; // pixels de scroll vers le haut cumulés
  title?: string;
  onceKey?: string; // clé sessionStorage pour n'ouvrir qu'une fois
};

export default function AutoOpenContactOnScrollUp({
  threshold = 400,
  title = "Demande de devis",
  onceKey = "dwaccess_contact_modal_auto_opened",
}: Props) {
  const { openContact } = useContactModal();

  const lastY = useRef<number>(0);
  const upAccum = useRef<number>(0);
  const ticking = useRef<boolean>(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const alreadyOpened = sessionStorage.getItem(onceKey);
    if (alreadyOpened === "1") return;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;

        // delta < 0 => on remonte
        if (delta < 0) {
          upAccum.current += Math.abs(delta);
        } else if (delta > 0) {
          // si on redescend, on reset l'accumulation
          upAccum.current = 0;
        }

        lastY.current = y;

        // déclenchement
        if (upAccum.current >= threshold) {
          sessionStorage.setItem(onceKey, "1");
          openContact(title);
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [openContact, threshold, title, onceKey]);

  return null;
}
