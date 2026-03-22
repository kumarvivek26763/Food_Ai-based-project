require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const { connectDb } = require("./config/db");
const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");
const { pingMlHealth } = require("./services/aiService");
const { log } = require("./utils/logger");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", async (req, res) => {
  const mongoState = mongoose.connection.readyState;
  const mongoOk = mongoState === 1;
  const ml = await pingMlHealth(process.env.ML_SERVICE_URL);
  const fallbackOn = String(process.env.ALLOW_PREDICTION_FALLBACK || "").toLowerCase() === "true";

  res.json({
    ok: mongoOk,
    service: "ai-food-waste-api",
    mongo: {
      ok: mongoOk,
      readyState: mongoState,
      readyStateLabel: ["disconnected", "connected", "connecting", "disconnecting"][mongoState] ?? "unknown"
    },
    ml: {
      ...ml,
      hint:
        ml.ok || ml.skipped
          ? undefined
          : "Start Flask: cd ml-service && pip install -r requirements.txt && python app.py"
    },
    predictionFallbackEnabled: fallbackOn
  });
});

app.use("/api", foodRoutes);
app.use("/api/auth", authRoutes);

const port = Number(process.env.PORT) || 5000;

async function start() {
  await connectDb(process.env.MONGODB_URI);

  const ml = await pingMlHealth(process.env.ML_SERVICE_URL);
  const fallbackOn = String(process.env.ALLOW_PREDICTION_FALLBACK || "").toLowerCase() === "true";
  if (!ml.ok && !ml.skipped && !fallbackOn) {
    log(
      "[warn] ML service is not reachable. POST /api/food will return 503 until Flask is running, unless you set ALLOW_PREDICTION_FALLBACK=true in .env"
    );
  }

  app.listen(port, () => log(`API listening on http://localhost:${port}`));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
