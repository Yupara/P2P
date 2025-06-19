import { useEffect, useState } from 'react';

export default function OrdersPage({ lang }: { lang: any }) {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/orders/my').then(r => r.json()).then(setOrders);
  }, []);

  return (
    <div className="card">
      <h2>{lang.myOrders}</h2>
      <table>
        <thead>
          <tr>
            <th>{lang.asset}</th>
            <th>{lang.paymentSystem}</th>
            <th>{lang.amount}</th>
            <th>{lang.price}</th>
            <th>{lang.type}</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.asset}</td>
              <td>{o.paymentSystem}</td>
              <td>{o.amount}</td>
              <td>{o.price}</td>
              <td>{o.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
