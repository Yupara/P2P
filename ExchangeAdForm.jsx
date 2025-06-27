import React, { useState } from "react";

const fiat = [
  { code: "USD", name: "Доллар США" },
  { code: "EUR", name: "Евро" },
  { code: "RUB", name: "Рубль" },
];

const crypto = [
  { code: "BTC", name: "Bitcoin" },
  { code: "ETH", name: "Ethereum" },
  { code: "USDT", name: "Tether" },
];

export default function ExchangeAdForm() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет отправка данных на сервер
    alert(
      `Объявление создано!\nОбмен: ${amount} ${fromCurrency} → ${toCurrency}\nКомментарий: ${comment}`
    );
    // Очистить форму
    setAmount("");
    setFromCurrency("");
    setToCurrency("");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "2rem auto", padding: 16, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Создать объявление обмена</h2>
      <div>
        <label>
          Отдаю:
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            required
          >
            <option value="">Выберите валюту</option>
            <optgroup label="Фиат">
              {fiat.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.name} ({cur.code})
                </option>
              ))}
            </optgroup>
            <optgroup label="Крипто">
              {crypto.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.name} ({cur.code})
                </option>
              ))}
            </optgroup>
          </select>
        </label>
      </div>
      <div>
        <label>
          Получаю:
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            required
          >
            <option value="">Выберите валюту</option>
            <optgroup label="Фиат">
              {fiat.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.name} ({cur.code})
                </option>
              ))}
            </optgroup>
            <optgroup label="Крипто">
              {crypto.map((cur) => (
                <option key={cur.code} value={cur.code}>
                  {cur.name} ({cur.code})
                </option>
              ))}
            </optgroup>
          </select>
        </label>
      </div>
      <div>
        <label>
          Сумма:
          <input
            type="number"
            min="0"
            step="any"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Комментарий:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Условия, способы оплаты и т.д."
            rows={3}
          />
        </label>
      </div>
      <button type="submit" style={{ marginTop: 12 }}>Создать объявление</button>
    </form>
  );
}
