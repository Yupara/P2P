import React from "react";

const OrderFilters = () => (
  <div className="order-filters">
    <select>
      <option>USDT</option>
      <option>BTC</option>
      {/* ... */}
    </select>
    <select>
      <option>Buy</option>
      <option>Sell</option>
    </select>
    <select>
      <option>USD</option>
      <option>EUR</option>
      <option>KZT</option>
    </select>
    <select>
      <option>Банковская карта</option>
      <option>Платёжные системы</option>
    </select>
    <button>Фильтровать</button>
  </div>
);

export default OrderFilters;
