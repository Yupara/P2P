import React from "react";

export type Order = {
  id: number;
  username: string;
  price: string;
  amount: string;
  limits: string;
  payment: string;
  orders: number;
  percent: number;
  status: "online" | "offline" | "warning";
  owner: string;
  createdAt: string;
  payData?: {
    bank?: string;
    fullName?: string;
    card?: string;
    buyer?: string;
    orderTime?: string;
  };
};

export const ordersMock: Order[] = [
  {
    id: 1,
    username: "Savak",
    price: "70.00",
    amount: "100 USDT",
    limits: "500 – 500 000 RUB",
    payment: "SBP",
    orders: 99,
    percent: 100,
    status: "online",
    owner: "Savak",
    createdAt: "2024-06-01T12:00:00Z"
  },
  {
    id: 2,
    username: "Ищу_Партнеров",
    price: "69.80",
    amount: "300 USDT",
    limits: "1000 – 1 000 000 RUB",
    payment: "SBP",
    orders: 120,
    percent: 98,
    status: "warning",
    owner: "Ищу_Партнеров",
    createdAt: "2024-06-01T13:00:00Z"
  },
  {
    id: 3,
    username: "ПроданоМейкеро",
    price: "69.50",
    amount: "500 USDT",
    limits: "5000 – 2 000 000 RUB",
    payment: "SBP",
    orders: 222,
    percent: 99,
    status: "online",
    owner: "ПроданоМейкеро",
    createdAt: "2024-06-01T14:00:00Z"
  }
];

function OrderStatus({ status }: { status: "online" | "offline" | "warning" }) {
  let color = "#888";
  if (status === "online") color = "#1ec70b";
  if (status === "warning") color = "#ffd600";
  if (status === "offline") color = "#b22";
  return <span className="order-status-dot" style={{ background: color }} />;
}

export function OrderCard(props: Order & { onClick?: () => void }) {
  return (
    <div
      className="order-card"
      onClick={props.onClick}
      style={{
        border: "1px solid #444",
        margin: 8,
        padding: 12,
        borderRadius: 8,
        cursor: props.onClick ? "pointer" : undefined
      }}
    >
      <div className="order-left">
        <OrderStatus status={props.status} />
        <div>
          <div className="order-username">{props.username}</div>
          <div className="order-price">₽ {props.price}</div>
          <div className="order-amount">Количество {props.amount}</div>
          <div className="order-limits">Лимиты {props.limits}</div>
          <div className="order-payment">{props.payment}</div>
        </div>
      </div>
      <div className="order-right">
        <div>
          <div>
            <b>#{props.id} {props.price} RUB/USDT</b>
          </div>
          <div>{props.amount} | {props.limits} | {props.payment}</div>
          <div>Статус: {props.status}</div>
          <div>Пользователь: {props.username}</div>
          {props.payData?.fullName && <div>ФИО: {props.payData.fullName}</div>}
        </div>
        <button
          className="buy-btn"
          onClick={e => {
            e.stopPropagation();
            if (props.onClick) props.onClick();
          }}
        >
          Подробнее
        </button>
      </div>
    </div>
  );
}
