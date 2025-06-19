import { useState } from 'react';
import { useRouter } from 'next/router';

export default function RegisterPage({ lang }: { lang: any }) {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', phone: '' });
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: any) {
    e.preventDefault();
    setErr(null);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      router.push('/login');
    } else {
      setErr('Registration failed');
    }
  }

  return (
    <form onSubmit={onSubmit} className="card">
      <h2>{lang.register}</h2>
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
      <input
        type="tel"
        placeholder={lang.phone}
        value={form.phone}
        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
      />
      <button type="submit">{lang.register}</button>
      {err && <div style={{ color: 'red' }}>{err}</div>}
    </form>
  );
}
