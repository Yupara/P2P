// --- Данные ---
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
let state = {
  fiat: 'RUB',
  crypto: 'USDT',
  payment: '',
  amount: '',
  type: 'buy'
};

// --- Мок-пользователь ---
const USER = {
  id: 1,
  name: "DemoUser",
  avatar: "",
  kyc: false,
  balances: { USDT: 0, BTC: 0, RUB: 0, UAH: 0, KZT: 0 },
  deals: [
    { id: 1, date: "2025-06-26 18:23", type: "buy", crypto: "USDT", fiat: "RUB", amount: 120, price: "70.90", result: "success" },
    { id: 2, date: "2025-06-25 16:10", type: "sell", crypto: "BTC", fiat: "RUB", amount: 0.01, price: "6 370 000", result: "success" },
    { id: 3, date: "2025-06-23 12:37", type: "buy", crypto: "USDT", fiat: "KZT", amount: 500, price: "486", result: "cancelled" }
  ],
  refs: [
    { name: "friend1", earned: 1.5 },
    { name: "friend2", earned: 0.6 }
  ],
  totalEarned: 7.25,
  kycStatus: "not_submitted",
  notifications: [
    { text: "Сделка #1 завершена", date: "2025-06-26 18:30" },
    { text: "Новый друг по рефералке зарегистрировался!", date: "2025-06-25 22:12" }
  ]
};

// --- i18n ---
function i18n(key) {
  const ru = {
    market: 'Маркет', my_orders: 'Мои сделки', profile: 'Профиль', support: 'Поддержка',
    orders: 'Ордеров', limits: 'Лимиты', buy: 'Покупка', sell: 'Продажа', amount: 'Количество',
    filter: 'Фильтр', order_amount: 'Сумма', order_price: 'Цена', payment_methods: 'Платежные системы',
    waiting_payment: 'Ожидается оплата от покупателя', waiting_confirm: 'Ожидается подтверждение продавца',
    deal_chat: 'Чат сделки', write_message: 'Введите сообщение...', send: 'Отправить',
    paid: 'Я оплатил', open_dispute: 'Открыть спор', back: 'Назад', you: 'Вы', counterpart: 'Собеседник',
    dispute_reason: 'Причина спора', attach_proof: 'Приложите скриншоты/видео', send_dispute: 'Отправить спор',
    dispute_processing: 'Спор рассматривается модератором. Средства заморожены.',
    deal_cancelled: 'Сделка отменена (просрочка таймера)',
    deposit: 'Пополнить', withdraw: 'Вывести', kyc: 'Верификация',
    my_deals: 'Мои сделки', date: 'Дата', type: 'Тип', crypto: 'Крипта', fiat: 'Фиат', status: 'Статус',
    ref_program: 'Реферальная программа', your_ref_link: 'Ваша реф. ссылка', earned_total: 'Заработано всего',
    your_referrals: 'Ваши рефералы', notifications: 'Уведомления',
    success: 'Успешно', cancelled: 'Отмена', actions: 'Действия', cancel: 'Отмена', dispute_opened: 'Спор открыт',
    dispute: 'Спор', seller_info: 'Информация о продавце', about_seller: 'О продавце', nickname: 'Ник',
    percent: 'Процент', reviews: 'Отзывы', details: 'Подробнее', price: 'Цена'
  };
  return ru[key] || key;
}

// --- Toast уведомления ---
function showToast(msg, type = 'info') {
  let el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => { el.classList.add('show'); }, 30);
  setTimeout(() => { el.classList.remove('show'); }, 4000);
  setTimeout(() => { el.remove(); }, 4500);
}

// --- Fade-анимация для main ---
function fadeMain(fn) {
  const main = document.getElementById('main');
  main.classList.add('fade');
  setTimeout(() => {
    fn();
    setTimeout(() => main.classList.remove('fade'), 70);
  }, 170);
}

// --- Маркет (главная) ---
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

function applyFilters() {
  state.crypto = document.getElementById('crypto-filter').value;
  state.fiat = document.getElementById('fiat-filter').value;
  state.payment = document.getElementById('payment-filter').value;
  state.amount = document.getElementById('amount-input').value;
  renderOfferList();
}
window.applyFilters = applyFilters;

