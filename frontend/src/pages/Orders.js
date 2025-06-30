import React from "react";
import OrderFilters from "../components/OrderFilters";
import OrderCard from "../components/OrderCard";

const Orders = ({ orders }) => (
  <main>
    <h1>Лента объявлений</h1>
    <OrderFilters />
    <div className="orders-list">
      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  </main>
);

export default Orders;
