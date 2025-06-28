// --- БЛОК ОТЗЫВЫ И РЕЙТИНГ (добавь в проект, ничего не удаляя!) ---

// --- Пример структуры отзывов (можно хранить в state или localStorage) ---
const USER_REVIEWS = {
  // user: [{from, rating, text, date}]
  "Savak": [
    {from: "user1", rating: 5, text: "Всё быстро, спасибо!", date: "2025-06-20"},
    {from: "user2", rating: 4, text: "Пару минут ожидал, но всё ок.", date: "2025-05-16"}
  ],
  "SellMaster": [
    {from: "user3", rating: 5, text: "Лучший продавец!", date: "2025-06-22"}
  ]
};
// --- В STATE добавь поле для модального окна отзывов ---
state.showReviews = state.showReviews || null; // userName если открыт просмотр

// --- В КАРТОЧКУ ОФФЕРА добавь отображение рейтинга и кнопку отзывы ---
function renderOfferCard(offer) {
  const userReviews = USER_REVIEWS[offer.user] || [];
  const avgRating = userReviews.length
    ? (userReviews.reduce((a, r) => a + r.rating, 0) / userReviews.length).toFixed(1)
    : null;
  return `
    <div class="offer-card${offer.warn ? " warn" : ""}" onclick="openDeal(${offer.id})" style="cursor:pointer;">
      <div class="offer-header">
        ${offer.warn ? `<span class="offer-icon warn-ico">&#9888;</span>` : ""}
        <span class="offer-icon status-dot ${offer.online ? "green" : "yellow"}"></span>
        <span class="offer-username">${offer.user}</span>
        <span class="offer-rating">${avgRating ? renderStars(avgRating) : "—"}</span>
        <button class="review-link" onclick="event.stopPropagation();showUserReviews('${offer.user}')">Отзывы (${userReviews.length})</button>
        ${offer.time ? `<span class="offer-time">${offer.time}</span>` : ""}
        <span class="offer-orders">${offer.orders} Ордеров | ${offer.percent} %</span>
      </div>
      <div class="offer-price">₽ ${offer.price}</div>
      <div class="offer-amount">Количество <span>${offer.amount}</span></div>
      <div class="offer-limits">Лимиты <span>${offer.limits}</span></div>
      ${offer.payMethods.length ? `<div class="offer-methods">${offer.payMethods.map(m=>`${methodIcon(m.icon)} ${m.name}`).join(" | ")}</div>` : ""}
      <div class="offer-cta"><button class="buy-btn" onclick="event.stopPropagation(); openDeal(${offer.id})">${state.tab === "buy" ? "Покупка" : "Продажа"}</button></div>
    </div>
  `;
}
window.renderOfferCard = renderOfferCard;

// --- Функция рендера звёзд ---
function renderStars(rating) {
  let out = "";
  for (let i = 1; i <= 5; ++i) {
    out += `<span style="color:${i <= rating ? "#ffd700" : "#bbb"};font-size:16px;">★</span>`;
  }
  return `<span title="${rating}">${out}</span>`;
}

// --- МОДАЛЬНОЕ ОКНО ОТЗЫВОВ ---
function showUserReviews(user) {
  state.showReviews = user;
  renderReviewsModal();
}
window.showUserReviews = showUserReviews;

function renderReviewsModal() {
  if (!state.showReviews) return;
  const reviews = USER_REVIEWS[state.showReviews] || [];
  document.body.insertAdjacentHTML("beforeend", `
    <div id="reviews-modal-bg" style="position:fixed;left:0;top:0;width:100vw;height:100vh;z-index:1000;background:rgba(0,0,0,0.42);" onclick="closeReviewsModal()"></div>
    <div id="reviews-modal" style="position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);background:#222;color:#fff;z-index:1001;width:350px;max-width:90vw;padding:20px 14px 14px 14px;border-radius:12px;">
      <h3>Отзывы о ${state.showReviews}</h3>
      <div>
        ${reviews.length ? reviews.map(r => `
          <div class="review-row" style="border-bottom:1px solid #444;margin-bottom:8px;padding-bottom:4px;">
            <div>${renderStars(r.rating)} <span style="font-size:12px;color:#888;">${r.date}</span></div>
            <div style="font-size:13px;color:#ccc;">${r.text}</div>
            <div style="font-size:12px;color:#8af;">От: ${r.from}</div>
          </div>
        `).join('') : '<div>Пока нет отзывов</div>'}
      </div>
      <button onclick="closeReviewsModal()" style="margin-top:10px;">Закрыть</button>
    </div>
  `);
}
window.renderReviewsModal = renderReviewsModal;
function closeReviewsModal() {
  state.showReviews = null;
  document.getElementById("reviews-modal")?.remove();
  document.getElementById("reviews-modal-bg")?.remove();
}
window.closeReviewsModal = closeReviewsModal;

// --- После успешной сделки (например, в dealPaid или после подтверждения сделки) покажи форму оставить отзыв ---
function askLeaveReview(user) {
  document.body.insertAdjacentHTML("beforeend", `
    <div id="review-modal-bg" style="position:fixed;left:0;top:0;width:100vw;height:100vh;z-index:1500;background:rgba(0,0,0,0.42);" onclick="closeReviewModal()"></div>
    <div id="review-modal" style="position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);background:#222;color:#fff;z-index:1501;width:340px;max-width:90vw;padding:20px 14px 14px 14px;border-radius:12px;">
      <h3>Оставьте отзыв о ${user}</h3>
      <div style="margin-bottom:10px;">
        <span id="review-rating">${renderStarsInput(5)}</span>
      </div>
      <textarea id="review-text" rows="3" style="width:96%;border-radius:7px;" placeholder="Комментарий..."></textarea>
      <button onclick="submitReview('${user}')" style="margin-top:10px;">Отправить</button>
      <button onclick="closeReviewModal()" style="margin-left:10px;">Отмена</button>
    </div>
  `);
  setReviewInputStars();
}
window.askLeaveReview = askLeaveReview;

// --- Рисуем интерактивные звезды для оценки ---
function renderStarsInput(rating) {
  let out = "";
  for (let i = 1; i <= 5; ++i) {
    out += `<span class="star-inp" data-rate="${i}" style="color:${i <= rating ? "#ffd700" : "#bbb"};font-size:24px;cursor:pointer;">★</span>`;
  }
  return out;
}
function setReviewInputStars() {
  let rating = 5;
  document.querySelectorAll('.star-inp').forEach(star => {
    star.onclick = function() {
      rating = +star.getAttribute('data-rate');
      document.getElementById('review-rating').innerHTML = renderStarsInput(rating);
      setReviewInputStars();
    }
  });
  window.getReviewInputRating = () => rating;
}

// --- Обработка отправки отзыва ---
function submitReview(user) {
  let text = document.getElementById('review-text').value;
  let rating = 0;
  document.querySelectorAll('.star-inp').forEach(star => {
    if (star.style.color === "rgb(255, 215, 0)") rating++;
  });
  if (!rating) rating = 5;
  USER_REVIEWS[user] = USER_REVIEWS[user] || [];
  USER_REVIEWS[user].unshift({
    from: "Вы",
    rating,
    text,
    date: (new Date()).toISOString().slice(0,10)
  });
  closeReviewModal();
  alert('Спасибо за отзыв!');
}
window.submitReview = submitReview;
function closeReviewModal() {
  document.getElementById("review-modal")?.remove();
  document.getElementById("review-modal-bg")?.remove();
}

// --- Вставь вызов askLeaveReview(user) после успешной сделки (например, после dealPaid или в renderDeal при завершении)
// Например: askLeaveReview(offer.user);
