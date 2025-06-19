import { useEffect, useState } from 'react';

export default function DisputesPage({ lang }: { lang: any }) {
  const [disputes, setDisputes] = useState<any[]>([]);

  useEffect(() => {
    // Пример запроса: все открытые споры
    fetch('/api/disputes?status=OPEN').then(r => r.json()).then(setDisputes);
  }, []);

  async function resolveDispute(id: string) {
    await fetch(`/api/disputes/${id}/resolve`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'RESOLVED' }),
      headers: { 'Content-Type': 'application/json' },
    });
    setDisputes(ds => ds.filter(d => d.id !== id));
  }

  return (
    <div className="card">
      <h2>{lang.disputes}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Deal</th>
            <th>User</th>
            <th>{lang.status}</th>
            <th>{lang.details}</th>
            <th>{lang.actions}</th>
          </tr>
        </thead>
        <tbody>
          {disputes.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{d.deal?.id}</td>
              <td>{d.initiator?.id}</td>
              <td>{d.status}</td>
              <td>
                {d.reason}
                {d.evidenceScreenshotUrl && (
                  <div>
                    <img src={d.evidenceScreenshotUrl} alt="screenshot" width={80} />
                  </div>
                )}
                {d.evidenceVideoUrl && (
                  <div>
                    <a href={d.evidenceVideoUrl} target="_blank">Video</a>
                  </div>
                )}
              </td>
              <td>
                <button onClick={() => resolveDispute(d.id)}>{lang.approve}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
