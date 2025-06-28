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
