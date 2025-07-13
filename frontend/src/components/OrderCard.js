// src/components/OrderCard.js
import React from 'react';
import './OrderCard.css'; // убедитесь, что этот файл существует

export default function OrderCard({ order }) {
  const {
    trader,         // имя пользователя
    price,          // цена за единицу
    currency,       // валюта (например, USDT)
    amount,         // количество
    limits,         // лимиты (мин–макс)
    paymentMethods, // массив способов оплаты
    side,           // 'buy' или 'sell'
    completed,      // количество завершённых сделок
    rate,           // спред или комиссия в %
  } = order;

  return (
    <div className={`order-card ${side}`}>
      <div className="order-header">
        <span className="trader">{trader}</span>
        <span className="completed">{completed} сделок</span>
        <span className="rate">{rate}% спред</span>
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
          <strong>Оплата:</strong> {paymentMethods.join(', ')}
        </div>
      </div>

      <button className={`order-btn ${side === 'buy' ? 'buy' : 'sell'}`}>
        {side === 'buy' ? 'Купить' : 'Продать'}
      </button>
    </div>
  );
}
