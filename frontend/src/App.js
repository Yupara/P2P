// Моковые валюты, платежки, фиаты
const FIAT = [
  { code: 'RUB', name: 'Russian Ruble' }, { code: 'UAH', name: 'Ukrainian Hryvnia' }, { code: 'USD', name: 'US Dollar' },
  { code: 'KZT', name: 'Kazakh Tenge' }, { code: 'TRY', name: 'Turkish Lira' }, { code: 'EUR', name: 'Euro' }
];
const CRYPTO = [
  { code: 'USDT', name: 'Tether' }, { code: 'BTC', name: 'Bitcoin' }, { code: 'ETH', name: 'Ethereum' }
];
const PAYMENT = [
  'SBP','Сбербанк','QIWI','Monobank','PUMB','Kaspi','Tinkoff','YooMoney','Raiffeisen','Payeer','WebMoney','Skrill',
  'Advcash','Alfa-Bank','VISA/MC','Revolut','Wise','ПриватБанк'
];

// Моковые офферы
const OFFERS = [
  {
    id: 1, user: "Savak", online: true, verified: true, price: "70,96", fiat: "RUB", crypto: "USDT",
    amount: "304,7685 USDT", limits: "500 – 500 000 RUB", orders: 40, percent: 10,
    payMethods: ["SBP", "Сбербанк", "QIWI"]
  },
  {
    id: 2, user: "CryptoPartner", online: false, verified: false, price: "71,03", fiat: "RUB", crypto: "USDT",
    amount: "128,8821 USDT", limits: "500 – 500 000 RUB", orders: 15, percent: 10,
    payMethods: ["Kaspi", "ПриватБанк", "Monobank"]
  },
  {
    id: 3, user: "BTC_Market", online: true, verified: true, price: "6 350 000", fiat: "RUB", crypto: "BTC",
    amount: "0,047 BTC", limits: "10 000 – 1 000 000 RUB", orders: 122, percent: 5,
    payMethods: ["Tinkoff", "YooMoney"]
  },
  {
    id: 4, user: "USDT_Seller", online: true, verified: false, price: "70,80", fiat: "KZT", crypto: "USDT",
    amount: "500 USDT", limits: "20 000 – 2 000 000 KZT", orders: 8, percent: 15,
    payMethods: ["Kaspi", "Payeer"]
  }
];

// Хранилище состояния
let state = {
  fiat: 'RUB',
  crypto: 'USDT',
  payment: '',
  amount: '',
  type: 'buy'
};

function i18n(key) {
  // plug, switch later
  return key;
}

// Рендер главной страницы (ордербук)
function renderMarket() {
  document.getElementById('main').innerHTML = `
    <div class="main">
      <div class="banner">Попробуйте P2P HotSwap – лучшие ставки и больше ликвидности! <span><button class="banner__btn">Узнать волью</button></span></div>
      <div class="market-filters">
        <select id="crypto-filter">${CRYPTO.map(c=>`<option value="${c.code}">${c.code}</option>`).join('')}</select>
        <select id="fiat-filter">${FIAT.map(f=>`<option value="${f.code}">${f.code}</option>`).join('')}</select>
        <input id="amount-input" placeholder="Сумма" type="number" min="0" style="width:90px">
        <select id="payment-filter"><option value="">Все платежные системы</option>${PAYMENT.map(p=>`<option value="${p}">${p}</option>`).join('')}</select>
        <button onclick="applyFilters()">${i18n('filter')}</button>
      </div>
      <div class="offer-list" id="offer-list"></div>
    </div>
  `;
  document.getElementById('crypto-filter').value = state.crypto;
  document.getElementById('fiat-filter').value = state.fiat;
  document.getElementById('payment-filter').value = state.payment;
  document.getElementById('amount-input').value = state.amount;
  renderOfferList();
}
window.renderMarket = renderMarket;

// Применить фильтры и обновить список
function applyFilters() {
  state.crypto = document.getElementById('crypto-filter').value;
  state.fiat = document.getElementById('fiat-filter').value;
  state.payment = document.getElementById('payment-filter').value;
  state.amount = document.getElementById('amount-input').value;
  renderOfferList();
}
window.applyFilters = applyFilters;

// Список офферов (с учетом фильтров)
function renderOfferList() {
  let offers = OFFERS.filter(o =>
    o.crypto === state.crypto &&
    o.fiat === state.fiat &&
    (!state.payment || o.payMethods.includes(state.payment)) &&
    (!state.amount || parseFloat(o.amount) >= parseFloat(state.amount))
  );
  if (offers.length === 0) {
    document.getElementById('offer-list').innerHTML = `<div style="color:var(--text-muted);margin:20px;text-align:center;">Нет подходящих объявлений</div>`;
    return;
  }
  document.getElementById('offer-list').innerHTML = offers.map(o => `
    <div class="offer-card">
      <div class="offer-card__header">
        <span class="offer-card__avatar">
          <span class="offer-card__dot${o.verified ? '' : ' warn'}"></span>
        </span>
        <span class="offer-card__name">${o.user}</span>
        ${o.online ? '' : '<span class="offer-card__stat">15 мин.</span>'}
        <span class="offer-card__stat">${o.orders} ${i18n('orders')} | ${o.percent} %</span>
      </div>
      <div class="offer-card__price">${o.fiat === 'RUB' ? '₽' : o.fiat === 'UAH' ? '₴' : o.fiat === 'USD' ? '$' : o.fiat} ${o.price}</div>
      <div class="offer-card__usdt">${i18n('amount')} ${o.amount}</div>
      <div class="offer-card__limits">${i18n('limits')} ${o.limits}</div>
      <div class="offer-card__pay">${o.payMethods.map(pm=>`<span>${pm}</span>`).join('')}</div>
      <div class="offer-card__action-row">
        <button class="offer-card__btn" onclick="openDeal(${o.id})">${state.type === "buy" ? i18n('buy') : i18n('sell')}</button>
      </div>
    </div>
  `).join('');
}

// Роутинг (главная/сделки/профиль/поддержка)
function route(page) {
  document.querySelectorAll('.nav__btn').forEach(el=>el.classList.remove('active'));
  switch(page) {
    case 'market':
      document.getElementById('nav-market').classList.add('active');
      renderMarket();
      break;
    case 'orders':
      document.getElementById('nav-orders').classList.add('active');
      // todo: renderOrders();
      document.getElementById('main').innerHTML = `<div class="main">Здесь будет список ваших сделок</div>`;
      break;
    case 'profile':
      document.getElementById('nav-profile').classList.add('active');
      document.getElementById('main').innerHTML = `<div class="main">Здесь будет ваш кабинет</div>`;
      break;
    case 'support':
      document.getElementById('nav-support').classList.add('active');
      document.getElementById('main').innerHTML = `<div class="main">Поддержка: <a href="https://t.me/p2pp2p_p2p" target="_blank">@p2pp2p_p2p</a></div>`;
      break;
  }
}
window.route = route;

// Язык (заглушка)
function setLang(lang) {
  // todo: переключить язык
}
window.setLang = setLang;

// Открыть сделку (заглушка)
function openDeal(id) {
  alert("Дальше будет страница сделки, чат, спор, таймер и т.п.");
}
window.openDeal = openDeal;

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  renderMarket();
});
