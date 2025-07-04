// src/pages/OrderBookPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import OrderFilters from '../components/OrderFilters';
import './OrderBookPage.css'; // создайте файл для стилизации

export default function OrderBookPage() {
  const [side, setSide] = useState('buy');        // «buy» или «sell»
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // фильтры
  const [currency, setCurrency] = useState('USDT');
  const [minAmount, setMinAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('all');

  useEffect(() => {
    // загрузка всех активных ордеров
    axios.get('/api/orders')
      .then(res => setOrders(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    // применяем фильтры при изменении исходных данных или фильтров
    let list = orders.filter(o => o.side === side);
    if (currency) {
      list = list.filter(o => o.currency === currency);
    }
    if (minAmount) {
      list = list.filter(o => +o.amount >= +minAmount);
    }
    if (paymentMethod !== 'all') {
      list = list.filter(o => o.paymentMethods.includes(paymentMethod));
    }
    setFiltered(list);
  }, [orders, side, currency, minAmount, paymentMethod]);

  return (
    <div className="orderbook-page">
      <header className="tabs">
        <button
          className={side === 'buy' ? 'active' : ''}
          onClick={() => setSide('buy')}
        >
          Покупка
        </button>
        <button
          className={side === 'sell' ? 'active' : ''}
          onClick={() => setSide('sell')}
        >
          Продажа
        </button>
      </header>

      <OrderFilters
        currency={currency}
        onCurrencyChange={setCurrency}
        minAmount={minAmount}
        onMinAmountChange={setMinAmount}
        paymentMethod={paymentMethod}
        onPaymentMethodChange={setPaymentMethod}
      />

      <div className="orders-grid">
        {filtered.length > 0 ? (
          filtered.map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <p className="no-orders">Нет доступных объявлений</p>
        )}
      </div>
    </div>
  );
}
