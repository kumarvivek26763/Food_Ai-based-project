const express = require("express");
const {
  createFoodEntry,
  getAllFoodEntries,
  getFoodStatsSummary,
  notifyNearbyNGOs
} = require("../controllers/foodController");

const router = express.Router();

router.get("/food/stats/summary", getFoodStatsSummary);
router.post("/food", createFoodEntry);
router.get("/food", getAllFoodEntries);
router.post("/food/:id/notify-ngos", notifyNearbyNGOs);

module.exports = router;

