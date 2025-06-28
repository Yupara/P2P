// --- DATA ---
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

let state = {
  tab: "buy", // buy | sell
  crypto: "USDT",
  amount: "",
  payment: "",
  view: "market", // market | deal | profile | orders | support
  currentOffer: null,
  chat: []
};

// --- NAVIGATION ---
function renderNav() {
  return `
    <div class="nav-bar">
      <span class="nav-btn${state.view === "market" ? " active" : ""}" onclick="goTo('market')">Маркет</span>
      <span class="nav-btn${state.view === "orders" ? " active" : ""}" onclick="goTo('orders')">Мои сделки</span>
      <span class="nav-btn${state.view === "profile" ? " active" : ""}" onclick="goTo('profile')">Профиль</span>
      <span class="nav-btn${state.view === "support" ? " active" : ""}" onclick="goTo('support')">Поддержка</span>
    </div>
  `;
}
function goTo(view) {
  state.view = view;
  if (view === "market") renderMarket();
  if (view === "profile") renderProfile();
  if (view === "orders") renderOrders();
  if (view === "support") renderSupport();
}
window.goTo = goTo;

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
      <div class="market-filters">
        <button class="filter-btn" onclick="showSelect('crypto')">${state.crypto} <span class="arrow">&#9662;</span></button>
        <button class="filter-btn" onclick="enterAmount()">${state.amount ? state.amount : "Сумма"} <span class="arrow">&#9662;</span></button>
        <button class="filter-btn" onclick="showSelect('payment')">${getPaymentLabel(state.payment)} <span class="arrow">&#9662;</span></button>
        <button class="filter-btn" onclick="applyFilters()">Фильтр</button>
      </div>
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

function showSelect(type) {
  if (type === "crypto") {
    document.getElementById("custom-select-modal").innerHTML = `
      <div class="modal-bg" onclick="closeModal('custom-select-modal')"></div>
      <div class="modal-window">
        ${CRYPTOS.map(c => `<div class="modal-option" onclick="selectCrypto('${c}')">${c}</div>`).join('')}
      </div>
    `;
  } else if (type === "payment") {
    document.getElementById("custom-select-modal").innerHTML = `
      <div class="modal-bg" onclick="closeModal('custom-select-modal')"></div>
      <div class="modal-window">
        ${PAYMENTS.map(p => `<div class="modal-option" onclick="selectPayment('${p.value}')">${p.label}</div>`).join('')}
      </div>
    `;
  }
}
function selectCrypto(c) {
  state.crypto = c;
  closeModal("custom-select-modal");
  renderMarket();
}
window.selectCrypto = selectCrypto;
function selectPayment(p) {
  state.payment = p;
  closeModal("custom-select-modal");
  renderMarket();
}
window.selectPayment = selectPayment;
function closeModal(id) {
  document.getElementById(id).innerHTML = "";
}
function enterAmount() {
  document.getElementById("amount-modal").innerHTML = `
    <div class="modal-bg" onclick="closeModal('amount-modal')"></div>
    <div class="modal-window">
      <input id="amount-input-modal" style="width:90%;font-size:24px;padding:8px;border-radius:7px;margin-bottom:16px;" type="number" placeholder="Введите сумму" value="${state.amount ? state.amount : ""}">
      <button style="padding:6px 22px;font-size:20px;" onclick="setAmount()">OK</button>
    </div>
  `;
  setTimeout(() => { document.getElementById('amount-input-modal').focus(); }, 50);
}
function setAmount() {
  state.amount = document.getElementById("amount-input-modal").value;
  closeModal("amount-modal");
  renderMarket();
}
function getPaymentLabel(val) {
  return PAYMENTS.find(p => p.value === val)?.label || "Все способы оплаты";
}
function applyFilters() {
  renderMarket();
}
function getFilteredOffers() {
  let arr = state.tab === "buy" ? OFFERS_BUY : OFFERS_SELL;
  return arr.filter(o =>
    o.crypto === state.crypto &&
    (!state.amount || parseFloat(o.amount) >= parseFloat(state.amount)) &&
    (!state.payment || o.payMethods.find(pm => pm.name === state.payment || pm.icon === state.payment))
  );
}

