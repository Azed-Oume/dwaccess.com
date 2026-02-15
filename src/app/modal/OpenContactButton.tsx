"use client";

import { useContactModal } from "@/app/modal/ContactModalProvider";

type Props = {
  title?: string;       // titre dans la modal
  children?: React.ReactNode; // texte du bouton
  className?: string;
};

export default function OpenContactButton({
  title = "Demande de devis",
  children = "Nous contacter",
  className = "",
}: Props) {
  const { openContact } = useContactModal();

  return (
    <button
      type="button"
      onClick={() => openContact(title)}
      className={className || "badge-button"}
    >
      {children}
    </button>
  );
}
