import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Order } from "./OrderCard";

export default function PaymentPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [statusMsg, setStatusMsg] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/orders/${orderId}`)
      .then((res) => res.json())
      .then(setOrder);
  }, [orderId]);

  if (!order) return <div className="p2p-app">Загрузка...</div>;

  const pay = order.payData || {};

  const handleStatusChange = async (newStatus: string) => {
    setStatusMsg("Отправка...");
    const res = await fetch(`/orders/${order.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    const data = await res.json();
    if (data.success) {
      setOrder({ ...order, status: newStatus });
      setStatusMsg("Статус обновлен: " + newStatus);
    } else {
      setStatusMsg("Ошибка: " + data.message);
    }
  };

  return (
    <div className="p2p-app">
      <button onClick={() => navigate(-1)} style={{marginBottom: 24}}>← Назад</button>
      <h2>Оплата заказа</h2>
      <div style={{marginBottom: 18}}>
        <b>Сумма:</b> 200.00 RUB <br />
        <b>Курс:</b> {order.price} RUB/USDT <br />
        <b>Общее количество:</b> {order.amount} <br />
        <b>Комиссия:</b> 0 USDT <br />
        <b>Время ордера:</b> {pay.orderTime}
      </div>
      <div style={{marginBottom: 18}}>
        <b>Способ оплаты:</b> {order.payment} <br />
        <b>ФИО:</b> {pay.fullName} <br />
        <b>Номер карты:</b> {pay.card} <br />
        <b>Банк:</b> {pay.bank}
      </div>
      <div style={{marginBottom: 18}}>
        <b>Имя покупателя:</b> {pay.buyer} <br />
        <b>Подтверждён</b>
      </div>
      <button
        className="buy-btn"
        style={{fontSize: 18, padding: "10px 38px", marginRight: 16}}
        onClick={() => handleStatusChange("paid")}
      >
        Я оплатил
      </button>
      <button
        className="filter-btn"
        style={{fontSize: 18, padding: "10px 38px"}}
        onClick={() => handleStatusChange("cancelled")}
      >
        Отменить ордер
      </button>
      <div style={{marginTop: 24, color: "#ffd600"}}>Возникла проблема?</div>
      {statusMsg && (
        <div style={{marginTop: 18, color: "#fff"}}>{statusMsg}</div>
      )}
    </div>
  );
}
