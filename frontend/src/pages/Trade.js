import React from "react";
import TradeChat from "../components/TradeChat";

const Trade = ({ trade }) => (
  <main>
    <h1>Сделка</h1>
    <div>
      <div>Покупатель: {trade.buyer}</div>
      <div>Продавец: {trade.seller}</div>
      <div>Сумма: {trade.amount}</div>
      <div>Курс: {trade.rate}</div>
      <div>Статус: {trade.status}</div>
      <div>⏳ Таймер: {trade.timer}</div>
    </div>
    <TradeChat messages={trade.messages} />
    <button>Я оплатил</button>
    <button>Выпустить средства</button>
  </main>
);

export default Trade;
