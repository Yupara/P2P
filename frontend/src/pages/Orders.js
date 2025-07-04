import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import './Orders.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/orders')
      .then(res => setOrders(res.data))
      .catch(() => setError('Ошибка при загрузке объявлений'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="orders-page">
      <h1>Объявления P2P</h1>
      <div className="orders-list">
        {orders.length
          ? orders.map(o => <OrderCard key={o.id} order={o} />)
          : <p>Нет доступных объявлений</p>
        }
      </div>
    </div>
  );
}
