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