// --- OFFER CARD ---
function renderOfferCard(offer) {
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
    <div class="offer-card${offer.warn ? " warn" : ""}" onclick="openDeal(${offer.id})" style="cursor:pointer;">
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
      <div class="offer-cta"><button class="buy-btn" onclick="event.stopPropagation(); openDeal(${offer.id})">${state.tab === "buy" ? "Покупка" : "Продажа"}</button></div>
    </div>
  `;
}
function methodIcon(name) {
  if (name === "sbp")
    return `<svg width="20" height="20" viewBox="0 0 20 20" style="vertical-align:middle"><circle cx="10" cy="10" r="8" fill="#38cc6c"/></svg>`;
  if (name === "kol")
    return `<svg width="20" height="20" viewBox="0 0 20 20" style="vertical-align:middle"><circle cx="10" cy="10" r="8" fill="#7ad1b4"/></svg>`;
  if (name === "pimet")
    return `<svg width="20" height="20" viewBox="0 0 20 20" style="vertical-align:middle"><circle cx="10" cy="10" r="8" fill="#e2c84c"/></svg>`;
  if (name === "oboreol")
    return `<svg width="20" height="20" viewBox="0 0 20 20" style="vertical-align:middle"><circle cx="10" cy="10" r="8" fill="#b0b3c6"/></svg>`;
  if (name === "sber")
    return `<svg width="20" height="20" viewBox="0 0 20 20" style="vertical-align:middle"><circle cx="10" cy="10" r="8" fill="#50c878"/></svg>`;
  if (name === "qiwi")
    return `<svg width="20" height="20" viewBox="0 0 20 20" style="vertical-align:middle"><circle cx="10" cy="10" r="8" fill="#ffb800"/></svg>`;
  return "";
}

// --- DEAL PAGE (DEAL + CHAT + BUTTONS) ---
function openDeal(id) {
  let arr = state.tab === "buy" ? OFFERS_BUY : OFFERS_SELL;
  const offer = arr.find(o => o.id === id);
  state.currentOffer = offer;
  state.view = "deal";
  state.chat = [
    {from: 'system', text: 'Чат сделки открыт. Не переводите деньги до согласования деталей.'}
  ];
  renderDeal();
}
window.openDeal = openDeal;

function renderDeal() {
  const offer = state.currentOffer;
  document.getElementById('main').innerHTML = `
    ${renderNav()}
    <div class="p2p-dark">
      <div class="deal-header">
        <button onclick="backToMarket()" class="back-btn">&#8592; Назад</button>
        <span class="deal-title">${state.tab === "buy" ? "Покупка" : "Продажа"} ${offer.crypto} / ${offer.fiat}</span>
      </div>
      <div class="offer-card deal-offer-card">
        <div class="offer-header">
          ${offer.warn ? `<span class="offer-icon warn-ico">&#9888;</span>` : ""}
          ${offer.warn
            ? `<span class="offer-icon status-dot yellow"></span>`
            : `<span class="offer-icon status-dot green"></span>`}
          <span class="offer-username">${offer.user}</span>
          ${offer.time ? `<span class="offer-time">${offer.time}</span>` : ""}
          <span class="offer-orders">${offer.orders} Ордеров | ${offer.percent} %</span>
        </div>
        <div class="offer-price">₽ ${offer.price}</div>
        <div class="offer-amount">Количество <span>${offer.amount}</span></div>
        <div class="offer-limits">Лимиты <span>${offer.limits}</span></div>
        ${offer.payMethods.length ? `<div class="offer-methods">${offer.payMethods.map(m=>`${methodIcon(m.icon)} ${m.name}`).join(" | ")}</div>` : ""}
      </div>
      <div class="deal-status" id="deal-status">Ожидается оплата от покупателя</div>
      <div class="deal-actions">
        <button class="deal-btn" onclick="dealPaid()">Я оплатил</button>
        <button class="deal-btn" onclick="dealOpenDispute()">Открыть спор</button>
      </div>
      <div class="deal-chat">
        <div class="deal-chat-title">Чат сделки</div>
        <div class="deal-chat-messages" id="deal-chat-messages"></div>
        <div class="deal-chat-input-row">
          <input id="deal-chat-input" type="text" placeholder="Введите сообщение..." />
          <button onclick="dealSendMessage()">Отправить</button>
        </div>
      </div>
      <div class="deal-dispute" id="deal-dispute" style="display:none"></div>
    </div>
  `;
  setTimeout(() => {
    document.getElementById('deal-chat-input')?.focus();
    document.getElementById('deal-chat-input')?.addEventListener('keydown', (e)=>{
      if (e.key === "Enter") dealSendMessage();
    });
  }, 150);
  renderDealChat();
}
function backToMarket() {
  state.currentOffer = null;
  state.view = "market";
  renderMarket();
}
function renderDealChat() {
  const box = document.getElementById('deal-chat-messages');
  if (!box) return;
  box.innerHTML = state.chat.map(m => `
    <div class="deal-chat-msg ${m.from === 'me' ? 'me' : m.from === 'system' ? 'sys' : 'other'}">
      ${m.from === 'me' ? "Вы: " : m.from === 'system' ? "" : "Собеседник: "}
      ${m.text}
    </div>
  `).join('');
  setTimeout(() => { box.scrollTop = box.scrollHeight; }, 50);
}
function dealSendMessage() {
  const input = document.getElementById('deal-chat-input');
  if (!input.value.trim()) return;
  state.chat.push({from: 'me', text: input.value});
  state.chat.push({from: 'other', text: 'Спасибо, принято (бот-ответ)'});
  renderDealChat();
  input.value = '';
}
window.dealSendMessage = dealSendMessage;
function dealPaid() {
  document.getElementById('deal-status').textContent = "Ожидается подтверждение продавца";
  state.chat.push({from: 'system', text: 'Ожидание подтверждения продавца. Средства находятся в эскроу.'});
  renderDealChat();
}
window.dealPaid = dealPaid;
function dealOpenDispute() {
  document.getElementById('deal-dispute').style.display = '';
  document.getElementById('deal-dispute').innerHTML = `
    <div class="deal-dispute-form">
      <b>Причина спора</b>
      <textarea id="dispute-text" rows="4" style="width:98%;border-radius:7px;"></textarea>
      <div>
        <label>Приложите скриншоты/видео</label>
        <input type="file" multiple accept="image/*,video/*" />
      </div>
      <button onclick="dealSubmitDispute()">Отправить спор</button>
      <button onclick="closeDealDispute()" style="margin-left:12px;">Отмена</button>
    </div>
  `;
}
window.dealOpenDispute = dealOpenDispute;
function dealSubmitDispute() {
  document.getElementById('deal-status').textContent = "Спор рассматривается модератором. Средства заморожены.";
  state.chat.push({from: 'system', text: 'Спор открыт. Средства заморожены до решения.'});
  renderDealChat();
  document.getElementById('deal-dispute').style.display = 'none';
}
window.dealSubmitDispute = dealSubmitDispute;
function closeDealDispute() {
  document.getElementById('deal-dispute').style.display = 'none';
}

// --- PROFILE PAGE ---
function renderProfile() {
  document.getElementById('main').innerHTML = `
    ${renderNav()}
    <div class="p2p-dark">
      <div class="profile-card">
        <div class="profile-main">
          <div class="profile-avatar"></div>
          <div>
            <div class="profile-name">DemoUser</div>
            <div class="profile-kyc"><span class="kyc-approved">KYC: одобрено</span></div>
          </div>
        </div>
        <div class="profile-balances">
          <div><b>USDT:</b> 1200.00</div>
          <div><b>BTC:</b> 0.05</div>
          <div><b>RUB:</b> 80 000</div>
        </div>
        <div class="profile-section">
          <h3>Мои сделки</h3>
          <table class="profile-table">
            <thead><tr>
              <th>Дата</th>
              <th>Тип</th>
              <th>Крипта</th>
              <th>Фиат</th>
              <th>Количество</th>
              <th>Цена</th>
              <th>Статус</th>
            </tr></thead>
            <tbody>
              <tr><td>2025-06-27</td><td>Покупка</td><td>USDT</td><td>RUB</td><td>200</td><td>71,00</td><td>Успешно</td></tr>
              <tr><td>2025-06-15</td><td>Продажа</td><td>BTC</td><td>RUB</td><td>0.01</td><td>6 400 000</td><td>Успешно</td></tr>
            </tbody>
          </table>
        </div>
        <div class="profile-section">
          <h3>Реферальная программа</h3>
          <div>Ваша реф. ссылка: <span class="profile-ref-link">https://yourp2p.site/?ref=DEMO</span></div>
          <div>Заработано всего: <b>7.25 USDT</b></div>
          <div>
            <b>Ваши рефералы:</b>
            <ul>
              <li>friend1: +1.5 USDT</li>
              <li>friend2: +0.6 USDT</li>
            </ul>
          </div>
        </div>
        <div class="profile-section">
          <h3>Уведомления</h3>
          <ul>
            <li>2025-06-27: Ваш аккаунт подтверждён!</li>
            <li>2025-06-26: Сделка завершена успешно.</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}
