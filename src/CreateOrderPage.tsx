import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateOrderPage() {
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [limits, setLimits] = useState("");
  const [payment, setPayment] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const owner = token ? token.replace("demo-token-", "") : "";
    if (!owner) {
      setMsg("Вы не авторизованы");
      return;
    }
    const body = {
      username: owner,
      price,
      amount,
      limits,
      payment,
      orders: 0,
      percent: 0,
      status: "online",
      owner,
      payData: {
        bank: "",
        fullName: "",
        card: "",
        buyer: owner,
        orderTime: new Date().toISOString().slice(0, 19).replace("T", " ")
      }
    };
    const res = await fetch("/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (data.success) {
      setMsg("Ордер создан!");
      setTimeout(() => navigate("/my-orders"), 1000);
    } else {
      setMsg("Ошибка создания");
    }
  };

  return (
    <div className="p2p-app">
      <h2>Создать ордер</h2>
      <form onSubmit={handleCreate} style={{display: "flex", flexDirection: "column", gap: 16, marginTop: 24}}>
        <input
          placeholder="Цена (например, 70.00)"
          required
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <input
          placeholder="Количество (например, 100 USDT)"
          required
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <input
          placeholder="Лимиты (например, 500 – 500 000 RUB)"
          required
          value={limits}
          onChange={e => setLimits(e.target.value)}
        />
        <input
          placeholder="Способы оплаты (например, SBP)"
          required
          value={payment}
          onChange={e => setPayment(e.target.value)}
        />
        <button className="buy-btn" type="submit">Создать</button>
      </form>
      <div style={{marginTop: 12, color: "#ffd600"}}>{msg}</div>
    </div>
  );
}
const body = {
  // ...
  createdAt: new Date().toISOString(),
  // ...
};
