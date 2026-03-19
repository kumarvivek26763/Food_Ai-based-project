const axios = require("axios");

async function predictFoodDemand({ mlServiceUrl, students }) {
  if (!mlServiceUrl) throw new Error("Missing ML_SERVICE_URL");

  const url = new URL("/predict", mlServiceUrl).toString();
  const resp = await axios.post(
    url,
    { students },
    { timeout: 8000, headers: { "Content-Type": "application/json" } }
  );

  const prediction = Number(resp?.data?.prediction);
  if (!Number.isFinite(prediction)) {
    throw new Error("Invalid prediction from ML service");
  }
  return prediction;
}

module.exports = { predictFoodDemand };

