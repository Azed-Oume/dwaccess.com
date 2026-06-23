# DWACCESS — Documentation complète du projet

> Dernière mise à jour : 2026-06-23
> Développeur : Azed OUME (oumessaoud1@gmail.com)
> Dépôt local : `B:\dwaccess`
> Dépôt GitHub : `https://github.com/Azed-Oume/dwaccess.com`

---

## 1. Présentation

**DWACCESS** (Digital Web Access) est le site vitrine professionnel d'Azed OUME, développeur web freelance basé à Argenteuil (Île-de-France). Le site présente ses services, ses réalisations, ses offres et permet aux prospects de le contacter ou de demander un devis.

Le site est accessible sur **https://dwaccess.fr** (domaine principal).
**https://dwaccess.com** redirige automatiquement vers **https://dwaccess.fr** (301).

---

## 2. Stack technique

| Couche       | Technologie                        |
|--------------|------------------------------------|
| Framework    | Next.js 16 (App Router)            |
| Langage      | TypeScript                         |
| Style        | Tailwind CSS v4 + CSS global       |
| Email        | Nodemailer (formulaire de contact) |
| PWA          | manifest.webmanifest + icônes      |
| Déploiement  | VPS via `deploy.mjs` + PM2         |
| Serveur web  | Nginx (reverse proxy → port 3002)  |
| SSL          | Let's Encrypt / Certbot            |
| Process      | PM2 — nom : `DwaccessWeb`          |

---

## 3. Domaines & infrastructure

| Domaine           | Rôle                                      |
|-------------------|-------------------------------------------|
| dwaccess.fr       | Domaine principal — site vitrine          |
| www.dwaccess.fr   | Redirige → dwaccess.fr                   |
| dwaccess.com      | Redirige 301 → https://dwaccess.fr       |
| www.dwaccess.com  | Redirige 301 → https://dwaccess.fr       |

- **VPS** : 192.162.70.204 (LWS)
- **Dossier VPS** : `/var/www/dwaccess`
- **Port** : 3002
- **PM2** : process `DwaccessWeb` démarré avec `PORT=3002`
- **Nginx vhost** : `/etc/nginx/sites-enabled/dwaccess.fr`
- **Certificat SSL** : `/etc/letsencrypt/live/dwaccess.fr/`

---

## 4. Déploiement

```bash
# Depuis la racine B:\dwaccess
node deploy.mjs

# Options
node deploy.mjs --dry-run   # affiche les commandes sans exécuter
```

Le script fait dans l'ordre :
1. Vérifie qu'il n'y a pas de fichiers non committés
2. `git push origin main` → GitHub
3. `git pull` sur le VPS
4. `npm run build` sur le VPS (build Next.js)
5. `pm2 restart DwaccessWeb --update-env`

---

## 5. Architecture des dossiers

```
B:\dwaccess\
├── deploy.mjs                   Script de déploiement
├── PROJET.md                    Ce fichier
├── next.config.ts               Config Next.js (headers sécurité, PWA)
├── tailwind.config.js           Config Tailwind
├── public/
│   ├── manifest.webmanifest     Manifest PWA
│   ├── icons/                   Icônes PWA (48 → 512px)
│   ├── favicons/                Favicons
│   ├── images/                  Screenshots projets (lightbox)
│   └── logo/                    Logos DWACCESS, réseaux sociaux
└── src/
    ├── app/
    │   ├── layout.tsx           Layout racine (metadata, fonts)
    │   ├── page.tsx             Page d'accueil (composition sections)
    │   ├── ClientShell.tsx      Shell client (modal contact, scroll)
    │   ├── api/contact/         Route API envoi email (Nodemailer)
    │   ├── devis/               Page formulaire devis
    │   ├── mentions-legales/    Page mentions légales
    │   ├── projets/             Page réalisations (lightbox)
    │   ├── services/            Page services
    │   ├── robots.ts            Génère /robots.txt
    │   ├── sitemap.ts           Génère /sitemap.xml
    │   ├── globals.css          CSS global
    │   └── modal/               Système modal contact (Provider + bouton flottant)
    ├── components/              Sections de la page d'accueil
    └── content/                 Données statiques (textes, projets, offres…)
```

---

## 6. Pages

| Route             | Description                                          |
|-------------------|------------------------------------------------------|
| `/`               | Accueil — Hero, Preuves, Services, Offres, Processus, Réalisations, CTA |
| `/services`       | Détail des services proposés                         |
| `/projets`        | Galerie de réalisations avec lightbox                |
| `/devis`          | Formulaire de demande de devis                       |
| `/mentions-legales` | Mentions légales                                   |
| `/robots.txt`     | Généré dynamiquement par Next.js                     |
| `/sitemap.xml`    | Généré dynamiquement par Next.js                     |
| `/api/contact`    | Route API POST — envoi email via Nodemailer          |

