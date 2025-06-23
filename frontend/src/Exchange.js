import React, { useState, useEffect } from 'react';
import './Exchange.css';

const currencies = ["USDT", "BTC", "ETH", "RUB"];

export default function Exchange() {
  const [offers, setOffers] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState('USDT');
  const [selectedTo, setSelectedTo] = useState('RUB');
  const [payMethod, setPayMethod] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/offers')
      .then(res => res.json())
      .then(data => {
        setOffers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredOffers = offers.filter(
    o =>
      (!payMethod || o.payMethod.toLowerCase().includes(payMethod.toLowerCase())) &&
      o.from === selectedFrom &&
      o.to === selectedTo
  );

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
        {loading ? (
          <div style={{color: "#fff", textAlign: "center"}}>Загрузка...</div>
        ) : (
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
              {filteredOffers.map(o => (
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
        )}
        {!loading && filteredOffers.length === 0 && (
          <div className="no-offers">Нет подходящих предложений</div>
        )}
      </div>
    </div>
  );
}
