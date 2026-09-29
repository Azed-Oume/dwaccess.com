// dwaccess-com/src/content/projects.ts
export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectVideo = {
  id: string; // ancre utilisée par le lien « Voir la vidéo » de l'accueil
  src: string;
  poster: string;
  caption?: string;
};

export type Project = {
  title: string;
  summary: string;
  stack: string[];
  highlight: string;
  images: string[];
  option?: string[];
  links?: ProjectLink[];
  video?: ProjectVideo;
  portrait?: boolean; // captures d'écran de téléphone (format vertical) : vignettes hautes, sans recadrage du haut
  layout?: "two-images" | "three-images"; // pour décider du rendu
};

export const projects: Project[] = [
  {
    title: "AideNMe (Application d'entraide / PWA + Android)",
    summary:
      "Application gratuite d'entraide entre voisins : alerte SOS géolocalisée, carte des proches, missions d'entraide, messagerie en temps réel et appels audio/vidéo. Disponible en PWA et en application Android.",
    stack: ["React", "Node.js", "Express", "MySQL", "Socket.IO", "Capacitor"],
    highlight: "Temps réel (SOS, messagerie, appels WebRTC), géolocalisation et application Android native.",
    images: [
      "/images/aidenme-1.jpg",
      "/images/aidenme-2.jpg"
    ],
    option: [
      "Alerte SOS géolocalisée",
      "Messagerie et appels audio/vidéo",
      "Missions d'entraide",
      "PWA installable + Android"
    ],
    links: [{ label: "Visiter le site", href: "https://aidenme.fr" }],
    video: {
      id: "video-aidenme",
      src: "/videos/aidenme-presentation.mp4",
      poster: "/videos/aidenme-presentation-poster.jpg",
      caption: "Présentation d'AideNMe en 40 secondes",
    },
  },
  {
    title: "MediTransport (SaaS transport sanitaire / PWA)",
    summary:
      "Logiciel en ligne pour les sociétés d'ambulances et de VSL : fiches patients complètes (adresse, digicode, médecin, contact d'urgence, besoins particuliers), transports itératifs, recherche instantanée pour les équipiers et import des fichiers existants (Excel ou CSV). Le gérant crée le compte de sa société, puis les postes administrateur et équipier de son équipe. Installable sur Android et iPhone (PWA).",
    stack: ["React", "TypeScript", "Node.js", "Express", "Sequelize", "MariaDB", "Stripe"],
    highlight: "Chaque société gère sa propre équipe et ses propres patients, un seul appareil connecté par compte, essai gratuit de 7 jours puis abonnement en ligne.",
    portrait: true,
    images: [
      "/images/meditransport-1.png",
      "/images/meditransport-2.png",
      "/images/meditransport-3.png",
      "/images/meditransport-4.png"
    ],
    option: [
      "Patients et besoins en un coup d'œil",
      "Fiche terrain : appel, GPS, digicode",
      "Import Excel / CSV",
      "Comptes administrateur et équipier"
    ],
    links: [{ label: "Visiter le site", href: "https://meditransport.dwaccess.fr" }],
    video: {
      id: "video-meditransport",
      src: "/videos/meditransport-presentation.mp4",
      poster: "/videos/meditransport-presentation-poster.jpg",
      caption: "Présentation de MediTransport en 40 secondes",
    },
  },
  {
    title: "VTC Premium (Site de réservation)",
    summary:
      "Site de réservation pour VTC : parcours client simple, demande de devis / réservation, mise en avant de l’offre et conversion.",
    stack: ["Next.js", "React", "Tailwind", "SEO"],
    highlight: "Pensé pour convertir : rapide, clair, mobile-first, optimisé référencement.",
    images: [
      "/images/vtc-wpa-1.jpeg",
      "/images/vtc-premium-1.png",
      "/images/vtc-premium-2.png",
      "/images/vtc-premium-3.png",
      "/images/vtc-premium-4.png"
    ],
    option: [
      "Design moderne",
      "Parcours client optimisé",
      "Mobile-first",
      "SEO avancé",
      "Dashboard admin complet et intuitif"
    ],
    links: [{ label: "Visiter le site", href: "https://vtc-site.vercel.app/" }],
  },
  {
    title: "Taxi Premium (Plateforme SaaS / PWA)",
    summary:
      "Plateforme complète de réservation et de gestion Taxi : parcours client, OTP, back-office, base de données et règles métier. Application installable sur smartphone (PWA).",
    stack: ["React", "Node.js", "Express", "Sequelize", "MySQL"],
    highlight: "Architecture orientée métiers avec une forte capacité d’évolution multi-clients.",
    images: [
      "/images/taxi-premium-wpa-1.jpeg",
      "/images/taxi-premium-1.png",
      "/images/taxi-premium-2.png",
      "/images/taxi-premium-3.png"
    ],
    option: [
      "PWA installable",
      "Back-office complet",
      "Gestion des courses",
      "OTP et sécurité"
    ]
  },
];
