import { useState } from 'react';

export default function SupportPage({ lang }: { lang: any }) {
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');

  async function submit(e: any) {
    e.preventDefault();
    setMsg('');
    const res = await fetch('/api/support', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) setMsg('Ticket sent!');
    else setMsg('Error');
  }

  return (
    <div className="card">
      <h2>{lang.support}</h2>
      <form onSubmit={submit}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={lang.message}
          style={{ width: '100%', minHeight: 70, marginBottom: 8 }}
        />
        <button type="submit">{lang.send}</button>
      </form>
      {msg && <div>{msg}</div>}
    </div>
  );
}
