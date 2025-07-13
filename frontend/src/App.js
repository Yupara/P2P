// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import OrderCard from './components/OrderCard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/list') // Убедись, что backend отдаёт данные по этому пути
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка загрузки:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <h1>📊 Список P2P сделок</h1>

        {loading ? (
          <p>⏳ Загрузка данных...</p>
        ) : orders.length === 0 ? (
          <p>Нет активных сделок.</p>
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
      <Footer />
    </div>
  );
}

export default App;
