const express = require("express");
const { createFoodEntry, getAllFoodEntries, notifyNearbyNGOs } = require("../controllers/foodController");

const router = express.Router();

router.post("/food", createFoodEntry);
router.get("/food", getAllFoodEntries);
router.post("/food/:id/notify-ngos", notifyNearbyNGOs);

module.exports = router;

