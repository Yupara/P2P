import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';

function MyOrdersPage() {
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/my-orders') // адаптируй под свой API
      .then(res => setMyOrders(res.data))
      .catch(err => console.error('Ошибка загрузки:', err));
  }, []);

  return (
    <div>
      <h2>📁 Мои сделки</h2>
      {myOrders.length === 0 ? (
        <p>У тебя пока нет сделок</p>
      ) : (
        myOrders.map(order => (
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

export default MyOrdersPage;
