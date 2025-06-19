import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { OrderCard, Order } from "./OrderCard";
import LogoutButton from "./LogoutButton";

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

  const handleDelete = async (id: number) => {
    if (!window.confirm("Удалить ордер?")) return;
    await fetch(`/orders/${id}`, { method: "DELETE" });
    setOrders(orders.filter(o => o.id !== id));
  };

  return (
    <div className="p2p-app">
      <div style={{display: "flex", justifyContent: "flex-end", marginBottom: 16}}>
        <LogoutButton />
      </div>
      <div style={{marginBottom: 18}}>
        <Link to="/create-order" className="buy-btn">
          + Новый ордер
        </Link>
      </div>
      <h2>Мои ордера</h2>
      {orders.length === 0 && <div>У вас пока нет ордеров</div>}
      <section className="orders">
        {orders.map((order) => (
          <div key={order.id} style={{position: "relative"}}>
            <OrderCard {...order} onClick={() => navigate(`/order/${order.id}`)} />
            <div style={{position: "absolute", top: 8, right: 8, display: "flex", gap: 8}}>
              <button
                className="filter-btn"
                onClick={() => navigate(`/edit-order/${order.id}`)}
                style={{padding: "3px 10px", fontSize: 14}}
              >
                Редактировать
              </button>
              <button
                className="filter-btn"
                onClick={() => handleDelete(order.id)}
                style={{padding: "3px 10px", fontSize: 14, background: "#b22"}}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
