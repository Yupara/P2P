// MOCK DATA
const offers = [
  {
    id: 1,
    user: "Savak",
    online: true,
    verified: true,
    price: "70,96",
    currency: "RUB",
    amount: "304,7685 USDT",
    limits: "500 – 500 000 RUB",
    orders: 40,
    percent: 10,
    payMethods: ["SBP", "колньение"]
  },
  {
    id: 2,
    user: "Ищу_Партнеров",
    online: false,
    verified: false,
    price: "71,03",
    currency: "RUB",
    amount: "128,8821 USDT",
    limits: "500 – 500 000 RUB",
    orders: 15,
    percent: 10,
    payMethods: ["Пиметы", "Овореол"]
  },
  {
    id: 3,
    user: "ПроданоМейкеро",
    online: true,
    verified: false,
    price: "71,03",
    currency: "RUB",
    amount: "128,8821 USDT",
    limits: "500 – 500 000 RUB",
    orders: 11,
    percent: 10,
    payMethods: ["SBP"]
  }
];

let currentTab = "buy";

// Render offers list
function renderOffersList() {
  const list = document.getElementById('offers-list');
  list.innerHTML = offers.map(o => `
    <div class="offer-card">
      <div class="offer-card__header">
        <span class="offer-card__avatar">
          <span class="offer-card__dot${o.verified ? '' : ' warn'}"></span>
        </span>
        <span class="offer-card__name">${o.user}</span>
        ${o.online ? '' : '<span class="offer-card__time">15 мин.</span>'}
        <span class="offer-card__stat">${o.orders} Ордеров | ${o.percent} %</span>
      </div>
      <div class="offer-card__price">₽ ${o.price}</div>
      <div class="offer-card__usdt">Количество ${o.amount}</div>
      <div class="offer-card__limits">Лимиты ${o.limits}</div>
      <div class="offer-card__pay">
        ${o.payMethods.map(pm => `<span>${pm}</span>`).join('')}
      </div>
      <div class="offer-card__action-row">
        <button class="offer-card__btn" onclick="openDealModal(${o.id})">${currentTab === "buy" ? "Покупка" : "Продажа"}</button>
      </div>
    </div>
  `).join('');
}
window.renderOffersList = renderOffersList;

// Tab switch
function switchTab(tab) {
  currentTab = tab;
  document.getElementById('tab-buy').classList.toggle('active', tab === 'buy');
  document.getElementById('tab-sell').classList.toggle('active', tab === 'sell');
  renderOffersList();
}
window.switchTab = switchTab;

// Dummy filter (not functional in demo)
function applyFilters() {
  renderOffersList(); // In real app, should filter
}
window.applyFilters = applyFilters;

