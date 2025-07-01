// src/pages/MyOrdersPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import './MyOrdersPage.css'; // создайте файл для стилей

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/my-orders')
      .then(res => setOrders(res.data))
      .catch(err => {
        console.error(err);
        setError('Не удалось загрузить ваши ордера');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="error">{error}</p>;
  if (orders.length === 0) return <p>У вас нет ордеров</p>;

  return (
    <div className="my-orders-page">
      <h1>Мои ордера</h1>
      <div className="orders-list">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
