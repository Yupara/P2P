import { useEffect, useState } from 'react';

export default function SupportPage({ lang }: { lang: any }) {
  const [tickets, setTickets] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/support/open').then(r => r.json()).then(setTickets);
  }, []);

  async function closeTicket(id: string) {
    await fetch(`/api/support/${id}/close`, { method: 'PATCH' });
    setTickets(tickets => tickets.filter(t => t.id !== id));
  }

  return (
    <div className="card">
      <h2>{lang.tickets}</h2>
      <table>
        <thead>
          <tr>
            <th>{lang.userId}</th>
            <th>{lang.status}</th>
            <th>{lang.details}</th>
            <th>{lang.actions}</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.id}>
              <td>{t.user?.id}</td>
              <td>{t.status}</td>
              <td>{t.text}</td>
              <td>
                <button onClick={() => closeTicket(t.id)}>{lang.close}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
