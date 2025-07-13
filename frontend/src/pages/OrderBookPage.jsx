import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderCard from '../components/OrderCard';

function OrderBookPage() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/book')
      .then(res => setBook(res.data))
      .catch(err => console.error('Ошибка загрузки:', err));
  }, []);

  return (
    <div>
      <h2>📘 Книга ордеров</h2>
      {book.length === 0 ? (
        <p>Ордеров пока нет</p>
      ) : (
        book.map(order => (
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

export default OrderBookPage;
