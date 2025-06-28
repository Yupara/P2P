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
