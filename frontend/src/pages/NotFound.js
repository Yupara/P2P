import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: 20 }}>
      <h1>404 — Страница не найдена</h1>
      <p><Link to="/">Вернуться на главную</Link></p>
    </div>
  );
}
