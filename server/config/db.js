const mongoose = require("mongoose");
const { error: logError } = require("../utils/logger");

const defaultOptions = {
  serverSelectionTimeoutMS: Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS) || 12_000,
  maxPoolSize: 10
};

async function connectDb(mongoUri, options = {}) {
  if (!mongoUri || !String(mongoUri).trim()) {
    console.error("[DEBUG] MONGODB_URI is missing or empty!");
    console.error("[DEBUG] Current env MONGODB_URI:", process.env.MONGODB_URI);
    throw new Error(
      "Missing MONGODB_URI. Copy .env.example to .env in the project root and set MONGODB_URI (local mongod or MongoDB Atlas)."
    );
  }

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(String(mongoUri).trim(), { ...defaultOptions, ...options });
    mongoose.connection.on("error", (err) => logError("[mongodb]", err.message));
    return mongoose.connection;
  } catch (err) {
    logError("[mongodb] connection failed:", err.message);
    throw new Error(
      `MongoDB connection failed: ${err.message}. Start MongoDB locally, check the URI, or use Atlas.`
    );
  }
}

module.exports = { connectDb };
