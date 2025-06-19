import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ordersMock } from "./OrderCard";

export default function PaymentPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = ordersMock[Number(orderId) || 0];

  return (
    <div className="p2p-app">
      <button onClick={() => navigate(-1)} style={{marginBottom: 24}}>← Назад</button>
      <h2>Оплата заказа</h2>
      <div style={{marginBottom: 18}}>
        <b>Сумма:</b> 200.00 RUB <br />
        <b>Курс:</b> {order.price} RUB/USDT <br />
        <b>Общее количество:</b> 4.9752 USDT <br />
        <b>Комиссия:</b> 0 USDT <br />
        <b>Время ордера:</b> 2024-01-23 20:25:14
      </div>
      <div style={{marginBottom: 18}}>
        <b>Способ оплаты:</b> SBP <br />
        <b>ФИО:</b> Иванов Иван <br />
        <b>Номер карты:</b> 1234 5678 9012 3456 <br />
        <b>Банк:</b> Сбербанк
      </div>
      <div style={{marginBottom: 18}}>
        <b>Имя покупателя:</b> goldyan <br />
        <b>Подтверждён</b>
      </div>
      <button className="buy-btn" style={{fontSize: 18, padding: "10px 38px", marginRight: 16}}>
        Я оплатил
      </button>
      <button className="filter-btn" style={{fontSize: 18, padding: "10px 38px"}}>
        Отменить ордер
      </button>
      <div style={{marginTop: 24, color: "#ffd600"}}>Возникла проблема?</div>
    </div>
  );
}
