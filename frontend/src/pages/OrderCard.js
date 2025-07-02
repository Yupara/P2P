// src/components/OrderCard.js
import React from 'react';
import './OrderCard.css'; // создайте стили по нужному дизайну

export default function OrderCard({ order }) {
  const {
    id,
    trader,
    price,
    currency,
    amount,
    limits,
    paymentMethods,
    side,
    completed,
    rate,
  } = order;

  return (
    <div className={`order-card ${side}`}>
      <div className="order-header">
        <span className="trader">{trader}</span>
        <span className="completed">{completed} сделок</span>
        <span className="rate">{rate} спред</span>
      </div>

      <div className="order-body">
        <div className="price">
          <strong>Цена:</strong> {price} {currency}
        </div>
        <div className="amount">
          <strong>Количество:</strong> {amount} {currency}
        </div>
        <div className="limits">
          <strong>Лимиты:</strong> {limits}
        </div>
        <div className="methods">
          <strong>Методы оплаты:</strong> {paymentMethods.join(', ')}
        </div>
      </div>

      <button className={`order-btn ${side === 'buy' ? 'buy' : 'sell'}`}>
        {side === 'buy' ? 'Купить' : 'Продать'}
      </button>
    </div>
  );
}
