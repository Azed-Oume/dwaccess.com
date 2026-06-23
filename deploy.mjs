#!/usr/bin/env node
// deploy.mjs — Git push + déploiement VPS de dwaccess.com
// Usage :
//   npm run deploy            → push git + git pull + build + pm2 restart
//   npm run deploy -- --dry-run  → affiche les commandes sans les exécuter

import { spawnSync } from "child_process";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Configuration ─────────────────────────────────────────────────────────────
const SSH      = "helpme";                        // alias SSH dans ~/.ssh/config
const REMOTE   = "/var/www/dwaccess";             // chemin sur le VPS
const PM2_APP  = "DwaccessWeb";                   // nom du process PM2
const BRANCH   = "main";
// ───────────────────────────────────────────────────────────────────────────────

const args   = process.argv.slice(2);
const dryRun = args.includes("--dry-run");

// ─── Couleurs terminal ─────────────────────────────────────────────────────────
const C = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  cyan:   "\x1b[36m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  red:    "\x1b[31m",
  gray:   "\x1b[90m",
  gold:   "\x1b[33m",
};

function log(msg)  { console.log(`${C.cyan}▶${C.reset} ${msg}`); }
function ok(msg)   { console.log(`${C.green}✓${C.reset} ${msg}`); }
function warn(msg) { console.log(`${C.yellow}⚠${C.reset} ${msg}`); }
function err(msg)  { console.error(`${C.red}✗${C.reset} ${msg}`); }
function step(n, t){ console.log(`\n${C.bold}${C.cyan}[${n}]${C.reset}${C.bold} ${t}${C.reset}`); }

const IS_WIN = process.platform === "win32";

function run(cmd, opts = {}) {
  if (dryRun) {
    console.log(`${C.gray}  $ ${cmd}${C.reset}`);
    return { status: 0 };
  }
  const shell    = IS_WIN ? "pwsh.exe" : "/bin/sh";
  const shellArg = IS_WIN ? "-Command" : "-c";
  const result = spawnSync(shell, [shellArg, cmd], {
    stdio: "inherit",
    cwd: __dirname,
    ...opts,
  });
  if (result.error || result.status !== 0) {
    err(`Commande échouée (code ${result.status ?? "signal"}) : ${cmd}`);
    process.exit(1);
  }
  return result;
}

function runCapture(cmd) {
  if (dryRun) return "";
  const shell    = IS_WIN ? "pwsh.exe" : "/bin/sh";
  const shellArg = IS_WIN ? "-Command" : "-c";
  const result = spawnSync(shell, [shellArg, cmd], {
    cwd: __dirname,
    encoding: "utf8",
  });
  return (result.stdout ?? "").trim();
}

function ssh(remoteCmd) {
  return run(`ssh ${SSH} "${remoteCmd.replace(/"/g, '\\"')}"`);
}

// ─── Bannière ──────────────────────────────────────────────────────────────────
console.log(`\n${C.bold}${C.gold}  ◆ DWACCESS — Deploy${C.reset}${dryRun ? C.yellow + "  [DRY-RUN]" + C.reset : ""}\n`);

// ─── Étape 1 : Vérifier qu'il n'y a pas de fichiers non committés ───────────
step(1, "Vérification du dépôt git local");

const status = runCapture("git status --porcelain");
if (status) {
  warn("Fichiers non committés détectés :");
  console.log(C.gray + status + C.reset);
  warn("Committe tes changements dans VSCode avant de déployer.");
  process.exit(1);
}
ok("Dépôt propre — aucun changement en attente");

// ─── Étape 2 : Git push ────────────────────────────────────────────────────
step(2, `Git push → origin/${BRANCH}`);
log(`git push origin ${BRANCH}`);
run(`git push origin ${BRANCH}`);
ok("Code poussé sur GitHub");

// ─── Étape 3 : VPS — git pull ─────────────────────────────────────────────
step(3, "VPS — Mise à jour du code");
log(`ssh ${SSH} → cd ${REMOTE} && git pull`);
ssh(`cd ${REMOTE} && git pull`);
ok("Code à jour sur le serveur");

// ─── Étape 4 : VPS — npm run build ────────────────────────────────────────
step(4, "VPS — Build Next.js");
log("npm run build (peut prendre ~30 s)");
ssh(`cd ${REMOTE} && npm run build`);
ok("Build terminé");

// ─── Étape 5 : VPS — pm2 restart ──────────────────────────────────────────
step(5, `VPS — Redémarrage PM2 (${PM2_APP})`);
log(`pm2 restart ${PM2_APP} --update-env`);
ssh(`pm2 restart ${PM2_APP} --update-env`);
ok(`${PM2_APP} redémarré`);

// Vérification statut PM2
ssh(`pm2 show ${PM2_APP} | grep -E 'status|uptime|restarts'`);

// ─── Résumé ────────────────────────────────────────────────────────────────────
console.log(`\n${C.bold}${C.green}════════════════════════════════════${C.reset}`);
console.log(`${C.bold}${C.green}  ✓ dwaccess.fr déployé avec succès   ${C.reset}`);
console.log(`${C.bold}${C.green}════════════════════════════════════${C.reset}\n`);
console.log(`  ${C.cyan}https://dwaccess.fr${C.reset}\n`);

if (dryRun) warn("Mode --dry-run : aucune commande n'a été exécutée réellement.");
