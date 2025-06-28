let state = {
  // ...другие
  sortField: 'price',
  sortDir: 'asc',
  onlyOnline: false,
  onlyVerified: false,
  noLowLimit: false,
};

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
function getFilteredOffers() {
  let arr = state.tab === "buy" ? OFFERS_BUY : OFFERS_SELL;
  return arr
    .filter(o =>
      o.crypto === state.crypto &&
      (!state.amount || parseFloat(o.amount) >= parseFloat(state.amount)) &&
      (!state.payment || o.payMethods.find(pm => pm.name === state.payment || pm.icon === state.payment)) &&
      (!state.onlyOnline || o.online) &&
      (!state.onlyVerified || o.verified) &&
      (!state.noLowLimit || parseInt(o.limits) > 1000 /* например*/)
    )
    .sort((a, b) => {
      let f = state.sortField;
      let dir = state.sortDir === 'asc' ? 1 : -1;
      if (f === 'price') return (parseFloat(a.price.replace(',','.')) - parseFloat(b.price.replace(',','.'))) * dir;
      if (f === 'limits') return (parseInt(a.limits) - parseInt(b.limits)) * dir;
      if (f === 'amount') return (parseFloat(a.amount) - parseFloat(b.amount)) * dir;
      if (f === 'rating') return (b.percent - a.percent) * dir;
      return 0;
    });
}