window.renderProfile = renderProfile;

// --- ORDERS PAGE ---
function renderOrders() {
  document.getElementById('main').innerHTML = `
    ${renderNav()}
    <div class="p2p-dark">
      <div class="orders-card">
        <h2>Мои сделки</h2>
        <table class="orders-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Тип</th>
              <th>Крипта</th>
              <th>Фиат</th>
              <th>Количество</th>
              <th>Цена</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-06-27</td><td>Покупка</td><td>USDT</td><td>RUB</td><td>200</td><td>71,00</td><td>Успешно</td>
            </tr>
            <tr>
              <td>2025-06-15</td><td>Продажа</td><td>BTC</td><td>RUB</td><td>0.01</td><td>6 400 000</td><td>Успешно</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}
window.renderOrders = renderOrders;

// --- SUPPORT PAGE ---
function renderSupport() {
  document.getElementById('main').innerHTML = `
    ${renderNav()}
    <div class="p2p-dark">
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
  setTimeout(() => {
    document.getElementById('support-input')?.focus();
    document.getElementById('support-input')?.addEventListener('keydown', (e)=>{
      if (e.key === "Enter") sendSupportMsg();
    });
  }, 150);
}
window.renderSupport = renderSupport;
function sendSupportMsg() {
  const input = document.getElementById('support-input');
  if (!input.value.trim()) return;
  const chat = document.getElementById('support-chat');
  chat.innerHTML += `<div class="support-msg user">${input.value}</div>`;
  if (/оператор|operator/i.test(input.value)) {
    chat.innerHTML += `<div class="support-msg bot">Ваш запрос передан оператору. Ожидайте ответа администратора.</div>`;
  } else if (/мошенник|fraud|scam/i.test(input.value)) {
    chat.innerHTML += `<div class="support-msg bot">Если вы подозреваете мошенничество — средства будут заморожены до разбирательства. Опишите проблему подробнее.</div>`;
  } else {
    chat.innerHTML += `<div class="support-msg bot">Спасибо за обращение! Мы обработаем ваш запрос.</div>`;
  }
  input.value = '';
  chat.scrollTop = chat.scrollHeight;
}
window.sendSupportMsg = sendSupportMsg;

