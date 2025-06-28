// --- DEMO STATE --- //
const demoOffers = [
  { id: 1, user: "CryptoKing", rating: "98.7% | 320", limit: "5,000–50,000 RUB", method: "Тинькофф", price: "92.50 ₽", type: "buy" },
  { id: 2, user: "BitQueen", rating: "99.5% | 500", limit: "1,000–10,000 RUB", method: "Сбербанк", price: "92.55 ₽", type: "buy" },
  { id: 3, user: "FastBit", rating: "97.3% | 190", limit: "10,000–70,000 RUB", method: "QIWI", price: "92.70 ₽", type: "sell" }
];
let currentTab = "buy";
let currentDeal = null;
let userWallet = { USDT: 230, BTC: 0.015, RUB: 12000 };
let myOrders = [];
let chatHistory = [];
let disputes = [
  { id: 1, orderId: 1, user: "CryptoKing", status: "В рассмотрении", text: "Покупатель не подтвердил оплату", date: "2025-06-27" }
];
let users = [
  { name: "CryptoKing", banned: false },
  { name: "BitQueen", banned: false },
  { name: "FastBit", banned: false },
];
let notifications = [
  { id: 1, title: "Сделка завершена", text: "Ваша сделка с CryptoKing успешно завершена.", time: "1 мин назад", unread: true },
  { id: 2, title: "Новый ответ поддержки", text: "Поддержка ответила на ваш запрос.", time: "10 мин назад", unread: true },
];

// --- NOTIFICATIONS --- //
function showNotif(text, isError = false) {
  const notifier = document.getElementById('notifier');
  notifier.textContent = text;
  notifier.style.background = isError ? "#E85151" : "#10C46C";
  notifier.style.color = "#fff";
  notifier.style.position = "fixed";
  notifier.style.top = "12px";
  notifier.style.left = "50%";
  notifier.style.transform = "translateX(-50%)";
  notifier.style.padding = "12px 32px";
  notifier.style.zIndex = 999;
  notifier.style.borderRadius = "12px";
  notifier.style.fontWeight = "700";
  setTimeout(() => { notifier.textContent = ""; notifier.style = ""; }, 2200);
}

function toggleNotif() {
  const panel = document.getElementById('notif-panel');
  if (panel.style.display === "none" || !panel.style.display) {
    renderNotifPanel();
    panel.style.display = "";
    document.getElementById('notif-dot').hidden = true;
  } else {
    panel.style.display = "none";
  }
}
window.toggleNotif = toggleNotif;

function renderNotifPanel() {
  const panel = document.getElementById('notif-panel');
  panel.innerHTML = `
    <button class="notif-close" onclick="closeNotifPanel()">×</button>
    <div style="font-size:1.1em;font-weight:600;margin-bottom:8px;">Уведомления</div>
    <div class="notif-list">
      ${notifications.map(n => `
        <div class="notif-item${n.unread ? ' unread' : ''}">
          <span class="notif-title">${n.title}</span>
          <span class="notif-time">${n.time}</span>
          <div>${n.text}</div>
        </div>
      `).join("")}
    </div>
  `;
  notifications.forEach(n => n.unread = false);
  setTimeout(() => { document.getElementById('notif-dot').hidden = true; }, 500);
}
window.closeNotifPanel = function() {
  document.getElementById('notif-panel').style.display = "none";
};

// --- TABS & ROUTING --- //
function hideAllExcept(id) {
  ["offers-section","deal-section","wallet-section","orders-section","support-section","admin-section","dispute-section","notif-panel"].forEach(sec => {
    const el = document.getElementById(sec);
    if (el) el.style.display = sec === id ? "" : "none";
  });
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  if (id === "offers-section") document.getElementById(currentTab === "buy" ? "tab-buy-btn" : "tab-sell-btn").classList.add('active');
  if (id === "wallet-section") document.getElementById("tab-wallet-btn").classList.add('active');
  if (id === "orders-section") document.getElementById("tab-orders-btn").classList.add('active');
  if (id === "support-section") document.getElementById("tab-support-btn").classList.add('active');
  if (id === "admin-section") document.getElementById("tab-admin-btn").classList.add('active');
}
function switchTab(tab) {
  currentTab = tab;
  renderOffers();
}
window.switchTab = switchTab;

