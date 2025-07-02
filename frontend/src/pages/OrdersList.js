import React from 'react';
import OrderCard from '../components/OrderCard';

const OrdersList = ({ orders }) => {
  return (
    <div className="orders-list">
      {orders && orders.length > 0 ? (
        orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))
      ) : (
        <p>Нет доступных ордеров.</p>
      )}
    </div>
  );
};

export default OrdersList;
