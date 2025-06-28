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
