// Моки для статистики, пользователей, сделок и споров
const adminStats = {
  totalCommission: 1527.4,
  totalDeals: 211,
  disputes: 3,
  kycPending: 2,
  usersActive: 44,
  usersBlocked: 1,
  todayCommission: 46.2
};
const adminUsers = [
  { id: 1, name: "DemoUser", status: "active", kyc: "approved", deals: 19, ref: 2.5 },
  { id: 2, name: "Crypto4U", status: "blocked", kyc: "not_submitted", deals: 3, ref: 0 },
  { id: 3, name: "Savak", status: "active", kyc: "pending", deals: 31, ref: 4.7 }
];
const adminDeals = [
  { id: 101, user: "DemoUser", type: "buy", crypto: "USDT", fiat: "RUB", amount: 200, status: "success", date: "2025-06-27 20:17" },
  { id: 102, user: "Savak", type: "sell", crypto: "BTC", fiat: "RUB", amount: 0.01, status: "dispute", date: "2025-06-27 19:07" }
];
const adminDisputes = [
  { id: 201, deal: 102, user: "Savak", opponent: "DemoUser", status: "open", submitted: "2025-06-27 19:10", comment: "Не получил оплату", proof: "скрин.jpg" }
];
const adminKYC = [
  { id: 1, name: "Savak", status: "pending", submitted: "2025-06-27 20:33", doc: "passport.jpg" }
];
const adminNotifications = [
  { date: "2025-06-27 21:00", text: "Крупная сделка: DemoUser на 12000 USDT" },
  { date: "2025-06-27 19:10", text: "Открыт спор по сделке #102" }
];

// Роутинг
function adminRoute(page) {
  document.querySelectorAll('.admin-nav__btn').forEach(el=>el.classList.remove('active'));
  switch(page) {
    case 'dashboard':
      document.getElementById('nav-dashboard').classList.add('active');
      renderAdminDashboard();
      break;
    case 'users':
      document.getElementById('nav-users').classList.add('active');
      renderAdminUsers();
      break;
    case 'deals':
      document.getElementById('nav-deals').classList.add('active');
      renderAdminDeals();
      break;
    case 'disputes':
      document.getElementById('nav-disputes').classList.add('active');
      renderAdminDisputes();
      break;
    case 'kyc':
      document.getElementById('nav-kyc').classList.add('active');
      renderAdminKYC();
      break;
    case 'notify':
      document.getElementById('nav-notify').classList.add('active');
      renderAdminNotify();
      break;
  }
}
window.adminRoute = adminRoute;

// --- Dashboard ---
function renderAdminDashboard() {
  document.getElementById('admin-main').innerHTML = `
    <div class="admin-main">
      <div class="admin-card">
        <h2>Дашборд</h2>
        <div>Всего комиссий: <b>${adminStats.totalCommission} USDT</b></div>
        <div>Сделок за всё время: <b>${adminStats.totalDeals}</b></div>
        <div>Активных пользователей: <b>${adminStats.usersActive}</b></div>
        <div>Заблокированных: <b>${adminStats.usersBlocked}</b></div>
        <div>Споров сейчас: <b>${adminStats.disputes}</b></div>
        <div>Верификаций на проверке: <b>${adminStats.kycPending}</b></div>
        <div>Комиссия сегодня: <b>${adminStats.todayCommission} USDT</b></div>
      </div>
    </div>
  `;
}

