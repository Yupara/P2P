const express = require('express');
const router = express.Router();

// Моковые данные
const offers = [
  {
    id: 1,
    user: "TraderA",
    payMethod: "СБП",
    from: "USDT",
    to: "RUB",
    price: "92.30",
    limits: "5,000 - 100,000 RUB",
    available: "50,000 USDT",
    action: "Купить"
  },
  {
    id: 2,
    user: "TraderB",
    payMethod: "Тинькофф",
    from: "USDT",
    to: "RUB",
    price: "91.95",
    limits: "10,000 - 150,000 RUB",
    available: "100,000 USDT",
    action: "Купить"
  },
  {
    id: 3,
    user: "TraderC",
    payMethod: "Сбербанк",
    from: "RUB",
    to: "USDT",
    price: "92.60",
    limits: "7,000 - 50,000 RUB",
    available: "300,000 RUB",
    action: "Продать"
  }
];

// GET /api/offers
router.get('/', (req, res) => {
  res.json(offers);
});

module.exports = router;
