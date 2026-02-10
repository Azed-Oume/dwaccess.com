// dwaccess-com/src/app/ClientShell.tsx

"use client";

import { ContactModalProvider } from "@/app/modal/ContactModalProvider";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <ContactModalProvider>
      {children}
    </ContactModalProvider>
  );
}
