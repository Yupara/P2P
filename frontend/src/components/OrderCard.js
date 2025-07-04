import React from 'react';
import './OrderCard.css';

export default function OrderCard({ order }) {
  const {
    trader, price, currency, amount,
    limits, paymentMethods, side,
    completed, rate
  } = order;

  return (
    <div className={`order-card ${side}`}>
      <div className="order-header">
        <span className="trader">{trader}</span>
        <span className="completed">{completed} сделок</span>
        <span className="rate">{rate} спред</span>
      </div>
      <div className="order-body">
        <div><strong>Цена:</strong> {price} {currency}</div>
        <div><strong>Количество:</strong> {amount} {currency}</div>
        <div><strong>Лимиты:</strong> {limits}</div>
        <div><strong>Методы оплаты:</strong> {paymentMethods.join(', ')}</div>
      </div>
      <button className={`order-btn ${side === 'buy' ? 'buy' : 'sell'}`}>
        {side === 'buy' ? 'Купить' : 'Продать'}
      </button>
    </div>
  );
}
