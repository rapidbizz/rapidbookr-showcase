// Demo example — a small booking price estimate in plain JavaScript.
// Illustrative example only, not product code.

// Prices are examples only, in AED.
const PRICES = { tour: 150, transfer: 80, activity: 120 };

function estimatePrice(type, guests) {
  const base = PRICES[type] ?? PRICES.tour;
  return base * Math.max(1, guests);
}

function formatEstimate(type, guests) {
  return `${type} for ${guests} guest(s): AED ${estimatePrice(type, guests)}`;
}

module.exports = { estimatePrice, formatEstimate };