---

## 7. Composants principaux

| Composant              | Rôle                                                        |
|------------------------|-------------------------------------------------------------|
| `Header`               | Navigation fixe avec liens et bouton "Demander un devis"    |
| `Hero`                 | Section héros — titre, sous-titre, CTA, badge disponibilité |
| `Proofs`               | Preuves sociales / chiffres clés                            |
| `Offers`               | Présentation des offres / formules                          |
| `Process`              | Processus de travail étape par étape                        |
| `CaseStudies`          | Études de cas / réalisations en vedette                     |
| `CTA`                  | Bloc appel à l'action final                                 |
| `Footer`               | Pied de page (liens, réseaux sociaux)                       |
| `Background`           | Fond animé ou décoratif                                     |
| `ContactForm`          | Formulaire de contact (envoi via /api/contact)              |
| `FloatingContactButton`| Bouton flottant "Nous contacter"                            |
| `ContactModalProvider` | Provider React pour la modale de contact globale            |
| `AutoOpenContactOnScrollUp` | Ouvre la modale au scroll vers le haut (comportement UX) |

---

## 8. Contenu (fichiers `src/content/`)

| Fichier        | Contenu                                                    |
|----------------|------------------------------------------------------------|
| `site.ts`      | Config globale (nom, email, URL, tagline, réseaux sociaux) |
| `hero.ts`      | Textes section héros                                       |
| `offers.ts`    | Offres / formules de prestation                            |
| `process.ts`   | Étapes du processus de travail                             |
| `projects.ts`  | Liste des projets (titre, images, description, liens)      |
| `proofs.ts`    | Chiffres / preuves sociales                                |

---

## 9. Sécurité (headers HTTP)

Configurés dans `next.config.ts` et renforcés par Nginx :

| Header                    | Valeur                                              |
|---------------------------|-----------------------------------------------------|
| Strict-Transport-Security | max-age=63072000; includeSubDomains; preload         |
| X-Content-Type-Options    | nosniff                                             |
| X-Frame-Options           | SAMEORIGIN                                          |
| Referrer-Policy           | strict-origin-when-cross-origin                     |
| Permissions-Policy        | camera=(), microphone=(), geolocation=()            |
| Content-Security-Policy   | default-src 'self'; script-src 'self' unsafe-inline/eval (Next.js) |
| X-Powered-By              | Masqué (`poweredByHeader: false`)                   |

**Note sur la note securityheaders.com** : dwaccess.fr obtient **A** (pas A+) en raison des directives `unsafe-inline` et `unsafe-eval` dans le CSP, imposées par le runtime Next.js. Acceptable sans implémentation de nonces.

Nginx masque également `server_tokens` et ajoute `proxy_hide_header` pour éviter les doublons.

---

## 10. PWA

Le site est installable comme application web (PWA) :
- `public/manifest.webmanifest` — nom, couleurs, icônes
- Icônes de 48px à 512px dans `public/icons/`
- `sw.js` servi via Nginx avec `Cache-Control: no-cache` et `Service-Worker-Allowed: /`

---

## 11. Historique des modifications majeures

| Date       | Modification                                                              |
|------------|---------------------------------------------------------------------------|
| 2026-06-23 | Renommage projet `dwaccess.com` → `dwaccess` (local + VPS)               |
| 2026-06-23 | dwaccess.fr devient domaine principal, dwaccess.com redirige vers lui     |
| 2026-06-23 | SSL Let's Encrypt déployé sur dwaccess.fr et www.dwaccess.fr              |
| 2026-06-23 | PM2 DwaccessWeb démarré avec PORT=3002 (évite conflit avec port 3000)     |
| 2026-06-23 | `poweredByHeader: false` ajouté dans next.config.ts                       |
| 2026-06-23 | Nginx vhost dwaccess.fr : alias sw.js corrigé vers /var/www/dwaccess      |
| 2026-06-23 | Durcissement Nginx : proxy_hide_header, security headers, rate limiting   |
| 2026-06-23 | deploy.mjs mis à jour : REMOTE → /var/www/dwaccess, résumé → dwaccess.fr |

---

## 12. Backlog / Prochaines priorités

- [ ] Mettre à jour `src/content/site.ts` : `domain` et `url` → dwaccess.fr
- [ ] SEO : vérifier que le sitemap et canonical pointent vers dwaccess.fr
- [ ] Implémenter les nonces CSP pour passer de A à A+ sur securityheaders.com
