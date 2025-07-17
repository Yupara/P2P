import React, { useState } from 'react';

function App() {
  // Список ордеров
  const [orders, setOrders] = useState([
    { id: 1, from: 'BTC', to: 'USDT', amount: 0.1, rate: 65000, user: 'Ivan' },
    { id: 2, from: 'ETH', to: 'BTC', amount: 1, rate: 0.054, user: 'Anna' },
  ]);
  // Для новой заявки
  const [newOrder, setNewOrder] = useState({
    from: '',
    to: '',
    amount: '',
    rate: '',
    user: '',
  });
  // Выбранный ордер для обмена
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [exchangeResult, setExchangeResult] = useState('');

  // Создать ордер
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (
      !newOrder.from ||
      !newOrder.to ||
      !newOrder.amount ||
      !newOrder.rate ||
      !newOrder.user
    ) {
      alert('Заполните все поля!');
      return;
    }
    setOrders([
      ...orders,
      { ...newOrder, id: Date.now(), amount: Number(newOrder.amount), rate: Number(newOrder.rate) },
    ]);
    setNewOrder({ from: '', to: '', amount: '', rate: '', user: '' });
  };

  // Обработать обмен
  const handleExchange = (order) => {
    setSelectedOrder(order);
    setExchangeResult(
      `Вы обменяли ${order.amount} ${order.from} на ${(order.amount * order.rate).toFixed(4)} ${order.to} по курсу ${order.rate}`
    );
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h1>P2P Обменник</h1>
      <h2>Ордеры на обмен</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', marginBottom: 20 }}>
        <thead>
          <tr>
            <th>Пользователь</th>
            <th>Отдаёт</th>
            <th>Получает</th>
            <th>Сумма</th>
            <th>Курс</th>
            <th>Обменять</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.user}</td>
              <td>{order.from}</td>
              <td>{order.to}</td>
              <td>{order.amount}</td>
              <td>{order.rate}</td>
              <td>
                <button onClick={() => handleExchange(order)}>Обменять</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Создать заявку</h2>
      <form onSubmit={handleOrderSubmit} style={{ marginBottom: 20 }}>
        <input
          placeholder="Ваше имя"
          value={newOrder.user}
          onChange={(e) => setNewOrder({ ...newOrder, user: e.target.value })}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Отдаёте (BTC/ETH/USDT)"
          value={newOrder.from}
          onChange={(e) => setNewOrder({ ...newOrder, from: e.target.value.toUpperCase() })}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Получаете (BTC/ETH/USDT)"
          value={newOrder.to}
          onChange={(e) => setNewOrder({ ...newOrder, to: e.target.value.toUpperCase() })}
          style={{ marginRight: 8 }}
        />
        <input
          placeholder="Сумма"
          type="number"
          value={newOrder.amount}
          onChange={(e) => setNewOrder({ ...newOrder, amount: e.target.value })}
          style={{ marginRight: 8, width: 100 }}
        />
        <input
          placeholder="Курс"
          type="number"
          value={newOrder.rate}
          onChange={(e) => setNewOrder({ ...newOrder, rate: e.target.value })}
          style={{ marginRight: 8, width: 80 }}
        />
        <button type="submit">Создать ордер</button>
      </form>

      {selectedOrder && (
        <div style={{ background: '#eee', padding: 16, marginTop: 16 }}>
          <strong>Результат обмена:</strong>
          <div>{exchangeResult}</div>
        </div>
      )}
    </div>
  );
}

export default App;
