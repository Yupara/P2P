// src/pages/OrdersList.js
import React, { useEffect, useState } from 'react';
import OrderCard from '../components/OrderCard';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(setOrders)
      .catch(console.error);
  }, []);

  return (
    <div className="orders-list">
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
