// dwaccess-com/src/content/projects.ts

export type Project = {
  title: string;
  summary: string;
  stack: string[];
  highlight: string;
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "CertiTrans (SaaS)",
    summary:
      "Plateforme de gestion et traçabilité (RH, flotte, suivi terrain) pensée pour la conformité et la fiabilité des données.",
    stack: ["React", "Node.js", "Express", "Sequelize", "PostgreSQL/MySQL", "PM2", "Apache"],
    highlight: "Conçu en mode MVP → itérations rapides → industrialisation progressive.",
  },
  {
    title: "NavCertiTrans (Electron)",
    summary:
      "Navigateur sécurisé et contrôlé pour tablette/boîtier : whitelist/blacklist, onglets, sécurité, logique d’intégration.",
    stack: ["Electron", "React", "Vite", "Node.js"],
    highlight: "Contrôle d’accès et durcissement (anti-fuite, politique d’URL).",
  },
  {
    title: "Taxi Premium (SaaS)",
    summary:
      "Solution de réservation/gestion pour taxi/VTC : parcours client, OTP, back-office, BDD, règles métier.",
    stack: ["React", "Node.js", "Express", "Sequelize", "MySQL"],
    highlight: "Architecture orientée métiers + évolutivité multi-clients.",
  },
];
