import React, { useState } from "react";

const coins = ["USDT", "BTC", "ETH"];

const initialOrderBook = [
  { id: 1, side: "buy", price: 65000, amount: 0.01, coin: "BTC", user: "Trader1" },
  { id: 2, side: "sell", price: 65200, amount: 0.02, coin: "BTC", user: "Trader2" },
  { id: 3, side: "buy", price: 3500, amount: 0.5, coin: "ETH", user: "Trader3" },
  { id: 4, side: "sell", price: 3600, amount: 0.4, coin: "ETH", user: "Trader4" }
];

function App() {
  const [orderBook, setOrderBook] = useState(initialOrderBook);
  const [activeCoin, setActiveCoin] = useState("BTC");
  const [form, setForm] = useState({
    side: "buy",
    price: "",
    amount: "",
    coin: activeCoin,
    user: ""
  });

  // Фильтрация ордеров по выбранной монете
  const filteredOrders = orderBook.filter((o) => o.coin === activeCoin);

  // Обработка формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      coin: activeCoin
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.price || !form.amount || !form.user) {
      alert("Заполните все поля!");
      return;
    }
    setOrderBook([
      ...orderBook,
      {
        ...form,
        price: Number(form.price),
        amount: Number(form.amount),
        id: Date.now()
      }
    ]);
    setForm({ ...form, price: "", amount: "", user: "" });
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: 24, fontFamily: "Arial,sans-serif" }}>
      <h1 style={{ textAlign: "center", fontWeight: 700 }}>P2P Exchange (Like Bybit)</h1>
      {/* Выбор монеты */}
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
        {coins.map((coin) => (
          <button
            key={coin}
            onClick={() => setActiveCoin(coin)}
            style={{
              padding: "8px 20px",
              background: activeCoin === coin ? "#f5a623" : "#222",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: activeCoin === coin ? "bold" : "normal"
            }}
          >
            {coin}
          </button>
        ))}
      </div>
      {/* Ордербук */}
      <div style={{ marginBottom: 30 }}>
        <h2 style={{ marginBottom: 10, color: "#f5a623" }}>Order Book ({activeCoin})</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#222", color: "#fff" }}>
              <th style={{ padding: 8 }}>Side</th>
              <th style={{ padding: 8 }}>Price</th>
              <th style={{ padding: 8 }}>Amount</th>
              <th style={{ padding: 8 }}>User</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length ? (
              filteredOrders.map((order) => (
                <tr key={order.id} style={{ background: order.side === "buy" ? "#edfff7" : "#fff1f2" }}>
                  <td style={{ padding: 8, color: order.side === "buy" ? "#00c076" : "#f6465d", fontWeight: "bold" }}>
                    {order.side === "buy" ? "Buy" : "Sell"}
                  </td>
                  <td style={{ padding: 8 }}>{order.price}</td>
                  <td style={{ padding: 8 }}>{order.amount}</td>
                  <td style={{ padding: 8 }}>{order.user}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center", padding: 12 }}>Нет ордеров</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Создание ордера */}
      <div style={{
        background: "#222",
        padding: 24,
        borderRadius: 10,
        color: "#fff"
      }}>
        <h2 style={{ color: "#f5a623", marginBottom: 16 }}>Создать ордер</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <select name="side" value={form.side} onChange={handleChange} style={{ padding: 8, borderRadius: 6 }}>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Цена"
            value={form.price}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 6, width: 100 }}
          />
          <input
            type="number"
            name="amount"
            placeholder="Количество"
            value={form.amount}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 6, width: 120 }}
          />
          <input
            type="text"
            name="user"
            placeholder="Ваше имя"
            value={form.user}
            onChange={handleChange}
            style={{ padding: 8, borderRadius: 6, width: 130 }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 20px",
              background: "#f5a623",
              color: "#222",
              border: "none",
              borderRadius: 6,
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Разместить
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
