import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders')
      .then(res => setOrders(res.data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Список объявлений</h1>
      {orders.length === 0 && <p>Объявлений нет</p>}
      {orders.map(o => (
        <OrderCard key={o.id} order={o} />
      ))}
    </div>
  );
}
