const Food = require("../models/Food");
const { predictFoodDemand } = require("../services/aiService");
const { computeWastePercent, isAlert } = require("../services/alertService");

async function createFoodEntry(req, res) {
  try {
    const { students, foodPrepared, foodWasted } = req.body || {};

    const studentsNum = Number(students);
    const preparedNum = Number(foodPrepared);
    const wastedNum = Number(foodWasted);

    if (![studentsNum, preparedNum, wastedNum].every((n) => Number.isFinite(n) && n >= 0)) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const mlServiceUrl = process.env.ML_SERVICE_URL;
    const predictedFood = await predictFoodDemand({ mlServiceUrl, students: studentsNum });
    const wastePercent = computeWastePercent({ foodPrepared: preparedNum, foodWasted: wastedNum });
    const alert = isAlert({
      wastePercent,
      thresholdPercent: process.env.ALERT_WASTE_THRESHOLD
    });

    const doc = await Food.create({
      students: studentsNum,
      foodPrepared: preparedNum,
      foodWasted: wastedNum,
      predictedFood,
      wastePercent,
      alert
    });

    return res.status(201).json(doc);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: String(err?.message || err) });
  }
}

async function getAllFoodEntries(req, res) {
  try {
    const docs = await Food.find().sort({ createdAt: -1 }).lean();
    return res.json(docs);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: String(err?.message || err) });
  }
}

async function notifyNearbyNGOs(req, res) {
  try {
    const { id } = req.params;
    const { ngos } = req.body || {};

    if (!id) return res.status(400).json({ message: "Missing entry id" });
    if (!Array.isArray(ngos)) return res.status(400).json({ message: "`ngos` must be an array" });

    const entry = await Food.findById(id);
    if (!entry) return res.status(404).json({ message: "Entry not found" });
    if (!entry.alert) return res.status(400).json({ message: "This entry is not an alert" });

    const sanitized = ngos
      .filter((n) => n && typeof n === "object")
      .map((n) => ({
        placeId: String(n.placeId || ""),
        name: String(n.name || ""),
        vicinity: n.vicinity ? String(n.vicinity) : undefined
      }))
      .filter((n) => n.placeId && n.name);

    entry.notificationSent = true;
    entry.notifiedNGOs = sanitized;
    entry.notificationAt = new Date();

    await entry.save();
    return res.json(entry.toObject ? entry.toObject() : entry);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: String(err?.message || err) });
  }
}

module.exports = { createFoodEntry, getAllFoodEntries, notifyNearbyNGOs };

