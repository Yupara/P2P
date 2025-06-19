import { useEffect, useState } from 'react';

export default function DealsPage({ lang }: { lang: any }) {
  const [deals, setDeals] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/deals/my').then(r => r.json()).then(setDeals);
  }, []);

  return (
    <div className="card">
      <h2>{lang.myDeals}</h2>
      <table>
        <thead>
          <tr>
            <th>{lang.asset}</th>
            <th>{lang.amount}</th>
            <th>{lang.type}</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {deals.map(d => (
            <tr key={d.id}>
              <td>{d.order?.asset}</td>
              <td>{d.amount}</td>
              <td>{d.order?.type}</td>
              <td>{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