// Список офферов (с деталями и кнопкой подробнее)
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
        <span class="offer-card__name" style="cursor:pointer" onclick="openOfferDetails(${o.id})">${o.user}</span>
        ${o.online ? '' : '<span class="offer-card__stat">15 мин.</span>'}
        <span class="offer-card__stat">${o.orders} ${i18n('orders')} | ${o.percent} %</span>
      </div>
      <div class="offer-card__price">${o.fiat === 'RUB' ? '₽' : o.fiat === 'UAH' ? '₴' : o.fiat === 'USD' ? '$' : o.fiat} ${o.price}</div>
      <div class="offer-card__usdt">${i18n('amount')} ${o.amount}</div>
      <div class="offer-card__limits">${i18n('limits')} ${o.limits}</div>
      <div class="offer-card__pay">${o.payMethods.map(pm=>`<span>${pm}</span>`).join('')}</div>
      <div class="offer-card__action-row">
        <button class="offer-card__btn" onclick="openDeal(${o.id})">${state.type === "buy" ? i18n('buy') : i18n('sell')}</button>
        <button class="offer-card__btn secondary" style="margin-left:7px" onclick="openOfferDetails(${o.id})">${i18n('details')}</button>
      </div>
    </div>
  `).join('');
}

// --- Публичная страница объявления ---
function openOfferDetails(offerId) {
  const offer = OFFERS.find(o => o.id === offerId);
  if (!offer) {
    showToast("Объявление не найдено", "error");
    return;
  }
  document.getElementById('main').innerHTML = `
    <div class="main">
      <div class="offer-details-card">
        <div class="offer-details-header">
          <div class="offer-details-user">
            <span class="offer-card__avatar">
              <span class="offer-card__dot${offer.verified ? '' : ' warn'}"></span>
            </span>
            <span class="offer-card__name">${offer.user}</span> 
            <span class="offer-details-stat">${offer.orders} ${i18n('orders')} | ${offer.percent} %</span>
          </div>
          <div class="offer-details-type">${state.type === 'buy' ? i18n('buy') : i18n('sell')} ${offer.crypto} / ${offer.fiat}</div>
        </div>
        <div class="offer-details-row">
          <b>${i18n('price')}:</b> <span>${offer.fiat === 'RUB' ? '₽' : offer.fiat === 'UAH' ? '₴' : offer.fiat === 'USD' ? '$' : offer.fiat} ${offer.price}</span>
        </div>
        <div class="offer-details-row"><b>${i18n('amount')}:</b> <span>${offer.amount}</span></div>
        <div class="offer-details-row"><b>${i18n('limits')}:</b> <span>${offer.limits}</span></div>
        <div class="offer-details-row"><b>${i18n('payment_methods')}:</b> <span>${offer.payMethods.join(', ')}</span></div>
        <div class="offer-details-row">
          <button class="offer-details-btn" onclick="openDeal(${offer.id})">${state.type === "buy" ? i18n('buy') : i18n('sell')}</button>
        </div>
      </div>
      <div class="offer-profile-card">
        <h4>${i18n('seller_info')}</h4>
        <div>${i18n('nickname')}: <b>${offer.user}</b></div>
        <div>${i18n('orders')}: ${offer.orders}</div>
        <div>${i18n('percent')}: ${offer.percent}%</div>
        <div>${i18n('payment_methods')}: ${offer.payMethods.join(', ')}</div>
        <div>${i18n('about_seller')}: <span class="seller-about">${offer.user === 'Savak' ? 'Опытный продавец, быстрые переводы.' : 'Проверенный пользователь.'}</span></div>
      </div>
      <div class="offer-feedback-card">
        <h4>${i18n('reviews')}</h4>
        <div>
          <div class="feedback-row"><span class="feedback-user">trader1</span>: Всё отлично, быстро!</div>
          <div class="feedback-row"><span class="feedback-user">crypto4u</span>: Сработал без нареканий.</div>
        </div>
      </div>
    </div>
  `;
}
window.openOfferDetails = openOfferDetails;

// ... (оставшаяся часть файла не изменилась, смотри предыдущий ответ для полной версии, если нужно)
