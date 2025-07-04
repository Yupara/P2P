import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import './OrdersList.css';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/orders')
      .then(res => setOrders(res.data))
      .catch(() => setError('Не удалось загрузить объявления'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="orders-list-page">
      <h1>Все объявления</h1>
      <div className="orders-list">
        {orders.length
          ? orders.map(o => <OrderCard key={o.id} order={o} />)
          : <p>Объявлений нет</p>
        }
      </div>
    </div>
  );
}
