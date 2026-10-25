/**
 * Scales an ingredient quantity based on original recipe servings and target servings.
 */
export const scaleQuantity = (quantity, originalServings = 2, targetServings = 2) => {
  if (quantity === undefined || quantity === null || isNaN(Number(quantity))) {
    return '';
  }

  const base = Number(originalServings) || 1;
  const target = Number(targetServings) || 1;
  const scaled = (Number(quantity) / base) * target;

  // Round neatly: if integer, show integer; if decimal, max 2 decimals
  if (Number.isInteger(scaled)) {
    return scaled.toString();
  }

  // Handle common cooking fractions
  const whole = Math.floor(scaled);
  const remainder = scaled - whole;

  if (Math.abs(remainder - 0.5) < 0.05) {
    return whole > 0 ? `${whole} ½` : '½';
  }
  if (Math.abs(remainder - 0.25) < 0.05) {
    return whole > 0 ? `${whole} ¼` : '¼';
  }
  if (Math.abs(remainder - 0.75) < 0.05) {
    return whole > 0 ? `${whole} ¾` : '¾';
  }
  if (Math.abs(remainder - 0.33) < 0.05) {
    return whole > 0 ? `${whole} ⅓` : '⅓';
  }
  if (Math.abs(remainder - 0.67) < 0.05) {
    return whole > 0 ? `${whole} ⅔` : '⅔';
  }

  return Number(scaled.toFixed(2)).toString();
};
