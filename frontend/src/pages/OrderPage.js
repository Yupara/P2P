import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import OrderCard from '../components/OrderCard';

function OrderPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/orders/${id}`)
      .then(res => setOrder(res.data))
      .catch(err => console.error('Ошибка загрузки:', err));
  }, [id]);

  return (
    <div>
      <h2>📄 Сделка #{id}</h2>
      {order ? (
        <OrderCard
          buyer={order.buyer}
          seller={order.seller}
          amount={order.amount}
          currency={order.currency}
          status={order.status}
        />
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}

export default OrderPage;