// --- MAIN PAGE: OFFERS --- //
function renderOffers() {
  const offers = demoOffers.filter(o => o.type === currentTab);
  let html = `
    <h1 class="main-title">${currentTab === 'buy' ? "Покупка" : "Продажа"} USDT</h1>
    <div class="table-wrapper">
      <table class="offers-table">
        <thead>
          <tr>
            <th>Пользователь</th>
            <th>Лимит</th>
            <th>Оплата</th>
            <th>Цена</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          ${offers.map(o => `
            <tr>
              <td>
                <span class="seller-name">${o.user}</span><br>
                <span class="seller-rating">${o.rating}</span>
              </td>
              <td>${o.limit}</td>
              <td><span class="payment-method">${o.method}</span></td>
              <td><span class="price">${o.price}</span></td>
              <td><button class="action-btn" onclick="openDeal(${o.id})">${currentTab === 'buy' ? "Купить" : "Продать"}</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
  document.getElementById("offers-section").innerHTML = html;
  hideAllExcept("offers-section");
}
window.renderOffers = renderOffers;

// --- DEAL PAGE --- //
function openDeal(id) {
  const offer = demoOffers.find(o => o.id === id);
  currentDeal = offer;
  chatHistory = [
    { who: "sys", text: "Чат сделки открыт. После оплаты нажмите 'Подтвердить сделку'." }
  ];
  let html = `
    <div class="deal-card">
      <h2>Сделка с ${offer.user}</h2>
      <div class="deal-info"><b>Лимит:</b> ${offer.limit} <br><b>Способ оплаты:</b> ${offer.method} <br><b>Цена:</b> ${offer.price}</div>
      <div id="deal-status" style="margin:12px 0;color:var(--yellow);">Ожидает подтверждения</div>
      <button class="action-btn" onclick="confirmDeal()">Подтвердить сделку</button>
      <button class="action-btn" style="background:#23262F;color:#FCD535;border:1px solid #FCD535;margin-top:8px;" onclick="renderOffers()">Назад</button>
      <div style="margin-top:24px;">
        <h3 style="margin-bottom:5px;">Чат сделки</h3>
        <div class="chat-box" id="chat-box"></div>
        <div class="chat-input-row">
          <input type="text" id="chat-input" placeholder="Введите сообщение..." />
          <button class="action-btn" style="padding:8px 16px;" onclick="sendMessage()">Отправить</button>
        </div>
      </div>
      <button class="action-btn" style="margin-top:18px;background:#A00;color:#fff;" onclick="openDispute()">Открыть спор</button>
    </div>
  `;
  document.getElementById("deal-section").innerHTML = html;
  hideAllExcept("deal-section");
  updateChatBox();
}
window.openDeal = openDeal;

function sendMessage() {
  const input = document.getElementById("chat-input");
  if (!input.value.trim()) return;
  chatHistory.push({ who: "me", text: input.value });
  chatHistory.push({ who: "other", text: "Спасибо за сообщение! (Демо-ответ)" });
  updateChatBox();
  input.value = "";
}
window.sendMessage = sendMessage;

function updateChatBox() {
  const box = document.getElementById("chat-box");
  box.innerHTML = "";
  (chatHistory || []).forEach(msg => {
    const div = document.createElement("div");
    div.className = "msg " + (msg.who === "me" ? "msg-me" : msg.who === "sys" ? "msg-sys" : "msg-other");
    div.textContent = (msg.who === "me" ? "Вы: " : msg.who === "sys" ? "" : "Собеседник: ") + msg.text;
    box.appendChild(div);
  });
  box.scrollTop = box.scrollHeight;
}

// --- DEAL CONFIRMATION --- //
function confirmDeal() {
  document.getElementById("deal-status").textContent = "Сделка завершена!";
  document.getElementById("deal-status").style.color = "lime";
  showNotif("Сделка успешно завершена!");
}
window.confirmDeal = confirmDeal;

// --- DISPUTE --- //
function openDispute() {
  document.getElementById("deal-section").style.display = "none";
  renderDisputeForm();
}
window.openDispute = openDispute;

function renderDisputeForm() {
  document.getElementById("dispute-section").innerHTML = `
    <div class="dispute-card">
      <h2>Открыть спор</h2>
      <div style="margin-bottom:8px;">Опишите причину спора и приложите детали. Модераторы свяжутся с вами.</div>
      <textarea id="dispute-text" rows="4" style="width:98%;border-radius:7px;border:1px solid #393D49;background:#181A20;color:#F5F6FA;padding:9px;font-size:1em;margin-bottom:10px;"></textarea>
      <button class="action-btn" onclick="submitDispute()">Отправить спор</button>
      <button class="action-btn" style="background:#23262F;color:#FCD535;border:1px solid #FCD535;margin-top:8px;" onclick="renderOffers()">Назад</button>
    </div>
  `;
  hideAllExcept("dispute-section");
}
window.renderDisputeForm = renderDisputeForm;

