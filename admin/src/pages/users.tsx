import { useEffect, useState } from 'react';

export default function UsersPage({ lang }: { lang: any }) {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/users').then(r => r.json()).then(data => {
      setUsers(data);
      setFiltered(data);
    });
  }, []);

  useEffect(() => {
    setFiltered(
      users.filter(
        u =>
          u.email?.toLowerCase().includes(search.toLowerCase()) || u.id.includes(search)
      )
    );
  }, [search, users]);

  async function blockUser(id: string) {
    await fetch(`/api/users/${id}/block`, { method: 'PATCH' });
    setFiltered(filtered =>
      filtered.map(u => (u.id === id ? { ...u, isBlocked: true } : u))
    );
  }
  async function unblockUser(id: string) {
    await fetch(`/api/users/${id}/unblock`, { method: 'PATCH' });
    setFiltered(filtered =>
      filtered.map(u => (u.id === id ? { ...u, isBlocked: false } : u))
    );
  }

  return (
    <div className="card">
      <h2>{lang.users}</h2>
      <input
        placeholder={lang.search}
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>{lang.userId}</th>
            <th>{lang.email}</th>
            <th>{lang.dealsCount}</th>
            <th>{lang.status}</th>
            <th>{lang.actions}</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.completedDeals}</td>
              <td>{u.isBlocked ? lang.block : lang.unblock}</td>
              <td>
                {!u.isBlocked && (
                  <button onClick={() => blockUser(u.id)}>{lang.block}</button>
                )}
                {u.isBlocked && (
                  <button onClick={() => unblockUser(u.id)}>{lang.unblock}</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
