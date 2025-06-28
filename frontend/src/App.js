// Данные для примера
const demoOffers = [
  { id: 1, user: "CryptoKing", rating: "98.7% | 320", limit: "5,000–50,000 RUB", method: "Тинькофф", price: "92.50 ₽", type: "buy" },
  { id: 2, user: "BitQueen", rating: "99.5% | 500", limit: "1,000–10,000 RUB", method: "Сбербанк", price: "92.55 ₽", type: "buy" },
  { id: 3, user: "FastBit", rating: "97.3% | 190", limit: "10,000–70,000 RUB", method: "QIWI", price: "92.70 ₽", type: "sell" }
];
let currentTab = "buy";
let currentDeal = null;

// Рендер объявлений
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

// Сделка с чатом и подтверждением
function openDeal(id) {
  const offer = demoOffers.find(o => o.id === id);
  currentDeal = offer;
  let html = `
    <div class="deal-card">
      <h2>Сделка с ${offer.user}</h2>
      <div><b>Лимит:</b> ${offer.limit} <br><b>Способ оплаты:</b> ${offer.method} <br><b>Цена:</b> ${offer.price}</div>
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
  window.chatHistory = [];
  updateChatBox();
}
window.openDeal = openDeal;

// Чат сделки
function sendMessage() {
  const input = document.getElementById("chat-input");
  if (!input.value.trim()) return;
  window.chatHistory.push({ who: "me", text: input.value });
  window.chatHistory.push({ who: "other", text: "Спасибо за сообщение! (Демо-ответ)" });
  updateChatBox();
  input.value = "";
}
window.sendMessage = sendMessage;

function updateChatBox() {
  const box = document.getElementById("chat-box");
  box.innerHTML = "";
  (window.chatHistory || []).forEach(msg => {
    const div = document.createElement("div");
    div.className = "msg " + (msg.who === "me" ? "msg-me" : "msg-other");
    div.textContent = (msg.who === "me" ? "Вы: " : "Собеседник: ") + msg.text;
    box.appendChild(div);
  });
  box.scrollTop = box.scrollHeight;
}

// Подтверждение сделки
function confirmDeal() {
  document.getElementById("deal-status").textContent = "Сделка завершена!";
  document.getElementById("deal-status").style.color = "lime";
}
window.confirmDeal = confirmDeal;

// Система споров
function openDispute() {
  alert("Демо: Открыт спор. Модератор проверит вашу сделку.");
  document.getElementById("deal-status").textContent = "Сделка в споре!";
  document.getElementById("deal-status").style.color = "#F00";
}
window.openDispute = openDispute;

// Кошелёк
function showWallet() {
  document.getElementById("wallet-section").innerHTML = `
    <div class="deal-card" style="max-width:340px;">
      <h2>Ваш кошелёк</h2>
      <div><b>USDT:</b> <span style="color:var(--yellow);">230.00</span></div>
      <div><b>BTC:</b> <span style="color:var(--yellow);">0.015</span></div>
      <button class="action-btn" style="margin-top:22px;" onclick="renderOffers()">К торгам</button>
    </div>
  `;
  hideAllExcept("wallet-section");
}
window.showWallet = showWallet;

// Сделки пользователя
function showOrders() {
  document.getElementById("orders-section").innerHTML = `
    <div class="deal-card" style="max-width:520px;">
      <h2>Мои сделки</h2>
      <div style="color:var(--font-secondary);text-align:center;">Демо: Сделок пока нет</div>
      <button class="action-btn" style="margin-top:22px;" onclick="renderOffers()">К торгам</button>
    </div>
  `;
  hideAllExcept("orders-section");
}
window.showOrders = showOrders;

// Поддержка
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

// Админка
function showAdmin() {
  document.getElementById("admin-section").innerHTML = `
    <div class="deal-card" style="max-width:640px;">
      <h2>Панель администратора</h2>
      <div>Блокировка пользователей, модерация споров, контроль объявлений (демо-заглушка)</div>
      <button class="action-btn" style="margin-top:22px;" onclick="renderOffers()">К торгам</button>
    </div>
  `;
  hideAllExcept("admin-section");
}
window.showAdmin = showAdmin;

// Роутинг и скрытие секций
function hideAllExcept(id) {
  ["offers-section","deal-section","wallet-section","orders-section","support-section","admin-section"].forEach(sec => {
    document.getElementById(sec).style.display = sec === id ? "" : "none";
  });
  // Активность кнопок
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  if (id === "offers-section") document.getElementById(currentTab === "buy" ? "tab-buy-btn" : "tab-sell-btn").classList.add('active');
  if (id === "wallet-section") document.getElementById("tab-wallet-btn").classList.add('active');
  if (id === "orders-section") document.getElementById("tab-orders-btn").classList.add('active');
  if (id === "support-section") document.getElementById("tab-support-btn").classList.add('active');
  if (id === "admin-section") document.getElementById("tab-admin-btn").classList.add('active');
}

// Переключение Покупка/Продажа
function switchTab(tab) {
  currentTab = tab;
  renderOffers();
}
window.switchTab = switchTab;

// Старт
document.addEventListener("DOMContentLoaded", renderOffers);