function submitDispute() {
  const text = document.getElementById("dispute-text").value.trim();
  if (!text) { showNotif("Опишите причину спора.", true); return; }
  disputes.push({
    id: disputes.length + 1,
    orderId: currentDeal ? currentDeal.id : 0,
    user: "u/BybitDemo",
    status: "В рассмотрении",
    text,
    date: (new Date()).toISOString().substr(0,10)
  });
  showNotif("Спор отправлен модератору!");
  renderOffers();
}
window.submitDispute = submitDispute;

// --- WALLET --- //
function showWallet() {
  document.getElementById("wallet-section").innerHTML = `
    <div class="wallet-card">
      <h2>Ваш кошелёк</h2>
      <div class="wallet-row"><span>USDT:</span> <span class="wallet-balance">${userWallet.USDT.toFixed(2)}</span></div>
      <div class="wallet-row"><span>BTC:</span> <span class="wallet-balance">${userWallet.BTC.toFixed(4)}</span></div>
      <div class="wallet-row"><span>RUB:</span> <span class="wallet-balance">${userWallet.RUB.toLocaleString()}</span></div>
      <button class="action-btn" style="margin-top:22px;" onclick="renderOffers()">К торгам</button>
    </div>
  `;
  hideAllExcept("wallet-section");
}
window.showWallet = showWallet;

// --- ORDERS --- //
function showOrders() {
  document.getElementById("orders-section").innerHTML = `
    <div class="deal-card" style="max-width:520px;">
      <h2>Мои сделки</h2>
      ${myOrders.length === 0 ? `<div style="color:var(--font-secondary);text-align:center;">Сделок пока нет</div>` :
        `<table class="offers-table">
          <thead>
            <tr><th>Контрагент</th><th>Сумма</th><th>Статус</th></tr>
          </thead>
          <tbody>
            ${myOrders.map(o => `
              <tr>
                <td>${o.user}</td>
                <td>${o.sum} USDT</td>
                <td>${o.status}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>`
      }
      <button class="action-btn" style="margin-top:22px;" onclick="renderOffers()">К торгам</button>
    </div>
  `;
  hideAllExcept("orders-section");
}
window.showOrders = showOrders;

// --- SUPPORT --- //
function showSupport() {
  document.getElementById("support-section").innerHTML = `
    <div class="deal-card" style="max-width:420px;">
      <h2>Поддержка</h2>
      <div>Свяжитесь с поддержкой через <a href="#" style="color:var(--yellow);">чат</a> или по email: support@p2p.demo</div>
      <button class="action-btn" style="margin-top:22px;" onclick="renderOffers()">К торгам</button>
    </div>
  `;
  hideAllExcept("support-section");
}
window.showSupport = showSupport;

// --- ADMIN --- //
function showAdmin() {
  document.getElementById("admin-section").innerHTML = `
    <div class="deal-card" style="max-width:700px;">
      <h2>Панель администратора</h2>
      <h4 style="color:var(--yellow);margin-top:16px;">Пользователи</h4>
      <table class="admin-table">
        <thead><tr><th>Имя</th><th>Статус</th><th>Действия</th></tr></thead>
        <tbody>
          ${users.map(u => `
            <tr>
              <td>${u.name}</td>
              <td>${u.banned ? "<span style='color:#E85151'>Забанен</span>" : "<span style='color:#10C46C'>Активен</span>"}</td>
              <td>
                ${u.banned ? `<button class="admin-action-btn" onclick="unbanUser('${u.name}')">Разбанить</button>` :
                  `<button class="admin-action-btn ban" onclick="banUser('${u.name}')">Забанить</button>`
                }
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <h4 style="color:var(--yellow);margin-top:24px;">Споры</h4>
      <table class="admin-table">
        <thead><tr><th>ID</th><th>Пользователь</th><th>Статус</th><th>Дата</th><th>Текст</th></tr></thead>
        <tbody>
          ${disputes.map(d => `
            <tr>
              <td>${d.id}</td>
              <td>${d.user}</td>
              <td>${d.status}</td>
              <td>${d.date}</td>
              <td>${d.text}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <button class="action-btn" style="margin-top:22px;" onclick="renderOffers()">К торгам</button>
    </div>
  `;
  hideAllExcept("admin-section");
}
window.showAdmin = showAdmin;
window.banUser = function(name) {
  users.find(u => u.name === name).banned = true;
  showNotif("Пользователь забанен");
  showAdmin();
};
window.unbanUser = function(name) {
  users.find(u => u.name === name).banned = false;
  showNotif("Пользователь разбанен");
  showAdmin();
};

// --- INIT --- //
document.addEventListener("DOMContentLoaded", () => {
  renderOffers();
  // Notif dot
  if (notifications.some(n => n.unread)) document.getElementById('notif-dot').hidden = false;
});
