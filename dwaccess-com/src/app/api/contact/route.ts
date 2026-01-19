// dwaccess-com/src/app/api/contact/route.ts
import nodemailer from "nodemailer";

type Payload = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};

const lastSubmitByIp = new Map<string, number>();

function getClientIp(req: Request) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const now = Date.now();
    const minDelay = (Number(process.env.CONTACT_RATE_LIMIT_SECONDS) || 30) * 1000;

    const last = lastSubmitByIp.get(ip) || 0;
    if (now - last < minDelay) {
      return Response.json(
        { ok: false, error: "Trop de tentatives. Réessaie dans quelques secondes." },
        { status: 429 }
      );
    }

    const body = (await req.json()) as Payload;

    // Honeypot
    if (body.website && body.website.trim().length > 0) {
      return Response.json({ ok: true }, { status: 200 });
    }

    if (!body.name || !body.email || !body.subject || !body.message) {
      return Response.json({ ok: false, error: "Champs requis manquants." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.MAIL_TO;
    const from = process.env.MAIL_FROM || to;

    if (!to) {
      return Response.json({ ok: false, error: "MAIL_TO manquant (env)." }, { status: 500 });
    }

    await transporter.sendMail({
      from,
      to,
      replyTo: body.email,
      subject: `[DWACCESS] ${body.subject}`,
      text: `Nom: ${body.name}\nEmail: ${body.email}\n\n${body.message}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5">
          <h2>Nouvelle demande (DWACCESS)</h2>
          <p><strong>Nom :</strong> ${escapeHtml(body.name)}</p>
          <p><strong>Email :</strong> ${escapeHtml(body.email)}</p>
          <p><strong>Sujet :</strong> ${escapeHtml(body.subject)}</p>
          <hr />
          <p style="white-space:pre-wrap">${escapeHtml(body.message)}</p>
        </div>
      `,
    });

    lastSubmitByIp.set(ip, now);
    return Response.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    console.error("CONTACT_API_ERROR:", e?.message || e);
    console.error("CONTACT_API_STACK:", e?.stack || "");
    return Response.json(
      { ok: false, error: e?.message || "Erreur serveur (email non envoyé)." },
      { status: 500 }
    );
  }
}
