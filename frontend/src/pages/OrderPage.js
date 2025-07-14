import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import OrderCard from '../components/OrderCard';

export default function OrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`/api/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(console.error);
  }, [id]);

  if (!order) return <p style={{ padding: 20 }}>Загрузка...</p>;

  return (
    <div style={{ padding: 20 }}>
      <Link to="/orders">← Назад к списку</Link>
      <h1>Объявление #{order.id}</h1>
      <OrderCard order={order} />
    </div>
  );
}
