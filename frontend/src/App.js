// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import OrderCard from './components/OrderCard';

function App() {
  const [tab, setTab] = useState('buy');
  const [currency, setCurrency] = useState('USDT');
  const [amountFilter, setAmountFilter] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('all');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Ошибка загрузки ордеров:', err));
  }, []);

  const filtered = orders
    .filter(o => o.side === tab)
    .filter(o => currency ? o.amount.includes(currency) : true)
    .filter(o => amountFilter ? Number(o.amount) >= Number(amountFilter) : true)
    .filter(o => paymentMethod === 'all' || o.methods.includes(paymentMethod));

  return (
    <div className="app dark-theme">
      <header className="tabs">
        <button className={tab==='buy'?'active':''} onClick={()=>setTab('buy')}>Покупка</button>
        <button className={tab==='sell'?'active':''} onClick={()=>setTab('sell')}>Продажа</button>
      </header>

      <div className="filters">
        <select value={currency} onChange={e=>setCurrency(e.target.value)}>
          <option>USDT</option><option>BTC</option><option>ETH</option>
        </select>
        <input
          type="number"
          placeholder="Сумма"
          value={amountFilter}
          onChange={e=>setAmountFilter(e.target.value)}
        />
        <select value={paymentMethod} onChange={e=>setPaymentMethod(e.target.value)}>
          <option value="all">Все способы оплаты</option>
          <option value="SBP">SBP</option>
          <option value="Card">Карта</option>
          <option value="PayPal">PayPal</option>
        </select>
        <button className="filter-btn">Фильтр</button>
      </div>

      <div className="orders-list">
        {filtered.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
        {filtered.length===0 && <p className="no-results">Нет ордеров</p>}
      </div>
    </div>
  );
}

export default App;
