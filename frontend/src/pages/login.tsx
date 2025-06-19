import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage({ lang }: { lang: any }) {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: any) {
    e.preventDefault();
    setErr(null);
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      router.push('/');
    } else {
      setErr('Login failed');
    }
  }

  return (
    <form onSubmit={onSubmit} className="card">
      <h2>{lang.login}</h2>
      <input
        type="email"
        placeholder={lang.email}
        required
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
      />
      <input
        type="password"
        placeholder={lang.password}
        required
        value={form.password}
        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
      />
      <button type="submit">{lang.login}</button>
      {err && <div style={{ color: 'red' }}>{err}</div>}
    </form>
  );
}
