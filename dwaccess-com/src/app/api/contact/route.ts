// dwaccess-com/src/app/api/contact/route.ts

import nodemailer from "nodemailer";

type ContactFormBody = {
  name: string;
  email: string;
  subject: string;
  phone?: string;
  message: string;
  website?: string; // honeypot
};

const lastSubmitByIp = new Map<string, number>();

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

function escapeHtml(s: string) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clamp(s: string, max: number) {
  const v = String(s ?? "").trim();
  return v.length > max ? v.slice(0, max) : v;
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);

    // Rate limit simple (mémoire)
    const now = Date.now();
    const minDelayMs = (Number(process.env.CONTACT_RATE_LIMIT_SECONDS) || 30) * 1000;

    const last = lastSubmitByIp.get(ip) || 0;
    if (now - last < minDelayMs) {
      return Response.json(
        { ok: false, error: "Trop de tentatives. Veuillez réessayer plus tard." },
        { status: 429 }
      );
    }

    const body = (await req.json().catch(() => null)) as ContactFormBody | null;
    if (!body) {
      return Response.json({ ok: false, error: "Corps JSON invalide." }, { status: 400 });
    }

    // Honeypot anti-bot
    if (body.website && body.website.trim().length > 0) {
      return Response.json({ ok: true }, { status: 200 });
    }

    const name = clamp(body.name, 120);
    const email = clamp(body.email, 180);
    const subject = clamp(body.subject, 140);
    const phone = clamp(body.phone || "", 40);
    const message = clamp(body.message, 6000);

    if (!name || !email || !subject || !message) {
      return Response.json({ ok: false, error: "Champs requis manquants." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return Response.json({ ok: false, error: "Adresse e-mail invalide." }, { status: 400 });
    }

    const to = process.env.MAIL_TO;
    const from = process.env.MAIL_FROM || to;

    if (!to) {
      return Response.json({ ok: false, error: "MAIL_TO manquant (env)." }, { status: 500 });
    }

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = String(process.env.SMTP_SECURE).toLowerCase() === "true";

    if (!host || !user || !pass) {
      return Response.json(
        { ok: false, error: "Configuration SMTP incomplète." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `[DWACCESS] ${subject}`,
      text:
        `Nom: ${name}\n` +
        `Email: ${email}\n` +
        (phone ? `Téléphone: ${phone}\n` : "") +
        `\n${message}\n`,
      html: `
        <div style="font-family:Arial,system-ui,sans-serif;line-height:1.5">
          <h2>Nouvelle demande (DWACCESS)</h2>
          <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
          <p><strong>Email :</strong> ${escapeHtml(email)}</p>
          ${phone ? `<p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>` : ""}
          <p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
          <hr />
          <p style="white-space:pre-wrap"><strong>Message :</strong>${escapeHtml(message)}</p>
        </div>
      `,
    });

    lastSubmitByIp.set(ip, now);
    return Response.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    console.error("CONTACT_API_ERROR:", e?.message || e);
    return Response.json(
      { ok: false, error: "Erreur serveur (email non envoyé)." },
      { status: 500 }
    );
  }
}
