function computeWastePercent({ foodPrepared, foodWasted }) {
  const prepared = Number(foodPrepared) || 0;
  const wasted = Number(foodWasted) || 0;
  if (prepared <= 0) return 0;
  return (wasted / prepared) * 100;
}

function isAlert({ wastePercent, thresholdPercent }) {
  const t = Number(thresholdPercent);
  const threshold = Number.isFinite(t) ? t : 25;
  return Number(wastePercent) >= threshold;
}

module.exports = { computeWastePercent, isAlert };

