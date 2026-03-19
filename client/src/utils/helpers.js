export function formatNumber(n, digits = 0) {
  const num = Number(n);
  if (!Number.isFinite(num)) return "-";
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits
  }).format(num);
}

export function clampNonNegative(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, num);
}

