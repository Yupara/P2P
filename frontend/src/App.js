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
// ... (всё, что выше в файле — оставить без изменений)

let currentDeal = null;
let chatMessages = [];
let dealTimer = null;

// --- Deal Page ---
function openDeal(id) {
  currentDeal = OFFERS.find(o => o.id === id);
  chatMessages = [
    {from: 'system', text: 'Чат сделки открыт. Не переводите деньги до согласования деталей.'}
  ];
  renderDealPage();
}
window.openDeal = openDeal;

function renderDealPage() {
  document.getElementById('main').innerHTML = `
    <div class="main">
      <div class="deal-header">
        <div class="deal-title">
          <span>${currentDeal.type === 'buy' ? i18n('buy') : i18n('sell')} ${currentDeal.crypto} / ${currentDeal.fiat}</span>
        </div>
        <div class="deal-timer" id="deal-timer">15:00</div>
      </div>
      <div class="deal-info">
        <div>
          <b>${i18n('order_amount')}</b> <span>${currentDeal.amount}</span>
        </div>
        <div>
          <b>${i18n('order_price')}</b> <span>${currentDeal.price} ${currentDeal.fiat}</span>
        </div>
        <div>
          <b>${i18n('limits')}</b> <span>${currentDeal.limits}</span>
        </div>
        <div>
          <b>${i18n('payment_methods')}</b> <span>${currentDeal.payMethods.join(', ')}</span>
        </div>
        <div>
          <b>${i18n('orders')}</b> <span>${currentDeal.orders}</span>
        </div>
      </div>
      <div class="deal-status" id="deal-status">${i18n('waiting_payment')}</div>
      <div class="deal-actions">
        <button class="deal-action-btn" onclick="dealPaid()">${i18n('paid')}</button>
        <button class="deal-action-btn" onclick="dealOpenDispute()">${i18n('open_dispute')}</button>
        <button class="deal-action-btn secondary" onclick="route('market')">${i18n('back')}</button>
      </div>
      <div class="deal-chat">
        <div class="deal-chat-title">${i18n('deal_chat')}</div>
        <div class="deal-chat-messages" id="deal-chat-messages"></div>
        <div class="deal-chat-input-row">
          <input id="deal-chat-input" type="text" placeholder="${i18n('write_message')}" />
          <button onclick="dealSendMessage()">${i18n('send')}</button>
        </div>
      </div>
      <div class="deal-dispute" id="deal-dispute" style="display:none"></div>
    </div>
  `;
  dealStartTimer();
  renderDealChat();
}
function dealStartTimer() {
  let seconds = 15 * 60;
  function formatTime(t) {
    let m = Math.floor(t/60), s = t%60;
    return `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
  }
  function updateTimer() {
    const el = document.getElementById('deal-timer');
    if (el) el.textContent = formatTime(seconds);
    if (seconds > 0) seconds--;
    else {
      clearInterval(dealTimer);
      document.getElementById('deal-status').textContent = i18n('deal_cancelled');
    }
  }
  dealTimer && clearInterval(dealTimer);
  setTimeout(() => {
    dealTimer = setInterval(updateTimer, 1000);
    updateTimer();
  }, 20);
}

function renderDealChat() {
  const box = document.getElementById('deal-chat-messages');
  if (!box) return;
  box.innerHTML = chatMessages.map(m => `
    <div class="deal-chat-msg ${m.from === 'me' ? 'me' : m.from === 'system' ? 'sys' : 'other'}">
      ${m.from === 'me' ? i18n('you') + ': ' : m.from === 'system' ? '' : i18n('counterpart') + ': '}
      ${m.text}
    </div>
  `).join('');
  box.scrollTop = box.scrollHeight;
}
function dealSendMessage() {
  const input = document.getElementById('deal-chat-input');
  if (!input.value.trim()) return;
  chatMessages.push({from: 'me', text: input.value});
  chatMessages.push({from: 'other', text: 'Спасибо, принято (бот-ответ)'});
  renderDealChat();
  input.value = '';
}
window.dealSendMessage = dealSendMessage;

// --- Deal actions ---
function dealPaid() {
  document.getElementById('deal-status').textContent = i18n('waiting_confirm');
  chatMessages.push({from: 'system', text: 'Ожидание подтверждения продавца. Средства находятся в эскроу.'});
  renderDealChat();
}
window.dealPaid = dealPaid;

function dealOpenDispute() {
  document.getElementById('deal-dispute').style.display = '';
  document.getElementById('deal-dispute').innerHTML = `
    <div class="deal-dispute-form">
      <b>${i18n('dispute_reason')}</b>
      <textarea id="dispute-text" rows="4" style="width:98%;border-radius:7px;"></textarea>
      <div>
        <label>${i18n('attach_proof')}</label>
        <input type="file" multiple accept="image/*,video/*" />
      </div>
      <button onclick="dealSubmitDispute()">${i18n('send_dispute')}</button>
    </div>
  `;
}
window.dealOpenDispute = dealOpenDispute;

function dealSubmitDispute() {
  document.getElementById('deal-status').textContent = i18n('dispute_processing');
  chatMessages.push({from: 'system', text: 'Спор открыт. Средства заморожены до решения.'});
  renderDealChat();
  document.getElementById('deal-dispute').style.display = 'none';
}
window.dealSubmitDispute = dealSubmitDispute;

// --- i18n keys (plug) ---
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
    deal_cancelled: 'Сделка отменена (просрочка таймера)'
  };
  return ru[key] || key;
}

window.i18n = i18n;

// --- Стилевой блок для страницы сделки ---
const dealCSS = `
.deal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 0 15px 0; border-bottom:1px solid var(--border); margin-bottom: 14px;
}
.deal-title { font-size: 1.2em; font-weight: 700; letter-spacing: 0.02em;}
.deal-timer { font-size: 1.13em; font-weight: 600; color: var(--red); background:#224930; padding:4px 13px; border-radius:8px; }
.deal-info { margin: 13px 0 13px 0;}
.deal-info>div {margin-bottom: 5px; font-size:1.07em;}
.deal-status { background: #1e3423; color: var(--yellow); border-radius:8px; padding: 9px 11px; margin-bottom: 10px; font-size:1.08em;}
.deal-actions { display: flex; gap: 12px; margin-bottom: 17px;}
.deal-action-btn { background: var(--btn-bg); color: var(--green); border:none; border-radius:8px; padding:10px 18px; font-size:1.03em; font-weight:600; cursor:pointer;}
.deal-action-btn.secondary { background:#183528; color:var(--yellow); border:1px solid var(--yellow);}
.deal-action-btn:hover { background: var(--green); color:#14461c; }
.deal-chat { background: #17351d; border-radius:11px; padding:13px 10px 10px 10px; margin-bottom: 12px;}
.deal-chat-title { font-weight:700; font-size:1.08em; margin-bottom:6px;}
.deal-chat-messages { max-height:120px; overflow-y:auto; background:#12281a; border-radius:7px; padding:7px; margin-bottom:7px; font-size:0.99em;}
.deal-chat-msg { margin-bottom:6px; }
.deal-chat-msg.me { color:var(--green);}
.deal-chat-msg.other { color:var(--yellow);}
.deal-chat-msg.sys { color:var(--text-muted); font-style:italic;}
.deal-chat-input-row { display: flex; gap: 7px;}
#deal-chat-input { flex:1; background:var(--bg-main); color:var(--text-main); border:1px solid var(--border); border-radius:6px; padding:7px 9px;}
.deal-dispute-form { background: #1e3423; border-radius:8px; padding:12px 8px; margin-top:8px;}
.deal-dispute-form textarea { width:97%; min-height:44px; margin-bottom:8px; border-radius:7px;}
`;

if (!document.getElementById('deal-css')) {
  const s = document.createElement('style');
  s.id = 'deal-css';
  s.innerHTML = dealCSS;
  document.head.appendChild(s);
}

// ... остальной код не менять
// ...оставить предыдущий код не изменённым (главная, фильтры, сделки, чат, спор и пр.)

// Данные пользователя (мок)
const USER = {
  id: 1,
  name: "DemoUser",
  avatar: "",
  kyc: false,
  balances: {
    USDT: 0,
    BTC: 0,
    RUB: 0,
    UAH: 0,
    KZT: 0,
  },
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
  kycStatus: "not_submitted", // "pending", "approved", "rejected"
  notifications: [
    { text: "Сделка #1 завершена", date: "2025-06-26 18:30" },
    { text: "Новый друг по рефералке зарегистрировался!", date: "2025-06-25 22:12" }
  ]
};

// Профиль пользователя
function renderProfile() {
  document.getElementById('main').innerHTML = `
    <div class="main">
      <div class="profile-card">
        <div class="profile-main">
          <div class="profile-avatar"></div>
          <div>
            <div class="profile-name">${USER.name}</div>
            <div class="profile-kyc">${USER.kycStatus === 'approved' ? 
              '<span class="kyc-approved">KYC: одобрено</span>' : 
              USER.kycStatus === 'pending' ? '<span class="kyc-pending">KYC: на проверке</span>' :
              '<span class="kyc-none">KYC: не пройден</span>'}
            </div>
          </div>
        </div>
        <div class="profile-balances">
          <div><b>USDT:</b> ${USER.balances.USDT.toFixed(2)}</div>
          <div><b>BTC:</b> ${USER.balances.BTC.toFixed(4)}</div>
          <div><b>RUB:</b> ${USER.balances.RUB.toLocaleString()}</div>
          <div><b>UAH:</b> ${USER.balances.UAH.toLocaleString()}</div>
          <div><b>KZT:</b> ${USER.balances.KZT.toLocaleString()}</div>
        </div>
        <div class="profile-actions">
          <button onclick="profileDeposit()">${i18n('deposit')}</button>
          <button onclick="profileWithdraw()">${i18n('withdraw')}</button>
          <button onclick="profileShowKYC()">${i18n('kyc')}</button>
        </div>
      </div>
      <div class="profile-section">
        <h3>${i18n('my_deals')}</h3>
        <table class="profile-table">
          <thead><tr>
            <th>${i18n('date')}</th>
            <th>${i18n('type')}</th>
            <th>${i18n('crypto')}</th>
            <th>${i18n('fiat')}</th>
            <th>${i18n('amount')}</th>
            <th>${i18n('price')}</th>
            <th>${i18n('status')}</th>
          </tr></thead>
          <tbody>
            ${USER.deals.map(d=>`
              <tr>
                <td>${d.date}</td>
                <td>${i18n(d.type)}</td>
                <td>${d.crypto}</td>
                <td>${d.fiat}</td>
                <td>${d.amount}</td>
                <td>${d.price}</td>
                <td>${i18n(d.result)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="profile-section">
        <h3>${i18n('ref_program')}</h3>
        <div>${i18n('your_ref_link')}: <span class="profile-ref-link">https://yourp2p.site/?ref=DEMO</span></div>
        <div>${i18n('earned_total')}: <b>${USER.totalEarned.toFixed(2)} USDT</b></div>
        <div>
          <b>${i18n('your_referrals')}:</b>
          <ul>
            ${USER.refs.map(r=>`<li>${r.name}: +${r.earned.toFixed(2)} USDT</li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="profile-section">
        <h3>${i18n('notifications')}</h3>
        <ul>
          ${USER.notifications.map(n=>`<li>${n.date}: ${n.text}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}
window.renderProfile = renderProfile;

// Депозит/вывод/kyc заглушки
function profileDeposit() {
  alert("Здесь будет пополнение через ссылку и сеть (заглушка)");
}
function profileWithdraw() {
  alert("Здесь будет вывод (заглушка)");
}
function profileShowKYC() {
  alert("Подача/статус KYC (заглушка)");
}
window.profileDeposit = profileDeposit;
window.profileWithdraw = profileWithdraw;
window.profileShowKYC = profileShowKYC;

// Навигация: добавляем вызов renderProfile
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
      renderProfile();
      break;
    case 'support':
      document.getElementById('nav-support').classList.add('active');
      document.getElementById('main').innerHTML = `<div class="main">Поддержка: <a href="https://t.me/p2pp2p_p2p" target="_blank">@p2pp2p_p2p</a></div>`;
      break;
  }
}
window.route = route;

// --- дополнительный CSS для профиля ---
const profileCSS = `
.profile-card {
  background: var(--bg-card);
  border-radius: 16px;
  padding: 18px 18px 14px 18px;
  margin-bottom: 22px;
}
.profile-main { display:flex; align-items:center; gap:18px; }
.profile-avatar { width:52px;height:52px;border-radius:50%;background:#204d36; }
.profile-name { font-weight:700;font-size:1.18em; margin-bottom:2px;}
.profile-kyc { font-size:0.98em; margin-bottom:3px;}
.kyc-approved { color:var(--green);}
.kyc-pending { color:var(--yellow);}
.kyc-none { color:var(--red);}
.profile-balances { display:flex; gap:18px; margin:13px 0 7px 0; font-size:1.08em;}
.profile-actions { display:flex; gap:10px; margin-bottom: 7px;}
.profile-actions button { background:var(--btn-bg);color:var(--green);border:none;border-radius:7px;padding:7px 17px;font-weight:600;cursor:pointer;}
.profile-actions button:hover { background:var(--green);color:#183528;}
.profile-section { background:var(--bg-card); border-radius:13px; margin-bottom:18px; padding:11px 13px;}
.profile-table { width:100%; border-collapse:collapse; margin-top:10px;}
.profile-table th,.profile-table td { padding:6px 7px; border-bottom:1px solid var(--border);}
.profile-table th { color:var(--yellow); font-size:1em;}
.profile-table td { color:var(--text-main);}
.profile-ref-link { color:var(--yellow); font-size:0.98em;}
@media (max-width: 600px) {
  .profile-main { flex-direction:column; gap:7px;}
  .profile-balances { flex-direction:column; gap:4px;}
}
`;
if (!document.getElementById('profile-css')) {
  const s = document.createElement('style');
  s.id = 'profile-css';
  s.innerHTML = profileCSS;
  document.head.appendChild(s);
}

// --- i18n расширяем ---
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
    success: 'Успешно', cancelled: 'Отмена'
  };
  return ru[key] || key;
}
window.i18n = i18n;

// ...остальной код не менять
// ...Оставь предыдущий код без изменений (главная, фильтры, сделки, профиль и т.д.)

// --- Регистрация и KYC ---
function renderRegister() {
  document.getElementById('main').innerHTML = `
    <div class="main">
      <div class="reg-card">
        <h2>Регистрация</h2>
        <div class="reg-step" id="reg-step1">
          <input id="reg-email" type="email" placeholder="Email" autocomplete="email" />
          <button onclick="regSendEmailCode()">Получить код</button>
        </div>
        <div class="reg-step" id="reg-step2" style="display:none;">
          <input id="reg-email-code" type="text" placeholder="Код из e-mail" />
          <button onclick="regCheckEmailCode()">Подтвердить</button>
        </div>
        <div class="reg-step" id="reg-step3" style="display:none;">
          <input id="reg-phone" type="tel" placeholder="Телефон" autocomplete="tel"/>
          <button onclick="regSendSMSCode()">Получить SMS-код</button>
        </div>
        <div class="reg-step" id="reg-step4" style="display:none;">
          <input id="reg-sms-code" type="text" placeholder="SMS-код" />
          <button onclick="regCheckSMSCode()">Подтвердить</button>
        </div>
        <div class="reg-step" id="reg-step5" style="display:none;">
          <label>Загрузите фото паспорта для верификации:</label>
          <input id="reg-passport" type="file" accept="image/*" />
          <button onclick="regUploadPassport()">Отправить на проверку</button>
        </div>
        <div class="reg-step" id="reg-step6" style="display:none;">
          <b>Ваша заявка на верификацию отправлена</b>
          <div>Ожидайте подтверждения модератором.</div>
        </div>
      </div>
    </div>
  `;
}
window.renderRegister = renderRegister;
function regSendEmailCode() {
  alert("Код отправлен на email (заглушка)");
  document.getElementById('reg-step2').style.display = '';
}
function regCheckEmailCode() {
  alert("Email подтверждён (заглушка)");
  document.getElementById('reg-step3').style.display = '';
}
function regSendSMSCode() {
  alert("SMS-код отправлен (заглушка)");
  document.getElementById('reg-step4').style.display = '';
}
function regCheckSMSCode() {
  alert("Телефон подтверждён (заглушка)");
  document.getElementById('reg-step5').style.display = '';
}
function regUploadPassport() {
  alert("Документ отправлен на модерацию (заглушка)");
  document.getElementById('reg-step6').style.display = '';
}
window.regSendEmailCode = regSendEmailCode;
window.regCheckEmailCode = regCheckEmailCode;
window.regSendSMSCode = regSendSMSCode;
window.regCheckSMSCode = regCheckSMSCode;
window.regUploadPassport = regUploadPassport;

// --- Поддержка (бот + Telegram) ---
function renderSupport() {
  document.getElementById('main').innerHTML = `
    <div class="main">
      <div class="support-card">
        <h2>Поддержка</h2>
        <div class="support-chat" id="support-chat">
          <div class="support-msg bot">Здравствуйте! Чем могу помочь?</div>
        </div>
        <div class="support-chat-input-row">
          <input id="support-input" type="text" placeholder="Ваш вопрос..." />
          <button onclick="sendSupportMsg()">Отправить</button>
        </div>
        <div style="margin-top:14px;">
          <b>Если нужна помощь оператора, напишите “оператор” — и мы уведомим администратора.</b>
          <div>Также вы можете написать напрямую в <a href="https://t.me/p2pp2p_p2p" target="_blank">Telegram @p2pp2p_p2p</a></div>
        </div>
      </div>
    </div>
  `;
}
window.renderSupport = renderSupport;

function sendSupportMsg() {
  const input = document.getElementById('support-input');
  if (!input.value.trim()) return;
  const chat = document.getElementById('support-chat');
  chat.innerHTML += `<div class="support-msg user">${input.value}</div>`;
  if (/оператор|operator/i.test(input.value)) {
    chat.innerHTML += `<div class="support-msg bot">Ваш запрос передан оператору. Ожидайте ответа администратора.</div>`;
    alert("Уведомление админу: пользователь запросил оператора!");
  } else if (/мошенник|fraud|scam/i.test(input.value)) {
    chat.innerHTML += `<div class="support-msg bot">Если вы подозреваете мошенничество — средства будут заморожены до разбирательства. Опишите проблему подробнее.</div>`;
  } else {
    chat.innerHTML += `<div class="support-msg bot">Спасибо за обращение! Мы обработаем ваш запрос.</div>`;
  }
  input.value = '';
  chat.scrollTop = chat.scrollHeight;
}
window.sendSupportMsg = sendSupportMsg;

// --- Рефералка и уведомления (пополнение/вывод с реф-баланса, уведомления) ---
// В профиле уже есть блок рефералки и уведомлений, добавим возможность "вывести"
function profileWithdraw() {
  alert(`Вывести с основного или реферального баланса (заглушка).\n\nРеферальный баланс: ${USER.totalEarned.toFixed(2)} USDT`);
}
window.profileWithdraw = profileWithdraw;

// --- Расширяем меню: добавить регистрацию и вход ---
document.querySelector('.header__nav').innerHTML +=
  `<button class="nav__btn" id="nav-register" onclick="route('register')">Регистрация</button>`;

function route(page) {
  document.querySelectorAll('.nav__btn').forEach(el=>el.classList.remove('active'));
  switch(page) {
    case 'market':
      document.getElementById('nav-market').classList.add('active');
      renderMarket();
      break;
    case 'orders':
      document.getElementById('nav-orders').classList.add('active');
      document.getElementById('main').innerHTML = `<div class="main">Здесь будет список ваших сделок</div>`;
      break;
    case 'profile':
      document.getElementById('nav-profile').classList.add('active');
      renderProfile();
      break;
    case 'support':
      document.getElementById('nav-support').classList.add('active');
      renderSupport();
      break;
    case 'register':
      document.getElementById('nav-register').classList.add('active');
      renderRegister();
      break;
  }
}
window.route = route;

// --- CSS для новых разделов ---
const extraCSS = `
.reg-card, .support-card {
  background: var(--bg-card);
  border-radius: 14px;
  padding: 18px 18px 14px 18px;
  max-width: 400px;
  margin: 30px auto 0 auto;
}
.reg-card h2, .support-card h2 { color: var(--yellow); margin-bottom:14px; }
.reg-step { margin-bottom: 10px; }
.reg-step input { background:var(--bg-main);color:var(--text-main);border:1px solid var(--border);border-radius:6px;padding:7px 9px;margin-bottom:7px;width:95%; }
.reg-step button { background:var(--btn-bg);color:var(--green);border:none;border-radius:7px;padding:7px 17px;font-weight:600;cursor:pointer;}
.reg-step button:hover { background:var(--green);color:#183528;}
.support-chat { background:#12281a; border-radius:7px; padding:7px; max-height:120px; overflow-y:auto; font-size:0.98em; margin-bottom:7px;}
.support-msg { margin-bottom:6px; }
.support-msg.user { color:var(--green); text-align:right;}
.support-msg.bot { color:var(--yellow); text-align:left;}
.support-chat-input-row { display:flex; gap:7px;}
#support-input { flex:1; background:var(--bg-main); color:var(--text-main); border:1px solid var(--border); border-radius:6px; padding:7px 9px;}
`;
if (!document.getElementById('extra-css')) {
  const s = document.createElement('style');
  s.id = 'extra-css';
  s.innerHTML = extraCSS;
  document.head.appendChild(s);
}

// ...остальной код не менять
// ...оставить предыдущий код без изменений

// --- История сделок пользователя ---
function renderOrders() {
  document.getElementById('main').innerHTML = `
    <div class="main">
      <div class="orders-card">
        <h2>${i18n('my_orders')}</h2>
        <table class="orders-table">
          <thead>
            <tr>
              <th>${i18n('date')}</th>
              <th>${i18n('type')}</th>
              <th>${i18n('crypto')}</th>
              <th>${i18n('fiat')}</th>
              <th>${i18n('amount')}</th>
              <th>${i18n('price')}</th>
              <th>${i18n('status')}</th>
              <th>${i18n('actions')}</th>
            </tr>
          </thead>
          <tbody id="orders-table-body">
            ${USER.deals.map((deal, idx) => `
              <tr>
                <td>${deal.date}</td>
                <td>${i18n(deal.type)}</td>
                <td>${deal.crypto}</td>
                <td>${deal.fiat}</td>
                <td>${deal.amount}</td>
                <td>${deal.price}</td>
                <td id="deal-status-${idx}">${i18n(deal.result)}</td>
                <td>
                  ${deal.result !== "dispute"
                    ? `<button onclick="openOrderDispute(${idx})">${i18n('open_dispute')}</button>`
                    : `<span class="dispute-opened">${i18n('dispute_opened')}</span>`
                  }
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div id="order-dispute-modal"></div>
    </div>
  `;
}
window.renderOrders = renderOrders;

// Открытие спора по сделке
function openOrderDispute(idx) {
  document.getElementById('order-dispute-modal').innerHTML = `
    <div class="order-dispute-modal">
      <div class="order-dispute-window">
        <h3>${i18n('open_dispute')}</h3>
        <div class="dispute-form">
          <label>${i18n('dispute_reason')}</label>
          <textarea id="order-dispute-reason" rows="3" style="width:96%"></textarea>
          <label style="margin-top:7px;">${i18n('attach_proof')}</label>
          <input type="file" id="order-dispute-files" multiple accept="image/*,video/*" />
          <div style="margin:12px 0 0 0;">
            <button onclick="submitOrderDispute(${idx})">${i18n('send_dispute')}</button>
            <button onclick="closeOrderDisputeModal()" style="margin-left:14px">${i18n('cancel')}</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
window.openOrderDispute = openOrderDispute;

function closeOrderDisputeModal() {
  document.getElementById('order-dispute-modal').innerHTML = '';
}
window.closeOrderDisputeModal = closeOrderDisputeModal;

// Отправка спора по сделке
function submitOrderDispute(idx) {
  // В реальном приложении - отправить данные на сервер
  USER.deals[idx].result = "dispute";
  closeOrderDisputeModal();
  renderOrders();
  alert("Ваш спор отправлен на рассмотрение. Средства заморожены.");
}
window.submitOrderDispute = submitOrderDispute;

// --- Роутинг: подключаем renderOrders ---
function route(page) {
  document.querySelectorAll('.nav__btn').forEach(el => el.classList.remove('active'));
  switch (page) {
    case 'market':
      document.getElementById('nav-market').classList.add('active');
      renderMarket();
      break;
    case 'orders':
      document.getElementById('nav-orders').classList.add('active');
      renderOrders();
      break;
    case 'profile':
      document.getElementById('nav-profile').classList.add('active');
      renderProfile();
      break;
    case 'support':
      document.getElementById('nav-support').classList.add('active');
      renderSupport();
      break;
    case 'register':
      document.getElementById('nav-register').classList.add('active');
      renderRegister();
      break;
  }
}
window.route = route;

// --- i18n дополнить ---
function i18n(key) {
  const ru = {
    // ...все предыдущие
    my_orders: 'Мои сделки',
    actions: 'Действия',
    cancel: 'Отмена',
    dispute_opened: 'Спор открыт',
    dispute: 'Спор'
  };
  return ru[key] || key;
}

// --- CSS для истории сделок и спора ---
const ordersCSS = `
.orders-card { background:var(--bg-card);border-radius:14px;padding:18px 14px 13px 14px; }
.orders-card h2 { color:var(--yellow);margin-bottom:14px;}
.orders-table { width:100%; border-collapse:collapse; }
.orders-table th, .orders-table td { padding:7px 6px; border-bottom:1px solid var(--border);}
.orders-table th { color:var(--yellow);}
.orders-table td { color:var(--text-main);}
.orders-table button { background:var(--btn-bg); color:var(--green); border:none; border-radius:6px; padding:6px 14px; font-weight:600; cursor:pointer;}
.orders-table button:hover { background:var(--green); color:#183528;}
.dispute-opened { color:var(--red); font-weight:600;}
.order-dispute-modal { position:fixed;top:0;left:0;right:0;bottom:0;z-index:9999;background:rgba(24,46,40,0.95);display:flex;align-items:center;justify-content:center;}
.order-dispute-window { background:var(--bg-card);border-radius:13px;padding:20px 18px;min-width:280px;max-width:350px;}
.order-dispute-window h3 {margin-top:0;}
.dispute-form textarea { width:97%; border-radius:7px; min-height:38px; margin-bottom:9px;}
`;
if (!document.getElementById('orders-css')) {
  const s = document.createElement('style');
  s.id = 'orders-css';
  s.innerHTML = ordersCSS;
  document.head.appendChild(s);
}

// ...остальной код не менять
