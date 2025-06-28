function renderMarketFilters() {
  return `
    <div class="market-filters">
      <button class="filter-btn" onclick="showSelect('crypto')">${state.crypto} <span class="arrow">&#9662;</span></button>
      <button class="filter-btn" onclick="enterAmount()">${state.amount ? state.amount : "Сумма"} <span class="arrow">&#9662;</span></button>
      <button class="filter-btn" onclick="showSelect('payment')">${getPaymentLabel(state.payment)} <span class="arrow">&#9662;</span></button>
      <button class="filter-btn" onclick="applyFilters()">Фильтр</button>
      <div class="sort-group">
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
    </div>
  `;
}
