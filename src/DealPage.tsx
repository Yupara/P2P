import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ordersMock } from "./OrderCard";

export function DealPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const order = ordersMock[Number(orderId) || 0];

  return (
    <div className="deal-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Назад</button>
      <div className="deal-timer">
        <span className="deal-timer-label">Монеты будут отправлены через</span>
        <span className="deal-timer-value">09:53</span>
      </div>
      <div className="deal-card">
        <div className="deal-section">
          <div className="deal-title">Покупка USDT</div>
          <div className="deal-row">
            <span>Сумма</span><span>200.00 UAH</span>
          </div>
          <div className="deal-row">
            <span>Цена</span><span>40.20 UAH</span>
          </div>
          <div className="deal-row">
            <span>Общее количество</span><span>4.9752 USDT</span>
          </div>
          <div className="deal-row">
            <span>Комиссии за транзакции</span><span>0 USDT</span>
          </div>
          <div className="deal-row">
            <span>Ордер №</span><span>17498...5328</span>
          </div>
          <div className="deal-row">
            <span>Время ордера</span><span>2024-01-23 20:25:14</span>
          </div>
        </div>
        <div className="deal-section">
          <div className="deal-title">Способ оплаты</div>
          <div className="deal-row">
            <span className="deal-pay-tag">Monobank</span>
          </div>
          <div className="deal-row"><span>Имя</span> <span>Иван</span></div>
          <div className="deal-row"><span>Карта</span> <span>1234 3383</span></div>
          <div className="deal-row"><span>Банк</span> <span>ПУМБ</span></div>
        </div>
        <div className="deal-section">
          <div className="deal-title">Сведения о транзакции</div>
          <div className="
