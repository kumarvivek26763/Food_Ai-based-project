const axios = require("axios");
const { log } = require("../utils/logger");

class MlServiceError extends Error {
  constructor(message, hint, code = "ML_UNAVAILABLE") {
    super(message);
    this.name = "MlServiceError";
    this.hint = hint;
    this.code = code;
  }
}

/** Matches documentation sample trend (~food ≈ 1.1 × students) when ML is offline. */
function heuristicPrediction(students) {
  const s = Number(students);
  if (!Number.isFinite(s) || s < 0) return 0;
  return Math.round(s * 1.1 * 10) / 10;
}

function joinBaseAndPath(baseUrl, path) {
  const base = String(baseUrl).replace(/\/+$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

function axiosErrorMessage(err) {
  if (!axios.isAxiosError(err)) return String(err?.message || err);
  if (err.code === "ECONNREFUSED") {
    return "Cannot reach ML service (connection refused). Is Flask running on the URL in ML_SERVICE_URL?";
  }
  if (err.code === "ENOTFOUND" || err.code === "EAI_AGAIN") {
    return `ML host not found (${err.code}). Check ML_SERVICE_URL.`;
  }
  if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
    return "ML service request timed out.";
  }
  const status = err.response?.status;
  const body = err.response?.data;
  if (status) {
    const detail = typeof body === "object" && body?.message ? ` — ${body.message}` : "";
    return `ML service HTTP ${status}${detail}`;
  }
  return err.message || "ML request failed";
}

/**
 * Calls Flask POST /predict. Uses heuristic when allowFallback is true and ML is down or URL missing.
 * @returns {Promise<{ prediction: number, source: 'ml' | 'fallback' }>}
 */
async function predictFoodDemand({ mlServiceUrl, students, allowFallback }) {
  const urlConfigured = mlServiceUrl && String(mlServiceUrl).trim();

  if (!urlConfigured) {
    if (allowFallback) {
      log("[ml] ML_SERVICE_URL not set — using documentation baseline heuristic (1.1× students).");
      return { prediction: heuristicPrediction(students), source: "fallback" };
    }
    throw new MlServiceError(
      "Missing ML_SERVICE_URL",
      "Add ML_SERVICE_URL to your root .env (e.g. http://127.0.0.1:5001), start the Flask service, or set ALLOW_PREDICTION_FALLBACK=true for local demos.",
      "ML_UNAVAILABLE"
    );
  }

  const url = joinBaseAndPath(mlServiceUrl.trim(), "/predict");

  try {
    const resp = await axios.post(
      url,
      { students },
      {
        timeout: Number(process.env.ML_REQUEST_TIMEOUT_MS) || 8000,
        headers: { "Content-Type": "application/json" },
        validateStatus: () => true
      }
    );

    if (resp.status !== 200) {
      const msg =
        typeof resp.data === "object" && resp.data?.message
          ? String(resp.data.message)
          : `HTTP ${resp.status}`;
      throw new MlServiceError(
        `ML service error: ${msg}`,
        "Check Flask logs. Ensure POST /predict returns { prediction: number }.",
        "ML_INVALID_RESPONSE"
      );
    }

    const prediction = Number(resp?.data?.prediction);
    if (!Number.isFinite(prediction)) {
      throw new MlServiceError(
        "Invalid prediction from ML service",
        "Flask /predict must return JSON like { \"prediction\": 131.2 }.",
        "ML_INVALID_RESPONSE"
      );
    }

    return { prediction, source: "ml" };
  } catch (err) {
    if (err instanceof MlServiceError) {
      if (allowFallback) {
        log(`[ml] ${err.message} — using heuristic fallback.`);
        return { prediction: heuristicPrediction(students), source: "fallback" };
      }
      err.hint =
        err.hint ||
        "Start ML: cd ml-service && pip install -r requirements.txt && python app.py (port 5001).";
      throw err;
    }

    if (axios.isAxiosError(err)) {
      const message = axiosErrorMessage(err);
      if (allowFallback) {
        log(`[ml] ${message} — using heuristic fallback.`);
        return { prediction: heuristicPrediction(students), source: "fallback" };
      }
      throw new MlServiceError(
        message,
        "From project root run: npm run dev (starts ML + API + client) or start Flask manually on ML_SERVICE_URL.",
        "ML_UNAVAILABLE"
      );
    }

    throw err;
  }
}

async function pingMlHealth(mlServiceUrl) {
  const urlConfigured = mlServiceUrl && String(mlServiceUrl).trim();
  if (!urlConfigured) {
    return { ok: false, skipped: true, message: "ML_SERVICE_URL not set" };
  }
  try {
    const url = joinBaseAndPath(mlServiceUrl.trim(), "/health");
    const resp = await axios.get(url, { timeout: 2500, validateStatus: () => true });
    const ok = resp.status === 200 && resp.data?.ok === true;
    return { ok, status: resp.status, message: ok ? "reachable" : "unexpected response" };
  } catch (e) {
    return { ok: false, message: axios.isAxiosError(e) ? axiosErrorMessage(e) : String(e.message) };
  }
}

module.exports = { predictFoodDemand, pingMlHealth, MlServiceError, heuristicPrediction };
