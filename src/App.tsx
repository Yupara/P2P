import React, { useState } from "react";
import { OrderCard, ordersMock } from "./OrderCard";
import "./App.css";

const TABS = ["Покупка", "Продажа"];

function App() {
  const [tab, setTab] = useState(0);
  // TODO: implement filters logic
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
          {/* add more currencies */}
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
        {ordersMock.map((order) => (
          <OrderCard {...order} key={order.username + order.price} />
        ))}
      </section>
    </div>
  );
}

export default App;
