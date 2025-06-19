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
  // add id if needed
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

export function OrderCard(
  props: Order & { onClick?: () => void }
) {
  return (
    <div className="order-card" onClick={props.onClick} style={{cursor: props.onClick ? "pointer" : undefined}}>
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
          {props.orders} Ордеров | {props.percent} %
        </div>
        <button className="buy-btn" onClick={e => { e.stopPropagation(); if(props.onClick) props.onClick(); }}>
          Покупка
        </button>
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

export interface Order {
  id: number;
  username: string;
  price: string;
  amount: string;
  limits: string;
  payment: string;
  orders: number;
  percent: number;
  status: "online" | "offline" | "warning";
  // ...
}

export interface Order {
  id: number;
  username: string;
  price: string;
  amount: string;
  limits: string;
  payment: string;
  orders: number;
  percent: number;
  status: "online" | "offline" | "warning";
  payData?: {
    bank: string;
    fullName: string;
    card: string;
    buyer: string;
    orderTime: string;
  };
}
import React from "react";

export interface Order {
  id: number;
  username: string;
  price: string;
  amount: string;
  limits: string;
  payment: string;
  orders: number;
  percent: number;
  status: string;
  owner: string;
  createdAt: string;
  payData?: {
    bank?: string;
    fullName?: string;
    card?: string;
    buyer?: string;
    orderTime?: string;
  };
}

export function OrderCard(props: Order & { onClick: () => void }) {
  return (
    <div className="order-card" onClick={props.onClick} style={{border: "1px solid #444", margin: 8, padding: 12, borderRadius: 8}}>
      <b>#{props.id} {props.price} RUB/USDT</b>
      <div>{props.amount} | {props.limits} | {props.payment}</div>
      <div>Статус: {props.status}</div>
      <div>Пользователь: {props.username}</div>
      {props.payData?.fullName && <div>ФИО: {props.payData.fullName}</div>}
    </div>
  );
}
