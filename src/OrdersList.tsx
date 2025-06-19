import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrderCard, Order } from "./OrderCard";
import "./App.css";

const TABS = ["Покупка", "Продажа"];

export default function OrdersList() {
  const [tab, setTab] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://your-backend-api.com/orders") // замените на ваш реальный endpoint
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  return (
    <div className="p2p-app">
      <nav className="tabs">
        {TABS.map((t, i) => (
          <button
            key={t}
            className={tab === i ? "active" : ""}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </nav>
      <section className="filters">
        <select>
          <option>USDT</option>
        </select>
        <input placeholder="Сумма" />
        <select>
          <option>Все способы оплаты</option>
        </select>
        <button className="filter-btn">Фильтр</button>
      </section>
      <div className="hotswap-banner">
        Попробуйте P2P HotSwap – лучшие ставки и больше ликвидности!
        <button>Узнать больше</button>
      </div>
      <section className="orders">
        {orders.map((order, idx) => (
          <OrderCard
            {...order}
            key={order.username + order.price}
            onClick={() => navigate(`/order/${order.id}`)}
          />
        ))}
      </section>
    </div>
  );
}
