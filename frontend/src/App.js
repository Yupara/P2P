// ...оставить весь предыдущий код без изменений

// --- Публичная страница объявления ---
function openOfferDetails(offerId) {
  const offer = OFFERS.find(o => o.id === offerId);
  if (!offer) {
    alert("Объявление не найдено");
    return;
  }
  document.getElementById('main').innerHTML = `
    <div class="main">
      <div class="offer-details-card">
        <div class="offer-details-header">
          <div class="offer-details-user">
            <span class="offer-card__avatar">
              <span class="offer-card__dot${offer.verified ? '' : ' warn'}"></span>
            </span>
            <span class="offer-card__name">${offer.user}</span> 
            <span class="offer-details-stat">${offer.orders} ${i18n('orders')} | ${offer.percent} %</span>
          </div>
          <div class="offer-details-type">${state.type === 'buy' ? i18n('buy') : i18n('sell')} ${offer.crypto} / ${offer.fiat}</div>
        </div>
        <div class="offer-details-row">
          <b>${i18n('price')}:</b> <span>${offer.fiat === 'RUB' ? '₽' : offer.fiat === 'UAH' ? '₴' : offer.fiat === 'USD' ? '$' : offer.fiat} ${offer.price}</span>
        </div>
        <div class="offer-details-row"><b>${i18n('amount')}:</b> <span>${offer.amount}</span></div>
        <div class="offer-details-row"><b>${i18n('limits')}:</b> <span>${offer.limits}</span></div>
        <div class="offer-details-row"><b>${i18n('payment_methods')}:</b> <span>${offer.payMethods.join(', ')}</span></div>
        <div class="offer-details-row">
          <button class="offer-details-btn" onclick="openDeal(${offer.id})">${state.type === "buy" ? i18n('buy') : i18n('sell')}</button>
        </div>
      </div>
      <div class="offer-profile-card">
        <h4>${i18n('seller_info')}</h4>
        <div>${i18n('nickname')}: <b>${offer.user}</b></div>
        <div>${i18n('orders')}: ${offer.orders}</div>
        <div>${i18n('percent')}: ${offer.percent}%</div>
        <div>${i18n('payment_methods')}: ${offer.payMethods.join(', ')}</div>
        <div>${i18n('about_seller')}: <span class="seller-about">${offer.user === 'Savak' ? 'Опытный продавец, быстрые переводы.' : 'Проверенный пользователь.'}</span></div>
      </div>
      <div class="offer-feedback-card">
        <h4>${i18n('reviews')}</h4>
        <div>
          <div class="feedback-row"><span class="feedback-user">trader1</span>: Всё отлично, быстро!</div>
          <div class="feedback-row"><span class="feedback-user">crypto4u</span>: Сработал без нареканий.</div>
        </div>
      </div>
    </div>
  `;
}
window.openOfferDetails = openOfferDetails;

// --- Клик по нику продавца/Подробнее в ордербуке ---
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
        <span class="offer-card__name" style="cursor:pointer" onclick="openOfferDetails(${o.id})">${o.user}</span>
        ${o.online ? '' : '<span class="offer-card__stat">15 мин.</span>'}
        <span class="offer-card__stat">${o.orders} ${i18n('orders')} | ${o.percent} %</span>
      </div>
      <div class="offer-card__price">${o.fiat === 'RUB' ? '₽' : o.fiat === 'UAH' ? '₴' : o.fiat === 'USD' ? '$' : o.fiat} ${o.price}</div>
      <div class="offer-card__usdt">${i18n('amount')} ${o.amount}</div>
      <div class="offer-card__limits">${i18n('limits')} ${o.limits}</div>
      <div class="offer-card__pay">${o.payMethods.map(pm=>`<span>${pm}</span>`).join('')}</div>
      <div class="offer-card__action-row">
        <button class="offer-card__btn" onclick="openDeal(${o.id})">${state.type === "buy" ? i18n('buy') : i18n('sell')}</button>
        <button class="offer-card__btn secondary" style="margin-left:7px" onclick="openOfferDetails(${o.id})">${i18n('details')}</button>
      </div>
    </div>
  `).join('');
}

// --- i18n дополнить ---
function i18n(key) {
  const ru = {
    // ...все предыдущие
    seller_info: 'Информация о продавце',
    about_seller: 'О продавце',
    nickname: 'Ник',
    percent: 'Процент',
    reviews: 'Отзывы',
    details: 'Подробнее',
    price: 'Цена',
  };
  return ru[key] || key;
}

// --- CSS для публичной страницы объявления ---
const offerDetailsCSS = `
.offer-details-card {
  background: var(--bg-card); border-radius: 14px; padding: 19px 17px 12px 17px; margin-bottom: 16px;
}
.offer-details-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;}
.offer-details-user { display:flex; align-items:center; gap:9px;}
.offer-details-type { color:var(--yellow); font-weight:600;}
.offer-details-stat { color:var(--text-muted); margin-left:11px;}
.offer-details-row { margin-bottom:8px;font-size:1.08em;}
.offer-details-btn { background:var(--btn-bg); color:var(--green); border:none; border-radius:8px; padding:8px 20px; font-size:1.1em; font-weight:700; cursor:pointer;}
.offer-details-btn:hover { background:var(--green); color:#14281b;}
.offer-profile-card, .offer-feedback-card { background:var(--bg-card); border-radius:13px; margin-bottom:13px; padding:11px 14px;}
.offer-profile-card h4, .offer-feedback-card h4 { color:var(--yellow); margin-top:0;}
.feedback-row { margin-bottom:4px;}
.feedback-user { color:var(--green); font-weight:600;}
.seller-about { color:var(--text-muted);}
.offer-card__btn.secondary { background:#204d36; color:var(--yellow); border:1px solid var(--yellow);}
.offer-card__btn.secondary:hover { background:var(--yellow); color:#204d36;}
`;
if (!document.getElementById('offer-details-css')) {
  const s = document.createElement('style');
  s.id = 'offer-details-css';
  s.innerHTML = offerDetailsCSS;
  document.head.appendChild(s);
}

// ...остальной код не менять
