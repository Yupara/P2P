import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Order } from "./OrderCard";

export default function OrderPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/orders/${orderId}`)
      .then((res) => res.json())
      .then(setOrder);
  }, [orderId]);

  if (!order) return <div className="p2p-app">Загрузка...</div>;

  return (
    <div className="p2p-app">
      <button onClick={() => navigate(-1)} style={{marginBottom: 24}}>← Назад</button>
      <h2>Покупка USDT</h2>
      <div style={{marginBottom: 16}}>Цена: <b>{order.price} RUB/USDT</b></div>
      <div>Доступно: <b>{order.amount}</b></div>
      <div>Лимиты: <b>{order.limits}</b></div>
      <div>Способы оплаты: <b>{order.payment}</b></div>
      <div style={{margin: "20px 0"}}><b>Введите сумму покупки:</b></div>
      <input type="number" placeholder="Сумма (RUB)" style={{fontSize: 18, padding: 8, borderRadius: 6, border: "1px solid #2a5b3c", background: "#184329", color: "#e1fbe3"}} />
      <div style={{marginTop: 28}}>
        <button className="buy-btn" style={{fontSize: 18, padding: "10px 38px"}} onClick={() => navigate(`/pay/${order.id}`)}>
          Перейти к оплате
        </button>
      </div>
    </div>
  );
}
