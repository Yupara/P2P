import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import './MyOrdersPage.css';

export default function MyOrdersPage() {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/my-orders')
      .then(res => setMyOrders(res.data))
      .catch(err => setError('Не удалось загрузить ваши ордера'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error)   return <p className="error">{error}</p>;

  return (
    <div className="my-orders-page">
      <h1>Мои ордера</h1>
      <div className="orders-list">
        {myOrders.length
          ? myOrders.map(o => <OrderCard key={o.id} order={o} />)
          : <p>У вас нет активных ордеров</p>
        }
      </div>
    </div>
  );
}
