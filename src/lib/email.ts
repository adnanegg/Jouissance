import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // SSL on port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // CapConnect cert hostname doesn't match IP
  },
});

type LeadData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  category: string;
  description: string;
  locale: string;
  timestamp: string;
};

export async function sendLeadNotification(data: LeadData): Promise<void> {
  const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

  // 1. Send notification to business owner
  const subject = `🏗️ Nouvelle demande de devis — ${data.name}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 24px; border-radius: 12px;">
      <div style="background: #0d1b3e; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 20px; letter-spacing: 0.05em;">JOUISSANCE TRAVAUX DIVERS</h1>
        <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.8;">Nouvelle demande de devis</p>
      </div>
      
      <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #374151; width: 140px;">Nom</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #111827;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #374151;">Téléphone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
              <a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none;">${data.phone}</a>
            </td>
          </tr>
          ${data.email ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #374151;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
              <a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a>
            </td>
          </tr>` : ""}
          ${data.city ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #374151;">Ville</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #111827;">${data.city}</td>
          </tr>` : ""}
          ${data.category ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #374151;">Type de travaux</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #111827;">${data.category}</td>
          </tr>` : ""}
          ${data.description ? `
          <tr>
            <td style="padding: 10px 0; font-weight: 600; color: #374151; vertical-align: top;">Description</td>
            <td style="padding: 10px 0; color: #111827; white-space: pre-wrap;">${data.description}</td>
          </tr>` : ""}
        </table>
        
        <div style="margin-top: 20px; padding: 12px; background: #f0fdf4; border-radius: 6px; font-size: 13px; color: #166534;">
          <strong>WhatsApp :</strong> 
          <a href="https://wa.me/${data.phone.replace(/[^0-9+]/g, "")}" style="color: #166534;">
            Répondre sur WhatsApp
          </a>
        </div>
        
        <p style="margin-top: 16px; font-size: 12px; color: #9ca3af;">
          Reçu le ${new Date(data.timestamp).toLocaleString("fr-MA", { timeZone: "Africa/Casablanca" })} · 
          Langue : ${data.locale === "ar" ? "العربية" : "Français"}
        </p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Jouissance Travaux" <${process.env.SMTP_USER}>`,
    to: contactEmail,
    subject,
    html,
  });

  // 2. Send confirmation to client (only if they provided an email)
  if (data.email) {
    const isArabic = data.locale === "ar";

    const clientSubject = isArabic
      ? "تم استلام طلبك — Jouissance Travaux Divers"
      : "Demande reçue — Jouissance Travaux Divers";

    const clientHtml = isArabic
      ? `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl; text-align: right;">
      <div style="background: #0d1b3e; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 20px;">JOUISSANCE TRAVAUX DIVERS</h1>
      </div>
      <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #111827;">مرحباً <strong>${data.name}</strong>،</p>
        <p style="color: #374151;">شكراً على طلبك. تم استلام رسالتك بنجاح وسنتواصل معك في أقرب وقت.</p>
        <div style="margin: 24px 0; padding: 16px; background: #f0fdf4; border-radius: 8px; text-align: center;">
          <p style="margin: 0 0 8px; color: #166534; font-weight: 600;">للتواصل السريع:</p>
          <a href="https://wa.me/212658393049" style="display: inline-block; background: #25d366; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">واتساب</a>
        </div>
        <p style="font-size: 13px; color: #9ca3af; margin-top: 24px;">Jouissance Travaux Divers — بناء، ترميم وتشطيب في المغرب</p>
      </div>
    </div>`
      : `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0d1b3e; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 20px;">JOUISSANCE TRAVAUX DIVERS</h1>
      </div>
      <div style="background: white; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="font-size: 16px; color: #111827;">Bonjour <strong>${data.name}</strong>,</p>
        <p style="color: #374151;">Merci pour votre demande de devis. Nous avons bien reçu votre message et nous vous répondrons dans les meilleurs délais.</p>
        <div style="margin: 24px 0; padding: 16px; background: #f0fdf4; border-radius: 8px; text-align: center;">
          <p style="margin: 0 0 8px; color: #166534; font-weight: 600;">Pour une réponse rapide :</p>
          <a href="https://wa.me/212658393049" style="display: inline-block; background: #25d366; color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">WhatsApp</a>
        </div>
        <p style="font-size: 13px; color: #9ca3af; margin-top: 24px;">Jouissance Travaux Divers — Construction, rénovation et finition au Maroc</p>
      </div>
    </div>`;

    await transporter.sendMail({
      from: `"Jouissance Travaux" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: clientSubject,
      html: clientHtml,
    });
  }
}
