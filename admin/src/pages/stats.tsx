import { useEffect, useState } from 'react';

export default function StatsPage({ lang }: { lang: any }) {
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    async function fetchStats() {
      const [activeUsers, dailyEarnings] = await Promise.all([
        fetch('/api/stats/active-users').then(r => r.json()),
        fetch('/api/stats/daily-earnings').then(r => r.json()),
      ]);
      setStats({ activeUsers, dailyEarnings });
    }
    fetchStats();
  }, []);

  return (
    <div className="card">
      <h2>{lang.statistics}</h2>
      <div>
        <b>{lang.activeUsers}:</b> {stats.activeUsers ?? '-'}
      </div>
      <div>
        <b>{lang.dailyEarnings} (USDT):</b> {stats.dailyEarnings ?? '-'}
      </div>
    </div>
  );
}
