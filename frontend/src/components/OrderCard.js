import React from 'react';
import './OrderCard.css';  // Импортируем стили для компонента, если они есть

const OrderCard = ({ order }) => {
  // Если передаются данные о заказе, то отображаем их
  return (
    <div className="order-card">
      <h3 className="order-card-title">{order.title}</h3>
      <div className="order-card-info">
        <p><strong>Отдаете:</strong> {order.amountFrom} {order.currencyFrom}</p>
        <p><strong>Получаете:</strong> {order.amountTo} {order.currencyTo}</p>
        <p><strong>Контакт:</strong> {order.contact}</p>
        <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      </div>
      <div className="order-card-actions">
        <button className="btn-action">Подробнее</button>
      </div>
    </div>
  );
}

export default OrderCard;
