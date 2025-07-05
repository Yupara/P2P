// src/pages/OrderPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OrderCard from '../components/OrderCard';
import './OrderPage.css';

export default function OrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(() => setError('Не удалось загрузить объявление'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error)   return <p className="error">{error}</p>;
  if (!order)  return <p>Объявление не найдено</p>;

  return (
    <div className="order-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Назад</button>
      <h1>Объявление #{order.id}</h1>
      <OrderCard order={order} />
      <div className="order-actions">
        <button onClick={() => navigate(`/trade/${order.id}`)}>
          Начать сделку
        </button>
      </div>
    </div>
  );
}