// --- Users ---
function renderAdminUsers() {
  document.getElementById('admin-main').innerHTML = `
    <div class="admin-main">
      <div class="admin-card">
        <h2>Пользователи</h2>
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Имя</th><th>Статус</th><th>KYC</th><th>Сделок</th><th>Реф. доход</th><th>Действия</th>
            </tr>
          </thead>
          <tbody>
            ${adminUsers.map(u=>`
              <tr>
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>
                  <span class="admin-badge ${u.status==='active'?'badge-ok':'badge-block'}">${u.status==='active'?'Активен':'Заблокирован'}</span>
                </td>
                <td>
                  <span class="admin-badge ${u.kyc==='approved'?'badge-ok':u.kyc==='pending'?'badge-warn':'badge-block'}">
                    ${u.kyc==='approved'?'Одобрено':u.kyc==='pending'?'Проверка':'Нет'}
                  </span>
                </td>
                <td>${u.deals}</td>
                <td>${u.ref}</td>
                <td class="actions">
                  ${u.status==='active'
                    ? `<button class="admin-btn" onclick="adminBlockUser(${u.id})">Заблокировать</button>`
                    : `<button class="admin-btn" onclick="adminUnblockUser(${u.id})">Разблокировать</button>`
                  }
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
window.adminBlockUser = function(id) {
  const u = adminUsers.find(u=>u.id===id);
  if (u) u.status = "blocked";
  renderAdminUsers();
};
window.adminUnblockUser = function(id) {
  const u = adminUsers.find(u=>u.id===id);
  if (u) u.status = "active";
  renderAdminUsers();
};

// --- Deals ---
function renderAdminDeals() {
  document.getElementById('admin-main').innerHTML = `
    <div class="admin-main">
      <div class="admin-card">
        <h2>Сделки</h2>
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Пользователь</th><th>Тип</th><th>Крипта</th><th>Фиат</th><th>Сумма</th><th>Статус</th><th>Дата</th>
            </tr>
          </thead>
          <tbody>
            ${adminDeals.map(d=>`
              <tr>
                <td>${d.id}</td>
                <td>${d.user}</td>
                <td>${d.type}</td>
                <td>${d.crypto}</td>
                <td>${d.fiat}</td>
                <td>${d.amount}</td>
                <td>${d.status}</td>
                <td>${d.date}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// --- Disputes ---
function renderAdminDisputes() {
  document.getElementById('admin-main').innerHTML = `
    <div class="admin-main">
      <div class="admin-card">
        <h2>Споры</h2>
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Сделка</th><th>Пользователь</th><th>Оппонент</th><th>Статус</th><th>Дата</th><th>Комментарий</th><th>Доказательства</th>
            </tr>
          </thead>
          <tbody>
            ${adminDisputes.map(d=>`
              <tr>
                <td>${d.id}</td>
                <td>${d.deal}</td>
                <td>${d.user}</td>
                <td>${d.opponent}</td>
                <td>${d.status}</td>
                <td>${d.submitted}</td>
                <td>${d.comment}</td>
                <td>
                  <button class="admin-btn" onclick="alert('Открыть файл: ${d.proof}')">Смотреть</button>
                  <button class="admin-btn" onclick="adminResolveDispute(${d.id})">Решить</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
window.adminResolveDispute = function(id) {
  alert("Спор решён (заглушка)");
};

// --- KYC ---
function renderAdminKYC() {
  document.getElementById('admin-main').innerHTML = `
    <div class="admin-main">
      <div class="admin-card">
        <h2>Верификация пользователей</h2>
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th><th>Имя</th><th>Статус</th><th>Дата</th><th>Документ</th><th>Действия</th>
            </tr>
          </thead>
          <tbody>
            ${adminKYC.map(k=>`
              <tr>
                <td>${k.id}</td>
                <td>${k.name}</td>
                <td>${k.status}</td>
                <td>${k.submitted}</td>
                <td>
                  <button class="admin-btn" onclick="alert('Открыть: ${k.doc}')">Смотреть</button>
                </td>
                <td>
                  <button class="admin-btn" onclick="adminApproveKYC(${k.id})">Одобрить</button>
                  <button class="admin-btn" onclick="adminRejectKYC(${k.id})">Отклонить</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
window.adminApproveKYC = function(id) {
  const k = adminKYC.find(k=>k.id===id);
  if (k) k.status = "approved";
  renderAdminKYC();
};
window.adminRejectKYC = function(id) {
  const k = adminKYC.find(k=>k.id===id);
  if (k) k.status = "rejected";
  renderAdminKYC();
};

// --- Notifications ---
function renderAdminNotify() {
  document.getElementById('admin-main').innerHTML = `
    <div class="admin-main">
      <div class="admin-card">
        <h2>Уведомления и события</h2>
        <ul>
          ${adminNotifications.map(n=>`<li>${n.date}: ${n.text}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// --- init ---
document.addEventListener('DOMContentLoaded', () => {
  renderAdminDashboard();
});
// ...оставить всё как есть

// В adminStats добавим данные по дням
const adminStats = {
  totalCommission: 1527.4,
  totalDeals: 211,
  disputes: 3,
  kycPending: 2,
  usersActive: 44,
  usersBlocked: 1,
  todayCommission: 46.2,
  dailyCommission: [
    { date: "2025-06-28", value: 46.2 },
    { date: "2025-06-27", value: 51.7 },
    { date: "2025-06-26", value: 37.3 }
  ]
};

// В Dashboard добавим график (эмуляция)
function renderAdminDashboard() {
  document.getElementById('admin-main').innerHTML = `
    <div class="admin-main">
      <div class="admin-card">
        <h2>Дашборд</h2>
        <div>Всего комиссий: <b>${adminStats.totalCommission} USDT</b></div>
        <div>Сделок за всё время: <b>${adminStats.totalDeals}</b></div>
        <div>Активных пользователей: <b>${adminStats.usersActive}</b></div>
        <div>Заблокированных: <b>${adminStats.usersBlocked}</b></div>
        <div>Споров сейчас: <b>${adminStats.disputes}</b></div>
        <div>Верификаций на проверке: <b>${adminStats.kycPending}</b></div>
        <div>Комиссия сегодня: <b>${adminStats.todayCommission} USDT</b></div>
        <div style="margin-top:22px;">
          <b>Комиссия по дням:</b>
          <div class="admin-comm-chart">
            ${adminStats.dailyCommission.map(d => `
              <div><span style="display:inline-block;width:85px;">${d.date}</span>
                <span style="display:inline-block;width:80px;color:var(--green);">${d.value} USDT</span>
                <span style="display:inline-block;background:var(--green);height:10px;width:${d.value*3}px;border-radius:2px;"></span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
