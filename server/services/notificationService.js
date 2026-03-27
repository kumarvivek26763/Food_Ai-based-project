const nodemailer = require("nodemailer");
const twilio = require("twilio");
const { log, error: logError } = require("../utils/logger");

// Email configuration check
function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

// SMS/Twilio configuration check
function twilioConfigured() {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_PHONE_NUMBER
  );
}

/**
 * Send email when NGOs are notified
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

/**
 * Send SMS alert when food waste exceeds threshold
 * If TWILIO_* env vars are missing, logs only.
 */
async function sendFoodExpirySMS({ entry, nearestNgo }) {
  const alertPhone = process.env.ALERT_SMS_TO;

  if (!twilioConfigured()) {
    log(
      `[notify] Food expiry alert for entry ${entry._id}. Set TWILIO_* in .env to send SMS.`
    );
    return { sent: false, reason: "twilio_not_configured" };
  }

  if (!alertPhone) {
    log(`[notify] ALERT_SMS_TO not configured. Set in .env to receive SMS alerts.`);
    return { sent: false, reason: "alert_phone_not_configured" };
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const ngoInfo = nearestNgo
    ? `\nNearest NGO: ${nearestNgo.name} (${nearestNgo.vicinity || 'Contact: ' + (nearestNgo.phone || 'N/A')})`
    : '\nNo NGO nearby found.';

  const message = [
    `⚠️ FOOD WASTE ALERT!`,
    `Waste: ${entry.wastePercent?.toFixed(1) ?? "?"}%`,
    `Students: ${entry.students} | Wasted: ${entry.foodWasted}/${entry.foodPrepared}`,
    `${ngoInfo}`,
    `Time: ${new Date().toLocaleString()}`
  ].join('\n');

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: alertPhone
    });
    log(`[notify] SMS alert sent to ${alertPhone}`);
    return { sent: true };
  } catch (err) {
    logError("[notify] SMS failed:", err.message);
    return { sent: false, reason: err.message };
  }
}

/**
 * Send SMS to NGO for pickup request
 */
async function sendNgoPickupSMS({ entry, ngos, nearestNgo }) {
  const alertPhone = process.env.ALERT_SMS_TO;

  if (!twilioConfigured()) {
    log(
      `[notify] NGO pickup request for entry ${entry._id}. Set TWILIO_* in .env to send SMS.`
    );
    return { sent: false, reason: "twilio_not_configured" };
  }

  if (!alertPhone) {
    log(`[notify] ALERT_SMS_TO not configured.`);
    return { sent: false, reason: "alert_phone_not_configured" };
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  const ngoList = ngos.slice(0, 3).map((n, i) => `${i + 1}. ${n.name}`).join('\n');
  const nearestInfo = nearestNgo ? `\nNearest: ${nearestNgo.name}` : '';
  const message = [
    `🏠 PICKUP REQUEST`,
    `Waste: ${entry.wastePercent?.toFixed(1) ?? "?"}%`,
    `Food: ${entry.foodWasted}kg wasted`,
    `Students: ${entry.students}`,
    ` NGOs (top):`,
    ngoList,
    nearestInfo
  ].join('\n');

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: alertPhone
    });
    log(`[notify] NGO pickup SMS sent to ${alertPhone}`);
    return { sent: true };
  } catch (err) {
    logError("[notify] NGO SMS failed:", err.message);
    return { sent: false, reason: err.message };
  }
}

/**
 * Calculate distance between two coordinates (Haversine formula)
 * Returns distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Find nearest NGO from a list based on location
 * Requires NGO to have lat/lng coordinates
 */
function findNearestNgo(userLat, userLng, ngos) {
  if (!ngos || ngos.length === 0) return null;

  let nearestNgo = null;
  let minDistance = Infinity;

  for (const ngo of ngos) {
    if (ngo.lat && ngo.lng) {
      const distance = calculateDistance(userLat, userLng, ngo.lat, ngo.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestNgo = ngo;
      }
    }
  }

  return nearestNgo;
}

module.exports = {
  sendNgoPickupEmail,
  smtpConfigured,
  sendFoodExpirySMS,
  sendNgoPickupSMS,
  twilioConfigured,
  findNearestNgo,
  calculateDistance
};