// --- STYLES (as before, add your style here or in a separate CSS) ---

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => renderMarket());
// --- EXTENDED STATE & DATA ---
const OFFERS_BUY = [
  // ... (оставь как раньше)
];
const OFFERS_SELL = [
  // ... (оставь как раньше)
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

let state = {
  tab: "buy",
  crypto: "USDT",
  amount: "",
  payment: "",
  view: "market", // market | deal | profile | orders | support | create
  currentOffer: null,
  chat: [],
  sortField: 'price',
  sortDir: 'asc',
  onlyOnline: false,
  onlyVerified: false,
  noLowLimit: false,
  // Новое:
  showCreate: false,
  offersBuy: OFFERS_BUY,
  offersSell: OFFERS_SELL
};

// --- NAVIGATION ---
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

// --- MARKET PAGE (сортировка, фильтры, создать объявление) ---
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

function getFilteredOffers() {
  let arr = state.tab === "buy" ? state.offersBuy : state.offersSell;
  // Быстрые фильтры
  arr = arr.filter(o =>
    o.crypto === state.crypto &&
    (!state.amount || parseFloat(o.amount) >= parseFloat(state.amount)) &&
    (!state.payment || o.payMethods.find(pm => pm.name === state.payment || pm.icon === state.payment)) &&
    (!state.onlyOnline || o.online) &&
    (!state.onlyVerified || o.verified) &&
    (!state.noLowLimit || parseInt((o.limits || "0").replace(/[^0-9]/g,'')) > 1000)
  );
  // Сортировка
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

// --- СОЗДАТЬ ОБЪЯВЛЕНИЕ ---
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

// --- остальные функции (renderOfferCard, renderDeal, renderProfile, renderOrders, renderSupport) оставь как раньше ---
// --- INIT ---
document.addEventListener('DOMContentLoaded', () => renderMarket());
