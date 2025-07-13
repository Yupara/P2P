import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';

function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/list') // API-эндпоинт
      .then(res => setOrders(res.data))
      .catch(err => console.error('Ошибка загрузки:', err));
  }, []);

  return (
    <div>
      <h2>🗂️ Все доступные сделки</h2>
      {orders.length === 0 ? (
        <p>Нет активных сделок</p>
      ) : (
        orders.map(order => (
          <OrderCard
            key={order.id}
            buyer={order.buyer}
            seller={order.seller}
            amount={order.amount}
            currency={order.currency}
            status={order.status}
          />
        ))
      )}
    </div>
  );
}

export default OrdersList;
