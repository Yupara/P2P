import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { OrderCard, Order } from "./OrderCard";

const STATUS_FILTERS = [
  { value: "", label: "Все статусы" },
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
  { value: "warning", label: "Warning" },
  { value: "paid", label: "Paid" },
  { value: "cancelled", label: "Cancelled" }
];

export default function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [payment, setPayment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/orders")
      .then(res => res.json())
      .then(setOrders);
  }, []);

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
        || (order.username || "").toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesStatus = status ? order.status === status : true;
    const matchesPayment = payment ? order.payment === payment : true;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const TABS = ["Все", "Купить", "Продать"]; // можно оставить для визуала

  return (
    <div className="p2p-app">
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <nav className="tabs">
          {TABS.map((t, i) => (
            <button
              key={t}
              className={tab === i ? "active" : ""}
              onClick={() => setTab(i)}
            >
              {t}
            </button>
          ))}
        </nav>
        <Link to="/my-orders" className="filter-btn" style={{marginLeft: 20}}>
          Мои ордера
        </Link>
      </div>
      <div style={{margin: "16px 0", display: "flex", gap: 16, alignItems: "center"}}>
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
      <section className="orders">
        {filteredOrders.length === 0 && <div>Нет ордеров по фильтру</div>}
        {filteredOrders.map((order) => (
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
useEffect(() => {
  let mounted = true;
  const fetchOrders = () => {
    fetch("/orders")
      .then(res => res.json())
      .then(data => { if (mounted) setOrders(data); });
  };
  fetchOrders();
  const interval = setInterval(fetchOrders, 10000); // обновлять каждые 10 сек
  return () => { mounted = false; clearInterval(interval); };
}, []);
const [sortBy, setSortBy] = useState("date-desc");

const sortedOrders = [...filteredOrders].sort((a, b) => {
  if (sortBy === "price-asc") return parseFloat(a.price) - parseFloat(b.price);
  if (sortBy === "price-desc") return parseFloat(b.price) - parseFloat(a.price);
  // Предполагаем, что есть поле createdAt (добавьте его при создании ордера!)
  if (sortBy === "date-asc") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  if (sortBy === "date-desc") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  return 0;
});
<select value={sortBy} onChange={e => setSortBy(e.target.value)}>
  <option value="date-desc">Сначала новые</option>
  <option value="date-asc">Сначала старые</option>
  <option value="price-asc">Цена ↑</option>
  <option value="price-desc">Цена ↓</option>
</select>
const [modalOrder, setModalOrder] = useState<Order|null>(null);
// ...
<OrderCard {...order} key={order.id} onClick={() => setModalOrder(order)} />
<OrderModal order={modalOrder} onClose={() => setModalOrder(null)} />
