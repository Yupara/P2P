import React from "react";

export interface Order {
  username: string;
  price: string;
  amount: string;
  limits: string;
  payment: string;
  orders: number;
  percent: number;
  status: "online" | "offline" | "warning";
}

export const ordersMock: Order[] = [
  {
    username: "Savak",
    price: "70,96",
    amount: "304,7685 USDT",
    limits: "500 – 500 000 RUB",
    payment: "SBP, кольнениe",
    orders: 40,
    percent: 10,
    status: "online",
  },
  {
    username: "Ищу_Партнеров",
    price: "71,03",
    amount: "128,8821 USDT",
    limits: "500 – 500 000 RUB",
    payment: "Пиметы, Овореол",
    orders: 15,
    percent: 10,
    status: "warning",
  },
  {
    username: "ПроданоМейкеро",
    price: "71,03",
    amount: "999,9999 USDT",
    limits: "500 – 500 000 RUB",
    payment: "SBP",
    orders: 11,
    percent: 10,
    status: "online",
  },
];

export function OrderCard(order: Order) {
  return (
    <div className="order-card">
      <div className="order-left">
        <OrderStatus status={order.status} />
        <div>
          <div className="order-username">{order.username}</div>
          <div className="order-price">₽ {order.price}</div>
          <div className="order-amount">Количество {order.amount}</div>
          <div className="order-limits">Лимиты {order.limits}</div>
          <div className="order-payment">{order.payment}</div>
        </div>
      </div>
      <div className="order-right">
        <div>
          {order.orders} Ордеров | {order.percent} %
        </div>
        <button className="buy-btn">Покупка</button>
      </div>
    </div>
  );
}

function OrderStatus({ status }: { status: Order["status"] }) {
  let color = "#3ec85a";
  if (status === "warning") color = "#ffd600";
  if (status === "offline") color = "grey";
  return <span className="order-status-dot" style={{ background: color }} />;
}
