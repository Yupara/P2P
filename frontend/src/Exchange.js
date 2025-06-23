import React, { useState } from 'react';
import './Exchange.css';

const offers = [
  {
    id: 1,
    user: "TraderA",
    payMethod: "СБП",
    from: "USDT",
    to: "RUB",
    price: "92.30",
    limits: "5,000 - 100,000 RUB",
    available: "50,000 USDT",
    action: "Купить",
  },
  {
    id: 2,
    user: "TraderB",
    payMethod: "Тинькофф",
    from: "USDT",
    to: "RUB",
    price: "91.95",
    limits: "10,000 - 150,000 RUB",
    available: "100,000 USDT",
    action: "Купить",
  },
  {
    id: 3,
    user: "TraderC",
    payMethod: "Сбербанк",
    from: "RUB",
    to: "USDT",
    price: "92.60",
    limits: "7,000 - 50,000 RUB",
    available: "300,000 RUB",
    action: "Продать",
  },
];

const currencies = ["USDT", "BTC", "ETH", "RUB"];

export default function Exchange() {
  const [selectedFrom, setSelectedFrom] = useState('USDT');
  const [selectedTo, setSelectedTo] = useState('RUB');
  const [payMethod, setPayMethod] = useState('');

  return (
    <div className="exchange-container">
      <h1 className="exchange-title">P2P Обменник</h1>
      <div className="exchange-filters">
        <select
          value={selectedFrom}
          onChange={e => setSelectedFrom(e.target.value)}
        >
          {currencies.map(cur => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
        <span className="arrow">→</span>
        <select
          value={selectedTo}
          onChange={e => setSelectedTo(e.target.value)}
        >
          {currencies.map(cur => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
        <input
          className="pay-method-input"
          placeholder="Платёжная система (например, СБП)"
          value={payMethod}
          onChange={e => setPayMethod(e.target.value)}
        />
        <button className="filter-btn">Показать</button>
      </div>

      <div className="offers-table-container">
        <table className="offers-table">
          <thead>
            <tr>
              <th>Трейдер</th>
              <th>Платёж</th>
              <th>Курс</th>
              <th>Доступно</th>
              <th>Лимит</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {offers
              .filter(
                o =>
                  (!payMethod || o.payMethod.toLowerCase().includes(payMethod.toLowerCase())) &&
                  o.from === selectedFrom &&
                  o.to === selectedTo
              )
              .map(o => (
                <tr key={o.id}>
                  <td>{o.user}</td>
                  <td>{o.payMethod}</td>
                  <td className="price">{o.price}</td>
                  <td>{o.available}</td>
                  <td>{o.limits}</td>
                  <td>
                    <button className={o.action === "Купить" ? "buy-btn" : "sell-btn"}>
                      {o.action}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* Если нет предложений */}
        {offers.filter(
          o =>
            (!payMethod || o.payMethod.toLowerCase().includes(payMethod.toLowerCase())) &&
            o.from === selectedFrom &&
            o.to === selectedTo
        ).length === 0 && (
          <div className="no-offers">Нет подходящих предложений</div>
        )}
      </div>
    </div>
  );
}
