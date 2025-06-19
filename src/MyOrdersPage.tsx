import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderCard, Order } from "./OrderCard";

export default function MyOrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = token ? token.replace("demo-token-", "") : "";
    if (!user) {
      navigate("/login");
      return;
    }
    setUsername(user);

    fetch(`/orders/user/${user}`)
      .then(res => res.json())
      .then(setOrders);
  }, [navigate]);

  return (
    <div className="p2p-app">
      <h2>Мои ордера</h2>
      {orders.length === 0 && <div>У вас пока нет ордеров</div>}
      <section className="orders">
        {orders.map((order) => (
          <OrderCard
            {...order}
            key={order.id}
            onClick={() => navigate(`/order/${order.id}`)}
          />
        ))}
      </section>
    </div>
  );
}
