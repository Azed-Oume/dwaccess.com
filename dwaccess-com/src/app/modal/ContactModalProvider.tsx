//  dwaccess-com/src/app/modal/ContactModalProvider.tsx

"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import ContactModal from "@/app/modal/contactModal";

type Ctx = {
  openContact: (title?: string) => void;
  closeContact: () => void;
};

const ContactModalContext = createContext<Ctx | null>(null);

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);

  const api = useMemo(
    () => ({
      openContact: (t?: string) => {
        setTitle(t);
        setOpen(true);
      },
      closeContact: () => setOpen(false),
    }),
    []
  );

  return (
    <ContactModalContext.Provider value={api}>
      {children}
      {/* Modal rendue une seule fois dans toute l'app */}
      <ContactModal show={open} title={title} onHide={() => setOpen(false)} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used inside ContactModalProvider");
  return ctx;
}
