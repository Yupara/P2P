import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Добро пожаловать на P2P Exchange</h1>
      <p>
        <Link to="/orders">Перейти к списку объявлений</Link>
      </p>
    </div>
  );
}
