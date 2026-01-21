// dwaccess-com/src/app/devis/Devisprovider.tsx

"use client";
import { useContactModal } from "../modal/ContactModalProvider";



export default function DevisProvider() {
  const { openContact } = useContactModal();
  
    return (
            <div className="mt-6">
              {/* Bouton qui ouvre la modal */}
                <button
                  type="button"
                  onClick={() => openContact("Demande de devis")}
                  className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90"
                >
                  Nous contacter
                </button>
            </div>
  );
}
