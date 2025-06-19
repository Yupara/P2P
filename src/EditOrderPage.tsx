import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const STATUS_OPTIONS = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
  { value: "warning", label: "Warning" },
  { value: "paid", label: "Paid" },
  { value: "cancelled", label: "Cancelled" }
];

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
      status: order.status,
      payData: {
        bank: order.payData?.bank,
        fullName: order.payData?.fullName,
        card: order.payData?.card,
        buyer: order.payData?.buyer,
        orderTime: order.payData?.orderTime,
      }
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
        <select
          value={order.status}
          onChange={e => setOrder({...order, status: e.target.value})}
        >
          {STATUS_OPTIONS.map(opt => (
            <option value={opt.value} key={opt.value}>{opt.label}</option>
          ))}
        </select>
        <input
          placeholder="Банк"
          value={order.payData?.bank || ""}
          onChange={e => setOrder({
            ...order,
            payData: { ...order.payData, bank: e.target.value }
          })}
        />
        <input
          placeholder="ФИО"
          value={order.payData?.fullName || ""}
          onChange={e => setOrder({
            ...order,
            payData: { ...order.payData, fullName: e.target.value }
          })}
        />
        <input
          placeholder="Карта"
          value={order.payData?.card || ""}
          onChange={e => setOrder({
            ...order,
            payData: { ...order.payData, card: e.target.value }
          })}
        />
        <button className="buy-btn" type="submit">Сохранить</button>
      </form>
      <div style={{marginTop: 12, color: "#ffd600"}}>{msg}</div>
    </div>
  );
}
