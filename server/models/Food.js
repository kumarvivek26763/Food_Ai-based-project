const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    students: { type: Number, required: true, min: 0 },
    foodPrepared: { type: Number, required: true, min: 0 },
    foodWasted: { type: Number, required: true, min: 0 },
    predictedFood: { type: Number, required: true, min: 0 },
    wastePercent: { type: Number, required: true, min: 0 },
    alert: { type: Boolean, required: true, default: false },

    // When an alert happens, we can "request pickup" from nearby NGOs.
    // This project stores which NGOs were requested (no SMS/email integration by default).
    notificationSent: { type: Boolean, required: true, default: false },
    notifiedNGOs: [
      {
        placeId: { type: String, required: true },
        name: { type: String, required: true },
        vicinity: { type: String }
      }
    ],
    notificationAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", FoodSchema);

