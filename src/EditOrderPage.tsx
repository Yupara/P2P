import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditOrderPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/orders/${orderId}`)
      .then(res => res.json())
      .then(setOrder);
  }, [orderId]);

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      price: order.price,
      amount: order.amount,
      limits: order.limits,
      payment: order.payment,
    };
    const res = await fetch(`/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.success) {
      setMsg("Сохранено!");
      setTimeout(() => navigate("/my-orders"), 800);
    } else {
      setMsg("Ошибка");
    }
  };

  if (!order) return <div className="p2p-app">Загрузка...</div>;

  return (
    <div className="p2p-app">
      <h2>Редактировать ордер</h2>
      <form onSubmit={handleEdit} style={{display: "flex", flexDirection: "column", gap: 16, marginTop: 24}}>
        <input
          placeholder="Цена"
          value={order.price}
          onChange={e => setOrder({...order, price: e.target.value})}
        />
        <input
          placeholder="Количество"
          value={order.amount}
          onChange={e => setOrder({...order, amount: e.target.value})}
        />
        <input
          placeholder="Лимиты"
          value={order.limits}
          onChange={e => setOrder({...order, limits: e.target.value})}
        />
        <input
          placeholder="Способы оплаты"
          value={order.payment}
          onChange={e => setOrder({...order, payment: e.target.value})}
        />
        <button className="buy-btn" type="submit">Сохранить</button>
      </form>
      <div style={{marginTop: 12, color: "#ffd600"}}>{msg}</div>
    </div>
  );
}
