import React from "react";

const OrderCard = ({ order }) => (
  <div className="order-card">
    <div>🧑 {order.sellerNameMasked}</div>
    <div>💰 {order.price} ({order.rate})</div>
    <div>Мин: {order.min} / Макс: {order.max}</div>
    <div>Оплата: {order.paymentMethod} ({order.country})</div>
    <button>{order.type === "buy" ? "Купить" : "Продать"}</button>
  </div>
);

export default OrderCard;
