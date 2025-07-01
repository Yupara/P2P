import React from "react";
import { OrderCard, ordersMock } from "./OrderCard";

export default function OrdersList() {
  // Тут может быть логика фильтрации, поиска и пр.
  return (
    <>
      <h2>Список ордеров</h2>
      <section className="orders">
        {ordersMock.map(order =>
          <OrderCard
            key={order.id}
            {...order}
            onClick={() => alert(`Открыть ордер #${order.id}`)}
          />
        )}
      </section>
    </>
  );
}
