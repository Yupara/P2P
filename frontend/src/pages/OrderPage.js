import React from 'react';
import OrderCard from '../components/OrderCard';

const orders = [
  {
    id: 1,
    title: 'Обмен BTC на ETH',
    amountFrom: 0.5,
    currencyFrom: 'BTC',
    amountTo: 10,
    currencyTo: 'ETH',
    contact: '@bitcoin_user',
    createdAt: '2023-07-10T14:30:00Z',
  },
  {
    id: 2,
    title: 'Обмен ETH на USDT',
    amountFrom: 5,
    currencyFrom: 'ETH',
    amountTo: 1500,
    currencyTo: 'USDT',
    contact: '@eth_user',
    createdAt: '2023-07-11T16:45:00Z',
  }
  // Добавь больше заявок по необходимости
];

const OrderPage = () => {
  return (
    <div className="order-page">
      <h2>Список заявок</h2>
      <div className="order-list">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrderPage;
