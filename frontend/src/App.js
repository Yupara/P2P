// --- MOCK DATA AND CONSTANTS (order matches image2) ---
const OFFERS = [
  {
    id: 1,
    user: "Savak",
    online: true,
    verified: true,
    price: "70,96",
    fiat: "RUB",
    crypto: "USDT",
    amount: "304,7685 USDT",
    limits: "500 – 500 000 RUB",
    orders: 40,
    percent: 10,
    time: null,
    payMethods: [
      { icon: "sbp", name: "SBP" },
      { icon: "kol", name: "кольнение" }
    ],
    warn: false
  },
  {
    id: 2,
    user: "Ищу_Партнеров",
    online: false,
    verified: false,
    price: "71,03",
    fiat: "RUB",
    crypto: "USDT",
    amount: "128,8821 USDT",
    limits: "500 – 500 000 RUB",
    orders: 15,
    percent: 10,
    time: "15 мин.",
    payMethods: [
      { icon: "pimet", name: "Пиметы" },
      { icon: "oboreol", name: "Обореол" }
    ],
    warn: true
  },
  {
    id: 3,
    user: "ПроданоМейкеро",
    online: false,
    verified: true,
    price: "71,03",
    fiat: "RUB",
    crypto: "USDT",
    amount: "128,8821 USDT",
    limits: "500 – 500 000 RUB",
    orders: 11,
    percent: 10,
    time: "15 мин.",
    payMethods: [],
    warn: false
  }
];

const FILTERS = {
  crypto: "USDT",
  side: "buy"
};

// --- RENDER MAIN PAGE EXACTLY LIKE IMAGE2 ---
function renderMarket() {
  document.getElementById('main').innerHTML = `
    <div class="p2p-dark">
      <div class="market-tabs">
        <span class="tab active">Покупка</span>
        <span class="tab">Продажа</span>
        <span class="tab-gear"></span>
      </div>
      <div class="market-filters">
        <button class="filter-btn">USDT <span class="arrow">&#9662;</span></button>
        <button class="filter-btn">Сумма <span class="arrow">&#9662;</span></button>
        <button class="filter-btn">Все сособы оплаты <span class="arrow">&#9662;</span></button>
        <button class="filter-btn">Фильтр</button>
      </div>
      <div class="market-banner">
        <span>Попробуйте P2P HotSwap – лучшие ставки и больше ликвидности!</span>
        <button class="banner-btn">Узнать волью</button>
      </div>
      <div class="offer-list">
        ${OFFERS.map(offer => renderOfferCard(offer)).join('')}
      </div>
    </div>
  `;
}

function renderOfferCard(offer) {
  // Icons as SVG inline for accessibility and to match the app look
  const statusDot = offer.warn
    ? `<span class="offer-icon status-dot yellow"></span>`
    : `<span class="offer-icon status-dot green"></span>`;
  const warnIcon = offer.warn
    ? `<span class="offer-icon warn-ico">&#9888;</span>`
    : "";
  const methods = offer.payMethods.map(m =>
    `<span class="offer-method">${methodIcon(m.icon)} ${m.name}</span>`
  ).join(" | ");
  return `
    <div class="offer-card${offer.warn ? " warn" : ""}">
      <div class="offer-header">
        ${warnIcon}${statusDot}
        <span class="offer-username">${offer.user}</span>
        ${offer.time ? `<span class="offer-time">${offer.time}</span>` : ""}
        <span class="offer-orders">${offer.orders} Ордеров | ${offer.percent} %</span>
      </div>
      <div class="offer-price">₽ ${offer.price}</div>
      <div class="offer-amount">Количество <span>${offer.amount}</span></div>
      <div class="offer-limits">Лимиты <span>${offer.limits}</span></div>
      ${methods ? `<div class="offer-methods">${methods}</div>` : ""}
      <div class="offer-cta"><button class="buy-btn">Покупка</button></div>
    </div>
  `;
}
function methodIcon(name) {
  // Only minimal SVGs, but you can expand as needed
  if (name === "sbp")
    return `<svg width="20" height="20" viewBox="0 0 20 20" style="vertical-align:middle"><circle cx="10" cy="10" r="8" fill="#38cc6c"/></svg>`;
  if (name === "kol")
    return `<svg width="20" height="20" viewBox="0 0 20 20" style="vertical-align:middle"><circle cx="10" cy="10" r="8" fill="#7ad1b4"/></svg>`;
  if (name === "pimet")
    return `<svg width="20" height="20" viewBox="0 0 20 20" style="vertical-align:middle"><circle cx="10" cy="10" r="8" fill="#e2c84c"/></svg>`;
  if (name === "oboreol")
    return `<svg width="20" height="20" viewBox="0 0 20 20" style="vertical-align:middle"><circle cx="10" cy="10" r="8" fill="#b0b3c6"/></svg>`;
  return "";
}

