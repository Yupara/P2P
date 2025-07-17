function calculateCommission(tradesCount, amount) {
  if (tradesCount >= 50) return amount * 0.0025;
  return amount * 0.005;
}
module.exports = { calculateCommission };
