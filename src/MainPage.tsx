import React, { useState } from "react";
import { OrderCard, ordersMock } from "./OrderCard";
import { useNavigate } from "react-router-dom";

const TABS = ["Покупка", "Продажа"];

export function MainPage() {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

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
        {ordersMock.map((order, idx) => (
          <OrderCard
            {...order}
            key={order.username + order.price}
            onClick={() => navigate(`/deal/${idx}`)}
          />
        ))}
      </section>
    </div>
  );
}