// --- BASIC DARK STYLES (matches image2) ---
const style = document.createElement('style');
style.innerHTML = `
.p2p-dark {
  background: #183528;
  min-height: 100vh;
  color: #ddeee2;
  font-family: 'SF Pro Display', 'Roboto', Arial, sans-serif;
  padding: 0;
}
.market-tabs {
  display: flex;
  gap: 40px;
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 24px 0;
  padding: 28px 0 0 24px;
}
.tab {
  color: #8ca899;
  opacity: 0.7;
  cursor: pointer;
}
.tab.active {
  color: #ddeee2;
  opacity: 1;
  border-bottom: 2.5px solid #ddeee2;
}
.tab-gear {
  margin-left: auto;
  margin-right: 28px;
  width: 32px;
  height: 32px;
  background: none;
}
.market-filters {
  display: flex;
  gap: 8px;
  margin: 0 0 30px 24px;
}
.filter-btn {
  background: #214032;
  color: #ddeee2;
  border: none;
  border-radius: 10px;
  padding: 9px 28px;
  font-size: 19px;
  margin-right: 2px;
  cursor: pointer;
}
.arrow {
  font-size: 13px;
  margin-left: 8px;
}
.market-banner {
  background: #224332;
  border-radius: 14px;
  margin: 0 24px 32px 24px;
  padding: 24px;
  font-size: 26px;
  font-weight: 600;
  color: #ddeee2;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.banner-btn {
  background: #214032;
  color: #9edbb6;
  border-radius: 10px;
  border: none;
  padding: 13px 32px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
}
.offer-list {
  margin: 0 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.offer-card {
  background: #1b3b2b;
  border-radius: 16px;
  margin: 0 24px;
  padding: 24px 24px 20px 24px;
  box-shadow: 0 2px 12px #0000000a;
  font-size: 23px;
  position: relative;
}
.offer-card.warn { background: #263b25; }
.offer-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}
.offer-icon.status-dot.green {
  display: inline-block; width: 16px; height: 16px; border-radius: 50%; background: #4ee47e; margin-right: 6px;
}
.offer-icon.status-dot.yellow {
  display: inline-block; width: 16px; height: 16px; border-radius: 50%; background: #ffd34e; margin-right: 6px;
}
.offer-icon.warn-ico {
  color: #ffd34e;
  font-size: 24px;
  margin-right: 6px;
  vertical-align: middle;
}
.offer-username {
  color: #ddeee2;
  font-weight: 600;
  margin-right: 4px;
}
.offer-time {
  margin-left: 6px;
  color: #d7dba3;
  font-size: 19px;
  font-weight: 400;
}
.offer-orders {
  margin-left: auto;
  color: #8ca899;
  font-size: 19px;
  font-weight: 400;
}
.offer-price {
  font-size: 32px;
  color: #ddeee2;
  font-weight: 700;
  margin-bottom: 2px;
}
.offer-amount, .offer-limits {
  font-size: 21px;
  color: #b0c7b7;
  margin-bottom: 2px;
}
.offer-amount span, .offer-limits span { color: #ddeee2; }
.offer-methods {
  font-size: 19px;
  color: #9edbb6;
  margin-bottom: 8px;
}
.offer-method {
  margin-right: 8px;
  color: #8ca899;
}
.buy-btn {
  background: #214032;
  color: #9edbb6;
  border-radius: 10px;
  border: none;
  padding: 12px 38px;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 12px;
  float: right;
}
@media (max-width: 600px) {
  .market-tabs, .market-filters, .market-banner, .offer-card { margin-left: 0 !important; }
  .market-banner, .offer-card { margin-right: 0 !important; }
  .offer-card { padding: 20px 8px 16px 8px; font-size: 17px; }
  .market-banner { padding: 16px; font-size: 19px; }
}
`;
document.head.appendChild(style);

// --- INIT ---
document.addEventListener('DOMContentLoaded', renderMarket);
