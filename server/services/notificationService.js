const nodemailer = require("nodemailer");
const { log, error: logError } = require("../utils/logger");

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

/**
 * Optional email when NGOs are notified (documentation: Email API optional).
 * If SMTP_* env vars are missing, logs only.
 */
async function sendNgoPickupEmail({ entry, ngos }) {
  if (!smtpConfigured()) {
    log(
      `[notify] Pickup request recorded for entry ${entry._id} (${ngos.length} NGO(s)). Set SMTP_* in .env to send email.`
    );
    return { sent: false, reason: "smtp_not_configured" };
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const to = process.env.ALERT_EMAIL_TO || process.env.SMTP_USER;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: String(process.env.SMTP_SECURE || "").toLowerCase() === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const lines = ngos.map((n) => `• ${n.name}${n.vicinity ? ` — ${n.vicinity}` : ""}`).join("\n");
  const subject = `[Food Waste Alert] Pickup request — ${entry.wastePercent?.toFixed?.(1) ?? "?"}% waste`;
  const text = [
    "A food waste alert entry requested NGO pickup.",
    "",
    `Students: ${entry.students}`,
    `Prepared: ${entry.foodPrepared} · Wasted: ${entry.foodWasted}`,
    `Waste %: ${entry.wastePercent}`,
    "",
    "NGOs selected:",
    lines || "(none)"
  ].join("\n");

  try {
    await transporter.sendMail({ from, to, subject, text });
    log(`[notify] Email sent to ${to}`);
    return { sent: true };
  } catch (err) {
    logError("[notify] Email failed:", err.message);
    return { sent: false, reason: err.message };
  }
}

module.exports = { sendNgoPickupEmail, smtpConfigured };
