// --- Основные данные и state ---
const OFFERS_BUY = [
  /* ... (заполни реальные данные по офферам, пример есть выше) ... */
];
const OFFERS_SELL = [
  /* ... */
];
const CRYPTOS = ["USDT", "BTC", "ETH"];
const PAYMENTS = [
  { value: "", label: "Все способы оплаты" },
  { value: "SBP", label: "SBP" },
  { value: "Сбербанк", label: "Сбербанк" },
  { value: "QIWI", label: "QIWI" },
  { value: "кольнение", label: "кольнение" },
  { value: "Пиметы", label: "Пиметы" },
  { value: "Обореол", label: "Обореол" },
  { value: "sber", label: "Сбербанк" }
];
// --- State ---
let state = {
  tab: "buy",
  crypto: "USDT",
  amount: "",
  payment: "",
  view: "market", // market | deal | profile | orders | support | create
  currentOffer: null,
  chat: [],
  offersBuy: OFFERS_BUY,
  offersSell: OFFERS_SELL,
  sortField: 'price',
  sortDir: 'asc',
  onlyOnline: false,
  onlyVerified: false,
  noLowLimit: false,
  // Для истории сделок:
  ordersFilter: "all",
  ordersSearch: "",
  ordersList: [
    /* ... (пример структуры заказа смотри выше) ... */
  ]
  // Для KYC, уведомлений и отзывов — см. отдельные файлы reviews.js, orders_ext.js, и т.д.
};

// --- Навигация ---
function renderNav() {
  return `
    <div class="nav-bar">
      <span class="nav-btn${state.view === "market" ? " active" : ""}" onclick="goTo('market')">Маркет</span>
      <span class="nav-btn${state.view === "orders" ? " active" : ""}" onclick="goTo('orders')">Мои сделки</span>
      <span class="nav-btn${state.view === "profile" ? " active" : ""}" onclick="goTo('profile')">Профиль</span>
      <span class="nav-btn${state.view === "support" ? " active" : ""}" onclick="goTo('support')">Поддержка</span>
      <span class="nav-btn nav-btn-create" onclick="goTo('create')">+ Создать объявление</span>
    </div>
  `;
}
function goTo(view) {
  state.view = view;
  if (view === "market") renderMarket();
  if (view === "profile") renderProfile();
  if (view === "orders") renderOrders();
  if (view === "support") renderSupport();
  if (view === "create") renderCreateOffer();
}
window.goTo = goTo;

// --- (Вставь сюда функции рендера фильтров, офферов, отзывов, сделок, профиля, KYC, уведомлений — см. код выше!) ---

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => renderMarket());
