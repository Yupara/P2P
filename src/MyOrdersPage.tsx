import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { OrderCard, Order } from "./OrderCard";
import LogoutButton from "./LogoutButton";

const STATUS_FILTERS = [
  { value: "", label: "Все статусы" },
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
  { value: "warning", label: "Warning" },
  { value: "paid", label: "Paid" },
  { value: "cancelled", label: "Cancelled" }
];

export default function MyOrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [username, setUsername] = useState<string>("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");

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

  // Уникальные способы оплаты для фильтра
  const paymentOptions = Array.from(new Set(orders.map(o => o.payment || "")))
    .filter(Boolean)
    .map(p => ({ value: p, label: p }));

  // Применение фильтров
  const filteredOrders = orders.filter(order => {
    const matchesSearch = search
      ? order.price.includes(search)
        || order.amount.includes(search)
        || order.limits.includes(search)
        || order.payment.toLowerCase().includes(search.toLowerCase())
        || (order.payData?.fullName || "").toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesStatus = status ? order.status === status : true;
    const matchesPayment = payment ? order.payment === payment : true;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="p2p-app">
      <div style={{display: "flex", justifyContent: "flex-end", marginBottom: 16}}>
        <LogoutButton />
      </div>
      <div style={{marginBottom: 18, display: "flex", gap: 16, alignItems: "center"}}>
        <Link to="/create-order" className="buy-btn">
          + Новый ордер
        </Link>
        <input
          placeholder="Поиск..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{padding: 4, borderRadius: 4}}
        />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          {STATUS_FILTERS.map(f => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
        <select value={payment} onChange={e => setPayment(e.target.value)}>
          <option value="">Все способы оплаты</option>
          {paymentOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {(search || status || payment) && (
          <button
            className="filter-btn"
            style={{marginLeft: 8}}
            onClick={() => { setSearch(""); setStatus(""); setPayment(""); }}
          >
            Сбросить фильтры
          </button>
        )}
      </div>
      <h2>Мои ордера</h2>
      {filteredOrders.length === 0 && <div>Нет ордеров по фильтру</div>}
      <section className="orders">
        {filteredOrders.map((order) => (
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
