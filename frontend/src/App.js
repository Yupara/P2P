// --- Исходные данные (пример) ---
const OFFERS_BUY = [
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
const OFFERS_SELL = [
  {
    id: 4,
    user: "SellMaster",
    online: true,
    verified: true,
    price: "70,80",
    fiat: "RUB",
    crypto: "USDT",
    amount: "200,0000 USDT",
    limits: "1000 – 200 000 RUB",
    orders: 34,
    percent: 12,
    time: null,
    payMethods: [
      { icon: "sbp", name: "SBP" },
      { icon: "sber", name: "Сбербанк" }
    ],
    warn: false
  },
  {
    id: 5,
    user: "Топ_Продаж",
    online: false,
    verified: false,
    price: "71,10",
    fiat: "RUB",
    crypto: "USDT",
    amount: "180,5000 USDT",
    limits: "2000 – 150 000 RUB",
    orders: 19,
    percent: 8,
    time: "20 мин.",
    payMethods: [
      { icon: "qiwi", name: "QIWI" }
    ],
    warn: true
  }
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

// --- Глобальное состояние ---
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
  // --- ДОБАВЛЕНО: сортировка и фильтры ---
  sortField: 'price',
  sortDir: 'asc',
  onlyOnline: false,
  onlyVerified: false,
  noLowLimit: false,
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

// --- Фильтры, сортировка, быстрые фильтры ---
function renderMarketFilters() {
  return `
    <div class="market-filters">
      <button class="filter-btn" onclick="showSelect('crypto')">${state.crypto} <span class="arrow">&#9662;</span></button>
      <button class="filter-btn" onclick="enterAmount()">${state.amount ? state.amount : "Сумма"} <span class="arrow">&#9662;</span></button>
      <button class="filter-btn" onclick="showSelect('payment')">${getPaymentLabel(state.payment)} <span class="arrow">&#9662;</span></button>
      <button class="filter-btn" onclick="applyFilters()">Фильтр</button>
      <div class="sort-group" style="margin-top:8px;">
        <span>Сортировка:</span>
        <button class="sort-btn" onclick="setSort('price')">Цена ${getSortMark('price')}</button>
        <button class="sort-btn" onclick="setSort('limits')">Лимит ${getSortMark('limits')}</button>
        <button class="sort-btn" onclick="setSort('amount')">Объем ${getSortMark('amount')}</button>
        <button class="sort-btn" onclick="setSort('rating')">Рейтинг ${getSortMark('rating')}</button>
      </div>
      <div class="fast-filters">
        <label><input type="checkbox" onchange="toggleFast('onlyOnline')" ${state.onlyOnline ? "checked" : ""}/> Только онлайн</label>
        <label><input type="checkbox" onchange="toggleFast('onlyVerified')" ${state.onlyVerified ? "checked" : ""}/> Только проверенные</label>
        <label><input type="checkbox" onchange="toggleFast('noLowLimit')" ${state.noLowLimit ? "checked" : ""}/> Без низких лимитов</label>
      </div>
    </div>
  `;
}
function setSort(field) {
  if (state.sortField === field) {
    state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    state.sortField = field;
    state.sortDir = 'asc';
  }
  renderMarket();
}
window.setSort = setSort;
function getSortMark(field) {
  if (state.sortField !== field) return '';
  return state.sortDir === 'asc' ? '↑' : '↓';
}
function toggleFast(key) {
  state[key] = !state[key];
  renderMarket();
}
window.toggleFast = toggleFast;

// --- Получить фильтрованные и отсортированные офферы ---
function getFilteredOffers() {
  let arr = state.tab === "buy" ? state.offersBuy : state.offersSell;
  arr = arr.filter(o =>
    o.crypto === state.crypto &&
    (!state.amount || parseFloat(o.amount) >= parseFloat(state.amount)) &&
    (!state.payment || o.payMethods.find(pm => pm.name === state.payment || pm.icon === state.payment)) &&
    (!state.onlyOnline || o.online) &&
    (!state.onlyVerified || o.verified) &&
    (!state.noLowLimit || parseInt((o.limits || "0").replace(/[^0-9]/g,'')) > 1000)
  );
  arr = arr.slice().sort((a, b) => {
    let f = state.sortField;
    let dir = state.sortDir === 'asc' ? 1 : -1;
    if (f === 'price') return (parseFloat(a.price.replace(',','.')) - parseFloat(b.price.replace(',','.'))) * dir;
    if (f === 'limits') {
      let al = parseInt((a.limits||"0").replace(/[^0-9]/g,'')), bl = parseInt((b.limits||"0").replace(/[^0-9]/g,''));
      return (al - bl) * dir;
    }
    if (f === 'amount') return (parseFloat(a.amount) - parseFloat(b.amount)) * dir;
    if (f === 'rating') return (b.percent - a.percent) * dir;
    return 0;
  });
  return arr;
}

// --- MARKET PAGE ---
function renderMarket() {
  document.getElementById('main').innerHTML = `
    ${renderNav()}
    <div class="p2p-dark">
      <div class="market-tabs">
        <span class="tab${state.tab === "buy" ? " active" : ""}" onclick="switchTab('buy')">Покупка</span>
        <span class="tab${state.tab === "sell" ? " active" : ""}" onclick="switchTab('sell')">Продажа</span>
        <span class="tab-gear"></span>
      </div>
      ${renderMarketFilters()}
      <div class="market-banner">
        <span>Попробуйте P2P HotSwap – лучшие ставки и больше ликвидности!</span>
        <button class="banner-btn">Узнать волью</button>
      </div>
      <div class="offer-list">
        ${getFilteredOffers().map(offer => renderOfferCard(offer)).join('')}
      </div>
    </div>
    <div id="custom-select-modal"></div>
    <div id="amount-modal"></div>
  `;
}
window.renderMarket = renderMarket;

function switchTab(tab) {
  state.tab = tab;
  renderMarket();
}
window.switchTab = switchTab;

// --- Страница создания объявления ---
function renderCreateOffer() {
  document.getElementById('main').innerHTML = `
    ${renderNav()}
    <div class="p2p-dark">
      <div class="create-offer-card">
        <h2>Создать объявление</h2>
        <form id="create-offer-form" onsubmit="event.preventDefault(); submitCreateOffer();">
          <label>Тип операции:
            <select id="create-type">
              <option value="buy">Покупка</option>
              <option value="sell">Продажа</option>
            </select>
          </label>
          <label>Криптовалюта:
            <select id="create-crypto">
              ${CRYPTOS.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </label>
          <label>Цена:
            <input type="number" step="0.01" id="create-price" required placeholder="Введите цену">
          </label>
          <label>Объем (например, 100.00 USDT):
            <input type="text" id="create-amount" required placeholder="Пример: 100.00 USDT">
          </label>
          <label>Лимиты (например, 1000 – 100000 RUB):
            <input type="text" id="create-limits" required placeholder="Пример: 1000 – 100000 RUB">
          </label>
          <label>Способы оплаты:
            <input type="text" id="create-payments" required placeholder="Например: SBP, QIWI">
          </label>
          <button class="create-btn" type="submit">Создать</button>
          <button class="create-btn cancel" type="button" onclick="goTo('market')">Отмена</button>
        </form>
      </div>
    </div>
  `;
}
window.renderCreateOffer = renderCreateOffer;

function submitCreateOffer() {
  const type = document.getElementById('create-type').value;
  const crypto = document.getElementById('create-crypto').value;
  const price = document.getElementById('create-price').value;
  const amount = document.getElementById('create-amount').value;
  const limits = document.getElementById('create-limits').value;
  const payments = document.getElementById('create-payments').value.split(',').map(x=>x.trim()).filter(x=>x);
  const obj = {
    id: Date.now(),
    user: "Вы",
    online: true,
    verified: false,
    price: price,
    fiat: "RUB",
    crypto,
    amount,
    limits,
    orders: 0,
    percent: 0,
    time: null,
    payMethods: payments.map(p=>({icon:p.toLowerCase().replace(/[^a-zа-я0-9]/gi,''), name:p})),
    warn: false
  };
  if (type === "buy") state.offersBuy.unshift(obj);
  else state.offersSell.unshift(obj);
  goTo('market');
  setTimeout(()=>alert('Объявление создано!'), 100);
}
window.submitCreateOffer = submitCreateOffer;

// --- Оставь свои другие функции тут без изменений (renderOfferCard, renderDeal, renderProfile, renderOrders, renderSupport и т.д.) ---
// --- INIT ---
document.addEventListener('DOMContentLoaded', () => renderMarket());
