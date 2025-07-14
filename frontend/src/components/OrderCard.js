import React from 'react';
import './OrderCard.css';

export default function OrderCard({ order }) {
  const { id, trader, price, currency, amount, side } = order;
  return (
    <div className={`order-card ${side}`}>
      <div><strong>#{id}</strong> {trader}</div>
      <div>Цена: {price} {currency}</div>
      <div>Кол-во: {amount} {currency}</div>
      <button>{side === 'buy' ? 'Купить' : 'Продать'}</button>
    </div>
  );
}
