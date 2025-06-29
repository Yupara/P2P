import React from "react";

const Orders = () => {
  // Пример данных заказов, замени на реальные или получай из API
  const orders = [
    { id: 1, item: "Велосипед", quantity: 2, status: "В обработке" },
    { id: 2, item: "Ноутбук", quantity: 1, status: "Доставлен" },
    { id: 3, item: "Смартфон", quantity: 3, status: "В пути" },
  ];

  return (
    <div>
      <h2>Мои заказы</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <strong>{order.item}</strong> — {order.quantity} шт., статус: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
