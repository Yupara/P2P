import React, { useState } from "react";

const RATES = {
  USD: 1,
  EUR: 0.92,
  RUB: 87,
  KZT: 450
};

const CURRENCIES = Object.keys(RATES);

function ExchangeForm() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("RUB");
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleExchange = (e) => {
    e.preventDefault();

    if (from === to) {
      setError("Выберите разные валюты для обмена!");
      setResult(null);
      return;
    }
    if (amount <= 0) {
      setError("Введите сумму больше нуля.");
      setResult(null);
      return;
    }

    const usdAmount = amount / RATES[from];
    const exchanged = usdAmount * RATES[to];
    setResult(`${amount} ${from} = ${exchanged.toFixed(2)} ${to}`);
    setError("");
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: "40px auto",
      padding: 24,
      border: "1px solid #eee",
      borderRadius: 12,
      boxShadow: "0 4px 16px #0001"
    }}>
      <h2 style={{textAlign: "center"}}>Обмен валют</h2>
      <form onSubmit={handleExchange}>
        <div style={{marginBottom: 12}}>
          <label>От:
            <select value={from} onChange={e => setFrom(e.target.value)} style={{marginLeft: 8}}>
              {CURRENCIES.map(c =>
                <option key={c} value={c}>{c}</option>
              )}
            </select>
          </label>
        </div>
        <div style={{marginBottom: 12}}>
          <label>Кому:
            <select value={to} onChange={e => setTo(e.target.value)} style={{marginLeft: 8}}>
              {CURRENCIES.map(c =>
                <option key={c} value={c}>{c}</option>
              )}
            </select>
          </label>
        </div>
        <div style={{marginBottom: 12}}>
          <label>Сумма:
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              min="1"
              style={{marginLeft: 8, width: 120}}
              required
            />
          </label>
        </div>
        <button type="submit" style={{
          width: "100%",
          padding: 8,
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          fontWeight: "bold",
          fontSize: 16,
          cursor: "pointer"
        }}>Обменять</button>
      </form>
      {error && <div style={{color: "red", marginTop: 12}}>{error}</div>}
      {result && <div style={{marginTop: 16, background: "#e3fcef", padding: 12, borderRadius: 8, color: "#00695c"}}>{result}</div>}
      <div style={{marginTop: 24, fontSize: 13, color: "#555"}}>
        <b>Курсы:</b><br />
        1 USD = 0.92 EUR = 87 RUB = 450 KZT (условно)<br/>
        <i>Курсы фиксированы для примера.</i>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <ExchangeForm />
    </div>
  );
}
