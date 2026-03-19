require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });

const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const { connectDb } = require("./config/db");
const foodRoutes = require("./routes/foodRoutes");
const { log } = require("./utils/logger");

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api", foodRoutes);

const port = Number(process.env.PORT) || 5000;

async function start() {
  await connectDb(process.env.MONGODB_URI);
  app.listen(port, () => log(`API listening on http://localhost:${port}`));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});

