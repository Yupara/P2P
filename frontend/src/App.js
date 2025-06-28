// ---- ТВОЙ ОСНОВНОЙ КОД (оставь как было) ----
// ... (твой основной код до фильтров, офферов и прочего)
// ---- ДОБАВЛЕНИЯ: СОРТИРОВКА, БЫСТРЫЕ ФИЛЬТРЫ, СОЗДАНИЕ ОБЪЯВЛЕНИЯ ----

// 1. В state ДОБАВЬ поля:
state.sortField = state.sortField || 'price';
state.sortDir = state.sortDir || 'asc';
state.onlyOnline = state.onlyOnline || false;
state.onlyVerified = state.onlyVerified || false;
state.noLowLimit = state.noLowLimit || false;

// 2. В ФИЛЬТРЫ MARKET (где кнопки "USDT", "Сумма" и т.д.) ДОБАВЬ этот блок (например, после фильтров):
function renderMarketFilters() {
  return `
    ... // твои старые фильтры
    <div class="sort-group" style="margin-top:8px;">
      <span>Сортировка:</span>
      <button class="sort-btn" onclick="setSort('price')">Цена ${getSortMark('price')}</button>
      <button class="sort-btn" onclick="setSort('limits')">Лимит ${getSortMark('limits')}</button>
      <button class="sort-btn" onclick="setSort('amount')">Объем ${getSortMark('amount')}</button>
      <button class="sort-btn" onclick="setSort('rating')">Рейтинг ${getSortMark('rating')}</button>
    </div>
    <div class="fast-filters">
      <label><input type="checkbox" onchange="toggleFast('onlyOnline')" ${state.onlyOnline ? "checked" : ""}/> Только онлайн</label>
      <label><input type="checkbox" onchange="toggleFast('onlyVerified')" ${state.onlyVerified ? "checked" : ""}/> Только проверенные</label>
      <label><input type="checkbox" onchange="toggleFast('noLowLimit')" ${state.noLowLimit ? "checked" : ""}/> Без низких лимитов</label>
    </div>
  `;
}

// 3. ДОБАВЬ функции:
function setSort(field) {
  if (state.sortField === field) {
    state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    state.sortField = field;
    state.sortDir = 'asc';
  }
  renderMarket();
}
function getSortMark(field) {
  if (state.sortField !== field) return '';
  return state.sortDir === 'asc' ? '↑' : '↓';
}
function toggleFast(key) {
  state[key] = !state[key];
  renderMarket();
}

// 4. В getFilteredOffers после фильтрации ДОБАВЬ сортировку:
arr = arr.sort((a, b) => {
  let f = state.sortField;
  let dir = state.sortDir === 'asc' ? 1 : -1;
  if (f === 'price') return (parseFloat(a.price.replace(',','.')) - parseFloat(b.price.replace(',','.'))) * dir;
  if (f === 'limits') {
    let al = parseInt((a.limits||"0").replace(/[^0-9]/g,'')), bl = parseInt((b.limits||"0").replace(/[^0-9]/g,''));
    return (al - bl) * dir;
  }
  if (f === 'amount') return (parseFloat(a.amount) - parseFloat(b.amount)) * dir;
  if (f === 'rating') return (b.percent - a.percent) * dir;
  return 0;
});

// 5. В renderNav или меню ДОБАВЬ кнопку:
<span class="nav-btn nav-btn-create" onclick="goTo('create')">+ Создать объявление</span>

// 6. ДОБАВЬ страницу создания:
function renderCreateOffer() {
  document.getElementById('main').innerHTML += `
    <div class="p2p-dark">
      <div class="create-offer-card">
        <h2>Создать объявление</h2>
        <form id="create-offer-form" onsubmit="event.preventDefault(); submitCreateOffer();">
          <label>Тип операции:
            <select id="create-type">
              <option value="buy">Покупка</option>
              <option value="sell">Продажа</option>
            </select>
          </label>
          <label>Криптовалюта:
            <select id="create-crypto">
              ${CRYPTOS.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </label>
          <label>Цена:
            <input type="number" step="0.01" id="create-price" required placeholder="Введите цену">
          </label>
          <label>Объем (например, 100.00 USDT):
            <input type="text" id="create-amount" required placeholder="Пример: 100.00 USDT">
          </label>
          <label>Лимиты (например, 1000 – 100000 RUB):
            <input type="text" id="create-limits" required placeholder="Пример: 1000 – 100000 RUB">
          </label>
          <label>Способы оплаты:
            <input type="text" id="create-payments" required placeholder="Например: SBP, QIWI">
          </label>
          <button class="create-btn" type="submit">Создать</button>
          <button class="create-btn cancel" type="button" onclick="goTo('market')">Отмена</button>
        </form>
      </div>
    </div>
  `;
}
window.renderCreateOffer = renderCreateOffer;

function submitCreateOffer() {
  const type = document.getElementById('create-type').value;
  const crypto = document.getElementById('create-crypto').value;
  const price = document.getElementById('create-price').value;
  const amount = document.getElementById('create-amount').value;
  const limits = document.getElementById('create-limits').value;
  const payments = document.getElementById('create-payments').value.split(',').map(x=>x.trim()).filter(x=>x);
  const obj = {
    id: Date.now(),
    user: "Вы",
    online: true,
    verified: false,
    price: price,
    fiat: "RUB",
    crypto,
    amount,
    limits,
    orders: 0,
    percent: 0,
    time: null,
    payMethods: payments.map(p=>({icon:p.toLowerCase().replace(/[^a-zа-я0-9]/gi,''), name:p})),
    warn: false
  };
  if (type === "buy") state.offersBuy.unshift(obj);
  else state.offersSell.unshift(obj);
  goTo('market');
  setTimeout(()=>alert('Объявление создано!'), 100);
}
window.submitCreateOffer = submitCreateOffer;

// 7. В goTo добавь:
if (view === "create") renderCreateOffer();

// ---- КОНЕЦ ДОБАВОК ----

// ... (Дальше твой код как был, ничего не удалено и не изменено)