// DEAL MODAL LOGIC
let dealTimer = null;
function openDealModal(id) {
  const offer = offers.find(o => o.id === id);
  document.getElementById('deal-modal').style.display = "";
  document.body.style.overflow = 'hidden';
  let seconds = 15 * 60;
  function formatTime(t) {
    let m = Math.floor(t/60), s = t%60;
    return `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
  }
  function updateTimer() {
    const el = document.getElementById('deal-timer');
    if (el) el.textContent = formatTime(seconds);
    if (seconds > 0) seconds--;
    else clearInterval(dealTimer);
  }
  dealTimer && clearInterval(dealTimer);
  setTimeout(() => { // fix for DOM update
    dealTimer = setInterval(updateTimer, 1000);
    updateTimer();
  }, 50);

  document.getElementById('deal-modal').innerHTML = `
    <div class="deal-modal__window">
      <div class="deal-modal__header">
        Завершите оплату в течение
        <span class="deal-modal__timer" id="deal-timer">15:00</span>
      </div>
      <div class="deal-modal__main">
        <div class="deal-modal__box">
          <div class="deal-modal__label">Покупка USDT</div>
          <div class="deal-modal__row"><span class="label">Сумма</span><span class="value">200.00 RUB</span></div>
          <div class="deal-modal__row"><span class="label">Цена</span><span class="value">₽ ${offer.price}</span></div>
          <div class="deal-modal__row"><span class="label">Общее количество</span><span class="value">4.9752 USDT</span></div>
          <div class="deal-modal__row"><span class="label">Комиссии за транзакции</span><span class="value">0 USDT</span></div>
          <div class="deal-modal__row"><span class="label">Ордер №</span><span class="value">1749860855811555328</span></div>
          <div class="deal-modal__row"><span class="label">Время ордера</span><span class="value">2024-01-23 20:25:14</span></div>
        </div>
        <div class="deal-modal__box">
          <div class="deal-modal__label">Сведения о транзакции</div>
          <div class="deal-modal__row"><span class="label">Имя покупателя</span><span class="value">goldyan</span></div>
          <div class="deal-modal__row"><span class="label">Подтверждён</span><span class="value">✓</span></div>
          <div style="margin-top:8px;background:#13381b;border-radius:8px;padding:9px 7px;font-size:0.99em;">
            <div>✓ Активы этого продавца заблокированы. Вы можете безопасно совершать платёж.</div>
            <div>✓ Продавец подтвердил свою личность, адрес электронной почты и номер мобильного телефона.</div>
          </div>
        </div>
      </div>
      <div class="deal-modal__footer">
        <button class="deal-modal__action secondary" onclick="closeDealModal()">Отменить ордер</button>
        <button class="deal-modal__action" onclick="proceedToPayment()">Оплатить</button>
      </div>
      <div class="deal-modal__problems">
        Возникла проблема?
      </div>
    </div>
  `;
}
window.openDealModal = openDealModal;

function closeDealModal() {
  document.getElementById('deal-modal').style.display = "none";
  document.body.style.overflow = '';
  if (dealTimer) clearInterval(dealTimer);
}
window.closeDealModal = closeDealModal;

// Proceed to payment step (simplified)
function proceedToPayment() {
  if (dealTimer) clearInterval(dealTimer);
  document.getElementById('deal-modal').innerHTML = `
    <div class="deal-modal__window">
      <div class="deal-modal__header">
        Завершите оплату в течение
        <span class="deal-modal__timer" id="deal-timer">14:03</span>
      </div>
      <div class="deal-modal__main">
        <div style="background:#282012;color:var(--bybit-txt-warn);padding:10px 8px 9px 8px;margin-bottom:12px;border-radius:8px;font-size:0.98em;">
          <b>Используйте имя выполнении оплаты.</b><br>
          Убедитесь, что при отправке фиатной валюты вы не используете в комментариях нежелательную лексику, как "покупка BTC/USDT".
        </div>
        <div class="deal-modal__pay">
          <label> A-Bank </label>
          <div class="pay-bank">A-Bank</div>
          <div style="font-size:0.97em;margin-top:7px;">
            1. Войдите в ваш аккаунт: <b>A-Bank</b><br>
            2. Переведите продавцу <span style="color:var(--bybit-green)">200.00 RUB</span><br>
            <span style="display:block;background:#263c2f;border-radius:7px;padding:7px 8px;margin:5px 0 7px 0;">
              Фамилия Имя<br>
              Номер банковской карты<br>
              Название банка
            </span>
            3. Нажмите на кнопку "Платёж выполнен"
          </div>
        </div>
        <div class="deal-modal__pay">
          <label>Monobank</label>
          <div class="pay-bank">Monobank</div>
        </div>
        <div class="deal-modal__pay">
          <label>PUMB</label>
          <div class="pay-bank">PUMB</div>
        </div>
      </div>
      <div class="deal-modal__footer">
        <button class="deal-modal__action" onclick="paymentDone()">Платёж выполнен</button>
      </div>
      <div class="deal-modal__problems">
        Возникла проблема?
      </div>
    </div>
  `;
}
window.proceedToPayment = proceedToPayment;

// Payment done (final step)
function paymentDone() {
  document.getElementById('deal-modal').innerHTML = `
    <div class="deal-modal__window">
      <div class="deal-modal__header">
        Монеты будут отправлены через
        <span class="deal-modal__timer">09:53</span>
      </div>
      <div class="deal-modal__main">
        <div class="deal-modal__box">
          <div class="deal-modal__label">Покупка USDT</div>
          <div class="deal-modal__row"><span class="label">Сумма</span><span class="value">200.00 RUB</span></div>
          <div class="deal-modal__row"><span class="label">Цена</span><span class="value">₽ 70,96</span></div>
          <div class="deal-modal__row"><span class="label">Общее количество</span><span class="value">4.9752 USDT</span></div>
          <div class="deal-modal__row"><span class="label">Комиссии за транзакции</span><span class="value">0 USDT</span></div>
          <div class="deal-modal__row"><span class="label">Ордер №</span><span class="value">1749860855811555328</span></div>
          <div class="deal-modal__row"><span class="label">Время ордера</span><span class="value">2024-01-23 20:25:14</span></div>
        </div>
        <div class="deal-modal__box">
          <div class="deal-modal__label">Способ оплаты</div>
          <div class="deal-modal__row"><span class="label">Monobank</span></div>
          <div style="background:#263c2f;border-radius:7px;padding:7px 8px;margin:5px 0 7px 0;">
            Фамилия Имя<br>
            Номер банковской карты<br>
            Название банка
          </div>
        </div>
        <div class="deal-modal__box">
          <div class="deal-modal__label">Сведения о транзакции</div>
          <div class="deal-modal__row"><span class="label">Имя покупателя</span><span class="value">goldyan</span></div>
          <div class="deal-modal__row"><span class="label">Подтверждён</span><span class="value">✓</span></div>
        </div>
      </div>
      <div class="deal-modal__footer">
        <button class="deal-modal__action secondary" onclick="closeDealModal()">Требуется помощь?</button>
        <button class="deal-modal__action" onclick="closeDealModal()">Отменить ордер</button>
      </div>
      <div class="deal-modal__problems">
        Возникла проблема?
      </div>
    </div>
  `;
}
window.paymentDone = paymentDone;

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderOffersList();
});
