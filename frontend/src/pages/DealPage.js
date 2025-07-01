// src/pages/DealPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TradeChat from '../components/TradeChat';
import OrderCard from '../components/OrderCard';
import './DealPage.css'; // создайте файл для стилей

export default function DealPage() {
  const { id } = useParams();
  const [trade, setTrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`/api/trades/${id}`)
      .then(res => {
        setTrade(res.data);
      })
      .catch(err => {
        console.error(err);
        setError('Не удалось загрузить данные сделки');
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handlePaid = () => {
    axios.post(`/api/trades/${id}/paid`)
      .then(() => window.location.reload())
      .catch(() => alert('Ошибка при подтверждении оплаты'));
  };

  const handleRelease = () => {
    axios.post(`/api/trades/${id}/release`)
      .then(() => window.location.reload())
      .catch(() => alert('Ошибка при выпуске средств'));
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!trade) return <p>Сделка не найдена</p>;

  return (
    <div className="deal-page">
      <h1>Сделка #{trade.id}</h1>
      <OrderCard order={trade.offer} />
      <div className="trade-info">
        <p>Стороны: {trade.buyer.username} ↔ {trade.seller.username}</p>
        <p>Сумма: {trade.amount} {trade.cryptocurrency}</p>
        <p>Оплата: {trade.fiat_amount} {trade.fiat_currency}</p>
        <p>Статус: <strong>{trade.status}</strong></p>
      </div>

      <div className="actions">
        {trade.status === 'pending' && (
          <button onClick={handlePaid}>Я оплатил</button>
        )}
        {trade.status === 'paid' && (
          <button onClick={handleRelease}>Выпустить средства</button>
        )}
      </div>

      <TradeChat tradeId={id} />

      {trade.dispute && (
        <div className="dispute-info">
          <h2>Спор открыт</h2>
          <p>Причина: {trade.dispute.reason}</p>
          <p>Описание: {trade.dispute.description}</p>
        </div>
      )}
    </div>
  );
}
