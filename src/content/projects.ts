// dwaccess-com/src/content/projects.ts

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  summary: string;
  stack: string[];
  highlight: string;
  images: string[];
  option?: string[];
  links?: ProjectLink[];
  layout?: "two-images" | "three-images"; // pour décider du rendu
};

export const projects: Project[] = [
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
  {
    title: "NavCertiTrans (Electron)",
    summary:
      "Navigateur sécurisé et contrôlé pour tablettes et boîtiers : whitelist/blacklist, onglets internes, sécurité renforcée et intégration métier.",
    stack: ["Electron", "React", "Vite", "Node.js"],
    highlight: "Contrôle d’accès strict et durcissement (anti-fuite, politique d’URL).",
    images: [
      "/images/certitransnav-1.png",
      "/images/certitransnav-2.png"
    ],
    option: [
      "Navigation sécurisée",
      "Whitelist / Blacklist",
    ]
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
    links: [{ label: "Voir le site", href: "https://vtc-site.vercel.app/" }],
  },
  {
    title: "CertiTrans (SaaS)",
    summary:
      "Plateforme de gestion et de traçabilité (RH, flotte, suivi terrain) pensée pour la conformité et la fiabilité des données.",
    stack: ["React", "Node.js", "Express", "Sequelize", "PostgreSQL / MySQL", "PM2", "Apache"],
    highlight: "Conçu en mode MVP → itérations rapides → industrialisation progressive.",
    images: [
      "/images/certitrans-1.png",
      "/images/certitrans-2.png"
    ],
    option: [
      "Gestion des utilisateurs",
      "Suivi de flotte",
      "Traçabilité des actions",
      "Tableaux de bord personnalisés"
    ],
    links: [{ label: "Voir le site", href: "https://certitrans.fr" }],    
  },
];
